"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryCategories, galleryImages } from "@/data/gallery";

// Predefined collage layout patterns for a dynamic, attractive look
// Each pattern defines the aspect ratios for a row of images
const COLLAGE_PATTERNS = [
  // Row 1: Large feature + two smaller
  ["aspect-[4/3]", "aspect-[3/4]", "aspect-[3/4]"],
  // Row 2: Two medium + one tall
  ["aspect-[3/4]", "aspect-[4/3]", "aspect-[3/4]"],
  // Row 3: Three equal landscape
  ["aspect-[4/3]", "aspect-[4/3]", "aspect-[4/3]"],
  // Row 4: Tall + wide + tall
  ["aspect-[3/4]", "aspect-[16/10]", "aspect-[3/4]"],
  // Row 5: Wide feature + two portrait
  ["aspect-[16/10]", "aspect-[3/4]", "aspect-[3/4]"],
  // Row 6: Mixed
  ["aspect-[3/4]", "aspect-[4/3]", "aspect-[3/4]"],
];

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? galleryImages : galleryImages.filter((img) => img.category === active);

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-widest transition-all duration-300 sm:px-5 sm:text-xs ${
              active === cat
                ? "border-gold-500 bg-gold-500 text-forest-950 shadow-lg shadow-gold-500/20"
                : "border-stone-400/50 text-forest-800/70 hover:border-gold-500 hover:text-gold-600 hover:shadow-md"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo collage grid */}
      <div className="mt-12 space-y-4 sm:space-y-5">
        {Array.from({ length: Math.ceil(filtered.length / 3) }).map((_, rowIdx) => {
          const pattern = COLLAGE_PATTERNS[rowIdx % COLLAGE_PATTERNS.length];
          const rowImages = filtered.slice(rowIdx * 3, rowIdx * 3 + 3);

          if (rowImages.length === 0) return null;

          return (
            <div key={rowIdx} className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {rowImages.map((img, colIdx) => {
                const aspect = pattern[colIdx] || "aspect-[4/3]";
                const isFeature = colIdx === 0 && rowIdx % 2 === 0;

                return (
                  <motion.div
                    key={img.src}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: colIdx * 0.1 }}
                    className={`group relative overflow-hidden rounded-2xl shadow-md transition-shadow duration-500 hover:shadow-2xl hover:shadow-forest-950/20 ${
                      isFeature ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <div className={`relative w-full ${aspect} overflow-hidden`}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      {/* Caption */}
                      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-xs font-medium uppercase tracking-widest text-ivory-100">
                          {img.alt}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-widest text-gold-300">
                          {img.category}
                        </p>
                      </div>
                      {/* Zoom icon */}
                      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-forest-950/50 text-ivory-100 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m-3-3h6" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}