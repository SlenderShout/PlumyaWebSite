"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X, Coins, LogOut, Swords } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/market", label: "Market" },
  { href: "/support", label: "Destek" },
  { href: "/about", label: "Hakkımızda" },
];

export default function Navbar() {
  const { currentUser, logout } = useApp();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className={isHome ? "absolute top-0 inset-x-0 z-40 pt-4" : "sticky top-0 z-40 pt-4 pb-4 bg-[var(--bg)]"}>
      <nav className="wrap" aria-label="Ana menü">
        <div className="bg-[var(--bg)]/85 border border-[var(--line)] flex items-center justify-between h-14 pl-4 pr-2 gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Plumya ana sayfa">
            <Logo size={30} />
            <span className="font-display text-xl font-bold tracking-wide">Plumya</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`text-[13px] font-bold uppercase tracking-[0.14em] transition-colors ${
                      active ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                <Link
                  href="/market"
                  className="hidden sm:flex items-center gap-1.5 px-3 h-9 border border-[var(--line)] hover:border-[var(--line-strong)] text-sm font-bold"
                >
                  <Coins size={15} className="text-[var(--accent)]" />
                  <span className="tabular-nums">{currentUser.credits.toLocaleString("tr-TR")}</span>
                </Link>
                <Link href="/profile" className="flex items-center gap-2 px-2 h-9 hover:bg-[var(--surface-2)] transition-colors">
                  <img
                    src={`https://mc-heads.net/avatar/${encodeURIComponent(currentUser.username)}/64`}
                    alt=""
                    width={26}
                    height={26}
                    className="w-[26px] h-[26px] bg-[var(--surface-3)]"
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />
                  <span className="hidden sm:block text-sm font-bold max-w-[110px] truncate">{currentUser.username}</span>
                </Link>
                {currentUser.role === "admin" && (
                  <Link href="/yonetim-plumya" className="btn-gold h-9 px-3 flex items-center gap-1.5 text-xs uppercase">
                    <Shield size={14} />
                    <span className="hidden sm:inline">Yönetim</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  title="Çıkış yap"
                  aria-label="Çıkış yap"
                  className="w-9 h-9 flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <Link href="/login" className="btn-gold h-9 px-4 flex items-center gap-2 text-xs uppercase">
                <Swords size={14} />
                Giriş Yap
              </Link>
            )}

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex items-center justify-center cursor-pointer"
              aria-label="Menüyü aç/kapat"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <ul className="md:hidden mt-1 bg-[var(--bg)] border border-[var(--line)] px-4 py-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-sm font-bold uppercase tracking-[0.14em] ${
                    isActive(href) ? "text-[var(--accent)]" : "text-[var(--muted)]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            {!currentUser && (
              <li>
                <Link href="/register" onClick={() => setOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
                  Kayıt Ol
                </Link>
              </li>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
}
