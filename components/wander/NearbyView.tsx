"use client";

import { useMemo, useState } from "react";
import { Check, ExternalLink, Footprints, LocateFixed, MapPin, Search, Sparkles, X } from "lucide-react";
import { compass, formatDistance, formatWalk, isLocated, nearby, WALK_M_PER_MIN, walkingDirectionsUrl, type Anchor } from "@/lib/wander/geo";
import { CATEGORIES, CATEGORY_META, type Pin } from "@/lib/wander/types";
import type { GeocodeHit } from "@/app/api/wander/geocode/route";
import Radar from "./Radar";

interface Props {
  pins: Pin[];
  anchor: Anchor | null;
  onAnchor: (a: Anchor | null) => void;
  onOpen: (pin: Pin) => void;
  onToggleVisited: (id: string) => void;
  notify: (message: string) => void;
}

const RADIUS_STOPS = [5, 10, 15, 20, 30, 45] as const;

export default function NearbyView({ pins, anchor, onAnchor, onOpen, onToggleVisited, notify }: Props) {
  const [stop, setStop] = useState(2); // 15 min
  const [placeQuery, setPlaceQuery] = useState("");
  const [placeHits, setPlaceHits] = useState<GeocodeHit[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [highlightChoice, setHighlight] = useState<string | null>(null);
  const [showVisited, setShowVisited] = useState(true);

  const minutes = RADIUS_STOPS[stop];
  const radiusM = minutes * WALK_M_PER_MIN;
  const located = useMemo(() => pins.filter(isLocated), [pins]);
  const unpinned = useMemo(() => pins.filter((p) => !isLocated(p)), [pins]);

  const hits = useMemo(() => (anchor ? nearby(pins, anchor, radiusM).filter((h) => showVisited || !h.pin.visited) : []), [pins, anchor, radiusM, showVisited]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof hits>();
    for (const h of hits) {
      const list = map.get(h.pin.category) ?? [];
      list.push(h);
      map.set(h.pin.category, list);
    }
    return CATEGORIES.filter((c) => map.has(c)).map((c) => ({ category: c, hits: map.get(c)! }));
  }, [hits]);

  // Drop the highlight once the highlighted place leaves the circle.
  const highlight = highlightChoice && hits.some((h) => h.pin.id === highlightChoice) ? highlightChoice : null;

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) return notify("This browser cannot share your location.");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onAnchor({ label: "Where I am", lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocating(false);
        notify("Could not get your location. Pick a place from the list instead.");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  };

  const searchPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = placeQuery.trim();
    if (q.length < 2) return;
    setSearching(true);
    setPlaceHits(null);
    try {
      const res = await fetch(`/api/wander/geocode?q=${encodeURIComponent(q)}`);
      const data = (await res.json()) as { ok: boolean; hits?: GeocodeHit[] };
      setPlaceHits(data.ok && data.hits ? data.hits : []);
    } catch {
      setPlaceHits([]);
    } finally {
      setSearching(false);
    }
  };

  const surprise = () => {
    const pool = hits.filter((h) => !h.pin.visited);
    const pick = (pool.length ? pool : hits)[Math.floor(Math.random() * (pool.length ? pool.length : hits.length))];
    if (!pick) return;
    setHighlight(pick.pin.id);
    document.getElementById(`hit-${pick.pin.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section aria-labelledby="nearby-heading" className="flex flex-col gap-6">
      <div>
        <p className="w-eyebrow">Nearby</p>
        <h2 id="nearby-heading" className="w-display mt-1 text-3xl sm:text-4xl">
          {anchor ? <>Around <em>{anchor.label}</em></> : "Where are you headed today?"}
        </h2>
        <p className="mt-2 max-w-prose text-sm" style={{ color: "var(--w-muted)" }}>
          Pick one anchor. The board shows what else you already saved within a short walk, so you can drift instead of plan.
        </p>
      </div>

      {/* Anchor picker */}
      <div className="w-card p-4">
        {anchor ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm">
              <MapPin aria-hidden className="h-4 w-4" style={{ color: "var(--w-accent)" }} />
              <span><strong>{anchor.label}</strong> is today&apos;s anchor.</span>
            </p>
            <button type="button" className="w-btn w-btn-sm" onClick={() => onAnchor(null)}>
              <X aria-hidden className="h-4 w-4" /> Change
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {located.length > 0 && (
              <label className="block">
                <span className="w-label">Something from your board</span>
                <select
                  className="w-input"
                  defaultValue=""
                  onChange={(e) => {
                    const pin = located.find((p) => p.id === e.target.value);
                    if (pin) onAnchor({ label: pin.name, lat: pin.lat, lng: pin.lng, pinId: pin.id });
                  }}
                >
                  <option value="" disabled>Today I&apos;m going to…</option>
                  {located
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((p) => (
                      <option key={p.id} value={p.id}>{CATEGORY_META[p.category].emoji} {p.name}{p.area ? ` · ${p.area}` : ""}</option>
                    ))}
                </select>
              </label>
            )}
            <div className="flex flex-wrap items-end gap-3">
              <form className="flex min-w-0 flex-1 gap-2" onSubmit={searchPlace}>
                <label className="min-w-0 flex-1">
                  <span className="w-label">Or any place or address</span>
                  <input className="w-input" value={placeQuery} onChange={(e) => setPlaceQuery(e.target.value)} placeholder="Hotel, station, a street" />
                </label>
                <button type="submit" className="w-btn self-end" disabled={searching || placeQuery.trim().length < 2}>
                  <Search aria-hidden className="h-4 w-4" /> {searching ? "Looking…" : "Find"}
                </button>
              </form>
              <button type="button" className="w-btn w-full self-end sm:w-auto" onClick={useMyLocation} disabled={locating}>
                <LocateFixed aria-hidden className="h-4 w-4" /> {locating ? "Locating…" : "Use my location"}
              </button>
            </div>
            {placeHits && (
              <ul className="divide-y rounded-xl border text-sm">
                {placeHits.length === 0 && <li className="px-3 py-2" style={{ color: "var(--w-muted)" }}>No matches. Try adding the city.</li>}
                {placeHits.map((h, i) => (
                  <li key={`${h.lat},${h.lng},${i}`}>
                    <button type="button" className="flex w-full flex-col items-start px-3 py-2 text-left hover:bg-[var(--w-paper-2)]" onClick={() => { onAnchor({ label: h.name, lat: h.lat, lng: h.lng }); setPlaceHits(null); setPlaceQuery(""); }}>
                      <span className="font-semibold">{h.name}</span>
                      <span className="line-clamp-1 text-xs" style={{ color: "var(--w-muted)" }}>{h.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {located.length === 0 && (
              <p className="text-sm" style={{ color: "var(--w-muted)" }}>
                None of your places have a pin yet. Add a location to a few and they will show up here.
              </p>
            )}
          </div>
        )}
      </div>

      {anchor && (
        <>
          <div className="w-card p-4">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="radius" className="w-label !mb-0 flex items-center gap-2">
                <Footprints aria-hidden className="h-4 w-4" /> Within a {minutes} minute walk
              </label>
              <span className="text-xs" style={{ color: "var(--w-muted)" }}>about {formatDistance(radiusM)}</span>
            </div>
            <input id="radius" type="range" min={0} max={RADIUS_STOPS.length - 1} step={1} value={stop} onChange={(e) => setStop(Number(e.target.value))} className="mt-3" aria-valuetext={`${minutes} minutes`} />
            <div className="flex justify-between text-[0.65rem]" style={{ color: "var(--w-muted)" }}>
              {RADIUS_STOPS.map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
            <div className="w-card min-w-0 p-3">
              <Radar hits={hits} radiusM={radiusM} anchorLabel={anchor.label} highlightId={highlight} onPick={(id) => { setHighlight(id); document.getElementById(`hit-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }} />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1">
                <label className="flex items-center gap-2 text-xs" style={{ color: "var(--w-muted)" }}>
                  <input type="checkbox" checked={showVisited} onChange={(e) => setShowVisited(e.target.checked)} className="h-3.5 w-3.5" /> Show visited
                </label>
                <button type="button" className="w-btn w-btn-sm" onClick={surprise} disabled={hits.length === 0}>
                  <Sparkles aria-hidden className="h-4 w-4" /> Surprise me
                </button>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              {hits.length === 0 ? (
                <div className="w-card px-4 py-10 text-center">
                  <p className="w-display text-2xl">Nothing on your list within {minutes} minutes.</p>
                  <p className="mt-2 text-sm" style={{ color: "var(--w-muted)" }}>Widen the circle, or enjoy the fact that this corner is all yours.</p>
                </div>
              ) : (
                grouped.map(({ category, hits: list }) => {
                  const meta = CATEGORY_META[category];
                  return (
                    <div key={category}>
                      <h3 className="mb-2 flex items-center gap-2 text-sm font-bold">
                        <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: meta.hue }} />
                        {list.length} {list.length === 1 ? meta.label.toLowerCase() : meta.plural.toLowerCase()}
                      </h3>
                      <ul className="w-card divide-y overflow-hidden">
                        {list.map((h) => (
                          <li key={h.pin.id} id={`hit-${h.pin.id}`} className="flex items-center gap-3 px-3 py-2.5" style={highlight === h.pin.id ? { background: "var(--w-accent-wash)" } : undefined}>
                            <button type="button" className="min-w-0 flex-1 text-left" onClick={() => onOpen(h.pin)}>
                              <p className={`truncate font-semibold ${h.pin.visited ? "line-through opacity-60" : ""}`}>{h.pin.name}</p>
                              <p className="truncate text-xs" style={{ color: "var(--w-muted)" }}>
                                {formatWalk(h.metres)} {compass(h.bearing)}
                                {h.pin.area ? ` · ${h.pin.area}` : ""}
                                {h.pin.note ? ` · ${h.pin.note}` : ""}
                              </p>
                            </button>
                            <a href={walkingDirectionsUrl(anchor, h.pin)} target="_blank" rel="noreferrer" className="w-btn w-btn-ghost w-btn-sm !px-2" aria-label={`Walking directions to ${h.pin.name}`}>
                              <ExternalLink aria-hidden className="h-4 w-4" />
                            </a>
                            <button type="button" className="w-btn w-btn-ghost w-btn-sm !px-2" aria-pressed={h.pin.visited} aria-label={h.pin.visited ? `Mark ${h.pin.name} as not visited` : `Mark ${h.pin.name} as visited`} onClick={() => onToggleVisited(h.pin.id)} style={h.pin.visited ? { color: "var(--w-park)" } : undefined}>
                              <Check aria-hidden className="h-4 w-4" strokeWidth={h.pin.visited ? 3 : 2} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}

      {unpinned.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--w-muted)" }}>
            {unpinned.length} place{unpinned.length === 1 ? " has" : "s have"} no pin yet
          </h3>
          <ul className="flex flex-wrap gap-2">
            {unpinned.map((p) => (
              <li key={p.id}>
                <button type="button" className="w-chip" onClick={() => onOpen(p)}>
                  <MapPin aria-hidden className="h-3.5 w-3.5" /> {p.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-center text-xs" style={{ color: "var(--w-muted)" }}>
        Walk times are straight-line estimates at about {WALK_M_PER_MIN} m per minute. Streets add a little.
      </p>
    </section>
  );
}
