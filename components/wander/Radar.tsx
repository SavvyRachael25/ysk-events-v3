"use client";

import type { NearbyHit } from "@/lib/wander/geo";
import { WALK_M_PER_MIN } from "@/lib/wander/geo";
import { CATEGORY_META } from "@/lib/wander/types";

interface Props {
  hits: NearbyHit[];
  radiusM: number;
  anchorLabel: string;
  highlightId?: string | null;
  onPick?: (id: string) => void;
}

/**
 * A compass-style plot: the anchor in the middle, north up, rings every
 * five minutes of walking, one dot per place. Not a map. It answers "which
 * direction and how far", which is all you need to decide where to drift.
 */
export default function Radar({ hits, radiusM, anchorLabel, highlightId, onPick }: Props) {
  // Wider than tall so names have room to hang off the dots on both sides.
  const width = 420;
  const height = 340;
  const cx = width / 2;
  const cy = height / 2 + 4;
  const r = height / 2 - 26;
  const c = cx; // kept for the x axis
  const cyy = cy;
  const ringEvery = 5 * WALK_M_PER_MIN;
  const rings: number[] = [];
  for (let m = ringEvery; m <= radiusM + 1; m += ringEvery) rings.push(m);
  if (rings.length > 6) {
    const step = Math.ceil(rings.length / 6);
    for (let i = rings.length - 1; i >= 0; i--) if (i % step !== step - 1 && i !== rings.length - 1) rings.splice(i, 1);
  }
  const showLabels = hits.length <= 14;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-radar mx-auto block h-auto w-full max-w-[440px]" role="img" aria-label={`${hits.length} places within ${Math.round(radiusM / WALK_M_PER_MIN)} minutes of ${anchorLabel}`}>
      {rings.map((m) => {
        const rr = (m / radiusM) * r;
        return (
          <g key={m}>
            <circle cx={c} cy={cyy} r={rr} fill="none" stroke="var(--w-line-strong)" strokeDasharray="3 4" />
            <text x={c + rr * 0.7071 + 3} y={cyy + rr * 0.7071 + 3} fontSize="9" fill="var(--w-muted)">{Math.round(m / WALK_M_PER_MIN)} min</text>
          </g>
        );
      })}
      <text x={c} y={cyy - r - 8} fontSize="10" fontWeight="700" textAnchor="middle" fill="var(--w-muted)">N</text>
      <circle cx={c} cy={cyy} r={6} fill="var(--w-ink)" />
      <circle cx={c} cy={cyy} r={11} fill="none" stroke="var(--w-ink)" strokeOpacity="0.25" />
      {hits.map((h) => {
        const d = (Math.min(h.metres, radiusM) / radiusM) * r;
        const θ = (h.bearing * Math.PI) / 180;
        const x = c + d * Math.sin(θ);
        const y = cyy - d * Math.cos(θ);
        const hue = CATEGORY_META[h.pin.category].hue;
        const hot = highlightId === h.pin.id;
        const labelLeft = x > c;
        return (
          <g key={h.pin.id} onClick={onPick ? () => onPick(h.pin.id) : undefined} style={onPick ? { cursor: "pointer" } : undefined}>
            <title>{`${h.pin.name}, ${Math.round(h.metres / WALK_M_PER_MIN)} min`}</title>
            {hot && <circle cx={x} cy={y} r={13} fill={hue} fillOpacity="0.25" />}
            <circle cx={x} cy={y} r={hot ? 7 : 5.5} fill={hue} stroke="var(--w-card)" strokeWidth="2" opacity={h.pin.visited ? 0.45 : 1} />
            {showLabels && (
              <text x={labelLeft ? x - 9 : x + 9} y={y + 3.5} fontSize="9.5" fontWeight={hot ? 700 : 500} textAnchor={labelLeft ? "end" : "start"} fill="var(--w-ink-2)">
                {h.pin.name.length > 26 ? `${h.pin.name.slice(0, 25)}…` : h.pin.name}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
