"use client";

import { useApp } from "@/contexts/AppContext";
import Announcement from "@/components/Announcement";
import ActivePlayers from "@/components/ActivePlayers";
import RecentRegistrations from "@/components/RecentRegistrations";
import RecentCredits from "@/components/RecentCredits";
import NewsCard from "@/components/NewsCard";
import DiscordWidget from "@/components/DiscordWidget";
import { Copy, Check, ShieldCheck, Zap, Globe, Cpu, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const { settings, news } = useApp();
  const [copied, setCopied] = useState(false);

  const serverAddress = settings.serverIp || settings.serverIP || "play.plumya.net";

  const copyIP = () => {
    navigator.clipboard.writeText(serverAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Top Announcement Bar */}
      <Announcement />

      {/* Hero Section */}
      <section className="relative pt-14 pb-12 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        {/* Status Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>play.plumya.net</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400 font-sans">Java &amp; Bedrock v1.20+</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
          Plumya Minecraft Network
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          Survival ve Emek SkyBlock sunucusu. 128 tickrate optimize altyapı, dengeli pazar ekonomisi ve hilesiz rekabetçi oyun dünyası.
        </p>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-12">
          {/* IP Copy Button */}
          <button
            onClick={copyIP}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-mono text-xs font-medium transition-all cursor-pointer group"
          >
            <span>{serverAddress}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white shrink-0 transition-colors" />
            )}
          </button>

          {/* Market CTA */}
          <Link
            href="/market"
            className="w-full sm:w-auto gradient-btn flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg text-white font-medium text-xs transition-all"
          >
            <span>Mağazayı İncele</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Main 3-Column Content Layout:
          Left: Son Kayıt Olanlar & Discord
          Center: Güncel Haberler & Duyurular
          Right: Sunucu Durumu & Son Kredi Yüklemeleri
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* SOL: Son Kayıt Olanlar (3 Kolon) */}
          <aside className="lg:col-span-3 space-y-5 order-2 lg:order-1">
            {settings.showRecentRegistrations && <RecentRegistrations />}
            <DiscordWidget />
          </aside>

          {/* ORTA: Haberler & Duyurular (6 Kolon) */}
          <main className="lg:col-span-6 space-y-4 order-1 lg:order-2">
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
                Güncel Haberler &amp; Duyurular
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                {news.length} duyuru
              </span>
            </div>

            {news.length === 0 ? (
              <div className="glass-panel rounded-xl p-8 text-center">
                <p className="text-zinc-400 text-xs">
                  Henüz yayınlanmış bir duyuru bulunmuyor.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {news.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            )}
          </main>

          {/* SAĞ: Sunucu Durumu & Son Kredi Yüklemeleri (3 Kolon) */}
          <aside className="lg:col-span-3 space-y-5 order-3">
            <ActivePlayers />
            {settings.showRecentCredits && <RecentCredits />}
          </aside>

        </div>
      </section>
    </div>
  );
}
