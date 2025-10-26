import { authApiRequest } from '@/api-requests';
import { storageKeys } from '@/constants';
import { logger } from '@/logger';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const req = await request.json();
  const cookieStore = await cookies();
  const code = req.code;
  try {
    const response = await authApiRequest.loginGoogle(code);
    const accessToken = response?.data?.token!;
    cookieStore.set(storageKeys.ACCESS_TOKEN, accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 7
    });

    return Response.json(
      { data: response },
      {
        status: 200
      }
    );
  } catch (error) {
    logger.error('Error during Google login:', error);
    return Response.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
