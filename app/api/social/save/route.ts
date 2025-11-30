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

    const existingSave = await prisma.save.findUnique({
      where: {
        userId_outfitId: {
          userId: session.user.id,
          outfitId,
        },
      },
    });

    if (existingSave) {
      await prisma.save.delete({
        where: { id: existingSave.id },
      });

      await prisma.outfit.update({
        where: { id: outfitId },
        data: { saves: { decrement: 1 } },
      });

      return NextResponse.json({ saved: false });
    }

    await prisma.save.create({
      data: {
        userId: session.user.id,
        outfitId,
      },
    });

    await prisma.outfit.update({
      where: { id: outfitId },
      data: { saves: { increment: 1 } },
    });

    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error('Error toggling save:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
