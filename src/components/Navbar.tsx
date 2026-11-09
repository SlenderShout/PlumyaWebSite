"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  HeadphonesIcon,
  Info,
  User,
  Shield,
  Menu,
  X,
  Coins,
  LogOut,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const navLinks = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "/market", label: "Market", icon: ShoppingBag },
  { href: "/support", label: "Destek", icon: HeadphonesIcon },
  { href: "/about", label: "Hakkımızda", icon: Info },
];

export default function Navbar() {
  const { currentUser, logout } = useApp();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between gap-4">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center flex-1 justify-start min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-bold group shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-500/30 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-purple-400/50 transition-colors">
                <img
                  src="/plumya-logo.png"
                  alt="Plumya Logo"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-purple-200 transition-colors">
                Plumya
              </span>
            </Link>
          </div>

          {/* Center: Clean Minimal Navigation */}
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.07]">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? "text-white bg-white/[0.08] border border-white/[0.1] shadow-xs"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon size={14} className={active ? "text-purple-400" : "text-zinc-500"} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: User State / Auth Actions */}
          <div className="flex items-center flex-1 justify-end gap-2.5 min-w-0">
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {currentUser ? (
                <>
                  {/* Credits Pill */}
                  <Link
                    href="/market"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs font-semibold text-zinc-200 transition-colors"
                  >
                    <Coins size={13} className="text-amber-400" />
                    <span className="font-mono">{currentUser.credits.toLocaleString()}</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Kredi</span>
                  </Link>

                  {/* Profile Link with Avatar */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition-all"
                  >
                    <img
                      src={`https://mc-heads.net/avatar/${encodeURIComponent(currentUser.username)}/20`}
                      alt={currentUser.username}
                      className="w-5 h-5 rounded-sm object-cover bg-zinc-800"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span className="max-w-[110px] truncate">{currentUser.username}</span>
                  </Link>

                  {/* Admin Badge */}
                  {currentUser.role === "admin" && (
                    <Link
                      href="/yonetim-plumya"
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30 hover:bg-purple-500/25 transition-all"
                    >
                      <Shield size={12} />
                      Yönetim
                    </Link>
                  )}

                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    title="Çıkış Yap"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut size={15} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="btn-secondary px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/register"
                    className="gradient-btn px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Menüyü aç/kapat"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#09090b]/98 backdrop-blur-2xl px-4 py-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? "text-white bg-white/[0.08] border border-white/[0.1]"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon size={16} className={active ? "text-purple-400" : "text-zinc-500"} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
            {currentUser ? (
              <div className="flex items-center justify-between w-full">
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-xs font-medium text-white"
                >
                  <img
                    src={`https://mc-heads.net/avatar/${encodeURIComponent(currentUser.username)}/24`}
                    alt={currentUser.username}
                    className="w-6 h-6 rounded-sm bg-zinc-800"
                  />
                  <span>{currentUser.username}</span>
                  <span className="text-zinc-400 font-mono text-[11px]">({currentUser.credits} Kredi)</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-xs text-red-400 hover:underline"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 w-full">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary text-center py-2 rounded-lg text-xs font-medium"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="gradient-btn text-center py-2 rounded-lg text-xs font-medium"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
