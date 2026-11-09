"use client";

import { UserPlus } from "lucide-react";
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
    <div className="glass-panel rounded-xl p-4 sm:p-5 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3.5 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300">
            <UserPlus size={15} />
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Son Kayıt Olanlar
            </h3>
            <p className="text-[11px] text-zinc-400">Yeni katılan oyuncular</p>
          </div>
        </div>
        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
          {recentUsers.length} üye
        </span>
      </div>

      {/* Member List */}
      <ul className="space-y-2">
        {recentUsers.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all"
          >
            <img
              src={`https://mc-heads.net/avatar/${encodeURIComponent(user.username)}/28`}
              alt={user.username}
              className="w-7 h-7 rounded-sm bg-zinc-800 shrink-0 object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-zinc-200 truncate">
                {user.username}
              </p>
              <p className="text-[10px] text-zinc-500 font-mono">
                {new Date(user.createdAt || user.registeredAt || Date.now()).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
              Oyuncu
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
