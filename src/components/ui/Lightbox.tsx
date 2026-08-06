"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  src: string;
  alt: string;
}

const MIN_ZOOMABLE_SIZE = 80;

export default function Lightbox() {
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

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
      setOpen(true);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [collectImages]);

  // Keyboard navigation (ESC / arrows)
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

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
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-ivory-100/20 bg-forest-900/60 text-ivory-100 transition-colors hover:border-gold-400 hover:text-gold-400 sm:right-6 sm:top-6"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev / Next */}
          {images.length > 1 && (
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
            className="relative max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
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
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}