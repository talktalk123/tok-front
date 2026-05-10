"use client";

import { useEffect, useState } from "react";
import { exportPostsJson } from "@/lib/admin/posts-store";
import { exportSettingsJson } from "@/lib/admin/settings-store";

interface ExportItem {
  label: string;
  filename: string;
  description: string;
  produce: () => string;
}

const items: ExportItem[] = [
  {
    label: "AI 게시판",
    filename: "src/data/ai-posts.json",
    description: "AI 게시판 글 데이터. 수정한 내용을 실제 배포에 반영하려면 이 파일을 교체하고 재배포하세요.",
    produce: exportPostsJson,
  },
  {
    label: "사이트 설정",
    filename: "src/data/site-settings.json",
    description: "사이트 전역 설정 (전화·주소·진료시간 등).",
    produce: exportSettingsJson,
  },
];

export default function ExportPage() {
  const [contents, setContents] = useState<Record<string, string>>({});

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const item of items) next[item.filename] = item.produce();
    setContents(next);
  }, []);

  const copy = async (text: string, filename: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${filename} 내용을 클립보드에 복사했습니다.`);
    } catch {
      alert("복사 실패. 직접 텍스트를 선택해 복사해주세요.");
    }
  };

  const download = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename.split("/").pop() ?? "export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-5xl">
      <header className="mb-8">
        <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">
          Export
        </p>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">JSON 내보내기</h1>
        <p className="text-neutral-500 text-sm leading-relaxed">
          백엔드 연결 전까지는 변경 사항을 JSON으로 내려받아 코드 저장소에
          교체·커밋·재배포해야 라이브 사이트에 반영됩니다.
        </p>
      </header>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.filename} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <div className="flex items-start justify-between gap-4 p-6 border-b border-neutral-100">
              <div>
                <h2 className="text-base font-bold text-neutral-900 mb-1">{item.label}</h2>
                <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
                <code className="inline-block mt-2 text-xs bg-neutral-100 px-2 py-1 rounded font-mono">
                  {item.filename}
                </code>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => copy(contents[item.filename] ?? "", item.filename)}
                  className="px-3 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg text-xs font-bold hover:bg-neutral-50 transition-colors"
                >
                  복사
                </button>
                <button
                  onClick={() => download(contents[item.filename] ?? "", item.filename)}
                  className="px-3 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-dark transition-colors"
                >
                  다운로드
                </button>
              </div>
            </div>
            <pre className="px-6 py-4 text-xs font-mono bg-neutral-900 text-neutral-100 overflow-x-auto max-h-96 overflow-y-auto">
              {contents[item.filename] ?? "..."}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
