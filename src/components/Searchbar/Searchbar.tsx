'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../Input';
import { searchSchema } from './validator';
import { Button } from '@/components/ui/button';

import { Search } from 'lucide-react';

interface SearchbarPropsType {
  onSubmit: () => Promise<void>;
}

const Searchbar = (props: SearchbarPropsType) => {
  const { onSubmit } = props;

  const method = useForm({
    resolver: yupResolver(searchSchema),
    values: {
      search: '',
    },
  });

  const { handleSubmit: submit } = method;

  return (
    <FormProvider {...method}>
      <form onSubmit={submit(onSubmit)}>
        <div className="relative">
          <Input
            className="pr-10"
            name="search"
            type="text"
            placeholder="크루를 검색해보세요."
          />
          <div className="absolute right-1 top-1">
            <Button
              className="px-1 py-1 mx-1 m-1 h-fit active:bg-gray-200"
              variant="ghost"
              formAction="submit"
            >
              <Search stroke="#8c8c8c" size={16} />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Searchbar;
