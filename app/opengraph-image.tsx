import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt =
  "The Final Olympic Qualifier for Squash. Bellevue and Seattle, Washington, June 2028. Presented by YSK Events.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card.
 *
 * Leads with the LA28 Olympic mark, used under clearance held by YSK Events.
 * The mark is rendered unaltered on white with generous clear space and is
 * never overlaid or recoloured. YSK is named alongside it so the card reads
 * as YSK's event page referencing the Games, not as an LA28 property.
 */
export default function OgImage() {
  const mark = readFileSync(
    join(process.cwd(), "public/event/la28-olympic-mark.png"),
  );
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* The mark, unaltered, with clear space */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} alt="" height={190} />

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 44,
            fontWeight: 900,
            color: "#000000",
            textTransform: "uppercase",
            letterSpacing: "0.01em",
            textAlign: "center",
          }}
        >
          The Final Olympic Qualifier for Squash
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 14,
            fontSize: 22,
            color: "#000000",
            letterSpacing: "0.04em",
          }}
        >
          Presented by YSK Events
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 10,
            fontSize: 20,
            fontWeight: 800,
            color: "#009ed6",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Bellevue · Seattle · June 2028
        </div>

        {/* USA tricolor rule, then YSK attribution */}
        <div style={{ display: "flex", marginTop: 34 }}>
          <div style={{ width: 46, height: 5, background: "#009ed6" }} />
          <div style={{ width: 46, height: 5, background: "#3adfa8" }} />
          <div style={{ width: 46, height: 5, background: "#ff018f" }} />
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 16,
            fontWeight: 700,
            color: "#000000",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          A 501(c)(3) nonprofit
        </div>
      </div>
    ),
    { ...size },
  );
}
