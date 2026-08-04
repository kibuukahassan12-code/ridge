import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import { media } from "@/data/media";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Discover the story, mission and values behind Ridge Hotel — Western Uganda's landmark address for comfort and class, overlooking the Rwenzori Mountains.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Warmth, Uganda-Style",
    copy: "Genuine Ugandan hospitality — attentive without formality, warm without excess.",
  },
  {
    title: "Rooted in Place",
    copy: "Every detail, from the food on your plate to the crafts in your room, is sourced from Western Uganda.",
  },
  {
    title: "Understated Comfort",
    copy: "Considered, unfussy luxury — comfortable beds, hot water, reliable Wi-Fi, and a view worth waking up for.",
  },
  {
    title: "A Gateway, Not a Destination",
    copy: "We exist to make it effortless to explore Kibale Forest, the Crater Lakes, and the Rwenzori Mountains.",
  },
];

const timeline = [
  { year: "2001", event: "Construction begins on The Ridge, overlooking the Rwenzori foothills." },
  { year: "2026", event: "Ridge Hotel opens its doors with 24 rooms and a vision of comfort and class." },
  { year: "Late 2026", event: "The conference hall and gardens open, hosting Western Uganda's first large-scale weddings." },
  { year: "Today", event: "Ridge Hotel welcomes travellers, dignitaries and wedding parties from across the world." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="/images/about-hero-new.png"
        kicker="Our Story"
        title="Comfort and Class, Built for Adventure"
        copy="Ridge Hotel was raised on a hillside chosen for one reason: the view. Everything else was built around it."
      />

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <Kicker className="text-gold-600">How We Began</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1] text-forest-950">
                A Hotel Named for the Land It Stands On
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 text-lg leading-relaxed text-forest-800/80">
                Ridge Hotel takes its name from the very ground it occupies — a gentle rise in the Rwenzori foothills,
                positioned to catch the first light on the Rwenzori Mountains each morning. It was conceived as a
                newly built home for comfort in a region long defined by its natural riches, but underserved by
                hospitality that matched them.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-4 text-lg leading-relaxed text-forest-800/80">
                Since opening our doors, we have welcomed travellers tracking chimpanzees through Kibale Forest,
                trekkers preparing for the Rwenzori summit circuit, wedding parties filling our gardens with music,
                and business leaders filling our conference hall with ideas. Each guest leaves a little more attached
                to Western Uganda's natural wonders than when they arrived — and that has always been the point.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src="/images/about-hotel.jpg" alt="Ridge Hotel" fill className="object-cover" sizes="(min-width:1024px) 40vw, 90vw" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-forest-950 py-24 text-ivory-100 lg:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-[1.75rem] border border-ivory-100/15 p-10">
              <Kicker className="text-gold-400">Our Mission</Kicker>
              <p className="mt-6 font-display text-2xl leading-snug">
                To offer every guest a genuinely comfortable, elegant home in the Rwenzori foothills, and to open the door to
                the treasures of Western Uganda with warmth, ease and care.
              </p>
            </div>
          </Reveal>
          <Reveal index={1}>
            <div className="rounded-[1.75rem] border border-ivory-100/15 p-10">
              <Kicker className="text-gold-400">Our Vision</Kicker>
              <p className="mt-6 font-display text-2xl leading-snug">
                To be recognised as Western Uganda's definitive address for comfort, celebration and discovery —
                a hotel as memorable as the mountains it overlooks.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center text-gold-600">What We Stand For</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1] text-forest-950">
                Values That Shape Every Stay
              </h2>
            </Reveal>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} index={i}>
                <div className="h-full rounded-2xl border border-stone-400/40 p-7">
                  <span className="font-display text-3xl text-gold-500">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-lg text-forest-950">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest-800/70">{value.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest-950 py-24 text-ivory-100 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center text-gold-400">Our Journey</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1]">
                From Foundation to Landmark
              </h2>
            </Reveal>
          </div>
          <div className="mx-auto mt-16 max-w-3xl divide-y divide-ivory-100/10">
            {timeline.map((item, i) => (
              <Reveal key={item.year} index={i}>
                <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:gap-10">
                  <span className="w-24 shrink-0 font-display text-2xl text-gold-400">{item.year}</span>
                  <p className="text-ivory-100/80">{item.event}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory-100 py-20">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-forest-800/80">
              {site.address.line1}, {site.address.line2} — {site.address.postalNote}.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}