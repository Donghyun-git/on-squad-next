import { Text } from '@/components/Text';

import Image from 'next/image';
import { SearchContainer } from './_component/SearchContainer';
import { CrewList } from './_component/CrewList';
import { MainDashboard } from './_component/MainDashboard';
import { Appbar } from '@/components/Appbar';
import { getQueryClient } from '@/services/get-query-client';
import {
  crewListOptions,
  CREW_LIST_QUERY_KEY,
} from '@/services/options/crewListOptions';
import { CrewListResponseProps } from '@/api/crew/crewListGetFetch';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export type CrewListDataType = PropType<CrewListResponseProps, 'data'>;

/**
 * 랜딩
 */
export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(crewListOptions);

  const crewListData = queryClient.getQueryData<CrewListDataType>([
    CREW_LIST_QUERY_KEY,
  ]);

  return (
    <div className="w-full h-full bg-gray-50">
      <Appbar />
      <div className="container px-2 pt-20">
        <div className="w-full bg-[#144A7D] ease-linear p-9 flex justify-between items-center rounded-xl mt-6 mobile:flex-col tablet:flex-col SE:flex-col S2:flex-col">
          <Image
            src="/images/main_banner.svg"
            width={220}
            height={110}
            className="hidden w-auto h-auto mobile:inline-block mobile:mb-12 tablet:inline-block tablet:mb-12 SE:inline-block S2:inline-block SE:mb-12 S2:mb-12"
            alt="온스쿼드 배너"
            priority={true}
          />
          <div className="font-semibold text-white">
            <Text.lg className="mb-1 S2:text-sm">
              모임이 좋았을 뿐인데,,,
            </Text.lg>
            <Text.xxl className="mb-2">
              <h2 className="flex items-center S2:text-xs">
                점점{' '}
                <Text.xxxl className="ml-1 font-extrabold S2:text-xl">
                  부담
                </Text.xxxl>
                이 되고 있다면?
              </h2>
            </Text.xxl>
            <div className="flex flex-col gap-3 mobile:flex-row tablet:flex-row">
              <Image
                src="/icons/onsquad_logo.svg"
                alt="온스쿼드 로고"
                className="w-auto h-auto"
                width={150}
                height={50}
              />
              <Text.lg>에 합류하세요!</Text.lg>
            </div>
          </div>
          <Image
            src="/images/main_banner.svg"
            width={220}
            height={110}
            className="w-auto h-auto mobile:hidden tablet:hidden SE:hidden S2:hidden"
            alt="온스쿼드 배너"
            priority={true}
          />
        </div>
        <div className="w-1/2 mx-auto mt-6 mb-14 tablet:w-11/12 mobile:w-11/12 S2:w-11/12 SE:w-11/12">
          <SearchContainer />
        </div>

        <section className="flex items-center justify-center w-full gap-4 tablet:flex-col mobile:flex-col SE:flex-col S2:flex-col">
          <MainDashboard />
        </section>
        <section>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <CrewList list={crewListData ?? []} />
          </HydrationBoundary>
        </section>
      </div>
    </div>
  );
}
