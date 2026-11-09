"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/market", label: "Market" },
  { href: "/support", label: "Destek" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/kvkk", label: "KVKK & Sözleşme" },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText("play.plumya.net");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-[#09090b] border-t border-white/[0.08] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-purple-950/80 border border-purple-500/30 flex items-center justify-center overflow-hidden">
                <img
                  src="/plumya-logo.png"
                  alt="Plumya Logo"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Plumya Network
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Java &amp; Bedrock destekli Minecraft topluluk sunucusu. Dengeli ekonomi ve korumalı oyun altyapısı.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap md:justify-center gap-5">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Server IP Action */}
          <div className="flex md:justify-end">
            <button
              onClick={copyIP}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 transition-all cursor-pointer"
            >
              <span>play.plumya.net</span>
              {copied ? (
                <span className="text-emerald-400 font-sans font-medium text-[11px] flex items-center gap-1">
                  <Check size={12} /> Kopyalandı
                </span>
              ) : (
                <Copy size={12} className="text-zinc-500" />
              )}
            </button>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <p>© 2026 Plumya Network. Tüm hakları saklıdır.</p>
          <p>
            Plumya bağımsız bir topluluk sunucusudur. Mojang AB veya Microsoft ile resmi bir bağlantısı bulunmamaktadır.
          </p>
        </div>
      </div>
    </footer>
  );
}
