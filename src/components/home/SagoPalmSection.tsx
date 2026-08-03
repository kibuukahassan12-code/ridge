import Image from "next/image";
import { Atom, Bug, Clock, Hourglass, MapPin, ShieldAlert, Trees } from "lucide-react";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import { media } from "@/data/media";

const facts = [
  {
    icon: Trees,
    title: "Not a palm at all",
    copy: "Despite the name, it is a cycad — closer kin to pine trees than to the royal palms standing behind it. The likeness is pure coincidence of shape.",
  },
  {
    icon: Hourglass,
    title: "Older than every flower",
    copy: "Cycads appeared more than 250 million years ago and spread across the age of the dinosaurs, long before the first flowering plant existed.",
  },
  {
    icon: Clock,
    title: "It grows on geological time",
    copy: "A sago unfurls a single flush of new leaves each year, and sometimes skips a year altogether. A knee-high plant may already be decades old.",
  },
  {
    icon: Atom,
    title: "It makes its own fertiliser",
    copy: "Specialised coralloid roots near the surface house nitrogen-fixing bacteria — a partnership almost unique among the world's seed plants.",
  },
  {
    icon: Bug,
    title: "Beetles, not the breeze",
    copy: "Male and female plants grow separately, and weevils ferry pollen between their cones — one of the oldest insect partnerships known to botany.",
  },
  {
    icon: MapPin,
    title: "A long way from home",
    copy: "Its homeland is the subtropical islands of southern Japan. The name is borrowed too: true sago starch comes from an unrelated palm entirely.",
  },
];

export default function SagoPalmSection() {
  return (
    <section className="bg-ivory-200 py-28 lg:py-36">
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
                src="/images/711A6758.JPG"
                alt="Sago palm cycad growing beside the stone terrace wall in the gardens of Ridge Hotel"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/45 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-5 text-ivory-100">
                <p className="font-display text-2xl italic">Cycas revoluta</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-ivory-100/70">
                  Garden terrace · Ridge Hotel
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Kicker className="text-gold-600">A Living Fossil in Our Gardens</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-forest-950">
                The Sago Palm
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-800/80">
                Set against the stone terrace wall on our garden lawn, beneath the ring of royal palms, grows the
                oldest-looking resident at Ridge Hotel — a king sago, its stiff fronds spiralling out from a single
                woody crown in perfect symmetry.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-forest-800/80">
                Most guests walk straight past it on the way to the lawns. Those who stop are looking at a survivor
                from a lineage that was already ancient when dinosaurs roamed — and the closest thing to a time
                machine anywhere on the property.
              </p>
            </Reveal>
            <Reveal index={4}>
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-gold-500/30 bg-ivory-100 p-5">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                <p className="text-sm leading-relaxed text-forest-800/80">
                  <span className="font-medium text-forest-950">Look closely, but don&apos;t taste.</span> Every part
                  of the plant is poisonous, the seeds most of all — so we ask guests to keep curious children and
                  pets at a respectful distance.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact, i) => (
            <Reveal key={fact.title} index={i}>
              <div className="border-t border-forest-800/15 pt-6">
                <fact.icon className="h-5 w-5 text-gold-600" aria-hidden />
                <h3 className="mt-4 font-display text-xl text-forest-950">{fact.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-800/70">{fact.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
