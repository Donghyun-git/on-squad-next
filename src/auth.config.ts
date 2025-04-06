import { CredentialsSignin, type NextAuthConfig, type User } from 'next-auth';
import { userLoginPostFetch } from '@/api/user/userLoginPostFetch';
import { userInfoGetFetch } from '@/api/user/userInfoGetFetch';
import Credentials from 'next-auth/providers/credentials';

class InvalidLoginError extends CredentialsSignin {
  code: string;

  constructor(code: string) {
    super();

    this.code = code;
  }
}

export default {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: '이메일' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          console.error('No credentials provided');
          return null;
        }

        try {
          const loginResponse = await userLoginPostFetch({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });

          if (loginResponse.data.error) {
            throw new InvalidLoginError(loginResponse.data.error.message);
          }

          const userInfoResponse = await userInfoGetFetch({
            accessToken: loginResponse.data.accessToken.value,
          });

          if (userInfoResponse.data.error) {
            throw new InvalidLoginError(userInfoResponse.data.error.message);
          }

          return {
            ...(userInfoResponse.data.data as unknown as User),
            accessToken: loginResponse.data.accessToken.value,
            refreshToken: loginResponse.data.refreshToken.value,
          };
        } catch (error: unknown) {
          if (error instanceof InvalidLoginError) {
            throw error;
          }
          throw new CredentialsSignin('UNKNOWN_ERROR', {
            type: 'UnknownAction',
            code: 'UNKNOWN_ERROR',
          });
        }
      },
    }),
    Credentials({
      id: 'kakao', // id 추가
      name: 'kakao',
      credentials: {
        accessToken: { type: 'text' },
        refreshToken: { type: 'text' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          console.error('No credentials provided');
          return null;
        }

        try {
          if (credentials) {
            const userInfoResponse = await userInfoGetFetch({
              accessToken: credentials.accessToken as string,
            });

            if (userInfoResponse.data.error) {
              throw new Error(userInfoResponse.data.error?.message);
            }

            return {
              ...(userInfoResponse.data.data as unknown as User),
              accessToken: credentials.accessToken as string,
              refreshToken: credentials.refreshToken as string,
            };
          }

          return null;
        } catch (error) {
          console.error('Kakao login error:', error);
          throw error;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
