import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Maximize, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { rooms } from "@/data/rooms";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Explore Ridge Hotel's 24 rooms and suites in Uganda's Western highlands — private balconies with Rwenzori Mountain views, the natural Uganda-DRC border, and rates that reflect the very best of Ugandan hospitality.",
  alternates: { canonical: "/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        image="/images/rooms-hero.jpg"
        kicker="Rooms & Suites"
        title="Twenty-Four Rooms, Each With a View"
        copy="Set at 1,523 metres in Uganda's highlands, every room opens onto a private balcony with an uninterrupted view of the Rwenzori Mountains — Uganda's highest and most magnificent natural wonder."
      />

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-10">
            {rooms.map((room, i) => (
              <Reveal key={room.slug} index={i}>
                <article className="grid grid-cols-1 gap-8 overflow-hidden rounded-[1.75rem] border border-stone-400/30 lg:grid-cols-2">
                  <div className={`relative aspect-[4/3] lg:aspect-auto ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Image src={room.images[0]} alt={room.name} fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <p className="text-xs uppercase tracking-widest text-gold-600">From ${room.price} / night</p>
                    <h2 className="mt-3 font-display text-3xl text-forest-950">{room.name}</h2>
                    <p className="mt-2 text-sm italic text-forest-800/60">{room.tagline}</p>
                    <p className="mt-5 text-base leading-relaxed text-forest-800/80">{room.description}</p>

                    <div className="mt-6 flex flex-wrap gap-6 text-sm text-forest-800/70">
                      <span className="flex items-center gap-2"><Maximize className="h-4 w-4 text-gold-600" /> {room.size}</span>
                      <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-gold-600" /> {room.bed}</span>
                      <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold-600" /> {room.occupancy}</span>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <MagneticButton href={`/rooms/${room.slug}`} className="bg-forest-900 text-ivory-100 hover:bg-forest-800">
                        View Room <ArrowUpRight className="h-4 w-4" />
                      </MagneticButton>
                      <MagneticButton href={`/booking?room=${room.slug}`} variant="ghost" className="!px-0 !py-0 text-forest-950">
                        Book This Room →
                      </MagneticButton>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest-950 py-20 text-center text-ivory-100">
        <Container>
          <Kicker className="justify-center text-gold-400">Not Sure Which Room?</Kicker>
          <h2 className="mx-auto mt-5 max-w-xl text-balance font-display text-3xl">
            Speak With Our Reservations Team
          </h2>
          <div className="mt-8">
            <Link href="/contact" className="text-sm font-semibold uppercase tracking-widest text-gold-400 hover:text-gold-300">
              Contact Us →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}