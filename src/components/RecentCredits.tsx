"use client";

import { Coins } from "lucide-react";
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
    <div className="glass-panel rounded-xl p-4 sm:p-5 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3.5 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-amber-400">
            <Coins size={15} />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Son Kredi Yüklemeleri
            </h3>
            <p className="text-[11px] text-zinc-400">Sunucu destekçileri</p>
          </div>
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
          Canlı
        </span>
      </div>

      {/* Loads List */}
      <ul className="space-y-2">
        {recentLoads.map((load) => (
          <li
            key={load.id}
            className="flex items-center justify-between gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <img
                src={`https://mc-heads.net/avatar/${encodeURIComponent(load.username)}/28`}
                alt={load.username}
                className="w-7 h-7 rounded-sm bg-zinc-800 shrink-0 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-zinc-200 truncate">
                  {load.username}
                </p>
                <p className="text-[10px] text-zinc-500 font-mono">
                  {new Date(load.date || load.createdAt || Date.now()).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold font-mono shrink-0">
              <Coins size={12} className="text-amber-400" />
              <span>+{load.amount}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
