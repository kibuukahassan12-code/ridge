import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { experiences, getExperienceBySlug } from "@/data/experiences";

export function generateStaticParams() {
  return experiences.map((exp) => ({ slug: exp.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};
  return {
    title: exp.name,
    description: exp.description,
    alternates: { canonical: `/experiences/${exp.slug}` },
    openGraph: { images: [{ url: exp.image }] },
  };
}

export default async function ExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) notFound();

  return (
    <>
      <section className="relative isolate flex h-[72vh] min-h-[520px] items-end overflow-hidden">
        <Image src={exp.image} alt={exp.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-forest-950/50" />
        <Container className="relative pb-16 text-ivory-100">
          <Link href="/experiences" className="text-xs uppercase tracking-widest text-gold-300 hover:text-gold-200">
            ← Discover Western Uganda
          </Link>
          <p className="kicker mt-4 text-gold-300">{exp.region}</p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.05]">
            {exp.name}
          </h1>
          <p className="mt-3 max-w-lg text-lg italic text-ivory-100/85">{exp.tagline}</p>
        </Container>
      </section>

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <Kicker className="text-gold-600">About This Experience</Kicker>
            </Reveal>
            {exp.longDescription.map((p, i) => (
              <Reveal key={i} index={i + 1}>
                <p className="mt-5 text-lg leading-relaxed text-forest-800/80">{p}</p>
              </Reveal>
            ))}

            <Reveal index={exp.longDescription.length + 1}>
              <h2 className="mt-14 font-display text-2xl text-forest-950">Suggested Itinerary</h2>
            </Reveal>
            <div className="mt-6 space-y-4 border-l-2 border-gold-400/40 pl-6">
              {exp.itinerary.map((step, i) => (
                <Reveal key={step.time} index={i}>
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-gold-500" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">{step.time}</p>
                    <p className="mt-1 text-sm text-forest-800/80">{step.activity}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <h2 className="mt-14 font-display text-2xl text-forest-950">Gallery</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {exp.gallery.map((img, i) => (
                <Reveal key={img} index={i}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={img} alt={`${exp.name} gallery ${i + 1}`} fill sizes="(min-width:640px) 45vw, 90vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <div className="sticky top-28 rounded-[1.75rem] border border-stone-400/40 bg-white/60 p-8">
              <div className="space-y-5">
                <InfoRow icon={<MapPin className="h-4 w-4 text-gold-600" />} label="Distance from Ridge Hotel" value={exp.distance} />
                <InfoRow icon={<Clock className="h-4 w-4 text-gold-600" />} label="Recommended Duration" value={exp.duration} />
                <InfoRow icon={<Users className="h-4 w-4 text-gold-600" />} label="Best For" value={exp.bestFor.join(", ")} />
              </div>
              <MagneticButton href="/contact" className="mt-8 w-full bg-forest-900 text-ivory-100 hover:bg-forest-800">
                Arrange This Experience
              </MagneticButton>
              <MagneticButton href="/booking" variant="ghost" className="mt-3 w-full !px-0 !py-0 text-center text-forest-950">
                Combine With a Stay →
              </MagneticButton>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-forest-950 py-20 text-ivory-100">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <Kicker className="justify-center text-gold-400">More to Discover</Kicker>
            <div className="flex flex-wrap justify-center gap-3">
              {experiences
                .filter((e) => e.slug !== exp.slug)
                .slice(0, 5)
                .map((e) => (
                  <Link
                    key={e.slug}
                    href={`/experiences/${e.slug}`}
                    className="rounded-full border border-ivory-100/25 px-5 py-2.5 text-xs uppercase tracking-widest hover:border-gold-400 hover:text-gold-400"
                  >
                    {e.name}
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <p className="text-xs uppercase tracking-wider text-forest-800/50">{label}</p>
        <p className="mt-1 text-sm font-semibold text-forest-950">{value}</p>
      </div>
    </div>
  );
}
