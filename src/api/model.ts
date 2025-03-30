export interface ResponseModel {
  success?: boolean;
  error?: {
    code: string;
    message: string;
  };
  status: number;
}

export type HashTagType =
  | '활발한'
  | '트랜디한'
  | '내향적인'
  | '외향적인'
  | '조용한'
  | '겜돌이'
  | '겜순이'
  | '집돌이'
  | '집순이'
  | '술꾼러버'
  | '짜릿한'
  | '모험적인'
  | '창의적인'
  | '열정적인'
  | '도전적인'
  | '긍정적인'
  | '낙천적인'
  | '사교적인'
  | '친화적인'
  | '유쾌한'
  | '재치있는'
  | '활기찬'
  | '열린마음의'
  | '자유로운'
  | '독립적인'
  | '여행'
  | '즉흥적인'
  | '영화'
  | '리프레시'
  | '일탈'
  | '독서'
  | '산책'
  | '애견모임'
  | '먹방'
  | '맛집탐방'
  | '모각공'
  | '카페러버'
  | '분위기있는'
  | '와인';

export type MbtiType =
  | 'ISTJ'
  | 'ISFJ'
  | 'INFJ'
  | 'INTJ'
  | 'ISTP'
  | 'ISFP'
  | 'INFP'
  | 'INTP'
  | 'ESTP'
  | 'ESFP'
  | 'ENFP'
  | 'ENTP'
  | 'ESTJ'
  | 'ESFJ'
  | 'ENFJ'
  | 'ENTJ';
