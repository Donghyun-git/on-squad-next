import React from 'react';

//TODO: optional 해제
const CountLabel = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="bg-primary50 text-primary700 text-xs px-[3.5px] py-[1.5px] rounded-full mb-[0.08rem]">
      {count}
    </div>
  );
};

export default CountLabel;
