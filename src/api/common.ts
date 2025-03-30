import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/app/api/auth/options';
import axios from 'axios';

export const apiFetch = axios.create({
  baseURL: 'http://192.168.0.13:8087',
  headers: {
    'Content-Type': 'application/json',
    timeout: 5000,
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
      const session = await getServerSession(authOptions);
      if (session) {
        config.headers['Authorization'] = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      console.error('서버 세션 가져오기 오류:', error);
    }
    return config;
  });
}
