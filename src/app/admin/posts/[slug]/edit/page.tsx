"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import type { AiPost } from "@/lib/ai-posts";
import { getPost } from "@/lib/admin/posts-store";
import PostEditor from "@/components/admin/PostEditor";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);
  const [post, setPost] = useState<AiPost | null | undefined>(undefined);

  useEffect(() => {
    const found = getPost(slug);
    setPost(found ?? null);
  }, [slug]);

  if (post === undefined) {
    return <div className="p-8 text-neutral-400">로딩 중...</div>;
  }

  if (post === null) {
    return (
      <div className="p-8 max-w-2xl">
        <p className="text-neutral-700 mb-4">
          <strong>{slug}</strong> 글을 찾을 수 없습니다.
        </p>
        <button
          onClick={() => router.push("/admin/posts")}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold"
        >
          목록으로
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <header className="mb-6">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-primary mb-3"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          AI 게시판
        </Link>
        <h1 className="text-3xl font-bold text-neutral-900">글 수정</h1>
        <p className="text-sm text-neutral-500 mt-1">{post.slug}</p>
      </header>
      <PostEditor mode="edit" initial={post} />
    </div>
  );
}
