import React from 'react';
import { Tag } from '../../lib/graphql.generated';
import MovieTag from './MovieTag';
import { Spin } from '../common/Animation';
import { useAllTags } from './use-all-tags';

const TagManagement: React.FC<{
  tags: Tag[];
  updateTags: (tags: Tag[]) => void;
}> = (props) => {
  const { tags, updateTags } = props;
  const { isLoading: isLoadingTags } = useAllTags();
  const [newTag, setNewTag] = React.useState(null);

  const handleTagDelete = (index) => () => {
    updateTags(tags.filter((t, i) => i !== index));
  };

  const handleTagAdd = () => {
    const tag = ({ name: '' } as unknown) as Tag;
    setNewTag(tag);
  };

  const handleTagUpdate = (name: string) => {
    if (name) {
      const tag = ({ name } as unknown) as Tag;
      updateTags(tags.concat(tag));
    }
    setNewTag(null);
  };

  return (
    <div className="flex flex-wrap items-center py-2">
      <div>Tags:</div>
      {tags.map((t, i) => (
        <MovieTag key={i} tag={t} onDelete={handleTagDelete(i)} />
      ))}
      {newTag && (
        <MovieTag
          tag={newTag}
          onDelete={() => setNewTag(null)}
          onUpdate={handleTagUpdate}
        />
      )}
      {isLoadingTags ? (
        <Spin isSpinning={isLoadingTags} />
      ) : (
        <button
          title={'Add tag'}
          onClick={handleTagAdd}
          className="box-border bg-grey-light font-medium hover:bg-grey text-gray-700 bg-gray-100 border border-gray-300 font-bold rounded-full inline-flex items-center w-5 h-5 ml-1"
        >
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
export default TagManagement;
