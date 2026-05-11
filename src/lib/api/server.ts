/**
 * 서버에서 백엔드 API를 호출할 때 사용. ISR/SSG에서 fetch 캐시 + revalidate 활용.
 * 인증이 필요 없는 공개 엔드포인트만 호출.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

interface ServerFetchOptions {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
}

export async function apiFetchServer<T = unknown>(
  path: string,
  options: ServerFetchOptions = {},
): Promise<T | null> {
  if (!API_BASE) {
    console.error(
      "[apiFetchServer] NEXT_PUBLIC_API_URL이 설정되어 있지 않습니다.",
    );
    return null;
  }

  const { revalidate = 30, tags, cache } = options;
  const url = `${API_BASE}${path}`;

  try {
    const res = await fetch(url, {
      ...(cache && { cache }),
      next: {
        revalidate,
        ...(tags && { tags }),
      },
    });

    if (res.status === 404) return null;
    if (!res.ok) {
      console.error(
        `[apiFetchServer] ${path} → HTTP ${res.status}`,
      );
      return null;
    }

    return (await res.json()) as T;
  } catch (e) {
    console.error(`[apiFetchServer] ${path} 호출 실패`, e);
    return null;
  }
}
