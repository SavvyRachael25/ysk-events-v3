import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #ff7a7e 0%, #e5484d 60%, #b8353a 100%)",
          color: "#fff",
          fontSize: 112,
          fontFamily: "Georgia, serif",
        }}
      >
        W
      </div>
    ),
    { ...size },
  );
}
