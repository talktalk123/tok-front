import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/ai-posts";
import { SITE_CONFIG } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/medicine`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/chuna`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/car-accident`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/beauty`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/how-to-come`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/ai-content`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/ai-content/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes];
}
