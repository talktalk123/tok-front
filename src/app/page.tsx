import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";

const HOME_FAQ: FAQItem[] = [
  {
    q: "톡바른경희한의원 본점은 어떤 진료를 하나요?",
    a: "한약, 추나·통증치료, 침·약침, 집중형·방사형 체외충격파, 자기장치료, 피부미용 진료를 환자 상태에 맞춰 안내합니다. 증상 하나만 보고 치료를 정하기보다 몸 상태와 생활 패턴을 함께 확인합니다.",
  },
  {
    q: "처음 내원하면 어떤 과정을 거치나요?",
    a: "불편한 증상과 생활 패턴을 확인한 뒤 필요한 경우 맥진·설진·복진, 체형검사, 근육 긴장도 확인, 피부 상태 확인 등을 진행합니다. 이후 현재 문제의 우선순위와 치료 방향을 설명드립니다.",
  },
  {
    q: "한약, 추나, 피부미용 진료는 예약이 필요한가요?",
    a: "대기 시간을 줄이기 위해 예약 후 내원을 권합니다. 특히 한약 상담과 피부미용 진료는 상담과 설명 시간이 필요할 수 있습니다.",
  },
  {
    q: "치료는 몇 번 정도 받아야 하나요?",
    a: "증상 기간, 몸 상태, 치료 목표에 따라 달라질 수 있습니다. 처음 진찰 후 예상 치료 방향과 경과 확인 시점을 안내드립니다.",
  },
  {
    q: "주차와 진료시간은 어떻게 되나요?",
    a: "진료시간은 평일 09:00~20:00 / 토요일 09:00~14:00 / 공휴일 09:00~13:00 / 일요일 휴진입니다. 건물 내 주차장을 이용하실 수 있으며, 만차이거나 주차가 어려운 경우에는 광주시보건소·공설운동장 인근 공영주차장 등 이용 가능한 방법을 안내드립니다.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-white text-neutral-900 overflow-x-hidden">
      <Navbar activePage="/" variant="fixed" />

      {/* Floating ToolBar */}
      <div className="fixed right-6 bottom-10 z-[60] flex flex-col gap-3">
        <a className="w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center text-neutral-700 hover:text-primary transition-all border border-neutral-100 group" href="https://booking.naver.com/booking/13/bizes/1171309" target="_blank" rel="noopener noreferrer">
          <span className="material-icons" data-icon="calendar_month">calendar_month</span>
          <span className="absolute right-16 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">네이버 예약</span>
        </a>
        <a className="w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center text-neutral-700 hover:text-primary transition-all border border-neutral-100 group" href="tel:031-767-0075">
          <span className="material-icons" data-icon="call">call</span>
          <span className="absolute right-16 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">전화 031-767-0075</span>
        </a>
        <a className="w-14 h-14 bg-primary text-white shadow-xl rounded-full flex items-center justify-center hover:bg-primary-dark transition-all group" href="https://blog.naver.com/talktalkhani" target="_blank" rel="noopener noreferrer">
          <span className="material-icons" data-icon="menu_book">menu_book</span>
          <span className="absolute right-16 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">네이버 블로그</span>
        </a>
      </div>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-surface to-white opacity-60"></div>
          <img className="w-full h-full object-cover opacity-20" alt="Modern and bright interior of a Korean medicine clinic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMNtS5Ajcuix9l4-bqw34j0CFuWOWOcJ8PghIWa_lGk6IFhWRxmfppx_qPLKhfHJdQm6DUJu1EXbHdd_1YzbTZlRmVX4jqdsF6uXU03nBELlb-fcCD0qCIzuAHhlxQmhWnw3ylQUM1FGF80Ro-raAKlglBFLuvX6RLWcN_RkTzJSf0rknAzu_Yrx3YA7X8uMVGwmyczr7_zohObF0vZ_a5cy3DzjR7b1yJM6nZYAcMpwWU6m0BHFoNiWcFGKLM8DdcHkVbunLR86I" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-4">경기광주 톡바른경희한의원 본점</p>
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-tight mb-6">
              몸 상태를 먼저 살피고,<br />
              <span className="text-primary">치료 방향을 함께 정합니다.</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-6 leading-relaxed">
              경기광주 탄벌동에서 한약 진료, 추나·통증치료,<br className="hidden md:block" />
              교통사고 자동차보험 진료, 피부미용 진료를 안내합니다.
            </p>
            <p className="text-base text-neutral-500 mb-10 leading-relaxed">
              맥진·설진·복진으로 몸 안쪽을 살피고, 체형검사로 통증 구조를 확인하며,<br className="hidden md:block" />
              교통사고 후유증과 피부미용 진료까지 상태에 맞춰 진료 방향을 정합니다.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://booking.naver.com/booking/13/bizes/1171309" target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-dark transition-all flex items-center gap-2">
                네이버 예약
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a href="tel:031-767-0075" className="bg-white text-neutral-800 border border-neutral-200 px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-50 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">call</span>
                전화 예약 031-767-0075
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Block 2: Service Cards (Bento Style) */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-primary/20"></div>
            <h2 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight text-center">치료 방법이 다양할수록,<br className="md:hidden" /> 상태에 맞는 선택이 중요합니다</h2>
            <div className="h-[2px] w-12 bg-primary/20"></div>
          </div>
          <p className="text-center text-stone-500 text-base max-w-3xl mx-auto mb-12 leading-relaxed">
            한약, 추나, 침, 약침, 체외충격파, 자기장치료, 피부미용 장비는 모두 목적이 다릅니다.
            치료 선택지가 많을수록 중요한 것은 많이 하는 것이 아니라, 지금 필요한 치료와 경과를 보며 조정할 치료를 구분하는 것입니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: 한약 */}
            <a className="group relative bg-white p-6 rounded-[2rem] border-2 border-stone-50 card-button-shadow hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center justify-between" href="/medicine">
              <div className="flex flex-col items-center w-full">
                <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  <span className="material-icons text-primary group-hover:text-white text-4xl">medication</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-stone-900 group-hover:text-primary transition-colors">몸 안쪽을 살피는 한약 진료</h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-4">같은 피로라도 원인은 다를 수 있습니다.<br />소화·수면·부종·열감·스트레스 반응을 함께 살핍니다.</p>
              </div>
              <div className="w-full">
                <div className="w-full py-2.5 bg-stone-50 group-hover:bg-primary group-hover:text-white rounded-xl text-stone-600 text-xs font-bold transition-all flex items-center justify-center gap-2">
                  자세히 보기
                  <span className="material-icons text-[10px]">arrow_forward</span>
                </div>
              </div>
            </a>
            {/* Card 2: 추나·통증 */}
            <a className="group relative bg-white p-6 rounded-[2rem] border-2 border-stone-50 card-button-shadow hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center justify-between" href="/chuna">
              <div className="flex flex-col items-center w-full">
                <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  <span className="material-icons text-primary group-hover:text-white text-4xl">accessibility_new</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-stone-900 group-hover:text-primary transition-colors">구조를 보는 추나·통증 진료</h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-4">목·허리·어깨·골반 통증은 체형, 근육 긴장,<br />관절 움직임을 함께 살피며 방향을 정합니다.</p>
              </div>
              <div className="w-full">
                <div className="w-full py-2.5 bg-stone-50 group-hover:bg-primary group-hover:text-white rounded-xl text-stone-600 text-xs font-bold transition-all flex items-center justify-center gap-2">
                  자세히 보기
                  <span className="material-icons text-[10px]">arrow_forward</span>
                </div>
              </div>
            </a>
            {/* Card 3: 교통사고 */}
            <a className="group relative bg-white p-6 rounded-[2rem] border-2 border-stone-50 card-button-shadow hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center justify-between" href="/car-accident">
              <div className="flex flex-col items-center w-full">
                <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  <span className="material-icons text-primary group-hover:text-white text-4xl">car_crash</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-stone-900 group-hover:text-primary transition-colors">자동차보험 교통사고 진료</h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-4">사고접수번호 안내부터 목·허리 통증, 두통,<br />어깨 결림, 사고 후 몸살까지 별도 흐름으로 봅니다.</p>
              </div>
              <div className="w-full">
                <div className="w-full py-2.5 bg-stone-50 group-hover:bg-primary group-hover:text-white rounded-xl text-stone-600 text-xs font-bold transition-all flex items-center justify-center gap-2">
                  자세히 보기
                  <span className="material-icons text-[10px]">arrow_forward</span>
                </div>
              </div>
            </a>
            {/* Card 4: 피부미용 */}
            <a className="group relative bg-white p-6 rounded-[2rem] border-2 border-stone-50 card-button-shadow hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center justify-between" href="/beauty">
              <div className="flex flex-col items-center w-full">
                <div className="w-20 h-20 rounded-2xl bg-orange-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  <span className="material-icons text-primary group-hover:text-white text-4xl">face</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-stone-900 group-hover:text-primary transition-colors">장비와 근거를 갖춘 피부미용</h3>
                <p className="text-stone-500 text-xs leading-relaxed mb-4">스킨부스터, 레이저, 니들RF, 리프팅 장비를<br />피부 고민과 회복력에 맞춰 선택합니다.</p>
              </div>
              <div className="w-full">
                <div className="w-full py-2.5 bg-stone-50 group-hover:bg-primary group-hover:text-white rounded-xl text-stone-600 text-xs font-bold transition-all flex items-center justify-center gap-2">
                  자세히 보기
                  <span className="material-icons text-[10px]">arrow_forward</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Block 3: Director (Asymmetric Layout) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-surface rounded-full blur-3xl opacity-50"></div>
              <img className="rounded-3xl shadow-2xl relative z-10 w-full aspect-[4/5] object-cover" alt="이기홍 원장" src="/images/doctor.jpg" />
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl z-20 border border-neutral-100">
                <p className="text-sm text-primary font-bold mb-1 uppercase tracking-wider">Director</p>
                <p className="text-2xl font-bold text-neutral-900">이기홍 원장</p>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Doctor</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">치료 방향을 설명하는 진료</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                이기홍 원장은 경희대학교 한의과대학을 졸업하고, 톡바른경희한의원 본점에서 진료하고 있습니다.
                한약, 추나·통증치료, 피부미용을 환자 상태와 증상의 우선순위에 맞춰 치료 방향을 잡는 진료를 중요하게 생각합니다.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                피부미용 분야에서는 스킨부스터와 레이저 장비의 원리와 근거를 강의와 저서로 정리해왔으며,
                이러한 기준을 바탕으로 피부 상태에 맞는 시술 방향을 말씀드립니다.
              </p>
              <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                <h3 className="text-lg font-bold mb-4 text-neutral-900">주요 이력·활동</h3>
                <ul className="space-y-2 text-sm text-neutral-700 leading-relaxed">
                  <li className="flex gap-2"><span className="text-primary">·</span>경희대학교 한의과대학 졸업</li>
                  <li className="flex gap-2"><span className="text-primary">·</span>톡바른경희한의원 대표원장</li>
                  <li className="flex gap-2"><span className="text-primary">·</span>척추도인안교학회 정회원</li>
                  <li className="flex gap-2"><span className="text-primary">·</span>국제레이저미용피부과학회 학술이사</li>
                  <li className="flex gap-2"><span className="text-primary">·</span>전국한의학학술대회 레이저세션 대표강사</li>
                  <li className="flex gap-2"><span className="text-primary">·</span>2026년 K-MEX 보수교육 강의</li>
                  <li className="flex gap-2"><span className="text-primary">·</span>한케어 피부미용 강의 진행</li>
                  <li className="flex gap-2"><span className="text-primary">·</span>한의미용콘테스트 대상·최우수상</li>
                  <li className="flex gap-2"><span className="text-primary">·</span>피부미용진료를 위한 EBS : Evidence Based Skinbooster 저자</li>
                </ul>
                <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                  원장 소개 자세히 보기
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4: Process - 처음 진료 흐름 */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">처음 진료에서 상태를 파악하고,<br />치료 방향을 함께 정합니다</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              불편한 증상, 생활습관, 몸 상태, 통증 구조, 피부 상태를 종합적으로 살펴본 뒤
              지금 우선적으로 집중할 치료와 이후 조정할 부분을 나누어 말씀드립니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: "01", title: "증상과 생활 패턴 확인", desc: "불편한 증상뿐 아니라 수면, 소화, 업무 습관, 운동 패턴, 피부 시술 이력까지 확인합니다." },
              { num: "02", title: "진찰 또는 검사", desc: "맥진·설진·복진, 체형검사, 근육 긴장도, 피부 상태 확인 등 진료 목적에 맞는 항목을 살핍니다." },
              { num: "03", title: "문제의 우선순위 설명", desc: "우선 집중할 증상과 보충·순환·배출 중 필요한 방향, 경과를 보며 조정할 부분을 나눕니다." },
              { num: "04", title: "치료 방법 선택", desc: "한약, 침, 부항, 약침, 추나, 체외충격파, 자기장치료, 피부미용 장비 중 필요한 방향을 정합니다." },
              { num: "05", title: "치료 후 변화 확인", desc: "남은 증상과 새롭게 보이는 변화를 확인해 다음 치료 방향을 조정합니다." },
            ].map((step) => (
              <div key={step.num} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:border-primary/40 transition-colors">
                <div className="text-3xl font-black text-primary mb-3">{step.num}</div>
                <h3 className="text-lg font-bold mb-2 text-neutral-900">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 4b: 교통사고 독립 안내 */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Traffic Accident</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">교통사고 진료</h2>
              <p className="text-neutral-300 leading-relaxed mb-4">
                교통사고 진료는 본원에서 중요한 비중을 차지하는 진료 영역입니다. 사고 직후보다 며칠 뒤 목·허리 통증, 두통, 어깨 긴장, 몸살 같은 불편감이 나타나는 경우가 있어 별도 흐름으로 확인합니다.
              </p>
              <p className="text-neutral-300 leading-relaxed mb-8">
                자동차보험 진료가 필요한 경우 사고접수번호를 알려주시면 접수 절차를 안내드리고, 사고 이후 생긴 증상과 움직임 변화를 함께 확인합니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/car-accident" className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg font-bold transition-all flex items-center gap-2">
                  교통사고 진료 보기
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <a href="tel:031-767-0075" className="px-6 py-3 border border-white/30 rounded-lg hover:bg-white hover:text-neutral-900 transition-all font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">call</span>
                  전화 문의
                </a>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-3xl p-10 border border-white/10">
              <h3 className="text-xl font-bold mb-6">이런 경우 확인해보세요</h3>
              <ul className="space-y-4 text-neutral-200">
                <li className="flex gap-3"><span className="material-symbols-outlined text-primary mt-0.5">check_circle</span><span>사고 후 목·허리 통증이 생긴 경우</span></li>
                <li className="flex gap-3"><span className="material-symbols-outlined text-primary mt-0.5">check_circle</span><span>두통, 어깨 결림, 등 긴장이 심해진 경우</span></li>
                <li className="flex gap-3"><span className="material-symbols-outlined text-primary mt-0.5">check_circle</span><span>처음에는 괜찮았는데 며칠 뒤 불편감이 올라온 경우</span></li>
                <li className="flex gap-3"><span className="material-symbols-outlined text-primary mt-0.5">check_circle</span><span>자동차보험 진료 접수 방법이 헷갈리는 경우</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Block 5: FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">처음 오시기 전 자주 묻는 질문</h2>
          </div>
          <FAQSchema items={HOME_FAQ} />
          <div className="space-y-4">
            {HOME_FAQ.map((item, i) => (
              <details key={i} className="group bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden">
                <summary className="cursor-pointer list-none p-6 flex justify-between items-start gap-4 hover:bg-neutral-100 transition-colors">
                  <h3 className="text-lg font-bold text-neutral-900 flex-1 leading-snug">Q. {item.q}</h3>
                  <span className="material-symbols-outlined text-primary flex-shrink-0 group-open:rotate-45 transition-transform">add</span>
                </summary>
                <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/faq" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              전체 FAQ 보기
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Block 6: Info & Map */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Location</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">진료시간·오시는 길</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-neutral-200">
              <h3 className="text-2xl font-bold mb-8">진료 안내</h3>
              <div className="space-y-5 mb-10">
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <span className="text-neutral-600 font-medium">평일 (월-금)</span>
                  <span className="font-bold">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <span className="text-neutral-600 font-medium">토요일</span>
                  <span className="font-bold">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <span className="text-neutral-600 font-medium">공휴일</span>
                  <span className="font-bold">09:00 - 13:00</span>
                </div>
                <div className="flex justify-between text-primary font-bold">
                  <span>일요일</span>
                  <span>휴진</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <p className="text-neutral-700">경기도 광주시 파발로 187 세양빌딩 2층</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">call</span>
                  <a href="tel:031-767-0075" className="text-neutral-700 font-bold hover:text-primary transition-colors">031-767-0075</a>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary">local_parking</span>
                  <p className="text-neutral-700">건물 내 주차장 이용 가능. 만차 시 광주시보건소·공설운동장 인근 공영주차장 안내드립니다.</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/how-to-come" className="px-5 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all flex items-center gap-2 text-sm">
                  진료 안내 자세히
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <a href="https://booking.naver.com/booking/13/bizes/1171309" target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-white border border-neutral-200 text-neutral-800 rounded-lg font-bold hover:bg-neutral-50 transition-all flex items-center gap-2 text-sm">
                  네이버 예약
                </a>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg min-h-[400px] border border-neutral-200 bg-gradient-to-br from-primary-surface to-white relative flex items-center justify-center p-10">
              <div className="text-center">
                <span className="material-symbols-outlined text-primary text-7xl mb-4">location_on</span>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">톡바른경희한의원 본점</h3>
                <p className="text-neutral-600 mb-2">경기도 광주시 파발로 187</p>
                <p className="text-neutral-600 mb-6">세양빌딩 2층</p>
                <p className="text-sm text-neutral-500 mb-6">(광주시보건소 앞 / 탄벌동)</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <a
                    href="https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EA%B4%91%EC%A3%BC%EC%8B%9C%20%ED%8C%8C%EB%B0%9C%EB%A1%9C%20187"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white border border-primary/30 text-primary rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all"
                  >
                    네이버 지도
                  </a>
                  <a
                    href="https://map.kakao.com/?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EA%B4%91%EC%A3%BC%EC%8B%9C%20%ED%8C%8C%EB%B0%9C%EB%A1%9C%20187"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white border border-primary/30 text-primary rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all"
                  >
                    카카오맵
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
