/**
 * 블록 CMS — 타입/스키마 단일 소스.
 * 서버 컴포넌트(렌더러)와 클라이언트(admin 폼) 양쪽에서 import 한다.
 * "use client" 금지 · 서버 전용 import 금지 (순수 타입 + 데이터만).
 *
 * 백엔드 src/modules/content/block-types.ts 의 BLOCK_TYPES 와 동일하게 유지할 것.
 */

export type ButtonStyle = "primary" | "outline";
export interface CmsButton {
  label: string;
  href: string;
  style: ButtonStyle;
  /** material symbol 이름 (선택). 라벨 뒤/앞에 표시 */
  icon?: string;
}

export interface HeroData {
  eyebrow?: string;
  breadcrumb?: string;
  badge?: string;
  /** HTML 허용 (제목 내 <br/>, <span class="text-primary"> 등 보존) */
  title: string;
  subtitle?: string;
  bg: { type: "color" | "image"; value: string };
  /** 어두운 배경(흰 글씨) / 밝은 배경(검은 글씨) */
  theme?: "dark" | "light";
  tags?: string[];
  buttons: CmsButton[];
}

export interface RichTextData {
  eyebrow?: string;
  heading?: string;
  /** 신뢰된 admin 입력. 렌더 시 dangerouslySetInnerHTML 로 출력 */
  html: string;
}

export interface CardItem {
  icon: string; // material symbol name (variant=icon일 때)
  num?: string; // 번호 배지 (variant=number일 때)
  title: string;
  desc: string;
  href?: string;
}
export interface CardGridData {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  columns: 2 | 3 | 4;
  /** icon=아이콘 원형 배지, number=번호 사각 배지 */
  variant?: "icon" | "number";
  cards: CardItem[];
}

/** 좌(텍스트+인용구) / 우(패널: 제목+체크리스트) 2단 */
export interface TextPanelData {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  /** 강조 인용구 박스(좌측 하단). 비우면 표시 안 함 */
  quote?: string;
  panelTitle: string;
  panelItems: string[];
}

/** 가운데 정렬 강조 밴드 + 배지 칩 */
export interface CalloutData {
  eyebrow?: string;
  heading: string;
  text?: string;
  badges?: string[];
  theme?: "surface" | "dark";
}

/** 표 */
export interface TableData {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  headers: string[];
  rows: string[][];
}

/** 제목+불릿 리스트 패널 카드들 (이력/안내 등) */
export interface CardListItem {
  title: string;
  subtitle?: string;
  items: string[];
}
export interface CardListData {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  columns: 2 | 3;
  cards: CardListItem[];
}

export interface TwoColumnData {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  imageSide: "left" | "right";
  list?: string[];
  buttons?: CmsButton[];
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}
export interface ProcessStepsData {
  eyebrow?: string;
  heading: string;
  intro?: string;
  steps: ProcessStep[];
}

export interface FaqItem {
  q: string;
  a: string;
}
export interface FaqData {
  eyebrow?: string;
  heading?: string;
  items: FaqItem[];
}

export interface CtaData {
  heading: string;
  text?: string;
  buttons: CmsButton[];
  theme: "dark" | "light";
}

export type BlockType =
  | "hero"
  | "rich-text"
  | "card-grid"
  | "two-column"
  | "process-steps"
  | "faq"
  | "cta"
  | "text-panel"
  | "callout"
  | "table"
  | "card-list";

export interface BlockDataMap {
  hero: HeroData;
  "rich-text": RichTextData;
  "card-grid": CardGridData;
  "two-column": TwoColumnData;
  "process-steps": ProcessStepsData;
  faq: FaqData;
  cta: CtaData;
  "text-panel": TextPanelData;
  callout: CalloutData;
  table: TableData;
  "card-list": CardListData;
}

/** 공개/편집 공통 블록. visible 은 admin 편집 시에만 의미. */
export interface CmsBlock<T extends BlockType = BlockType> {
  id: string;
  type: T;
  data: BlockDataMap[T];
  order?: number;
  visible?: boolean;
}

