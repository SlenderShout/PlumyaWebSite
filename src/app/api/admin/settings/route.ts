import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) {
    return NextResponse.json({ error: adminCheck.error }, { status: 403 });
  }

  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'default' },
  });

  return NextResponse.json({ success: true, settings });
}

export async function PUT(request: Request) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.authorized) {
    return NextResponse.json({ error: adminCheck.error }, { status: 403 });
  }

  try {
    const data = await request.json();

    const updated = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: {
        announcement: data.announcement,
        serverIp: data.serverIp || data.serverIP,
        showRecentRegistrations: Boolean(data.showRecentRegistrations),
        showRecentCredits: Boolean(data.showRecentCredits),
        onlinePlayers: Number(data.onlinePlayers) || 0,
        maxPlayers: Number(data.maxPlayers) || 100,
      },
      create: {
        id: 'default',
        announcement: data.announcement || 'Plumya Sunucusuna Hoş Geldiniz! 🍇',
        serverIp: data.serverIp || data.serverIP || 'play.plumya.net',
        showRecentRegistrations: Boolean(data.showRecentRegistrations),
        showRecentCredits: Boolean(data.showRecentCredits),
        onlinePlayers: Number(data.onlinePlayers) || 47,
        maxPlayers: Number(data.maxPlayers) || 200,
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error('Admin settings update error:', error);
    return NextResponse.json({ error: 'Ayarlar güncellenemedi.' }, { status: 500 });
  }
}
