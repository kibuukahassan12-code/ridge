import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import { footerLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 pt-20 text-ivory-100/85">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--color-gold-400) 0, transparent 45%), radial-gradient(circle at 80% 60%, var(--color-emerald-500) 0, transparent 50%)",
        }}
      />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 border-b border-ivory-100/10 pb-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-baseline gap-2 text-ivory-100">
              <span className="font-display text-3xl font-medium">Ridge</span>
              <span className="kicker text-gold-400">Hotel</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory-100/70">{site.description}</p>
            <div className="mt-6 flex items-center gap-4">
              <a href={site.social.facebook} aria-label="Facebook" className="rounded-full border border-ivory-100/20 p-2.5 transition-colors hover:border-gold-400 hover:text-gold-400">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href={site.social.instagram} aria-label="Instagram" className="rounded-full border border-ivory-100/20 p-2.5 transition-colors hover:border-gold-400 hover:text-gold-400">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href={site.social.twitter} aria-label="Twitter" className="rounded-full border border-ivory-100/20 p-2.5 transition-colors hover:border-gold-400 hover:text-gold-400">
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterCol title="Stay" links={footerLinks.stay} />
          <FooterCol title="Experiences" links={footerLinks.experiences} />
          <FooterCol title="Hotel" links={footerLinks.hotel} />
        </div>

        <div className="grid grid-cols-1 gap-8 py-10 text-sm sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            <span>
              {site.address.line1}, {site.address.line2}
              <br />
              {site.address.postalNote}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-gold-400">
              {site.contact.phoneDisplay}
            </a>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            <a href={`mailto:${site.contact.email}`} className="hover:text-gold-400">
              {site.contact.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ivory-100/10 py-8 text-xs text-ivory-100/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Ridge Hotel, Fort Portal. All rights reserved.</p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gold-400">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <p className="kicker text-gold-400">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-ivory-100/70 transition-colors hover:text-ivory-100">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
