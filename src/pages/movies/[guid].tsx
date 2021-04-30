import React from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import Layout from '../../components/Layout';
import {
  Moment,
  Movie,
  Tag,
  useAllTagsQuery,
  useUpdateMovieMutation,
} from '../../lib/graphql.generated';
import isEqual from 'lodash/isEqual';
import { PrimaryButton } from '../../components/common/Button';
import {
  allMoviesStaticPaths,
  findMovieByGuidStaticProps,
} from '../../lib/static-props';
import { useMovieSources } from '../../components/movie/use-movie-sources';
import { mutationBuilder } from '../../lib/movie/movie-utils';
import MomentManagement from '../../components/movie/MomentMangament';
import TagManagement from '../../components/movie/TagManagement';

const MoviePage: React.FC<{ movie: Movie }> = (props) => {
  const [movie, setMovie] = React.useState(props.movie);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const { data } = useAllTagsQuery();
  const allTags = data?.allTags?.data;
  const [player, setPlayer] = React.useState(null);
  const { mutate, isLoading } = useUpdateMovieMutation();

  React.useEffect(() => {
    setIsDisabled(isEqual(props.movie, movie));
  }, [props.movie, movie]);

  const handleSubmit = () => {
    mutate(mutationBuilder(movie, props.movie, allTags));
  };

  const handleChange = React.useCallback(
    (field) => (event) => {
      setMovie((m) => ({
        ...m,
        [field]: event.target.value,
      }));
    },
    []
  );

  const sources = useMovieSources(movie);
  React.useEffect(() => {
    if (player !== null) {
      player.src(sources);
    }
  }, [player, sources]);

  const handleTagUpdate = (tags: Tag[]) => {
    setMovie((m) => ({
      ...m,
      tags: {
        ...m.tags,
        data: tags,
      },
    }));
  };

  const handleMomentUpdate = (moments: Moment[]) => {
    setMovie((m) => ({
      ...m,
      moments: {
        ...m.moments,
        data: moments,
      },
    }));
  };

  return (
    <Layout title={movie.name} redirect>
      <main className="m-auto lg:mx-16">
        <div className="flex my-4 justify-between align-top shadow-md rounded px-2 py-1 border">
          <div className="mr-4 overflow-auto">
            <h2 className="text-2xl">{movie.name}</h2>
            <input
              className="p-1 w-80"
              maxLength={50}
              placeholder={'Type a short description...'}
              value={movie.shortDescription || ''}
              onChange={handleChange('shortDescription')}
            />
          </div>
          <PrimaryButton
            disabled={isDisabled || isLoading}
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Save
          </PrimaryButton>
        </div>
        <VideoPlayer setPlayer={setPlayer} />
        <div className="my-4 flex flex-col shadow-md rounded px-2 border">
          <TagManagement tags={movie.tags.data} updateTags={handleTagUpdate} />
          <div>
            <div>Description:</div>
            <textarea
              className="p-2 w-full border rounded min-h-96"
              maxLength={300}
              placeholder={'Any other details?...'}
              value={movie.description || ''}
              onChange={handleChange('description')}
            />
          </div>
          <div className="pb-8">
            <MomentManagement movie={movie} player={player} />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticPaths = allMoviesStaticPaths;
export const getStaticProps = findMovieByGuidStaticProps;
export default MoviePage;
