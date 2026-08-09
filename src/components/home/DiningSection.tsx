import Image from "next/image";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";

export default function DiningSection() {
  return (
    <section className="relative overflow-hidden bg-ivory-100 py-16 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src="/images/ridge-terrace-restaurant.jpg" alt="Ridge Terrace Restaurant" fill className="object-cover" sizes="(min-width:1024px) 22vw, 45vw" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-2xl">
              <Image src="/images/ridge-bar-garden-terrace.jpg" alt="Garden terrace beside The Ridge Bar" fill className="object-cover" sizes="(min-width:1024px) 22vw, 45vw" />
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Kicker className="text-gold-600">Dining & Bar</Kicker>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-forest-950">
              The Taste of Uganda, Served With Care
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-800/80">
              Our terrace restaurant looks over the gardens toward the Rwenzori Mountains, plating the very best of Ugandan cuisine — luwombo, grilled tilapia from Uganda{"'"}s lakes, Toro-style goat stew — alongside international favourites. Every dish is crafted using fresh produce gathered from the highland farms and forest-edge villages of Western Uganda.
            </p>
          </Reveal>
          <Reveal index={3}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-forest-800/80">
              Next door, The Ridge Bar spills onto a generous outdoor terrace — the perfect spot for sundowners as Uganda{"'"}s Rwenzori Mountains fade from gold to violet on the horizon.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}