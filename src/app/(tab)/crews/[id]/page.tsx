import React from 'react';
import { Appbar } from '@/components/Appbar';
import { CrewDetail } from './_components/CrewDetail';

/**
 * 크루 상세 페이지
 */
const CrewDetailPage = () => {
  //TODO: 서버에서 받아온 해당 크루의 타이틀을 Appbar props로 넘겨야 함.
  return (
    <>
      <Appbar isMenuHeader={false} title="공격적인 음악회 크루" />
      <CrewDetail />
    </>
  );
};

export default CrewDetailPage;
