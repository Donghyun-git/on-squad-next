import React from 'react';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { Appbar } from '@/components/Appbar';
import { CrewHome } from './_components/CrewHome';
import {
  crewHomeInfoOptions,
  CREW_HOME_INFO_QUERY_KEY,
} from '@/services/options/crews/crewHomeInfoOptions';

import { getQueryClient } from '@/services/get-query-client';
import { CrewHomeInfoResponseProps } from '@/api/crew/crewHomeInfoGetFetch';

type CrewHomeDataType = PropType<CrewHomeInfoResponseProps, 'data'>;

const getHomeData = async (
  queryClient: QueryClient,
  crewId: number,
  category: string,
) => {
  try {
    await queryClient.fetchQuery(
      crewHomeInfoOptions({
        crewId,
        category,
      }),
    );
  } catch (error) {
    console.error('크루 홈 데이터 가져오기 실패:', error);
    throw error;
  }
};

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

  await getHomeData(queryClient, crewId, category);

  const crewHomeData = queryClient.getQueryData<CrewHomeDataType>([
    CREW_HOME_INFO_QUERY_KEY,
    crewId,
    category,
  ]);

  console.log(crewHomeData, 'crewHomeData');

  return (
    <>
      <Appbar isMenuHeader={false} title={crewHomeData?.crew?.name || '크루'} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CrewHome data={crewHomeData} />
      </HydrationBoundary>
    </>
  );
};

export default CrewHomePage;
