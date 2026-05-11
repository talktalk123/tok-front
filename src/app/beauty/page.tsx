import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";

const BEAUTY_FAQ: FAQItem[] = [
  {
    q: "한의원에서도 레이저 진료를 하나요?",
    a: "본원에서는 피부 상태와 진료 목적에 따라 롱펄스 레이저, 큐스위치 레이저, 피코레이저, CO2 레이저, 니들RF, HIFU, 고주파, 스킨부스터 등을 피부미용 진료에 활용하고 있습니다. 시술 전에는 병변의 종류와 깊이, 피부 회복력, 다운타임 가능성을 함께 살펴 적합한 방향을 안내합니다.",
  },
  {
    q: "톡바른경희한의원에는 어떤 피부미용 장비가 있나요?",
    a: "롱펄스 532·755·1064nm, 큐스위치 532·1064nm, 피코레이저, CO2 레이저, 1550·1927nm 듀얼 레이저, 308nm 엑시머 계열 장비, 니들RF, HIFU, 바이폴라 고주파, 마이크로웨이브, LDM, 크라이오, 에어젯2, 플라즈마 등 다양한 장비를 활용합니다.",
  },
  {
    q: "스킨부스터는 어떤 기준으로 선택하나요?",
    a: "PN/PDRN은 피부 회복과 재생 반응을 돕는 방향으로, 엑소좀은 피부 진정과 컨디션 회복, 염증성 피부 고민에 활용하는 방향으로, 히알루론산은 건조감과 피부결, 수분감 개선을 기대하며 선택하는 경우가 많습니다. 본원에서는 피부 상태, 전달 방식, 회복 목적을 함께 확인해 적합한 성분과 시술 방식을 안내합니다.",
  },
  {
    q: "니들RF, HIFU, 고주파, 마이크로웨이브는 어떻게 다르게 쓰이나요?",
    a: "작용 깊이, 열 전달 방식, 목표 조직이 다릅니다. 처짐, 탄력, 모공, 흉터, 피부 두께, 다운타임 가능성을 확인한 뒤 적합한 방향을 안내합니다.",
  },
  {
    q: "피부미용 시술 전후에는 무엇을 주의해야 하나요?",
    a: "시술 전후에는 자극 관리, 보습, 자외선 차단이 중요합니다. 다운타임과 주의사항은 시술 종류와 강도, 피부 상태에 따라 달라질 수 있습니다.",
  },
];

