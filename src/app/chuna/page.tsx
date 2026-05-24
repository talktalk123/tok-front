import type { Metadata } from "next";
import Link from "next/link";
import { getCmsPage } from "@/lib/cms/pages";
import CmsPageShell from "@/components/cms/CmsPage";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";

const CHUNA_FAQ: FAQItem[] = [
  {
    q: "추나요법은 어떤 방식으로 진행하나요?",
    a: "본원에서는 골반교정과 척추도인안교요법 기반의 교정 도구 접근을 활용한 추나 치료를 진행합니다. 체형과 움직임을 확인한 뒤 필요한 부위에 맞춰 시행하며, 상태에 따라 침·약침·체외충격파를 함께 고려합니다.",
  },
  {
    q: "집중형·방사형 체외충격파는 어떻게 다르게 쓰이나요?",
    a: "집중형은 더 깊거나 특정 지점에 집중할 때, 방사형은 넓은 근육·근막 부위에 적용할 때 고려할 수 있습니다. 실제 적용은 통증 부위, 조직 깊이, 압통 양상에 따라 달라집니다.",
  },
  {
    q: "약침은 어떤 경우에 사용하나요?",
    a: "약침은 침치료의 자극에 약침액의 국소 작용을 더해, 통증 부위의 염증 반응과 근육 긴장, 회복 과정을 함께 고려할 수 있는 치료입니다. 통증 양상과 부위에 따라 일반 침치료와 병행해 치료 방향을 정합니다.",
  },
  {
    q: "혈자리를 이용한 침치료는 무엇이 다른가요?",
    a: "통증 부위와 주변 혈자리 반응을 함께 살피는 방식으로 접근할 수 있습니다. 통증 부위와 연결된 근육 긴장, 움직임, 혈자리 반응을 함께 확인하면서 치료 방향을 정합니다.",
  },
  {
    q: "통증이 반복될 때는 어느 부위를 함께 보나요?",
    a: "아픈 부위만 보지 않고 체형, 관절 움직임, 근육 긴장, 반복되는 생활습관을 함께 확인합니다. 목 통증이라도 어깨, 등, 골반 움직임이 영향을 줄 수 있어 전체 흐름을 함께 살핍니다.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("chuna");
  const seo = page?.theme?.seo;
  if (seo?.title || seo?.description) {
    return { title: seo.title, description: seo.description };
  }
  return {};
}

export default async function ChunaPage() {
  // CMS에 보이는 블록이 있으면 CMS로 렌더, 없으면 기존 콘텐츠 폴백
  const page = await getCmsPage("chuna");
  if (page && page.blocks.length > 0) {
    return <CmsPageShell page={page} activePage="/chuna" />;
  }
  return <ChunaFallback />;
}

function ChunaFallback() {
  return (
    <>
      <Navbar activePage="/chuna" />

      {/* Hero */}
      <header className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" alt="추나·통증 진료실" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxUJKazzmcvOywe2Ll2cclfrRDJT5GnWnUQp1NN2PVKzZ0gk6YPEHIhf187BCM3JSN7bSWQRnXsOAe9-igK3HyUCWQhl38TDOlCMCqPNzdNg6NAssaOUVniuvzMmhzyORM5Vs1a6iGkK-okgVIYzTgGu6thrz_I2ia4yjrlVDVH2qj_2T0fVmK0VGdKJdygYpbHeJPrAr9iUIkltCFqXGHdNiBOPJuxulL7xefO4TCwWJt1RvFWDDRnYablKhbiavOJ_Po363u4Ls" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-sm text-neutral-500 mb-3">홈 &gt; 추나·통증 진료</p>
            <span className="inline-block px-3 py-1 bg-primary-light text-primary text-xs font-bold rounded-full mb-4">Pain &amp; Chuna</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              통증 부위와 반복되는 원인을<br />
              <span className="text-primary">함께 살펴봅니다.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              골반교정 추나, 침·약침, 집중형·방사형 체외충격파, 자기장치료를 통증 부위와 몸 상태에 맞춰 조합합니다.
              체형, 근육 긴장, 관절 움직임, 생활습관을 함께 확인해 반복되는 원인을 더 구체적으로 파악합니다.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["골반교정 추나", "혈자리 침치료", "다양한 약침", "집중형·방사형 체외충격파", "자기장치료"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-white border border-primary/30 text-primary text-xs font-bold rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://booking.naver.com/booking/13/bizes/1171309" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-all font-bold">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span>네이버 예약</span>
              </a>
              <a href="tel:031-767-0075" className="flex items-center space-x-2 bg-white border border-neutral-200 text-neutral-800 px-6 py-3 rounded-lg hover:bg-neutral-50 transition-all font-bold">
                <span className="material-symbols-outlined text-sm">call</span>
                <span>전화 031-767-0075</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Core Message */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Core Message</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                통증 부위와 통증을 만드는 구조를<br />나누어 확인합니다
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-5">
                반복되는 통증은 한 부위의 문제만으로 설명되지 않는 경우가 많습니다.
                자세, 움직임, 근육 긴장, 관절 가동성, 생활습관이 함께 영향을 줄 수 있습니다.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-5">
                본원에서는 추나치료를 기본적으로 골반교정과 교정 도구를 활용해 진행하고,
                척추도인안교학회 창립 전 학생모임 시기부터 수련해온 척추도인안교요법 기반의 교정 접근을 추나·통증 진료에 활용합니다.
                상태에 따라 침, 혈자리 침치료, 약침, 집중형·방사형 체외충격파, 자기장치료를 조합합니다.
              </p>
              <p className="text-base text-neutral-700 leading-relaxed bg-primary-surface p-6 rounded-2xl border-l-4 border-primary">
                반복되는 통증은 원인 구조를 함께 살피는 것이 중요합니다.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
              <h3 className="text-xl font-bold mb-6 text-neutral-900">보유 치료 자산</h3>
              <ul className="space-y-3">
                {[
                  "골반교정 중심 추나치료",
                  "척추도인안교요법 기반 교정 도구 접근",
                  "교정 도구를 활용한 추나 접근",
                  "집중형 체외충격파",
                  "방사형 체외충격파",
                  "염증·보강·근육긴장 완화 목적의 다양한 약침",
                  "자기장치료기",
                  "혈자리 기반 침치료",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-neutral-700 leading-relaxed">
                    <span className="material-symbols-outlined text-primary flex-shrink-0 mt-0.5">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Tools Table */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Treatment Tools</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">치료 도구별 역할</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="p-4 text-left font-bold">치료</th>
                  <th className="p-4 text-left font-bold">주로 보는 부분</th>
                  <th className="p-4 text-left font-bold">설명</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "추나요법", focus: "골반, 척추, 체형, 관절 움직임", desc: "골반교정과 척추도인안교요법 기반 교정 도구 접근을 활용해 구조적 불균형과 움직임을 확인합니다." },
                  { name: "혈자리 침치료", focus: "통증 조절, 근육 긴장, 연결된 반응", desc: "통증 부위만 찌르는 방식이 아니라 혈자리를 활용해 다른 부위의 긴장 변화도 확인합니다." },
                  { name: "약침 치료", focus: "염증, 근육 긴장, 회복 보조", desc: "목적에 따라 약침 종류를 다르게 선택합니다. 환자 상태와 부위에 따라 적용이 달라질 수 있습니다." },
                  { name: "집중형 체외충격파", focus: "깊거나 특정한 통증 지점", desc: "잘 풀리지 않는 핵심 근육, 인대·힘줄 부위 등 목표 지점을 정해 적용할 수 있습니다." },
                  { name: "방사형 체외충격파", focus: "넓은 근육·근막 긴장", desc: "넓게 긴장된 부위, 근막성 통증 등에서 상태에 따라 활용합니다." },
                  { name: "자기장치료", focus: "통증 완화 보조와 회복 관리", desc: "통증 양상에 따라 보조 치료로 함께 활용할 수 있습니다." },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="p-4 font-bold text-primary whitespace-nowrap align-top">{row.name}</td>
                    <td className="p-4 text-neutral-700 align-top">{row.focus}</td>
                    <td className="p-4 text-neutral-600 align-top">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* By Area */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">By Area</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">부위별로 다르게 확인합니다</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "목·어깨 통증", desc: "목 자체뿐 아니라 승모근, 견갑골, 흉추 움직임, 팔저림 여부를 함께 봅니다." },
              { num: "02", title: "허리·골반 통증", desc: "허리 통증이 골반 움직임, 둔근 긴장, 고관절 제한과 연결되는지 확인합니다." },
              { num: "03", title: "무릎·발목 통증", desc: "관절 통증뿐 아니라 보행, 근력, 인대 긴장, 발목 움직임을 함께 봅니다." },
              { num: "04", title: "팔꿈치·손목 통증", desc: "반복 사용, 힘줄 부위 압통, 근막 긴장을 확인하고 체외충격파 적용 여부를 봅니다." },
              { num: "05", title: "족저근막·발바닥 통증", desc: "발바닥 통증은 족저근막, 종아리 긴장, 보행 습관을 함께 확인합니다." },
              { num: "06", title: "등·흉추 통증", desc: "등 주변 긴장, 흉추 움직임, 견갑골 움직임과 호흡 시 불편감을 함께 확인합니다." },
            ].map((card) => (
              <div key={card.num} className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:border-primary/40 transition-colors">
                <div className="text-3xl font-black text-primary mb-3">{card.num}</div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900">{card.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acupuncture */}
      <section className="py-24 bg-primary-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Acupuncture</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-neutral-900">
                근위·원위 혈자리를<br />함께 활용하는 침치료
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-5">
                침치료는 통증 부위의 근육만 단순히 자극하는 방식으로 끝나지 않습니다.
                통증 부위와 연결된 근육 긴장, 움직임, 혈자리 반응을 함께 확인하면서 치료 방향을 정합니다.
                반응은 개인 상태에 따라 달라질 수 있습니다.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                본원에서는 통증 부위, 연결된 근육 긴장, 혈자리 반응을 함께 확인해 침치료 방향을 정합니다.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-10 border-2 border-primary/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">tips_and_updates</span>
                <h3 className="text-xl font-bold text-neutral-900">침치료는 반응을 확인하며 진행합니다</h3>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                침치료는 통증 부위 주변의 근위 혈자리와 연결된 원위 혈자리를 함께 살피며 진행합니다.
                근위·원위 혈자리 반응과 연결된 근육 긴장을 함께 확인하면서 치료 방향을 잡습니다.
                반응은 개인 상태에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">추나·통증 진료 FAQ</h2>
          </div>
          <FAQSchema items={CHUNA_FAQ} />
          <div className="space-y-4">
            {CHUNA_FAQ.map((item, i) => (
              <details key={i} className="group bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden">
                <summary className="cursor-pointer list-none p-6 flex justify-between items-start gap-4 hover:bg-neutral-100 transition-colors">
                  <h3 className="text-base md:text-lg font-bold text-neutral-900 flex-1 leading-snug">Q. {item.q}</h3>
                  <span className="material-symbols-outlined text-primary flex-shrink-0 group-open:rotate-45 transition-transform">add</span>
                </summary>
                <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">반복되는 통증은 구조부터 살펴보세요</h2>
          <p className="text-neutral-300 mb-10 leading-relaxed">
            체형, 근육 긴장, 관절 움직임을 함께 확인하고 통증 부위와 연결된 원인을 살펴봅니다.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://booking.naver.com/booking/13/bizes/1171309" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary hover:bg-primary-dark rounded-lg font-bold transition-all flex items-center gap-2">
              네이버 예약하기
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <a href="tel:031-767-0075" className="px-8 py-4 border border-white/30 hover:bg-white hover:text-neutral-900 rounded-lg font-bold transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">call</span>
              전화 031-767-0075
            </a>
            <Link href="/car-accident" className="px-8 py-4 border border-white/30 hover:bg-white hover:text-neutral-900 rounded-lg font-bold transition-all flex items-center gap-2">
              교통사고 진료 보기
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
