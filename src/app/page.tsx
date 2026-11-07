"use client";

import { useApp } from "@/contexts/AppContext";
import Announcement from "@/components/Announcement";
import ActivePlayers from "@/components/ActivePlayers";
import RecentRegistrations from "@/components/RecentRegistrations";
import RecentCredits from "@/components/RecentCredits";
import NewsCard from "@/components/NewsCard";
import DiscordWidget from "@/components/DiscordWidget";
import { Copy, Check, Sparkles, ShieldCheck, Zap } from "lucide-react";
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
    <div className="min-h-screen relative overflow-hidden pb-20">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-purple-600/20 via-fuchsia-600/15 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-72 -left-40 w-96 h-96 bg-purple-700/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 -right-40 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Announcement */}
      <Announcement />

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-200 text-xs font-semibold mb-6 shadow-sm backdrop-blur-md">
            <Sparkles size={14} className="text-fuchsia-400" />
            <span>Türkiye&apos;nin Yeni Nesil Erik Temalı Sunucusu</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4 select-none">
            <span className="gradient-title drop-shadow-md">PLUMYA</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-purple-200 font-medium mb-3 max-w-2xl mx-auto">
            Gelişmiş sistemler, kesintisiz eğlence ve erik tadında bir topluluk!
          </p>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10 max-w-md mx-auto">
            {/* IP Copy Button */}
            <button
              onClick={copyIP}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl glass-panel glass-panel-hover text-white font-mono text-sm tracking-wide shadow-lg cursor-pointer group"
            >
              <span className="text-purple-200 font-bold">{serverAddress}</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-purple-300 group-hover:text-white shrink-0 transition-colors" />
              )}
            </button>

            {/* Join Minecraft Button */}
            <a
              href={`minecraft://${serverAddress}`}
              className="w-full sm:w-auto gradient-btn flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-purple-500/30"
            >
              <Zap size={16} />
              Hemen Katıl
            </a>
          </div>

        </div>
      </section>

      {/* Main 3-Column Content Layout:
          Left: Son Kayıt Olanlar & Topluluk
          Center: Haberler & Duyurular (ORTADA)
          Right: Sunucu Durumu & Son Kredi Yüklemeleri
      */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* SOL TARAF: Son Kayıt Olanlar (3 Kolon) */}
          <aside className="lg:col-span-3 space-y-6 order-2 lg:order-1">
            {settings.showRecentRegistrations && <RecentRegistrations />}

            {/* Discord Canlı Widget Embed */}
            <DiscordWidget />
          </aside>

          {/* ORTA TARAF: Haberler & Duyurular (6 Kolon) */}
          <main className="lg:col-span-6 space-y-5 order-1 lg:order-2">
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <span className="text-xl">📰</span>
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Güncel Haberler & Duyurular
                </h2>
              </div>
              <span className="text-xs text-purple-300/60 font-medium">
                {news.length} Haber Mevcut
              </span>
            </div>

            {news.length === 0 ? (
              <div className="glass-panel rounded-2xl p-10 text-center">
                <p className="text-purple-300/70 text-sm">
                  Henüz yayınlanmış bir haber bulunmuyor.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            )}
          </main>

          {/* SAĞ TARAF: Sunucu Durumu & Son Kredi Yüklemeleri (3 Kolon) */}
          <aside className="lg:col-span-3 space-y-6 order-3">
            <ActivePlayers />
            {settings.showRecentCredits && <RecentCredits />}

            {/* Mağaza Kısayolu */}
            <div className="glass-panel rounded-2xl p-5 bg-gradient-to-br from-purple-950/40 via-fuchsia-950/30 to-purple-950/40 border border-purple-500/25 relative overflow-hidden">
              <h4 className="text-sm font-bold text-white mb-1.5">
                Kredi Mağazası 🛒
              </h4>
              <p className="text-xs text-purple-200/70 leading-relaxed mb-3">
                Avantajlı paketleri incele, sunucuda öne çık ve özel eşyalara sahip ol.
              </p>
              <Link
                href="/market"
                className="block text-center w-full py-2 px-3 rounded-xl gradient-btn text-white font-bold text-xs shadow-md shadow-purple-900/40"
              >
                Paketleri İncele →
              </Link>
            </div>
          </aside>

        </div>
      </section>
    </div>
  );
}
