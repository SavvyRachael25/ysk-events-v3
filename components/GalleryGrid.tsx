"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";

/**
 * Masonry gallery (CSS columns, natural aspect ratios) with a
 * keyboard-navigable lightbox. No captions: the plates speak for
 * themselves, numbered like an exhibition catalogue.
 */
export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((cur) =>
        cur === null ? cur : (cur + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative mb-4 block w-full cursor-pointer overflow-hidden bg-paper-3"
            aria-label={`Open photo ${i + 1} of ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className="w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              priority={i < 3}
            />
            {/* Plate number chip */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 rounded-sm bg-ink/55 px-2.5 py-1 font-lockup text-[11px] tracking-[0.2em] text-paper opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
            >
              {String(i + 1).padStart(2, "0")} · {images.length}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${open + 1} of ${images.length}`}
          className="fixed inset-0 z-[90] flex items-center justify-center animate-fade-in"
          style={{ background: "hsl(24 12% 8% / 0.94)" }}
          onClick={() => setOpen(null)}
        >
          <div
            className="relative mx-4 max-h-[86vh] w-full max-w-[1200px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open].src}
              alt={images[open].alt}
              width={images[open].width}
              height={images[open].height}
              sizes="92vw"
              className="mx-auto max-h-[86vh] w-auto rounded-sm object-contain"
              priority
            />
          </div>

          {/* Controls */}
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-paper/25 text-paper/80 transition-colors duration-300 hover:border-gold-bright hover:text-gold-bright"
          >
            <X size={19} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-paper/25 text-paper/80 transition-colors duration-300 hover:border-gold-bright hover:text-gold-bright"
          >
            <ChevronLeft size={19} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-paper/25 text-paper/80 transition-colors duration-300 hover:border-gold-bright hover:text-gold-bright"
          >
            <ChevronRight size={19} />
          </button>

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-lockup text-sm tracking-[0.25em] text-paper/70">
            {String(open + 1).padStart(2, "0")} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}
