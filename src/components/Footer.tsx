"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import Logo from "./Logo";

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/market", label: "Market" },
  { href: "/support", label: "Destek" },
  { href: "/about", label: "Hakkımızda" },
];

export default function Footer() {
  const { settings } = useApp();
  const [copied, setCopied] = useState(false);
  const ip = settings.serverIp || settings.serverIP || "play.plumya.net";
  const invite = settings.discordInviteUrl || "https://discord.gg";

  const copy = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const head = "text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent)] mb-4";
  const link = "text-[var(--muted)] hover:text-[var(--ink)] transition-colors";

  return (
    <footer className="mt-28 border-t border-[var(--line)]">
      <div className="wrap py-14 grid gap-10 md:grid-cols-[1.8fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <Logo size={30} />
            <span className="font-display text-2xl font-bold">Plumya</span>
          </div>
          <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm">
            Java &amp; Bedrock destekli Minecraft topluluk sunucusu. Emek veren oyuncunun karşılığını alması için dengeli
            ekonomi, hilesiz oyun ve ilgili bir yetkili ekibi.
          </p>
        </div>

        <div>
          <h2 className={head}>Hızlı menü</h2>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={head}>Topluluk</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={invite} target="_blank" rel="noreferrer" className={link}>
                Discord
              </a>
            </li>
            <li>
              <button onClick={copy} className={`${link} flex items-center gap-2 cursor-pointer`}>
                {ip}
                {copied ? <Check size={14} className="text-[var(--grass)]" /> : <Copy size={14} />}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={head}>Bağlantılar</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/kvkk" className={link}>
                KVKK &amp; Sözleşme
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--muted)]">
        <p>© 2026 Plumya Network. Tüm hakları saklıdır.</p>
        <p>Mojang AB veya Microsoft ile resmi bir bağlantısı yoktur.</p>
      </div>
    </footer>
  );
}
