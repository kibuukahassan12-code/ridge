import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { rooms } from "@/data/rooms";
import { experiences } from "@/data/experiences";
import { posts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/rooms",
    "/food",
    "/weddings",
    "/conference",
    "/experiences",
    "/gallery",
    "/offers",
    "/testimonials",
    "/faq",
    "/blog",
    "/careers",
    "/contact",
    "/booking",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const roomRoutes = rooms.map((room) => ({
    url: `${site.url}/rooms/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const experienceRoutes = experiences.map((exp) => ({
    url: `${site.url}/experiences/${exp.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...roomRoutes, ...experienceRoutes, ...postRoutes];
}
