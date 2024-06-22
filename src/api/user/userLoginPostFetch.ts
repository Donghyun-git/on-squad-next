import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface UserLoginPostFetchParams {
  email: string;
  password: string;
}

export interface UserLoginResponse extends ResponseModel {}

export const userLoginPostFetch = (params: UserLoginPostFetchParams) =>
  apiFetch.post<UserLoginResponse>('/auth/login', {
    body: JSON.stringify(params),
  });
