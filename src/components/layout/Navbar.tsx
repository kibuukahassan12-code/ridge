"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Calendar } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-500">
      {/* Top utility bar */}
      <div
        className={cn(
          "hidden border-b border-ivory-100/10 bg-forest-950/90 text-[11px] text-ivory-100/75 backdrop-blur-md transition-all duration-500 lg:block",
          scrolled ? "-mt-9 opacity-0 pointer-events-none" : "mt-0 opacity-100"
        )}
      >
        <div className="mx-auto flex h-9 w-full max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">
          <div className="flex min-w-0 items-center gap-4">
            <span className="inline-flex shrink-0 items-center gap-1.5 font-medium uppercase tracking-[0.18em] text-gold-300">
              Premier Highland Retreat
            </span>
            <span className="hidden h-3 w-px shrink-0 bg-ivory-100/15 xl:block" />
            <span className="hidden min-w-0 items-center gap-1.5 truncate xl:flex">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-400" />
              {site.address.line1}, Fort Portal
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <a
              href={`mailto:${site.contact.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-gold-400 xl:inline-flex"
            >
              <Mail className="h-3.5 w-3.5 text-gold-400" />
              {site.contact.email}
            </a>
            <span className="hidden h-3 w-px bg-ivory-100/15 xl:block" />
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 font-medium text-ivory-100/90 transition-colors hover:text-gold-400"
            >
              <Phone className="h-3.5 w-3.5 text-gold-400" />
              {site.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        className={cn(
          "w-full border-b transition-all duration-500",
          scrolled || open
            ? "glass-panel-dark border-ivory-100/10 py-0 shadow-[0_12px_40px_rgba(8,22,17,0.35)]"
            : "border-transparent bg-gradient-to-b from-forest-950/95 via-forest-950/50 to-transparent py-0"
        )}
      >
        <div
          className={cn(
            "mx-auto grid w-full max-w-[1440px] grid-cols-[1fr_auto] items-center gap-4 px-6 sm:px-10 lg:grid-cols-[minmax(0,260px)_1fr_minmax(0,auto)] lg:gap-8 lg:px-16",
            scrolled ? "h-[4.25rem]" : "h-[5rem]"
          )}
        >
          {/* Brand */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 focus:outline-none lg:justify-self-start"
          >
            <div
              className={cn(
                "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-gold-400/25 transition-all duration-300 group-hover:ring-gold-400/50",
                scrolled ? "h-10 w-10" : "h-11 w-11"
              )}
            >
              <Image
                src="/images/logo.png"
                alt="Ridge Hotel emblem"
                width={44}
                height={44}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            <div className="hidden min-w-0 flex-col justify-center border-l border-ivory-100/15 pl-3 sm:flex">
              <span
                className={cn(
                  "font-display font-medium uppercase leading-none tracking-[0.14em] text-ivory-100 transition-colors group-hover:text-gold-300",
                  scrolled ? "text-base" : "text-lg"
                )}
              >
                Ridge Hotel
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center justify-center gap-1 lg:flex xl:gap-1.5">
            {navLinks.map((link) => {
              const hasChildren = "children" in link && link.children;
              const isActive =
                pathname === link.href ||
                (hasChildren && link.children?.some((c) => pathname === c.href));

              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => hasChildren && setActiveDropdown(link.label)}
                  onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 xl:px-3",
                      isActive
                        ? "text-gold-400"
                        : "text-ivory-100/80 hover:bg-ivory-100/5 hover:text-gold-300"
                    )}
                  >
                    {link.label}
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 text-gold-400/70 transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {hasChildren && (
                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full z-50 mt-1 w-52 -translate-x-1/2 overflow-hidden rounded-xl border border-ivory-100/12 bg-forest-950/98 p-1.5 shadow-2xl backdrop-blur-xl"
                        >
                          {link.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "block rounded-lg px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors",
                                pathname === child.href
                                  ? "bg-gold-500/15 text-gold-400"
                                  : "text-ivory-100/75 hover:bg-ivory-100/8 hover:text-gold-300"
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center justify-end gap-3 lg:flex">
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 rounded-full border border-ivory-100/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ivory-100/85 transition-colors hover:border-gold-400/40 hover:text-gold-300 xl:inline-flex"
            >
              <Phone className="h-3.5 w-3.5 text-gold-400" />
              Call
            </a>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-forest-950 shadow-[0_4px_18px_rgba(200,162,74,0.3)] transition-all duration-300 hover:shadow-[0_6px_22px_rgba(200,162,74,0.45)]"
            >
              <Calendar className="h-3.5 w-3.5" />
              Book Stay
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center justify-self-end rounded-lg border border-ivory-100/20 bg-forest-900/60 text-ivory-100 transition-colors hover:border-gold-400 hover:text-gold-400 lg:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-ivory-100/15 bg-forest-950/98 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-4 px-6 pb-8 pt-4">
              <div className="flex items-center justify-between rounded-xl border border-ivory-100/10 bg-ivory-100/5 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/logo.png"
                    alt=""
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                    aria-hidden
                  />
                  <div>
                    <p className="font-display text-sm uppercase tracking-[0.12em] text-ivory-100">
                      Ridge Hotel
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call
                </a>
              </div>

              <ul className="flex flex-col divide-y divide-ivory-100/10 rounded-xl border border-ivory-100/10">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors",
                        pathname === link.href
                          ? "text-gold-400"
                          : "text-ivory-100/90 hover:text-gold-300"
                      )}
                    >
                      {link.label}
                    </Link>

                    {"children" in link && link.children && (
                      <div className="border-t border-ivory-100/8 bg-ivory-100/[0.03] px-4 py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-xs uppercase tracking-[0.14em] text-ivory-100/65 hover:text-gold-400"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-forest-950 shadow-lg"
              >
                <Calendar className="h-4 w-4" />
                Book Your Stay
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}