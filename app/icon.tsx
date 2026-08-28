import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1815",
          color: "#c99a4b",
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: "0.02em",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Y
      </div>
    ),
    { ...size },
  );
}
