import React from 'react';
import { useFormContext, FormProvider } from 'react-hook-form';
import { Searchbar } from '@/components/Searchbar';

const Search = () => {
  const method = useFormContext();

  return (
    <FormProvider {...method}>
      <Searchbar
        onSubmit={async () => {
          alert('검색기능(커뮤니티)');
        }}
      />
    </FormProvider>
  );
};

export default Search;
