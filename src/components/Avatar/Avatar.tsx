import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

interface AvatarPropsType {
  imageUrl?: string;
  className?: string;
}

const CustomAvatar = ({ imageUrl, className }: AvatarPropsType) => {
  return (
    <Avatar className={cn(`${className}`)}>
      <AvatarImage
        src={!imageUrl ? '/icons/no_profile.svg' : imageUrl}
        alt="프로필 이미지"
      />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
