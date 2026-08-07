import Image from "next/image";
import Container from "@/components/ui/Container";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { site } from "@/data/site";

export default function WelcomeSection() {
  return (
    <section className="relative bg-ivory-100 py-28 lg:py-36">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <Kicker className="text-gold-600">Welcome to Ridge Hotel</Kicker>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-6 text-balance font-display text-[clamp(2.2rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-forest-950">
              Uganda's Gateway to the Rwenzoris
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-800/80">
              Perched at an altitude of 1,523 metres in the highlands of Western Uganda, Ridge Hotel is your finest base for exploring the Pearl of Africa. Our {site.roomCount} rooms each open onto a private balcony facing the snow-capped Rwenzori Mountains — Uganda's rooftop, visible from your bed. This is where comfort meets the wild, and every morning begins with a view that reminds you why Uganda is like no other place on earth.
            </p>
          </Reveal>
          <Reveal index={3}>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-forest-800/80">
              Two and a half kilometres from the Toro Kingdom Palace — the royal residence of King Oyo Nyimba Kabamba Iguru Rukidi IV, the youngest ruling monarch in the world — Ridge Hotel is the natural crossing point for all of Uganda's Western treasures. Chimpanzees, volcanic crater lakes, organic tea estates, and the legendary Rwenzori glaciers are all within reach. For many guests, the hotel becomes the favourite part of the journey.
            </p>
          </Reveal>
          <Reveal index={4}>
            <div className="mt-6 max-w-xl rounded-2xl border border-gold-500/30 bg-ivory-100 p-6">
              <p className="text-lg leading-relaxed text-forest-800/80">
                <span className="font-medium text-forest-950">Ridge is the only place in the world</span> where you can observe the natural border — the Rwenzori Mountains Range — of two countries, Uganda and the Democratic Republic of Congo, for hundreds of kilometres from the comfort of your room. The hotel has a spectacular view of the range from Bundibugyo to Kasese, and even the highest snow peak, Margherita, can be seen when the weather is clear. The other side of the Rwenzoris is the DRC.
              </p>
            </div>
          </Reveal>
          <Reveal index={5} className="mt-10 flex flex-wrap items-center gap-6">
            <MagneticButton href="/about" variant="ghost" className="!px-0 !py-0 text-forest-950">
              Our Story →
            </MagneticButton>
            <div className="h-8 w-px bg-forest-800/20" />
            <div className="flex gap-10">
              <Stat label="Guest Rooms" value={`${site.roomCount}`} />
              <Stat label="Altitude" value="1,523m" />
              <Stat label="To Toro Palace" value="2.5km" />
            </div>
          </Reveal>
        </div>

        <Reveal variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
            <Image
              src="/images/711A6738.JPG"
              alt="Ridge Hotel entrance sign framed by palm trees"
              fill
              quality={100}
              sizes="(min-width: 1280px) 45vw, (min-width: 768px) 50vw, 100vw"
              className="cursor-zoom-in object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/30 to-transparent" />
            <div className="pointer-events-none absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-5 text-ivory-100">
              <p className="font-display text-2xl italic">&ldquo;Comfort and Class&rdquo;</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-ivory-100/70">Est. {site.founded}, Western Uganda</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-3xl text-forest-950">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wider text-forest-800/60">{label}</p>
    </div>
  );
}