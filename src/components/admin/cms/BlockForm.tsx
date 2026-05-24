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
  TextPanelData,
  CalloutData,
  TableData,
  CardListData,
  CardListItem,
  RawHtmlData,
  FloatingToolbarData,
  InfoColumnsData,
  InfoPanel,
  InfoRow,
  InfoLine,
  InfoBtn,
} from "@/lib/cms/blocks";
import { htmlToFields } from "@/lib/cms/blocks";

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
          <Field label="아이콘 (선택, material명)" value={b.icon ?? ""} onChange={(v) => update({ ...b, icon: v })} />
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

function PanelBtnEditor({
  buttons,
  onChange,
}: {
  buttons?: InfoBtn[];
  onChange: (b: InfoBtn[]) => void;
}) {
  return (
    <Repeat<InfoBtn>
      label="버튼"
      items={buttons ?? []}
      makeNew={() => ({ label: "버튼", href: "/", primary: false })}
      onChange={onChange}
      render={(b, u) => (
        <>
          <Field label="라벨" value={b.label} onChange={(x) => u({ ...b, label: x })} />
          <Field label="링크" value={b.href} onChange={(x) => u({ ...b, href: x })} />
          <Select
            label="강조"
            value={b.primary ? "y" : "n"}
            options={[
              { value: "n", label: "흰색" },
              { value: "y", label: "주황(강조)" },
            ]}
            onChange={(x) => u({ ...b, primary: x === "y" })}
          />
        </>
      )}
    />
  );
}

