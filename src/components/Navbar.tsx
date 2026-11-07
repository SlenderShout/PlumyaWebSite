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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0c0617]/85 backdrop-blur-xl border-b border-purple-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between gap-4">
          
          {/* Left Side: Logo (flex-1) */}
          <div className="flex items-center flex-1 justify-start min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-xl font-bold group transition-transform hover:scale-105 shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <img
                  src="/plumya-logo.png"
                  alt="Plumya Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="gradient-title tracking-tight font-extrabold text-2xl">
                Plumya
              </span>
            </Link>
          </div>

          {/* Center Side: Nav Links (Naturally Centered in flex flow, Zero Overlap) */}
          <div className="hidden lg:flex items-center justify-center shrink-0">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-purple-500/15 backdrop-blur-md">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      active
                        ? "text-white bg-gradient-to-r from-purple-600/80 to-fuchsia-600/80 shadow-md shadow-purple-500/25 border border-purple-400/30"
                        : "text-purple-200/70 hover:text-white hover:bg-purple-500/10"
                    }`}
                  >
                    <Icon size={14} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side: User Controls (flex-1) */}
          <div className="flex items-center flex-1 justify-end gap-2 min-w-0">
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-950/70 to-fuchsia-950/70 border border-purple-500/30 text-xs font-bold text-fuchsia-300 shadow-inner">
                    <Coins size={13} className="text-yellow-400" />
                    <span>{currentUser.credits.toLocaleString()}</span>
                    <span className="text-[10px] text-purple-300/70">Kredi</span>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-purple-200 hover:text-white hover:bg-purple-500/15 border border-transparent hover:border-purple-500/30 transition-all"
                  >
                    <User size={14} />
                    <span className="max-w-[120px] truncate">{currentUser.username}</span>
                  </Link>

                  {currentUser.role === "admin" && (
                    <Link
                      href="/yonetim-plumya"
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-all shadow-sm"
                    >
                      <Shield size={13} />
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="px-2 py-1 rounded-lg text-xs font-semibold text-purple-300/60 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    Çıkış
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-purple-200 hover:text-white hover:bg-purple-500/15 border border-purple-500/20 transition-all"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/register"
                    className="gradient-btn px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-md shadow-purple-600/30"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-purple-300 hover:text-white hover:bg-purple-500/20 transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-purple-500/20 bg-[#0c0617]/95 backdrop-blur-2xl">
          <div className="px-4 py-3 space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-white bg-gradient-to-r from-purple-600 to-fuchsia-600"
                      : "text-purple-200/70 hover:text-white hover:bg-purple-500/10"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}

            <div className="border-t border-purple-500/20 pt-3 mt-3 space-y-2">
              {currentUser ? (
                <>
                  <div className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-purple-950/40 border border-purple-500/20 text-sm">
                    <span className="text-purple-300">Bakiye</span>
                    <span className="font-bold text-fuchsia-300 flex items-center gap-1">
                      <Coins size={14} className="text-yellow-400" />
                      {currentUser.credits.toLocaleString()} Kredi
                    </span>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium text-purple-200 hover:text-white hover:bg-purple-500/10"
                  >
                    <User size={16} />
                    Profil ({currentUser.username})
                  </Link>
                  {currentUser.role === "admin" && (
                    <Link
                      href="/yonetim-plumya"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    >
                      <Shield size={16} />
                      Admin Paneli
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3.5 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <X size={16} />
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium text-purple-200 bg-white/[0.04] border border-purple-500/20"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium gradient-btn text-white"
                  >
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
