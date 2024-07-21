import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import returnFetch, { FetchArgs } from 'return-fetch';

export const apiFetch = async <T>(
  input: URL | RequestInfo,
  init?: RequestInit,
): Promise<{ data: T; status: number }> => {
  return returnFetch({
    baseUrl: 'http://192.168.1.142:8083',
    headers: { Accept: 'application/json' },
    interceptors: {
      request: async (config: FetchArgs) => {
        const session = await getServerSession(authOptions);

        if (session) {
          if (!config[1]) {
            config[1] = {};
          }
          if (!config[1].headers) {
            config[1].headers = {};
          }

          // Headers 객체를 변환하여 Authorization 헤더 추가
          const headers = new Headers(config[1].headers);

          headers.set('Authorization', `Bearer ${session.accessToken}`);

          config[1].headers = Object.fromEntries(headers.entries());
        }

        return config;
      },

      response: async (response: Response) => {
        const responseBody = await response.json();

        return new Response(JSON.stringify(responseBody), {
          status: response.status,
        });
      },
    },
  })(input, init).then((response) =>
    response.json().then((data: T) => ({
      data,
      status: response.status,
    })),
  );
};
