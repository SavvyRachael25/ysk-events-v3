"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2028-06-01T00:00:00-07:00");

function unitsUntil(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  return { days, hours, minutes };
}

/**
 * Countdown to June 2028. Renders em-dash placeholders on the server,
 * fills in after hydration so there is no SSR clock mismatch.
 */
export default function Countdown() {
  const [t, setT] = useState<ReturnType<typeof unitsUntil> | null>(null);

  useEffect(() => {
    setT(unitsUntil(EVENT_DATE));
    const id = setInterval(() => setT(unitsUntil(EVENT_DATE)), 30_000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: t?.days, label: "Days" },
    { value: t?.hours, label: "Hours" },
    { value: t?.minutes, label: "Minutes" },
  ];

  return (
    <div
      className="inline-flex items-stretch divide-x divide-border-strong/60 border-y border-border-strong/60"
      role="timer"
      aria-label="Countdown to June 2028"
    >
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-[86px] flex-col items-center px-6 py-3"
        >
          <span
            className="font-lockup tabular-nums text-ink"
            style={{ fontSize: "1.75rem", lineHeight: 1.1 }}
          >
            {u.value === undefined ? "···" : u.value.toLocaleString("en-US")}
          </span>
          <span className="mt-1 font-sans text-[9px] font-semibold uppercase tracking-[0.3em] text-ink-faint">
            {u.label}
          </span>
        </div>
      ))}
      <div className="flex flex-col items-center justify-center px-6 py-3">
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.3em] text-gold">
          Until
        </span>
        <span className="mt-1 font-lockup text-ink" style={{ fontSize: "1.05rem" }}>
          June 2028
        </span>
      </div>
    </div>
  );
}
