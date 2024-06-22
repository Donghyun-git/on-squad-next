import React, { ReactNode } from 'react';
import { Appbar } from '../Appbar';

interface LayoutPropsType {
  children: ReactNode | ReactNode[];
}

const Wrapper = ({ children }: LayoutPropsType) => {
  return (
    <div className="min-w-[20rem] max-w-[67.5rem] px-5 relative mx-auto">
      <Appbar />
      {children}
    </div>
  );
};

export default Wrapper;
