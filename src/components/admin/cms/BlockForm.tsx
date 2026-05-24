"use client";

import type {
  BlockType,
  CmsButton,
  HeroData,
  RichTextData,
  CardGridData,
  CardItem,
  TwoColumnData,
  ProcessStepsData,
  ProcessStep,
  FaqData,
  FaqItem,
  CtaData,
} from "@/lib/cms/blocks";

/* ── 공통 필드 ─────────────────────────────────────────── */

const inputCls =
  "w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";

function Field({
  label,
  value,
  onChange,
  textarea,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-neutral-600 mb-1">{label}</span>
      {textarea ? (
        <textarea
          className={`${inputCls} min-h-[90px] font-mono`}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputCls}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-neutral-600 mb-1">{label}</span>
      <select
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/** 반복 항목 편집기 (배열) */
function Repeat<T>({
  label,
  items,
  makeNew,
  onChange,
  render,
}: {
  label: string;
  items: T[];
  makeNew: () => T;
  onChange: (next: T[]) => void;
  render: (item: T, update: (next: T) => void) => React.ReactNode;
}) {
  const set = (i: number, next: T) => onChange(items.map((it, j) => (j === i ? next : it)));
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-neutral-600">{label}</span>
        <button
          type="button"
          onClick={() => onChange([...items, makeNew()])}
          className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">add</span>추가
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="border border-neutral-200 rounded-lg p-3 bg-neutral-50">
            <div className="flex justify-end gap-1 mb-2">
              <button type="button" onClick={() => move(i, -1)} className="text-neutral-400 hover:text-neutral-700" title="위로">
                <span className="material-symbols-outlined text-base">arrow_upward</span>
              </button>
              <button type="button" onClick={() => move(i, 1)} className="text-neutral-400 hover:text-neutral-700" title="아래로">
                <span className="material-symbols-outlined text-base">arrow_downward</span>
              </button>
              <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600" title="삭제">
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
            <div className="space-y-2">{render(item, (next) => set(i, next))}</div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-xs text-neutral-400 py-2">항목이 없습니다. "추가"를 누르세요.</p>
        )}
      </div>
    </div>
  );
}

function ButtonsEditor({
  buttons,
  onChange,
}: {
  buttons: CmsButton[];
  onChange: (b: CmsButton[]) => void;
}) {
  return (
    <Repeat<CmsButton>
      label="버튼"
      items={buttons}
      makeNew={() => ({ label: "버튼", href: "/", style: "primary" })}
      onChange={onChange}
      render={(b, update) => (
        <>
          <Field label="라벨" value={b.label} onChange={(v) => update({ ...b, label: v })} />
          <Field label="링크 (href / tel:)" value={b.href} onChange={(v) => update({ ...b, href: v })} />
          <Select
            label="스타일"
            value={b.style}
            options={[
              { value: "primary", label: "강조(채움)" },
              { value: "outline", label: "외곽선" },
            ]}
            onChange={(v) => update({ ...b, style: v })}
          />
        </>
      )}
    />
  );
}

/* ── 블록 타입별 폼 ─────────────────────────────────────── */

