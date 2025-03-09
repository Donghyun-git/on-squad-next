import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import returnFetch, { FetchArgs } from 'return-fetch';
import { signOut } from 'next-auth/react';
import { useModalStackStore } from '@/store/useModalStackStore';
import { Alert } from '@/components/Alert';

export class HttpError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string, message?: string) {
    super(message || statusText);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
  }

  static Unauthorized(message?: string) {
    return new HttpError(401, 'Unauthorized', message);
  }

  static NotFound(message?: string) {
    return new HttpError(404, 'Not Found', message);
  }

  static InternalServerError(message?: string) {
    return new HttpError(500, 'Internal Server Error', message);
  }
}
interface CreateApiFetchParamsType {
  getSession: () => Promise<any>;
}

const createApiFetch = ({ getSession }: CreateApiFetchParamsType) => {
  return async <T>(
    input: URL | RequestInfo,
    init?: RequestInit,
  ): Promise<{ data: T; status: number }> => {
    return returnFetch({
      baseUrl: 'http://192.168.0.13:8087',
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
      interceptors: {
        request: async (config: FetchArgs) => {
          const session = await getSession();

          if (session) {
            if (!config[1]) {
              config[1] = {};
            }
            if (!config[1].headers) {
              config[1].headers = {};
            }
            const headers = new Headers(config[1].headers);

            if (session.accessToken) {
              // Headers 객체를 변환하여 Authorization 헤더 추가
              headers.set('Authorization', `Bearer ${session.accessToken}`);
            }

            config[1].headers = Object.fromEntries(headers.entries());
          }

          console.log('Request Config => ', config);

          return config;
        },

        response: async (response: Response) => {
          if (typeof window !== undefined) {
            // 응답의 Content-Length 확인
            const contentLength = response.headers.get('Content-Length');
            const contentType = response.headers.get('Content-Type');

            // 소셜로그인 처리
            if (
              contentLength === '0' ||
              !contentType?.includes('application/json')
            ) {
              const isSocialLogin = response.headers.get('location');

              return new Response(
                JSON.stringify({
                  headers: isSocialLogin
                    ? {
                        location: response.headers.get('location'),
                      }
                    : {},
                  body: {},
                }),
                {
                  status: response.status,
                },
              );
            }
          }

          const responseBody = await response.json();

          return new Response(JSON.stringify(responseBody), {
            status: response.status,
          });
        },
      },
    })(input, init).then(async (response) => {
      return await response.json().then((data) => {
        if (data?.status === 401 && !data?.success) {
          if (typeof window !== 'undefined') {
            const openModal = useModalStackStore.getState().pushModal;

            openModal(
              Alert({
                title: '세션 만료',
                children: '로그아웃 된 사용자 입니다!',
                onClick: () => signOut({ redirect: true, callbackUrl: '/' }),
              }),
            );
          } else {
            console.log('throw expired', response);
            throw HttpError.Unauthorized('세션이 만료되었습니다');
          }
        }
        return {
          data,
          status: response.status,
        };
      });
    });
  };
};

// 클라이언트 사이드용 함수
export const clientApiFetch = createApiFetch({
  getSession: async () => {
    const session = await getSession();

    return Promise.resolve(session);
  },
});

// 서버 사이드용 함수
export const serverApiFetch = createApiFetch({
  getSession: async () => await getServerSession(authOptions),
});

// 환경에 따라 적절한 함수를 선택하는 래퍼 함수
export const apiFetch = <T>(
  input: URL | RequestInfo,
  init?: RequestInit,
): Promise<{ data: T; status: number }> => {
  if (typeof window !== 'undefined') {
    return clientApiFetch<T>(input, init);
  } else {
    return serverApiFetch<T>(input, init);
  }
};
