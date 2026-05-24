"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import PageEditor from "@/components/admin/PageEditor";
import { getPageForEdit, type AdminPage } from "@/lib/admin/pages-store";

export default function AdminPageEditRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [page, setPage] = useState<AdminPage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPageForEdit(slug)
      .then(setPage)
      .catch((e) => setError(e instanceof Error ? e.message : "불러오기 실패"));
  }, [slug]);

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 text-red-700 text-sm rounded-lg p-4">{error}</div>
        <Link href="/admin/pages" className="text-primary text-sm mt-4 inline-block">
          ← 페이지 목록
        </Link>
      </div>
    );
  }

  if (!page) {
    return <p className="p-8 text-neutral-400">불러오는 중…</p>;
  }

  return <PageEditor page={page} />;
}
