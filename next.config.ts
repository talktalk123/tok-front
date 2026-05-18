import type { NextConfig } from "next";

const ALTERNATE_LINKS = [
  '</llms.txt>; rel="alternate"; type="text/markdown"',
  '</rss.xml>; rel="alternate"; type="application/rss+xml"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

// 사용하지 않는 브라우저 기능을 명시적으로 거부 (=()는 모든 origin 거부)
const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "ambient-light-sensor=()",
  "autoplay=()",
  "battery=()",
  "camera=()",
  "display-capture=()",
  "fullscreen=(self)",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "picture-in-picture=()",
  "publickey-credentials-get=()",
  "screen-wake-lock=()",
  "sync-xhr=()",
  "usb=()",
  "web-share=(self)",
  "xr-spatial-tracking=()",
  "interest-cohort=()",
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
  // /favicon.ico 직접 요청 (네이버 봇·크롤러)에 PNG 서빙
  // 네이버는 HTML <link rel="icon"> 무시하고 /favicon.ico 만 가져감
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/talkmedia-black.png" },
    ];
  },
  async headers() {
    return [
      {
        // 모든 페이지 공통: AI 발견성·검색 + 보안 헤더 일괄
        source: "/:path*",
        headers: [
          { key: "Content-Language", value: "ko-KR" },
          { key: "Link", value: ALTERNATE_LINKS },
          {
            key: "Vary",
            value:
              "Accept, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch",
          },
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
          { key: "Permissions-Policy", value: PERMISSIONS_POLICY },
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
