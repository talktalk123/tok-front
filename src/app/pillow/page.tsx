import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "맞춤 베개 써비카 안내",
  description: "3D 경추 스캔 데이터에 기반한 맞춤 베개 써비카의 제품 특성과 제작 과정을 안내합니다.",
  alternates: { canonical: "/pillow" },
};

const steps = [
  { number: "01", title: "3D 스캔", description: "목 주변의 3차원 형태를 스캔해 개인별 데이터를 확인합니다." },
  { number: "02", title: "데이터 분석", description: "스캔한 데이터를 분석해 개인의 형태를 살펴봅니다." },
  { number: "03", title: "맞춤 설계", description: "분석 결과를 바탕으로 개인별 베개 도면을 설계합니다." },
  { number: "04", title: "3D 출력", description: "설계된 구조를 TPU 소재로 3D 프린팅합니다." },
];

const features = [
  { title: "개인별 데이터 기반", description: "제조사 안내에 따르면 3D 경추 스캔 데이터를 바탕으로 1:1 맞춤 설계를 진행합니다." },
  { title: "3구역 자이로이드 구조", description: "유연한 분산, 맞춤 곡률, 통기 구조를 고려한 다중 밀도 구역으로 구성됩니다." },
  { title: "TPU 소재", description: "제조사 안내 기준 단일 TPU 소재를 사용하며 본체를 물로 세척할 수 있습니다." },
];

export default function PillowPage() {
  return (
    <>
      <Navbar activePage="/pillow" />
      <div>
        <header className="bg-gradient-to-br from-orange-50 via-white to-stone-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="text-sm font-bold text-orange-700 tracking-widest uppercase mb-4">맞춤 베개 · 안내 준비중</p>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight text-stone-900 mb-5" style={{ wordBreak: "keep-all" }}>나에게 맞춰 설계하는<br /><span className="text-primary">3D 맞춤 베개, 써비카</span></h1>
              <p className="text-base md:text-lg leading-8 text-stone-600 max-w-xl" style={{ wordBreak: "keep-all" }}>복셀바이탈 써비카는 개인의 3D 경추 스캔 데이터를 바탕으로 맞춤 설계를 진행하는 베개입니다.</p>
              <p className="mt-6 inline-block rounded-xl bg-white border border-orange-100 px-5 py-4 text-sm leading-7 text-stone-600">본원의 이용 방법과 운영 일정은 준비 후 안내드리겠습니다.</p>
            </div>
            <figure className="rounded-3xl overflow-hidden bg-stone-100">
              <img src="https://voxelvital.com/images/hero_cervica.webp" alt="복셀바이탈 써비카 맞춤 베개 공식 제품 이미지" className="w-full h-auto" />
              <figcaption className="px-4 py-3 text-xs text-stone-500 bg-white">이미지 출처: 복셀바이탈 공식 웹사이트</figcaption>
            </figure>
          </div>
        </header>
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">CerviCa3D</p>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">써비카는 어떤 베개인가요?</h2>
            <p className="text-base md:text-lg leading-8 text-stone-600 max-w-3xl mb-10" style={{ wordBreak: "keep-all" }}>일률적인 형태 대신 개인별 스캔 데이터를 활용해 설계하는 맞춤형 베개입니다. 아래 내용은 복셀바이탈의 제품 안내를 바탕으로 정리했습니다.</p>
            <div className="grid md:grid-cols-3 gap-5">
              {features.map((item) => <article key={item.title} className="rounded-2xl border border-stone-100 bg-stone-50 p-6 md:p-8"><h3 className="text-lg font-bold text-stone-900 mb-3">{item.title}</h3><p className="text-base leading-7 text-stone-600" style={{ wordBreak: "keep-all" }}>{item.description}</p></article>)}
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">How it is made</p>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">스캔부터 맞춤 제작까지</h2>
            <p className="text-base leading-7 text-stone-600 mb-10">제조사 공식 자료에서 안내하는 제작 과정입니다.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step) => <article key={step.number} className="bg-white border border-stone-100 rounded-2xl p-6"><p className="text-2xl font-bold text-primary mb-4">{step.number}</p><h3 className="text-lg font-bold text-stone-900 mb-3">{step.title}</h3><p className="text-base leading-7 text-stone-600" style={{ wordBreak: "keep-all" }}>{step.description}</p></article>)}
            </div>
            <p className="mt-6 text-sm leading-7 text-stone-500">제조사 안내 기준이며, 본원의 실제 이용 절차와 일정은 확정 후 별도로 안내합니다.</p>
          </div>
        </section>
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-orange-100 bg-orange-50 p-7 md:p-10">
              <h2 className="text-2xl font-bold text-stone-900 mb-3">맞춤 베개 안내 준비중</h2>
              <p className="text-base leading-7 text-stone-700 mb-6" style={{ wordBreak: "keep-all" }}>이용 방법과 일정은 준비가 완료되면 안내드리겠습니다. 제품의 자세한 특징은 제조사 공식 사이트에서 확인하실 수 있습니다.</p>
              <a href="https://www.voxelvital.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-stone-900 text-white font-bold px-6 py-3">복셀바이탈 공식 안내 보기 <span aria-hidden="true" className="ml-2">↗</span></a>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  );
}
