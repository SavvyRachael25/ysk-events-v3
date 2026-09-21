"use client";

import { Check, Compass, ExternalLink } from "lucide-react";
import { isLocated, mapsSearchUrl } from "@/lib/wander/geo";
import { CATEGORY_META, type Pin } from "@/lib/wander/types";

interface Props {
  pin: Pin;
  onOpen: (pin: Pin) => void;
  onGoHere: (pin: Pin) => void;
  onToggleVisited: (id: string) => void;
  showTrip?: boolean;
}

export default function PinCard({ pin, onOpen, onGoHere, onToggleVisited, showTrip }: Props) {
  const meta = CATEGORY_META[pin.category];
  const located = isLocated(pin);
  return (
    <article className="w-card w-tile w-tilt" data-visited={pin.visited}>
      <button type="button" className="block w-full text-left" onClick={() => onOpen(pin)} aria-label={`${pin.name}. Open details.`}>
        {pin.image ? (
          // Plain img on purpose: user-supplied URLs from anywhere; next/image would need a host allowlist.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pin.image} alt="" className="w-tile-media" loading="lazy" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-tile-solid" style={{ "--tile-hue": meta.hue } as React.CSSProperties}>
            <p className="w-display text-2xl leading-tight sm:text-3xl">{pin.name}</p>
          </div>
        )}
        <div className="px-3 pb-2 pt-3">
          {pin.image && <p className="w-display text-xl leading-tight">{pin.name}</p>}
          <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs" style={{ color: "var(--w-muted)" }}>
            <span aria-hidden>{meta.emoji}</span>
            <span>{meta.label}</span>
            {pin.area && <><span aria-hidden>·</span><span>{pin.area}</span></>}
            {showTrip && <><span aria-hidden>·</span><span>{pin.trip}</span></>}
          </p>
          {pin.note && <p className="mt-2 line-clamp-3 text-sm leading-snug" style={{ color: "var(--w-ink-2)" }}>{pin.note}</p>}
          {pin.tags.length > 0 && (
            <p className="mt-2 flex flex-wrap gap-1">
              {pin.tags.map((t) => (
                <span key={t} className="rounded-full px-2 py-0.5 text-[0.7rem] font-semibold" style={{ background: "var(--w-paper-2)", color: "var(--w-ink-2)" }}>{t}</span>
              ))}
            </p>
          )}
        </div>
      </button>
      <div className="flex items-center justify-between gap-1 border-t px-2 py-1.5">
        <button
          type="button"
          className="w-btn w-btn-ghost w-btn-sm"
          disabled={!located}
          title={located ? "See what is near this" : "Pin a location first"}
          onClick={() => onGoHere(pin)}
        >
          <Compass aria-hidden className="h-4 w-4" /> Near this
        </button>
        <div className="flex items-center">
          <a href={mapsSearchUrl(pin)} target="_blank" rel="noreferrer" className="w-btn w-btn-ghost w-btn-sm !px-2" aria-label={`Open ${pin.name} in Google Maps`}>
            <ExternalLink aria-hidden className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="w-btn w-btn-ghost w-btn-sm !px-2"
            aria-pressed={pin.visited}
            aria-label={pin.visited ? `Mark ${pin.name} as not visited` : `Mark ${pin.name} as visited`}
            onClick={() => onToggleVisited(pin.id)}
            style={pin.visited ? { color: "var(--w-park)" } : undefined}
          >
            <Check aria-hidden className="h-4 w-4" strokeWidth={pin.visited ? 3 : 2} />
          </button>
        </div>
      </div>
    </article>
  );
}
