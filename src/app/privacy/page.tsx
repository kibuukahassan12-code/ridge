import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Ridge Hotel's privacy policy — how we collect, use and protect your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="bg-ivory-100 py-32">
      <Container className="mx-auto max-w-3xl">
        <p className="kicker text-gold-600">Legal</p>
        <h1 className="mt-5 font-display text-4xl text-forest-950">Privacy Policy</h1>
        <p className="mt-4 text-sm text-forest-800/60">Last updated: {new Date().getFullYear()}</p>

        <div className="prose-legal mt-10 space-y-8 text-forest-800/85">
          <LegalSection title="1. Information We Collect">
            When you make a reservation, submit an enquiry, or contact us through our website, we collect
            information such as your name, email address, phone number, and stay preferences. We may also collect
            technical information such as browser type and device information to improve our website.
          </LegalSection>
          <LegalSection title="2. How We Use Your Information">
            We use the information you provide to process reservations, respond to enquiries, communicate offers
            (only with your consent), and improve our services. We do not sell or rent your personal information to
            third parties.
          </LegalSection>
          <LegalSection title="3. Data Storage & Security">
            Booking and contact information is stored securely and accessed only by authorised Ridge Hotel staff for
            the purpose of managing your reservation or enquiry.
          </LegalSection>
          <LegalSection title="4. Cookies">
            Our website may use cookies to remember your preferences and understand how visitors use our site. You
            can disable cookies through your browser settings at any time.
          </LegalSection>
          <LegalSection title="5. Third-Party Services">
            We may use trusted third-party services for payment processing, analytics, and communications (such as
            WhatsApp Business). These providers are bound by their own privacy policies.
          </LegalSection>
          <LegalSection title="6. Your Rights">
            You may request access to, correction of, or deletion of your personal information at any time by
            contacting us at {site.contact.email}.
          </LegalSection>
          <LegalSection title="7. Contact Us">
            For questions about this Privacy Policy, please contact Ridge Hotel at {site.contact.email},{" "}
            {site.contact.phoneDisplay} or {site.contact.phoneDisplay2}.
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
