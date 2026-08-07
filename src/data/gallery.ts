import { media } from "./media";

export const galleryCategories = [
  "All",
  "Property",
  "Scenery",
  "Gardens",
  "Weddings",
  "Interiors",
  "Rooms",
  "Dining",
  "Events",
] as const;

export const galleryImages = [
  // Rooms & Interiors
  { src: "/images/family-twin-room.jpg", alt: "Family Twin Room with Double Beds", category: "Rooms" },
  { src: "/images/garden-deluxe-room.jpg", alt: "Garden Deluxe Room Interior", category: "Rooms" },
  { src: "/images/711A6613.JPG", alt: "Rwenzori Balcony Room Bed Setup", category: "Rooms" },
  { src: "/images/executive-suite.jpg", alt: "Executive Suite Master Bed & Lounge", category: "Rooms" },
  { src: media.rooms[0], alt: "Rwenzori Balcony Room Interior", category: "Rooms" },
  { src: media.lobby[0], alt: "Ridge Hotel Lobby Lounge Seating", category: "Interiors" },

  // Dining
  { src: media.dining[0], alt: "Candlelit Dinner Table on the Terrace", category: "Dining" },
  { src: media.dining[1], alt: "Ridge Terrace Restaurant", category: "Dining" },
  { src: media.dining[3], alt: "Signature Cocktail at The Ridge Bar", category: "Dining" },
  { src: media.dining[4], alt: "Private Garden Dining Setup", category: "Dining" },

  // Weddings & Events
  { src: "/images/711A6651.JPG", alt: "Ridge Hotel Event & Garden Space", category: "Weddings" },
  { src: "/images/711A6664.JPG", alt: "Garden Event Setup Area", category: "Weddings" },
  { src: "/images/711A6715.JPG", alt: "Ridge Hotel Event Lawn", category: "Weddings" },
  { src: "/images/711A6719.JPG", alt: "Outdoor Celebration Area", category: "Weddings" },
  { src: "/images/711A6722.JPG", alt: "Garden Wedding Lawn Setting", category: "Weddings" },
  { src: "/images/711A6738.JPG", alt: "Garden Wedding Reception Setting", category: "Weddings" },
  { src: media.weddings[2], alt: "Terraced Garden Lawn Set for Celebrations", category: "Weddings" },
  { src: media.conference[1], alt: "Conference Hall Set for an Event", category: "Events" },

  // Property & Architecture
  { src: "/images/711A6450.JPG", alt: "The Ridge Hotel Grounds & Architecture", category: "Property" },
  { src: "/images/711A6488.JPG", alt: "Ridge Hotel Property Landscape", category: "Property" },
  { src: "/images/711A6518.JPG", alt: "Ridge Hotel Exterior Detail", category: "Property" },
  { src: "/images/711A6558.JPG", alt: "Ridge Hotel Courtyard View", category: "Property" },
  { src: "/images/711A6611.JPG", alt: "Ridge Hotel Exterior View", category: "Property" },
  { src: "/images/711A6656.JPG", alt: "Property Grounds View", category: "Property" },
  { src: "/images/711A6737.JPG", alt: "Ridge Hotel Exterior & Grounds", category: "Property" },

  // Gardens
  { src: "/images/711A6476.JPG", alt: "Lush Hotel Gardens & Surroundings", category: "Gardens" },
  { src: "/images/711A6484.JPG", alt: "Ridge Hotel Outdoor Ambiance", category: "Gardens" },
  { src: "/images/711A6510.JPG", alt: "Ridge Hotel Terrace & Garden Walkway", category: "Gardens" },
  { src: "/images/711A6519.JPG", alt: "Hotel Garden Pathway & Flora", category: "Gardens" },
  { src: "/images/711A6536.JPG", alt: "Ridge Hotel Outdoor Seating & Views", category: "Gardens" },
  { src: "/images/711A6547.JPG", alt: "Hotel Garden Courtyard", category: "Gardens" },
  { src: "/images/711A6554.JPG", alt: "Relaxing Garden View", category: "Gardens" },
  { src: "/images/711A6562.JPG", alt: "Charming Garden Spot", category: "Gardens" },
  { src: "/images/711A6592.JPG", alt: "Hotel Grounds & Nature", category: "Gardens" },
  { src: "/images/711A6594.JPG", alt: "Beautiful Garden Setting", category: "Gardens" },
  { src: "/images/711A6619.JPG", alt: "Hotel Garden Walkway", category: "Gardens" },
  { src: "/images/711A6641.JPG", alt: "Ridge Hotel Scenic Lawn", category: "Gardens" },
  { src: "/images/711A6669.JPG", alt: "Lush Lawn & Outdoor Space", category: "Gardens" },
  { src: "/images/711A6699.JPG", alt: "Garden Lawn Terrace", category: "Gardens" },
  { src: "/images/711A6746.JPG", alt: "Garden Entrance & Pathways", category: "Gardens" },
  { src: "/images/711A6757.JPG", alt: "Ridge Hotel Panoramic Lawn", category: "Gardens" },
  { src: media.gardenEntrance[0], alt: "Ridge Hotel Garden Pathway", category: "Gardens" },
  { src: media.palmLawn[0], alt: "Palm Lawn in the Gardens", category: "Gardens" },

  // Scenery
  { src: "/images/711A6466.JPG", alt: "The Ridge Hotel Scenic View", category: "Scenery" },
  { src: "/images/711A6534.JPG", alt: "Ridge Hotel Scenic Grounds", category: "Scenery" },
  { src: "/images/711A6548.JPG", alt: "Ridge Hotel Scenic Landscape", category: "Scenery" },
  { src: "/images/711A6572.JPG", alt: "Ridge Hotel Scenic Surroundings", category: "Scenery" },
  { src: "/images/711A6693.JPG", alt: "Ridge Terrace & View", category: "Scenery" },
  { src: "/images/711A6742.JPG", alt: "Scenic Ridge Viewpoint", category: "Scenery" },
  { src: media.rainforest[1], alt: "Amabere Ga Nyinamwiru Caves", category: "Scenery" },
  { src: media.toro[0], alt: "Karuzika Palace in Fort Portal", category: "Scenery" },
] as const;
