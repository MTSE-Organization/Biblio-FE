import { AppConstants } from '@/constants';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const components = searchParams.get('components') || 'country:vn';
  const fields = searchParams.get('fields') || 'geometry';
  const placeid = searchParams.get('placeid') || '';
  const sessiontoken = searchParams.get('sessiontoken') || '';
  const use_case = searchParams.get('use_case') || 'shopee.account';
  const v = searchParams.get('v') || '3';
  const group = searchParams.get('group') || 'DS';

  const apiUrl = `${AppConstants.shopeeAddressUrl}v4/geo/details?components=${encodeURIComponent(
    components
  )}&fields=${encodeURIComponent(fields)}&placeid=${encodeURIComponent(
    placeid
  )}&group=${group}&sessiontoken=${encodeURIComponent(
    sessiontoken
  )}&use_case=${encodeURIComponent(use_case)}&v=${encodeURIComponent(v)}`;

  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Shopee API error: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ data: data.result.geometry.location });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch Shopee API', detail: err.message },
      { status: 500 }
    );
  }
}
