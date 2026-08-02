import type { Metadata } from "next";
import { Star } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Guest Testimonials",
  description: "Read what guests say about their stay at Ridge Hotel, Fort Portal.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero small image={media.dining[2]} kicker="Guest Testimonials" title="Stories From Our Guests" />
      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} index={i}>
              <div className="h-full rounded-2xl border border-stone-400/30 p-8">
                <div className="flex gap-1" aria-hidden>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl leading-snug text-forest-950">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-5 text-xs uppercase tracking-widest text-forest-800/60">
                  {t.name} · {t.origin}
                </p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
