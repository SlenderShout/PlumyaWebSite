import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { seedDatabaseIfEmpty } from '@/lib/db-seed';

export async function GET() {
  try {
    await seedDatabaseIfEmpty();

    const [settings, news, packages, recentUsers, recentCredits] =
      await Promise.all([
        prisma.siteSettings.findUnique({
          where: { id: 'default' },
        }),
        prisma.news.findMany({
          orderBy: { createdAt: 'desc' },
          take: 12,
        }),
        prisma.coinPackage.findMany({
          where: { active: true },
          orderBy: { price: 'asc' },
        }),
        prisma.user.findMany({
          select: {
            id: true,
            username: true,
            createdAt: true,
            role: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        }),
        prisma.creditLoad.findMany({
          select: {
            id: true,
            username: true,
            amount: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        }),
      ]);

    const activeSettings = settings || {
      id: 'default',
      showRecentRegistrations: true,
      showRecentCredits: true,
      announcement: 'Plumya Sunucusuna Hoş Geldiniz! 🍇',
      serverIp: 'play.plumya.net',
      serverPort: '25565',
      maxPlayers: 200,
      onlinePlayers: 47,
    };

    return NextResponse.json({
      success: true,
      settings: {
        ...activeSettings,
        serverIP: activeSettings.serverIp,
      },
      news: news.map((n) => ({
        ...n,
        date: n.createdAt.toISOString(),
      })),
      coinPackages: packages,
      recentUsers: recentUsers.map((u) => ({
        ...u,
        registeredAt: u.createdAt.toISOString(),
      })),
      recentCredits: recentCredits.map((c) => ({
        ...c,
        date: c.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Data API error:', error);
    return NextResponse.json(
      { error: 'Veri yüklenirken hata oluştu.' },
      { status: 500 }
    );
  }
}
