import React from 'react';

const MovieTag: React.FC<{ tag: string }> = (props) => {
  const { tag } = props;
  return (
    <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-gray-700 bg-gray-100 border border-gray-300 ">
      <div className="text-xs font-normal leading-none max-w-full flex-initial">
        {tag}
      </div>
    </div>
  );
};

export default MovieTag;
