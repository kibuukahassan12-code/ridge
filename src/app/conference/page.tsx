import type { Metadata } from "next";
import Image from "next/image";
import { Check, Users, Projector, Coffee, Wifi } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { media } from "@/data/media";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Conferences & Meetings",
  description:
    "Host conferences, workshops and corporate events at Ridge Hotel in the Rwenzori foothills — a 100-seat hall with AV equipment, catering and Wi-Fi.",
  alternates: { canonical: "/conference" },
};

const layouts = [
  { name: "Theatre", capacity: "100 guests" },
  { name: "Classroom", capacity: "60 guests" },
  { name: "Boardroom", capacity: "30 guests" },
  { name: "Banquet", capacity: "80 guests" },
  { name: "U-Shape", capacity: "40 guests" },
  { name: "Cocktail", capacity: "120 guests" },
];

const facilities = [
  { icon: Users, label: `Seats up to ${site.conferenceCapacity} delegates` },
  { icon: Projector, label: "Projector, screen & PA system" },
  { icon: Wifi, label: "Complimentary high-speed Wi-Fi" },
  { icon: Coffee, label: "Tea, coffee & catering service" },
];

export default function ConferencePage() {
  return (
    <>
      <PageHero
        image={media.conference[1]}
        kicker="Conferences & Meetings"
        title="Seat 100 Delegates in Comfort"
        copy="A dedicated conference hall surrounded by the natural beauty of the Rwenzoris, built for workshops, retreats and celebrations of ambition."
      />

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <Kicker className="text-gold-600">The Venue</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1] text-forest-950">
                Where Ideas Meet the Mountains
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 text-lg leading-relaxed text-forest-800/80">
                Our conference hall seats up to 100 delegates theatre-style, with flexible configurations for
                classroom, boardroom, banquet and cocktail-style events. Natural light, reliable power backup and
                standard AV equipment are included as standard.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-4 text-lg leading-relaxed text-forest-800/80">
                Break between sessions on the adjoining bar terrace, or extend your programme into the gardens for
                team-building activities and outdoor dinners — all steps from the meeting room.
              </p>
            </Reveal>
            <Reveal index={4} className="mt-8 grid grid-cols-2 gap-4">
              {facilities.map((facility) => (
                <div key={facility.label} className="flex items-center gap-3 text-sm text-forest-800/80">
                  <facility.icon className="h-4 w-4 shrink-0 text-gold-600" />
                  {facility.label}
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={media.conference[0]} alt="Ridge Hotel conference hall" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-forest-950 py-24 text-ivory-100 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center text-gold-400">Flexible Layouts</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1]">
                A Configuration for Every Agenda
              </h2>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {layouts.map((layout, i) => (
              <Reveal key={layout.name} index={i}>
                <div className="rounded-2xl border border-ivory-100/15 p-5 text-center">
                  <p className="font-display text-lg">{layout.name}</p>
                  <p className="mt-1 text-xs text-ivory-100/60">{layout.capacity}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory-100 py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center text-gold-600">Corporate Packages</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3rem)] font-medium text-forest-950">
                Full-Day Delegate Packages
              </h2>
            </Reveal>
          </div>
          <div className="mx-auto mt-14 max-w-2xl rounded-[1.75rem] border border-stone-400/30 p-10">
            <ul className="space-y-4">
              {[
                "Hall hire with standard setup and AV equipment",
                "Morning & afternoon tea breaks with snacks",
                "Three-course plated or buffet lunch",
                "Complimentary Wi-Fi throughout the day",
                "Preferential group room rates for overnight delegates",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-forest-800/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                  {item}
                </li>
              ))}
            </ul>
            <MagneticButton href="/contact" className="mt-8 w-full bg-forest-900 text-ivory-100 hover:bg-forest-800">
              Request a Corporate Quote
            </MagneticButton>
          </div>
        </Container>
      </section>
    </>
  );
}
