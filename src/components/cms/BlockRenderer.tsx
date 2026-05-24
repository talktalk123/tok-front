/**
 * 블록 렌더러 — 공개 페이지(SSR)와 admin 미리보기가 공유한다.
 * 전부 Server Component 호환(여기에 "use client" 없음). FAQ는 native <details>라 JS 불필요.
 */
import Link from "next/link";
import FAQSchema from "@/components/FAQSchema";
import type {
  CmsBlock,
  CmsButton,
  HeroData,
  RichTextData,
  CardGridData,
  TwoColumnData,
  ProcessStepsData,
  FaqData,
  CtaData,
} from "@/lib/cms/blocks";

const SECTION = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

function Buttons({ buttons, onDark }: { buttons: CmsButton[]; onDark?: boolean }) {
  if (!buttons?.length) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {buttons.map((b, i) => {
        const isTel = b.href?.startsWith("tel:") || b.href?.startsWith("http");
        const cls =
          b.style === "primary"
            ? "px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold transition-all flex items-center gap-2"
            : onDark
              ? "px-6 py-3 border border-white/30 rounded-lg hover:bg-white hover:text-neutral-900 transition-all font-bold flex items-center gap-2"
              : "px-6 py-3 border border-neutral-300 rounded-lg hover:border-primary hover:text-primary transition-all font-bold flex items-center gap-2";
        return isTel ? (
          <a key={i} href={b.href} className={cls}>
            {b.label}
          </a>
        ) : (
          <Link key={i} href={b.href} className={cls}>
            {b.label}
          </Link>
        );
      })}
    </div>
  );
}

function Eyebrow({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
      {text}
    </p>
  );
}

