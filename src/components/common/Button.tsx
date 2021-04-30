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

const buttonBaseClass = `flex
    items-center
    justify-center
    px-4
    py-1
    my-1
    border border-transparent rounded-md shadow-sm text-base font-medium
    disabled:opacity-50`;

export const PrimaryButton: React.FC<ButtonProps> = (props) => {
  const { isLoading, ...rest } = props;
  return (
    <button
      disabled={isLoading}
      type="button"
      {...rest}
      className={`${buttonBaseClass} text-white bg-green-600 hover:bg-green-700:!disabled`}
    >
      <Spin isSpinning={isLoading} />
      {props.children}
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = (props) => {
  const { isLoading, ...rest } = props;
  return (
    <button
      disabled={isLoading}
      type="button"
      {...rest}
      className={`${buttonBaseClass} text-black bg-white hover:bg-gray-50:!disabled`}
    >
      <Spin isSpinning={isLoading} />
      {props.children}
    </button>
  );
};
