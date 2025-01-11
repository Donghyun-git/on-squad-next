import { apiFetch } from '../common';
import { MbtiType, ResponseModel } from '../model';

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

export const crewListGetFetch = () =>
  apiFetch<CrewListResponseProps>('/api/v1/crews', {
    method: 'GET',
    cache: 'no-store',
  });

// export const crewListGetFetch = async () => {
//   const res = await fetch('http://192.168.1.47:8087/api/v1/crews', {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'GET',
//   });

//   return res.json();
// };
