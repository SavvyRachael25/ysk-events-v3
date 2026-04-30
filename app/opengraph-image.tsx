import { ImageResponse } from "next/og";

export const alt =
  "YSK Events — Raising Champions On & Off the Court. Pacific Northwest youth squash nonprofit.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 80% 60% at 80% 0%, #4a2570 0%, transparent 65%), radial-gradient(ellipse 70% 70% at 0% 100%, #6b2d8e 0%, transparent 65%), #1a0f2e",
          color: "#f5efe6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span
            style={{
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: "0.04em",
              color: "#f5efe6",
            }}
          >
            YSK
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#7befc4",
            }}
          >
            Events
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#7befc4",
            }}
          >
            Pacific Northwest · Youth Squash · LA28 Pathway
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: "#f5efe6",
              maxWidth: 900,
            }}
          >
            Raising Champions
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#7befc4",
              letterSpacing: "-0.005em",
            }}
          >
            on &amp; off the court.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(245, 239, 230, 0.65)",
            fontWeight: 700,
          }}
        >
          <span>501(c)(3) Nonprofit · Est. 2013</span>
          <span>yskevents.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
