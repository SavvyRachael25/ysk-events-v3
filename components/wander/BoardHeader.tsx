"use client";

import { useEffect, useRef, useState } from "react";
import { Download, MoreHorizontal, Pencil, RotateCcw, Sparkles, Upload } from "lucide-react";
import type { Board } from "@/lib/wander/types";
import { ALL_TRIPS } from "./Wanderboard";

interface Props {
  board: Board;
  trips: string[];
  trip: string;
  onTrip: (trip: string) => void;
  onTitle: (title: string) => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onStartFresh: () => void;
  onLoadSample: () => void;
}

export default function BoardHeader({ board, trips, trip, onTrip, onTitle, onExport, onImport, onStartFresh, onLoadSample }: Props) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent) {
        if (e.key === "Escape") setMenuOpen(false);
        return;
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  const count = board.pins.length;
  const pinned = board.pins.filter((p) => typeof p.lat === "number").length;

  return (
    <header className="border-b" style={{ background: "var(--w-paper)" }}>
      <div className="mx-auto w-full max-w-6xl px-4 pb-3 pt-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="w-eyebrow">
              Wanderboard{board.handle ? <> · @{board.handle}</> : null}
            </p>
            {editingTitle ? (
              <form
                className="mt-1 flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  onTitle(String(data.get("title") ?? ""));
                  setEditingTitle(false);
                }}
              >
                <input name="title" defaultValue={board.title} autoFocus maxLength={80} className="w-input w-display !text-2xl sm:!text-3xl" aria-label="Board title" />
                <button type="submit" className="w-btn w-btn-primary w-btn-sm">Save</button>
              </form>
            ) : (
              <button
                type="button"
                className="group mt-1 flex max-w-full items-baseline gap-2 text-left"
                onClick={() => setEditingTitle(true)}
                aria-label={`Board title: ${board.title}. Edit.`}
              >
                <h1 className="w-display truncate text-3xl leading-tight sm:text-4xl">{board.title}</h1>
                <Pencil aria-hidden className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-70 group-focus-visible:opacity-70" />
              </button>
            )}
            <p className="mt-1 text-sm" style={{ color: "var(--w-muted)" }}>
              {count === 0 ? "Nothing saved yet." : `${count} place${count === 1 ? "" : "s"}, ${pinned} pinned on the map.`}
              <span className="hidden sm:inline"> No dates. No order. Just what is near you.</span>
            </p>
          </div>

          <div className="relative shrink-0" ref={menuRef}>
            <button type="button" className="w-btn w-btn-ghost !px-2" aria-haspopup="menu" aria-expanded={menuOpen} aria-label="Board menu" onClick={() => setMenuOpen((v) => !v)}>
              <MoreHorizontal aria-hidden className="h-5 w-5" />
            </button>
            {menuOpen && (
              <div role="menu" className="w-card absolute right-0 top-full z-40 mt-2 w-60 overflow-hidden p-1 text-sm">
                <MenuItem icon={Download} onClick={() => { onExport(); setMenuOpen(false); }}>Export board (JSON)</MenuItem>
                <MenuItem icon={Upload} onClick={() => fileRef.current?.click()}>Import a board</MenuItem>
                <div className="w-hr my-1" />
                {count === 0 && <MenuItem icon={Sparkles} onClick={() => { onLoadSample(); setMenuOpen(false); }}>Load the Paris sample</MenuItem>}
                <MenuItem icon={RotateCcw} onClick={() => { onStartFresh(); setMenuOpen(false); }}>{board.sample ? "Clear sample, start fresh" : "Clear board"}</MenuItem>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onImport(f);
                e.target.value = "";
                setMenuOpen(false);
              }}
            />
          </div>
        </div>

        {trips.length > 1 && (
          <div className="w-scroll-x mt-3" role="group" aria-label="Trip">
            <button type="button" className="w-chip" aria-pressed={trip === ALL_TRIPS} onClick={() => onTrip(ALL_TRIPS)}>All trips</button>
            {trips.map((t) => (
              <button key={t} type="button" className="w-chip" aria-pressed={trip === t} onClick={() => onTrip(t)}>{t}</button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function MenuItem({ icon: Icon, onClick, children }: { icon: typeof Download; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" role="menuitem" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-[var(--w-paper-2)]" onClick={onClick}>
      <Icon aria-hidden className="h-4 w-4" style={{ color: "var(--w-muted)" }} />
      {children}
    </button>
  );
}
