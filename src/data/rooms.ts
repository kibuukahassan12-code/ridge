import { media } from "./media";

export type Room = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string[];
  size: string;
  bed: string;
  occupancy: string;
  view: string;
  price: number;
  images: string[];
  amenities: string[];
  featured?: boolean;
};

export const rooms: Room[] = [
  {
    slug: "rwenzori-balcony-room",
    name: "Rwenzori Balcony Room",
    tagline: "Where every morning begins with mountains",
    description:
      "Our signature room — an intimate retreat with a private balcony framing the snow-veiled peaks of the Rwenzoris, dressed in warm timber, ivory linen and hand-woven Toro textiles.",
    longDescription: [
      "The Rwenzori Balcony Room is the heart of the Ridge Hotel experience — the room that inspired the hotel itself. Each of these garden-facing rooms opens onto a private balcony, positioned to catch the first gold of sunrise over the Mountains of the Moon.",
      "Inside, warm wood tones, ivory linens and hand-woven Toro basketry soften the clean, contemporary lines of the room, while a spacious writing desk and reading chair invite you to slow down and watch the mist lift off the hills.",
      "It is a room built for travellers who came to Fort Portal for the view, and never want to leave it.",
    ],
    size: "28 m²",
    bed: "1 King or 2 Twin beds",
    occupancy: "2 Adults, 1 Child",
    view: "Rwenzori Mountains & Gardens",
    price: 120,
    images: ["/images/rooms-hero.jpg", "/images/garden-deluxe-room.jpg", "/images/media__1785237621275.jpg"],
    amenities: [
      "Private balcony with mountain view",
      "En-suite hot water bathroom",
      "Complimentary high-speed Wi-Fi",
      "Flat-screen satellite TV",
      "Writing desk & reading chair",
      "Daily housekeeping",
      "In-room safe",
      "Mosquito netting & garden fragrance",
    ],
    featured: true,
  },
  {
    slug: "garden-deluxe-room",
    name: "Garden Deluxe Room",
    tagline: "A quiet fold of green, steps from everything",
    description:
      "Generously proportioned rooms overlooking Ridge Hotel's manicured lawns — the ideal base for travellers moving between Fort Portal town and the forests beyond.",
    longDescription: [
      "The Garden Deluxe Room looks onto the hotel's sweeping lawns, shaded by flowering trees and bordered by the paths that lead to the bar terrace and gardens.",
      "Thoughtfully furnished with locally made furniture, soft ivory tones and warm brass lighting, this room is built for travellers who want space to spread out after a day tracking chimpanzees or touring tea estates.",
      "A five-minute walk from Fort Portal town centre, it is the most requested room category for both leisure guests and business travellers attending events in our conference hall.",
    ],
    size: "26 m²",
    bed: "1 Queen or 2 Twin beds",
    occupancy: "2 Adults, 1 Child",
    view: "Landscaped Gardens",
    price: 95,
    images: ["/images/garden-deluxe-room.jpg", "/images/garden-cottage.jpg", "/images/garden-room-block.jpg"],
    amenities: [
      "Garden-facing window seating",
      "En-suite hot water bathroom",
      "Complimentary high-speed Wi-Fi",
      "Flat-screen satellite TV",
      "Work desk",
      "Daily housekeeping",
      "Tea & coffee station",
      "Wardrobe & luggage rack",
    ],
    featured: true,
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    tagline: "A residence for those who linger",
    description:
      "A spacious, separately zoned suite with a private lounge, dressing area and panoramic balcony — reserved for guests who want the finest room in the house.",
    longDescription: [
      "Ridge Hotel's Executive Suite is a residence in miniature — a separate sitting area for morning coffee and evening conversation, a dressing area, and a wraparound balcony that captures both the gardens below and the Rwenzori ridgeline beyond.",
      "It is the room of choice for honeymooners extending a wedding celebration held in our gardens, visiting dignitaries, and long-stay guests exploring the whole of Western Uganda from a single, comfortable base.",
      "Every detail, from the linen to the locally sourced amenities, has been considered to make the Executive Suite feel less like a hotel room and more like a home in the hills.",
    ],
    size: "42 m²",
    bed: "1 King bed + Sofa lounge",
    occupancy: "2 Adults, 2 Children",
    view: "Panoramic Mountain & Garden View",
    price: 175,
    images: ["/images/executive-suite.jpg", "/images/rooms-hero.jpg", "/images/media__1785237621275.jpg"],
    amenities: [
      "Separate lounge & dressing area",
      "Wraparound private balcony",
      "En-suite bathroom with bathtub",
      "Complimentary high-speed Wi-Fi",
      "Smart TV & Bluetooth speaker",
      "Priority breakfast service",
      "In-room safe & minibar",
      "Turndown service",
    ],
    featured: true,
  },
  {
    slug: "family-twin-room",
    name: "Family Twin Room",
    tagline: "Room to roam, together",
    description:
      "Two connected sleeping zones with double beds designed for families exploring Kibale Forest and the crater lakes together, with easy access to the gardens and pool terrace.",
    longDescription: [
      "The Family Twin Room offers a flexible sleeping arrangement across a comfortable layout with double beds — ideal for parents travelling with children before or after a day of chimpanzee tracking or a crater lake picnic.",
      "Located close to the gardens and pool terrace, this room keeps young travellers within easy reach of open lawns to run in, while parents relax on the veranda with a view of the Rwenzori foothills.",
    ],
    size: "32 m²",
    bed: "2 Double beds",
    occupancy: "2 Adults, 2 Children",
    view: "Garden View",
    price: 140,
    images: ["/images/family-twin-room.jpg", "/images/711A6591.JPG", "/images/711A6602.JPG"],
    amenities: [
      "Flexible family sleeping configuration with double beds",
      "En-suite hot water bathroom",
      "Complimentary high-speed Wi-Fi",
      "Flat-screen satellite TV",
      "Close to gardens & pool terrace",
      "Daily housekeeping",
      "Extra bedding on request",
      "Kid-friendly breakfast menu",
    ],
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}
