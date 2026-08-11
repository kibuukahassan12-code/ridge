import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import { experiences } from "@/data/experiences";
import { media } from "@/data/media";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Discover Western Uganda",
  description:
    "From Kibale chimpanzee tracking to the Rwenzori Mountains, crater lakes and Queen Elizabeth National Park — discover Western Uganda from Ridge Hotel, Fort Portal.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        image={media.craterLakes[2]}
        kicker="Discover Western Uganda"
        title="Your Base Camp for Uganda's Wild Heart"
        copy="Chimpanzees, crater lakes, tea estates, tree-climbing lions and glaciated peaks — all within an easy drive of Ridge Hotel."
      />

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((exp, i) => (
              <Reveal key={exp.slug} index={i}>
                <Link href={`/experiences/${exp.slug}`} className="group block h-full">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <Image
                      src={exp.image}
                      alt={exp.name}
                      fill
                      sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ivory-100/15 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4 text-ivory-100" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-6 text-ivory-100">
                      <p className="text-[11px] uppercase tracking-widest text-gold-300">{exp.region}</p>
                      <h2 className="mt-2 font-display text-xl leading-tight">{exp.name}</h2>
                      <p className="mt-3 text-sm text-ivory-100/75">{exp.tagline}</p>
                      <div className="mt-4 flex flex-wrap gap-4 text-xs text-ivory-100/65">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{exp.distance}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{exp.duration}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest-950 py-20 text-center text-ivory-100">
        <Container>
          <Kicker className="justify-center text-gold-400">Plan With Us</Kicker>
          <h2 className="mx-auto mt-5 max-w-xl text-balance font-display text-3xl">
            Let Our Concierge Design Your Itinerary
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-ivory-100/70">
            We arrange permits, licensed guides and private transport for every excursion above.
          </p>
          <div className="mt-8">
            <a
              href={`${site.contact.whatsapp}?text=${encodeURIComponent("Hi Ridge Hotel! I'd like help planning my itinerary.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold uppercase tracking-widest text-gold-400 hover:text-gold-300"
            >
              Contact Our Concierge →
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
