"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-stone-400/30 border-y border-stone-400/30">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-lg text-forest-950">{item.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className="grid overflow-hidden transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm leading-relaxed text-forest-800/75">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
