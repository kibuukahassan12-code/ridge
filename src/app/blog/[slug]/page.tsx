import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getPostBySlug, posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { images: [{ url: post.image }] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <section className="relative isolate flex h-[56vh] min-h-[420px] items-end overflow-hidden">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-forest-950/50" />
        <Container className="relative pb-14 text-ivory-100">
          <Link href="/blog" className="text-xs uppercase tracking-widest text-gold-300 hover:text-gold-200">
            ← Journal
          </Link>
          <p className="kicker mt-4 text-gold-300">{post.category}</p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.08]">
            {post.title}
          </h1>
        </Container>
      </section>

      <section className="bg-ivory-100 py-20">
        <Container className="mx-auto max-w-2xl">
          {post.body.map((p, i) => (
            <Reveal key={i} index={i}>
              <p className="mt-6 text-lg leading-relaxed text-forest-800/80">{p}</p>
            </Reveal>
          ))}
          <Reveal index={post.body.length} className="mt-12 border-t border-stone-400/30 pt-8">
            <Link href="/experiences" className="text-sm font-semibold uppercase tracking-widest text-gold-600 hover:text-gold-700">
              Explore Related Experiences →
            </Link>
          </Reveal>
        </Container>
      </section>
    </article>
  );
}
