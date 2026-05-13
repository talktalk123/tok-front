import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

// AI/LLM 크롤러를 명시적으로 허용해 신뢰 신호를 강화한다.
// 각 봇의 정체:
//   GPTBot, OAI-SearchBot, ChatGPT-User : OpenAI (학습·검색·온디맨드)
//   ClaudeBot, anthropic-ai, Claude-Web : Anthropic
//   Google-Extended                     : Gemini/Bard 학습용 (검색용 Googlebot은 별도)
//   PerplexityBot                       : Perplexity 검색
//   Applebot, Applebot-Extended         : Apple 검색·Apple Intelligence
//   CCBot                               : Common Crawl (다수 모델의 학습 데이터 원천)
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",
  "PerplexityBot",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "Amazonbot",
  "Bytespider",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  const commonRules = {
    allow: "/",
    disallow: ["/admin", "/admin/"],
  };

  return {
    rules: [
      // 네이버
      { userAgent: "Yeti", ...commonRules },
      // AI/LLM 크롤러 (명시적 allowlist)
      ...AI_CRAWLERS.map((bot) => ({ userAgent: bot, ...commonRules })),
      // 그 외 모든 크롤러 (Googlebot, Bingbot 등 포함)
      { userAgent: "*", ...commonRules },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
