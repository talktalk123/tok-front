import { getAllPosts } from "@/lib/ai-posts";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 60;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface FeedItem {
  title: string;
  url: string;
  description: string;
  pubDate: string;
}

const STATIC_PUBDATE = new Date("2026-05-01T00:00:00Z").toUTCString();

export async function GET() {
  const baseUrl = SITE_CONFIG.url;
  const buildDate = new Date().toUTCString();

  const staticItems: FeedItem[] = [
    {
      title: `${SITE_CONFIG.name} 소개`,
      url: `${baseUrl}/about`,
      description:
        "이기홍 원장 소개, 진료 철학, 학력·강의·저서·수상 이력. 경희대학교 한의과대학 졸업.",
      pubDate: STATIC_PUBDATE,
    },
    {
      title: "한약 진료 안내",
      url: `${baseUrl}/medicine`,
      description:
        "맥진·설진·복진 기반 맞춤한약. 보충·순환·배출 방향을 구분해 처방, 자세한 한약 설명서 제공.",
      pubDate: STATIC_PUBDATE,
    },
    {
      title: "추나·통증 진료 안내",
      url: `${baseUrl}/chuna`,
      description:
        "척추도인안교요법 기반 추나, 침·약침, 집중형·방사형 체외충격파, 자기장치료.",
      pubDate: STATIC_PUBDATE,
    },
    {
      title: "교통사고 진료 안내",
      url: `${baseUrl}/car-accident`,
      description:
        "자동차보험 진료, 사고접수번호 안내, 사고 후 목·허리 통증·두통·어깨 결림·몸살 회복.",
      pubDate: STATIC_PUBDATE,
    },
    {
      title: "피부미용 진료 안내",
      url: `${baseUrl}/beauty`,
      description:
        "스킨부스터(PN/PDRN, 엑소좀, 히알루론산), 롱펄스·큐스위치·피코·CO2 레이저, 니들RF, HIFU.",
      pubDate: STATIC_PUBDATE,
    },
    {
      title: "진료 안내 (시간·위치·주차)",
      url: `${baseUrl}/how-to-come`,
      description:
        "평일 09:00~20:00, 토요일 09:00~14:00, 공휴일 09:00~13:00. 경기도 광주시 파발로 187 세양빌딩 2층.",
      pubDate: STATIC_PUBDATE,
    },
  ];

  const posts = await getAllPosts();
  const postItems: FeedItem[] = posts.map((p) => ({
    title: p.title,
    url: `${baseUrl}/ai-content/${p.slug}`,
    description: p.summary,
    pubDate: new Date(p.publishedAt).toUTCString(),
  }));

  const allItems = [...postItems, ...staticItems];

  const items = allItems
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.url}</guid>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)} 새 소식</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
