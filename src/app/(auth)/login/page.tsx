import React from 'react';
import LoginForm from './LoginForm';
import { Appbar } from '@/components/Appbar';

const LoginPage = async () => {
  return (
    <>
      <Appbar isMenuHeader={false} title="로그인" />
      <div className="container pt-20 bg-white">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
