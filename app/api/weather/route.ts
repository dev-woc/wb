import { NextResponse } from 'next/server';
import { getWeather, getWeatherByCity } from '@/lib/utils/weather';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const city = searchParams.get('city');

    let weatherData;

    if (lat && lon) {
      weatherData = await getWeather(parseFloat(lat), parseFloat(lon));
    } else if (city) {
      weatherData = await getWeatherByCity(city);
    } else {
      return NextResponse.json(
        { error: 'Missing location parameters' },
        { status: 400 }
      );
    }

    if (!weatherData) {
      return NextResponse.json(
        { error: 'Failed to fetch weather data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ weather: weatherData });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
