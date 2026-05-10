"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AiPost } from "@/lib/ai-posts";
import { deletePost, listPosts, resetToSeed } from "@/lib/admin/posts-store";

export default function AdminPostsList() {
  const [posts, setPosts] = useState<AiPost[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const refresh = () => setPosts(listPosts());

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = (slug: string) => {
    deletePost(slug);
    refresh();
    setConfirmDelete(null);
  };

  const handleReset = () => {
    if (!confirm("로컬 변경사항을 모두 초기화하고 시드 데이터로 되돌립니다. 진행할까요?"))
      return;
    resetToSeed();
    refresh();
  };

  return (
    <div className="p-8 max-w-6xl">
      <header className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">
            AI Board
          </p>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">AI 게시판</h1>
          <p className="text-neutral-500 text-sm">
            검색 엔진과 AI가 참고하는 자료를 관리합니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-sm font-bold hover:bg-neutral-50 transition-colors"
          >
            시드로 초기화
          </button>
          <Link
            href="/admin/posts/new"
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            새 글 작성
          </Link>
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-bold text-neutral-600 uppercase tracking-wider">
                제목
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-neutral-600 uppercase tracking-wider hidden md:table-cell">
                카테고리
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-neutral-600 uppercase tracking-wider hidden md:table-cell">
                수정일
              </th>
              <th className="text-right px-6 py-3 text-xs font-bold text-neutral-600 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-neutral-400 text-sm">
                  아직 글이 없습니다. <Link href="/admin/posts/new" className="text-primary underline">새 글 작성</Link>
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.slug} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/posts/${post.slug}/edit`}
                      className="font-medium text-neutral-900 hover:text-primary transition-colors line-clamp-1"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                      /ai-content/{post.slug}
                    </p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500 hidden md:table-cell">
                    {post.updatedAt}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Link
                        href={`/ai-content/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-neutral-400 hover:text-primary hover:bg-neutral-100 rounded transition-colors"
                        title="보기"
                      >
                        <span className="material-symbols-outlined text-base">launch</span>
                      </Link>
                      <Link
                        href={`/admin/posts/${post.slug}/edit`}
                        className="p-2 text-neutral-400 hover:text-primary hover:bg-neutral-100 rounded transition-colors"
                        title="수정"
                      >
                        <span className="material-symbols-outlined text-base">edit</span>
                      </Link>
                      <button
                        onClick={() => setConfirmDelete(post.slug)}
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="삭제"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-neutral-900 mb-2">글 삭제</h3>
            <p className="text-sm text-neutral-600 mb-6">
              <strong>{confirmDelete}</strong> 글을 삭제합니다. 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg font-bold hover:bg-neutral-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
