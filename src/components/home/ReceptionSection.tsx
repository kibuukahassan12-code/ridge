import Image from "next/image";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import { BellRing, Coffee, MapPin } from "lucide-react";

const highlights = [
  {
    icon: Coffee,
    title: "Arrival ritual",
    copy: "You are welcomed with a warm drink while your room is prepared — the first taste of the highland hospitality that follows you through your entire stay.",
  },
  {
    icon: BellRing,
    title: "At your service",
    copy: "Our front desk team knows the mountain trails, crater lakes and torch-lit tea estates around Fort Portal — ask them anything, day or night.",
  },
  {
    icon: MapPin,
    title: "2.5km from the palace",
    copy: "From the reception step you are moments from the Toro Kingdom Palace and Fort Portal town, yet the garden silence of the ridge begins at the door.",
  },
];

export default function ReceptionSection() {
  return (
    <section className="bg-ivory-100 py-16 lg:py-20">
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
                src="/images/ridge-reception.jpg"
                alt="The welcoming reception area at Ridge Hotel, where guests are greeted with highland hospitality"
                fill
                quality={100}
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/45 to-transparent" />
              <div className="pointer-events-none absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-5 text-ivory-100">
                <p className="font-display text-2xl italic">
                  Your first view of the ridge
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-ivory-100/70">
                  The Reception · Ridge Hotel
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Kicker className="text-gold-600">The Reception</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-forest-950">
                Where Your Highland Welcome Begins
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-800/80">
                Step off the ridge road and into a reception that sets the tone for the whole stay — warm timber, soft light, and a genuine Toro welcome waiting behind the desk. It is the calm between the long drive and the mountain views, and it is often where guests first realise they have arrived somewhere special.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-forest-800/80">
                Check-in is unhurried, the keys come with a hand-drawn map of the gardens, and the "Comfort and Class" promise of Ridge Hotel begins at the front door — before the snow-capped Rwenzoris even come into view from your balcony.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
              {highlights.map((item, i) => (
                <Reveal key={item.title} index={i + 4}>
                  <div className="border-t border-forest-800/15 pt-6">
                    <item.icon className="h-5 w-5 text-gold-600" aria-hidden />
                    <h3 className="mt-4 font-display text-lg text-forest-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-forest-800/70">{item.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}