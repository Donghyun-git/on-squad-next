import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  nickname: yup.string().required('닉네임을 입력해주세요.'),
  introduce: yup.string(),
  kakaoLink: yup.string(),
  profileImage: yup.mixed(),
  mbti: yup.string(),
  address: yup.string().required('주소를 입력해주세요.'),
  addressDetail: yup.string(),
});
