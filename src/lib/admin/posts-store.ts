"use client";

import seed from "@/data/ai-posts.json";
import type { AiPost } from "@/lib/ai-posts";

const STORAGE_KEY = "tok_admin_posts_v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function loadAll(): AiPost[] {
  if (!isBrowser()) return seed.posts as AiPost[];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = seed.posts as AiPost[];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(raw) as AiPost[];
  } catch {
    return seed.posts as AiPost[];
  }
}

function saveAll(posts: AiPost[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function listPosts(): AiPost[] {
  return [...loadAll()].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getPost(slug: string): AiPost | undefined {
  return loadAll().find((p) => p.slug === slug);
}

export function createPost(post: AiPost): void {
  const all = loadAll();
  if (all.some((p) => p.slug === post.slug)) {
    throw new Error(`이미 같은 slug가 있습니다: ${post.slug}`);
  }
  saveAll([post, ...all]);
}

export function updatePost(originalSlug: string, post: AiPost): void {
  const all = loadAll();
  const idx = all.findIndex((p) => p.slug === originalSlug);
  if (idx === -1) throw new Error(`글을 찾을 수 없습니다: ${originalSlug}`);
  if (
    originalSlug !== post.slug &&
    all.some((p, i) => i !== idx && p.slug === post.slug)
  ) {
    throw new Error(`이미 같은 slug가 있습니다: ${post.slug}`);
  }
  all[idx] = post;
  saveAll(all);
}

export function deletePost(slug: string): void {
  const all = loadAll();
  const next = all.filter((p) => p.slug !== slug);
  if (next.length === all.length) {
    throw new Error(`글을 찾을 수 없습니다: ${slug}`);
  }
  saveAll(next);
}

export function resetToSeed(): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(seed.posts as AiPost[]),
  );
}

export function exportPostsJson(): string {
  return JSON.stringify({ posts: loadAll() }, null, 2);
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
