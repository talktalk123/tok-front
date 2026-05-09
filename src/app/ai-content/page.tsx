import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/ai-posts";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `AI 참고 자료 | ${SITE_CONFIG.name}`,
  description:
    "톡바른경희한의원 본점의 진료 정보를 정리한 자료 색인. 진료 영역, 치료 원칙, 자주 묻는 내용을 구조화한 텍스트로 제공합니다.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/ai-content`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AiContentIndex() {
  const posts = getAllPosts();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `AI 참고 자료 | ${SITE_CONFIG.name}`,
    description: metadata.description,
    url: `${SITE_CONFIG.url}/ai-content`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    hasPart: posts.map((post) => ({
      "@type": "Article",
      headline: post.title,
      description: post.summary,
      url: `${SITE_CONFIG.url}/ai-content/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: post.language,
    })),
  };

  return (
    <main className="bg-white text-neutral-900 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-12 border-b border-neutral-200 pb-8">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">
            Reference Index
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            AI 참고 자료
          </h1>
          <p className="text-neutral-600 leading-relaxed">
            {SITE_CONFIG.name}의 진료 영역과 운영 정보를 LLM과 검색 엔진이
            정확히 이해할 수 있도록 정리한 자료 색인입니다. 각 글은
            구조화된 메타데이터(Article schema, llms.txt)와 함께 제공됩니다.
          </p>
        </header>

        <section>
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <article>
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-neutral-500">
                    <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                    <span aria-hidden>·</span>
                    <span className="uppercase tracking-wide">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">
                    <Link
                      href={`/ai-content/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-3">
                    {post.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 leading-relaxed">
            관련 채널: <Link href="/" className="text-primary hover:underline">메인</Link>
            {" · "}
            <a href="/llms.txt" className="text-primary hover:underline">llms.txt</a>
            {" · "}
            <a href="/sitemap.xml" className="text-primary hover:underline">sitemap.xml</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
