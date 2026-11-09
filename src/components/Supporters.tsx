"use client";

import Link from "next/link";
import { Crown, Coins, ShoppingCart } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

function Head({ icon: Icon, title }: { icon: typeof Crown; title: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <Icon size={17} className="text-[var(--accent)]" />
    </div>
  );
}

const Avatar = ({ name }: { name: string }) => (
  <img
    src={`https://mc-heads.net/avatar/${encodeURIComponent(name)}/64`}
    alt=""
    width={32}
    height={32}
    className="w-8 h-8 bg-[var(--surface-3)] shrink-0"
    onError={(e) => {
      e.currentTarget.style.visibility = "hidden";
    }}
  />
);

export default function Supporters() {
  const { creditLoads, coinPackages } = useApp();

  const totals = new Map<string, number>();
  creditLoads.forEach((l) => totals.set(l.username, (totals.get(l.username) || 0) + l.amount));
  const lords = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  const recent = [...creditLoads]
    .sort((a, b) => new Date(b.date || b.createdAt || 0).getTime() - new Date(a.date || a.createdAt || 0).getTime())
    .slice(0, 5);

  const packs = coinPackages.slice(0, 5);

  const col = "bg-[var(--parch-dark)] p-5 min-h-[300px]";
  const empty = "text-sm text-[var(--muted)] text-center mt-16";
  const row = "flex items-center gap-3 py-2";

  return (
    <div className="relative bg-[var(--parch)] border border-[var(--accent)] p-3 sm:p-5">
      <div className="grid gap-4 md:grid-cols-3">
        <div className={col}>
          <Head icon={Crown} title="Yüce Lordlar" />
          {lords.length === 0 ? (
            <p className={empty}>Henüz kimse destek vermedi.</p>
          ) : (
            <ol>
              {lords.map(([name, total]) => (
                <li key={name} className={row}>
                  <Avatar name={name} />
                  <span className="flex-1 min-w-0 font-bold truncate">{name}</span>
                  <span className="text-sm font-bold text-[var(--accent)] tabular-nums">
                    {total.toLocaleString("tr-TR")}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className={col}>
          <Head icon={Coins} title="Son Bağışlar" />
          {recent.length === 0 ? (
            <p className={empty}>Henüz bağış yok.</p>
          ) : (
            <ul>
              {recent.map((l) => (
                <li key={l.id} className={row}>
                  <Avatar name={l.username} />
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold truncate">{l.username}</span>
                    <span className="block text-xs text-[var(--muted)]">
                      {new Date(l.date || l.createdAt || 0).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-[var(--accent)] tabular-nums">+{l.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={col}>
          <Head icon={ShoppingCart} title="Pazar Hareketliliği" />
          {packs.length === 0 ? (
            <p className={empty}>Mağazada ürün yok.</p>
          ) : (
            <ul>
              {packs.map((p) => (
                <li key={p.id} className={row}>
                  <span className="w-8 h-8 bg-[var(--surface-3)] flex items-center justify-center text-[var(--accent)] shrink-0">
                    <Coins size={16} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-bold truncate">{p.name}</span>
                    <span className="block text-xs text-[var(--muted)]">{p.coins.toLocaleString("tr-TR")} kredi</span>
                  </span>
                  <span className="text-sm font-bold tabular-nums">{p.price} ₺</span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/market" className="btn-gold mt-3 inline-flex px-4 py-2 text-xs uppercase">
            Markete git
          </Link>
        </div>
      </div>
    </div>
  );
}
