"use client";

import { useEffect, useRef } from "react";
import { Compass, ExternalLink, Trash2, X } from "lucide-react";
import { isLocated, mapsSearchUrl } from "@/lib/wander/geo";
import { CATEGORY_META, type Pin } from "@/lib/wander/types";
import PinForm from "./PinForm";

interface Props {
  pin: Pin;
  trips: string[];
  onClose: () => void;
  onSave: (pin: Pin) => void;
  onDelete: (id: string) => void;
  onGoHere: (pin: Pin) => void;
}

export default function PinSheet({ pin, trips, onClose, onSave, onDelete, onGoHere }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const meta = CATEGORY_META[pin.category];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="presentation">
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Close" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        tabIndex={-1}
        className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl p-5 shadow-2xl outline-none sm:rounded-3xl"
        style={{ background: "var(--w-paper)" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="w-eyebrow">{meta.emoji} {meta.label} · {pin.trip}</p>
            <h2 id="sheet-title" className="w-display mt-1 text-3xl">{pin.name}</h2>
          </div>
          <button type="button" className="w-btn w-btn-ghost !px-2" onClick={onClose} aria-label="Close">
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {isLocated(pin) && (
            <button type="button" className="w-btn w-btn-primary w-btn-sm" onClick={() => onGoHere(pin)}>
              <Compass aria-hidden className="h-4 w-4" /> Going here today
            </button>
          )}
          <a href={mapsSearchUrl(pin)} target="_blank" rel="noreferrer" className="w-btn w-btn-sm">
            <ExternalLink aria-hidden className="h-4 w-4" /> Google Maps
          </a>
          {pin.source && (
            <a href={pin.source} target="_blank" rel="noreferrer" className="w-btn w-btn-sm">
              <ExternalLink aria-hidden className="h-4 w-4" /> Where I found it
            </a>
          )}
        </div>

        <hr className="w-hr my-5" />

        <PinForm
          key={pin.id}
          initial={pin}
          trips={trips}
          submitLabel="Save changes"
          onSubmit={(draft) => onSave({ ...pin, ...draft })}
        />

        <hr className="w-hr my-5" />

        <button
          type="button"
          className="w-btn w-btn-ghost w-btn-sm"
          style={{ color: "var(--w-accent)" }}
          onClick={() => {
            if (window.confirm(`Remove ${pin.name} from the board?`)) onDelete(pin.id);
          }}
        >
          <Trash2 aria-hidden className="h-4 w-4" /> Remove from board
        </button>
      </div>
    </div>
  );
}
