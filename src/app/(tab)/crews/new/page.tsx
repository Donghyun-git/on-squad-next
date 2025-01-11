import React from 'react';

import { Appbar } from '@/components/Appbar';
import { AddForm } from './_components/AddForm';

const AddCrewPage = () => {
  return (
    <>
      <Appbar isMenuHeader={false} title="크루 개설하기" />
      <AddForm />
    </>
  );
};

export default AddCrewPage;
