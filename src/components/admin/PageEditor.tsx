"use client";

import { useLayoutEffect, useRef, useState } from "react";
import BlockForm from "@/components/admin/cms/BlockForm";
import BlockRenderer, { RenderBlock } from "@/components/cms/BlockRenderer";
import {
  BLOCK_REGISTRY,
  BLOCK_LABEL,
  createDefaultBlockData,
  type BlockType,
  type CmsBlock,
} from "@/lib/cms/blocks";
import { savePage, type AdminPage } from "@/lib/admin/pages-store";

interface EditableBlock {
  id: string;
  type: BlockType;
  data: Record<string, unknown>;
  visible: boolean;
}

let tmpCounter = 0;
const tmpId = () => `tmp-${Date.now()}-${tmpCounter++}`;

const stripTags = (s: string) =>
  s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

/** 블록 데이터에서 사람이 알아볼 요약 텍스트 추출 (목록에서 기존 내용 식별용) */
function summarize(type: BlockType, data: Record<string, unknown>): string {
  if (type === "raw-html") return "임의 HTML 섹션";
  if (type === "floating-toolbar") return "플로팅 버튼";
  const d = data as Record<string, unknown> & {
    items?: { q?: string }[];
    cards?: { title?: string }[];
  };
  const raw =
    (d.heading as string) ||
    (d.title as string) ||
    (d.panelTitle as string) ||
    (d.text as string) ||
    (d.eyebrow as string) ||
    d.items?.[0]?.q ||
    d.cards?.[0]?.title ||
    "";
  const s = stripTags(String(raw || ""));
  return s.length > 38 ? `${s.slice(0, 38)}…` : s || "(내용 없음)";
}

/** 블록 타입 색상 배지 (목록에서 종류 구분) */
const BLOCK_BADGE: Record<string, string> = {
  hero: "bg-indigo-50 text-indigo-600 border-indigo-200",
  "rich-text": "bg-slate-50 text-slate-600 border-slate-200",
  "card-grid": "bg-amber-50 text-amber-700 border-amber-200",
  "two-column": "bg-teal-50 text-teal-700 border-teal-200",
  "process-steps": "bg-blue-50 text-blue-600 border-blue-200",
  faq: "bg-purple-50 text-purple-600 border-purple-200",
  cta: "bg-rose-50 text-rose-600 border-rose-200",
  "text-panel": "bg-cyan-50 text-cyan-700 border-cyan-200",
  callout: "bg-orange-50 text-orange-600 border-orange-200",
  table: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "card-list": "bg-lime-50 text-lime-700 border-lime-200",
  "raw-html": "bg-neutral-100 text-neutral-600 border-neutral-300",
  "floating-toolbar": "bg-pink-50 text-pink-600 border-pink-200",
  "info-columns": "bg-sky-50 text-sky-700 border-sky-200",
};

