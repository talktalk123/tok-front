import { apiFetchServer } from "@/lib/api/server";

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

interface BackendPost {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content: string;
  category: string;
  tags: string[];
  language: string;
  isPublished: boolean;
  metadata: unknown;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  authorId: number | null;
}

function toAiPost(p: BackendPost): AiPost {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary ?? "",
    content: p.content,
    category: p.category,
    tags: p.tags ?? [],
    language: p.language,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
  };
}

export async function getAllPosts(): Promise<AiPost[]> {
  const data = await apiFetchServer<BackendPost[]>(
    "/api/posts",
    { revalidate: 30, tags: ["posts"] },
  );
  if (!data) return [];
  return [...data]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map(toAiPost);
}

export async function getPostBySlug(
  slug: string,
): Promise<AiPost | undefined> {
  const data = await apiFetchServer<BackendPost>(
    `/api/posts/${slug}`,
    { revalidate: 30, tags: ["posts", `post:${slug}`] },
  );
  if (!data) return undefined;
  return toAiPost(data);
}
