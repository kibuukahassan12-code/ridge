import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { experiences } from "@/data/experiences";

export default function DiscoverSection() {
  const featured = experiences.slice(0, 6);
  return (
    <section className="relative bg-forest-950 py-28 text-ivory-100 lg:py-36">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <Kicker className="text-gold-400">Discover Uganda</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 max-w-2xl text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08]">
                Uganda&apos;s Wonders, All Within Reach
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory-100/75">
                Situated in a posh area of Fort Portal, Ridge Hotel is within a short drive of every major tourist attraction in Western Uganda — the Rwenzori Mountains, the chimpanzee natural forest habitat of Kibale, over 35 crater lakes, the Sempaya Hot Springs, natural tea estates, and the Amabere Ga Nyina Mwiru caves with their legendary stalagmites and stalactites. Mountain climbing, bird watching including the rare Crested Cranes — which pair for life, remaining single forever if their partner dies — are all within easy reach. Our concierge arranges every permit, guide, and transfer.
              </p>
            </Reveal>
          </div>
          <Reveal index={3}>
            <MagneticButton href="/experiences" variant="outline" className="border-ivory-100/40">
              All Experiences <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((exp, i) => (
            <Reveal key={exp.slug} index={i}>
              <Link href={`/experiences/${exp.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={exp.image}
                    alt={exp.name}
                    fill
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[11px] uppercase tracking-widest text-gold-300">{exp.distance}</p>
                    <h3 className="mt-2 font-display text-xl leading-tight">{exp.name}</h3>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
