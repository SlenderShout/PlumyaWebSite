"use client";

/**
 * Hero picture, drawn in code: a castle against a burning dusk, built from
 * square blocks like everything in the world it belongs to.
 * Flat colour bands only (no gradients). Windows flicker.
 */

const W = 160;
const H = 96;

const SKY = ["#0f0a07", "#150e09", "#1c120a", "#27170b", "#38200c", "#522d0e", "#774113", "#a05a17"];

type Tower = { x: number; w: number; top: number; spire?: number };

const TOWERS: Tower[] = [
  { x: 6, w: 8, top: 40, spire: 9 },
  { x: 18, w: 6, top: 48 },
  { x: 28, w: 12, top: 34, spire: 12 },
  { x: 44, w: 7, top: 46 },
  { x: 55, w: 18, top: 24, spire: 18 },
  { x: 77, w: 10, top: 36, spire: 11 },
  { x: 91, w: 8, top: 44 },
  { x: 103, w: 14, top: 30, spire: 14 },
  { x: 121, w: 6, top: 47 },
  { x: 131, w: 10, top: 38, spire: 10 },
  { x: 145, w: 9, top: 45 },
];

const GROUND_Y = 74;

export default function PixelCastle({ className = "" }: { className?: string }) {
  const bandH = GROUND_Y / SKY.length;
  const stone = "#0b0705";
  const stoneLight = "#150d08";

  const windows: { x: number; y: number; k: number }[] = [];
  TOWERS.forEach((t, ti) => {
    for (let wy = t.top + 5; wy < GROUND_Y - 6; wy += 7) {
      for (let wx = t.x + 2; wx < t.x + t.w - 1; wx += 4) {
        if ((wx * 7 + wy * 3 + ti) % 5 < 2) windows.push({ x: wx, y: wy, k: wx + wy });
      }
    }
  });

  return (
    <svg
      className={`px-scene ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Gün batımında bir kale silüeti"
    >
      {SKY.map((c, i) => (
        <rect key={i} x={0} y={i * bandH} width={W} height={bandH + 0.5} fill={c} />
      ))}

      <rect x={118} y={52} width={8} height={8} fill="#f0b64a" />
      <rect x={120} y={50} width={4} height={2} fill="#f0b64a" />

      <g className="drift" fill="#7a4513" opacity="0.8">
        <rect x={20} y={56} width={22} height={2} />
        <rect x={24} y={54} width={12} height={2} />
        <rect x={86} y={60} width={26} height={2} />
        <rect x={92} y={58} width={12} height={2} />
      </g>

      {/* castle wall connecting the towers */}
      <rect x={0} y={54} width={W} height={GROUND_Y - 54} fill={stone} />
      {Array.from({ length: 40 }, (_, i) => (
        <rect key={i} x={i * 4 + 1} y={52} width={2} height={2} fill={stone} />
      ))}

      {TOWERS.map((t, i) => (
        <g key={i}>
          <rect x={t.x} y={t.top} width={t.w} height={GROUND_Y - t.top} fill={i % 2 ? stoneLight : stone} />
          {t.spire ? (
            <g fill={stone}>
              {Array.from({ length: Math.floor(t.spire / 2) }, (_, s) => (
                <rect key={s} x={t.x + s} y={t.top - (s + 1) * 2} width={Math.max(t.w - s * 2, 1)} height={2} />
              ))}
            </g>
          ) : (
            Array.from({ length: Math.ceil(t.w / 3) }, (_, s) => (
              <rect key={s} x={t.x + s * 3} y={t.top - 2} width={2} height={2} fill={stone} />
            ))
          )}
        </g>
      ))}

      {windows.map((w, i) => (
        <rect key={i} x={w.x} y={w.y} width={1} height={2} fill="#d9962f" opacity={0.75} className={w.k % 3 === 0 ? "flicker" : undefined} />
      ))}

      {/* hills */}
      <rect x={0} y={GROUND_Y} width={W} height={H - GROUND_Y} fill="#0a0604" />
      <rect x={0} y={GROUND_Y} width={34} height={2} fill="#120c07" />
      <rect x={58} y={GROUND_Y} width={40} height={1} fill="#120c07" />
      <rect x={120} y={GROUND_Y} width={40} height={3} fill="#120c07" />
      {/* the last band is the page ground, so the picture dissolves into the page */}
      <rect x={0} y={H - 14} width={W} height={14} fill="#16100b" />
    </svg>
  );
}
