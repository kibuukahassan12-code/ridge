import { media } from "./media";

export const offers = [
  {
    slug: "rwenzori-romance",
    name: "Rwenzori Romance Escape",
    summary:
      "Three nights in the Executive Suite with private garden dinner, spa-style couples treatment and a guided crater lakes walk.",
    nights: 3,
    price: 620,
    originalPrice: 780,
    image: media.rooms[2],
    inclusions: [
      "3 nights in the Executive Suite",
      "Daily breakfast for two",
      "One private candlelit garden dinner",
      "Guided crater lakes walking tour",
      "Late checkout, subject to availability",
    ],
  },
  {
    slug: "chimpanzee-explorer",
    name: "Chimpanzee Explorer Package",
    summary:
      "Four nights combining Ridge Hotel comfort with permits and transport for Kibale chimpanzee tracking and a Queen Elizabeth day safari.",
    nights: 4,
    price: 890,
    originalPrice: 1050,
    image: media.chimps[0],
    inclusions: [
      "4 nights in a Garden Deluxe Room",
      "Daily breakfast",
      "Kibale chimpanzee tracking permit & guide",
      "Full-day Queen Elizabeth National Park safari",
      "Airport pickup from Kasese or Fort Portal airstrip",
    ],
  },
  {
    slug: "corporate-retreat",
    name: "Corporate Retreat Package",
    summary:
      "Full-day conference hire with coffee breaks, plated lunch and preferential room rates for groups of 20 or more.",
    nights: 1,
    price: 45,
    originalPrice: 60,
    image: media.conference[1],
    inclusions: [
      "Full-day conference hall hire (up to 100 delegates)",
      "Morning & afternoon tea breaks",
      "Three-course plated lunch",
      "Standard AV equipment & Wi-Fi",
      "Preferential group room rates",
    ],
  },
  {
    slug: "weekend-in-the-hills",
    name: "Weekend in the Hills",
    summary:
      "Two nights for Uganda residents — garden room, breakfast daily, and a bottle of Ugandan wine on arrival.",
    nights: 2,
    price: 180,
    originalPrice: 220,
    image: media.gardenEntrance[1],
    inclusions: [
      "2 nights in a Rwenzori Balcony Room",
      "Daily breakfast for two",
      "Welcome bottle of Ugandan wine",
      "Complimentary access to the gardens & pool terrace",
    ],
  },
] as const;

export function getOfferBySlug(slug: string) {
  return offers.find((offer) => offer.slug === slug);
}
