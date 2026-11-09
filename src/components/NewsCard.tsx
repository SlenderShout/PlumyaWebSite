"use client";

import { useState } from "react";
import { Calendar, ArrowRight, X } from "lucide-react";
import type { News } from "@/lib/types";

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const dateFormatted = new Date(news.date || news.createdAt || Date.now()).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isLong = news.content.length > 180;
  const contentPreview = isLong ? news.content.slice(0, 180) + "..." : news.content;

  return (
    <>
      <article
        onClick={() => setModalOpen(true)}
        className="glass-panel glass-panel-hover rounded-xl p-5 relative overflow-hidden group flex flex-col justify-between cursor-pointer"
      >
        <div>
          {/* Header Metadata */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-[11px] font-medium text-purple-400 uppercase tracking-wider">
              Duyuru
            </span>

            <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <Calendar size={12} className="text-zinc-500" />
              {dateFormatted}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors leading-snug">
            {news.title}
          </h3>

          {/* Preview */}
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4 whitespace-pre-line line-clamp-3">
            {contentPreview}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between mt-auto text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-purple-950 border border-purple-500/30 flex items-center justify-center text-[10px] font-bold text-purple-300">
              {news.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-zinc-300 text-xs font-medium">
              {news.author}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="text-xs font-medium text-purple-400 group-hover:text-purple-300 flex items-center gap-1 transition-all cursor-pointer hover:underline"
          >
            <span>Devamını Oku</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </article>

      {/* Detail Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121217] rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-white/[0.1] shadow-2xl relative max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-150"
          >
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-3 text-xs text-zinc-400 font-mono">
              <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/25 font-sans font-medium text-[11px]">
                Duyuru
              </span>
              <span>•</span>
              <span>{dateFormatted}</span>
              <span>•</span>
              <span className="text-zinc-300">{news.author}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
              {news.title}
            </h2>

            <div className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line space-y-3 border-t border-white/[0.08] pt-4">
              {news.content}
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="btn-secondary px-4 py-2 rounded-lg text-xs font-medium cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
