"use client";

import { useApp } from "@/contexts/AppContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, User, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
  const { register } = useApp();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Lütfen tüm alanları doldurunuz.");
      return;
    }

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Girdiğiniz şifreler birbiriyle eşleşmiyor.");
      return;
    }

    if (!kvkkAccepted) {
      setError("Lütfen KVKK Aydınlatma Metni ve Kullanıcı Sözleşmesini onaylayınız.");
      return;
    }

    setLoading(true);
    try {
      const success = await register(username.trim(), email.trim(), password);
      if (success) {
        router.push("/");
      } else {
        setError("Bu kullanıcı adı veya e-posta zaten kayıtlı.");
      }
    } catch {
      setError("Kayıt sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="glass-panel rounded-3xl p-8 md:p-10 w-full max-w-md shadow-2xl border border-purple-500/30 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-2xl text-white shadow-lg shadow-purple-500/30 mx-auto mb-3">
            🍇
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Kayıt <span className="gradient-title">Ol</span>
          </h1>
          <p className="text-xs text-purple-300/70 mt-1">Plumya dünyasına ücretsiz üye olun</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              Minecraft Kullanıcı Adı
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                placeholder="Örn: SteveCraft"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/25 focus:border-purple-400 text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-purple-300/30"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              E-Posta Adresi
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="email"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/25 focus:border-purple-400 text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-purple-300/30"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              Şifre
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/25 focus:border-purple-400 text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-purple-300/30"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1.5">
              Şifre Tekrarı
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/25 focus:border-purple-400 text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-purple-300/30"
                required
              />
            </div>
          </div>

          {/* KVKK & Kullanıcı Sözleşmesi Onayı */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-purple-200/80 select-none">
              <input
                type="checkbox"
                checked={kvkkAccepted}
                onChange={(e) => setKvkkAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-purple-500/30 bg-black/40 text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer shrink-0"
                required
              />
              <span className="leading-tight">
                <Link
                  href="/kvkk"
                  target="_blank"
                  className="text-fuchsia-400 hover:text-fuchsia-300 underline font-semibold transition-colors"
                >
                  KVKK Aydınlatma Metni
                </Link>
                &apos;ni ve{" "}
                <Link
                  href="/kvkk"
                  target="_blank"
                  className="text-fuchsia-400 hover:text-fuchsia-300 underline font-semibold transition-colors"
                >
                  Kullanıcı Sözleşmesi
                </Link>
                &apos;ni okudum, kabul ediyorum.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="gradient-btn w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 mt-2 cursor-pointer disabled:opacity-50"
          >
            <UserPlus size={15} />
            {loading ? "Hesap Oluşturuluyor..." : "Hesap Oluştur"}
          </button>
        </form>

        <p className="text-center text-xs text-purple-300/60 mt-6">
          Zaten bir hesabınız var mı?{" "}
          <Link
            href="/login"
            className="text-fuchsia-400 hover:text-fuchsia-300 font-bold transition-colors"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
