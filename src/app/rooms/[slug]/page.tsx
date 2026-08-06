import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, BedDouble, Check, Maximize, Mountain, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { getRoomBySlug, rooms } from "@/data/rooms";
import { experiences } from "@/data/experiences";
import { site } from "@/data/site";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return {};
  return {
    title: room.name,
    description: room.description,
    alternates: { canonical: `/rooms/${room.slug}` },
    openGraph: { images: [{ url: room.images[0] }] },
  };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  const nearby = experiences.slice(0, 3);

  return (
    <>
      <section className="relative isolate flex h-[70vh] min-h-[520px] items-end overflow-hidden">
        <Image src={room.images[0]} alt={room.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-forest-950/50" />
        <Container className="relative pb-16 text-ivory-100">
          <Link href="/rooms" className="text-xs uppercase tracking-widest text-gold-300 hover:text-gold-200">
            ← All Rooms
          </Link>
          <p className="kicker mt-4 text-gold-300">From ${room.price} / night</p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.05]">
            {room.name}
          </h1>
          <p className="mt-3 max-w-lg text-lg italic text-ivory-100/85">{room.tagline}</p>
        </Container>
      </section>

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <Kicker className="text-gold-600">Room Details</Kicker>
            </Reveal>
            {room.longDescription.map((paragraph, i) => (
              <Reveal key={i} index={i + 1}>
                <p className="mt-5 text-lg leading-relaxed text-forest-800/80">{paragraph}</p>
              </Reveal>
            ))}

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Reveal>
                <FeatureStat icon={<Maximize className="h-5 w-5 text-gold-600" />} label="Room Size" value={room.size} />
              </Reveal>
              <Reveal index={1}>
                <FeatureStat icon={<BedDouble className="h-5 w-5 text-gold-600" />} label="Bed Configuration" value={room.bed} />
              </Reveal>
              <Reveal index={2}>
                <FeatureStat icon={<Users className="h-5 w-5 text-gold-600" />} label="Occupancy" value={room.occupancy} />
              </Reveal>
            </div>

            <Reveal className="mt-10 flex items-center gap-3 rounded-2xl bg-forest-950 p-6 text-ivory-100" index={3}>
              <Mountain className="h-6 w-6 text-gold-400" />
              <p className="text-sm">
                <span className="font-semibold text-gold-300">View:</span> {room.view}
              </p>
            </Reveal>

            <Reveal index={4}>
              <h2 className="mt-14 font-display text-2xl text-forest-950">Room Amenities</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {room.amenities.map((amenity, i) => (
                <Reveal key={amenity} index={i}>
                  <div className="flex items-start gap-3 text-sm text-forest-800/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    {amenity}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal index={5}>
              <h2 className="mt-14 font-display text-2xl text-forest-950">Gallery</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {room.images.map((img, i) => (
                <Reveal key={img} index={i}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image src={img} alt={`${room.name} view ${i + 1}`} fill sizes="(min-width:640px) 30vw, 90vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <div className="sticky top-28 rounded-[1.75rem] border border-stone-400/40 bg-white/60 p-8">
              <p className="text-xs uppercase tracking-widest text-forest-800/60">Rate from</p>
              <p className="mt-2 font-display text-4xl text-forest-950">
                ${room.price} <span className="text-base font-sans text-forest-800/60">/ night</span>
              </p>
              <p className="mt-2 text-xs text-forest-800/50">Inclusive of breakfast and Wi-Fi</p>
              <MagneticButton href={`/booking?room=${room.slug}`} className="mt-6 w-full bg-gold-500 text-forest-950 hover:bg-gold-400">
                Reserve This Room
              </MagneticButton>
              <p className="mt-4 text-center text-xs text-forest-800/50">
                Or call or WhatsApp us at{" "}
                <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="text-gold-600 underline">
                  {site.contact.phoneDisplay}
                </a>{" "}
                or{" "}
                <a href={`tel:${site.contact.phone2.replace(/\s/g, "")}`} className="text-gold-600 underline">
                  {site.contact.phoneDisplay2}
                </a>
              </p>

              <div className="mt-8 border-t border-stone-400/40 pt-6">
                <p className="text-xs uppercase tracking-widest text-forest-800/60">Nearby Experiences</p>
                <ul className="mt-4 space-y-3">
                  {nearby.map((exp) => (
                    <li key={exp.slug}>
                      <Link href={`/experiences/${exp.slug}`} className="group flex items-center justify-between text-sm text-forest-800/80 hover:text-forest-950">
                        {exp.name}
                        <ArrowUpRight className="h-3.5 w-3.5 text-gold-600 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-forest-950 py-20 text-ivory-100">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <Kicker className="justify-center text-gold-400">Explore More Rooms</Kicker>
            <div className="flex flex-wrap justify-center gap-4">
              {rooms
                .filter((r) => r.slug !== room.slug)
                .map((r) => (
                  <Link
                    key={r.slug}
                    href={`/rooms/${r.slug}`}
                    className="rounded-full border border-ivory-100/25 px-5 py-2.5 text-xs uppercase tracking-widest hover:border-gold-400 hover:text-gold-400"
                  >
                    {r.name}
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function FeatureStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-stone-400/40 p-5">
      {icon}
      <div>
        <p className="text-xs uppercase tracking-wider text-forest-800/50">{label}</p>
        <p className="mt-1 text-sm font-semibold text-forest-950">{value}</p>
      </div>
    </div>
  );
}