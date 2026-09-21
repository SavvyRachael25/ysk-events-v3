import { SAMPLE_BOARD } from "./sample";
import { CATEGORIES, type Board, type Category, type Pin } from "./types";

export const STORAGE_KEY = "wanderboard.v1";

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

const str = (v: unknown, max = 500): string | undefined => {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t ? t.slice(0, max) : undefined;
};

const num = (v: unknown): number | undefined => {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) ? n : undefined;
};

/** Coerce anything JSON-shaped into a Pin, or null if it has no name. */
export function coercePin(raw: unknown): Pin | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const name = str(r.name, 140);
  if (!name) return null;
  const category = CATEGORIES.includes(r.category as Category) ? (r.category as Category) : "other";
  const tags = Array.isArray(r.tags) ? (r.tags.map((t) => str(t, 40)).filter(Boolean) as string[]) : [];
  const lat = num(r.lat);
  const lng = num(r.lng);
  const located = lat !== undefined && lng !== undefined && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  return {
    id: str(r.id, 80) ?? newId(),
    name,
    category,
    trip: str(r.trip, 80) ?? "Somewhere",
    area: str(r.area, 80),
    note: str(r.note, 1000),
    source: str(r.source, 1000),
    image: str(r.image, 1000),
    tags: Array.from(new Set(tags.map((t) => t.toLowerCase()))),
    lat: located ? lat : undefined,
    lng: located ? lng : undefined,
    address: str(r.address, 300),
    visited: r.visited === true,
    createdAt: num(r.createdAt) ?? Date.now(),
  };
}

export function coerceBoard(raw: unknown): Board | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  // Accept a bare array of pins too, so a hand-written JSON list imports.
  const pinsRaw = Array.isArray(raw) ? raw : Array.isArray(r.pins) ? r.pins : null;
  if (!pinsRaw) return null;
  const pins = pinsRaw.map(coercePin).filter((p): p is Pin => p !== null);
  return {
    version: 1,
    title: str(r.title, 80) ?? SAMPLE_BOARD.title,
    handle: str(r.handle, 40)?.replace(/^@/, ""),
    sample: r.sample === true,
    pins,
  };
}

/* ------------------------------------------------------------------
   External store for useSyncExternalStore. localStorage is the source
   of truth; a parsed snapshot is cached so React gets a stable reference
   between writes. If storage is unavailable (private mode, full quota)
   the cache alone carries the board for the session.
   ------------------------------------------------------------------ */

const listeners = new Set<() => void>();
let cache: { raw: string | null; board: Board } | null = null;
let storageBroken = false;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    storageBroken = true;
    return null;
  }
}

function parseBoard(raw: string | null): Board {
  if (!raw) return SAMPLE_BOARD;
  try {
    return coerceBoard(JSON.parse(raw)) ?? SAMPLE_BOARD;
  } catch {
    return SAMPLE_BOARD;
  }
}

/** Client snapshot. Stable between writes. */
export function getBoardSnapshot(): Board {
  if (cache && storageBroken) return cache.board;
  const raw = readRaw();
  if (cache && cache.raw === raw) return cache.board;
  cache = { raw, board: parseBoard(raw) };
  return cache.board;
}

/** Server snapshot: nothing, so the first client paint matches and then hydrates. */
export function getServerBoardSnapshot(): Board | null {
  return null;
}

export function subscribeBoard(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function saveBoard(board: Board): void {
  const raw = JSON.stringify(board);
  cache = { raw, board };
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    storageBroken = true;
  }
  for (const l of listeners) l();
}

export function updateBoard(fn: (current: Board) => Board): void {
  saveBoard(fn(getBoardSnapshot()));
}

export function exportBoard(board: Board): string {
  return JSON.stringify({ ...board, exportedAt: new Date().toISOString() }, null, 2);
}

export function downloadText(filename: string, text: string): void {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Merge an imported board into the current one; same ids are replaced. */
export function mergeBoards(current: Board, incoming: Board): Board {
  const byId = new Map(current.pins.map((p) => [p.id, p] as const));
  for (const pin of incoming.pins) byId.set(pin.id, pin);
  return { ...current, sample: false, pins: Array.from(byId.values()) };
}
