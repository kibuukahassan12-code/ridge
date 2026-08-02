import { media } from "./media";

export const diningVenues = [
  {
    name: "The Ridge Terrace Restaurant",
    tagline: "Fort Portal on a plate",
    description:
      "Our all-day restaurant serves Ugandan classics and international favourites on a garden-facing terrace, built around produce sourced from the crater lake farms and Kibale's forest edge villages within a day's drive.",
    hours: "6:30 AM – 10:30 PM daily",
    image: media.dining[1],
  },
  {
    name: "The Ridge Bar",
    tagline: "Sundowners with a mountain view",
    description:
      "A separate bar block with a generous outdoor sitting area, full kitchen service and restrooms — the natural gathering point for guests to watch the Rwenzoris turn gold at sunset over a Nile Special or a Rwenzori coffee cocktail.",
    hours: "10:00 AM – Midnight",
    image: media.dining[3],
  },
  {
    name: "Private Garden Dining",
    tagline: "Your table, under the stars",
    description:
      "For anniversaries, proposals and special occasions, our team lays a private table in the gardens, lit by lanterns, for a bespoke set menu crafted with the executive chef.",
    hours: "By reservation",
    image: media.dining[0],
  },
] as const;

export const menuHighlights = [
  {
    category: "Breakfast",
    items: [
      "Rolex & Ugandan chapati with fresh avocado",
      "Rwenzori honey pancakes with seasonal fruit",
      "Full English with farm eggs and beef sausage",
      "Fresh crater lake-region fruit platter",
    ],
  },
  {
    category: "Ugandan Classics",
    items: [
      "Luwombo chicken steamed in banana leaf",
      "Grilled tilapia with matoke and groundnut sauce",
      "Toro-style goat stew with posho",
      "Sautéed nakati greens with smoked fish",
    ],
  },
  {
    category: "International",
    items: [
      "Wood-grilled beef tenderloin, pepper sauce",
      "Wild mushroom risotto, tea-estate herbs",
      "Fort Portal vegetable curry, basmati rice",
      "Grilled chicken breast, rosemary jus",
    ],
  },
  {
    category: "From the Bar",
    items: [
      "Rwenzori Sunrise (gin, passion fruit, ginger)",
      "Crater Lake Mule (vodka, lime, ginger beer)",
      "Toro Old Fashioned (Ugandan waragi, bitters)",
      "Fresh tea-estate iced tea, hibiscus cooler",
    ],
  },
] as const;
