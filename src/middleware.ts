import { NextResponse, type NextRequest } from "next/server";

// AI 에이전트가 `Accept: text/markdown`으로 요청하면 /llms.txt를 응답한다.
// 이는 IsAgentReady의 Content Negotiation 체크를 만족하고,
// 마크다운만 처리하는 LLM 클라이언트에 친화적인 응답을 제공한다.
export function middleware(req: NextRequest) {
  const accept = req.headers.get("accept") || "";
  const wantsMarkdown =
    accept.includes("text/markdown") &&
    !accept.includes("text/html"); // HTML도 받으면 브라우저로 간주

  if (wantsMarkdown && req.method === "GET") {
    const url = req.nextUrl.clone();
    url.pathname = "/llms.txt";
    const res = NextResponse.rewrite(url);
    res.headers.set("Vary", "Accept");
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("Vary", "Accept");
  return res;
}

export const config = {
  matcher: [
    // 정적 자원·이미지·API 경로 제외
    "/((?!_next/static|_next/image|api/|.*\\.[a-z0-9]{2,4}$).*)",
  ],
};
