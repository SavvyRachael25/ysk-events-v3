"use client";

import { useState } from "react";
import { LocateFixed, MapPin, Search, X } from "lucide-react";
import { parseLatLng } from "@/lib/wander/geo";
import { CATEGORIES, CATEGORY_META, type Category, type Pin } from "@/lib/wander/types";
import type { GeocodeHit } from "@/app/api/wander/geocode/route";

export type PinDraft = Omit<Pin, "id" | "visited" | "createdAt">;

interface Props {
  initial?: Partial<PinDraft>;
  trips: string[];
  defaultTrip?: string;
  submitLabel: string;
  onSubmit: (draft: PinDraft) => void;
}

const cleanUrl = (v: string): string | undefined => {
  const t = v.trim();
  if (!t) return undefined;
  if (/^https?:\/\//i.test(t)) return t;
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(t)) return `https://${t}`;
  return undefined;
};

export default function PinForm({ initial, trips, defaultTrip, submitLabel, onSubmit }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState<Category>(initial?.category ?? "cafe");
  const [trip, setTrip] = useState(initial?.trip ?? defaultTrip ?? "");
  const [area, setArea] = useState(initial?.area ?? "");
  const [note, setNote] = useState(initial?.note ?? "");
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");
  const [source, setSource] = useState(initial?.source ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [address, setAddress] = useState(initial?.address ?? "");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    typeof initial?.lat === "number" && typeof initial?.lng === "number" ? { lat: initial.lat, lng: initial.lng } : null,
  );
  const [locQuery, setLocQuery] = useState("");
  const [locHits, setLocHits] = useState<GeocodeHit[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    const q = locQuery.trim() || [name, area, trip].filter(Boolean).join(", ");
    if (q.length < 2) return;
    setSearching(true);
    setLocError(null);
    setLocHits(null);
    try {
      const res = await fetch(`/api/wander/geocode?q=${encodeURIComponent(q)}`);
      const data = (await res.json()) as { ok: boolean; hits?: GeocodeHit[] };
      if (!data.ok) throw new Error();
      setLocHits(data.hits ?? []);
    } catch {
      setLocError("Location search is unavailable right now. Paste coordinates instead.");
    } finally {
      setSearching(false);
    }
  };

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) return setLocError("This browser cannot share your location.");
    setLocating(true);
    setLocError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocating(false);
        setLocError("Could not get your location.");
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return setError("Give it a name.");
    if (source.trim() && !cleanUrl(source)) return setError("The source should be a link.");
    if (image.trim() && !cleanUrl(image)) return setError("The image should be a link to a picture.");
    setError(null);
    onSubmit({
      name: n.slice(0, 140),
      category,
      trip: (trip.trim() || "Somewhere").slice(0, 80),
      area: area.trim() || undefined,
      note: note.trim() || undefined,
      tags: Array.from(new Set(tags.split(/[,#]/).map((t) => t.trim().toLowerCase()).filter(Boolean))).slice(0, 12),
      source: cleanUrl(source),
      image: cleanUrl(image),
      address: address.trim() || undefined,
      lat: coords?.lat,
      lng: coords?.lng,
    });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <label className="block">
          <span className="w-label">Name</span>
          <input className="w-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Café de Flore" required maxLength={140} autoComplete="off" />
        </label>
        <label className="block">
          <span className="w-label">Trip or city</span>
          <input className="w-input" value={trip} onChange={(e) => setTrip(e.target.value)} placeholder="Paris" list="wander-trips" maxLength={80} autoComplete="off" />
          <datalist id="wander-trips">
            {trips.map((t) => <option key={t} value={t} />)}
          </datalist>
        </label>
      </div>

      <fieldset>
        <legend className="w-label">What kind of place</legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className="w-chip" aria-pressed={category === c} onClick={() => setCategory(c)} style={{ "--chip-hue": CATEGORY_META[c].hue } as React.CSSProperties}>
              <span className="w-dot" aria-hidden /> {CATEGORY_META[c].label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="w-label">Neighbourhood</span>
          <input className="w-input" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Saint-Germain" maxLength={80} autoComplete="off" />
        </label>
        <label className="block">
          <span className="w-label">Moods, comma separated</span>
          <input className="w-input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="rainy day, solo, golden hour" autoComplete="off" />
        </label>
      </div>

      <label className="block">
        <span className="w-label">Why it is on the board</span>
        <textarea className="w-input min-h-24" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Sit outside, order one thing, stay two hours." maxLength={1000} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="w-label">Where you found it (link)</span>
          <input className="w-input" value={source} onChange={(e) => setSource(e.target.value)} placeholder="instagram.com/p/…" inputMode="url" autoComplete="off" />
        </label>
        <label className="block">
          <span className="w-label">Picture (image link)</span>
          <input className="w-input" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://…/photo.jpg" inputMode="url" autoComplete="off" />
        </label>
      </div>

      <fieldset className="w-card p-4">
        <legend className="w-label px-1">Location</legend>
        {coords ? (
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <p className="flex items-center gap-2">
              <MapPin aria-hidden className="h-4 w-4" style={{ color: "var(--w-accent)" }} />
              <span>Pinned at {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}{address ? ` · ${address}` : ""}</span>
            </p>
            <button type="button" className="w-btn w-btn-sm" onClick={() => { setCoords(null); setAddress(""); }}>
              <X aria-hidden className="h-4 w-4" /> Unpin
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <input
                className="w-input basis-full sm:basis-auto sm:min-w-0 sm:flex-1"
                value={locQuery}
                onChange={(e) => setLocQuery(e.target.value)}
                placeholder={name ? `Search "${[name, trip].filter(Boolean).join(", ")}" or paste 48.85, 2.33` : "Search a place, or paste 48.85, 2.33"}
                aria-label="Search for the location"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const ll = parseLatLng(locQuery);
                    if (ll) setCoords(ll);
                    else void search();
                  }
                }}
              />
              <button
                type="button"
                className="w-btn flex-1 sm:flex-none"
                disabled={searching || (locQuery.trim().length < 2 && name.trim().length < 2)}
                onClick={() => {
                  const ll = parseLatLng(locQuery);
                  if (ll) setCoords(ll);
                  else void search();
                }}
              >
                <Search aria-hidden className="h-4 w-4" /> {searching ? "Looking…" : "Find"}
              </button>
              <button type="button" className="w-btn flex-1 sm:flex-none" onClick={useMyLocation} disabled={locating} title="Use this when you are standing at the place">
                <LocateFixed aria-hidden className="h-4 w-4" /> {locating ? "Locating…" : "I'm here now"}
              </button>
            </div>
            {locHits && (
              <ul className="divide-y rounded-xl border text-sm">
                {locHits.length === 0 && <li className="px-3 py-2" style={{ color: "var(--w-muted)" }}>No matches. Add the city or a street, or paste coordinates from Google Maps.</li>}
                {locHits.map((h, i) => (
                  <li key={`${h.lat},${h.lng},${i}`}>
                    <button type="button" className="flex w-full flex-col items-start px-3 py-2 text-left hover:bg-[var(--w-paper-2)]" onClick={() => { setCoords({ lat: h.lat, lng: h.lng }); setAddress(h.label.split(",").slice(0, 3).join(",").trim()); setLocHits(null); if (!area) { const parts = h.label.split(",").map((s) => s.trim()); if (parts[2]) setArea(parts[2]); } }}>
                      <span className="font-semibold">{h.name}</span>
                      <span className="line-clamp-1 text-xs" style={{ color: "var(--w-muted)" }}>{h.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {locError && <p className="text-sm" style={{ color: "var(--w-accent)" }}>{locError}</p>}
            <p className="text-xs" style={{ color: "var(--w-muted)" }}>
              Optional, but Nearby only knows about pinned places. Search uses OpenStreetMap.
            </p>
          </div>
        )}
      </fieldset>

      {error && <p role="alert" className="text-sm font-semibold" style={{ color: "var(--w-accent)" }}>{error}</p>}

      <div className="flex justify-end">
        <button type="submit" className="w-btn w-btn-primary">{submitLabel}</button>
      </div>
    </form>
  );
}
