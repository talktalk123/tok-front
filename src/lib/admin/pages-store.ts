"use client";

import { apiFetch, getToken } from "@/lib/api/client";
import type { BlockType, CmsBlock, PageSeo } from "@/lib/cms/blocks";

export interface AdminPageSummary {
  slug: string;
  displayName: string;
  theme: { seo?: PageSeo } & Record<string, unknown>;
}

export interface AdminBlock extends CmsBlock {
  pageSlug?: string;
  visible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminPage {
  slug: string;
  displayName: string;
  theme: { seo?: PageSeo } & Record<string, unknown>;
  blocks: AdminBlock[];
}

export interface SavePagePayload {
  displayName?: string;
  theme?: { seo?: PageSeo } & Record<string, unknown>;
  blocks: { type: BlockType; data: unknown; visible: boolean }[];
}

/** 페이지 목록 (admin) */
export function listPages(): Promise<AdminPageSummary[]> {
  return apiFetch<AdminPageSummary[]>("/api/content/pages");
}

/** 편집용 페이지 + 전체 블록 (숨김 포함) */
export function getPageForEdit(slug: string): Promise<AdminPage> {
  return apiFetch<AdminPage>(`/api/content/pages/${slug}`);
}

/** 블록 전체 일괄 저장 */
export async function savePage(slug: string, payload: SavePagePayload): Promise<AdminPage> {
  const result = await apiFetch<AdminPage>(`/api/content/pages/${slug}`, {
    method: "PUT",
    body: payload,
  });
  // 저장 성공 후 공개 페이지 ISR 캐시 무효화 (best-effort)
  await revalidatePage(slug);
  return result;
}

/** 공개 페이지 캐시 무효화 (Next 라우트, same-origin) */
async function revalidatePage(slug: string): Promise<void> {
  const token = getToken();
  if (!token) return;
  const path = slug === "home" ? "/" : `/${slug}`;
  try {
    await fetch(`/api/revalidate?path=${encodeURIComponent(path)}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    /* 캐시 무효화 실패는 치명적이지 않음 (최대 60s 후 자동 갱신) */
  }
}
