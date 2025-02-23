import React from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { Appbar } from '@/components/Appbar';
import { CrewHome } from './_components/CrewHome';
import {
  crewHomeInfoOptions,
  CREW_HOME_INFO_QUERY_KEY,
} from '@/services/options/crews/crewHomeInfoOptions';

import { getQueryClient } from '@/services/get-query-client';
import { CrewHomeInfoResponseProps } from '@/api/crew/crewHomeInfoGetFetch';

type CrewHomeDataType = PropType<CrewHomeInfoResponseProps, 'data'>;

const CrewHomePage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { category: string };
}) => {
  const { id } = params;
  const { category = '' } = searchParams;

  const crewId = parseInt(id, 10);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    crewHomeInfoOptions({
      crewId,
      category,
    }),
  );

  const crewHomeData = queryClient.getQueryData<CrewHomeDataType>([
    CREW_HOME_INFO_QUERY_KEY,
    crewId,
    category,
  ]);

  return (
    <>
      <Appbar
        isMenuHeader={false}
        title={crewHomeData?.crew.name ?? '서버 안킴'}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CrewHome data={crewHomeData} />
      </HydrationBoundary>
    </>
  );
};

export default CrewHomePage;
