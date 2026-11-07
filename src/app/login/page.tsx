"use client";

import { useApp } from "@/contexts/AppContext";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogIn, User, Lock } from "lucide-react";

function LoginForm() {
  const { login } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Lütfen kullanıcı adı ve şifrenizi giriniz.");
      return;
    }

    setLoading(true);
    try {
      const success = await login(username.trim(), password);
      if (success) {
        if (callbackUrl) {
          router.push(callbackUrl);
        } else if (username.toLowerCase() === "plumyaadmin") {
          router.push("/yonetim-plumya");
        } else {
          router.push("/");
        }
      } else {
        setError("Kullanıcı adı veya şifre hatalı. Kayıtlı değilseniz önce kayıt olun.");
      }
    } catch {
      setError("Giriş sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-8 md:p-10 w-full max-w-md shadow-2xl border border-purple-500/30 relative">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-2xl text-white shadow-lg shadow-purple-500/30 mx-auto mb-3">
          🍇
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
          Giriş <span className="gradient-title">Yap</span>
        </h1>
        <p className="text-xs text-purple-300/70 mt-1">Plumya sunucu hesabınıza bağlanın</p>
      </div>

      {/* Error message */}
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
              placeholder="Örn: PlumyaAdmin veya OyuncuAdi"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

        <button
          type="submit"
          disabled={loading}
          className="gradient-btn w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 mt-2 cursor-pointer disabled:opacity-50"
        >
          <LogIn size={15} />
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>

      <p className="text-center text-xs text-purple-300/60 mt-6">
        Henüz hesabınız yok mu?{" "}
        <Link
          href="/register"
          className="text-fuchsia-400 hover:text-fuchsia-300 font-bold transition-colors"
        >
          Hemen Kayıt Ol
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <Suspense fallback={<div className="text-purple-300 text-xs">Yükleniyor...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
