import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import type { NextRequest } from 'next/server';

import { PATH } from './constants/paths';

export async function middleware(request: NextRequest) {
  const session = await auth();

  const accessToken = session?.accessToken;

  const { redirect, next } = NextResponse;

  if (!accessToken) {
    const proctectedPaths = ['/crews'];

    if (proctectedPaths.includes(request.nextUrl.pathname)) {
      const root = new URL(PATH.root, request.url);

      return redirect(root);
    }
  }

  if (accessToken) {
    const protectedPaths = ['/login', '/join'];

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      const root = new URL(PATH.root, request.url);

      return redirect(root);
    }
  }

  return next();
}

export const config = {
  matcher: ['/login', '/join', '/crews'],
};
