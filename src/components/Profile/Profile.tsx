import React from 'react';
import { Avatar } from '../Avatar';
import { Session } from 'next-auth';

interface ProfilePropsType {
  session: Session | null;
}

const Profile = (props: ProfilePropsType) => {
  const { session } = props;

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Avatar imageUrl={undefined} />
      {!session ? (
        <span>로그인 후 이용해주세요!</span>
      ) : (
        <>
          <span className="text-center">{session.nickname}</span>
        </>
      )}
    </div>
  );
};

export default Profile;
