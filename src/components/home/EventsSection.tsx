import Image from "next/image";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { media } from "@/data/media";
import { site } from "@/data/site";

export default function EventsSection() {
  return (
    <section className="bg-forest-950 py-16 text-ivory-100 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Kicker className="justify-center text-gold-400">Weddings &amp; Conferences</Kicker>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08]">
              Gardens for Celebration. A Hall for Ambition.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal index={2}>
            <EventCard
              image="/images/wedding-rwenzori.png"
              tag="Weddings & Celebrations"
              title="Say “I do” beneath the Rwenzoris"
              copy="Ridge Hotel is ideal for honeymooners and wedding receptions in our vast gardens that can seat over 3,000 guests. We host Kuhingira (give-aways) and other big functions with in-house catering, décor coordination and accommodation blocks for the whole wedding party."
              href="/weddings"
              cta="Plan Your Wedding"
            />
          </Reveal>
          <Reveal index={3}>
            <EventCard
              image="/images/711A6453.JPG"
              tag="Conferences & Meetings"
              title={`Seat ${site.conferenceCapacity} delegates in comfort`}
              copy="Host your next meeting with the breathtaking Rwenzori ranges as your backdrop. Our dedicated conference hall pairs flexible theatre, classroom and boardroom layouts with full-service catering — so every session is framed by the snow-capped peaks of the Mountains of the Moon."
              href="/conference"
              cta="Plan Your Event"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function EventCard({
  image,
  tag,
  title,
  copy,
  href,
  cta,
}: {
  image: string;
  tag: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="group overflow-hidden rounded-[1.75rem] bg-forest-900">
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/11] overflow-hidden">
        <Image src={image} alt={tag} fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-8">
        <p className="kicker text-gold-300">{tag}</p>
        <h3 className="mt-3 max-w-md font-display text-2xl leading-snug sm:text-3xl text-ivory-100">{title}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory-100/75">{copy}</p>
        <MagneticButton href={href} variant="outline" className="mt-6 border-ivory-100/40">
          {cta}
        </MagneticButton>
      </div>
    </div>
  );
}
