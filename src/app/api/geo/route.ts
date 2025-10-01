import envConfig from '@/config';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json(
      { error: 'Missing query param q' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://geocode.maps.co/search?q=${encodeURIComponent(q)}&api_key=${envConfig.NEXT_PUBLIC_API_ADDRESS_GEO_API_KEY}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from geocode' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
