"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Heart } from "lucide-react";

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
    <footer className="relative bg-[#08040f]/90 border-t border-purple-500/20 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left: Logo & Copyright */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
                <span className="text-lg">🍇</span>
              </div>
              <span className="gradient-title font-extrabold text-xl">
                Plumya
              </span>
            </div>
            <p className="text-xs text-purple-300/60 leading-relaxed max-w-sm">
              Plumya Minecraft Sunucusu — Erik temalı benzersiz bir topluluk deneyimi. Tüm hakları saklıdır.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex flex-wrap md:justify-center gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-purple-300/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Server IP Copy */}
          <div className="flex md:justify-end">
            <button
              onClick={copyIP}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-500/25 hover:border-purple-400/50 text-xs font-mono text-purple-200 transition-all cursor-pointer shadow-sm group"
            >
              <span>play.plumya.net</span>
              {copied ? (
                <span className="text-emerald-400 flex items-center gap-1 font-sans font-bold text-[11px]">
                  <Check size={13} /> Kopyalandı
                </span>
              ) : (
                <Copy size={13} className="text-purple-400 group-hover:text-white transition-colors" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-purple-300/40">
          <p>© 2024-2025 Plumya Network. Mojang AB ile resmi bir bağlantısı yoktur.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={11} className="text-pink-500 fill-pink-500" /> for Minecraft players
          </p>
        </div>
      </div>
    </footer>
  );
}
