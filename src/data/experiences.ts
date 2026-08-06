import { media } from "./media";

export type Experience = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  longDescription: string[];
  image: string;
  gallery: string[];
  distance: string;
  duration: string;
  bestFor: string[];
  itinerary: { time: string; activity: string }[];
};

export const experiences: Experience[] = [
  {
    slug: "rwenzori-mountains",
    name: "Rwenzori Mountains",
    region: "Rwenzori Mountains National Park",
    tagline: "The Mountains of the Moon, framed from your balcony",
    description:
      "A UNESCO World Heritage massif of glaciers, moorland and mist — visible from every east-facing room at Ridge Hotel and reachable for day hikes or multi-day treks.",
    longDescription: [
      "The Rwenzori range is Africa's tallest mountain block and one of the continent's last glaciated landscapes — a UNESCO World Heritage Site of Afro-alpine moorland, giant lobelias and the legendary snows first mapped for Europe by Henry Morton Stanley.",
      "Ridge Hotel sits directly in view of the range, making it the natural staging point for trekkers preparing for the Central Circuit or Kilembe trails, and an unforgettable backdrop for guests who simply want to watch the peaks catch the evening light from the garden bar.",
      "Our concierge arranges licensed guides, porters and permits through the Rwenzori Mountaineering Services for treks ranging from a single acclimatisation day-hike to the seven-day summit circuit toward Margherita Peak.",
    ],
    image: media.mountains[2],
    gallery: [media.mountains[0], media.mountains[1], media.mountains[3]],
    distance: "45 min drive to trailhead (Nyakalengija)",
    duration: "Day hike to 7-day summit trek",
    bestFor: ["Serious trekkers", "Photographers", "Nature lovers"],
    itinerary: [
      { time: "05:30", activity: "Early coffee and packed breakfast from Ridge Hotel" },
      { time: "06:30", activity: "Private transfer to the Nyakalengija trailhead" },
      { time: "07:30", activity: "Guided ascent through montane forest and bamboo zone" },
      { time: "13:00", activity: "Picnic lunch with views toward the Semliki Valley" },
      { time: "17:00", activity: "Return transfer, evening drinks on the Ridge Hotel terrace" },
    ],
  },
  {
    slug: "kibale-chimpanzee-tracking",
    name: "Kibale Forest & Chimpanzee Tracking",
    region: "Kibale National Park",
    tagline: "Face to face with our closest living relatives",
    description:
      "Home to the highest concentration of primates in Africa, Kibale's rainforest canopy hides over 1,500 chimpanzees, 13 primate species and 375 recorded bird species — 35 minutes from your room.",
    longDescription: [
      "Kibale National Park protects one of the last expanses of mid-altitude rainforest in East Africa, and its habituated chimpanzee communities offer one of the continent's most moving wildlife encounters.",
      "Guests rise before dawn for briefing at the Kanyanchu Visitor Centre, then track chimpanzee families through dense forest for up to an hour of observation once located — accompanied by red colobus monkeys, grey-cheeked mangabeys and a chorus of forest hornbills overhead.",
      "For a deeper immersion, the Chimpanzee Habituation Experience allows guests to spend a full morning with researchers following a community not yet accustomed to tourism.",
    ],
    image: media.chimps[0],
    gallery: [media.chimps[1], media.rainforest[2], media.birds[0]],
    distance: "35 minutes from Ridge Hotel",
    duration: "Half-day (tracking) or full-day (habituation)",
    bestFor: ["Wildlife enthusiasts", "Photographers", "Honeymooners"],
    itinerary: [
      { time: "06:00", activity: "Early breakfast box prepared by Ridge Hotel kitchen" },
      { time: "06:45", activity: "Transfer to Kanyanchu Visitor Centre" },
      { time: "08:00", activity: "Ranger briefing and permit check" },
      { time: "08:30", activity: "Guided chimpanzee tracking through the forest" },
      { time: "12:30", activity: "Return to Ridge Hotel for a late lunch on the terrace" },
    ],
  },
  {
    slug: "queen-elizabeth-national-park",
    name: "Queen Elizabeth National Park",
    region: "Kasese / Kanungu Districts",
    tagline: "Tree-climbing lions, hippo-lined channels and endless savanna",
    description:
      "Uganda's most biodiverse savanna park, famed for the tree-climbing lions of Ishasha, boat cruises on the Kazinga Channel, and views across to the Congo's Virunga Mountains.",
    longDescription: [
      "Queen Elizabeth National Park spans crater-studded savanna, wetlands and forest between Lakes Edward and George, and is one of Africa's premier destinations for classic game drives and boat safaris.",
      "The Kazinga Channel cruise delivers one of Uganda's most reliable wildlife sightings — hippo pods numbering in the hundreds, buffalo herds, elephants at the water's edge, and prolific birdlife including African skimmers and pied kingfishers.",
      "Further south, the Ishasha sector is one of only a few places on Earth where lions habitually climb fig trees to rest, offering an extraordinary sighting for those willing to make the extended journey.",
    ],
    image: media.savanna[0],
    gallery: [media.savanna[1], media.savanna[2], media.sunset[2]],
    distance: "2 hours drive from Ridge Hotel",
    duration: "Full day or overnight safari",
    bestFor: ["Safari lovers", "Bird watchers", "Families"],
    itinerary: [
      { time: "05:00", activity: "Depart Ridge Hotel with packed breakfast" },
      { time: "07:30", activity: "Morning game drive through the Kasenyi plains" },
      { time: "12:00", activity: "Lunch at a lakeside lodge" },
      { time: "14:30", activity: "Kazinga Channel boat cruise" },
      { time: "19:30", activity: "Return to Ridge Hotel for dinner" },
    ],
  },
  {
    slug: "crater-lakes",
    name: "Ndali-Kasenda Crater Lakes",
    region: "Kasenda & Ndali Crater Fields",
    tagline: "Fifty jewel-toned lakes scattered through the hills",
    description:
      "A landscape of over fifty volcanic crater lakes in Western Uganda, ranging from vivid green to deep cobalt, laced with walking trails, viewpoints and lakeside cafés.",
    longDescription: [
      "The Ndali-Kasenda volcanic field holds one of Africa's most striking concentrations of crater lakes — more than fifty in total, each a different shade of green, blue or black depending on mineral content and depth.",
      "The Kasenda and Ndali crater fields offer guided walking circuits between neighbouring lakes, passing through farmland, forest fragments and homesteads, with sweeping viewpoints back toward the Rwenzoris.",
      "Many guests combine a crater lake walk with lunch at a lakeside guesthouse, or a swim in one of the lakes confirmed safe for bathing by local guides.",
    ],
    image: media.craterLakes[1],
    gallery: [media.craterLakes[0], media.craterLakes[2], media.craterLakes[3]],
    distance: "20–30 minutes from Ridge Hotel",
    duration: "Half-day walking circuit",
    bestFor: ["Walkers", "Photographers", "Couples"],
    itinerary: [
      { time: "08:00", activity: "Breakfast at Ridge Hotel" },
      { time: "08:45", activity: "Transfer to the Kasenda crater field" },
      { time: "09:15", activity: "Guided walk between three neighbouring lakes" },
      { time: "12:00", activity: "Lakeside lunch with panoramic views" },
      { time: "14:00", activity: "Return to Ridge Hotel, free afternoon by the pool" },
    ],
  },
  {
    slug: "tea-estates",
    name: "Rwenzori Tea Estates",
    region: "Mpanga & Kiko Tea Zones",
    tagline: "Emerald terraces rolling toward the mountains",
    description:
      "Western Uganda's rolling tea estates are among the most photographed landscapes — manicured hillsides that turn gold at sunset, with working factories open for tours.",
    longDescription: [
      "Tea has shaped the landscape and economy of the Rwenzori foothills for generations, and the estates produce some of Uganda's finest leaf, destined for markets across the world.",
      "A guided estate tour introduces the full journey from hand-plucked leaf to finished cup, including a visit to a working factory and a tasting session, followed by a walk along the ridgelines that separate the tea gardens from the surrounding forest.",
      "The soft, undulating geometry of the plantations makes this one of the most rewarding outings for photographers, especially in the gold light of early morning or late afternoon.",
    ],
    image: media.tea[0],
    gallery: [media.tea[1], media.tea[2], media.tea[3]],
    distance: "15–25 minutes from Ridge Hotel",
    duration: "Half-day tour",
    bestFor: ["Photographers", "Culture seekers", "Couples"],
    itinerary: [
      { time: "09:00", activity: "Depart Ridge Hotel for the Mpanga tea zone" },
      { time: "09:30", activity: "Guided walk through the tea gardens" },
      { time: "10:30", activity: "Factory tour and tasting session" },
      { time: "12:00", activity: "Lunch overlooking the plantations" },
      { time: "13:30", activity: "Return to Ridge Hotel" },
    ],
  },
  {
    slug: "toro-kingdom",
    name: "Toro Kingdom & Karambi Tombs",
    region: "Fort Portal",
    tagline: "A living kingdom, two and a half kilometres from your room",
    description:
      "Home to the Toro Kingdom's royal palace and the Karambi Royal Tombs, Fort Portal carries centuries of Batooro history and culture within easy reach of Ridge Hotel.",
    longDescription: [
      "The Toro Kingdom, one of Uganda's four traditional kingdoms, has its seat in Fort Portal, just two and a half kilometres from Ridge Hotel. Guided tours of the palace grounds and the Karambi Royal Tombs tell the story of the Batooro people and their monarchy, restored after Uganda's kingdoms were reinstated in the 1990s.",
      "Cultural performances, drumming and traditional dance can be arranged for groups, offering an intimate window into Toro heritage that pairs naturally with an evening at Ridge Hotel's gardens.",
    ],
    image: media.toro[0],
    gallery: [media.toro[1], media.gardenEntrance[0]],
    distance: "2.5km from Ridge Hotel",
    duration: "2–3 hours",
    bestFor: ["Culture seekers", "Families", "History lovers"],
    itinerary: [
      { time: "10:00", activity: "Depart Ridge Hotel for the Toro Palace" },
      { time: "10:20", activity: "Guided palace grounds tour" },
      { time: "11:15", activity: "Visit the Karambi Royal Tombs" },
      { time: "12:15", activity: "Return to Ridge Hotel for lunch" },
    ],
  },
  {
    slug: "amabere-caves",
    name: "Amabere Ga Nyinamwiru Caves",
    region: "Kabarole District",
    tagline: "The legend of the maiden's breasts, carved in stone",
    description:
      "A mythic cave system of stalactite formations and cascading waterfalls, tied to Toro legend, tucked in the hills a short drive from Fort Portal.",
    longDescription: [
      "The Amabere Ga Nyinamwiru caves take their name from a Toro legend of a princess whose severed breasts are said to have turned to stone, forming the stalactites that drip mineral-rich water inside the caves.",
      "Beyond the folklore, the site offers a beautiful short hike past a waterfall, through banana groves and into the cool interior of the caves — an easy, family-friendly outing that pairs well with a crater lake visit on the same day.",
    ],
    image: media.rainforest[1],
    gallery: [media.rainforest[0], media.rainforest[2]],
    distance: "10 minutes from Ridge Hotel",
    duration: "1–2 hours",
    bestFor: ["Families", "Culture seekers", "Short excursions"],
    itinerary: [
      { time: "15:00", activity: "Depart Ridge Hotel" },
      { time: "15:15", activity: "Guided walk to the waterfall and cave entrance" },
      { time: "16:00", activity: "Explore the cave interior and hear the legend" },
      { time: "16:45", activity: "Return to Ridge Hotel in time for sunset drinks" },
    ],
  },
  {
    slug: "birdwatching-semuliki",
    name: "Birdwatching & Semuliki Valley",
    region: "Semuliki National Park",
    tagline: "Central African rainforest birds at the edge of the Rift",
    description:
      "An Albertine Rift birding paradise with over 400 recorded species, hot springs, and lowland forest more typical of the Congo Basin than East Africa.",
    longDescription: [
      "Semuliki National Park sits within the Albertine Rift Valley and shares its lowland rainforest character with the Ituri Forest of the Congo Basin, hosting bird species found nowhere else in East Africa.",
      "Guided walks lead to the Sempaya hot springs, where boiling geothermal water bubbles up through the forest floor, and along forest trails where guides help spot hornbills, the elusive Shoebill in nearby wetlands, and a chorus of forest specialities.",
      "Ridge Hotel's own gardens are themselves a gentle introduction to Ugandan birdlife, hosting sunbirds and weavers year-round for guests who prefer to start close to home.",
    ],
    image: media.birds[2],
    gallery: [media.birds[0], media.birds[1]],
    distance: "1.5 hours from Ridge Hotel",
    duration: "Full day",
    bestFor: ["Birdwatchers", "Nature lovers", "Photographers"],
    itinerary: [
      { time: "06:00", activity: "Early departure with packed breakfast" },
      { time: "08:00", activity: "Guided birding walk toward Sempaya hot springs" },
      { time: "12:30", activity: "Picnic lunch by the springs" },
      { time: "14:00", activity: "Afternoon forest trail and return transfer" },
      { time: "18:00", activity: "Arrive back at Ridge Hotel" },
    ],
  },
  {
    slug: "coffee-tours",
    name: "Rwenzori Coffee Tours",
    region: "Kabarole Highlands",
    tagline: "From red cherry to your morning cup",
    description:
      "Smallholder Arabica farms on the Rwenzori foothills offer hands-on tours from picking to roasting, supporting the cooperatives that supply Fort Portal's celebrated coffee.",
    longDescription: [
      "The foothills around Fort Portal produce some of Uganda's most sought-after Arabica coffee, grown by smallholder farmers organised into cooperatives that export to specialty roasters worldwide.",
      "A coffee tour takes guests into the gardens to hand-pick ripe cherries, through the pulping and drying process, to a final roasting and cupping session — a full sensory journey best finished with a cup brewed at altitude, overlooking the very hills where it grew.",
    ],
    image: media.coffee[1],
    gallery: [media.coffee[0], media.coffee[2]],
    distance: "20 minutes from Ridge Hotel",
    duration: "Half-day",
    bestFor: ["Coffee lovers", "Culture seekers", "Couples"],
    itinerary: [
      { time: "09:00", activity: "Depart Ridge Hotel for a smallholder cooperative" },
      { time: "09:30", activity: "Hand-pick ripe coffee cherries with local farmers" },
      { time: "10:30", activity: "Pulping, drying and roasting demonstration" },
      { time: "11:30", activity: "Cupping session and tasting" },
      { time: "12:30", activity: "Return to Ridge Hotel" },
    ],
  },
];

export function getExperienceBySlug(slug: string) {
  return experiences.find((experience) => experience.slug === slug);
}
