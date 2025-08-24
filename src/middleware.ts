import { NextRequest } from 'next/server';

const publicPaths = ['/'];
const privatePaths = ['/user'];

export function middleware(request: NextRequest) {}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    '/user/:path*',
    '/',
    '/user'
  ]
};
