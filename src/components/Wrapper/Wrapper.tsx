import React, { ReactNode } from 'react';
import { Appbar } from '../Appbar';

interface LayoutPropsType {
  children: ReactNode | ReactNode[];
}

const Wrapper = ({ children }: LayoutPropsType) => {
  return (
    <main className="min-w-[20rem] max-w-[67.5rem] relative mx-auto">
      {children}
    </main>
  );
};

export default Wrapper;
