"use client";

import { useEffect, useState } from "react";

// Full-viewport cinematic video that autoplays when the site is opened.
// Uses Vimeo's background player mode (muted + looped) so autoplay is allowed.
// The overlay auto-dismisses after MAX_DURATION_MS (or as soon as the video
// loads / errors) so the site is never stuck behind a black screen.

const VIMEO_EMBED_URL =
  "https://player.vimeo.com/video/1215001709?autoplay=1&muted=1&loop=1&controls=0&background=1&playsinline=1";

const MAX_DURATION_MS = 5000;

export default function VideoOverlay() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Auto-dismiss after the max duration no matter what.
    const timeout = setTimeout(() => setVisible(false), MAX_DURATION_MS);
    return () => clearTimeout(timeout);
  }, []);

  // Dismiss once the video actually starts playing.
  useEffect(() => {
    if (playing) {
      const t = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(t);
    }
  }, [playing]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] bg-black transition-opacity duration-700 ${ready || playing ? "opacity-100" : "opacity-100"}`}
      aria-hidden="true"
    >
      <iframe
        src={VIMEO_EMBED_URL}
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        allowFullScreen
        title="Ridge Hotel cinematic video"
        onLoad={() => setReady(true)}
        onError={() => setVisible(false)}
        onPlay={() => setPlaying(true)}
        // @ts-expect-error – playsinline is not in React's HTMLIFrameElement types but is required for iOS Safari autoplay
        playsInline
        webkit-playsinline="true"
        frameBorder="0"
      />
    </div>
  );
}
