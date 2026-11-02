import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Internal funding board: passcode-gated static page, kept out of search.
  async rewrites() {
    return [{ source: "/funding-board", destination: "/funding-board.html" }];
  },
  async headers() {
    return [
      {
        source: "/funding-board",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/funding-board.html",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
