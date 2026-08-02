import Image from "next/image";
import Container from "@/components/ui/Container";

export default function PageHero({
  image,
  kicker,
  title,
  copy,
  small,
}: {
  image: string;
  kicker: string;
  title: string;
  copy?: string;
  small?: boolean;
}) {
  return (
    <section className={`relative isolate flex items-end overflow-hidden ${small ? "h-[52vh] min-h-[420px]" : "h-[78vh] min-h-[560px]"}`}>
      <Image src={image} alt={title} fill priority sizes="100vw" quality={100} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/35 to-forest-950/55" />
      <Container className="relative pb-16 text-ivory-100 lg:pb-20">
        <p className="kicker text-gold-300">{kicker}</p>
        <h1 className="mt-5 max-w-3xl text-balance font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-medium leading-[1.04]">
          {title}
        </h1>
        {copy ? <p className="mt-5 max-w-xl text-lg text-ivory-100/85">{copy}</p> : null}
      </Container>
    </section>
  );
}
