"use client";

import { useApp } from "@/contexts/AppContext";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShoppingBag,
  Coins,
  Star,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import type { CoinPackage } from "@/lib/types";

function MarketContent() {
  const { coinPackages, currentUser, refreshData } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSuccess = searchParams.get("payment") === "success";
  const creditedCoins = searchParams.get("coins");

  const [loadingPkgId, setLoadingPkgId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePurchase = async (pkg: CoinPackage) => {
    setErrorMessage("");

    if (!currentUser) {
      router.push(`/login?callbackUrl=/market`);
      return;
    }

    setLoadingPkgId(pkg.id);
    try {
      const res = await fetch("/api/payment/paywant/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg.id }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.paymentUrl) {
        // Redirect to Paywant Payment Gateway (or test sandbox)
        window.location.href = data.paymentUrl;
      } else {
        setErrorMessage(data.error || "Ödeme oluşturulamadı.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Ödeme sistemine bağlanılırken bir hata oluştu.");
    } finally {
      setLoadingPkgId(null);
    }
  };

  return (
    <div className="min-h-screen py-14 px-4 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Success Modal / Banner */}
        {isSuccess && (
          <div className="mb-10 p-6 rounded-3xl glass-panel border border-emerald-500/40 bg-emerald-950/30 text-center animate-in fade-in zoom-in duration-300 relative">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-xl font-black text-white mb-1">
              Ödemeniz Başarıyla Tamamlandı!
            </h3>
            <p className="text-xs text-purple-200/80 max-w-md mx-auto mb-4">
              Paywant üzerinden yaptığınız işlem onaylandı ve{" "}
              <strong className="text-emerald-300 font-bold">
                +{creditedCoins || "Kredi"}
              </strong>{" "}
              hesabınıza aktarıldı. İyi oyunlar dileriz!
            </p>
            <button
              onClick={() => {
                refreshData();
                router.push("/market");
              }}
              className="gradient-btn px-6 py-2 rounded-xl text-xs font-bold text-white shadow-md shadow-purple-600/30 cursor-pointer"
            >
              Tamam
            </button>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 text-center">
            {errorMessage}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-200 text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-fuchsia-400" />
            <span>Paywant ile 3D Secure Güvenli Ödeme</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
              <ShoppingBag size={20} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Kredi <span className="gradient-title">Mağazası</span>
            </h1>
          </div>
          <p className="text-purple-200/70 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Plumya sunucusunda özel eşyalara, unvanlara ve ayrıcalıklara sahip olmak için aşağıdaki kredi paketlerinden birini Paywant güvencesiyle satın alabilirsiniz.
          </p>

          {/* Payment Methods Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5 text-[11px] text-purple-300/80">
            <span className="px-3 py-1 rounded-lg bg-black/30 border border-purple-500/20 flex items-center gap-1.5">
              <CreditCard size={12} className="text-purple-400" /> Kredi / Banka Kartı
            </span>
            <span className="px-3 py-1 rounded-lg bg-black/30 border border-purple-500/20 flex items-center gap-1.5">
              <Lock size={12} className="text-emerald-400" /> Güvenli Ödeme
            </span>
            <span className="px-3 py-1 rounded-lg bg-black/30 border border-purple-500/20 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-fuchsia-400" /> Otomatik Anında Teslimat
            </span>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {coinPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between ${
                pkg.popular
                  ? "glass-panel border-purple-400/50 shadow-[0_0_40px_rgba(168,85,247,0.25)] ring-1 ring-purple-400/30 scale-105 z-10 bg-gradient-to-b from-purple-950/70 via-[#190e2d]/80 to-[#120822]/90"
                  : "glass-panel glass-panel-hover"
              }`}
            >
              {/* Popular Ribbon */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="gradient-btn text-white text-xs font-black px-4 py-1 rounded-full flex items-center gap-1.5 shadow-md shadow-purple-500/40 uppercase tracking-wider">
                    <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                    En Çok Tercih Edilen
                  </span>
                </div>
              )}

              <div>
                {/* Package Name */}
                <div className="text-center pt-2 mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-purple-300/60 font-medium">
                    Paywant ile Anında Teslim
                  </p>
                </div>

                {/* Coin Display Box */}
                <div className="py-5 px-4 rounded-2xl bg-black/40 border border-purple-500/20 text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Coins className="w-7 h-7 text-amber-400 animate-pulse" />
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      {pkg.coins.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-purple-300/70">
                    Oyun İçi Kredi
                  </span>

                  {/* Bonus Badge */}
                  {pkg.bonus && pkg.bonus > 0 ? (
                    <div className="mt-3 pt-3 border-t border-purple-500/20">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        <Sparkles size={12} />
                        +{pkg.bonus} Bonus Kredi Hediye!
                      </span>
                    </div>
                  ) : null}
                </div>

                {/* Features list */}
                <ul className="space-y-2 mb-8 text-xs text-purple-200/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Tüm oyun modlarında geçerli bakiye</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Paywant 3D Secure / Kart / Mobil / Havale</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Ödeme sonrası saniyeler içinde hesaba geçer</span>
                  </li>
                </ul>
              </div>

              {/* Price & Action Button */}
              <div>
                <div className="text-center mb-4">
                  <span className="text-3xl font-black text-white">{pkg.price}</span>
                  <span className="text-lg text-purple-300/80 font-bold ml-1">₺</span>
                </div>

                <button
                  onClick={() => handlePurchase(pkg)}
                  disabled={loadingPkgId === pkg.id}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 ${
                    pkg.popular
                      ? "gradient-btn text-white shadow-lg shadow-purple-500/40 hover:scale-[1.02]"
                      : "bg-white/[0.05] hover:bg-white/[0.1] text-purple-100 border border-purple-500/30 hover:border-purple-400/60"
                  }`}
                >
                  {loadingPkgId === pkg.id ? (
                    <span>Paywant Hazırlanıyor...</span>
                  ) : (
                    <>
                      <span>Paywant ile Satın Al</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info notice */}
        <div className="mt-14 glass-panel rounded-2xl p-6 text-center max-w-2xl mx-auto border border-purple-500/20">
          <p className="text-xs text-purple-300/70 leading-relaxed">
            🔒 <strong className="text-purple-200">Paywant Güvencesi:</strong> Ödemeleriniz Paywant altyapısı üzerinden 3D Secure güvenlik protokolüyle gerçekleşir. Kredi kartı bilgileriniz hiçbir şekilde sunucumuzda saklanmaz. Yaşadığınız her türlü konuda <Link href="/support" className="text-fuchsia-400 underline hover:text-fuchsia-300">Destek Talebi</Link> açabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MarketPage() {
  return (
    <Suspense fallback={<div className="text-purple-300 text-xs py-20 text-center">Yükleniyor...</div>}>
      <MarketContent />
    </Suspense>
  );
}
