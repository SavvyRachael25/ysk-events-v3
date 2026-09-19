/**
 * "As seen in" logos, rendered monochrome so four house styles read as one
 * row. Logo files are the outlets' own marks (Wikimedia Commons, PD text
 * logos), used to state where YSK has been covered. Nominative use only.
 */
const OUTLETS = [
  { name: "The Seattle Times", src: "/press/seattle-times.svg", h: "h-6 md:h-7" },
  { name: "KING 5", src: "/press/king5.svg", h: "h-9 md:h-10" },
  { name: "KUOW (NPR)", src: "/press/kuow.svg", h: "h-6 md:h-7" },
  { name: "FOX 13 Seattle", src: "/press/fox13.svg", h: "h-5 md:h-6" },
];

export default function PressStrip({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  const filter = tone === "dark" ? "grayscale(1) brightness(0) invert(1)" : "grayscale(1) brightness(0.2)";
  return (
    <ul className={`flex flex-wrap items-center gap-x-10 gap-y-5 ${className}`} aria-label="Press coverage">
      {OUTLETS.map((o) => (
        <li key={o.name} className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={o.src} alt={o.name} className={`${o.h} w-auto opacity-80 transition-opacity hover:opacity-100`} style={{ filter }} />
        </li>
      ))}
    </ul>
  );
}
