import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { diningVenues, menuHighlights } from "@/data/dining";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Dining & Bar",
  description:
    "Discover dining at Ridge Hotel, Fort Portal — a garden-facing restaurant, terrace bar, and private candlelit dinners serving Ugandan classics and international favourites.",
  alternates: { canonical: "/dining" },
};

export default function DiningPage() {
  return (
    <>
      <PageHero
        image={media.dining[0]}
        kicker="Dining & Bar"
        title="Tourism, Served With Care"
        copy="Ugandan classics and international favourites, plated on a terrace facing the Rwenzoris."
      />

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {diningVenues.map((venue, i) => (
            <Reveal key={venue.name} index={i}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-400/30">
                <div className="relative aspect-[4/3]">
                  <Image src={venue.image} alt={venue.name} fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-display text-xl text-forest-950">{venue.name}</h2>
                  <p className="mt-1 text-sm italic text-gold-600">{venue.tagline}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-forest-800/75">{venue.description}</p>
                  <p className="mt-5 text-xs uppercase tracking-widest text-forest-800/50">{venue.hours}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-forest-950 py-24 text-ivory-100 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center text-gold-400">Menu Highlights</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1]">
                A Taste of Toro, Plated Beautifully
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {menuHighlights.map((section, i) => (
              <Reveal key={section.category} index={i}>
                <h3 className="kicker text-gold-400">{section.category}</h3>
                <ul className="mt-5 space-y-3 border-t border-ivory-100/10 pt-5">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-ivory-100/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-ivory-100/50">
            Menus rotate seasonally based on local availability. Vegetarian, vegan and dietary-specific options
            available on request.
          </p>
        </Container>
      </section>

      <section className="bg-ivory-100 py-24">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={media.dining[4]} alt="Private garden dining setup" fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Kicker className="text-gold-600">Private Dining</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 font-display text-3xl text-forest-950">Book a Table Under the Stars</h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-5 text-lg leading-relaxed text-forest-800/80">
                Celebrating a proposal, anniversary or milestone? Our team will lay a private, lantern-lit table in
                the gardens and build a bespoke set menu with our executive chef — just for you.
              </p>
            </Reveal>
            <Reveal index={3} className="mt-8">
              <MagneticButton href="/contact" className="bg-forest-900 text-ivory-100 hover:bg-forest-800">
                Enquire About Private Dining
              </MagneticButton>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
