import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface SocialLoginGetFetchParams {
  platform: 'kakao' | 'google';
}

export interface SocialLoginPostFetchParams {
  headers: {
    location: string;
  };
  body: {};
}

/**
 * 소셜 로그인
 * - kakao
 * - google
 */
export const userSocialLoginGetFetch = ({
  platform,
}: SocialLoginGetFetchParams) => {
  return apiFetch<SocialLoginPostFetchParams>(
    `/api/v1/login/oauth2/${platform}`,
    {
      method: 'GET',
    },
  );
};
