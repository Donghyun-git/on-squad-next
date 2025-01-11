import React from 'react';
import JoinForm from './JoinForm';
import { Appbar } from '@/components/Appbar';

const JoinPage = () => {
  return (
    <>
      <Appbar isMenuHeader={false} title="회원가입" />
      <div className="container pt-20">
        <JoinForm />
      </div>
    </>
  );
};

export default JoinPage;
