"use client";

import { apiFetch } from "@/lib/api/client";
import type { AiPost } from "@/lib/ai-posts";

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

function fromBackend(p: BackendPost): AiPost {
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

interface PostPayload {
  slug: string;
  title: string;
  summary?: string;
  content: string;
  category: string;
  tags?: string[];
  language?: string;
  publishedAt?: string;
  isPublished?: boolean;
}

function toPayload(post: AiPost): PostPayload {
  return {
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    content: post.content,
    category: post.category,
    tags: post.tags,
    language: post.language,
    publishedAt: post.publishedAt,
  };
}

export async function listPosts(): Promise<AiPost[]> {
  const data = await apiFetch<BackendPost[]>("/api/posts/admin");
  return data.map(fromBackend);
}

export async function getPost(slug: string): Promise<AiPost | undefined> {
  try {
    const data = await apiFetch<BackendPost>(`/api/posts/${slug}`);
    return fromBackend(data);
  } catch {
    return undefined;
  }
}

export async function createPost(post: AiPost): Promise<void> {
  await apiFetch("/api/posts", {
    method: "POST",
    body: toPayload(post),
  });
}

export async function updatePost(
  originalSlug: string,
  post: AiPost,
): Promise<void> {
  await apiFetch(`/api/posts/${originalSlug}`, {
    method: "PATCH",
    body: toPayload(post),
  });
}

export async function deletePost(slug: string): Promise<void> {
  await apiFetch(`/api/posts/${slug}`, { method: "DELETE" });
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
