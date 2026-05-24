/**
 * 공개 페이지 서버 로더 — Server Component 전용.
 * 백엔드 공개 엔드포인트(/api/content/public/pages/:slug)를 ISR 캐시로 조회한다.
 */
import { apiFetchServer } from "@/lib/api/server";
import type { CmsPage } from "./blocks";

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  return apiFetchServer<CmsPage>(`/api/content/public/pages/${slug}`, {
    revalidate: 60,
    tags: ["page", `page:${slug}`],
  });
}