export default function BeautyPage() {
  return (
    <>
      <Navbar activePage="/beauty" />

      {/* Hero */}
      <header className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary-surface via-white to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-neutral-500 mb-3">홈 &gt; 피부미용 진료</p>
          <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Aesthetic Treatment</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6 max-w-4xl">
            피부 고민과 회복력을 살펴<br />
            <span className="text-primary">시술 방향을 함께 정합니다.</span>
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-3xl">
            같은 스킨부스터나 레이저라도 피부 상태, 병변의 깊이, 회복력, 다운타임에 따라
            적합한 방향이 달라질 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              "롱펄스 532·755·1064",
              "큐스위치 532·1064",
              "CO2 100W",
              "니들RF",
              "HIFU·고주파·마이크로웨이브",
              "스킨부스터",
            ].map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-white border border-primary/30 text-primary text-xs font-bold rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://booking.naver.com/booking/13/bizes/1171309" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all flex items-center gap-2">
              네이버 예약
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <a href="tel:031-767-0075" className="px-8 py-4 bg-white border border-neutral-200 text-neutral-800 rounded-lg font-bold hover:bg-neutral-50 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">call</span>
              전화 031-767-0075
            </a>
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
                피부 상태와 시술 목적에<br />맞는 선택이 중요합니다
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                톡바른경희한의원 본점의 피부미용 진료는 스킨부스터, 피코레이저, 레이저, 니들RF, HIFU,
                고주파, 마이크로웨이브 등 다양한 선택지를 피부 고민과 회복력에 맞춰 정리합니다.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-4">
                스킨부스터와 피부미용 장비의 원리, 성분, 임상 근거를 책과 강의로 정리해온 경험을 바탕으로,
                성분의 작용 방식과 장비의 작용 깊이를 구분해 안내합니다.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-5">
                피부 상태와 생활 패턴에 맞춰 꾸준히 이어갈 수 있는 지속가능한 시술 계획을 세우는 것이 중요합니다.
                본원에서는 피부 상태와 회복력을 살펴본 뒤 적합한 시술 방향과 주의할 부분을 함께 말씀드립니다.
              </p>
              <p className="text-base text-neutral-700 leading-relaxed bg-primary-surface p-6 rounded-2xl border-l-4 border-primary">
                시술의 적합도는 피부 상태, 병변의 깊이, 회복력, 다운타임에 따라 달라질 수 있습니다.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
              <h3 className="text-xl font-bold mb-6 text-neutral-900">피부미용 진료에서 확인하는 항목</h3>
              <ul className="space-y-4">
                {[
                  "피부 고민과 시술 목적",
                  "색소, 흉터, 홍조, 여드름 양상",
                  "피부 장벽과 회복력",
                  "시술 후 가능한 다운타임",
                  "장비와 성분의 적합도",
                  "최근 시술 이력과 홈케어 상태",
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

      {/* Authority */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Authority</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">피부미용 진료 기준을 만들어온 활동</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              국제레이저미용피부과학회 학술이사 활동을 비롯해, 스킨부스터와 레이저 장비를 단순 시술명이 아니라
              성분, 작용 깊이, 임상 근거를 기준으로 설명하기 위해 강의·저서·교육 활동을 이어왔습니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "저서와 강의",
                items: [
                  "피부미용진료를 위한 EBS : Evidence Based Skinbooster 저자",
                  "2025년 전국한의학학술대회 레이저세션 대표강사",
                  "2026년 전국한의학학술대회 레이저세션 대표강사",
                  "2026년 K-MEX 보수교육 강의: 스킨부스터 선택기준과 유효성분 전달방법",
                ],
              },
              {
                num: "02",
                title: "학회와 교육 활동",
                items: [
                  "2025~ 국제레이저미용피부과학회 학술이사",
                  "2026 대한통합레이저의학회 교육위원",
                  "2025, 2026 한케어 레이저 핸즈온 강의",
                  "2026 피코루 레이저 키닥터 위촉",
                ],
              },
              {
                num: "03",
                title: "수상내역",
                items: [
                  "2차 한의미용콘테스트(2026년) 대상",
                  "1차 한의미용콘테스트(2025년) 최우수상",
                ],
              },
            ].map((card) => (
              <div key={card.num} className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
                <div className="text-4xl font-black text-primary mb-4">{card.num}</div>
                <h3 className="text-xl font-bold mb-6 text-neutral-900">{card.title}</h3>
                <ul className="space-y-3">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-neutral-600 leading-relaxed">
                      <span className="text-primary flex-shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concern First */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Concern First</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">내 피부에는 어떤 시술이 맞을까요?</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              환자는 장비 이름보다 내 피부 고민에 무엇이 맞는지 먼저 알고 싶어합니다.
              본원에서는 피부 고민을 먼저 정리한 뒤 장비와 시술 방향을 설명합니다.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="p-4 text-left font-bold">피부 고민</th>
                  <th className="p-4 text-left font-bold">확인할 부분</th>
                  <th className="p-4 text-left font-bold">고려할 수 있는 진료</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { concern: "색소·점·검버섯", check: "병변 깊이, 튀어나온 정도, 색소 양상", treatment: "CO2, 큐스위치, 롱펄스 계열" },
                  { concern: "여드름 흉터·모공", check: "흉터 깊이, 피지, 염증, 피부 두께", treatment: "니들RF, 프락셔널, 스킨부스터" },
                  { concern: "홍조·혈관", check: "붉은기 양상, 혈관 깊이, 피부 장벽", treatment: "롱펄스, 진정관리, 장벽관리" },
                  { concern: "탄력·리프팅", check: "처짐, 피부 두께, 지방층, 통증 민감도", treatment: "HIFU, 고주파, 마이크로웨이브, 니들RF" },
                  { concern: "건조·잔주름", check: "장벽, 수분감, 회복력", treatment: "스킨부스터, LDM, 크라이오" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="p-4 font-bold text-primary align-top">{row.concern}</td>
                    <td className="p-4 text-neutral-700 align-top">{row.check}</td>
                    <td className="p-4 text-neutral-600 align-top">{row.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Aesthetic Devices */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Aesthetic Devices</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">피부미용 장비와 시술 선택지</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              다양한 장비와 시술 선택지를 바탕으로, 피부 고민과 병변의 깊이에 맞는 장비 선택을 도와드립니다.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="p-4 text-left font-bold">분류</th>
                  <th className="p-4 text-left font-bold">진료에 활용하는 장비·성분</th>
                  <th className="p-4 text-left font-bold">주요 활용 방향</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "롱펄스 레이저", devices: "532nm / 755nm / 1064nm", usage: "혈관성 변화, 색소·흑자, 제네시스 계열 열 자극, 제모·색소 접근 등 상태별 활용" },
                  { type: "큐스위치·피코 레이저", devices: "532nm / 1064nm, 피코레이저", usage: "흑자, 색소 병변, 토닝 계열 접근 등 병변 특성에 따라 고려" },
                  { type: "프락셔널·박피성 레이저", devices: "CO2 레이저 유펄스 100W", usage: "점, 쥐젖, 사마귀, 편평사마귀, 검버섯, 지루각화 병변, 흉터·모공 접근 등 병변 깊이에 따라 고려" },
                  { type: "1550·1927nm 듀얼 레이저", devices: "디오레듀얼, 아기레이저 계열", usage: "피부결, 모공, 잔주름, 색소, 재생 목적의 비박피성·프락셔널 계열 접근" },
                  { type: "308nm 엑시머 계열", devices: "아토빛", usage: "특정 피부질환 영역에서 상태 확인 후 활용" },
                  { type: "리프팅·타이트닝", devices: "HIFU, 바이폴라 고주파, 마이크로웨이브", usage: "피부 두께, 처짐, 탄력, 리프팅 목적, 열 전달 깊이에 따라 선택" },
                  { type: "니들RF", devices: "절연 니들RF 계열", usage: "여드름 흉터, 모공, 탄력, 진피 열 자극 목적에서 상태별 고려" },
                  { type: "보조·재생 관리", devices: "LDM, 크라이오, 플라즈마, 에어젯2", usage: "진정, 회복, 약물 전달, 피부 장벽 관리 등 시술 전후 보조" },
                  { type: "스킨부스터", devices: "PN/PDRN, 엑소좀, 히알루론산 등 다양한 성분", usage: "피부 상태, 전달 방식, 회복 목적에 따라 선택" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="p-4 font-bold text-primary align-top whitespace-nowrap">{row.type}</td>
                    <td className="p-4 text-neutral-700 align-top">{row.devices}</td>
                    <td className="p-4 text-neutral-600 align-top">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* By Treatment */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">By Treatment</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">시술 종류별로 역할이 다릅니다</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              본원에서는 고민의 종류와 병변 깊이, 회복력에 따라 각 시술의 역할을 구분해 적절한 조합을 안내합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "스킨부스터", desc: "PN/PDRN, 엑소좀, 히알루론산 등 성분과 전달 방식의 차이를 확인합니다." },
              { num: "02", title: "리프팅 장비", desc: "HIFU, 고주파, 마이크로웨이브는 작용 깊이와 열 전달 방식이 다릅니다." },
              { num: "03", title: "색소 레이저", desc: "롱펄스, 큐스위치, CO2 등은 병변 종류와 깊이에 따라 선택이 달라질 수 있습니다." },
              { num: "04", title: "니들RF", desc: "여드름 흉터, 모공, 탄력 등 진피 자극이 필요한 경우 상태에 따라 고려합니다." },
              { num: "05", title: "피부 장벽·진정 관리", desc: "LDM, 크라이오, 플라즈마 등은 피부 상태와 회복 과정에 따라 보조적으로 활용합니다." },
              { num: "06", title: "시술 후 관리", desc: "보습, 자외선 차단, 자극 관리 등 회복 과정에 필요한 내용을 함께 안내합니다." },
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

      {/* Principle */}
      <section className="py-24 bg-primary-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Principle</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-neutral-900">
                꾸준히 이어갈 수 있는<br />지속가능한 피부미용 계획
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-5">
                피부미용 시술은 강하게 할수록 좋은 것이 아닙니다.
                피부 장벽, 염증 상태, 색소 반응, 회복력, 직업과 일정에 따른 다운타임 가능성을 함께 고려해야 합니다.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                다양한 장비가 있다는 것은 피부 상태에 맞춰 선택할 수 있는 폭이 넓다는 뜻입니다.
                본원에서는 이러한 선택지를 바탕으로 지금 이 피부에 어떤 시술이 적합한지 정리해 안내합니다.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-10 border-2 border-primary/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">info</span>
                <h3 className="text-xl font-bold text-neutral-900">피부미용 시술 전 안내</h3>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                피부미용 시술은 피부 상태, 병변의 깊이, 회복력, 다운타임 가능성에 따라 적합도가 달라질 수 있습니다.
                본원에서는 시술 전 피부 상태와 목적을 먼저 확인하고, 가능한 방향과 주의사항을 함께 말씀드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">피부미용 진료 흐름</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "피부 고민과 목적 확인", desc: "색소, 홍조, 흉터, 탄력, 모공, 피부결 등 주된 고민을 정리합니다." },
              { num: "02", title: "피부 상태와 회복력 확인", desc: "피부 장벽, 염증, 병변 깊이, 다운타임 가능성을 확인합니다." },
              { num: "03", title: "장비와 성분 선택", desc: "스킨부스터, 레이저, 니들RF, HIFU, 고주파, 마이크로웨이브, 보조관리 중 적합한 방향을 설명합니다." },
              { num: "04", title: "시술 후 관리 안내", desc: "보습, 자외선 차단, 자극 관리 등 회복 과정에 필요한 내용을 안내합니다." },
            ].map((step) => (
              <div key={step.num} className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                <div className="text-3xl font-black text-primary mb-3">{step.num}</div>
                <h3 className="text-lg font-bold mb-3 text-neutral-900">{step.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">피부미용 진료 FAQ</h2>
          </div>
          <FAQSchema items={BEAUTY_FAQ} />
          <div className="space-y-4">
            {BEAUTY_FAQ.map((item, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                <summary className="cursor-pointer list-none p-6 flex justify-between items-start gap-4 hover:bg-neutral-50 transition-colors">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">피부미용 진료는 상담 시간이 필요합니다</h2>
          <p className="text-neutral-300 mb-10 leading-relaxed">
            피부 상태, 시술 목적, 회복 가능 일정을 함께 확인합니다.
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
            <Link href="/about" className="px-8 py-4 border border-white/30 hover:bg-white hover:text-neutral-900 rounded-lg font-bold transition-all flex items-center gap-2">
              원장 소개
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
