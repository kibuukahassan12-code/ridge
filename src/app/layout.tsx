import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { site } from "@/data/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-elegant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ridge Hotel — Uganda's Premier Highland Retreat",
    template: "%s | Ridge Hotel Uganda",
  },
  description: site.description,
  keywords: [
    "Ridge Hotel Uganda",
    "Uganda luxury hotel",
    "Uganda tourism hotel",
    "Rwenzori Mountains hotel",
    "Uganda safari lodge",
    "Uganda highlands retreat",
    "Kibale chimpanzee tracking",
    "crater lakes Uganda",
    "Uganda tea estates",
    "Semuliki Hot Springs hotel",
    "Uganda 5 star hotel",
    "Pearl of Africa hotel",
  ],
  authors: [{ name: "Ridge Hotel" }],
  openGraph: {
    type: "website",
    locale: "en_UG",
    url: site.url,
    siteName: "Ridge Hotel Uganda",
    title: "Ridge Hotel — Uganda's Premier Highland Retreat",
    description: site.description,
    images: [
      {
        url: "/images/about-hotel.jpg",
        width: 1600,
        height: 1260,
        alt: "Ridge Hotel, Fort Portal, Uganda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ridge Hotel — Uganda's Premier Highland Retreat",
    description: site.description,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d2018",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Ridge Hotel",
    description: site.description,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: "Fort Portal",
      addressRegion: site.address.region,
      addressCountry: "UG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    numberOfRooms: site.roomCount,
    checkinTime: site.checkIn,
    checkoutTime: site.checkOut,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Conference Hall", value: true },
      { "@type": "LocationFeatureSpecification", name: "Garden Wedding Venue", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant & Bar", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "24-hour Security", value: true },
    ],
    sameAs: [site.social.facebook, site.social.instagram, site.social.twitter],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${playfair.variable}`}>
      <body className="bg-ivory-100 font-sans text-forest-950 antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
        <SmoothScroll>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-forest-950"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
