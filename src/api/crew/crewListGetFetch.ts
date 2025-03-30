import { apiFetch } from '../common';
import { MbtiType, ResponseModel } from '../model';

export interface CrewListGetFetchParams {
  size?: number;
  page?: number;
  crewName?: string;
}

export interface CrewListResponseProps extends ResponseModel {
  data: {
    /**
     * 크루 pk
     */
    id: number;

    /**
     * 크루명
     */
    name: string;

    /**
     * 크루 소개
     */
    introduce: string;

    /**
     * 이미지 링크
     */
    imageUrl: string;

    /**
     * 소통방 링크
     */
    kakaoLink: string;

    /**
     * 해시태그 배열
     * - 0: 멤버수 해시태그 (int)
     * - 1 이후: 문자열 해시태그
     */
    hashtags: [number, ...string[]];

    /**
     * 크루장 정보
     */
    crewOwner: {
      /**
       * 크루장 멤버 pk
       */
      id: number;

      /**
       * 크루장 닉네임
       */
      nickname: string;

      /**
       * 엠비티아이
       */
      mbti: MbtiType;
    };
  }[];
}

export const crewListGetFetch = (params?: CrewListGetFetchParams) => {
  if (params) {
    return apiFetch.get<CrewListResponseProps>(
      `/api/crews?size=${params.size}?page=${params.page}?crewName=${params.crewName}`,
    );
  }

  return apiFetch.get<CrewListResponseProps>('/api/crews');
};
