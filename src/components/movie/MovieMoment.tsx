import React from 'react';
import { Moment } from '../../lib/graphql.generated';
import { formatSeconds } from '../../lib/utils';

const MovieMoment: React.FC<{
  moment: Moment;
  onDelete: () => void;
  onClick: () => void;
}> = (props) => {
  const { moment, onDelete, onClick } = props;

  return (
    <div className={'ml-2 flex items-center'}>
      <span
        className={'text-blue-600 hover:underline cursor-pointer'}
        onClick={onClick}
      >
        {formatSeconds(Number(moment.timestamp))}
      </span>
      &nbsp;-&nbsp;<span>{moment.description}</span>
      <div className="cursor-pointer w-3.5 h-3.5 ml-1" onClick={onDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x hover:text-gray-400 rounded-full"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
    </div>
  );
};

export default MovieMoment;
