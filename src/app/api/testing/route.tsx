import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(
      'https://api.openweathermap.org/data/2.5/forecast?lat=51.752021&lon=-1.257726&appid=6333923a9a17420b59e8008b5fcc6dcf',
    );
    const data = await res.json();
    console.log('dataa', data);
    return NextResponse.json({ data: data });
  } catch (error) {
    return new Response('error  has been occured', {
      status: 500,
    });
  }
}
