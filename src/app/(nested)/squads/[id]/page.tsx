import React from 'react';

import { Appbar } from '@/components/Appbar';
import { SquadDetail } from './_components/SquadDetail';

const SquadDetailPage = () => {
  return (
    <>
      <Appbar isMenuHeader={false} title="강아지 귀여워" />
      <SquadDetail />
    </>
  );
};

export default SquadDetailPage;