/** info-columns 한 패널 편집 */
function PanelForm({
  panel,
  onChange,
}: {
  panel: InfoPanel;
  onChange: (p: InfoPanel) => void;
}) {
  const p = panel ?? { kind: "card" };
  const note = p.note ?? { title: "", text: "" };
  return (
    <div className="space-y-3 border border-neutral-200 rounded-lg p-3 bg-white">
      <Select
        label="패널 종류"
        value={p.kind ?? "card"}
        options={[
          { value: "card", label: "카드 (진료시간·연락처)" },
          { value: "text", label: "텍스트 (제목+문단)" },
          { value: "map", label: "지도 카드" },
        ]}
        onChange={(v) => onChange({ ...p, kind: v as InfoPanel["kind"] })}
      />
      {p.kind === "map" ? (
        <>
          <Field label="제목 (예: 톡바른경희한의원 본점)" value={p.title ?? ""} onChange={(v) => onChange({ ...p, title: v })} />
          <Repeat<string>
            label="주소 줄"
            items={p.addressLines ?? []}
            makeNew={() => ""}
            onChange={(addressLines) => onChange({ ...p, addressLines })}
            render={(a, u) => <Field label="" value={a} onChange={u} />}
          />
          <Field label="부가 설명 (선택)" value={p.sub ?? ""} onChange={(v) => onChange({ ...p, sub: v })} />
          <Repeat<InfoBtn>
            label="지도 링크"
            items={p.links ?? []}
            makeNew={() => ({ label: "네이버 지도", href: "" })}
            onChange={(links) => onChange({ ...p, links })}
            render={(l, u) => (
              <>
                <Field label="라벨" value={l.label} onChange={(x) => u({ ...l, label: x })} />
                <Field label="링크" value={l.href} onChange={(x) => u({ ...l, href: x })} />
              </>
            )}
          />
        </>
      ) : p.kind === "text" ? (
        <>
          <Field label="윗 라벨(eyebrow)" value={p.eyebrow ?? ""} onChange={(v) => onChange({ ...p, eyebrow: v })} />
          <Field label="제목" value={p.heading ?? ""} onChange={(v) => onChange({ ...p, heading: v })} />
          <Repeat<string>
            label="문단"
            items={p.paragraphs ?? []}
            makeNew={() => ""}
            onChange={(paragraphs) => onChange({ ...p, paragraphs })}
            render={(x, u) => <Field label="" value={x} textarea onChange={u} />}
          />
          <Field label="박스 안내 제목 (선택)" value={note.title ?? ""} onChange={(v) => onChange({ ...p, note: { ...note, title: v } })} />
          <Field label="박스 안내 내용 (선택)" value={note.text ?? ""} textarea onChange={(v) => onChange({ ...p, note: { ...note, text: v } })} />
          <PanelBtnEditor buttons={p.buttons} onChange={(buttons) => onChange({ ...p, buttons })} />
        </>
      ) : (
        <>
          <Field label="제목 (예: 진료시간 / 병원 정보)" value={p.title ?? ""} onChange={(v) => onChange({ ...p, title: v })} />
          <Field label="제목 아이콘 (선택, 예: schedule)" value={p.icon ?? ""} onChange={(v) => onChange({ ...p, icon: v })} />
          <Repeat<InfoRow>
            label="진료시간 행 (요일 / 시간)"
            items={p.rows ?? []}
            makeNew={() => ({ label: "", value: "" })}
            onChange={(rows) => onChange({ ...p, rows })}
            render={(r, u) => (
              <>
                <Field label="요일/항목" value={r.label} onChange={(x) => u({ ...r, label: x })} />
                <Field label="시간/값" value={r.value} onChange={(x) => u({ ...r, value: x })} />
                <Select
                  label="강조(주황)"
                  value={r.highlight ? "y" : "n"}
                  options={[
                    { value: "n", label: "보통" },
                    { value: "y", label: "강조(예: 휴진)" },
                  ]}
                  onChange={(x) => u({ ...r, highlight: x === "y" })}
                />
              </>
            )}
          />
          <Repeat<InfoLine>
            label="정보 줄 (주소·전화 등)"
            items={p.lines ?? []}
            makeNew={() => ({ icon: "location_on", text: "" })}
            onChange={(lines) => onChange({ ...p, lines })}
            render={(l, u) => (
              <>
                <Field label="아이콘 (예: location_on, call)" value={l.icon ?? ""} onChange={(x) => u({ ...l, icon: x })} />
                <Field label="내용" value={l.text} onChange={(x) => u({ ...l, text: x })} />
                <Field label="링크 (선택, 예: tel:031-...)" value={l.href ?? ""} onChange={(x) => u({ ...l, href: x })} />
              </>
            )}
          />
          <Field label="박스 안내 제목 (선택)" value={note.title ?? ""} onChange={(v) => onChange({ ...p, note: { ...note, title: v } })} />
          <Field label="박스 안내 내용 (선택)" value={note.text ?? ""} textarea onChange={(v) => onChange({ ...p, note: { ...note, text: v } })} />
          <PanelBtnEditor buttons={p.buttons} onChange={(buttons) => onChange({ ...p, buttons })} />
        </>
      )}
    </div>
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
      const t = htmlToFields(d.title, d.titleAccent);
      return (
        <div className="space-y-3">
          <Field label="브레드크럼 (예: 홈 > 한약 진료)" value={d.breadcrumb ?? ""} onChange={(v) => onChange({ ...d, breadcrumb: v })} />
          <Field label="배지 (둥근 라벨, 예: Herbal Medicine)" value={d.badge ?? ""} onChange={(v) => onChange({ ...d, badge: v })} />
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="제목 (줄바꿈은 Enter)" value={t.text} textarea onChange={(v) => onChange({ ...d, title: v, titleAccent: t.accent })} />
          <Field label="제목 강조(주황색) 줄 — 선택" value={t.accent} onChange={(v) => onChange({ ...d, title: t.text, titleAccent: v })} />
          <Field label="부제 (줄바꿈은 Enter)" value={htmlToFields(d.subtitle).text} textarea onChange={(v) => onChange({ ...d, subtitle: v })} />
          <Field label="보조 부제 (선택)" value={htmlToFields(d.subtitle2).text} textarea onChange={(v) => onChange({ ...d, subtitle2: v })} />
          <Field label="흐린 배경 이미지 (선택, 밝은 그라데이션 히어로용)" value={d.bgImage ?? ""} onChange={(v) => onChange({ ...d, bgImage: v })} />
          <Select
            label="테마"
            value={d.theme ?? "dark"}
            options={[
              { value: "dark", label: "어두운 배경(흰 글씨)" },
              { value: "light", label: "밝은 배경(검은 글씨)" },
            ]}
            onChange={(v) => onChange({ ...d, theme: v })}
          />
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
            label={d.bg?.type === "image" ? "이미지 경로/URL" : "배경 색상 (예: #171717)"}
            value={d.bg?.value ?? ""}
            onChange={(v) => onChange({ ...d, bg: { ...d.bg, value: v } })}
          />
          <Repeat<string>
            label="태그 칩"
            items={d.tags ?? []}
            makeNew={() => ""}
            onChange={(tags) => onChange({ ...d, tags })}
            render={(t, update) => <Field label="" value={t} onChange={update} />}
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
            label="카드 모양"
            value={d.variant ?? "icon"}
            options={[
              { value: "icon", label: "아이콘 카드(가운데)" },
              { value: "number", label: "사각 번호 카드" },
              { value: "number-lg", label: "큰 번호 카드" },
              { value: "icon-num", label: "아이콘+번호 카드(왼쪽)" },
            ]}
            onChange={(v) => onChange({ ...d, variant: v })}
          />
          <Select
            label="섹션 배경"
            value={d.bg ?? "neutral"}
            options={[
              { value: "neutral", label: "연한 회색" },
              { value: "white", label: "흰색" },
            ]}
            onChange={(v) => onChange({ ...d, bg: v })}
          />
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
            render={(c, update) => {
              const v = d.variant ?? "icon";
              const showIcon = v === "icon" || v === "icon-num";
              const showNum = v === "number" || v === "number-lg" || v === "icon-num";
              return (
                <>
                  {showIcon && (
                    <Field label="아이콘 (material명)" value={c.icon} onChange={(x) => update({ ...c, icon: x })} />
                  )}
                  {showNum && (
                    <Field label="번호 (예: 01)" value={c.num ?? ""} onChange={(x) => update({ ...c, num: x })} />
                  )}
                  <Field label="제목" value={c.title} onChange={(x) => update({ ...c, title: x })} />
                  <Field label="설명" value={c.desc} textarea onChange={(x) => update({ ...c, desc: x })} />
                  {v === "icon" && (
                    <Field label="링크 (선택)" value={c.href ?? ""} onChange={(x) => update({ ...c, href: x })} />
                  )}
                </>
              );
            }}
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
          <Repeat<string>
            label="배지 칩 (이력 등, 선택)"
            items={d.badges ?? []}
            makeNew={() => ""}
            onChange={(badges) => onChange({ ...d, badges })}
            render={(b, update) => <Field label="" value={b} onChange={update} />}
          />
          <Field
            label="이미지 위 카드 — 라벨 (예: Director)"
            value={d.imageCaption?.label ?? ""}
            onChange={(v) => onChange({ ...d, imageCaption: { ...d.imageCaption, label: v } })}
          />
          <Field
            label="이미지 위 카드 — 제목 (예: 이기홍 원장)"
            value={d.imageCaption?.title ?? ""}
            onChange={(v) => onChange({ ...d, imageCaption: { ...d.imageCaption, title: v } })}
          />
          <Select
            label="이미지 뒤 흐림 장식"
            value={d.blob ? "on" : "off"}
            options={[
              { value: "off", label: "없음" },
              { value: "on", label: "있음" },
            ]}
            onChange={(v) => onChange({ ...d, blob: v === "on" })}
          />
          <Field
            label="하단 박스 제목 (선택, 예: 주요 이력·활동)"
            value={d.listCard?.title ?? ""}
            onChange={(v) => onChange({ ...d, listCard: { items: [], ...d.listCard, title: v } })}
          />
          <Repeat<string>
            label="하단 박스 항목"
            items={d.listCard?.items ?? []}
            makeNew={() => ""}
            onChange={(items) => onChange({ ...d, listCard: { title: "", ...d.listCard, items } })}
            render={(it, update) => <Field label="" value={it} onChange={update} />}
          />
          <Field
            label="하단 박스 링크 라벨 (선택)"
            value={d.listCard?.link?.label ?? ""}
            onChange={(v) =>
              onChange({
                ...d,
                listCard: { title: "", items: [], ...d.listCard, link: { href: "", ...d.listCard?.link, label: v } },
              })
            }
          />
          <Field
            label="하단 박스 링크 href (선택)"
            value={d.listCard?.link?.href ?? ""}
            onChange={(v) =>
              onChange({
                ...d,
                listCard: { title: "", items: [], ...d.listCard, link: { label: "", ...d.listCard?.link, href: v } },
              })
            }
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
    case "text-panel": {
      const d = data as TextPanelData;
      const th = htmlToFields(d.heading, d.headingAccent);
      return (
        <div className="space-y-3">
          <Select
            label="섹션 배경"
            value={d.bg ?? "white"}
            options={[
              { value: "white", label: "흰색" },
              { value: "surface", label: "연한 강조(primary-surface)" },
            ]}
            onChange={(v) => onChange({ ...d, bg: v })}
          />
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="제목 (줄바꿈은 Enter)" value={th.text} textarea onChange={(v) => onChange({ ...d, heading: v, headingAccent: th.accent })} />
          <Field label="제목 강조(주황색) 줄 — 선택" value={th.accent} onChange={(v) => onChange({ ...d, heading: th.text, headingAccent: v })} />
          <Repeat<string>
            label="문단"
            items={d.paragraphs ?? []}
            makeNew={() => ""}
            onChange={(paragraphs) => onChange({ ...d, paragraphs })}
            render={(p, update) => <Field label="" value={p} textarea onChange={update} />}
          />
          <Field label="강조 인용구 (선택)" value={d.quote ?? ""} textarea onChange={(v) => onChange({ ...d, quote: v })} />
          <p className="text-xs text-neutral-400 pt-2">우측 패널 — 체크리스트 항목이 있으면 체크리스트, 없으면 아이콘+본문 하이라이트 카드로 표시됩니다.</p>
          <Field label="우측 패널 제목" value={d.panelTitle} onChange={(v) => onChange({ ...d, panelTitle: v })} />
          <Repeat<string>
            label="우측 패널 항목 (체크리스트)"
            items={d.panelItems ?? []}
            makeNew={() => ""}
            onChange={(panelItems) => onChange({ ...d, panelItems })}
            render={(it, update) => <Field label="" value={it} onChange={update} />}
          />
          <Field label="하이라이트 아이콘 (체크리스트 비울 때)" value={d.panelIcon ?? ""} onChange={(v) => onChange({ ...d, panelIcon: v })} />
          <Field label="하이라이트 본문 (체크리스트 비울 때)" value={d.panelText ?? ""} textarea onChange={(v) => onChange({ ...d, panelText: v })} />
          <Select
            label="하이라이트 색조"
            value={d.panelTone ?? "primary"}
            options={[
              { value: "primary", label: "기본(주황)" },
              { value: "warning", label: "경고(빨강)" },
            ]}
            onChange={(v) => onChange({ ...d, panelTone: v })}
          />
        </div>
      );
    }
    case "callout": {
      const d = data as CalloutData;
      const ch = htmlToFields(d.heading, d.headingAccent);
      return (
        <div className="space-y-3">
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="제목 (줄바꿈은 Enter)" value={ch.text} textarea onChange={(v) => onChange({ ...d, heading: v, headingAccent: ch.accent })} />
          <Field label="제목 강조(주황색) 줄 — 선택" value={ch.accent} onChange={(v) => onChange({ ...d, heading: ch.text, headingAccent: v })} />
          <Field label="설명" value={d.text ?? ""} textarea onChange={(v) => onChange({ ...d, text: v })} />
          <Select
            label="배경"
            value={d.theme ?? "surface"}
            options={[
              { value: "surface", label: "연한 강조(primary-surface)" },
              { value: "dark", label: "어두운 배경" },
            ]}
            onChange={(v) => onChange({ ...d, theme: v })}
          />
          <Repeat<string>
            label="배지 칩"
            items={d.badges ?? []}
            makeNew={() => ""}
            onChange={(badges) => onChange({ ...d, badges })}
            render={(b, update) => <Field label="" value={b} onChange={update} />}
          />
        </div>
      );
    }
    case "table": {
      const d = data as TableData;
      return (
        <div className="space-y-3">
          <Select
            label="섹션 배경"
            value={d.bg ?? "white"}
            options={[
              { value: "white", label: "흰색" },
              { value: "neutral", label: "연한 회색" },
            ]}
            onChange={(v) => onChange({ ...d, bg: v })}
          />
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="제목" value={d.heading ?? ""} onChange={(v) => onChange({ ...d, heading: v })} />
          <Field label="소개 문구" value={d.intro ?? ""} textarea onChange={(v) => onChange({ ...d, intro: v })} />
          <Select
            label="표 밀도"
            value={d.dense ? "dense" : "normal"}
            options={[
              { value: "normal", label: "표준" },
              { value: "dense", label: "밀집(작은 글씨, 행 많을 때)" },
            ]}
            onChange={(v) => onChange({ ...d, dense: v === "dense" })}
          />
          <Repeat<string>
            label="열 제목(헤더)"
            items={d.headers ?? []}
            makeNew={() => ""}
            onChange={(headers) => onChange({ ...d, headers })}
            render={(h, update) => <Field label="" value={h} onChange={update} />}
          />
          <Repeat<string[]>
            label="행 (셀은 | 로 구분)"
            items={d.rows ?? []}
            makeNew={() => d.headers.map(() => "")}
            onChange={(rows) => onChange({ ...d, rows })}
            render={(row, update) => (
              <Field
                label=""
                value={row.join(" | ")}
                textarea
                onChange={(v) => update(v.split("|").map((c) => c.trim()))}
              />
            )}
          />
        </div>
      );
    }
    case "card-list": {
      const d = data as CardListData;
      return (
        <div className="space-y-3">
          <Field label="윗 라벨(eyebrow)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <Field label="제목" value={d.heading ?? ""} onChange={(v) => onChange({ ...d, heading: v })} />
          <Field label="소개 문구" value={d.intro ?? ""} textarea onChange={(v) => onChange({ ...d, intro: v })} />
          <Select
            label="열 개수"
            value={String(d.columns) as "2" | "3"}
            options={[
              { value: "2", label: "2열" },
              { value: "3", label: "3열" },
            ]}
            onChange={(v) => onChange({ ...d, columns: Number(v) as 2 | 3 })}
          />
          <Select
            label="섹션 배경"
            value={d.bg ?? "white"}
            options={[
              { value: "white", label: "흰색(카드 연회색)" },
              { value: "neutral", label: "연회색(카드 흰색)" },
            ]}
            onChange={(v) => onChange({ ...d, bg: v })}
          />
          <Repeat<CardListItem>
            label="카드"
            items={d.cards ?? []}
            makeNew={() => ({ title: "카드 제목", items: ["항목"] })}
            onChange={(cards) => onChange({ ...d, cards })}
            render={(c, update) => (
              <>
                <Field label="번호 (선택, 예: 01)" value={c.num ?? ""} onChange={(v) => update({ ...c, num: v })} />
                <Field label="제목" value={c.title} onChange={(v) => update({ ...c, title: v })} />
                <Field label="부제 (선택)" value={c.subtitle ?? ""} onChange={(v) => update({ ...c, subtitle: v })} />
                <Repeat<string>
                  label="항목"
                  items={c.items ?? []}
                  makeNew={() => ""}
                  onChange={(items) => update({ ...c, items })}
                  render={(it, up) => <Field label="" value={it} onChange={up} />}
                />
              </>
            )}
          />
        </div>
      );
    }
    case "raw-html": {
      const d = data as RawHtmlData;
      return (
        <div className="space-y-3">
          <Select
            label="섹션 배경"
            value={d.bg ?? "white"}
            options={[
              { value: "white", label: "흰색" },
              { value: "neutral", label: "연회색" },
              { value: "surface", label: "연한 강조" },
            ]}
            onChange={(v) => onChange({ ...d, bg: v })}
          />
          <Field label="HTML (전폭 섹션 내용)" value={d.html} textarea onChange={(v) => onChange({ ...d, html: v })} />
          <p className="text-xs text-neutral-400">고급: 임의 HTML을 그대로 렌더합니다. 레이아웃이 복잡한 섹션용.</p>
        </div>
      );
    }
    case "floating-toolbar": {
      const d = data as FloatingToolbarData;
      return (
        <Repeat
          label="플로팅 버튼"
          items={d.items ?? []}
          makeNew={() => ({ icon: "call", href: "tel:031-767-0075", label: "전화", primary: false })}
          onChange={(items) => onChange({ ...d, items })}
          render={(it, update) => (
            <>
              <Field label="아이콘 (material명)" value={it.icon} onChange={(v) => update({ ...it, icon: v })} />
              <Field label="링크" value={it.href} onChange={(v) => update({ ...it, href: v })} />
              <Field label="툴팁 라벨" value={it.label} onChange={(v) => update({ ...it, label: v })} />
              <Select
                label="강조"
                value={it.primary ? "yes" : "no"}
                options={[
                  { value: "no", label: "흰색" },
                  { value: "yes", label: "주황(강조)" },
                ]}
                onChange={(v) => update({ ...it, primary: v === "yes" })}
              />
            </>
          )}
        />
      );
    }
    case "info-columns": {
      const d = data as InfoColumnsData;
      return (
        <div className="space-y-3">
          <Select
            label="섹션 배경"
            value={d.bg ?? "white"}
            options={[
              { value: "white", label: "흰색" },
              { value: "neutral", label: "연회색" },
            ]}
            onChange={(v) => onChange({ ...d, bg: v as "white" | "neutral" })}
          />
          <Field label="가운데 제목 (선택)" value={d.heading ?? ""} onChange={(v) => onChange({ ...d, heading: v })} />
          <Field label="윗 라벨(eyebrow, 선택)" value={d.eyebrow ?? ""} onChange={(v) => onChange({ ...d, eyebrow: v })} />
          <p className="text-xs font-bold text-neutral-600 pt-2">◀ 왼쪽 패널</p>
          <PanelForm panel={d.left} onChange={(left) => onChange({ ...d, left })} />
          <p className="text-xs font-bold text-neutral-600 pt-2">오른쪽 패널 ▶</p>
          <PanelForm panel={d.right} onChange={(right) => onChange({ ...d, right })} />
        </div>
      );
    }
    default:
      return <p className="text-sm text-neutral-400">알 수 없는 블록 타입: {type}</p>;
  }
}
