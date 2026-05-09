import postsData from "@/data/ai-posts.json";

export interface AiPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  language: string;
  publishedAt: string;
  updatedAt: string;
}

export function getAllPosts(): AiPost[] {
  return [...postsData.posts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getPostBySlug(slug: string): AiPost | undefined {
  return postsData.posts.find((p) => p.slug === slug);
}
