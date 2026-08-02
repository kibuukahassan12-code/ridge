import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export default function BookingCTA() {
  return (
    <section className="relative isolate overflow-hidden py-32 lg:py-40">
      <Image src={media.sunset[1]} alt="Sunset over the Rwenzori Mountains" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-forest-950/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/60" />
      <Container className="relative text-center text-ivory-100">
        <Reveal>
          <p className="kicker justify-center text-gold-300">Your Ugandan Adventure Starts Here</p>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[1.05]">
            Begin Your Journey Through the Pearl of Africa
          </h2>
        </Reveal>
        <Reveal index={2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-ivory-100/80">
            Reserve directly with Ridge Hotel for the best available rate, complimentary Wi-Fi, and a team that knows Uganda&apos;s Western highlands by heart — ready to guide you to every wonder this country holds.
          </p>
        </Reveal>
        <Reveal index={3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href="/booking" className="bg-gold-500 text-forest-950 hover:bg-gold-400">
            Book Your Stay
          </MagneticButton>
          <MagneticButton href={site.contact.whatsapp} variant="outline" className="border-ivory-100/40" external>
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
          </MagneticButton>
        </Reveal>
      </Container>
    </section>
  );
}
