"use client";

import { useMemo, useState } from "react";
import { Compass } from "lucide-react";
import { clusterPins, distanceM, formatWalk, WALK_M_PER_MIN, type Anchor } from "@/lib/wander/geo";
import { CATEGORY_META, type Category, type Pin } from "@/lib/wander/types";

interface Props {
  pins: Pin[];
  onOpen: (pin: Pin) => void;
  onAnchor: (a: Anchor) => void;
}

const LINK_STOPS = [5, 8, 10, 15, 20] as const;
const REPRESENTATIVE_ORDER: Category[] = ["landmark", "museum", "park", "view", "shop", "restaurant", "cafe", "bakery", "bar", "other"];

export default function ClustersView({ pins, onOpen, onAnchor }: Props) {
  const [stop, setStop] = useState(1); // 8 min
  const minutes = LINK_STOPS[stop];
  const clusters = useMemo(() => clusterPins(pins, minutes * WALK_M_PER_MIN), [pins, minutes]);
  const groups = clusters.filter((c) => c.pins.length > 1);
  const loners = clusters.filter((c) => c.pins.length === 1).flatMap((c) => c.pins);

  return (
    <section aria-labelledby="clusters-heading" className="flex flex-col gap-6">
      <div>
        <p className="w-eyebrow">Clusters</p>
        <h2 id="clusters-heading" className="w-display mt-1 text-3xl sm:text-4xl">Which of these are already neighbours?</h2>
        <p className="mt-2 max-w-prose text-sm" style={{ color: "var(--w-muted)" }}>
          Places that sit within a short walk of each other, grouped. Not a route, just a heads-up that one anchor covers several wishes.
        </p>
      </div>

      <div className="w-card p-4">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="link" className="w-label !mb-0">Count as neighbours within {minutes} minutes</label>
        </div>
        <input id="link" type="range" min={0} max={LINK_STOPS.length - 1} step={1} value={stop} onChange={(e) => setStop(Number(e.target.value))} className="mt-3" aria-valuetext={`${minutes} minutes`} />
        <div className="flex justify-between text-[0.65rem]" style={{ color: "var(--w-muted)" }}>
          {LINK_STOPS.map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="w-card px-4 py-10 text-center">
          <p className="w-display text-2xl">No neighbours yet.</p>
          <p className="mt-2 text-sm" style={{ color: "var(--w-muted)" }}>
            {pins.some((p) => typeof p.lat === "number") ? "Loosen the slider, or your list is spread out, which is its own kind of freedom." : "Pin a few locations first."}
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {groups.map((c) => {
            // Name the cluster after whatever sits nearest its middle; prefer a
            // landmark-ish place when two are equally central.
            const rep = c.pins
              .slice()
              .sort((a, b) => {
                const da = distanceM(a.lat, a.lng, c.centre.lat, c.centre.lng);
                const db = distanceM(b.lat, b.lng, c.centre.lat, c.centre.lng);
                if (Math.abs(da - db) > 150) return da - db;
                return REPRESENTATIVE_ORDER.indexOf(a.category) - REPRESENTATIVE_ORDER.indexOf(b.category) || a.name.localeCompare(b.name);
              })[0];
            const areas = Array.from(new Set(c.pins.map((p) => p.area).filter(Boolean))) as string[];
            return (
              <li key={c.id} className="w-card flex flex-col gap-3 p-4">
                <div>
                  <p className="w-eyebrow">{areas.slice(0, 3).join(" · ") || "Cluster"}</p>
                  <h3 className="w-display mt-1 text-2xl">Around {rep.name}</h3>
                  <p className="text-xs" style={{ color: "var(--w-muted)" }}>
                    {c.pins.length} places, the farthest two about a {formatWalk(c.spanM)} apart.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {c.pins.map((p) => (
                    <li key={p.id}>
                      <button type="button" className="w-chip" onClick={() => onOpen(p)} style={{ "--chip-hue": CATEGORY_META[p.category].hue } as React.CSSProperties}>
                        <span className="w-dot" aria-hidden /> {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <button type="button" className="w-btn w-btn-sm self-start" onClick={() => onAnchor({ label: rep.name, lat: rep.lat, lng: rep.lng, pinId: rep.id })}>
                  <Compass aria-hidden className="h-4 w-4" /> Anchor here today
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {loners.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--w-muted)" }}>On their own</h3>
          <ul className="flex flex-wrap gap-1.5">
            {loners.map((p) => (
              <li key={p.id}>
                <button type="button" className="w-chip" onClick={() => onOpen(p)} style={{ "--chip-hue": CATEGORY_META[p.category].hue } as React.CSSProperties}>
                  <span className="w-dot" aria-hidden /> {p.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
