import {
  Sparkles,
  ShieldCheck,
  Zap,
  Heart,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-20 right-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-200 text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-fuchsia-400" />
            <span>Biz Kimiz?</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight">
            🍇 Plumya <span className="gradient-title">Hakkında</span>
          </h1>
          <p className="text-purple-200/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Plumya, oyuncularına lagsiz, adil ve samimi bir Minecraft çok oyunculu ortamı sunmak amacıyla hayata geçirilmiş erik temalı bir sunucu ağıdır.
          </p>
        </div>

        {/* Story & Mission Card */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 border border-purple-500/25 space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-2xl">🌱</span>
            <span>Hikayemiz ve Amacımız</span>
          </h2>
          <p className="text-sm md:text-base text-purple-200/80 leading-relaxed">
            Plumya, klasik ve monotonlaşmış sunucu deneyimlerinden sıkılan oyuncular için taze, yenilikçi ve güvenilir bir alternatif olarak kuruldu. Amacımız, her yaştan oyuncunun güvenle katılabileceği, adaletin ve saygının ön planda olduğu, uzun soluklu bir Minecraft dünyası inşa etmektir.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-purple-500/15">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-purple-500/15 text-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-white mb-1">Adil Oyun</h3>
              <p className="text-xs text-purple-300/60">Hilesiz, eşit ve dengeli oyun ortamı.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-purple-500/15 text-center">
              <Zap className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-white mb-1">Yüksek Performans</h3>
              <p className="text-xs text-purple-300/60">Kesintisiz 20 TPS ve 0 lag deneyimi.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-purple-500/15 text-center">
              <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-white mb-1">Samimi Topluluk</h3>
              <p className="text-xs text-purple-300/60">Birlikte eğlenen dostça bir ortam.</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="glass-panel rounded-3xl p-8 md:p-10 text-center bg-gradient-to-b from-purple-950/60 via-[#180e2b]/80 to-[#120822]/90 border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
            Aramıza Katılmaya Hazır Mısın?
          </h3>
          <p className="text-sm text-purple-200/80 mb-6 max-w-lg mx-auto">
            Hemen sunucu adresimizi kopyalayarak Minecraft üzerinden Plumya dünyasına bağlanabilirsin!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="gradient-btn px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-purple-600/30"
            >
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/market"
              className="px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-purple-200 font-semibold text-sm border border-purple-500/30 transition-all"
            >
              Mağazayı Gör
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