function HeroBlock({ d }: { d: HeroData }) {
  const isImage = d.bg?.type === "image";
  // 색상은 인라인 style(CSS 색상값)로 — admin이 입력한 임의 색을 Tailwind 빌드 없이 적용
  const style: React.CSSProperties = isImage
    ? {
        backgroundImage: `url(${d.bg.value})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundColor: d.bg?.value || "#171717" };
  return (
    <section className="relative py-28 text-white" style={style}>
      {isImage && <div className="absolute inset-0 bg-black/50" />}
      <div className={`${SECTION} relative`}>
        <Eyebrow text={d.eyebrow} />
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">{d.title}</h1>
        {d.subtitle && (
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-8">
            {d.subtitle}
          </p>
        )}
        <Buttons buttons={d.buttons} onDark />
      </div>
    </section>
  );
}

function RichTextBlock({ d }: { d: RichTextData }) {
  return (
    <section className="py-20 bg-white">
      <div className={`${SECTION} max-w-4xl`}>
        <Eyebrow text={d.eyebrow} />
        {d.heading && (
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{d.heading}</h2>
        )}
        <div
          className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: d.html }}
        />
      </div>
    </section>
  );
}

function CardGridBlock({ d }: { d: CardGridData }) {
  const cols =
    d.columns === 4
      ? "lg:grid-cols-4"
      : d.columns === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-3";
  return (
    <section className="py-24 bg-neutral-50">
      <div className={SECTION}>
        {(d.heading || d.eyebrow) && (
          <div className="text-center mb-12">
            <Eyebrow text={d.eyebrow} />
            {d.heading && (
              <h2 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight">
                {d.heading}
              </h2>
            )}
            {d.intro && (
              <p className="text-stone-500 max-w-3xl mx-auto mt-4 leading-relaxed">{d.intro}</p>
            )}
          </div>
        )}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-6`}>
          {d.cards.map((c, i) => {
            const inner = (
              <>
                <div className="flex flex-col items-center w-full">
                  <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                    <span className="material-icons text-primary group-hover:text-white text-4xl">
                      {c.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-stone-900 group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{c.desc}</p>
                </div>
              </>
            );
            const cls =
              "group relative bg-white p-6 rounded-[2rem] border-2 border-stone-50 card-button-shadow hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center justify-between";
            return c.href ? (
              <Link key={i} href={c.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <div key={i} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TwoColumnBlock({ d }: { d: TwoColumnData }) {
  const imageFirst = d.imageSide === "left";
  const img = (
    <div className="w-full lg:w-1/2 relative">
      <img
        className="rounded-3xl shadow-2xl relative z-10 w-full aspect-[4/5] object-cover"
        alt={d.image.alt}
        src={d.image.src}
      />
    </div>
  );
  const text = (
    <div className="w-full lg:w-1/2">
      <Eyebrow text={d.eyebrow} />
      <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{d.heading}</h2>
      {d.paragraphs?.map((p, i) => (
        <p key={i} className="text-neutral-600 leading-relaxed mb-4">
          {p}
        </p>
      ))}
      {d.list && d.list.length > 0 && (
        <ul className="space-y-2 text-sm text-neutral-700 leading-relaxed my-6">
          {d.list.map((li, i) => (
            <li key={i} className="flex gap-2">
              <span className="material-symbols-outlined text-primary text-base">check_circle</span>
              {li}
            </li>
          ))}
        </ul>
      )}
      {d.buttons && <Buttons buttons={d.buttons} />}
    </div>
  );
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className={SECTION}>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {imageFirst ? (
            <>
              {img}
              {text}
            </>
          ) : (
            <>
              {text}
              {img}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function ProcessStepsBlock({ d }: { d: ProcessStepsData }) {
  return (
    <section className="py-24 bg-white">
      <div className={SECTION}>
        <div className="text-center mb-16">
          <Eyebrow text={d.eyebrow} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{d.heading}</h2>
          {d.intro && (
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">{d.intro}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {d.steps.map((s, i) => (
            <div
              key={i}
              className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:border-primary/40 transition-colors"
            >
              <div className="text-3xl font-black text-primary mb-3">{s.num}</div>
              <h3 className="text-lg font-bold mb-2 text-neutral-900">{s.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqBlock({ d }: { d: FaqData }) {
  return (
    <section className="py-24 bg-white">
      <div className={`${SECTION} max-w-4xl`}>
        <div className="text-center mb-16">
          <Eyebrow text={d.eyebrow} />
          {d.heading && (
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">{d.heading}</h2>
          )}
        </div>
        {/* 검색엔진/AI용 FAQ 구조화 데이터 (시각 렌더와 별개) */}
        <FAQSchema items={d.items} />
        <div className="space-y-4">
          {d.items.map((item, i) => (
            <details
              key={i}
              className="group bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden"
            >
              <summary className="cursor-pointer list-none p-6 flex justify-between items-start gap-4 hover:bg-neutral-100 transition-colors">
                <h3 className="text-lg font-bold text-neutral-900 flex-1 leading-snug">
                  Q. {item.q}
                </h3>
                <span className="material-symbols-outlined text-primary flex-shrink-0 group-open:rotate-45 transition-transform">
                  add
                </span>
              </summary>
              <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBlock({ d }: { d: CtaData }) {
  const dark = d.theme === "dark";
  return (
    <section className={`py-20 ${dark ? "bg-neutral-900 text-white" : "bg-primary-surface"}`}>
      <div className={`${SECTION} text-center`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{d.heading}</h2>
        {d.text && (
          <p className={`max-w-2xl mx-auto mb-8 leading-relaxed ${dark ? "text-neutral-300" : "text-neutral-600"}`}>
            {d.text}
          </p>
        )}
        <div className="flex justify-center">
          <Buttons buttons={d.buttons} onDark={dark} />
        </div>
      </div>
    </section>
  );
}

/** 단일 블록 렌더 */
export function RenderBlock({ block }: { block: CmsBlock }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock d={block.data as HeroData} />;
    case "rich-text":
      return <RichTextBlock d={block.data as RichTextData} />;
    case "card-grid":
      return <CardGridBlock d={block.data as CardGridData} />;
    case "two-column":
      return <TwoColumnBlock d={block.data as TwoColumnData} />;
    case "process-steps":
      return <ProcessStepsBlock d={block.data as ProcessStepsData} />;
    case "faq":
      return <FaqBlock d={block.data as FaqData} />;
    case "cta":
      return <CtaBlock d={block.data as CtaData} />;
    default:
      return null;
  }
}

/** 블록 목록 렌더 (공개 페이지 본문 + admin 미리보기 공용) */
export default function BlockRenderer({ blocks }: { blocks: CmsBlock[] }) {
  return (
    <>
      {blocks.map((b) => (
        <RenderBlock key={b.id} block={b} />
      ))}
    </>
  );
}
