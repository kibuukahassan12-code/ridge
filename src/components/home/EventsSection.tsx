import Image from "next/image";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { media } from "@/data/media";
import { site } from "@/data/site";

export default function EventsSection() {
  return (
    <section className="bg-forest-950 py-28 text-ivory-100 lg:py-36">
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
              image={media.weddings[2]}
              tag="Weddings & Celebrations"
              title="Say “I do” beneath the Rwenzoris"
              copy="Our landscaped gardens have hosted celebrations from intimate ceremonies to 200-guest receptions, with in-house catering, décor coordination and accommodation blocks for the whole wedding party."
              href="/weddings"
              cta="Plan Your Wedding"
            />
          </Reveal>
          <Reveal index={3}>
            <EventCard
              image={media.conference[1]}
              tag="Conferences & Meetings"
              title={`Seat ${site.conferenceCapacity} delegates in comfort`}
              copy="A dedicated conference hall with flexible theatre, classroom and boardroom layouts, standard AV equipment and full-service catering — set against the backdrop of the Rwenzori Mountains."
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
    <div className="group relative overflow-hidden rounded-[1.75rem]">
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/11]">
        <Image src={image} alt={tag} fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/10" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-8">
        <p className="kicker text-gold-300">{tag}</p>
        <h3 className="mt-3 max-w-md font-display text-2xl leading-snug sm:text-3xl">{title}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory-100/75">{copy}</p>
        <MagneticButton href={href} variant="outline" className="mt-6 border-ivory-100/40">
          {cta}
        </MagneticButton>
      </div>
    </div>
  );
}
