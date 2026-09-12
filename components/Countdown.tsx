"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2028-06-01T00:00:00-07:00");

function unitsUntil(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms % 86_400_000) / 3_600_000),
    minutes: Math.floor((ms % 3_600_000) / 60_000),
    seconds: Math.floor((ms % 60_000) / 1000),
  };
}

/**
 * Big black numerals, LA28-style countdown. Server renders dashes, client
 * fills in after hydration to avoid a clock mismatch. Ticks every second.
 */
export default function Countdown() {
  const [t, setT] = useState<ReturnType<typeof unitsUntil> | null>(null);
  useEffect(() => {
    setT(unitsUntil(EVENT_DATE));
    const id = setInterval(() => setT(unitsUntil(EVENT_DATE)), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n?: number) => (n === undefined ? "--" : String(n).padStart(2, "0"));
  const units = [
    { v: t ? String(t.days) : "---", l: "Days" },
    { v: pad(t?.hours), l: "Hours" },
    { v: pad(t?.minutes), l: "Mins" },
    { v: pad(t?.seconds), l: "Sec" },
  ];
  return (
    <div role="timer" aria-label="Countdown to the qualifier, June 2028" className="flex items-end gap-4 md:gap-7">
      {units.map((u, i) => (
        <div key={u.l} className="flex items-end gap-4 md:gap-7">
          <div className="flex flex-col items-center">
            <span className="font-lockup leading-none text-black" style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)" }}>
              {u.v}
            </span>
            <span className="mt-2 font-sans text-[11px] font-800 uppercase tracking-[0.14em] text-black" style={{ fontWeight: 800 }}>
              {u.l}
            </span>
          </div>
          {i < units.length - 1 && i > 0 && (
            <span aria-hidden="true" className="mb-7 font-lockup leading-none text-black" style={{ fontSize: "clamp(2rem, 4.5vw, 3.8rem)" }}>:</span>
          )}
        </div>
      ))}
    </div>
  );
}
