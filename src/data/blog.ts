import { media } from "./media";

export const posts = [
  {
    slug: "guide-to-chimpanzee-tracking-kibale",
    title: "A First-Timer's Guide to Chimpanzee Tracking in Kibale Forest",
    excerpt:
      "Everything to know before your first trek into Kibale National Park — permits, fitness, what to pack, and what to expect when you meet Uganda's chimpanzees.",
    image: media.chimps[1],
    date: "2025-11-02",
    category: "Wildlife",
    body: [
      "Kibale National Park is home to the highest concentration of primates in Africa, and its chimpanzee tracking experience is, for many visitors, the single most moving encounter of a Uganda safari.",
      "Permits should be booked in advance, particularly during peak season (December–February, June–September). Ridge Hotel's concierge can secure permits alongside your room booking.",
      "Wear closed shoes, long trousers and neutral colours, and bring a rain jacket regardless of season — Kibale is rainforest, and showers can arrive without warning.",
      "Tracking typically begins at 8:00 AM at the Kanyanchu Visitor Centre, 35 minutes from Ridge Hotel, with groups guided by experienced rangers who track calls and nests to locate a habituated community.",
    ],
  },
  {
    slug: "best-time-to-visit-fort-portal",
    title: "The Best Time to Visit Kibale & the Rwenzori Mountains",
    excerpt:
      "Western Uganda's temperate highland climate makes it a year-round destination — here's how to plan around the seasons.",
    image: media.mountains[1],
    date: "2025-09-18",
    category: "Travel Tips",
    body: [
      "Sitting at over 1,500 metres above sea level, the region enjoys a cooler, more temperate climate than much of Uganda, making it comfortable to visit throughout the year.",
      "The driest, clearest months — December to February and June to September — offer the best visibility for Rwenzori Mountain views and the most reliable conditions for trekking.",
      "The wetter months (March–May, October–November) bring lush, vivid greenery to the tea estates and crater lakes, and fewer crowds at major sites.",
    ],
  },
  {
    slug: "crater-lakes-walking-guide",
    title: "Walking the Crater Lakes: A Photographer's Route",
    excerpt: "A suggested half-day walking route linking three of Ndali-Kasenda's most photogenic crater lakes.",
    image: media.craterLakes[3],
    date: "2025-07-04",
    category: "Itineraries",
    body: [
      "The crater lake field holds over fifty volcanic lakes within a compact, walkable area — ideal for a half-day outing from Ridge Hotel.",
      "Our recommended route links three neighbouring lakes over roughly two hours of gentle walking, with a break for lunch at a lakeside guesthouse along the way.",
      "Morning departures (8:00–9:00 AM) offer the clearest light and coolest walking conditions.",
    ],
  },
] as const;

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
