import { apiFetch } from '../common';
import { ResponseModel } from '../model';

export interface AddCrewPostFetchParams {
  name: string;
  introduce: string;
  detail: string;
  kakaoLink: string;
  hashtags: string[];
  file: File;
}

export interface AddCrewResponseProps extends ResponseModel {}

export const addCrewPostFetch = (params: AddCrewPostFetchParams) => {
  const { file, ...rest } = params;

  const formData = new FormData();

  formData.append('file', file);
  formData.append(
    'crewCreateRequest',
    new Blob(
      [
        JSON.stringify({
          ...rest,
        }),
      ],
      {
        type: 'application/json',
      },
    ),
  );

  return apiFetch.post<AddCrewResponseProps>('/crews', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
