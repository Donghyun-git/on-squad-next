import React, { Suspense } from 'react';
import { Appbar } from '@/components/Appbar';
import { CrewDetail } from './_components/CrewDetail';
import {
  crewDetailOptions,
  CREW_DETAIL_QUERY_KEY,
} from '@/services/options/crews/crewDetailOptions';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/services/get-query-client';
import { CrewDetailResponseProps } from '@/api/crew/crewDetailGetFetch';

interface CrewDetailPageProps {
  id: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export type CrewDetailDataType = PropType<CrewDetailResponseProps, 'data'>;

/**
 * 크루 상세 페이지
 */
const HydrateCrewDetail = async ({ id }: CrewDetailPageProps) => {
  const crewId = parseInt(id, 10);

  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(crewDetailOptions({ crewId }));
  } catch (error) {
    console.error(error);

    throw error;
  }

  const crewDetailData = queryClient.getQueryData<CrewDetailDataType>([
    CREW_DETAIL_QUERY_KEY,
    crewId,
  ]);

  return (
    <>
      <Appbar isMenuHeader={false} title={crewDetailData?.name} />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CrewDetail data={crewDetailData} />
      </HydrationBoundary>
    </>
  );
};

export default HydrateCrewDetail;
