import { apiFetch } from '../common';
import { ResponseModel, MbtiType, HashTagType } from '../model';

export interface CrewHomeInfoGetFetchParams {
  /**
   * 크루 pk
   */
  crewId: number;

  /**
   * 카테고리명
   */
  category: string;

  /**
   * 페이지 수
   */
  page?: number;

  /**
   * 몇개 씩 가져올건지
   */
  size?: number;
}

export interface CrewHomeInfoResponseProps extends ResponseModel {
  data: {
    /**
     * 크루 정보
     */
    crew: {
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
       * 크루 상세정보
       */
      detail: string;

      /**
       * 크루 이미지
       */
      imageUrl: string;

      /**
       * 오픈챗 링크
       */
      kakaoLink: string;

      /**
       * 해시태그
       */
      hashtags: [number, ...HashTagType[]];

      /**
       * 크루 주인
       */
      crewOwner: {
        /**
         * 크루주인 pk
         */
        id: number;

        /**
         * 닉네임
         */
        nickname: string;

        /**
         * mbti
         */
        mbti: MbtiType;
      };
    };

    /**
     * 공지사항
     */
    announces: {
      /**
       * 게시글 pk
       */
      id: number;

      /**
       * 제목
       */
      title: string;

      /**
       * 작성일자
       */
      createdAt: string;

      /**
       * 게시글 상단 고정 여부
       * - true: o
       * - false: x
       */
      fixed: boolean;

      /**
       * 공지사항 적은 유저
       */
      memberInfo: {
        id: number;
        nickname: string;
        role: string;
      };
    }[];

    /**
     * 랭킹
     */
    topMembers: {
      /**
       * 크루 pk
       */
      crewId: number;

      /**
       * 랭킹 순위
       */
      rank: number;

      /**
       * 작성한 게시글 수
       */
      counter: number;

      /**
       * 유저 pk
       */
      memberId: number;

      /**
       * 유저 닉네임
       */
      nickname: string;

      /**
       * mbti
       */
      mbti: MbtiType;

      /**
       * 크루 가입 일자
       * - Date string
       */
      participateAt: string;
    }[];

    squads: {
      /**
       * 스쿼드 pk
       */
      id: number;

      /**
       * 스쿼드 이름
       */
      title: string;

      /**
       * 스쿼드 설명
       */
      content: string;

      /**
       * 모집인원
       */
      capacity: number;

      /**
       * 모집인원 중 남은 인원
       */
      remain: number;

      /**
       * 모임 주소
       */
      address: string;

      /**
       * 모임 상세 주소
       */
      addressDetail: string;

      /**
       * 카카오 링크
       */
      kakaoLink: string;

      /**
       * 디스코드 초대링크
       */
      discordLink: string;

      /**
       * 모집 카테고리
       */
      categories: string[];

      /**
       * 스쿼드 주인 정보
       */
      squadOwner: {
        /**
         * 스쿼드 주인 pk
         */
        id: number;

        /**
         * 스쿼드 주인 닉네임
         */
        nickname: string;

        /**
         * 스쿼드 주인 엠비티아이
         */
        mbti: MbtiType;
      };
    }[];
  };
}

/**
 * 크루 홈페이지 정보
 * - /crews/[slug]/home
 */
export const crewHomeInfoGetFetch = ({
  crewId,
  page,
  size,
  category,
}: CrewHomeInfoGetFetchParams) =>
  apiFetch.get<CrewHomeInfoResponseProps>(
    `/crews/${crewId}/main?page=${page}&size=${size}&category=${category}`,
  );
