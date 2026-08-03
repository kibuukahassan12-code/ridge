"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Cinematic video showcase rendered as a normal page section BELOW the hero.
// The Vimeo iframe is only injected when the section scrolls into view,
// at which point it autoplays (muted + looped) via URL parameters.
// A styled image placeholder sits behind it, so even if Vimeo is unreachable
// the section still displays gracefully (never a black void).

const VIMEO_EMBED_URL =
  "https://player.vimeo.com/video/1215001709?autoplay=1&muted=1&loop=1&controls=0&background=1&playsinline=1";

export default function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect(); // only load once
          }
        }
      },
      { rootMargin: "200px" } // start loading slightly before it's fully visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-forest-950 py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <div>
            <p className="kicker divider-leaf justify-center text-gold-400">The Ridge Experience</p>
          </div>
          <div>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-ivory-100">
              A Cinematic Welcome to the Rwenzoris
            </h2>
          </div>
          <div>
            <p className="mt-4 text-lg leading-relaxed text-ivory-100/75">
              Watch the highlands of Western Uganda unfold — from the gardens of Ridge Hotel to the
              snow-capped peaks of the Mountains of the Moon.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width video — breaks out of the max-w container to cover the whole section */}
      <div
        ref={containerRef}
        className="relative mt-16 aspect-video w-full overflow-hidden bg-forest-900"
      >
        {/* Placeholder shown behind the iframe while it loads (or if Vimeo is unreachable) */}
        <Image
          src="/images/hero-scene-1.png"
          alt="Ridge Hotel cinematic video placeholder"
          fill
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-forest-950/40" />

        {/* Vimeo player — injected only when scrolled into view, then autoplays muted.
            background=1 hides all controls/timer/title for a clean cinematic look. */}
        {shouldLoad && (
          <iframe
            src={VIMEO_EMBED_URL}
            className="relative z-10 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            allowFullScreen
            title="Ridge Hotel cinematic video"
            // @ts-expect-error – playsinline is not in React's HTMLIFrameElement types but is required for iOS Safari autoplay
            playsInline
            webkit-playsinline="true"
            frameBorder="0"
          />
        )}
      </div>
    </section>
  );
}