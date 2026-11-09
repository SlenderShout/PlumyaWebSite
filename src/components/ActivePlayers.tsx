"use client";

import { useState, useEffect, useCallback } from "react";
import { Server, Copy, Check, Users, RefreshCw } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

interface MCStatusResponse {
  success: boolean;
  online: boolean;
  playersOnline: number;
  playersMax: number;
  version?: string;
  motd?: string | null;
  icon?: string | null;
}

export default function ActivePlayers() {
  const { settings } = useApp();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mcStatus, setMcStatus] = useState<MCStatusResponse | null>(null);

  const serverAddress = settings.serverIp || settings.serverIP || "play.plumya.net";

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/mc-status?server=${encodeURIComponent(serverAddress)}`);
      if (res.ok) {
        const data: MCStatusResponse = await res.json();
        setMcStatus(data);
      }
    } catch (e) {
      console.warn("mcstatus fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [serverAddress]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 45000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const isOnline = mcStatus ? mcStatus.online : true;
  const online = mcStatus?.online ? mcStatus.playersOnline : (settings.onlinePlayers || 0);
  const max = mcStatus?.online ? mcStatus.playersMax : (settings.maxPlayers || 200);
  const percentage = max > 0 ? Math.min((online / max) * 100, 100) : 0;

  const copyIP = () => {
    navigator.clipboard.writeText(serverAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-xl p-4 sm:p-5 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300">
            <Server size={15} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                Sunucu Durumu
              </h3>
              <button
                onClick={fetchStatus}
                title="Yenile"
                aria-label="Sunucu durumunu yenile"
                className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <RefreshCw size={11} className={loading ? "animate-spin text-purple-400" : ""} />
              </button>
            </div>
            <p className="text-[11px] text-zinc-400">Java &amp; Bedrock v1.20+</p>
          </div>
        </div>

        {/* Status Pill */}
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-medium ${
            isOnline
              ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
              : "bg-amber-500/10 border-amber-500/25 text-amber-400"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            }`}
          />
          <span>{isOnline ? "Çevrim içi" : "Bakımda"}</span>
        </div>
      </div>

      {/* Players Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5 text-xs">
          <span className="text-zinc-400 flex items-center gap-1.5">
            <Users size={13} className="text-zinc-500" />
            Aktif Oyuncu
          </span>
          <span className="font-mono text-xs font-semibold text-white">
            <span className={isOnline ? "text-emerald-400" : "text-amber-400"}>
              {online.toLocaleString()}
            </span>
            <span className="text-zinc-500"> / </span>
            {max.toLocaleString()}
          </span>
        </div>

        <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOnline ? "bg-purple-500" : "bg-amber-500"
            }`}
            style={{ width: `${Math.max(percentage, 4)}%` }}
          />
        </div>
      </div>

      {/* IP Box */}
      <div className="flex items-center gap-2 p-1.5 rounded-lg bg-black/40 border border-white/[0.08]">
        <code className="flex-1 text-xs font-mono text-zinc-300 px-2 truncate select-all">
          {serverAddress}
        </code>
        <button
          onClick={copyIP}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.1] transition-all cursor-pointer shrink-0"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Kopyalandı</span>
            </>
          ) : (
            <>
              <Copy size={12} className="text-zinc-400" />
              <span>Kopyala</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
