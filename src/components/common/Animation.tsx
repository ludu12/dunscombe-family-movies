import React from 'react';

export const Spin: React.FC<{ isSpinning: boolean }> = (props) => {
  const { isSpinning } = props;
  return (
    <svg
      className={`animate-spin ml-1 mr-3 h-5 w-5 ${isSpinning ? '' : 'hidden'}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export const Pulse: React.FC = () => {
  return (
    <div className="border border-light-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-light-blue-400 h-12 w-12" />
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-light-blue-400 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-light-blue-400 rounded" />
            <div className="h-4 bg-light-blue-400 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingDots: React.FC<{ isLoading: boolean }> = (props) => {
  const { isLoading } = props;
  return (
    <div className={`flex px-1 ${isLoading ? '' : 'hidden'}`}>
      <span className="animate-bounce h-2 w-2 rounded-full bg-indigo-300 m-0.5" />
      <span className="animate-bounce-delay-50 h-2 w-2 rounded-full bg-indigo-300 m-0.5" />
      <span className="animate-bounce-delay-100 h-2 w-2 rounded-full bg-indigo-300 m-0.5" />
    </div>
  );
};
