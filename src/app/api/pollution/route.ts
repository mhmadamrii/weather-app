import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    console.log('api key', apiKey);
    console.log('lat', lat);
    console.log('lon', lon);

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log(error);
    return new Response('Error', { status: 500 });
  }
}
