"use client";

import { useState } from "react";
import { Newspaper, Calendar, User, ArrowRight, Sparkles, X, BookOpen } from "lucide-react";
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

  const isLong = news.content.length > 170;
  const contentPreview = isLong ? news.content.slice(0, 170) + "..." : news.content;

  return (
    <>
      <article
        onClick={() => setModalOpen(true)}
        className="glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden group flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.01]"
      >
        {/* Top accent gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Background glow orb */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-fuchsia-600/20 transition-all pointer-events-none" />

        <div>
          {/* Meta Header */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-purple-900/50 to-fuchsia-900/50 border border-purple-400/30 text-purple-200">
              <Sparkles size={11} className="text-fuchsia-400" />
              Sunucu Haberi
            </span>

            <span className="flex items-center gap-1.5 text-xs text-purple-300/60 font-medium">
              <Calendar size={13} className="text-purple-400/80" />
              {dateFormatted}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-white mb-2.5 group-hover:text-purple-200 transition-colors leading-snug">
            {news.title}
          </h3>

          {/* Content Preview */}
          <p className="text-sm text-purple-200/80 leading-relaxed mb-4 whitespace-pre-line">
            {contentPreview}
          </p>
        </div>

        {/* Footer Info */}
        <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between mt-auto text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
              {news.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-purple-300 font-medium">
              {news.author}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="text-purple-400 group-hover:text-fuchsia-300 flex items-center gap-1.5 font-bold transition-all cursor-pointer hover:underline"
          >
            <span>Devamı</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </article>

      {/* Full News Article Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel rounded-3xl p-6 md:p-8 max-w-2xl w-full border border-purple-400/30 shadow-2xl relative max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-purple-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              title="Kapat"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="pr-10 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                  <BookOpen size={11} /> Haber Detayı
                </span>
                <span className="text-xs text-purple-300/60 font-medium flex items-center gap-1">
                  <Calendar size={12} /> {dateFormatted}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                {news.title}
              </h2>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-purple-500/15 text-xs text-purple-300">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                {news.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-white">{news.author}</p>
                <p className="text-[10px] text-purple-400/70">Plumya Yönetim Ekibi</p>
              </div>
            </div>

            {/* Full Content */}
            <div className="text-sm md:text-base text-purple-100/90 leading-relaxed whitespace-pre-line space-y-3 mb-6">
              {news.content}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between">
              <p className="text-[11px] text-purple-300/50">
                Plumya Network Resmi Duyurusu
              </p>
              <button
                onClick={() => setModalOpen(false)}
                className="gradient-btn px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md shadow-purple-600/30 cursor-pointer"
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
