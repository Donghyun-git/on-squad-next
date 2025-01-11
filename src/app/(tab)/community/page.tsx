import React from 'react';

import CommunityContainer from './CommunityContainer';
import { Appbar } from '@/components/Appbar';

//TODO: 처음에는 hydrate 된 값을 쓰고, 검색어 유무에 따라 검색결과를 보여준다. 그냥 검색페이지가 별도 존재한다.
const CommunityPage = () => {
  return (
    <>
      <Appbar />
      <CommunityContainer />
    </>
  );
};

export default CommunityPage;
