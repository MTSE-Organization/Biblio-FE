import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://shopee.vn/api/v4/location/get_child_division_list?division_id=0&use_case=shopee.account',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'application/json'
        },
        cache: 'no-store'
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch Shopee API' },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
