"use client";

import { useMemo, useState } from "react";
import { Search, Shuffle } from "lucide-react";
import { BOARD_SORTS, CATEGORIES, CATEGORY_META, type BoardSort, type Category, type Pin } from "@/lib/wander/types";
import PinCard from "./PinCard";

interface Props {
  pins: Pin[];
  allEmpty: boolean;
  sample: boolean;
  onOpen: (pin: Pin) => void;
  onGoHere: (pin: Pin) => void;
  onToggleVisited: (id: string) => void;
  onAdd: () => void;
  onStartFresh: () => void;
  onLoadSample: () => void;
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const out = items.slice();
  let s = seed >>> 0 || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function BoardView({ pins, allEmpty, sample, onOpen, onGoHere, onToggleVisited, onAdd, onStartFresh, onLoadSample }: Props) {
  const [category, setCategory] = useState<Category | "all">("all");
  const [tagChoice, setTag] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<BoardSort>("shuffle");
  const [hideVisited, setHideVisited] = useState(false);
  const [seed, setSeed] = useState(() => Date.now());

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of pins) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
  }, [pins]);

  // A mood filter that no longer exists (last tagged pin removed) simply stops applying.
  const tag = tagChoice && tags.includes(tagChoice) ? tagChoice : null;

  const usedCategories = useMemo(() => new Set(pins.map((p) => p.category)), [pins]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = pins.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (tag && !p.tags.includes(tag)) return false;
      if (hideVisited && p.visited) return false;
      if (q) {
        const hay = [p.name, p.area, p.note, p.trip, p.address, ...p.tags].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    switch (sort) {
      case "shuffle":
        list = seededShuffle(list, seed);
        break;
      case "category":
        list.sort((a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) || a.name.localeCompare(b.name));
        break;
      case "area":
        list.sort((a, b) => (a.area ?? "zzz").localeCompare(b.area ?? "zzz") || a.name.localeCompare(b.name));
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        list.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }
    return list;
  }, [pins, category, tag, hideVisited, query, sort, seed]);

  if (allEmpty) {
    return (
      <section className="mx-auto max-w-md py-16 text-center">
        <p className="w-eyebrow">Empty board</p>
        <h2 className="w-display mt-2 text-4xl">Start with one place you can&apos;t stop thinking about.</h2>
        <p className="mt-3 text-sm" style={{ color: "var(--w-muted)" }}>
          A café from someone&apos;s story, a shop you screenshotted, a view. No plan required.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button type="button" className="w-btn w-btn-primary" onClick={onAdd}>Add a place</button>
          <button type="button" className="w-btn" onClick={onLoadSample}>See the Paris sample</button>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="board-heading">
      <h2 id="board-heading" className="sr-only">Board</h2>

      {sample && (
        <div className="w-card mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm" style={{ background: "var(--w-accent-wash)", borderColor: "transparent" }}>
          <p>
            <strong>Sample board.</strong> Paris, with approximate pins so you can try Nearby. Edit anything and it becomes yours.
          </p>
          <button type="button" className="w-btn w-btn-sm" onClick={onStartFresh}>Clear it, start fresh</button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative basis-full sm:basis-auto sm:flex-1 sm:max-w-xs">
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--w-muted)" }} />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the board" className="w-input !rounded-full !py-2 !pl-9" aria-label="Search the board" />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="sr-only sm:not-sr-only" style={{ color: "var(--w-muted)" }}>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as BoardSort)} className="w-input !w-auto !rounded-full !py-2" aria-label="Sort">
              {BOARD_SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
          {sort === "shuffle" && (
            <button type="button" className="w-btn w-btn-sm" onClick={() => setSeed(Date.now())} aria-label="Reshuffle">
              <Shuffle aria-hidden className="h-4 w-4" /> Reshuffle
            </button>
          )}
          <label className="flex items-center gap-2 text-sm sm:ml-auto" style={{ color: "var(--w-muted)" }}>
            <input type="checkbox" checked={hideVisited} onChange={(e) => setHideVisited(e.target.checked)} className="h-4 w-4" />
            Hide visited
          </label>
        </div>

        <div className="w-scroll-x" role="group" aria-label="Category">
          <button type="button" className="w-chip" aria-pressed={category === "all"} onClick={() => setCategory("all")}>All</button>
          {CATEGORIES.filter((c) => usedCategories.has(c)).map((c) => (
            <button key={c} type="button" className="w-chip" aria-pressed={category === c} onClick={() => setCategory(category === c ? "all" : c)} style={{ "--chip-hue": CATEGORY_META[c].hue } as React.CSSProperties}>
              <span className="w-dot" aria-hidden /> {CATEGORY_META[c].plural}
            </button>
          ))}
        </div>

        {tags.length > 0 && (
          <div className="w-scroll-x" role="group" aria-label="Mood">
            {tags.map((t) => (
              <button key={t} type="button" className="w-chip" aria-pressed={tag === t} onClick={() => setTag(tag === t ? null : t)}>#{t}</button>
            ))}
          </div>
        )}
      </div>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-sm" style={{ color: "var(--w-muted)" }}>Nothing matches. Loosen a filter.</p>
      ) : (
        <div className="w-masonry mt-5">
          {shown.map((pin) => (
            <PinCard key={pin.id} pin={pin} onOpen={onOpen} onGoHere={onGoHere} onToggleVisited={onToggleVisited} showTrip={false} />
          ))}
        </div>
      )}

      <p className="mt-10 text-center text-xs" style={{ color: "var(--w-muted)" }}>
        {shown.length} of {pins.length} shown. Sorted by {BOARD_SORTS.find((s) => s.id === sort)?.label.toLowerCase()}, never by time.
      </p>
    </section>
  );
}
