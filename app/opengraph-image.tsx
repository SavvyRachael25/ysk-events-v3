import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt =
  "The Road to LA Goes Through Washington. The final Olympic qualification event for squash, Bellevue and Seattle, June 2028. Presented by YSK Events.";
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
        <img src={markSrc} alt="" height={300} />

        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 40,
            fontWeight: 700,
            color: "#1c1815",
            letterSpacing: "0.01em",
            textAlign: "center",
          }}
        >
          The Road to LA Goes Through Washington
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 22,
            color: "#57534e",
            letterSpacing: "0.04em",
          }}
        >
          The Final Olympic Qualification Event for Squash
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 10,
            fontSize: 20,
            fontWeight: 700,
            color: "#a87a3d",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Bellevue · Seattle · June 2028
        </div>

        {/* USA tricolor rule, then YSK attribution */}
        <div style={{ display: "flex", marginTop: 34 }}>
          <div style={{ width: 46, height: 4, background: "#1b2f5c" }} />
          <div style={{ width: 46, height: 4, background: "#e9e3d6" }} />
          <div style={{ width: 46, height: 4, background: "#bc2c3c" }} />
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 19,
            fontWeight: 700,
            color: "#1c1815",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
          }}
        >
          Presented by YSK Events
        </div>
      </div>
    ),
    { ...size },
  );
}
