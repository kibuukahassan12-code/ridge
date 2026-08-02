"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  function next() {
    setIndex((i) => (i + 1) % testimonials.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <section className="bg-ivory-100 py-28 lg:py-36">
      <Container className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Kicker className="justify-center text-gold-600">Guest Stories</Kicker>
        </Reveal>
        <Reveal index={1}>
          <Quote className="mx-auto mt-8 h-10 w-10 text-gold-500" aria-hidden />
        </Reveal>
        <Reveal index={2} className="mt-6">
          <p className="text-balance font-display text-[clamp(1.5rem,3vw,2.4rem)] font-medium leading-snug text-forest-950">
            {t.quote}
          </p>
          <div className="mt-6 flex justify-center gap-1" aria-hidden>
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
            ))}
          </div>
          <p className="mt-4 text-sm uppercase tracking-widest text-forest-800/60">
            {t.name} · {t.origin}
          </p>
        </Reveal>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="rounded-full border border-forest-800/20 p-3 text-forest-900 transition-colors hover:border-gold-500 hover:text-gold-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Select testimonial">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-gold-500" : "w-1.5 bg-forest-800/20"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="rounded-full border border-forest-800/20 p-3 text-forest-900 transition-colors hover:border-gold-500 hover:text-gold-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </Container>
    </section>
  );
}
