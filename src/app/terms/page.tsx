import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for booking and staying at Ridge Hotel, Fort Portal.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="bg-ivory-100 py-32">
      <Container className="mx-auto max-w-3xl">
        <p className="kicker text-gold-600">Legal</p>
        <h1 className="mt-5 font-display text-4xl text-forest-950">Terms &amp; Conditions</h1>
        <p className="mt-4 text-sm text-forest-800/60">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-10 space-y-8 text-forest-800/85">
          <LegalSection title="1. Reservations">
            A minimum 50% deposit is required to confirm reservations during peak season (December–February and
            June–September). The remaining balance is due on arrival. Reservations are held for 24 hours pending
            deposit unless otherwise agreed.
          </LegalSection>
          <LegalSection title="2. Check-In & Check-Out">
            Standard check-in is from {site.checkIn} and check-out is by {site.checkOut}. Early check-in and late
            check-out may be arranged in advance, subject to availability, and may incur an additional charge.
          </LegalSection>
          <LegalSection title="3. Cancellations">
            Cancellations made more than 48 hours before arrival are eligible for a full refund of any deposit paid.
            Cancellations within 48 hours of arrival, or no-shows, may forfeit the deposit.
          </LegalSection>
          <LegalSection title="4. Payment">
            We accept cash (UGX and USD), major mobile money platforms, and card payments where facilities allow.
            Rates are quoted in USD unless otherwise stated and are subject to change without notice for future
            reservations.
          </LegalSection>
          <LegalSection title="5. Conduct & Property">
            Guests are responsible for any damage caused to hotel property during their stay. Ridge Hotel reserves
            the right to refuse service or terminate a stay in cases of misconduct.
          </LegalSection>
          <LegalSection title="6. Liability">
            Ridge Hotel takes reasonable care to ensure guest safety but is not liable for loss, theft or damage to
            personal belongings except where caused by proven negligence of hotel staff.
          </LegalSection>
          <LegalSection title="7. Events & Group Bookings">
            Weddings, conferences and group bookings are subject to a separate events agreement outlining deposit
            schedules, catering minimums and cancellation terms specific to the event.
          </LegalSection>
          <LegalSection title="8. Governing Law">
            These terms are governed by the laws of the Republic of Uganda.
          </LegalSection>
        </div>
      </Container>
    </section>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl text-forest-950">{title}</h2>
      <p className="mt-3 text-base leading-relaxed">{children}</p>
    </div>
  );
}
