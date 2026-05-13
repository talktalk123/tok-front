import type { NextConfig } from "next";

const ALTERNATE_LINKS = [
  '</llms.txt>; rel="alternate"; type="text/markdown"',
  '</rss.xml>; rel="alternate"; type="application/rss+xml"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // 모든 페이지 공통: 콘텐츠 언어 + 대체 리소스 링크 + 검색 결과 풀어주기
        source: "/:path*",
        headers: [
          { key: "Content-Language", value: "ko-KR" },
          { key: "Link", value: ALTERNATE_LINKS },
          {
            key: "X-Robots-Tag",
            value:
              "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
          },
        ],
      },
      {
        // Admin 영역: 색인 금지 (robots.txt와 이중 안전장치)
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;
