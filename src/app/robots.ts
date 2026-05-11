import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const commonRules = {
    allow: "/",
    disallow: ["/admin", "/admin/"],
  };

  return {
    rules: [
      // Naver 크롤러 (Yeti) — 명시적으로 허용
      { userAgent: "Yeti", ...commonRules },
      // Google 등 모든 크롤러
      { userAgent: "*", ...commonRules },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
