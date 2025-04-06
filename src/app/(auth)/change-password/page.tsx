import React from 'react';
import ChangePasswordForm from './ChangePasswordForm';
import { Appbar } from '@/components/Appbar';

const ChangePasswordPage = () => {
  return (
    <>
      <Appbar isMenuHeader={false} title="비밀번호 변경" />
      <div className="container pt-20">
        <ChangePasswordForm />
      </div>
    </>
  );
};

export default ChangePasswordPage;
