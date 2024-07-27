'use client';

import React, { useEffect } from 'react';
import { HashLoader } from 'react-spinners';
import { cn } from '@/lib/utils';

//TODO: 로딩 텍스트를 props로 받을까 통일할까 논의 필요 ..

const Spinner = () => {
  const loadingText = '취미생활의 즐거움';

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
      <div className="flex">
        {loadingText.split('').map((text, i) => (
          <span
            key={i}
            className={cn(
              `font-semibold text-primary text-lg inline-block animate-bounceInOrder mt-4 ${
                i === 5 && 'ml-2'
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
