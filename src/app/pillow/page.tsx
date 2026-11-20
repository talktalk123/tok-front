import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "맞춤 베개 써비카 안내",
  description: "3D 경추 스캔 데이터에 기반한 맞춤 베개 써비카의 제품 특성과 제작 과정을 안내합니다.",
  alternates: { canonical: "/pillow" },
};

const steps = [
  { number: "01", title: "3D 스캔", description: "1분 경추 스캔으로 개인별 3D 데이터를 수집합니다." },
  { number: "02", title: "AI 분석", description: "CVA와 비대칭 포인트 클라우드를 분석합니다." },
  { number: "03", title: "1:1 설계", description: "0.1mm 정밀 맞춤 도면을 생성합니다." },
  { number: "04", title: "3D 프린팅", description: "다중 밀도 자이로이드 구조를 TPU 소재로 출력합니다." },
];

const features = [
  { title: "개인별 데이터 기반", description: "3D 경추 스캔 데이터와 경추 각도 분석을 바탕으로 높이와 곡률을 1:1 맞춤 설계합니다." },
  { title: "3구역 자이로이드 구조", description: "뒤통수는 부드럽게, 목덜미는 탄탄하게. 유연 체압 분산, 맞춤 곡률, 통기 구조를 구현합니다." },
  { title: "TPU 소재", description: "무접착 단일 TPU 소재로 제작하며, 본체 전체를 물로 세척할 수 있습니다." },
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
            <p className="text-base md:text-lg leading-8 text-stone-600 max-w-3xl mb-10" style={{ wordBreak: "keep-all" }}>일률적인 형태 대신 개인별 경추 데이터로 높이와 곡률을 설계하는 3D 맞춤형 자이로이드 베개입니다.</p>
            <div className="grid md:grid-cols-3 gap-5">
              {features.map((item) => <article key={item.title} className="rounded-2xl border border-stone-100 bg-stone-50 p-6 md:p-8"><h3 className="text-lg font-bold text-stone-900 mb-3">{item.title}</h3><p className="text-base leading-7 text-stone-600" style={{ wordBreak: "keep-all" }}>{item.description}</p></article>)}
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">How it is made</p>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">스캔부터 맞춤 제작까지</h2>
            <p className="text-base leading-7 text-stone-600 mb-10">1분 스캔부터 개인별 설계와 3D 프린팅까지, 나에게 맞는 베개를 만듭니다.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step) => <article key={step.number} className="bg-white border border-stone-100 rounded-2xl p-6"><p className="text-2xl font-bold text-primary mb-4">{step.number}</p><h3 className="text-lg font-bold text-stone-900 mb-3">{step.title}</h3><p className="text-base leading-7 text-stone-600" style={{ wordBreak: "keep-all" }}>{step.description}</p></article>)}
            </div>
            <p className="mt-6 text-sm leading-7 text-stone-500">본원의 이용 절차와 일정은 확정 후 별도로 안내합니다.</p>
          </div>
        </section>
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-orange-100 bg-orange-50 p-7 md:p-10">
              <h2 className="text-2xl font-bold text-stone-900 mb-3">맞춤 베개 안내 준비중</h2>
              <p className="text-base leading-7 text-stone-700 mb-6" style={{ wordBreak: "keep-all" }}>이용 방법과 일정은 준비가 완료되면 안내드리겠습니다. 써비카의 자세한 이야기는 복셀바이탈에서 확인하실 수 있습니다.</p>
              <a href="https://www.voxelvital.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-stone-900 text-white font-bold px-6 py-3">복셀바이탈 공식 안내 보기 <span aria-hidden="true" className="ml-2">↗</span></a>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  );
}
