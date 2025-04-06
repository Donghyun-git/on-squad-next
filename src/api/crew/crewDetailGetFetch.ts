import { apiFetch } from '../common';
import { ResponseModel, MbtiType, HashTagType } from '../model';

export interface CrewDetailGetFetchParams {
  /**
   * 크루 pk
   */
  crewId: number;
}

export interface CrewDetailResponseProps extends ResponseModel {
  data: {
    /**
     * 크루 pk
     */
    id: number;

    /**
     * 크루 이름
     */
    name: string;

    /**
     * 크루 소개
     */
    introduce: string;

    /**
     * 크루 상세 정보
     */
    detail: string;

    /**
     * 크루 대표 이미지
     * - 없을 경우 서버 default 이미지
     */
    imageUrl: string;

    /**
     * 카카오 오픈챗 링크
     */
    kakaoLink: string;

    /**
     * 해시태그
     * - 첫번 째 인덱스는 멤버 수 int
     */
    hashtags: [number, ...HashTagType[]];

    /**
     * 크루 주인 이름
     */
    crewOwner: {
      /**
       * 크루 주인 pk
       */
      id: number;

      /**
       * 주인 닉네임
       */
      nickname: string;

      mbti: MbtiType;
    };
  };
}

/**
 * 크루 상세 정보 조회
 */
export const crewDetailGetFetch = ({ crewId }: CrewDetailGetFetchParams) =>
  apiFetch.get<CrewDetailResponseProps>(`/crews/${crewId}`);
