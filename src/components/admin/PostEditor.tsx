"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AiPost } from "@/lib/ai-posts";
import { createPost, updatePost } from "@/lib/admin/posts-store";
import {
  parsePost,
  serializePost,
} from "@/lib/admin/template-parser";
import TemplateModal from "@/components/admin/TemplateModal";

interface PostEditorProps {
  initial?: AiPost;
  mode: "create" | "edit";
}

export default function PostEditor({ initial, mode }: PostEditorProps) {
  const router = useRouter();
  const [originalSlug] = useState(initial?.slug ?? "");
  const [text, setText] = useState(
    initial ? serializePost(initial) : "",
  );
  const [submitError, setSubmitError] = useState("");
  const [templateOpen, setTemplateOpen] = useState(false);

  const parsed = useMemo(() => parsePost(text), [text]);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!parsed.post) {
      setSubmitError(
        "프론트매터/본문 검사를 통과해야 저장할 수 있습니다. 우측 상단 오류 메시지를 확인해주세요.",
      );
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "create") {
        await createPost(parsed.post);
      } else {
        await updatePost(originalSlug, parsed.post);
      }
      router.push("/admin/posts");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "저장 중 오류가 발생했습니다.",
      );
      setSubmitting(false);
    }
  };

  const handleTemplateInsert = (master: string) => {
    if (text.trim() && !confirm("현재 입력 중인 내용을 템플릿으로 교체합니다. 계속할까요?")) {
      return;
    }
    setText(master);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-7xl">
      {/* Left: editor */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-100 bg-neutral-50">
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-700">
                마스터 템플릿 입력
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
                <code className="bg-neutral-200 px-1 rounded">---</code> 프론트매터(메타데이터) +{" "}
                <code className="bg-neutral-200 px-1 rounded">---</code> 아래에 HTML 본문. 글 제목은 자동 h1.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTemplateOpen(true)}
              className="flex-shrink-0 flex items-center gap-1 px-3 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <span className="material-symbols-outlined text-base">description</span>
              템플릿
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={28}
            spellCheck={false}
            className="w-full px-4 py-3 font-mono text-xs leading-relaxed focus:outline-none resize-y min-h-[600px] border-0"
            placeholder={`---
title: 글 제목
slug:
summary:
category: clinic-info
tags: 태그1, 태그2
publishedAt:
language: ko-KR
---
<h2>섹션 제목</h2>
<p>본문...</p>`}
          />
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
            {submitError}
          </div>
        )}
      </div>

      {/* Right: parse status + preview */}
      <aside className="space-y-4">
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 sticky top-4">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                parsed.errors.length > 0
                  ? "bg-red-500"
                  : parsed.warnings.length > 0
                    ? "bg-amber-500"
                    : "bg-green-500"
              }`}
            />
            <h3 className="text-sm font-bold text-neutral-900">
              {parsed.errors.length > 0
                ? "오류 — 저장 불가"
                : parsed.warnings.length > 0
                  ? "경고 — 저장 가능"
                  : "정상"}
            </h3>
          </div>

          {parsed.errors.length > 0 && (
            <ul className="space-y-1 mb-3">
              {parsed.errors.map((e, i) => (
                <li key={i} className="text-xs text-red-700 flex gap-1">
                  <span>×</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          )}
          {parsed.warnings.length > 0 && (
            <ul className="space-y-1 mb-3">
              {parsed.warnings.map((w, i) => (
                <li key={i} className="text-xs text-amber-700 flex gap-1">
                  <span>!</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          )}

          {parsed.post && (
            <div className="space-y-2 text-xs border-t border-neutral-100 pt-3">
              <Row label="title" value={parsed.post.title} />
              <Row label="slug" value={`/ai-content/${parsed.post.slug}`} />
              <Row
                label="summary"
                value={
                  parsed.post.summary
                    ? parsed.post.summary.length > 80
                      ? parsed.post.summary.slice(0, 80) + "…"
                      : parsed.post.summary
                    : "(없음)"
                }
              />
              <Row label="category" value={parsed.post.category} />
              <Row
                label="tags"
                value={
                  parsed.post.tags.length > 0
                    ? parsed.post.tags.join(", ")
                    : "(없음)"
                }
              />
              <Row label="publishedAt" value={parsed.post.publishedAt} />
              <Row label="language" value={parsed.post.language} />
            </div>
          )}

          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-neutral-100">
            <button
              type="submit"
              disabled={!parsed.post || submitting}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed"
            >
              {submitting
                ? "저장 중..."
                : mode === "create"
                  ? "글 등록"
                  : "변경 저장"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/posts")}
              className="w-full px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-sm font-bold hover:bg-neutral-50 transition-colors"
            >
              취소
            </button>
          </div>
        </div>

        {parsed.post && (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-neutral-100 bg-neutral-50">
              <p className="text-sm font-medium text-neutral-700">본문 미리 보기</p>
            </div>
            <div className="px-4 py-4 max-h-[500px] overflow-y-auto">
              <h1 className="text-2xl font-bold mb-2">{parsed.post.title}</h1>
              <p className="text-sm text-neutral-500 mb-6">{parsed.post.summary}</p>
              <div
                className="prose prose-neutral max-w-none [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-4 [&>h3]:mb-2 [&>p]:leading-relaxed [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-3 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-600 [&_a]:text-primary [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: parsed.post.content }}
              />
            </div>
          </div>
        )}
      </aside>

      <TemplateModal
        open={templateOpen}
        onClose={() => setTemplateOpen(false)}
        onInsert={handleTemplateInsert}
      />
    </form>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-2 items-start">
      <span className="font-mono text-neutral-400 col-span-1">{label}</span>
      <span className="text-neutral-800 col-span-2 break-all">{value}</span>
    </div>
  );
}
