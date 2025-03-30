import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';

import { userLoginPostFetch } from '@/api/user/userLoginPostFetch';
import { userInfoGetFetch } from '@/api/user/userInfoGetFetch';
import { PATH } from '@/constants/paths';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'UserEmail', type: 'text', placeholder: '이메일' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log('Credentials:', credentials);

        if (!credentials) {
          console.error('No credentials provided');
          return null;
        }

        const loginResponse = await userLoginPostFetch({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (loginResponse.data.error) {
          // Any object returned will be saved in `user` property of the JWT
          throw new Error(loginResponse.data.error?.message);
        }

        const userInfoResponse = await userInfoGetFetch({
          accessToken: loginResponse.data.accessToken.value,
        });

        if (userInfoResponse.data.error) {
          throw new Error(userInfoResponse.data.error?.message);
        }

        return {
          ...userInfoResponse.data.data,
          accessToken: loginResponse.data.accessToken.value,
          refreshToken: loginResponse.data.refreshToken.value,
        };
      },
    }),
    CredentialsProvider({
      id: 'kakao', // id 추가
      name: 'kakao',
      credentials: {
        accessToken: { type: 'text' },
        refreshToken: { type: 'text' },
      }, // 빈 객체로 설정
      async authorize(credentials, req) {
        try {
          console.log('kakao Credentials:', credentials);

          if (!credentials) {
            console.error('No credentials provided');
            return null;
          }

          const userInfoResponse = await userInfoGetFetch({
            accessToken: credentials.accessToken,
          });

          if (userInfoResponse.data.error) {
            throw new Error(userInfoResponse.data.error?.message);
          }

          return {
            ...userInfoResponse.data.data,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
          };
        } catch (error) {
          console.error('Kakao login error:', error);
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number;
        token.email = user.email;
        token.nickname = user.nickname;
        token.gender = user.gender;
        token.birth = user.birth;
        token.userType = user.userType;
        token.address = user.address;
        token.addressDetail = user.addressDetail;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
    },

    async session({ session, token }) {
      session.id = token.id as number;
      session.email = token.email;
      session.nickname = token.nickname;
      session.gender = token.gender;
      session.birth = token.birth;
      session.userType = token.userType;
      session.address = token.address;
      session.addressDetail = token.addressDetail;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: PATH.root,
    signOut: PATH.root,
  },
};
