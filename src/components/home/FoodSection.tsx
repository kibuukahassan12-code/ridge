import Image from "next/image";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function FoodSection() {
  return (
    <section className="relative overflow-hidden bg-ivory-100 py-28 lg:py-36">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <Kicker className="text-gold-600">Cuisine at Ridge</Kicker>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-forest-950">
              Bold Flavours, Beautifully Plated
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-800/80">
              Every plate at Ridge Hotel tells a story of Western Uganda's rich culinary heritage. Our chefs
              transform the finest locally sourced ingredients — from highland-grown vegetables to forest-edge herbs
              and fresh-caught tilapia from the crater lakes — into dishes that surprise and delight.
            </p>
          </Reveal>
          <Reveal index={3}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-forest-800/80">
              Whether you're savouring a slow-braised goat stew on the terrace, sharing a platter of
              artfully crafted bites with friends, or sipping a Rwenzori-inspired cocktail as the sun sets over
              the mountains — every meal here is an experience to remember.
            </p>
          </Reveal>
          <Reveal index={4} className="mt-10 flex flex-wrap gap-4">
            <MagneticButton href="/food" className="bg-forest-900 text-ivory-100 hover:bg-forest-800">
              Explore Our Menu
            </MagneticButton>
            <MagneticButton href="/food" variant="ghost" className="!px-0 !py-0 text-forest-950">
              Dining Experiences →
            </MagneticButton>
          </Reveal>
        </div>

        <Reveal className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/food/indulge-bites.jpg"
                alt="Artfully plated bites featuring bold Ugandan flavours at Ridge Hotel"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 22vw, 45vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/30 via-transparent to-transparent" />
            </div>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/food/cocktails.jpg"
                alt="Signature cocktails prepared at The Ridge Bar with Rwenzori mountain views"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 22vw, 45vw"
              />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/30 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}