import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarPropsType {
  imageUrl?: string;
}

const CustomAvatar = ({ imageUrl }: AvatarPropsType) => {
  return (
    <Avatar>
      <AvatarImage
        src={!imageUrl ? "/icons/no_profile.svg" : imageUrl}
        alt="프로필 이미지"
      />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
