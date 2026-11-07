"use client";

import { Coins, Sparkles, TrendingUp } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function RecentCredits() {
  const { settings, creditLoads } = useApp();

  if (!settings.showRecentCredits) return null;

  const recentLoads = [...creditLoads]
    .sort(
      (a, b) =>
        new Date(b.date || b.createdAt || 0).getTime() -
        new Date(a.date || a.createdAt || 0).getTime()
    )
    .slice(0, 5);

  if (recentLoads.length === 0) return null;

  return (
    <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
      {/* Subtle top glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-fuchsia-600/15 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-purple-500/15">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500/25 to-fuchsia-500/25 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Coins size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Son Kredi Yüklemeleri
            </h3>
            <p className="text-[11px] text-purple-300/60">Destekleyen oyuncularımız</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
          <TrendingUp size={12} className="inline mr-1" />
          Aktif
        </span>
      </div>

      <ul className="space-y-2.5">
        {recentLoads.map((load) => (
          <li
            key={load.id}
            className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white/[0.02] border border-purple-500/10 hover:border-amber-400/30 hover:bg-white/[0.04] transition-all"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-purple-100 truncate">
                {load.username}
              </p>
              <p className="text-[10px] text-purple-300/50">
                {new Date(load.date || load.createdAt || Date.now()).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-sm">
              <Coins size={13} className="text-amber-400" />
              <span>+{load.amount}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
