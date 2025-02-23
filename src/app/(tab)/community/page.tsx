import React from 'react';

import CommunityContainer from './CommunityContainer';
import { Appbar } from '@/components/Appbar';
import {
  CREW_LIST_QUERY_KEY,
  crewListOptions,
} from '@/services/options/crewListOptions';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/services/get-query-client';
import { CrewListResponseProps } from '@/api/crew/crewListGetFetch';

type CrewListDataType = PropType<CrewListResponseProps, 'data'>;

//TODO: 처음에는 hydrate 된 값을 쓰고, 검색어 유무에 따라 검색결과를 보여준다. 그냥 검색페이지가 별도 존재한다.
const CommunityPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(crewListOptions);

  const crewListData = queryClient.getQueryData<CrewListDataType>([
    CREW_LIST_QUERY_KEY,
  ]);
  return (
    <>
      <Appbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommunityContainer list={crewListData ?? []} />
      </HydrationBoundary>
    </>
  );
};

export default CommunityPage;
