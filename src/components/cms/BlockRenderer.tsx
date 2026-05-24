/**
 * 블록 렌더러 — 공개 페이지(SSR)와 admin 미리보기가 공유한다.
 * 전부 Server Component 호환(여기에 "use client" 없음). FAQ는 native <details>라 JS 불필요.
 */
import Link from "next/link";
import FAQSchema from "@/components/FAQSchema";
import { fieldToHtml } from "@/lib/cms/blocks";
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
  TextPanelData,
  CalloutData,
  TableData,
  CardListData,
  RawHtmlData,
  FloatingToolbarData,
  InfoColumnsData,
  InfoPanel,
} from "@/lib/cms/blocks";

const SECTION = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

function Buttons({ buttons, onDark }: { buttons: CmsButton[]; onDark?: boolean }) {
  if (!buttons?.length) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {buttons.map((b, i) => {
        const external = b.href?.startsWith("http");
        const isTel = b.href?.startsWith("tel:") || external;
        const cls =
          b.style === "primary"
            ? "px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold transition-all flex items-center gap-2"
            : onDark
              ? "px-6 py-3 border border-white/30 rounded-lg hover:bg-white hover:text-neutral-900 transition-all font-bold flex items-center gap-2"
              : "px-6 py-3 border border-neutral-300 rounded-lg hover:border-primary hover:text-primary transition-all font-bold flex items-center gap-2";
        const inner = (
          <>
            {b.label}
            {b.icon && <span className="material-symbols-outlined">{b.icon}</span>}
          </>
        );
        return isTel ? (
          <a
            key={i}
            href={b.href}
            {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            className={cls}
          >
            {inner}
          </a>
        ) : (
          <Link key={i} href={b.href} className={cls}>
            {inner}
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
  const dark = (d.theme ?? "dark") === "dark";
  const isImage = d.bg?.type === "image";
  // 이미지 히어로: 70vh 중앙정렬 / 그라데이션 히어로: 위에서부터 짧은 패딩
  const layoutCls = isImage
    ? `relative min-h-[70vh] flex items-center overflow-hidden ${dark ? "bg-neutral-900" : ""}`
    : `relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 ${dark ? "bg-neutral-900" : "bg-gradient-to-br from-primary-surface to-white"}`;
  const bgStyle: React.CSSProperties | undefined =
    !isImage && dark && d.bg?.value ? { backgroundColor: d.bg.value } : undefined;
  const innerCls = isImage
    ? "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    : "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const blockCls = isImage ? "max-w-3xl" : "max-w-4xl";
  return (
    <header className={layoutCls} style={bgStyle}>
      {isImage && (
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            className={`w-full h-full object-cover ${dark ? "opacity-60 scale-105" : ""}`}
            src={d.bg.value}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${dark ? "from-neutral-900 via-neutral-900/40 to-transparent" : "from-white via-white/85 to-transparent"}`}
          />
        </div>
      )}
      {!isImage && d.bgImage && (
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
          src={d.bgImage}
        />
      )}
      <div className={innerCls}>
        <div className={blockCls}>
          {d.breadcrumb && (
            <p className={`text-sm mb-3 ${dark ? "text-neutral-400" : "text-neutral-500"}`}>
              {d.breadcrumb}
            </p>
          )}
          {d.badge && (
            <span
              className={
                dark
                  ? "inline-block px-4 py-1.5 bg-primary/20 border border-primary/30 text-primary-300 rounded-full text-sm font-semibold mb-6"
                  : "inline-block px-3 py-1 bg-primary-light text-primary rounded-full text-xs font-bold mb-4"
              }
            >
              {d.badge}
            </span>
          )}
          {d.eyebrow && (
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">{d.eyebrow}</p>
          )}
          <h1
            className={`text-4xl md:text-6xl font-bold mb-8 leading-tight ${dark ? "text-white" : "text-neutral-900"}`}
            dangerouslySetInnerHTML={{ __html: fieldToHtml(d.title, d.titleAccent) }}
          />
          {d.subtitle && (
            <p
              className={`text-lg md:text-xl leading-relaxed ${d.subtitle2 ? "mb-6" : "mb-10"} ${dark ? "text-neutral-300" : "text-neutral-600"}`}
              dangerouslySetInnerHTML={{ __html: fieldToHtml(d.subtitle) }}
            />
          )}
          {d.subtitle2 && (
            <p
              className={`text-base leading-relaxed mb-10 ${dark ? "text-neutral-400" : "text-neutral-500"}`}
              dangerouslySetInnerHTML={{ __html: fieldToHtml(d.subtitle2) }}
            />
          )}
          {d.tags && d.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-10">
              {d.tags.map((t, i) => (
                <span
                  key={i}
                  className={
                    dark
                      ? "px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold rounded-full"
                      : "px-3 py-1.5 bg-white border border-primary/20 text-primary text-xs font-semibold rounded-full"
                  }
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <Buttons buttons={d.buttons} onDark={dark} />
        </div>
      </div>
    </header>
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
    <section className={`py-24 ${d.bg === "white" ? "bg-white" : "bg-neutral-50"}`}>
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
        {d.variant === "icon-num" ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-6`}>
            {d.cards.map((c, i) => (
              <div
                key={i}
                className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:border-primary/40 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-surface text-primary rounded-xl flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                </div>
                {c.num && <p className="text-xs font-bold text-primary mb-2">{c.num}</p>}
                <h3 className="text-xl font-bold mb-3 text-neutral-900">{c.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        ) : d.variant === "number" || d.variant === "number-lg" ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-6`}>
            {d.cards.map((c, i) => {
              // number-lg: 섹션 배경과 대비되게 카드 색 (white 섹션→회색 카드, neutral 섹션→흰 카드)
              const lgCard =
                d.bg === "white"
                  ? "bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:border-primary/40 transition-colors"
                  : "bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm";
              const four = d.columns === 4;
              return (
                <div
                  key={i}
                  className={
                    d.variant === "number-lg"
                      ? lgCard
                      : "bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                  }
                >
                  {d.variant === "number-lg" ? (
                    <div className="text-3xl font-black text-primary mb-3">{c.num ?? String(i + 1)}</div>
                  ) : (
                    <div className="w-12 h-12 bg-primary-surface text-primary rounded-xl flex items-center justify-center font-bold text-lg mb-4">
                      {c.num ?? String(i + 1)}
                    </div>
                  )}
                  <h3 className={`${four ? "text-lg" : "text-xl"} font-bold mb-3 text-neutral-900`}>
                    {c.title}
                  </h3>
                  <p className={`${four ? "text-sm " : ""}text-neutral-600 leading-relaxed`}>
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
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
                    <p className="text-stone-500 text-xs leading-relaxed mb-4">{c.desc}</p>
                  </div>
                  {c.href && (
                    <div className="w-full">
                      <div className="w-full py-2.5 bg-stone-50 group-hover:bg-primary group-hover:text-white rounded-xl text-stone-600 text-xs font-bold transition-all flex items-center justify-center gap-2">
                        자세히 보기
                        <span className="material-icons text-[10px]">arrow_forward</span>
                      </div>
                    </div>
                  )}
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
        )}
      </div>
    </section>
  );
}

function TwoColumnBlock({ d }: { d: TwoColumnData }) {
  const imageFirst = d.imageSide === "left";
  const img = (
    <div className="w-full lg:w-1/2 relative">
      {d.blob && (
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-surface rounded-full blur-3xl opacity-50" />
      )}
      <img
        className="rounded-3xl shadow-2xl relative z-10 w-full aspect-[4/5] object-cover"
        alt={d.image.alt}
        src={d.image.src}
      />
      {d.imageCaption && (
        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-neutral-100">
          {d.imageCaption.label && (
            <p className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">
              {d.imageCaption.label}
            </p>
          )}
          {d.imageCaption.title && (
            <p className="text-xl font-bold text-neutral-900">{d.imageCaption.title}</p>
          )}
        </div>
      )}
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
      {d.badges && d.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {d.badges.map((b, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-semibold rounded-full"
            >
              {b}
            </span>
          ))}
        </div>
      )}
      {d.listCard && (
        <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
          <h3 className="text-lg font-bold mb-4 text-neutral-900">{d.listCard.title}</h3>
          <ul className="space-y-2 text-sm text-neutral-700 leading-relaxed">
            {d.listCard.items.map((it, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">·</span>
                {it}
              </li>
            ))}
          </ul>
          {d.listCard.link && (
            <Link
              href={d.listCard.link.href}
              className="mt-6 inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
            >
              {d.listCard.link.label}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          )}
        </div>
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

function TextPanelBlock({ d }: { d: TextPanelData }) {
  const surface = d.bg === "surface";
  const paraColor = surface ? "text-neutral-700" : "text-neutral-600";
  const isChecklist = !!d.panelItems && d.panelItems.length > 0;
  return (
    <section className={`py-24 ${surface ? "bg-primary-surface" : "bg-white"}`}>
      <div className={SECTION}>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Eyebrow text={d.eyebrow} />
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-neutral-900"
              dangerouslySetInnerHTML={{ __html: fieldToHtml(d.heading, d.headingAccent) }}
            />
            {d.paragraphs?.map((p, i) => (
              <p key={i} className={`${paraColor} leading-relaxed mb-5`}>
                {p}
              </p>
            ))}
            {d.quote && (
              <p className="text-base text-neutral-700 leading-relaxed bg-primary-surface p-6 rounded-2xl border-l-4 border-primary">
                {d.quote}
              </p>
            )}
          </div>
          {isChecklist ? (
            <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
              <h3 className="text-xl font-bold mb-6 text-neutral-900">{d.panelTitle}</h3>
              <ul className="space-y-4">
                {d.panelItems!.map((item, i) => (
                  <li key={i} className="flex gap-3 text-neutral-700 leading-relaxed">
                    <span className="material-symbols-outlined text-primary flex-shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div
              className={`bg-white rounded-3xl p-10 border-2 shadow-sm ${d.panelTone === "warning" ? "border-red-200" : "border-primary/20"}`}
            >
              <div className="flex items-center gap-3 mb-4">
                {d.panelIcon && (
                  <span
                    className={`material-symbols-outlined text-3xl ${d.panelTone === "warning" ? "text-red-500" : "text-primary"}`}
                  >
                    {d.panelIcon}
                  </span>
                )}
                <h3 className="text-xl font-bold text-neutral-900">{d.panelTitle}</h3>
              </div>
              {d.panelText && <p className="text-neutral-600 leading-relaxed">{d.panelText}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CalloutBlock({ d }: { d: CalloutData }) {
  const dark = d.theme === "dark";
  return (
    <section className={`py-20 ${dark ? "bg-neutral-900 text-white" : "bg-primary-surface"}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Eyebrow text={d.eyebrow} />
        <h2
          className={`text-2xl md:text-4xl font-bold mb-6 leading-tight ${dark ? "text-white" : "text-neutral-900"}`}
          dangerouslySetInnerHTML={{ __html: fieldToHtml(d.heading, d.headingAccent) }}
        />
        {d.text && (
          <p
            className={`leading-relaxed mb-8 max-w-3xl mx-auto ${dark ? "text-neutral-300" : "text-neutral-600"}`}
          >
            {d.text}
          </p>
        )}
        {d.badges && d.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {d.badges.map((b, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white text-primary text-sm font-bold rounded-full border border-primary/20"
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function TableBlock({ d }: { d: TableData }) {
  return (
    <section className={`py-24 ${d.bg === "neutral" ? "bg-neutral-50" : "bg-white"}`}>
      <div className={SECTION}>
        {(d.heading || d.eyebrow) && (
          <div className="text-center mb-16">
            <Eyebrow text={d.eyebrow} />
            {d.heading && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{d.heading}</h2>
            )}
            {d.intro && (
              <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">{d.intro}</p>
            )}
          </div>
        )}
        <div className="overflow-x-auto">
          <table
            className={`w-full ${d.dense ? "text-xs md:text-sm" : "text-sm md:text-base"} border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100`}
          >
            <thead>
              <tr className="bg-neutral-900 text-white">
                {d.headers.map((h, i) => (
                  <th key={i} className="p-4 text-left font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={
                        ci === 0
                          ? "p-4 font-bold text-primary"
                          : ci === 1
                            ? "p-4 text-neutral-700"
                            : "p-4 text-neutral-600"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CardListBlock({ d }: { d: CardListData }) {
  const cols = d.columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  const neutralSection = d.bg === "neutral";
  // 섹션이 neutral이면 카드는 흰색(대비), white면 카드는 연회색
  const cardCls = neutralSection
    ? "bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm"
    : "bg-neutral-50 rounded-3xl p-10 border border-neutral-100";
  return (
    <section className={`py-24 ${neutralSection ? "bg-neutral-50" : "bg-white"}`}>
      <div className={SECTION}>
        {(d.heading || d.eyebrow) && (
          <div className="text-center mb-16">
            <Eyebrow text={d.eyebrow} />
            {d.heading && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{d.heading}</h2>
            )}
            {d.intro && (
              <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">{d.intro}</p>
            )}
          </div>
        )}
        <div className={`grid ${cols} gap-6`}>
          {d.cards.map((c, i) => (
            <div key={i} className={cardCls}>
              {c.num && <div className="text-4xl font-black text-primary mb-4">{c.num}</div>}
              <h3 className={`text-xl font-bold text-neutral-900 ${c.subtitle ? "mb-3" : "mb-6"}`}>
                {c.title}
              </h3>
              {c.subtitle && (
                <p className="text-xs text-neutral-500 mb-6 leading-relaxed">{c.subtitle}</p>
              )}
              <ul className="space-y-3">
                {c.items?.map((item, j) =>
                  c.num ? (
                    <li key={j} className="flex gap-2 text-sm text-neutral-600 leading-relaxed">
                      <span className="text-primary flex-shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ) : (
                    <li key={j} className="flex gap-3 text-neutral-700">
                      <span className="text-primary font-bold">·</span>
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RawHtmlBlock({ d }: { d: RawHtmlData }) {
  const bg =
    d.bg === "neutral" ? "bg-neutral-50" : d.bg === "surface" ? "bg-primary-surface" : "bg-white";
  return (
    <section className={`py-24 ${bg}`} dangerouslySetInnerHTML={{ __html: d.html }} />
  );
}

function FloatingToolbarBlock({ d }: { d: FloatingToolbarData }) {
  return (
    <div className="fixed right-6 bottom-10 z-[60] flex flex-col gap-3">
      {d.items?.map((it, i) => {
        const ext = it.href?.startsWith("http");
        return (
          <a
            key={i}
            href={it.href}
            {...(ext && { target: "_blank", rel: "noopener noreferrer" })}
            className={`relative w-14 h-14 shadow-xl rounded-full flex items-center justify-center transition-all group ${
              it.primary
                ? "bg-primary text-white hover:bg-primary-dark"
                : "bg-white text-neutral-700 hover:text-primary border border-neutral-100"
            }`}
          >
            <span className="material-icons">{it.icon}</span>
            <span className="absolute right-16 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {it.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

function PanelButtons({ buttons }: { buttons?: { label: string; href: string; primary?: boolean }[] }) {
  if (!buttons?.length) return null;
  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {buttons.map((b, i) => {
        const ext = b.href?.startsWith("http");
        const cls = b.primary
          ? "px-5 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all flex items-center gap-2 text-sm"
          : "px-5 py-3 bg-white border border-neutral-200 text-neutral-800 rounded-lg font-bold hover:bg-neutral-50 transition-all flex items-center gap-2 text-sm";
        return b.href?.startsWith("tel:") || ext ? (
          <a key={i} href={b.href} {...(ext && { target: "_blank", rel: "noopener noreferrer" })} className={cls}>
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

function InfoPanelView({ p, sectionNeutral }: { p: InfoPanel; sectionNeutral: boolean }) {
  if (p.kind === "map") {
    return (
      <div className="rounded-3xl overflow-hidden shadow-lg min-h-[380px] border border-neutral-200 bg-gradient-to-br from-primary-surface to-white relative flex items-center justify-center p-10">
        <div className="text-center">
          <span className="material-symbols-outlined text-primary text-7xl mb-4">location_on</span>
          {p.title && <h3 className="text-xl font-bold text-neutral-900 mb-2">{p.title}</h3>}
          {p.addressLines?.map((a, i) => (
            <p key={i} className="text-neutral-600">{a}</p>
          ))}
          {p.sub && <p className="text-sm text-neutral-500 mt-2">{p.sub}</p>}
          {p.links && p.links.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {p.links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white border border-primary/30 text-primary rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (p.kind === "text") {
    return (
      <div>
        <Eyebrow text={p.eyebrow} />
        {p.heading && (
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-neutral-900">{p.heading}</h2>
        )}
        {p.paragraphs?.map((para, i) => (
          <p key={i} className="text-neutral-600 leading-relaxed mb-5">{para}</p>
        ))}
        {p.note && (
          <div className="bg-white rounded-2xl p-6 border-2 border-primary/20 mb-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-2xl flex-shrink-0">{p.note.icon || "info"}</span>
              <div>
                {p.note.title && <h3 className="font-bold text-neutral-900 mb-2">{p.note.title}</h3>}
                <p className="text-sm text-neutral-600 leading-relaxed">{p.note.text}</p>
              </div>
            </div>
          </div>
        )}
        <PanelButtons buttons={p.buttons} />
      </div>
    );
  }

  // kind === "card"
  const cardCls = sectionNeutral
    ? "bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm"
    : "bg-neutral-50 p-10 rounded-3xl border border-neutral-100";
  return (
    <div className={cardCls}>
      {p.title && (
        <div className="flex items-center gap-3 mb-6">
          {p.icon && <span className="material-symbols-outlined text-primary text-3xl">{p.icon}</span>}
          <h3 className="text-2xl font-bold text-neutral-900">{p.title}</h3>
        </div>
      )}
      {p.rows && p.rows.length > 0 && (
        <div className="space-y-1 mb-6">
          {p.rows.map((r, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b border-neutral-100 last:border-b-0"
            >
              <span className={`font-medium ${r.highlight ? "text-primary" : "text-neutral-600"}`}>{r.label}</span>
              <span className={`font-bold ${r.highlight ? "text-primary" : "text-neutral-900"}`}>{r.value}</span>
            </div>
          ))}
        </div>
      )}
      {p.lines && p.lines.length > 0 && (
        <div className="space-y-4 mb-6">
          {p.lines.map((l, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary flex-shrink-0">{l.icon || "check"}</span>
              {l.href ? (
                <a href={l.href} className="text-neutral-700 font-bold hover:text-primary transition-colors">{l.text}</a>
              ) : (
                <p className="text-neutral-700 leading-relaxed">{l.text}</p>
              )}
            </div>
          ))}
        </div>
      )}
      {p.note && (
        <div className="bg-primary-surface rounded-xl p-5 border border-primary/20 mb-6">
          {p.note.title && <h4 className="font-bold text-neutral-900 mb-1">{p.note.title}</h4>}
          <p className="text-sm text-neutral-600 leading-relaxed">{p.note.text}</p>
        </div>
      )}
      <PanelButtons buttons={p.buttons} />
    </div>
  );
}

function InfoColumnsBlock({ d }: { d: InfoColumnsData }) {
  const sectionNeutral = d.bg === "neutral";
  return (
    <section className={`py-24 ${sectionNeutral ? "bg-neutral-50" : "bg-white"}`}>
      <div className={SECTION}>
        {(d.heading || d.eyebrow) && (
          <div className="text-center mb-12">
            <Eyebrow text={d.eyebrow} />
            {d.heading && (
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">{d.heading}</h2>
            )}
          </div>
        )}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <InfoPanelView p={d.left} sectionNeutral={sectionNeutral} />
          <InfoPanelView p={d.right} sectionNeutral={sectionNeutral} />
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
    case "text-panel":
      return <TextPanelBlock d={block.data as TextPanelData} />;
    case "callout":
      return <CalloutBlock d={block.data as CalloutData} />;
    case "table":
      return <TableBlock d={block.data as TableData} />;
    case "card-list":
      return <CardListBlock d={block.data as CardListData} />;
    case "raw-html":
      return <RawHtmlBlock d={block.data as RawHtmlData} />;
    case "floating-toolbar":
      return <FloatingToolbarBlock d={block.data as FloatingToolbarData} />;
    case "info-columns":
      return <InfoColumnsBlock d={block.data as InfoColumnsData} />;
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
