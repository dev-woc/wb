import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { outfitId } = body;

    if (!outfitId) {
      return NextResponse.json(
        { error: 'Missing outfit ID' },
        { status: 400 }
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_outfitId: {
          userId: session.user.id,
          outfitId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });

      await prisma.outfit.update({
        where: { id: outfitId },
        data: { likes: { decrement: 1 } },
      });

      return NextResponse.json({ liked: false });
    }

    await prisma.like.create({
      data: {
        userId: session.user.id,
        outfitId,
      },
    });

    await prisma.outfit.update({
      where: { id: outfitId },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json({ liked: true });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
