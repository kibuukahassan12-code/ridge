import Image from "next/image";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { offers } from "@/data/offers";

export default function OffersSection() {
  return (
    <section className="bg-ivory-100 py-28 lg:py-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Kicker className="justify-center text-gold-600">Offers &amp; Packages</Kicker>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-forest-950">
              Curated Ways to Stay Longer
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {offers.slice(0, 2).map((offer, i) => (
            <Reveal key={offer.slug} index={i}>
              <div className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-stone-400/40 sm:grid-cols-2">
                <div className="relative aspect-[4/3] sm:aspect-auto">
                  <Image src={offer.image} alt={offer.name} fill sizes="(min-width:768px) 25vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gold-600">{offer.nights} Nights</p>
                    <h3 className="mt-2 font-display text-xl text-forest-950">{offer.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-forest-800/70">{offer.summary}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-forest-800/50 line-through">${offer.originalPrice}</span>{" "}
                      <span className="font-display text-2xl text-forest-950">${offer.price}</span>
                    </div>
                    <MagneticButton href={`/offers#${offer.slug}`} variant="ghost" className="!px-0 !py-0 text-forest-950">
                      View →
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
