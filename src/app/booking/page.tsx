import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import BookingForm from "@/components/forms/BookingForm";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { site } from "@/data/site";
import { rooms } from "@/data/rooms";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description: "Reserve your room at Ridge Hotel — best rates guaranteed when you book direct for your Rwenzori adventure.",
  alternates: { canonical: "/booking" },
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string; package?: string }>;
}) {
  const params = await searchParams;
  const preselectedRoom = rooms.find((r) => r.slug === params.room)?.name;

  return (
    <>
      <PageHero small image={media.rooms[5]} kicker="Booking" title="Reserve Your Stay at Ridge Hotel" />

      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Reveal>
              <Kicker className="text-gold-600">Direct Booking</Kicker>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 font-display text-3xl text-forest-950">Best Rate, Guaranteed</h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-4 text-base leading-relaxed text-forest-800/75">
                Complete the form below and our reservations team will confirm availability and send payment
                instructions within 24 hours. For urgent requests, WhatsApp or call us directly.
              </p>
            </Reveal>
            <Reveal index={3} className="mt-10 rounded-[1.75rem] border border-stone-400/30 p-8 lg:p-10">
              <BookingForm defaultRoom={preselectedRoom} />
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <Reveal>
              <div className="sticky top-28 space-y-8">
                <div className="rounded-[1.75rem] bg-forest-950 p-8 text-ivory-100">
                  <p className="kicker text-gold-400">Need It Faster?</p>
                  <h3 className="mt-4 font-display text-2xl">Book via WhatsApp</h3>
                  <p className="mt-3 text-sm text-ivory-100/75">
                    Message our reservations desk directly for same-day confirmation.
                  </p>
                  <a
                    href={site.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 hover:bg-gold-400"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> {site.contact.phoneDisplay}
                  </a>
                  <p className="mt-4 text-xs text-ivory-100/50">
                    Or email{" "}
                    <a href={`mailto:${site.contact.reservationsEmail}`} className="underline">
                      {site.contact.reservationsEmail}
                    </a>
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-stone-400/30 p-8">
                  <p className="kicker text-gold-600">Good to Know</p>
                  <ul className="mt-5 space-y-3">
                    {[
                      `Check-in from ${site.checkIn}, check-out by ${site.checkOut}`,
                      "50% deposit required during peak season",
                      "Airport pickup available on request",
                      "Free cancellation up to 48 hours before arrival",
                      "Direct bookings always receive our best rate",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-forest-800/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
