import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const apikey = process.env.OPENWEATHERMAP_API_KEY;
    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;

    const dailyRes = await fetch(dailyUrl, {
      next: { revalidate: 3600 },
    });

    return NextResponse.json(dailyRes);
  } catch (error) {
    return new Response('[ERROR_FETCHING_FIVEDAYS]', {
      status: 500,
    });
  }
}
