import type { Metadata } from "next";
import { Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import { media } from "@/data/media";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Ridge Hotel team in Fort Portal — current opportunities in hospitality, culinary arts and guest services.",
  alternates: { canonical: "/careers" },
};

const values = [
  "Genuine Ugandan hospitality, every day",
  "Training and growth within the hotel",
  "A team that feels like family",
  "Fair, timely pay and a respectful workplace",
];

export default function CareersPage() {
  return (
    <>
      <PageHero small image={media.lobby[2]} kicker="Careers" title="Build Your Career at Ridge Hotel" />

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <Kicker className="text-gold-600">Join Our Team</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 font-display text-3xl text-forest-950">Hospitality Careers in Fort Portal</h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-5 text-lg leading-relaxed text-forest-800/80">
                Ridge Hotel is proud to employ and train talented Ugandan hospitality professionals — from front
                office and housekeeping to culinary arts, events and grounds. We are always glad to hear from
                driven individuals who share our commitment to warm, genuine service.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="mt-4 text-lg leading-relaxed text-forest-800/80">
                We do not currently have an automated application system — please send your CV and a short
                introduction directly to our management team, and we will reach out when a suitable role opens.
              </p>
            </Reveal>
            <Reveal index={4} className="mt-8">
              <a
                href={`mailto:${site.contact.email}?subject=Career Enquiry`}
                className="inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-3.5 text-sm font-semibold text-ivory-100 hover:bg-forest-800"
              >
                <Mail className="h-4 w-4" /> Email Your CV
              </a>
            </Reveal>
          </div>

          <Reveal>
            <div className="rounded-[1.75rem] border border-stone-400/30 p-10">
              <Kicker className="text-gold-600">Why Work Here</Kicker>
              <ul className="mt-6 space-y-4">
                {values.map((value) => (
                  <li key={value} className="border-b border-stone-400/20 pb-4 text-sm text-forest-800/80 last:border-none">
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
