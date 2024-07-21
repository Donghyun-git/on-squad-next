import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface UserInfoGetFetchParams {
  accessToken: string;
}

export interface UserInfoResponse extends ResponseModel {
  data: {
    /**
     * 유저 식별값
     */
    id: number;

    /**
     * 유저 닉네임
     */
    nickname: string;

    /**
     * 유저 이메일
     */
    email: string;

    /**
     * 성별
     */
    gender: 'male' | 'female';

    /**
     * 생년월일
     */
    birth: string;

    /**
     * 로그인 유형
     */
    userType: '일반' | '카카오' | '구글';

    /**
     * 주소
     */
    address: string;

    /**
     * 상세주소
     */
    addressDetail: string;
  };
}

export const userInfoGetFetch = ({ accessToken }: UserInfoGetFetchParams) =>
  apiFetch<UserInfoResponse>('/api/v1/member', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  });
