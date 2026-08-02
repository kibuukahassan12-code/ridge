import type { Metadata } from "next";
import CinematicHero from "@/components/home/CinematicHero";
import VideoShowcase from "@/components/home/VideoShowcase";
import WelcomeSection from "@/components/home/WelcomeSection";
import RoomsShowcase from "@/components/home/RoomsShowcase";
import DiningSection from "@/components/home/DiningSection";
import EventsSection from "@/components/home/EventsSection";
import PoolGardenSection from "@/components/home/PoolGardenSection";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import SagoPalmSection from "@/components/home/SagoPalmSection";
import PalmGardenSection from "@/components/home/PalmGardenSection";
import DiscoverSection from "@/components/home/DiscoverSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BookingCTA from "@/components/home/BookingCTA";

export const metadata: Metadata = {
  title: "Ridge Hotel — Basecamp for the Rwenzori Mountains & Kibale Forest",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <VideoShowcase />
      <WelcomeSection />
      <RoomsShowcase />
      <DiningSection />
      <EventsSection />
      <PoolGardenSection />
      <AmenitiesSection />
      <SagoPalmSection />
      <PalmGardenSection />
      <DiscoverSection />
      <TestimonialsSection />
      <BookingCTA />
    </>
  );
}
