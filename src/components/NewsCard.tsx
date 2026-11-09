"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import type { News } from "@/lib/types";
import PixelScene, { type Mood } from "./PixelScene";

interface NewsCardProps {
  news: News;
  index?: number;
}

const MOODS: Mood[] = ["night", "day", "dusk"];

function hash(s: string) {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export default function NewsCard({ news, index = 0 }: NewsCardProps) {
  const [open, setOpen] = useState(false);

  const date = new Date(news.date || news.createdAt || 0).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const preview = news.content.length > 120 ? news.content.slice(0, 120).trimEnd() + "…" : news.content;
  const seed = hash(news.id || news.title);

  return (
    <>
      <article
        className="group relative bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--line-strong)] transition-colors flex flex-col cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="aspect-[4/5] overflow-hidden bg-[var(--surface-2)]">
          {news.image ? (
            <img src={news.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
              <PixelScene seed={seed % 97} mood={MOODS[(index + seed) % 3]} cols={60} rows={75} />
            </div>
          )}
        </div>

        <div className="p-4 pb-9 flex-1 flex flex-col">
          <p className="text-xs font-bold text-[var(--accent)]">{date}</p>
          <h3 className="font-display text-xl font-bold mt-1 leading-snug">{news.title}</h3>
          <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed whitespace-pre-line">{preview}</p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="mt-auto pt-4 self-start flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)] cursor-pointer"
          >
            Devamını oku
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <span className="corner bl" />
        <span className="corner br" />
      </article>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={news.title}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[var(--surface)] border border-[var(--line-strong)] max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="h-40 overflow-hidden">
              {news.image ? (
                <img src={news.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <PixelScene seed={seed % 97} mood={MOODS[(index + seed) % 3]} cols={120} rows={40} />
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-[var(--bg)] hover:bg-[var(--surface-3)] transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X size={18} />
            </button>
            <div className="p-6 sm:p-8">
              <p className="text-sm text-[var(--muted)]">
                {date} · {news.author}
              </p>
              <h2 className="font-display text-3xl font-bold mt-1 mb-4 leading-tight">{news.title}</h2>
              <div className="text-base leading-relaxed whitespace-pre-line">{news.content}</div>
              <button onClick={() => setOpen(false)} className="btn-ghost mt-8 px-5 py-2 text-xs uppercase cursor-pointer">
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
