import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import PageHero from "@/components/ui/PageHero";
import { diningVenues, menuHighlights } from "@/data/dining";

export const metadata: Metadata = {
  title: "Food, Dining & Cuisine — Ridge Hotel",
  description:
    "Explore the culinary world of Ridge Hotel, Fort Portal — from artfully plated Ugandan bites and wood-fired specialities to handcrafted cocktails, garden dining and bespoke private experiences.",
  alternates: { canonical: "/food" },
};

const dishes = [
  {
    image: "/images/food/dish-1.jpg",
    alt: "Grilled tilapia with traditional Ugandan sides, plated at Ridge Hotel terrace",
    title: "Fresh from the Lakes",
    copy: "Crater lake tilapia, wood-grilled to perfection, served with sautéed nakati greens, steamed matoke, and a groundnut sauce that carries the warmth of Western Uganda. Our chefs source the fish daily from the rich volcanic lakes that dot the landscape around Fort Portal — a tradition of freshness that dates back generations.",
  },
  {
    image: "/images/food/dish-2.jpg",
    alt: "Wood-fired Ugandan feast at Ridge Hotel featuring grilled meats and seasonal vegetables",
    title: "The Grill & The Garden",
    copy: "From the embers of our wood-fired grill comes a celebration of Uganda's highland bounty. Succulent beef tenderloin, marinated in Rwenzori herbs and served with a pepper jus that lingers on the palate. Alongside, seasonal vegetables gathered from the crater lake farms — roasted, caramelised, and dressed with tea-estate olive oil.",
  },
  {
    image: "/images/food/dish-3.jpg",
    alt: "Curated Ugandan fusion bites — small plates designed for sharing at Ridge Hotel",
    title: "Bites That Tell a Story",
    copy: "Indulge in irresistible bites, bold flavours, and dishes made to impress. Each small plate is a canvas — a masterpiece of taste, texture, and colour. From spiced plantain fritters with a tangy tamarind dip to beef samosas kissed with coriander and chilli, our sharing platters are designed to bring people together over unforgettable flavours.",
  },
  {
    image: "/images/food/dish-4.jpg",
    alt: "Handcrafted cocktails and mocktails at The Ridge Bar, Fort Portal",
    title: "Sips at Sunset",
    copy: "As the sun dips behind the Rwenzori Mountains, The Ridge Bar comes alive. Our mixologists craft cocktails that capture the spirit of Uganda — think Rwenzori Sunrise with local gin and passion fruit, Crater Lake Mule with ginger and lime, and the Toro Old Fashioned made with Ugandan waragi. If you had to choose, which one would you taste first?",
  },
];

export default function FoodPage() {
  return (
    <>
      <PageHero
        image="/images/food/indulge-bites.jpg"
        kicker="Cuisine at Ridge"
        title="A Journey Through Uganda's Bold, Beautiful Flavours"
        copy="From the highlands to the plate — every dish is a celebration of Western Uganda's rich culinary heritage, crafted with passion and served with a view."
      />

      {/* Dishes grid — kept with images */}
      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center text-gold-600">The Menu</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1] text-forest-950">
                Each Dish, a Destination
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-4 text-lg leading-relaxed text-forest-800/75">
                Four seasons of flavour, inspired by the land around us. Every plate at Ridge Hotel is a
                journey through the tastes and traditions of Western Uganda.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 space-y-24 lg:space-y-32">
            {dishes.map((dish, i) => (
              <div
                key={dish.title}
                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
                    <Image
                      src={dish.image}
                      alt={dish.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 40vw, 90vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/20 via-transparent to-transparent" />
                  </div>
                </Reveal>
                <div className={i % 2 === 1 ? "lg:pl-12" : "lg:pr-12"}>
                  <Reveal>
                    <h3 className="font-display text-2xl font-medium text-forest-950 lg:text-3xl">
                      {dish.title}
                    </h3>
                  </Reveal>
                  <Reveal index={1}>
                    <p className="mt-5 text-base leading-relaxed text-forest-800/80 lg:text-lg">
                      {dish.copy}
                    </p>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Dining experiences — text only, summarized */}
      <section className="bg-ivory-200 py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center text-gold-600">Where to Dine</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1] text-forest-950">
                Three Spaces, One Table
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-4 text-lg leading-relaxed text-forest-800/75">
                Every corner of Ridge Hotel invites you to sit, savour and stay a while.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {diningVenues.map((venue, i) => (
              <Reveal key={venue.name} index={i}>
                <div className="h-full rounded-2xl border border-stone-400/30 bg-ivory-100 p-8">
                  <h3 className="font-display text-xl font-medium text-forest-950">{venue.name}</h3>
                  <p className="mt-1 text-sm italic text-gold-600">{venue.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-forest-800/75">{venue.description}</p>
                  <p className="mt-5 text-xs uppercase tracking-widest text-forest-800/50">{venue.hours}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Menu highlights — text only */}
      <section className="bg-forest-950 py-24 text-ivory-100 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Kicker className="justify-center text-gold-400">Menu Highlights</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1]">
                A Taste of Toro, Plated Beautifully
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {menuHighlights.map((section, i) => (
              <Reveal key={section.category} index={i}>
                <h3 className="kicker text-gold-400">{section.category}</h3>
                <ul className="mt-5 space-y-3 border-t border-ivory-100/10 pt-5">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-ivory-100/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-xs text-ivory-100/50">
            Menus rotate seasonally based on local availability. Vegetarian, vegan and dietary-specific options
            available on request.
          </p>
        </Container>
      </section>

      {/* Private dining CTA */}
      <section className="relative overflow-hidden bg-ivory-100 py-24 text-forest-950 lg:py-32">
        <Container className="relative text-center">
          <Reveal>
            <Kicker className="justify-center text-gold-600">Private Garden Dining</Kicker>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.1]">
              Book a Table Under the Stars
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-forest-800/80">
              Celebrating a proposal, anniversary or milestone? Our team will lay a private, lantern-lit table in
              the gardens and build a bespoke set menu with our executive chef — just for you.
            </p>
          </Reveal>
          <Reveal index={3} className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/contact" className="bg-forest-900 text-ivory-100 hover:bg-forest-800">
              Enquire About Private Dining
            </MagneticButton>
            <MagneticButton href="/booking" variant="ghost" className="!px-0 !py-0 text-forest-950">
              Book Your Stay →
            </MagneticButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}