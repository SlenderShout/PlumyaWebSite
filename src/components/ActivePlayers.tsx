"use client";

import { useState, useEffect, useCallback } from "react";
import { Server, Copy, Check, Users, RefreshCw, Wifi, WifiOff } from "lucide-react";
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
      console.warn("mcstatus.io fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [serverAddress]);

  useEffect(() => {
    fetchStatus();
    // Auto refresh every 45 seconds
    const interval = setInterval(fetchStatus, 45000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  // Determine online count and maximum players
  // If mcstatus.io is online, use live data; otherwise fallback to settings values
  const isOnline = mcStatus ? mcStatus.online : true;
  const online = mcStatus?.online
    ? mcStatus.playersOnline
    :  0;
  const max = mcStatus?.online
    ? mcStatus.playersMax
    : 0;

  const percentage = max > 0 ? Math.min((online / max) * 100, 100) : 0;

  const copyIP = () => {
    navigator.clipboard.writeText(serverAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group">
      {/* Background radial glow */}
      <div
        className={`absolute -bottom-10 -right-10 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-colors ${
          isOnline ? "bg-emerald-500/10" : "bg-amber-500/10"
        }`}
      />

      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-purple-500/15">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
              isOnline
                ? "bg-gradient-to-tr from-emerald-500/25 to-teal-500/25 border-emerald-400/30 text-emerald-300"
                : "bg-gradient-to-tr from-amber-500/25 to-orange-500/25 border-amber-400/30 text-amber-300"
            }`}
          >
            <Server size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Sunucu Durumu
              </h3>
              <button
                onClick={fetchStatus}
                title="Sunucu Durumunu Yenile"
                className="text-purple-400/60 hover:text-purple-200 transition-colors cursor-pointer"
              >
                <RefreshCw size={11} className={loading ? "animate-spin text-purple-300" : ""} />
              </button>
            </div>
          </div>
        </div>

        {/* Live Status Indicator from mcstatus.io */}
        {isOnline ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[11px] text-emerald-300 font-semibold tracking-wide">
              Çevrimiçi
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
            <span className="inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            <span className="text-[11px] text-amber-300 font-semibold tracking-wide">
              Bakımda
            </span>
          </div>
        )}
      </div>

      {/* Player Count & Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5 text-xs">
          <span className="text-purple-300/80 flex items-center gap-1.5 font-medium">
            <Users size={13} className="text-purple-400" />
            Aktif Oyuncular
          </span>
          <span className="font-bold text-white">
            <span className={isOnline ? "text-emerald-400 font-extrabold" : "text-amber-400 font-extrabold"}>
              {online.toLocaleString()}
            </span>{" "}
            <span className="text-purple-300/50">/</span> {max.toLocaleString()}
          </span>
        </div>
        <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-purple-500/20">
          <div
            className={`h-full rounded-full transition-all duration-700 shadow-sm ${
              isOnline
                ? "bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400"
                : "bg-gradient-to-r from-purple-500 to-amber-500"
            }`}
            style={{ width: `${Math.max(percentage, 5)}%` }}
          />
        </div>
      </div>

      {/* Server IP Copy Box */}
      <div className="pt-2">
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-black/40 border border-purple-500/25">
          <code className="flex-1 text-xs font-mono text-purple-200 px-2 py-1 truncate">
            {serverAddress}
          </code>
          <button
            onClick={copyIP}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-md shadow-purple-900/40 transition-all cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-300" />
                <span className="text-emerald-200">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
