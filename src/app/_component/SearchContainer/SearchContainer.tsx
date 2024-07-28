'use client';

import React, { FormEventHandler } from 'react';

import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { Searchbar } from '@/components/Searchbar';
import { searchSchema } from '@/components/Searchbar/validator';
import { yupResolver } from '@hookform/resolvers/yup';

const SearchContainer = () => {
  const router = useRouter();

  const method = useForm({
    resolver: yupResolver(searchSchema),
    values: {
      search: '',
    },
  });

  return (
    <FormProvider {...method}>
      <Searchbar
        className="border-[#d9d9d9]"
        onSubmit={async () => {
          alert('검색기능');
        }}
      />
    </FormProvider>
  );
};

export default SearchContainer;
