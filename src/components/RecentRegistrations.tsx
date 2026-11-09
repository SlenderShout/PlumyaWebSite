"use client";

import { useApp } from "@/contexts/AppContext";

export default function RecentRegistrations() {
  const { settings, users } = useApp();

  if (!settings.showRecentRegistrations) return null;

  const recent = [...users]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.registeredAt || 0).getTime() - new Date(a.createdAt || a.registeredAt || 0).getTime()
    )
    .slice(0, 8);

  if (recent.length === 0) {
    return <p className="text-center text-sm text-[var(--muted)]">Henüz kayıt bulunmuyor.</p>;
  }

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {recent.map((u) => (
        <li key={u.id} className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--line)] p-3">
          <img
            src={`https://mc-heads.net/avatar/${encodeURIComponent(u.username)}/64`}
            alt=""
            width={36}
            height={36}
            className="w-9 h-9 bg-[var(--surface-3)] shrink-0"
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
          <span className="min-w-0">
            <span className="block font-bold truncate">{u.username}</span>
            <span className="block text-xs text-[var(--muted)]">
              {new Date(u.createdAt || u.registeredAt || 0).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
