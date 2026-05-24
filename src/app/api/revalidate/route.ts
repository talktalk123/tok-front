/**
 * POST /api/revalidate?path=/about
 * admin이 페이지 저장 성공 후 호출 → 해당 공개 경로 ISR 캐시 즉시 무효화.
 * 인증: admin JWT를 그대로 전달받아 백엔드 보호 엔드포인트로 검증(캐시 버스트 한정, best-effort).
 */
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  if (!path || !path.startsWith("/")) {
    return NextResponse.json({ error: "유효한 path 쿼리가 필요합니다." }, { status: 400 });
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  // 토큰 유효성 검증 — 백엔드 보호 엔드포인트 호출(가벼운 GET)
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/content/pages`, {
        headers: { Authorization: auth },
        cache: "no-store",
      });
      if (!res.ok) {
        return NextResponse.json({ error: "토큰이 유효하지 않습니다." }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: "검증 실패" }, { status: 503 });
    }
  }

  revalidatePath(path, "page");
  return NextResponse.json({ revalidated: true, path });
}
