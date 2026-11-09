"use client";

import { useState } from "react";
import { Megaphone, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function Announcement() {
  const { settings } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (!settings.announcement || dismissed) return null;

  return (
    <aside aria-label="Sunucu Duyurusu" className="relative z-40 bg-purple-950/40 border-b border-purple-500/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
              <Megaphone size={11} />
              Duyuru
            </span>
            <p className="text-zinc-200 truncate font-normal">
              {settings.announcement}
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0 cursor-pointer"
            title="Duyuruyu gizle"
            aria-label="Duyuruyu kapat"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
