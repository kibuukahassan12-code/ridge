import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { media } from "@/data/media";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Weddings",
  description:
    "Host your wedding at Ridge Hotel — landscaped gardens overlooking the Rwenzori Mountains, in-house catering and full event coordination.",
  alternates: { canonical: "/weddings" },
};

const inclusions = [
  "Exclusive use of the landscaped garden lawns",
  "In-house catering with customisable menus",
  "Tables, chairs, linen and standard décor",
  "Dedicated event coordinator on the day",
  "Preferential accommodation rates for wedding parties",
  "Access to the bar terrace for receptions",
  "Ample on-site parking with security",
  "Backup indoor venue in the conference hall",
];

const gallery = [media.weddings[0], media.weddings[1], media.weddings[2], media.weddings[3]];

export default function WeddingsPage() {
  return (
    <>
      <PageHero
        image={media.weddings[2]}
        kicker="Weddings & Celebrations"
        title="Say “I Do” Beneath the Rwenzoris"
        copy="Ridge Hotel's gardens have hosted celebrations from intimate ceremonies to receptions of 200 guests and more."
      />

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <Kicker className="text-gold-600">Your Day, Our Garden</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1] text-forest-950">
                A Setting Written by Nature
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 text-lg leading-relaxed text-forest-800/80">
                Our sweeping lawns, bordered by flowering trees and framed by the Rwenzori foothills, were made for
                celebration. Whether you envision an intimate garden ceremony for close family or a full reception
                for two hundred guests beneath open skies, our events team will shape every detail around your
                vision.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-4 text-lg leading-relaxed text-forest-800/80">
                Should the mountain skies turn, our conference hall stands ready as an elegant, fully covered
                alternative — so your celebration never depends on the weather.
              </p>
            </Reveal>
            <Reveal index={4} className="mt-8">
              <MagneticButton
                href={`${site.contact.whatsapp}?text=${encodeURIComponent("Hi Ridge Hotel! I'd like to enquire about hosting a wedding at your venue.")}`}
                external
                className="bg-forest-900 text-ivory-100 hover:bg-forest-800"
              >
                Enquire About Your Wedding
              </MagneticButton>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image src={media.weddings[0]} alt="Ridge Hotel wedding reception" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-forest-950 py-24 text-ivory-100 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center text-gold-400">What&apos;s Included</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1]">
                Every Detail, Considered
              </h2>
            </Reveal>
          </div>
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
            {inclusions.map((item, i) => (
              <Reveal key={item} index={i}>
                <div className="flex items-start gap-3 text-sm text-ivory-100/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  {item}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center text-gold-600">Real Celebrations</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3rem)] font-medium text-forest-950">
                Moments in the Garden
              </h2>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {gallery.map((img, i) => (
              <Reveal key={img} index={i}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image src={img} alt="Ridge Hotel wedding" fill sizes="(min-width:1024px) 22vw, 45vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest-950 py-20 text-center text-ivory-100">
        <Container>
          <Kicker className="justify-center text-gold-400">Ready to Begin Planning?</Kicker>
          <h2 className="mx-auto mt-5 max-w-xl text-balance font-display text-3xl">
            Speak With Our Events Team
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-ivory-100/70">
            Call or WhatsApp {site.contact.phoneDisplay} or {site.contact.phoneDisplay2}, or email {site.contact.email}
          </p>
          <div className="mt-8">
            <MagneticButton
              href={`${site.contact.whatsapp}?text=${encodeURIComponent("Hi Ridge Hotel! I'd like to start planning a wedding at your venue.")}`}
              external
              className="bg-gold-500 text-forest-950 hover:bg-gold-400"
            >
              Start Planning
            </MagneticButton>
          </div>
        </Container>
      </section>
    </>
  );
}
