"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { media } from "@/data/media";
import MagneticButton from "@/components/ui/MagneticButton";

// ─── Main Hero Carousel (image-only) ────────────────────────────────────────
const sceneImages: string[] = [
  "/images/711A6517.JPG",
  "/images/hero-scene-2.png",
  "/images/hero-scene-3.png",
  media.tea[0],
  media.mountains[0],
];

export default function CinematicHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoplayRef = useRef<ReturnType<typeof Autoplay> | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Store the autoplay plugin instance for pause/resume on hover
    autoplayRef.current = emblaApi.plugins()?.autoplay ?? null;

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const pauseAutoplay = useCallback(() => {
    autoplayRef.current?.stop();
  }, []);

  const resumeAutoplay = useCallback(() => {
    autoplayRef.current?.play();
  }, []);

  return (
    <section
      className="relative h-dvh overflow-hidden bg-forest-950"
      aria-label="Ridge Hotel experience carousel"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Embla viewport */}
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {sceneImages.map((image, i) => (
            <div
              key={image}
              className="relative min-w-0 flex-[0_0_100%]"
              aria-hidden={i !== selectedIndex}
            >
              <Image
                src={image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                quality={100}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-forest-950/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Volumetric light + fog overlay to mask transitions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-950/70 via-transparent to-forest-950/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(233,212,161,0.18),transparent_55%)]" />
      <FloatingParticles />

      {/* Book Your Stay button */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-10 lg:px-16 lg:pb-14">
        <div className="mx-auto w-full max-w-[1440px]">
          <MagneticButton
            href="/booking"
            className="bg-gold-500 text-forest-950 hover:bg-gold-400"
          >
            Book Your Stay
          </MagneticButton>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:right-14 lg:flex">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            className="h-8 w-px overflow-hidden bg-ivory-100/25 transition-colors hover:bg-ivory-100/50"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === selectedIndex}
          >
            <span
              className="block h-full w-full origin-top bg-gold-400 transition-transform duration-500"
              style={{ transform: selectedIndex >= i ? "scaleY(1)" : "scaleY(0)" }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-ivory-100/40"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            animation: `drift-${i % 3} ${14 + (i % 6)}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
            opacity: 0.4,
          }}
        />
      ))}
      <style>{`
        @keyframes drift-0 { 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(18px,-30px);} }
        @keyframes drift-1 { 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(-24px,-18px);} }
        @keyframes drift-2 { 0%,100%{ transform: translate(0,0);} 50%{ transform: translate(14px,24px);} }
      `}</style>
    </div>
  );
}