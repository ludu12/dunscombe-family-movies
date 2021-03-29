import React from 'react';
import { Spin } from './Animation';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
  const { isLoading, ...rest } = props;
  return (
    <button
      disabled={isLoading}
      type="button"
      {...rest}
      className="
    flex
    items-center
    justify-center
    px-4
    py-2
    my-3
    border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600
    hover:bg-green-700:!disabled
    disabled:opacity-50
    "
    >
      <Spin isSpinning={isLoading} />
      {props.children}
    </button>
  );
};
