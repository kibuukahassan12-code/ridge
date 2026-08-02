import { Camera, Wifi } from "lucide-react";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";

const amenities = [
  {
    icon: Wifi,
    title: "Free 5G Cable WiFi",
    copy: "High-speed 5G cable WiFi is available everywhere at Ridge Hotel — in every room, across the gardens, and throughout all public areas. Stay connected whether you're working from your balcony or sharing your crater lake photos in real time.",
  },
  {
    icon: Camera,
    title: "24/7 CCTV Security",
    copy: "Your safety is our priority. CCTV cameras are installed throughout the property to enhance security for all guests, giving you complete peace of mind from arrival to departure.",
  },
];

export default function AmenitiesSection() {
  return (
    <section className="bg-ivory-100 py-28 lg:py-36">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Kicker className="justify-center text-gold-600">Stay Connected, Stay Secure</Kicker>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-forest-950">
              Modern Comforts, Complete Peace of Mind
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {amenities.map((amenity, i) => (
            <Reveal key={amenity.title} index={i + 2}>
              <div className="h-full rounded-2xl border border-forest-800/10 bg-ivory-200/60 p-8">
                <amenity.icon className="h-8 w-8 text-gold-600" aria-hidden />
                <h3 className="mt-5 font-display text-2xl text-forest-950">{amenity.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-forest-800/75">{amenity.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}