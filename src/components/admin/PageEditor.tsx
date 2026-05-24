"use client";

import { useState } from "react";
import BlockForm from "@/components/admin/cms/BlockForm";
import BlockRenderer from "@/components/cms/BlockRenderer";
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

  const removeBlock = (id: string) => {
    if (!confirm("이 블록을 삭제할까요?")) return;
    mutate((prev) => prev.filter((b) => b.id !== id));
    if (selectedId === id) setSelectedId(null);
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
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  };

  const previewBlocks = blocks
    .filter((b) => b.visible)
    .map((b) => ({ id: b.id, type: b.type, data: b.data }) as unknown as CmsBlock);

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
        <div className="flex-1 bg-white">
          <div className="bg-amber-50 text-amber-700 text-xs text-center py-1.5 border-b border-amber-100">
            미리보기 — 저장 전 상태입니다 (숨김 블록 제외)
          </div>
          {previewBlocks.length ? (
            <BlockRenderer blocks={previewBlocks} />
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
                    <span className="text-xs font-bold text-neutral-700 truncate">
                      {i + 1}. {BLOCK_LABEL[b.type] ?? b.type}
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
                      <button onClick={(e) => { e.stopPropagation(); removeBlock(b.id); }} title="삭제" className="text-red-400">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
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
        </div>
      )}
    </div>
  );
}
