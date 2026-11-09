"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, Swords, Users, Castle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import PixelCastle from "@/components/PixelCastle";
import NewsCard from "@/components/NewsCard";
import Supporters from "@/components/Supporters";
import RecentRegistrations from "@/components/RecentRegistrations";

const DiscordMark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

function SectionTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-7">
      <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide">{children}</h2>
      {aside}
    </div>
  );
}

export default function HomePage() {
  const { settings, news, users } = useApp();
  const [copied, setCopied] = useState(false);
  const [online, setOnline] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const ip = settings.serverIp || settings.serverIP || "play.plumya.net";
  const invite = settings.discordInviteUrl || "https://discord.gg";

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(`/api/mc-status?server=${encodeURIComponent(ip)}`);
        if (!res.ok) return;
        const d = await res.json();
        if (alive && d.online) setOnline(d.playersOnline);
      } catch {
        /* fall back to settings */
      }
    };
    load();
    const t = setInterval(load, 45000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [ip]);

  const copy = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const players = online ?? settings.onlinePlayers ?? 0;
  const shownNews = showAll ? news : news.slice(0, 3);

  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="relative min-h-[620px] sm:min-h-[680px] overflow-hidden">
        <div className="absolute inset-0">
          <PixelCastle />
        </div>

        <div className="wrap relative pt-40 sm:pt-44 pb-24 text-center flex flex-col items-center">
          <dl className="flex items-start justify-center gap-12 rise">
            <div className="flex flex-col items-center gap-1">
              <Users size={20} className="text-[var(--accent)]" />
              <dd className="text-2xl font-bold tabular-nums leading-none">{players.toLocaleString("tr-TR")}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Çevrimiçi savaşçı</dt>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Castle size={20} className="text-[var(--accent)]" />
              <dd className="text-2xl font-bold tabular-nums leading-none">{(settings.maxPlayers || 200).toLocaleString("tr-TR")}</dd>
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Kale kapasitesi</dt>
            </div>
          </dl>

          <h1 className="font-display font-bold uppercase leading-[1.02] mt-10 text-[clamp(40px,7.4vw,76px)] max-w-[19ch] text-balance rise rise-2">
            Krallığın kaderi <span className="text-[var(--accent)]">senin elinde</span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-[var(--ink)]/85 leading-relaxed rise rise-3">
            Survival ve emek SkyBlock sunucusu. 128 tickrate altyapı, dengeli pazar ekonomisi ve hilesiz, rekabetçi bir oyun dünyası.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 rise rise-4">
            <button
              type="button"
              onClick={copy}
              className="btn-gold h-12 px-7 flex items-center justify-center gap-2.5 text-sm uppercase cursor-pointer"
            >
              <Swords size={17} />
              {copied ? "Adres kopyalandı" : `Savaşa katıl · ${ip}`}
              {copied ? <Check size={16} /> : <Copy size={15} />}
            </button>
            <Link href="/market" className="btn-ghost h-12 px-7 flex items-center justify-center text-sm uppercase bg-[var(--bg)]/60">
              Mağazayı incele
            </Link>
          </div>

          {settings.announcement && (
            <p className="mt-8 text-sm text-[var(--accent)] font-bold">{settings.announcement}</p>
          )}
        </div>
      </section>

      {/* ---------- News ---------- */}
      <section className="wrap pt-6">
        <SectionTitle
          aside={
            news.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)] hover:text-[var(--accent-hover)] cursor-pointer pb-2"
              >
                {showAll ? "Daha az göster" : "Tümünü gör →"}
              </button>
            )
          }
        >
          Güncel gelişmeler
        </SectionTitle>

        {news.length === 0 ? (
          <p className="text-[var(--muted)] py-16 text-center">Henüz yayınlanmış bir duyuru yok.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shownNews.map((item, i) => (
              <NewsCard key={item.id} news={item} index={i} />
            ))}
          </div>
        )}
      </section>

      <div className="wrap mt-24" aria-hidden="true">
        <div className="divider"><i /></div>
      </div>

      {/* ---------- Supporters ---------- */}
      <section className="wrap mt-24">
        <div className="relative">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-[0.18em] text-center bg-[var(--bg)] border border-[var(--accent)] mx-auto w-fit px-10 py-4 relative z-10 -mb-7">
            Destekçilerimiz
          </h2>
          <div className="pt-7">
            {settings.showRecentCredits ? (
              <Supporters />
            ) : (
              <p className="text-center text-[var(--muted)] py-10">Destekçiler listesi şu an gizli.</p>
            )}
          </div>
        </div>
      </section>

      <div className="wrap mt-24" aria-hidden="true">
        <div className="divider"><i /></div>
      </div>

      {/* ---------- Newcomers ---------- */}
      <section className="wrap mt-24">
        <SectionTitle
          aside={
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)] border border-[var(--line)] px-3 py-2 mb-1">
              {users.length} yeni serüvenci
            </span>
          }
        >
          Son katılan serüvenciler
        </SectionTitle>
        <RecentRegistrations />
      </section>

      <div className="wrap mt-24" aria-hidden="true">
        <div className="divider"><i /></div>
      </div>

      {/* ---------- Call to action ---------- */}
      <section className="wrap mt-24 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase">Maceraya sen de katıl</h2>
        <p className="mt-4 max-w-xl mx-auto text-[var(--ink)]/85 leading-relaxed">
          Binlerce oyuncunun beklediği bu büyülü dünyada yerini al. Klanını kur, ekonomiyi yönet ve krallığın geleceğini şekillendir.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={invite}
            target="_blank"
            rel="noreferrer"
            className="bg-[var(--ink)] text-[var(--accent-ink)] hover:bg-white transition-colors h-12 px-7 flex items-center justify-center gap-2.5 text-sm font-bold uppercase tracking-[0.04em]"
          >
            Discord sunucumuza katılın
            <span className="w-7 h-7 bg-[var(--accent)] flex items-center justify-center">
              <DiscordMark />
            </span>
          </a>
          <Link href="/about" className="btn-ghost h-12 px-7 flex items-center justify-center text-sm uppercase">
            Sunucu rehberi
          </Link>
        </div>
      </section>
    </div>
  );
}
