"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listPages, type AdminPageSummary } from "@/lib/admin/pages-store";

function publicPath(slug: string) {
  return slug === "home" ? "/" : `/${slug}`;
}

export default function AdminPagesListPage() {
  const [pages, setPages] = useState<AdminPageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listPages()
      .then(setPages)
      .catch((e) => setError(e instanceof Error ? e.message : "불러오기 실패"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-4xl">
      <header className="mb-8">
        <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">CMS</p>
        <h1 className="text-2xl font-bold text-neutral-900">페이지 관리</h1>
        <p className="text-sm text-neutral-500 mt-1">
          메뉴를 제외한 공개 페이지의 콘텐츠를 블록 단위로 편집합니다.
        </p>
      </header>

      {loading && <p className="text-neutral-400">불러오는 중…</p>}
      {error && (
        <div className="bg-red-50 text-red-700 text-sm rounded-lg p-4">{error}</div>
      )}

      {!loading && !error && (
        <ul className="space-y-2">
          {pages.map((p) => (
            <li
              key={p.slug}
              className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl px-5 py-4 hover:border-primary/40 transition-colors"
            >
              <div>
                <p className="font-bold text-neutral-900">{p.displayName}</p>
                <p className="text-xs text-neutral-400">/{p.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={publicPath(p.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-sm text-neutral-500 hover:text-primary flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">launch</span>
                  보기
                </Link>
                <Link
                  href={`/admin/pages/${p.slug}/edit`}
                  className="px-4 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">edit</span>
                  편집
                </Link>
              </div>
            </li>
          ))}
          {pages.length === 0 && (
            <p className="text-neutral-400">
              페이지가 없습니다. Supabase에 페이지 seed(SQL)를 먼저 실행하세요.
            </p>
          )}
        </ul>
      )}
    </div>
  );
}
