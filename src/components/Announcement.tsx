"use client";

import { useState } from "react";
import { Megaphone, X, Sparkles } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function Announcement() {
  const { settings } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (!settings.announcement || dismissed) return null;

  return (
    <div className="relative z-40 bg-gradient-to-r from-purple-950/60 via-fuchsia-950/40 to-purple-950/60 backdrop-blur-md border-b border-purple-500/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-1 rounded-md bg-purple-500/20 text-purple-300 shrink-0">
              <Megaphone size={14} className="animate-pulse" />
            </span>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[11px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 shrink-0">
                Duyuru
              </span>
              <p className="text-sm text-purple-100 font-medium truncate">
                {settings.announcement}
              </p>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg text-purple-300/70 hover:text-purple-100 hover:bg-purple-500/20 transition-colors shrink-0 cursor-pointer"
            title="Kapat"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
