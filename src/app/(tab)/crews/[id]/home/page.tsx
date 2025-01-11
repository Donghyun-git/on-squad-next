import React from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { Appbar } from '@/components/Appbar';
import { CrewHome } from './_components/CrewHome';

import { getQueryClient } from '@/services/get-query-client';

const CrewHomePage = async () => {
  //   const queryClient = getQueryClient();

  // await queryClient.prefetchQuery(queryOptions);

  return (
    <>
      <Appbar isMenuHeader={false} title="강아지 귀여워" />
      {/* <HydrationBoundary state={dehydrate(state)}> */}
      <CrewHome />

      {/* </HydrationBoundary> */}
    </>
  );
};

export default CrewHomePage;
