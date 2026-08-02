import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/ui/MagneticButton";
import { media } from "@/data/media";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden">
      <Image src={media.rainforest[1]} alt="Misty forest in Western Uganda" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-forest-950/75" />
      <Container className="relative text-center text-ivory-100">
        <p className="kicker justify-center text-gold-300">Error 404</p>
        <h1 className="mx-auto mt-6 max-w-xl text-balance font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05]">
          This Trail Doesn&apos;t Lead Anywhere
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-ivory-100/80">
          The page you&apos;re looking for may have wandered off into the forest. Let&apos;s guide you back to
          familiar ground.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <MagneticButton href="/" className="bg-gold-500 text-forest-950 hover:bg-gold-400">
            Return Home
          </MagneticButton>
          <MagneticButton href="/contact" variant="outline" className="border-ivory-100/40">
            Contact Us
          </MagneticButton>
        </div>
        <p className="mt-10 text-xs text-ivory-100/50">
          Looking for something specific?{" "}
          <Link href="/rooms" className="underline hover:text-gold-300">
            Browse rooms
          </Link>{" "}
          or{" "}
          <Link href="/experiences" className="underline hover:text-gold-300">
            discover Western Uganda
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
