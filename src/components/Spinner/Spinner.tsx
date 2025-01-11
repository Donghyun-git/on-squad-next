'use client';

import React, { useEffect } from 'react';
import { HashLoader } from 'react-spinners';
import { cn } from '@/lib/utils';

export interface SpinnerPropsType {
  /**
   * Spinner text
   */
  helperText?: string;

  splitCount?: number;
}

const Spinner = (props: SpinnerPropsType) => {
  const { helperText = '취미생활의 즐거움', splitCount = 5 } = props;

  useEffect(() => {
    const body = document.body;

    body.style.setProperty('overflow', 'hidden');

    return () => {
      body.style.removeProperty('overflow');
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[111111] bg-black bg-opacity-40 w-screen h-screen flex flex-col justify-center items-center">
      <HashLoader size={40} color="#F87315" />

      <div className="flex items-center">
        {helperText.split('').map((text, i) => (
          <span
            key={i}
            className={cn(
              `font-semibold text-primary text-lg inline-block animate-bounceInOrder mt-4 ${
                i === splitCount && 'ml-2'
              }`,
            )}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Spinner;
