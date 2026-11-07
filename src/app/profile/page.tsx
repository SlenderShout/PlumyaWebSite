"use client";

import { useApp } from "@/contexts/AppContext";
import { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Coins,
  Calendar,
  LogIn,
  Save,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { currentUser, creditLoads, updateUser } = useApp();
  const [email, setEmail] = useState(currentUser?.email || "");
  const [saved, setSaved] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="glass-panel rounded-3xl p-8 md:p-10 text-center max-w-md w-full shadow-2xl border border-purple-500/30">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto mb-4">
            <LogIn size={26} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Giriş Yapmalısınız
          </h2>
          <p className="text-xs text-purple-300/70 mb-6 leading-relaxed">
            Profilinizi ve kredi hareketlerinizi görüntülemek için lütfen hesabınıza giriş yapın.
          </p>
          <Link
            href="/login"
            className="gradient-btn inline-block text-white font-bold text-sm rounded-xl px-8 py-3 shadow-lg shadow-purple-600/30"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  const userCredits = creditLoads.filter(
    (c) => c.username === currentUser.username
  );

  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    updateUser(currentUser.id, { email: email.trim() });
    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch {
      // ignore
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const roleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: "bg-red-500/20 text-red-300 border-red-500/30",
      moderator: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      user: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    };
    const labels: Record<string, string> = {
      admin: "Yönetici (Admin)",
      moderator: "Moderatör",
      user: "Oyuncu (Üye)",
    };
    return (
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full border ${styles[role] || styles.user}`}
      >
        {labels[role] || role}
      </span>
    );
  };

  return (
    <div className="min-h-screen py-14 px-4 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-purple-900/40 border border-purple-400/30">
              {currentUser.username.charAt(0).toUpperCase()}
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                  {currentUser.username}
                </h1>
                {roleBadge(currentUser.role)}
              </div>
              <p className="text-xs text-purple-300/70 mb-3">
                {currentUser.email}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-purple-300/70">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-purple-400" />
                  Kayıt:{" "}
                  {new Date(currentUser.createdAt || currentUser.registeredAt || Date.now()).toLocaleDateString("tr-TR")}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-amber-300">
                  <Coins size={14} className="text-amber-400" />
                  {currentUser.credits.toLocaleString()} Kredi
                </span>
              </div>
            </div>

            <Link
              href="/market"
              className="gradient-btn px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md shadow-purple-600/30 shrink-0"
            >
              + Kredi Yükle
            </Link>
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Edit Form */}
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Mail size={16} className="text-purple-400" />
              Hesap Bilgilerini Düzenle
            </h2>
            <p className="text-xs text-purple-300/60 mb-5">
              İletişim için geçerli e-posta adresinizi girin.
            </p>

            <form onSubmit={handleSaveEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-purple-500/25 focus:border-purple-400 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all"
                  required
                />
              </div>

              {saved && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5">
                  <CheckCircle size={14} />
                  <span>Bilgileriniz başarıyla kaydedildi!</span>
                </div>
              )}

              <button
                type="submit"
                className="gradient-btn px-5 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/30 cursor-pointer"
              >
                <Save size={14} />
                Kaydet
              </button>
            </form>
          </div>

          {/* Credit Load History */}
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Coins size={16} className="text-amber-400" />
              Kredi Yükleme Geçmişi
            </h2>
            <p className="text-xs text-purple-300/60 mb-5">
              Son yaptığınız bakiye işlemleri.
            </p>

            {userCredits.length === 0 ? (
              <div className="py-8 text-center text-xs text-purple-300/50">
                Henüz kayıtlı bir kredi yüklemeniz bulunmuyor.
              </div>
            ) : (
              <ul className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {userCredits.map((credit) => (
                  <li
                    key={credit.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-purple-500/15 text-xs"
                  >
                    <div>
                      <p className="font-bold text-emerald-400">
                        +{credit.amount} Kredi Yüklendi
                      </p>
                      <p className="text-[10px] text-purple-300/50">
                        {new Date(credit.date || credit.createdAt || Date.now()).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      Onaylandı
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
