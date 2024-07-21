import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface UserLoginPostFetchParams {
  email?: string;
  password?: string;
}

export interface UserLoginResponse extends ResponseModel {
  accessToken: {
    value: string;
  };
  refreshToken: {
    value: string;
  };
}

export const userLoginPostFetch = (params: UserLoginPostFetchParams) =>
  apiFetch<UserLoginResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(params),
  });
