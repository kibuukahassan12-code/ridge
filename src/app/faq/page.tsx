import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { faqCategories } from "@/data/faqs";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about booking, staying, and hosting events at Ridge Hotel, Fort Portal.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero small image={media.gardenEntrance[3]} kicker="FAQ" title="Frequently Asked Questions" />
      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="mx-auto max-w-3xl">
          {faqCategories.map((cat, i) => (
            <Reveal key={cat.category} index={i} className="mb-14 last:mb-0">
              <Kicker className="text-gold-600">{cat.category}</Kicker>
              <div className="mt-6">
                <FaqAccordion items={cat.items} />
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
