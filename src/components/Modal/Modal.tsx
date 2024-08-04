'use client';

import React from 'react';
import { useModalStackStore } from '@/store/useModalStackStore';

const Modal = () => {
  const modal = useModalStackStore((state) => state.modalStack);

  return (
    <>
      {modal.length > 0 &&
        modal.map((modal, i) => (
          <React.Fragment key={i}>{modal}</React.Fragment>
        ))}
    </>
  );
};

export default Modal;
