import NextAuth, {
  NextAuthOptions,
  User as DefaultUser,
  Session as DefaultSession,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

// 기존 User 타입 확장
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
