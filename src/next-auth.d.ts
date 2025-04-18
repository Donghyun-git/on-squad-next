import NextAuth, {
  User as DefaultUser,
  Session as DefaultSession,
} from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: number;
    nickname: string;
    email: string;
    gender: 'male' | 'female';
    birth: string;
    userType: string;
    address: string;
    addressDetail: string;
    accessToken: string;
    refreshToken: string;
    introduce: string;
    profileImage: string;
    mbti: string;
    kakaoLink: string;
  }

  interface Session extends DefaultSession {
    id: number;
    nickname: string;
    email: string;
    gender: 'male' | 'female';
    birth: string;
    userType: string;
    address: string;
    addressDetail: string;
    accessToken: string;
    refreshToken: string;
    mbti: string;
    profileImage?: string;
    introduce: string;
    kakaoLink: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    nickname: string;
    email: string;
    gender: 'male' | 'female';
    birth: string;
    userType: string;
    address: string;
    addressDetail: string;
    accessToken: string;
    refreshToken: string;
  }
}
