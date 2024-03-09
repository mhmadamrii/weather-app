import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat');
  const lon = req.nextUrl.searchParams.get('lon');
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );
    const data = await res.json();
    return NextResponse.json({ data: data });
  } catch (error) {
    return new Response('error  has been occured', {
      status: 500,
    });
  }
}
