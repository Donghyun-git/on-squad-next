import React from 'react';
import { Avatar } from '../Avatar';

const Profile = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Avatar imageUrl={undefined} />
      <span>로그인 후 이용해주세요!</span>
    </div>
  );
};

export default Profile;
