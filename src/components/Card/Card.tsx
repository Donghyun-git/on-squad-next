'use client';

import { forwardRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface CardPropsType {
  title: string | ReactNode;
  children: ReactNode;
  className?: string;

  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardPropsType>((props, ref) => {
  const { title, children, className, onClick } = props;

  return (
    <div
      ref={ref}
      className={cn(
        'w-full p-2 rounded-md bg-white min-h-32',
        className,
        onClick && 'cursor-pointer',
      )}
      onClick={onClick}
    >
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
});

export default Card;
