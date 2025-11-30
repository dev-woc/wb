import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { getWeatherByCity } from '@/lib/utils/weather';
import {
  getWeatherBasedRecommendations,
  getOccasionBasedRecommendations,
} from '@/lib/utils/recommendations';

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city') || 'New York';
    const occasion = searchParams.get('occasion');

    const items = await prisma.clothingItem.findMany({
      where: { userId: session.user.id },
    });

    if (items.length === 0) {
      return NextResponse.json({
        recommendations: [],
        message: 'Add items to your wardrobe to get recommendations',
      });
    }

    let recommendations;

    if (occasion) {
      recommendations = getOccasionBasedRecommendations(items, occasion);
    } else {
      const weather = await getWeatherByCity(city);
      recommendations = getWeatherBasedRecommendations(items, weather);
    }

    return NextResponse.json({
      recommendations,
      weather: await getWeatherByCity(city),
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
