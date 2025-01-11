import React from 'react';

import { Appbar } from '@/components/Appbar';
import { AnnounceList } from './_components/AnnounceList';

const AnnouncePage = () => {
  return (
    <>
      <Appbar isMenuHeader={false} title="강아지 귀여워" />
      <AnnounceList />
    </>
  );
};

export default AnnouncePage;
