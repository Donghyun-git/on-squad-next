import { getSession } from 'next-auth/react';
import axios from 'axios';
import { auth } from '@/auth';

export const apiFetch = axios.create({
  baseURL: 'http://192.168.0.10:8087/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 클라이언트 측 인터셉터
if (typeof window !== 'undefined') {
  apiFetch.interceptors.request.use(async (config) => {
    try {
      const session = await getSession();

      if (session) {
        config.headers['Authorization'] = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      console.error('클라이언트 세션 가져오기 오류:', error);
    }
    return config;
  });
}
// 서버 측 인터셉터
else {
  apiFetch.interceptors.request.use(async (config) => {
    try {
      // 비동기 컨텍스트에서 getServerSession 호출
      const session = await auth();

      if (session) {
        config.headers['Authorization'] = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      console.error('서버 세션 가져오기 오류:', error);
    }
    return config;
  });
}
