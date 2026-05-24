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
}

export interface HeroData {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bg: { type: "color" | "image"; value: string };
  buttons: CmsButton[];
}

export interface RichTextData {
  eyebrow?: string;
  heading?: string;
  /** 신뢰된 admin 입력. 렌더 시 dangerouslySetInnerHTML 로 출력 */
  html: string;
}

export interface CardItem {
  icon: string; // material symbol name
  title: string;
  desc: string;
  href?: string;
}
export interface CardGridData {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  columns: 2 | 3 | 4;
  cards: CardItem[];
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
  | "cta";

export interface BlockDataMap {
  hero: HeroData;
  "rich-text": RichTextData;
  "card-grid": CardGridData;
  "two-column": TwoColumnData;
  "process-steps": ProcessStepsData;
  faq: FaqData;
  cta: CtaData;
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
        bg: { type: "color", value: "bg-neutral-900" },
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
  }
}
