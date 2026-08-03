import Image from "next/image";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import { media } from "@/data/media";

const features = [
  {
    title: "Meeting Room",
    copy: "A quiet, naturally lit room laid out for boardroom sessions, workshops and small conferences, steps from the gardens.",
    image: media.conference[3],
  },
  {
    title: "Bar & Terrace",
    copy: "The Ridge Bar spills onto a sweeping open terrace where sundowners meet highland air — the perfect spot to unwind as the Rwenzoris fade from gold to violet.",
    image: "/images/711A6741.JPG",
  },
  {
    title: "Garden-Facing Rooms",
    copy: "Two storeys of rooms and balconies wrapped around a palm-shaded lawn at the heart of the property.",
    image: media.gardenEntrance[5],
  },
];

export default function PoolGardenSection() {
  return (
    <section className="bg-ivory-100 py-28 lg:py-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Kicker className="justify-center text-gold-600">Gardens &amp; Leisure</Kicker>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-forest-950">
              Slow Mornings, Green Afternoons
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} index={i}>
              <div className="group overflow-hidden rounded-2xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <Image src={feature.image} alt={feature.title} fill sizes="(min-width:768px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-5 font-display text-xl text-forest-950">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-800/70">{feature.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
