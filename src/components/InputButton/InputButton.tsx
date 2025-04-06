import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface InputButtonPropsType
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  buttonText: string;
  leftIcon?: string;
  color?: string;
  backgroundColor?: string;
}

const InputButton = (props: InputButtonPropsType) => {
  const {
    buttonText,
    onClick,
    leftIcon,
    disabled,
    backgroundColor = '#f8f8f8',
  } = props;

  return (
    <div
      onClick={!disabled ? onClick : () => {}}
      className={cn(
        'absolute flex justify-center items-center px-2 py-1 mx-auto my-0 cursor-pointer right-2 top-2 rounded-md text-xs text-grayscale500',
        disabled && 'cursor-not-allowed text-grayscale900',
      )}
      style={{ backgroundColor }}
    >
      {leftIcon ? (
        <Image
          className="w-3 mr-2"
          src={leftIcon}
          alt={leftIcon.split('.')[0]}
        />
      ) : null}
      {buttonText}
    </div>
  );
};

export default InputButton;
