"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { media } from "@/data/media";
import MagneticButton from "@/components/ui/MagneticButton";

type Scene = {
  image: string;
  kicker: string;
  title: string;
  copy: string;
};

const scenes: Scene[] = [
  {
    image: "/images/hero-scene-1.JPG",
    kicker: "Uganda's Pearl of the West",
    title: "Arrive at Ridge Hotel",
    copy: "Your gateway to Uganda's most extraordinary landscapes — blooming lawns, open skies, and the warmth of true Ugandan hospitality.",
  },
  {
    image: "/images/hero-scene-2.png",
    kicker: "Where Uganda welcomes the world",
    title: "Welcomed, Warmly",
    copy: "Timber, ivory linen and authentic Toro craft — a sanctuary rooted in Ugandan culture, where every arrival feels like coming home.",
  },
  {
    image: "/images/hero-scene-3.png",
    kicker: "Your balcony awaits",
    title: "Twenty-One Rooms, One Unforgettable View",
    copy: "Wake to the snow-capped peaks of the Rwenzori Mountains and set out into the wild heart of Uganda waiting beyond the gate.",
  },
  {
    image: media.craterLakes[1],
    kicker: "Fifty lakes in fifty shades of green",
    title: "Out to the Crater Lakes",
    copy: "Volcanic waters catch the morning light — a landscape found nowhere else on the African continent.",
  },
  {
    image: media.tea[0],
    kicker: "Uganda's highland tea country",
    title: "Through Emerald Tea Estates",
    copy: "Wander the sweeping rows of Uganda's organic tea plantations — guests are welcome to explore these living landscapes up close.",
  },
  {
    image: media.mountains[0],
    kicker: "The Mountains of the Moon",
    title: "Where Uganda Touches the Sky",
    copy: "Light breaks over Margherita Peak — the roof of Uganda, glaciers older than memory, and the finest reason to stay another night.",
  },
];

// ─── Vimeo Intro removed ─────────────────────────────────────────────────────
// The intro video now lives only in the VideoShowcase section below the hero.

// ─── Main Hero Carousel ──────────────────────────────────────────────────────
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
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
          {scenes.map((scene, i) => (
            <div
              key={scene.image}
              className="relative min-w-0 flex-[0_0_100%]"
              aria-hidden={i !== selectedIndex}
            >
              <Image
                src={scene.image}
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

      {/* Caption layer */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-16 sm:px-10 lg:px-16 lg:pb-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="pointer-events-none relative min-h-[17rem] sm:min-h-[15rem]">
            {scenes.map((scene, i) => (
              <Caption
                key={scene.title}
                scene={scene}
                index={i}
                active={i === selectedIndex}
              />
            ))}
          </div>
          <div className="mt-8">
            <MagneticButton href="/booking" className="bg-gold-500 text-forest-950 hover:bg-gold-400">
              Book Your Stay
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        type="button"
        onClick={scrollPrev}
        className="group absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-ivory-100/25 bg-forest-950/30 p-3 text-ivory-100 backdrop-blur-sm transition-colors hover:border-gold-400 hover:bg-forest-950/60 hover:text-gold-300 sm:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="group absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-ivory-100/25 bg-forest-950/30 p-3 text-ivory-100 backdrop-blur-sm transition-colors hover:border-gold-400 hover:bg-forest-950/60 hover:text-gold-300 sm:right-8"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>

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

function Caption({
  scene,
  index,
  active,
}: {
  scene: Scene;
  index: number;
  active: boolean;
}) {
  // The first scene's title doubles as the page's main heading.
  const Heading = index === 0 ? "h1" : "h2";

  return (
    <div
      className={`absolute bottom-0 left-0 max-w-2xl transition-all duration-700 ease-out ${
        active
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
      aria-hidden={!active}
    >
      <p className="kicker mb-4 text-gold-300">{scene.kicker}</p>
      <Heading className="text-balance font-display text-[clamp(1.8rem,4.4vw,3.4rem)] font-medium leading-[1.08] text-ivory-100">
        {scene.title}
      </Heading>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-ivory-100/80">{scene.copy}</p>
    </div>
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