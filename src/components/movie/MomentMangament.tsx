import React from 'react';
import {
  Moment,
  Movie,
  useCreateMomentMutation,
  useDeleteMomentMutation,
  useMomentsByMovieQuery,
} from '../../lib/graphql.generated';
import MovieMoment from './MovieMoment';
import { VideoJsPlayer } from 'video.js';
import { Modal } from '../common/Modal';
import { formatSeconds } from '../../lib/utils';
import { Spin } from '../common/Animation';

const MomentManagement: React.FC<{
  movie: Movie;
  player: VideoJsPlayer;
}> = (props) => {
  const { movie, player } = props;

  const inputRef = React.useRef(null);
  const [timestamp, setTimestamp] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [isModalOpen, setModalOpen] = React.useState(false);
  const { data, refetch, isLoading } = useMomentsByMovieQuery({
    movieRef: movie._id,
    _size: 20,
  });
  const moments = data?.momentsByMovie?.data;

  const {
    mutate: createMoment,
    isLoading: isCreating,
  } = useCreateMomentMutation({
    onSuccess: async () => {
      await refetch();
    },
  });
  const {
    mutate: deleteMoment,
    isLoading: isDeleting,
  } = useDeleteMomentMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const handleMomentDelete = (id: string) => () => {
    deleteMoment({ id });
  };

  const handleMomentAdd = () => {
    setModalOpen(false);
    setDescription('');
    setTimestamp(0);
    createMoment({
      data: {
        timestamp: `${timestamp}`,
        description,
        movie: { connect: movie._id },
      },
    });
  };

  const handleMomentCapture = () => {
    const timestamp = player.currentTime();
    setModalOpen(true);
    setTimestamp(timestamp);
    inputRef.current.focus();
  };

  return (
    <>
      <div className="flex items-center">
        <div>Moments:</div>
        <div className="has-tooltip relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <span
            className="tooltip italic text-gray-400 -top-1 left-5"
            style={{ width: '50vw' }}
          >
            Capture a moment using camera button in the bottom right corner
          </span>
        </div>
      </div>
      {moments?.map((m, i) => {
        const moment = m as Moment;
        return (
          <MovieMoment
            key={i}
            moment={moment}
            onDelete={handleMomentDelete(m._id)}
            onClick={() => {
              player.currentTime(Number(m.timestamp));
            }}
          />
        );
      })}
      <Spin isSpinning={isCreating || isDeleting || isLoading} />
      <div className={'fixed bottom-0 right-0 m-4 flex-col flex'}>
        <button
          className="relative cursor-pointer self-end has-tooltip"
          onClick={handleMomentCapture}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
          <div className="tooltip -top-0 -left-40 w-48 py-1 px-2">
            Capture Moment!
          </div>
        </button>
      </div>
      <Modal
        title={`Capture Moment: ${formatSeconds(timestamp)}`}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        actions={[
          {
            title: 'Capture',
            action: handleMomentAdd,
            type: 'primary',
          },
          {
            title: 'Cancel',
            action: () => setModalOpen(false),
            type: 'secondary',
          },
        ]}
      >
        <input
          ref={inputRef}
          className="p-1 w-full"
          maxLength={50}
          placeholder={"What's happening here..."}
          value={description}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleMomentAdd();
            }
          }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Modal>
    </>
  );
};

export default MomentManagement;
