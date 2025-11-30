import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const isPublic = searchParams.get('public') === 'true';

    const where: any = isPublic
      ? { isPublic: true }
      : { userId: session.user.id };

    const outfits = await prisma.outfit.findMany({
      where,
      include: {
        items: {
          include: {
            clothingItem: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            likedBy: true,
            savedBy: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ outfits });
  } catch (error) {
    console.error('Error fetching outfits:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, itemIds, occasion, season, imageUrl, isPublic } = body;

    if (!name || !itemIds || itemIds.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const outfit = await prisma.outfit.create({
      data: {
        userId: session.user.id,
        name,
        description,
        occasion,
        season,
        imageUrl,
        isPublic: isPublic ?? true,
        items: {
          create: itemIds.map((itemId: string) => ({
            clothingItem: {
              connect: { id: itemId },
            },
          })),
        },
      },
      include: {
        items: {
          include: {
            clothingItem: true,
          },
        },
      },
    });

    return NextResponse.json({ outfit }, { status: 201 });
  } catch (error) {
    console.error('Error creating outfit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
