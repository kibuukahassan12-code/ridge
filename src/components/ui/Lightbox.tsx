"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
}

const MIN_ZOOMABLE_SIZE = 80;
const MIN_SCALE = 0.25;
const MAX_SCALE = 6;
const ZOOM_STEP = 0.5;

export default function Lightbox() {
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const collectImages = useCallback((): LightboxImage[] => {
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
    return imgs
      .filter((img) => {
        // Skip images inside header/nav/footer (logos, icons)
        if (img.closest("header, nav, footer")) return false;
        // Skip aria-hidden decorative images
        if (img.getAttribute("aria-hidden") === "true") return false;
        // Skip tiny images (icons, thumbnails)
        const rect = img.getBoundingClientRect();
        if (rect.width < MIN_ZOOMABLE_SIZE || rect.height < MIN_ZOOMABLE_SIZE) return false;
        return true;
      })
      .map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt || "",
      }));
  }, []);

  // Global click delegation — any content image opens the lightbox
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const img = target.closest("img") as HTMLImageElement | null;
      if (!img) return;

      // Skip images inside header/nav/footer (logos, icons)
      if (img.closest("header, nav, footer")) return;
      // Skip aria-hidden decorative images
      if (img.getAttribute("aria-hidden") === "true") return;
      // Skip tiny images (icons, thumbnails)
      const rect = img.getBoundingClientRect();
      if (rect.width < MIN_ZOOMABLE_SIZE || rect.height < MIN_ZOOMABLE_SIZE) return;

      e.preventDefault();
      e.stopPropagation();

      const all = collectImages();
      const src = img.currentSrc || img.src;
      const idx = all.findIndex((i) => i.src === src);
      setImages(all);
      setIndex(idx >= 0 ? idx : 0);
      setScale(1);
      setPan({ x: 0, y: 0 });
      setOpen(true);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [collectImages]);

  // Keyboard navigation (ESC / arrows / +/- zoom)
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (scale !== 1) {
          resetZoom();
        } else {
          setOpen(false);
        }
      }
      if (e.key === "ArrowRight") {
        if (scale === 1) setIndex((i) => (i + 1) % images.length);
      }
      if (e.key === "ArrowLeft") {
        if (scale === 1) setIndex((i) => (i - 1 + images.length) % images.length);
      }
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "0") resetZoom();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length, scale]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Reset zoom when switching images
  useEffect(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, [index]);

  function zoomIn() {
    setScale((s) => Math.min(MAX_SCALE, s + ZOOM_STEP));
  }

  function zoomOut() {
    setScale((s) => Math.max(MIN_SCALE, s - ZOOM_STEP));
  }

  function resetZoom() {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }

  function handleWheel(e: React.WheelEvent) {
    if (!open) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta)));
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (scale === 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging || scale === 1) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({ x: dragStart.current.panX + dx, y: dragStart.current.panY + dy });
  }

  function handlePointerUp() {
    setIsDragging(false);
  }

  function handleDoubleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(2.5);
      setPan({ x: 0, y: 0 });
    }
  }

  const current = images[index];

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-forest-950/95 p-4 backdrop-blur-xl sm:p-8"
          onClick={() => {
            if (scale !== 1) {
              resetZoom();
            } else {
              setOpen(false);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onWheel={handleWheel}
          ref={containerRef}
        >
          {/* Close */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-ivory-100/20 bg-forest-900/60 text-ivory-100 transition-colors hover:border-gold-400 hover:text-gold-400 sm:right-6 sm:top-6"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Zoom controls */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-ivory-100/20 bg-forest-900/70 px-3 py-2 backdrop-blur-md">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                zoomOut();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ivory-100 transition-colors hover:bg-ivory-100/10 hover:text-gold-400"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="min-w-[3.5rem] text-center text-xs font-medium tabular-nums text-ivory-100/80">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                zoomIn();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ivory-100 transition-colors hover:bg-ivory-100/10 hover:text-gold-400"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <div className="mx-1 h-5 w-px bg-ivory-100/20" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ivory-100 transition-colors hover:bg-ivory-100/10 hover:text-gold-400"
              aria-label="Reset zoom"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setScale(MAX_SCALE);
                setPan({ x: 0, y: 0 });
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ivory-100 transition-colors hover:bg-ivory-100/10 hover:text-gold-400"
              aria-label="Zoom to maximum"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Prev / Next */}
          {images.length > 1 && scale === 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((i) => (i - 1 + images.length) % images.length);
                }}
                className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory-100/20 bg-forest-900/60 text-ivory-100 transition-colors hover:border-gold-400 hover:text-gold-400 sm:left-6"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((i) => (i + 1) % images.length);
                }}
                className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory-100/20 bg-forest-900/60 text-ivory-100 transition-colors hover:border-gold-400 hover:text-gold-400 sm:right-6"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image */}
          <motion.figure
            key={current.src}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-full max-w-full select-none"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleDoubleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{ cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
          >
            <motion.div
              animate={{ scale, x: pan.x, y: pan.y }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex flex-col items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.src}
                alt={current.alt}
                draggable={false}
                className="max-h-[80vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
              />
              <figcaption className="mt-4 flex flex-col items-center gap-1">
                {current.alt && (
                  <p className="text-center text-sm text-ivory-100/80">{current.alt}</p>
                )}
                {images.length > 1 && (
                  <p className="text-center text-xs text-ivory-100/50">
                    {index + 1} / {images.length}
                  </p>
                )}
              </figcaption>
            </motion.div>
          </motion.figure>

          {/* Hint */}
          {scale === 1 && (
            <p className="pointer-events-none absolute bottom-24 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest-900/60 px-4 py-1.5 text-[11px] text-ivory-100/60 backdrop-blur-md">
              Scroll or use controls to zoom · Double-click to zoom in
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}