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
  const { file, hashtags, ...rest } = params;

  const formData = new FormData();

  formData.append('file', file);
  formData.append(
    'crewCreateRequest',
    new Blob(
      [
        JSON.stringify({
          ...rest,
          hashTags: hashtags,
        }),
      ],
      {
        type: 'application/json',
      },
    ),
  );

  return apiFetch<AddCrewResponseProps>('/api/v1/crew/new', {
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    method: 'POST',
    body: formData,
  });
};
