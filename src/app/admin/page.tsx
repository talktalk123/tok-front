"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listPosts } from "@/lib/admin/posts-store";

export default function AdminDashboard() {
  const [postCount, setPostCount] = useState(0);
  const [latest, setLatest] = useState<{ title: string; updatedAt: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const posts = await listPosts();
        if (cancelled) return;
        setPostCount(posts.length);
        if (posts.length > 0) {
          const sorted = [...posts].sort((a, b) =>
            b.updatedAt.localeCompare(a.updatedAt),
          );
          setLatest({ title: sorted[0].title, updatedAt: sorted[0].updatedAt });
        }
      } catch {
        // ignore — 인증 안 됐거나 백엔드 미연결
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="p-8 max-w-5xl">
      <header className="mb-10">
        <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">
          Dashboard
        </p>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">대시보드</h1>
        <p className="text-neutral-500">
          관리자 페이지에 오신 것을 환영합니다. 변경 사항은 즉시 백엔드 DB에 저장되며,
          공개 페이지는 짧은 캐시 주기(약 30초)로 반영됩니다.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl p-6 border border-neutral-200">
          <p className="text-xs text-neutral-500 mb-2 font-medium uppercase tracking-wider">
            AI 게시판 글
          </p>
          <p className="text-3xl font-black text-neutral-900 mb-1">{postCount}</p>
          <p className="text-xs text-neutral-400">개</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-neutral-200">
          <p className="text-xs text-neutral-500 mb-2 font-medium uppercase tracking-wider">
            마지막 수정
          </p>
          {latest ? (
            <>
              <p className="text-base font-bold text-neutral-900 mb-1 line-clamp-1">
                {latest.title}
              </p>
              <p className="text-xs text-neutral-400">{latest.updatedAt}</p>
            </>
          ) : (
            <p className="text-sm text-neutral-400">아직 글이 없습니다</p>
          )}
        </div>
        <div className="bg-primary-surface rounded-2xl p-6 border border-primary/20">
          <p className="text-xs text-primary mb-2 font-medium uppercase tracking-wider">
            저장 모드
          </p>
          <p className="text-base font-bold text-neutral-900 mb-1">백엔드 DB</p>
          <p className="text-xs text-neutral-600 leading-relaxed">
            모든 변경 사항이 즉시 운영 DB에 반영됩니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/posts"
          className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary transition-colors group"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-primary text-2xl">
              article
            </span>
            <h2 className="text-lg font-bold text-neutral-900">
              AI 게시판 관리
            </h2>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed">
            새 글 작성, 기존 글 수정·삭제. 검색 엔진과 AI가 참고하는 자료입니다.
          </p>
          <p className="mt-4 text-sm font-bold text-primary group-hover:underline">
            관리하기 →
          </p>
        </Link>
        <Link
          href="/admin/settings"
          className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary transition-colors group"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-primary text-2xl">
              settings
            </span>
            <h2 className="text-lg font-bold text-neutral-900">사이트 설정</h2>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed">
            전화·주소·진료시간·외부 링크 등 사이트 전역 설정을 관리합니다.
          </p>
          <p className="mt-4 text-sm font-bold text-primary group-hover:underline">
            관리하기 →
          </p>
        </Link>
      </div>
    </div>
  );
}
