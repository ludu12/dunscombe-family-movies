import React from 'react';
import { Tag } from '../lib/graphql.generated';

function onEnterKeyDown(e) {
  if (!e.repeat && e.key === 'Enter') {
    e.target.blur();
  }
}

function onFocusOut(cb) {
  return function (e) {
    cb(e.target.value);
  };
}

const MovieTag: React.FC<{
  tag: Tag;
  onDelete?: () => void;
  onUpdate?: (v: string) => void;
}> = (props) => {
  const { tag, onDelete, onUpdate } = props;
  const inputEl = React.useRef(null);

  React.useEffect(() => {
    if (inputEl.current) {
      inputEl.current.addEventListener('keydown', onEnterKeyDown);
      inputEl.current.addEventListener('focusout', onFocusOut(onUpdate));
    }
  }, [inputEl.current]);

  React.useEffect(() => {
    inputEl.current.value = tag.name;
    if (tag.name === '') {
      inputEl.current.focus();
    } else {
      inputEl.current.disabled = true;
      inputEl.current.style.width = `${tag.name.length}ch`;
    }
  }, [tag]);

  return (
    <div className="box-border flex justify-center items-center mx-1 py-1 px-2 rounded-full text-gray-700 bg-gray-100 border border-gray-300">
      <div className="text-xs font-normal leading-none max-w-full flex-initial">
        <input className="font-mono" ref={inputEl} type="text" />
      </div>
      {onDelete && (
        <div className="flex flex-auto flex-row-reverse">
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
      )}
    </div>
  );
};

export default MovieTag;
