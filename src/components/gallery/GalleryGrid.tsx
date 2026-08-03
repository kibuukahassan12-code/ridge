"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryCategories, galleryImages } from "@/data/gallery";

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? galleryImages : galleryImages.filter((img) => img.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition-colors ${
              active === cat
                ? "border-gold-500 bg-gold-500 text-forest-950"
                : "border-stone-400/50 text-forest-800/70 hover:border-gold-500 hover:text-gold-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {filtered.map((img) => (
          <motion.div
            key={img.src}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl break-inside-avoid"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={1000}
              sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="p-4 text-xs uppercase tracking-widest text-ivory-100">{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
