"use client";

import { useEffect, useRef, useState } from "react";
import {
  HERO_VIDEO_ID,
  HERO_START_TIME,
  HERO_END_TIME,
} from "@/lib/constants";

/**
 * HeroVideo — background looping YouTube player.
 *
 * - Desktop: YouTube iframe, muted, loops HERO_START_TIME→HERO_END_TIME
 * - Mobile:  static poster (YouTube maxres thumb) — no iframe, no cost
 * - prefers-reduced-motion: poster only, iframe skipped entirely
 *
 * No react-youtube dep; we inject the IFrame API directly.
 */

type YTPlayer = {
  seekTo: (s: number, allowSeekAhead?: boolean) => void;
  getCurrentTime: () => number;
  playVideo: () => void;
  mute: () => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (id: string, opts: YTPlayerOptions) => YTPlayer;
      PlayerState: { PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type YTPlayerOptions = {
  videoId: string;
  playerVars: Record<string, number>;
  events: {
    onReady: (e: { target: YTPlayer }) => void;
    onStateChange: (e: { data: number; target: YTPlayer }) => void;
  };
};

const POSTER_URL = `https://i.ytimg.com/vi/${HERO_VIDEO_ID}/maxresdefault.jpg`;

export default function HeroVideo() {
  const [useVideo, setUseVideo] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const loopIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Gate: desktop-ish + full motion preference
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqDesktop = window.matchMedia("(min-width: 768px)");

    const evaluate = () => {
      setUseVideo(mqDesktop.matches && !mqReduced.matches);
    };
    evaluate();
    mqReduced.addEventListener("change", evaluate);
    mqDesktop.addEventListener("change", evaluate);

    return () => {
      mqReduced.removeEventListener("change", evaluate);
      mqDesktop.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!useVideo) return;

    const createPlayer = () => {
      if (!window.YT) return;
      playerRef.current = new window.YT.Player("ysk-hero-yt", {
        videoId: HERO_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          start: HERO_START_TIME,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.seekTo(HERO_START_TIME, true);
            e.target.playVideo();
          },
          onStateChange: (e) => {
            if (e.data === window.YT!.PlayerState.PLAYING) {
              if (loopIntervalRef.current)
                clearInterval(loopIntervalRef.current);
              loopIntervalRef.current = setInterval(() => {
                const t = playerRef.current?.getCurrentTime();
                if (t !== undefined && t >= HERO_END_TIME) {
                  playerRef.current?.seekTo(HERO_START_TIME, true);
                }
              }, 500);
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [useVideo]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.82 }}>
      {/* Poster — always rendered, iframe covers it when active */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER_URL})` }}
      />
      {useVideo && (
        <div className="absolute left-1/2 top-1/2 aspect-video w-[300%] -translate-x-1/2 -translate-y-1/2 md:w-[180%]">
          <div id="ysk-hero-yt" className="h-full w-full" />
        </div>
      )}
    </div>
  );
}
