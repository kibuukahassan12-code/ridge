import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photography from Ridge Hotel — rooms, dining, gardens, weddings and the landscapes of Western Uganda.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero small image={media.lobby[1]} kicker="Gallery" title="Ridge Hotel, In Detail" />
      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
