"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { media } from "@/data/media";

type Scene = {
  image: string;
  kicker: string;
  title: string;
  copy: string;
};

const scenes: Scene[] = [
  {
    image: "/images/hero-scene-1.png",
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
    title: "Thirty-Four Rooms, One Unforgettable View",
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

// ─── Vimeo Intro ────────────────────────────────────────────────────────────
const VIMEO_ID = "1215001709";

function VimeoIntro({ onDone }: { onDone: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Dismiss on scroll
  useEffect(() => {
    const handleScroll = () => onDone();
    window.addEventListener("scroll", handleScroll, { once: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onDone]);

  // Listen for Vimeo player finish message
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.event === "finish") onDone();
      } catch {}
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onDone]);

  // Tell Vimeo player to start listening for events once iframe loads
  const handleLoad = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method: "addEventListener", value: "finish" }),
      "*"
    );
  };

  return (
    <motion.div
      key="vimeo-intro"
      className="fixed inset-0 z-[100] bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
    >
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&muted=1&controls=0&loop=0&background=1&transparent=0&playsinline=1`}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        allowFullScreen
        onLoad={handleLoad}
        className="absolute inset-0 h-full w-full"
        style={{ border: "none" }}
        title="Ridge Hotel intro"
        // @ts-expect-error – playsinline is not in React's HTMLIFrameElement types but is required for iOS Safari autoplay
        playsInline
        webkit-playsinline="true"
        frameBorder="0"
      />
      {/* subtle skip hint */}
      <motion.button
        onClick={onDone}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 3, duration: 1 } }}
        className="absolute bottom-10 right-10 flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-5 py-2 text-xs uppercase tracking-widest text-white/70 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
      >
        Skip
      </motion.button>
    </motion.div>
  );
}

// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [videoShown, setVideoShown] = useState(true);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(scenes.length - 1, Math.floor(v * scenes.length));
    setActive(idx);
  });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const handleVideoDone = useCallback(() => {
    setVideoShown(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {videoShown && <VimeoIntro onDone={handleVideoDone} />}
      </AnimatePresence>

      <section
        ref={containerRef}
        className="relative bg-forest-950"
        style={{ height: `${scenes.length * 100}vh` }}
        aria-label="Cinematic journey from the Rwenzori Mountains to Ridge Hotel"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {scenes.map((scene, i) => (
            <SceneLayer key={scene.image} scene={scene} index={i} total={scenes.length} progress={scrollYProgress} />
          ))}

          {/* Volumetric light + fog overlay to mask transitions */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-950/70 via-transparent to-forest-950/80" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(233,212,161,0.18),transparent_55%)]" />
          <FloatingParticles />

          {/* Caption layer */}
          <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-end px-6 pb-24 sm:px-10 lg:px-16 lg:pb-28">
            <div className="mx-auto w-full max-w-[1440px]">
              {scenes.map((scene, i) => (
                <Caption key={scene.title} scene={scene} index={i} total={scenes.length} progress={scrollYProgress} />
              ))}
            </div>
          </div>

          {/* Progress rail */}
          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 lg:right-14 lg:flex">
            {scenes.map((_, i) => (
              <span
                key={i}
                className="h-8 w-px overflow-hidden bg-ivory-100/25"
                aria-hidden
              >
                <span
                  className="block h-full w-full origin-top bg-gold-400 transition-transform duration-500"
                  style={{ transform: active >= i ? "scaleY(1)" : "scaleY(0)" }}
                />
              </span>
            ))}
          </div>

          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-ivory-100/80"
          >
            <span className="kicker text-[10px]">Scroll to explore</span>
            <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden />
          </motion.div>
        </div>

        <div className="sr-only">
          <Link href="/booking">Book your stay at Ridge Hotel</Link>
        </div>
      </section>
    </>
  );
}

function SceneLayer({
  scene,
  index,
  total,
  progress,
}: {
  scene: Scene;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;
  const prevEnd = index === 0 ? start : (index - 0.15) / total;

  const opacity = useTransform(
    progress,
    [Math.max(0, prevEnd), start, end - 0.02, end],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]
  );
  const scale = useTransform(progress, [start, mid, end], [1.12, 1.0, 0.94]);
  const y = useTransform(progress, [start, end], ["0%", "-6%"]);

  return (
    <motion.div className="absolute inset-0 bg-forest-950" style={{ opacity }} aria-hidden={index !== 0}>
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <Image
          src={scene.image}
          alt={scene.title}
          fill
          priority={index === 0}
          sizes="100vw"
          quality={100}
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/10 to-forest-950/40" />
    </motion.div>
  );
}

function Caption({
  scene,
  index,
  total,
  progress,
}: {
  scene: Scene;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, start + 0.06, end - 0.08, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + 0.06], [26, 0]);

  return (
    <motion.div style={{ opacity, y }} className="absolute max-w-2xl">
      <p className="kicker mb-4 text-gold-300">{scene.kicker}</p>
      <h2 className="text-balance font-display text-[clamp(1.8rem,4.4vw,3.4rem)] font-medium leading-[1.08] text-ivory-100">
        {scene.title}
      </h2>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-ivory-100/80">{scene.copy}</p>
    </motion.div>
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
