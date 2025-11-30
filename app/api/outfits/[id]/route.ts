import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const outfit = await prisma.outfit.findUnique({
      where: { id },
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
    });

    if (!outfit) {
      return NextResponse.json({ error: 'Outfit not found' }, { status: 404 });
    }

    return NextResponse.json({ outfit });
  } catch (error) {
    console.error('Error fetching outfit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, occasion, season, imageUrl, isPublic } = body;

    const existingOutfit = await prisma.outfit.findUnique({
      where: { id },
    });

    if (!existingOutfit) {
      return NextResponse.json({ error: 'Outfit not found' }, { status: 404 });
    }

    if (existingOutfit.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const outfit = await prisma.outfit.update({
      where: { id },
      data: {
        name,
        description,
        occasion,
        season,
        imageUrl,
        isPublic,
      },
      include: {
        items: {
          include: {
            clothingItem: true,
          },
        },
      },
    });

    return NextResponse.json({ outfit });
  } catch (error) {
    console.error('Error updating outfit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingOutfit = await prisma.outfit.findUnique({
      where: { id },
    });

    if (!existingOutfit) {
      return NextResponse.json({ error: 'Outfit not found' }, { status: 404 });
    }

    if (existingOutfit.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.outfit.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting outfit:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