export interface PageSeo {
  title?: string;
  description?: string;
  ogImage?: string;
}
export interface CmsPage {
  slug: string;
  displayName: string;
  theme: { seo?: PageSeo } & Record<string, unknown>;
  blocks: CmsBlock[];
}

/** admin "블록 추가" 메뉴 메타 + 기본값 */
export const BLOCK_REGISTRY: ReadonlyArray<{
  type: BlockType;
  label: string;
  icon: string;
}> = [
  { type: "hero", label: "히어로 (상단 배너)", icon: "wallpaper" },
  { type: "rich-text", label: "제목 + 본문", icon: "article" },
  { type: "card-grid", label: "카드 그리드", icon: "grid_view" },
  { type: "two-column", label: "이미지 + 텍스트", icon: "view_column" },
  { type: "process-steps", label: "단계 안내", icon: "format_list_numbered" },
  { type: "faq", label: "FAQ 아코디언", icon: "quiz" },
  { type: "cta", label: "강조 배너 (CTA)", icon: "campaign" },
  { type: "text-panel", label: "텍스트 + 체크리스트 패널", icon: "vertical_split" },
  { type: "callout", label: "강조 밴드 (가운데)", icon: "ad_units" },
  { type: "table", label: "표", icon: "table" },
  { type: "card-list", label: "리스트 카드", icon: "list_alt" },
];

export const BLOCK_LABEL: Record<BlockType, string> = Object.fromEntries(
  BLOCK_REGISTRY.map((b) => [b.type, b.label]),
) as Record<BlockType, string>;

/** 새 블록 추가 시 기본 데이터 */
export function createDefaultBlockData(type: BlockType): BlockDataMap[BlockType] {
  switch (type) {
    case "hero":
      return {
        eyebrow: "",
        title: "제목을 입력하세요",
        subtitle: "",
        bg: { type: "color", value: "#171717" },
        buttons: [],
      } satisfies HeroData;
    case "rich-text":
      return {
        eyebrow: "",
        heading: "소제목",
        html: "<p>본문 내용을 입력하세요.</p>",
      } satisfies RichTextData;
    case "card-grid":
      return {
        eyebrow: "",
        heading: "",
        intro: "",
        columns: 3,
        cards: [{ icon: "check_circle", title: "카드 제목", desc: "설명" }],
      } satisfies CardGridData;
    case "two-column":
      return {
        eyebrow: "",
        heading: "제목",
        paragraphs: ["문단 내용을 입력하세요."],
        image: { src: "/images/doctor.jpg", alt: "" },
        imageSide: "left",
        list: [],
        buttons: [],
      } satisfies TwoColumnData;
    case "process-steps":
      return {
        eyebrow: "",
        heading: "진행 단계",
        intro: "",
        steps: [{ num: "01", title: "단계 제목", desc: "설명" }],
      } satisfies ProcessStepsData;
    case "faq":
      return {
        eyebrow: "",
        heading: "자주 묻는 질문",
        items: [{ q: "질문", a: "답변" }],
      } satisfies FaqData;
    case "cta":
      return {
        heading: "지금 문의하세요",
        text: "",
        buttons: [{ label: "전화 문의", href: "tel:031-767-0075", style: "primary" }],
        theme: "dark",
      } satisfies CtaData;
    case "text-panel":
      return {
        eyebrow: "",
        heading: "제목",
        paragraphs: ["문단 내용을 입력하세요."],
        quote: "",
        panelTitle: "패널 제목",
        panelItems: ["항목 1", "항목 2"],
      } satisfies TextPanelData;
    case "callout":
      return {
        eyebrow: "",
        heading: "강조 문구",
        text: "",
        badges: [],
        theme: "surface",
      } satisfies CalloutData;
    case "table":
      return {
        eyebrow: "",
        heading: "표 제목",
        intro: "",
        headers: ["구분", "설명"],
        rows: [["항목", "내용"]],
      } satisfies TableData;
    case "card-list":
      return {
        eyebrow: "",
        heading: "",
        intro: "",
        columns: 2,
        cards: [{ title: "카드 제목", items: ["항목 1", "항목 2"] }],
      } satisfies CardListData;
  }
}
