'use client';

import { useForm, FormProvider } from 'react-hook-form';
import React from 'react';
import { Text } from '@/components/Text';
import { Search } from './_components/Search';
import { yupResolver } from '@hookform/resolvers/yup';
import { searchSchema } from '@/components/Searchbar/validator';
import { CrewList } from './_components/CrewList';

const CommunityContainer = () => {
  const method = useForm({
    resolver: yupResolver(searchSchema),
    values: {
      search: '',
    },
  });

  return (
    <FormProvider {...method}>
      <div className="min-h-40 bg-[#d9d9d9]">
        <div className="container px-5 pt-20">
          <Text.lg className="pt-14 font-semibold text-center">
            <h3>크루탐색(배너이미지 들어 갈 예정)</h3>
          </Text.lg>
          <div className="pt-6 pb-4 w-2/3 mx-auto mobile:w-full SE:w-full S2:w-full">
            <Search />
          </div>
        </div>
      </div>
      <div className="container px-5 pb-12">
        <Text.lg className="pt-14 font-semibold">
          <h3>모집중인 크루</h3>
        </Text.lg>
        <CrewList />
      </div>
    </FormProvider>
  );
};

export default CommunityContainer;
