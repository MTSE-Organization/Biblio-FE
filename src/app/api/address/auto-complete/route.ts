import { AppConstants } from '@/constants';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const city = searchParams.get('city') || '';
  const district = searchParams.get('district') || '';
  const input = searchParams.get('input') || '';
  const state = searchParams.get('state') || '';
  const sessiontoken = searchParams.get('sessiontoken') || '';

  const apiUrl = `${AppConstants.shopeeAddressUrl}v4/geo/autocomplete?city=${encodeURIComponent(city)}&components=country%3Avn&district=${encodeURIComponent(district)}&input=${encodeURIComponent(input)}&sessiontoken=${sessiontoken}&state=${encodeURIComponent(state)}&use_case=shopee.account&v=3`;

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

    const data = await res.json();
    return NextResponse.json({
      data: {
        content: data?.predictions?.map((item: any) => ({
          id: item.id,
          name: item.partial_description,
          place_id: item.place_id
        }))
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to fetch Shopee API', detail: err.message },
      { status: 500 }
    );
  }
}
