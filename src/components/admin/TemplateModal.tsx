"use client";

import { useState } from "react";
import {
  POST_TEMPLATES,
  TEMPLATE_CATEGORIES,
  buildAiPrompt,
  type PostTemplate,
} from "@/data/post-templates";

interface TemplateModalProps {
  open: boolean;
  onClose: () => void;
  onInsert: (master: string) => void;
}

export default function TemplateModal({
  open,
  onClose,
  onInsert,
}: TemplateModalProps) {
  const [filter, setFilter] = useState<string>("all");
  const [toast, setToast] = useState("");

  if (!open) return null;

  const visible =
    filter === "all"
      ? POST_TEMPLATES
      : POST_TEMPLATES.filter((t) => t.category === filter);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} 복사됨`);
    } catch {
      showToast("복사 실패");
    }
  };

  const handleInsert = (template: PostTemplate) => {
    onInsert(template.master);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl my-8 shadow-2xl">
        <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">마스터 템플릿</h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              프론트매터 + HTML 본문이 합쳐진 한 덩어리. 그대로 입력창에 넣거나
              AI에게 채우라고 시키면 됩니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Filter */}
        <div className="px-6 py-3 border-b border-neutral-100 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            전체
          </button>
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${
                filter === cat.value
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates list */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {visible.map((template) => (
            <div
              key={template.id}
              className="border border-neutral-200 rounded-2xl p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-neutral-900">{template.name}</h3>
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </div>

              {/* Preview */}
              <details className="mb-3">
                <summary className="text-xs text-neutral-500 cursor-pointer hover:text-primary select-none">
                  마스터 템플릿 미리 보기 (프론트매터 + 본문)
                </summary>
                <pre className="mt-2 p-3 bg-neutral-900 text-neutral-100 text-xs rounded-lg overflow-x-auto max-h-64 overflow-y-auto">
                  {template.master}
                </pre>
              </details>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleInsert(template)}
                  className="px-3 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  입력창에 삽입
                </button>
                <button
                  onClick={() => copy(buildAiPrompt(template), "AI 프롬프트")}
                  className="px-3 py-2 bg-white border border-primary text-primary text-xs font-bold rounded-lg hover:bg-primary-surface transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">smart_toy</span>
                  AI 프롬프트 복사
                </button>
                <button
                  onClick={() => copy(template.master, "마스터 템플릿")}
                  className="px-3 py-2 bg-white border border-neutral-200 text-neutral-700 text-xs font-bold rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">content_copy</span>
                  템플릿만 복사
                </button>
              </div>
            </div>
          ))}
          {visible.length === 0 && (
            <p className="text-center text-neutral-400 py-8 text-sm">
              해당 카테고리 템플릿이 없습니다.
            </p>
          )}
        </div>

        {/* Footer help */}
        <footer className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 rounded-b-2xl text-xs text-neutral-500 leading-relaxed">
          <p>
            <strong>사용 방법:</strong> ① <em>AI 프롬프트 복사</em>를 ChatGPT/Claude에
            붙여넣고 [주제]만 채우세요. ② AI가 만든 마스터 템플릿(프론트매터 +
            HTML)을 ③ admin 입력창에 그대로 붙여넣어 저장하면 됩니다.
          </p>
        </footer>

        {toast && (
          <div className="fixed bottom-6 right-6 px-4 py-3 bg-neutral-900 text-white text-sm rounded-lg shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
