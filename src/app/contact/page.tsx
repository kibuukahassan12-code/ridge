import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Ridge Hotel, Fort Portal — reservations, weddings, conferences and general enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero small image={media.mountains[2]} kicker="Contact" title="We'd Love to Hear From You" />

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <Kicker className="text-gold-600">Get in Touch</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 font-display text-3xl text-forest-950">Reach the Ridge Hotel Team</h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-4 text-base leading-relaxed text-forest-800/75">
                For reservations, weddings, conferences or general enquiries, contact us directly — our team
                typically replies within one business day, and instantly on WhatsApp.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              <Reveal index={3}>
                <ContactRow icon={<MapPin className="h-5 w-5 text-gold-600" />} label="Address">
                  {site.address.line1}, {site.address.line2}
                  <br />
                  {site.address.postalNote}
                </ContactRow>
              </Reveal>
              <Reveal index={4}>
                <ContactRow icon={<Phone className="h-5 w-5 text-gold-600" />} label="Phone / WhatsApp">
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-gold-600">
                    {site.contact.phoneDisplay}
                  </a>
                  <br />
                  <a href={`tel:${site.contact.phone2.replace(/\s/g, "")}`} className="hover:text-gold-600">
                    {site.contact.phoneDisplay2}
                  </a>
                </ContactRow>
              </Reveal>
              <Reveal index={5}>
                <ContactRow icon={<Mail className="h-5 w-5 text-gold-600" />} label="Email">
                  <a href={`mailto:${site.contact.email}`} className="hover:text-gold-600">
                    {site.contact.email}
                  </a>
                </ContactRow>
              </Reveal>
            </div>

            <Reveal index={6}>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-3.5 text-sm font-semibold text-ivory-100 hover:bg-forest-800"
              >
                <WhatsAppIcon className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </Reveal>

            <Reveal index={7} className="mt-12 overflow-hidden rounded-2xl border border-stone-400/30">
              <iframe
                title="Ridge Hotel location map"
                src={`https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=13&output=embed`}
                className="h-64 w-full grayscale"
                loading="lazy"
              />
            </Reveal>
          </div>

          <Reveal index={2} className="lg:col-span-3">
            <div className="rounded-[1.75rem] border border-stone-400/30 p-8 lg:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wider text-forest-800/50">{label}</p>
        <p className="mt-1 text-sm text-forest-800/85">{children}</p>
      </div>
    </div>
  );
}
