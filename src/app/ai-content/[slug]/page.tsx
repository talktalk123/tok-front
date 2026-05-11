import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/ai-posts";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 30;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_CONFIG.url}/ai-content/${post.slug}`;
  return {
    title: `${post.title} | ${SITE_CONFIG.name}`,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AiPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_CONFIG.url}/ai-content/${post.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    inLanguage: post.language,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "MedicalBusiness",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
      address: {
        "@type": "PostalAddress",
        ...SITE_CONFIG.address,
      },
    },
  };

  return (
    <main className="bg-white text-neutral-900 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <nav className="mb-8 text-sm text-neutral-500">
          <Link href="/ai-content" className="hover:text-primary">
            ← AI 참고 자료
          </Link>
        </nav>

        <article>
          <header className="mb-10 pb-6 border-b border-neutral-200">
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-neutral-500">
              <time dateTime={post.publishedAt}>발행: {post.publishedAt}</time>
              {post.publishedAt !== post.updatedAt && (
                <>
                  <span aria-hidden>·</span>
                  <time dateTime={post.updatedAt}>수정: {post.updatedAt}</time>
                </>
              )}
              <span aria-hidden>·</span>
              <span className="uppercase tracking-wide">{post.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-neutral-600 leading-relaxed">{post.summary}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <div
            className="prose prose-neutral max-w-none [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-3 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul>li]:mb-1 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ol>li]:mb-1 [&_a]:text-primary [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <footer className="mt-16 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 leading-relaxed">
            출처: {SITE_CONFIG.name} ({SITE_CONFIG.phone}) · {SITE_CONFIG.address.addressRegion}{" "}
            {SITE_CONFIG.address.addressLocality} {SITE_CONFIG.address.streetAddress}
          </p>
        </footer>
      </div>
    </main>
  );
}
