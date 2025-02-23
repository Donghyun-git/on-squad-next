import React from 'react';
import { WriteForm } from './_components/WriteForm';
import { Appbar } from '@/components/Appbar';

const CrewAnnounceWritePage = () => {
  return (
    <>
      <Appbar isMenuHeader={false} title="공지사항" />
      <WriteForm />
    </>
  );
};

export default CrewAnnounceWritePage;
