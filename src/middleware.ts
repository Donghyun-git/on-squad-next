import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('next-auth.session-token')?.value;

  if (accessToken) {
    const protectedPaths = ['/login', '/join'];

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      const root = new URL('/', request.url);

      return NextResponse.redirect(root);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/join'],
};
