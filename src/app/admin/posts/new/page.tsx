"use client";

import Link from "next/link";
import PostEditor from "@/components/admin/PostEditor";

export default function NewPostPage() {
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
        <h1 className="text-3xl font-bold text-neutral-900">새 글 작성</h1>
      </header>
      <PostEditor mode="create" />
    </div>
  );
}
