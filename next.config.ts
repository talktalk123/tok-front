import type { NextConfig } from "next";

const ALTERNATE_LINKS = [
  '</llms.txt>; rel="alternate"; type="text/markdown"',
  '</rss.xml>; rel="alternate"; type="application/rss+xml"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // 모든 페이지 공통: AI 발견성·검색 + 보안 헤더 일괄
        source: "/:path*",
        headers: [
          { key: "Content-Language", value: "ko-KR" },
          { key: "Link", value: ALTERNATE_LINKS },
          { key: "Vary", value: "Accept" },
          {
            key: "X-Robots-Tag",
            value:
              "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
          },
          // 보안 헤더 (IsAgentReady Security & Trust 카테고리)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
      {
        // Admin: 색인 금지 (robots.txt와 이중 안전장치)
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;
