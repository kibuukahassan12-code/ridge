export const site = {
  name: "Ridge Hotel",
  tagline: "Uganda's Premier Highland Retreat — Comfort and Class at the Roof of Africa",
  domain: "ridgehotelug.com",
  url: "https://www.ridgehotelug-preview.com",
  description:
    "Ridge Hotel is Uganda's premier highland retreat — 34 balconied rooms facing the snow-capped Rwenzori Mountains, a gateway to Uganda's crater lakes, organic tea estates, chimpanzee forests, and one of Africa's last remaining glaciers.",
  founded: 2026,
  roomCount: 34,
  conferenceCapacity: 100,
  address: {
    line1: "Boma Road, The Ridge",
    line2: "Fort Portal, Kabarole District",
    region: "Western Region",
    country: "Uganda",
    postalNote: "5km west of the Toro Kingdom Palace, walking distance to Fort Portal town centre",
  },
  geo: {
    lat: 0.6710,
    lng: 30.2750,
  },
  contact: {
    email: "info@ridgehotelug.com",
    reservationsEmail: "reservations@ridgehotelug.com",
    phone: "+256 776 477 577",
    phoneDisplay: "+256 776 477 577",
    whatsapp: "https://wa.me/256776477577",
  },
  social: {
    facebook: "https://facebook.com/ridgehotelug",
    instagram: "https://instagram.com/ridgehotelug",
    twitter: "https://twitter.com/ridgehotelug",
    tripadvisor: "https://www.tripadvisor.com/",
  },
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  currency: "USD",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  {
    label: "Events",
    href: "/weddings",
    children: [
      { label: "Weddings", href: "/weddings" },
      { label: "Conferences", href: "/conference" },
    ],
  },
  { label: "Experiences", href: "/experiences" },
  {
    label: "More",
    href: "/gallery",
    children: [
      { label: "Gallery", href: "/gallery" },
      { label: "Journal", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  stay: [
    { label: "Rooms & Suites", href: "/rooms" },
    { label: "Dining", href: "/dining" },
    { label: "Gallery", href: "/gallery" },
  ],
  experiences: [
    { label: "Discover Western Uganda", href: "/experiences" },
    { label: "Weddings", href: "/weddings" },
    { label: "Conferences & Meetings", href: "/conference" },
    { label: "Testimonials", href: "/testimonials" },
  ],
  hotel: [
    { label: "Our Story", href: "/about" },
    { label: "Journal", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
} as const;
