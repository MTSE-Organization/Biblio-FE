import { AppConstants } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const division_id = params.get('division_id');
  try {
    const res = await fetch(
      `${AppConstants.shopeeAddressUrl}v4/location/get_child_division_list?division_id=${division_id}&use_case=shopee.account`,
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
    return NextResponse.json({
      data: data.data.divisions.map((item: any) => ({
        id: item.id,
        name: item.division_name
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
