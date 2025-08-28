import { storageKeys } from '@/constants';
import route from '@/routes';
import { NextRequest, NextResponse } from 'next/server';

const publicPaths = ['/login', '/register', '/verify-otp'];
const privatePaths = ['/user'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get(storageKeys.ACCESS_TOKEN);
  if (accessToken) {
    if (publicPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL(route.home, request.nextUrl));
    }
  } else if (privatePaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(route.login, request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    '/user/:path*',
    '/',
    '/user'
  ]
};
