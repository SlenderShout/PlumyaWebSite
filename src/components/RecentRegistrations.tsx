"use client";

import { UserPlus, Sparkles } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function RecentRegistrations() {
  const { settings, users } = useApp();

  if (!settings.showRecentRegistrations) return null;

  const recentUsers = [...users]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.registeredAt || 0).getTime() -
        new Date(a.createdAt || a.registeredAt || 0).getTime()
    )
    .slice(0, 5);

  if (recentUsers.length === 0) return null;

  return (
    <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
      {/* Subtle top glow */}
      <div className="absolute -top-12 -left-12 w-28 h-28 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-purple-500/15">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600/30 to-fuchsia-600/30 border border-purple-400/30 flex items-center justify-center text-purple-300">
            <UserPlus size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Son Kayıt Olanlar
            </h3>
            <p className="text-[11px] text-purple-300/60">Aramıza yeni katılanlar</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
          {recentUsers.length}
        </span>
      </div>

      <ul className="space-y-2.5">
        {recentUsers.map((user, idx) => (
          <li
            key={user.id}
            className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-purple-500/10 hover:border-purple-400/30 hover:bg-white/[0.04] transition-all"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-700 to-indigo-800 flex items-center justify-center text-xs font-bold text-white shadow-sm border border-purple-400/20">
                {user.username.charAt(0).toUpperCase()}
              </div>
              {idx === 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-fuchsia-500 rounded-full flex items-center justify-center text-[8px] text-white">
                  ★
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-purple-100 truncate group-hover:text-white transition-colors">
                {user.username}
              </p>
              <p className="text-[10px] text-purple-300/50">
                {new Date(user.createdAt || user.registeredAt || Date.now()).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-300/80 border border-purple-500/15">
              Üye
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
