import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { posts } from "@/data/blog";
import { media } from "@/data/media";

export const metadata: Metadata = {
  title: "Journal",
  description: "Travel guides, itineraries and stories from Ridge Hotel and Western Uganda.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero small image="/images/blog-hero.png" kicker="Journal" title="Stories From the Ridge" />
      <section className="bg-ivory-100 py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} index={i}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={post.image} alt={post.title} fill sizes="(min-width:768px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-widest text-gold-600">{post.category}</p>
                <h2 className="mt-2 font-display text-xl leading-snug text-forest-950">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-forest-800/70">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