export default function PageEditor({ page }: { page: AdminPage }) {
  const [blocks, setBlocks] = useState<EditableBlock[]>(
    page.blocks.map((b) => ({
      id: b.id || tmpId(),
      type: b.type as BlockType,
      data: (b.data as unknown as Record<string, unknown>) ?? {},
      visible: b.visible ?? true,
    })),
  );
  const [displayName, setDisplayName] = useState(page.displayName);
  const [seoTitle, setSeoTitle] = useState(page.theme?.seo?.title ?? "");
  const [seoDesc, setSeoDesc] = useState(page.theme?.seo?.description ?? "");
  const [selectedId, setSelectedId] = useState<string | null>(blocks[0]?.id ?? null);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const selected = blocks.find((b) => b.id === selectedId) ?? null;

  const mutate = (fn: (prev: EditableBlock[]) => EditableBlock[]) => {
    setBlocks(fn);
    setDirty(true);
  };

  const addBlock = (type: BlockType) => {
    const nb: EditableBlock = {
      id: tmpId(),
      type,
      data: createDefaultBlockData(type) as unknown as Record<string, unknown>,
      visible: true,
    };
    mutate((prev) => [...prev, nb]);
    setSelectedId(nb.id);
    setAddOpen(false);
    setMode("edit");
  };

  const updateData = (id: string, data: unknown) =>
    mutate((prev) =>
      prev.map((b) => (b.id === id ? { ...b, data: data as Record<string, unknown> } : b)),
    );

  const move = (id: string, dir: -1 | 1) =>
    mutate((prev) => {
      const i = prev.findIndex((b) => b.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  const toggleVisible = (id: string) =>
    mutate((prev) => prev.map((b) => (b.id === id ? { ...b, visible: !b.visible } : b)));

  const confirmDelete = () => {
    if (!deleteTargetId) return;
    mutate((prev) => prev.filter((b) => b.id !== deleteTargetId));
    if (selectedId === deleteTargetId) setSelectedId(null);
    setDeleteTargetId(null);
    showToast("블록이 삭제되었습니다. (저장해야 반영됩니다)");
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await savePage(page.slug, {
        displayName,
        theme: { ...page.theme, seo: { title: seoTitle, description: seoDesc } },
        blocks: blocks.map((b) => ({ type: b.type, data: b.data, visible: b.visible })),
      });
      setSavedAt(new Date().toLocaleTimeString("ko-KR"));
      setDirty(false);
      showToast("저장되었습니다!");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "저장 실패";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  const previewBlocks = blocks
    .filter((b) => b.visible)
    .map((b) => ({ id: b.id, type: b.type, data: b.data }) as unknown as CmsBlock);

  // 미리보기: 실제 데스크톱 화면(1280px)을 축소해 프레임 안에 표시
  const PREVIEW_W = 1280;
  const PREVIEW_SCALE = 0.62;
  const previewInnerRef = useRef<HTMLDivElement>(null);
  const [previewH, setPreviewH] = useState(0);
  useLayoutEffect(() => {
    if (mode === "preview" && previewInnerRef.current) {
      setPreviewH(previewInnerRef.current.scrollHeight);
    }
  }, [mode, blocks]);

  // 선택 블록 실시간 미리보기 (편집 폼 옆)
  const BP_W = 1280;
  const BP_SCALE = 0.32;
  const blockPrevRef = useRef<HTMLDivElement>(null);
  const [blockPrevH, setBlockPrevH] = useState(0);
  useLayoutEffect(() => {
    if (mode === "edit" && selected && blockPrevRef.current) {
      setBlockPrevH(blockPrevRef.current.scrollHeight);
    }
  }, [mode, selectedId, selected?.data, selected]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 상단 바 */}
      <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-neutral-400">페이지 편집 · /{page.slug}</p>
          <h1 className="text-lg font-bold text-neutral-900 truncate">{displayName || page.slug}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
            <button
              onClick={() => setMode("edit")}
              className={`px-3 py-1.5 text-sm font-medium ${mode === "edit" ? "bg-primary text-white" : "text-neutral-600"}`}
            >
              편집
            </button>
            <button
              onClick={() => setMode("preview")}
              className={`px-3 py-1.5 text-sm font-medium flex items-center gap-1 ${mode === "preview" ? "bg-primary text-white" : "text-neutral-600"}`}
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              미리보기
            </button>
          </div>
          {savedAt && !dirty && (
            <span className="text-xs text-green-600">저장됨 {savedAt}</span>
          )}
          {dirty && <span className="text-xs text-amber-600">저장 안 됨</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold disabled:opacity-50"
          >
            {saving ? "저장 중…" : "저장"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-6 py-2 border-b border-red-100">{error}</div>
      )}

      {mode === "preview" ? (
        <div className="flex-1 bg-neutral-200 overflow-auto">
          <div className="bg-amber-50 text-amber-700 text-xs text-center py-1.5 border-b border-amber-100 sticky top-0 z-10">
            미리보기 — 저장 전 상태 · 실제 화면 축소 ({Math.round(PREVIEW_SCALE * 100)}%, 숨김 블록 제외)
          </div>
          {previewBlocks.length ? (
            <div className="p-6 flex justify-center">
              {/* 축소 프레임: transform으로 고정요소(플로팅 버튼)도 프레임 안에 갇힘 */}
              <div
                className="bg-white shadow-2xl rounded-xl border border-neutral-300 overflow-hidden flex-shrink-0"
                style={{ width: PREVIEW_W * PREVIEW_SCALE, height: previewH * PREVIEW_SCALE || undefined }}
              >
                <div
                  ref={previewInnerRef}
                  style={{
                    width: PREVIEW_W,
                    transform: `scale(${PREVIEW_SCALE})`,
                    transformOrigin: "top left",
                  }}
                >
                  <BlockRenderer blocks={previewBlocks} />
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-neutral-400 py-20">표시할 블록이 없습니다.</p>
          )}
        </div>
      ) : (
        <div className="flex-1 flex min-h-0">
          {/* 좌: 블록 목록 */}
          <aside className="w-72 flex-shrink-0 border-r border-neutral-200 bg-neutral-50 overflow-y-auto p-3">
            <div className="space-y-1.5">
              {blocks.map((b, i) => (
                <div
                  key={b.id}
                  className={`rounded-lg border px-3 py-2 bg-white cursor-pointer ${
                    selectedId === b.id ? "border-primary ring-1 ring-primary/30" : "border-neutral-200"
                  } ${!b.visible ? "opacity-50" : ""}`}
                  onClick={() => setSelectedId(b.id)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[10px] font-bold text-neutral-400">{i + 1}</span>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border truncate ${BLOCK_BADGE[b.type] ?? "bg-neutral-100 text-neutral-600 border-neutral-200"}`}
                      >
                        {BLOCK_LABEL[b.type] ?? b.type}
                      </span>
                    </span>
                    <div className="flex items-center gap-0.5 text-neutral-400">
                      <button onClick={(e) => { e.stopPropagation(); move(b.id, -1); }} title="위로">
                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); move(b.id, 1); }} title="아래로">
                        <span className="material-symbols-outlined text-sm">arrow_downward</span>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); toggleVisible(b.id); }} title="표시/숨김">
                        <span className="material-symbols-outlined text-sm">
                          {b.visible ? "visibility" : "visibility_off"}
                        </span>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setDeleteTargetId(b.id); }} title="삭제" className="text-red-400">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-700 truncate mt-0.5">
                    {summarize(b.type, b.data)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 relative">
              <button
                onClick={() => setAddOpen((v) => !v)}
                className="w-full py-2 border-2 border-dashed border-neutral-300 rounded-lg text-sm font-bold text-neutral-500 hover:border-primary hover:text-primary flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-base">add</span>블록 추가
              </button>
              {addOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-neutral-200 rounded-lg shadow-lg py-1">
                  {BLOCK_REGISTRY.map((b) => (
                    <button
                      key={b.type}
                      onClick={() => addBlock(b.type)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base text-primary">{b.icon}</span>
                      {b.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* 우: 선택 블록 폼 + 페이지 설정 */}
          <main className="flex-1 overflow-y-auto p-6 max-w-2xl">
            {selected ? (
              <>
                <h2 className="text-sm font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-primary">edit</span>
                  {BLOCK_LABEL[selected.type]} 편집
                </h2>
                <BlockForm
                  type={selected.type}
                  data={selected.data}
                  onChange={(d) => updateData(selected.id, d)}
                />
              </>
            ) : (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-neutral-900">페이지 설정</h2>
                <label className="block">
                  <span className="block text-xs font-bold text-neutral-600 mb-1">페이지 이름(관리용)</span>
                  <input
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    value={displayName}
                    onChange={(e) => { setDisplayName(e.target.value); setDirty(true); }}
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold text-neutral-600 mb-1">SEO 제목</span>
                  <input
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                    value={seoTitle}
                    onChange={(e) => { setSeoTitle(e.target.value); setDirty(true); }}
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-bold text-neutral-600 mb-1">SEO 설명</span>
                  <textarea
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm min-h-[80px]"
                    value={seoDesc}
                    onChange={(e) => { setSeoDesc(e.target.value); setDirty(true); }}
                  />
                </label>
                <p className="text-xs text-neutral-400">왼쪽에서 블록을 선택하면 해당 블록을 편집합니다.</p>
              </div>
            )}
          </main>

          {/* 우: 선택 블록 실시간 미리보기 (넓은 화면) */}
          {selected && (
            <aside className="w-[440px] flex-shrink-0 border-l border-neutral-200 bg-neutral-100 hidden xl:flex flex-col">
              <div className="text-[11px] font-medium text-neutral-500 px-4 py-2 border-b border-neutral-200 bg-white flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">visibility</span>
                실시간 미리보기 — 이 블록
              </div>
              <div className="flex-1 overflow-auto p-4">
                <div
                  className="bg-white rounded-lg shadow border border-neutral-300 overflow-hidden mx-auto"
                  style={{ width: BP_W * BP_SCALE, height: blockPrevH * BP_SCALE || undefined }}
                >
                  <div
                    ref={blockPrevRef}
                    style={{ width: BP_W, transform: `scale(${BP_SCALE})`, transformOrigin: "top left" }}
                  >
                    <RenderBlock
                      block={{ id: selected.id, type: selected.type, data: selected.data } as unknown as CmsBlock}
                    />
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      )}

      {/* 토스트 */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2 text-sm">
          <span className={`material-symbols-outlined ${toast.type === "success" ? "text-green-400" : "text-red-400"}`}>
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          {toast.msg}
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {deleteTargetId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteTargetId(null); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-600">delete</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900">블록을 삭제할까요?</h3>
                <p className="text-sm text-neutral-500">저장하면 영구 반영됩니다.</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-50"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700"
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
