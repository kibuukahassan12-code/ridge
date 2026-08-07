import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { rooms } from "@/data/rooms";

export default function RoomsShowcase() {
  return (
    <section className="relative bg-forest-950 py-28 text-ivory-100 lg:py-36">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <Kicker className="text-gold-400">Rooms & Suites</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 max-w-2xl text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08]">
                Twenty-One Rooms. One Unforgettable View.
              </h2>
            </Reveal>
            <Reveal index={1.5}>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ivory-100/80">
                Ridge Hotel is the only place where you can watch the natural border of two nations from the comfort of your room. For hundreds of kilometres, one side is Uganda and the other is the DRC. Here, every balcony frames an uninterrupted view of the snow-capped Margherita Peak — the highest summit of the Rwenzori mountain ranges.
              </p>
            </Reveal>
          </div>
          <Reveal index={2}>
            <MagneticButton href="/rooms" variant="outline" className="border-ivory-100/40">
              View All Rooms <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {rooms.map((room, i) => (
            <Reveal key={room.slug} index={i}>
              <Link href={`/rooms/${room.slug}`} className="group block">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={room.images[0]}
                    alt={room.name}
                    fill
                    sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs uppercase tracking-widest text-gold-300">From ${room.price} / night</p>
                    <h3 className="mt-1 font-display text-xl">{room.name}</h3>
                  </div>
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ivory-100/15 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}