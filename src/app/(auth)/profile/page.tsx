import React from 'react';
import ProfileForm from './ProfileForm';
import { Appbar } from '@/components/Appbar';
import { auth } from '@/auth';

const ProfilePage = async () => {
  const session = await auth();

  return (
    <>
      <Appbar isMenuHeader={false} title={`${session?.nickname}의 프로필`} />
      <ProfileForm />
    </>
  );
};

export default ProfilePage;
