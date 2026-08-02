import Image from "next/image";
import { Armchair, Bird, Eye, Sun } from "lucide-react";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import { media } from "@/data/media";

const highlights = [
  {
    icon: Eye,
    title: "Crowns at eye level",
    copy: "The upper terrace sits above the lawn, so you look into the canopy rather than up at it — a view of palm crowns most gardens never offer.",
  },
  {
    icon: Armchair,
    title: "The iron deck",
    copy: "A wrought-iron viewing deck stands among the trunks at the centre of the lawn, reached by a short flight of stone steps. It holds shade all afternoon.",
  },
  {
    icon: Sun,
    title: "The shadow hour",
    copy: "Late in the day the fronds throw long striped shadows across the grass, and the whole lawn turns the colour of the light behind the Rwenzoris.",
  },
  {
    icon: Bird,
    title: "Dawn in the fronds",
    copy: "Fruiting palms draw birds into the canopy at first light. Take coffee onto the terrace early and the trees do the rest.",
  },
];

export default function PalmGardenSection() {
  return (
    <section className="bg-ivory-100 py-28 lg:py-36">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              show: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
              <Image
                src={media.palmLawn[0]}
                alt="Palm trunks rising around the wrought-iron viewing deck on the garden lawn at Ridge Hotel"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/45 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-5 text-ivory-100">
                <p className="font-display text-2xl italic">
                  Looking down into the palm lawn
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-ivory-100/70">
                  From the upper terrace · Ridge Hotel
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Kicker className="text-gold-600">Under the Canopy</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-forest-950">
                A Garden Built From Palms
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-800/80">
                Our gardens are, first and last, a palm collection. Slender grey columns climb high above the lawn,
                feather fronds cross overhead in a loose canopy, and low fan-leaved palms hold the ground beneath
                them — featuring over 36 different species of exotic and natural palms, gathered from across the tropics and grown side by side on one Fort Portal
                hillside.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-forest-800/80">
                No two are alike up close. Some trunks rise smooth and ringed with the scars of shed leaves, others
                stay shaggy with old fibre, and each records its own growth in its bark. Guests come for the
                mountains and end up spending the afternoon here instead.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => (
            <Reveal key={item.title} index={i}>
              <div className="border-t border-forest-800/15 pt-6">
                <item.icon className="h-5 w-5 text-gold-600" aria-hidden />
                <h3 className="mt-4 font-display text-xl text-forest-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-800/70">{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
