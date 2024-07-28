'use client';

import React from 'react';
import { useFormContext, FormProvider } from 'react-hook-form';
import { Input } from '../Input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { Search } from 'lucide-react';

interface SearchbarPropsType {
  className?: string;
  onSubmit: () => Promise<void>;
}

/**
 * react-hook-form의 method를 props로 받는 검색 공통 컴포넌트
 */
const Searchbar = (props: SearchbarPropsType) => {
  const { className, onSubmit } = props;

  const method = useFormContext();

  const { handleSubmit: submit } = method;

  return (
    <FormProvider {...method}>
      <form onSubmit={submit(onSubmit)}>
        <div className="relative">
          <Input
            className={cn(`pr-10 ${className}`)}
            name="search"
            type="text"
            placeholder="크루를 검색해보세요."
          />
          <div className="absolute right-1 top-1">
            <Button
              className="px-1 py-1 mx-1 m-1 h-fit active:bg-gray-200"
              variant="ghost"
              formAction="submit"
              onClick={submit(onSubmit)}
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