export default function BlockForm({
  type,
  data,
  onChange,
}: {
  type: BlockType;
  data: unknown;
  onChange: (next: unknown) => void;
}) {
  switch (type) {
    case "hero": {
      const d = data as HeroData;
      return (
        <div className="space-y-3">
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="제목" value={d.title} onChange={(v) => onChange({ ...d, title: v })} />
          <Field label="부제" value={d.subtitle ?? ""} textarea onChange={(v) => onChange({ ...d, subtitle: v })} />
          <Select
            label="배경 종류"
            value={d.bg?.type ?? "color"}
            options={[
              { value: "color", label: "색상" },
              { value: "image", label: "이미지 (경로)" },
            ]}
            onChange={(v) => onChange({ ...d, bg: { ...d.bg, type: v } })}
          />
          <Field
            label={d.bg?.type === "image" ? "이미지 경로 (/images/..)" : "배경 색상 (예: #171717)"}
            value={d.bg?.value ?? ""}
            onChange={(v) => onChange({ ...d, bg: { ...d.bg, value: v } })}
          />
          <ButtonsEditor buttons={d.buttons ?? []} onChange={(b) => onChange({ ...d, buttons: b })} />
        </div>
      );
    }
    case "rich-text": {
      const d = data as RichTextData;
      return (
        <div className="space-y-3">
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="소제목" value={d.heading ?? ""} onChange={(v) => onChange({ ...d, heading: v })} />
          <Field label="본문 (HTML 허용)" value={d.html} textarea onChange={(v) => onChange({ ...d, html: v })} />
        </div>
      );
    }
    case "card-grid": {
      const d = data as CardGridData;
      return (
        <div className="space-y-3">
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="제목" value={d.heading ?? ""} onChange={(v) => onChange({ ...d, heading: v })} />
          <Field label="소개 문구" value={d.intro ?? ""} textarea onChange={(v) => onChange({ ...d, intro: v })} />
          <Select
            label="열 개수"
            value={String(d.columns) as "2" | "3" | "4"}
            options={[
              { value: "2", label: "2열" },
              { value: "3", label: "3열" },
              { value: "4", label: "4열" },
            ]}
            onChange={(v) => onChange({ ...d, columns: Number(v) as 2 | 3 | 4 })}
          />
          <Repeat<CardItem>
            label="카드"
            items={d.cards ?? []}
            makeNew={() => ({ icon: "check_circle", title: "카드 제목", desc: "설명" })}
            onChange={(cards) => onChange({ ...d, cards })}
            render={(c, update) => (
              <>
                <Field label="아이콘 (material icon명)" value={c.icon} onChange={(v) => update({ ...c, icon: v })} />
                <Field label="제목" value={c.title} onChange={(v) => update({ ...c, title: v })} />
                <Field label="설명" value={c.desc} textarea onChange={(v) => update({ ...c, desc: v })} />
                <Field label="링크 (선택)" value={c.href ?? ""} onChange={(v) => update({ ...c, href: v })} />
              </>
            )}
          />
        </div>
      );
    }
    case "two-column": {
      const d = data as TwoColumnData;
      return (
        <div className="space-y-3">
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="제목" value={d.heading} onChange={(v) => onChange({ ...d, heading: v })} />
          <Repeat<string>
            label="문단"
            items={d.paragraphs ?? []}
            makeNew={() => ""}
            onChange={(paragraphs) => onChange({ ...d, paragraphs })}
            render={(p, update) => <Field label="" value={p} textarea onChange={update} />}
          />
          <Field label="이미지 경로" value={d.image?.src ?? ""} onChange={(v) => onChange({ ...d, image: { ...d.image, src: v } })} />
          <Field label="이미지 대체텍스트(alt)" value={d.image?.alt ?? ""} onChange={(v) => onChange({ ...d, image: { ...d.image, alt: v } })} />
          <Select
            label="이미지 위치"
            value={d.imageSide}
            options={[
              { value: "left", label: "왼쪽" },
              { value: "right", label: "오른쪽" },
            ]}
            onChange={(v) => onChange({ ...d, imageSide: v })}
          />
          <Repeat<string>
            label="체크리스트 (선택)"
            items={d.list ?? []}
            makeNew={() => ""}
            onChange={(list) => onChange({ ...d, list })}
            render={(li, update) => <Field label="" value={li} onChange={update} />}
          />
          <ButtonsEditor buttons={d.buttons ?? []} onChange={(b) => onChange({ ...d, buttons: b })} />
        </div>
      );
    }
    case "process-steps": {
      const d = data as ProcessStepsData;
      return (
        <div className="space-y-3">
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="제목" value={d.heading} onChange={(v) => onChange({ ...d, heading: v })} />
          <Field label="소개 문구" value={d.intro ?? ""} textarea onChange={(v) => onChange({ ...d, intro: v })} />
          <Repeat<ProcessStep>
            label="단계"
            items={d.steps ?? []}
            makeNew={() => ({ num: String(d.steps.length + 1).padStart(2, "0"), title: "단계", desc: "설명" })}
            onChange={(steps) => onChange({ ...d, steps })}
            render={(s, update) => (
              <>
                <Field label="번호" value={s.num} onChange={(v) => update({ ...s, num: v })} />
                <Field label="제목" value={s.title} onChange={(v) => update({ ...s, title: v })} />
                <Field label="설명" value={s.desc} textarea onChange={(v) => update({ ...s, desc: v })} />
              </>
            )}
          />
        </div>
      );
    }
    case "faq": {
      const d = data as FaqData;
      return (
        <div className="space-y-3">
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="제목" value={d.heading ?? ""} onChange={(v) => onChange({ ...d, heading: v })} />
          <Repeat<FaqItem>
            label="질문/답변"
            items={d.items ?? []}
            makeNew={() => ({ q: "질문", a: "답변" })}
            onChange={(items) => onChange({ ...d, items })}
            render={(it, update) => (
              <>
                <Field label="질문" value={it.q} onChange={(v) => update({ ...it, q: v })} />
                <Field label="답변" value={it.a} textarea onChange={(v) => update({ ...it, a: v })} />
              </>
            )}
          />
        </div>
      );
    }
    case "cta": {
      const d = data as CtaData;
      return (
        <div className="space-y-3">
          <Field label="제목" value={d.heading} onChange={(v) => onChange({ ...d, heading: v })} />
          <Field label="설명" value={d.text ?? ""} textarea onChange={(v) => onChange({ ...d, text: v })} />
          <Select
            label="테마"
            value={d.theme}
            options={[
              { value: "dark", label: "어두운 배경" },
              { value: "light", label: "밝은 배경" },
            ]}
            onChange={(v) => onChange({ ...d, theme: v })}
          />
          <ButtonsEditor buttons={d.buttons ?? []} onChange={(b) => onChange({ ...d, buttons: b })} />
        </div>
      );
    }
    default:
      return <p className="text-sm text-neutral-400">알 수 없는 블록 타입: {type}</p>;
  }
}
