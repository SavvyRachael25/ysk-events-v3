"use client";

import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Compass, LayoutGrid, Plus, Sparkles } from "lucide-react";
import type { Anchor } from "@/lib/wander/geo";
import { EMPTY_BOARD, SAMPLE_BOARD } from "@/lib/wander/sample";
import { coerceBoard, downloadText, exportBoard, getBoardSnapshot, getServerBoardSnapshot, mergeBoards, newId, saveBoard, subscribeBoard, updateBoard } from "@/lib/wander/store";
import type { Board, Pin } from "@/lib/wander/types";
import BoardHeader from "./BoardHeader";
import BoardView from "./BoardView";
import ClustersView from "./ClustersView";
import NearbyView from "./NearbyView";
import PinForm from "./PinForm";
import PinSheet from "./PinSheet";

export type Tab = "board" | "nearby" | "clusters" | "add";

const TABS: { id: Tab; label: string; Icon: typeof LayoutGrid }[] = [
  { id: "board", label: "Board", Icon: LayoutGrid },
  { id: "nearby", label: "Nearby", Icon: Compass },
  { id: "clusters", label: "Clusters", Icon: Sparkles },
  { id: "add", label: "Add", Icon: Plus },
];

export const ALL_TRIPS = "__all__";

export default function Wanderboard() {
  const board = useSyncExternalStore(subscribeBoard, getBoardSnapshot, getServerBoardSnapshot);
  const [tab, setTab] = useState<Tab>("board");
  const [tripChoice, setTrip] = useState<string>(ALL_TRIPS);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const [editing, setEditing] = useState<Pin | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const trips = useMemo(() => {
    const set = new Set<string>();
    for (const p of board?.pins ?? []) set.add(p.trip);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [board]);

  // If the chosen trip disappears (last pin deleted), fall back to all.
  const trip = tripChoice !== ALL_TRIPS && trips.includes(tripChoice) ? tripChoice : ALL_TRIPS;

  const visiblePins = useMemo(() => {
    const pins = board?.pins ?? [];
    return trip === ALL_TRIPS ? pins : pins.filter((p) => p.trip === trip);
  }, [board, trip]);

  const mutate = useCallback((fn: (b: Board) => Board) => {
    updateBoard((prev) => ({ ...fn(prev), sample: false }));
  }, []);

  const addPin = useCallback(
    (pin: Pin) => {
      mutate((b) => ({ ...b, pins: [pin, ...b.pins] }));
      notify(`${pin.name} is on the board.`);
      setTab("board");
      if (trip !== ALL_TRIPS && pin.trip !== trip) setTrip(pin.trip);
    },
    [mutate, notify, trip],
  );

  const updatePin = useCallback(
    (pin: Pin) => {
      mutate((b) => ({ ...b, pins: b.pins.map((p) => (p.id === pin.id ? pin : p)) }));
      setEditing(null);
    },
    [mutate],
  );

  const deletePin = useCallback(
    (id: string) => {
      mutate((b) => ({ ...b, pins: b.pins.filter((p) => p.id !== id) }));
      setEditing(null);
      if (anchor?.pinId === id) setAnchor(null);
      notify("Removed from the board.");
    },
    [anchor, mutate, notify],
  );

  const toggleVisited = useCallback(
    (id: string) => {
      mutate((b) => ({ ...b, pins: b.pins.map((p) => (p.id === id ? { ...p, visited: !p.visited } : p)) }));
    },
    [mutate],
  );

  const goHere = useCallback((pin: Pin) => {
    if (typeof pin.lat !== "number" || typeof pin.lng !== "number") return;
    setAnchor({ label: pin.name, lat: pin.lat, lng: pin.lng, pinId: pin.id });
    if (trip !== ALL_TRIPS && pin.trip !== trip) setTrip(pin.trip);
    setEditing(null);
    setTab("nearby");
  }, [trip]);

  const setTitle = useCallback((title: string) => {
    updateBoard((b) => ({ ...b, title: title.trim() || b.title }));
  }, []);

  const doExport = useCallback(() => {
    if (!board) return;
    const stamp = new Date().toISOString().slice(0, 10);
    downloadText(`wanderboard-${stamp}.json`, exportBoard(board));
  }, [board]);

  const doImport = useCallback(
    async (file: File) => {
      try {
        const incoming = coerceBoard(JSON.parse(await file.text()));
        if (!incoming) throw new Error("bad");
        updateBoard((b) => mergeBoards(b, incoming));
        notify(`Imported ${incoming.pins.length} place${incoming.pins.length === 1 ? "" : "s"}.`);
      } catch {
        notify("That file did not look like a Wanderboard export.");
      }
    },
    [notify],
  );

  const startFresh = useCallback(() => {
    if (!board) return;
    const ok = board.sample || board.pins.length === 0 || window.confirm(`Clear all ${board.pins.length} places from this board? Export first if you want a copy.`);
    if (!ok) return;
    saveBoard({ ...EMPTY_BOARD, title: board.title, handle: board.handle });
    setAnchor(null);
    setTrip(ALL_TRIPS);
    setTab("add");
    notify("Fresh board. Add the first place.");
  }, [board, notify]);

  const loadSample = useCallback(() => {
    updateBoard((b) => ({ ...SAMPLE_BOARD, title: b.title, handle: b.handle }));
    setTrip(ALL_TRIPS);
    setTab("board");
  }, []);

  if (!board) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10" aria-busy="true">
        <div className="h-8 w-48 animate-pulse rounded-lg" style={{ background: "var(--w-paper-2)" }} />
        <div className="mt-6 w-masonry">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="mb-4 h-56 animate-pulse rounded-2xl" style={{ background: "var(--w-paper-2)" }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <BoardHeader
        board={board}
        trips={trips}
        trip={trip}
        onTrip={setTrip}
        onTitle={setTitle}
        onExport={doExport}
        onImport={doImport}
        onStartFresh={startFresh}
        onLoadSample={loadSample}
      />

      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-4 sm:px-6">
        {tab === "board" && (
          <BoardView
            pins={visiblePins}
            allEmpty={board.pins.length === 0}
            sample={board.sample === true}
            onOpen={setEditing}
            onGoHere={goHere}
            onToggleVisited={toggleVisited}
            onAdd={() => setTab("add")}
            onStartFresh={startFresh}
            onLoadSample={loadSample}
          />
        )}
        {tab === "nearby" && (
          <NearbyView
            pins={visiblePins}
            anchor={anchor}
            onAnchor={setAnchor}
            onOpen={setEditing}
            onToggleVisited={toggleVisited}
            notify={notify}
          />
        )}
        {tab === "clusters" && (
          <ClustersView pins={visiblePins} onOpen={setEditing} onAnchor={(a) => { setAnchor(a); setTab("nearby"); }} />
        )}
        {tab === "add" && (
          <section aria-labelledby="add-heading">
            <p className="w-eyebrow">New place</p>
            <h2 id="add-heading" className="w-display mt-1 text-3xl sm:text-4xl">
              What are you dreaming about?
            </h2>
            <p className="mt-2 max-w-prose text-sm" style={{ color: "var(--w-muted)" }}>
              A name is enough to start. Pin the location when you can, so it shows up in Nearby.
            </p>
            <div className="mt-6">
              <PinForm
                key={`add-${trip}`}
                trips={trips}
                defaultTrip={trip === ALL_TRIPS ? trips[0] ?? "" : trip}
                submitLabel="Add to board"
                onSubmit={(draft) => addPin({ ...draft, id: newId(), visited: false, createdAt: Date.now() })}
              />
            </div>
          </section>
        )}
      </div>

      <nav className="w-tabs" aria-label="Sections">
        <div className="mx-auto flex w-full max-w-2xl" role="tablist">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} className="w-tab" onClick={() => setTab(id)}>
              <Icon aria-hidden strokeWidth={tab === id ? 2.4 : 1.8} />
              {label}
            </button>
          ))}
        </div>
      </nav>

      {editing && (
        <PinSheet
          pin={editing}
          trips={trips}
          onClose={() => setEditing(null)}
          onSave={updatePin}
          onDelete={deletePin}
          onGoHere={goHere}
        />
      )}

      {toast && (
        <div role="status" className="pointer-events-none fixed inset-x-0 bottom-24 z-40 flex justify-center px-4">
          <div className="rounded-full px-4 py-2 text-sm font-semibold shadow-lg" style={{ background: "var(--w-ink)", color: "var(--w-paper)" }}>
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
