import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";

const HOW_TO_COME_FAQ: FAQItem[] = [
  {
    q: "예약은 어떻게 하나요?",
    a: "예약은 전화로 문의해주시면 안내드리겠습니다. 운영 중인 예약 채널은 홈페이지에서 함께 확인하실 수 있습니다.",
  },
  {
    q: "초진 때 무엇을 준비하면 좋나요?",
    a: "복용 중인 약, 검사 결과, 사고접수번호, 기존 치료 이력, 피부 시술 이력 등이 있다면 가져오시면 진료 방향을 정하는 데 도움이 됩니다.",
  },
  {
    q: "비급여 비용은 어디에서 확인하나요?",
    a: "비급여 항목과 비용은 진료 항목, 부위, 범위에 따라 달라질 수 있습니다. 내원 시 원내 고지 자료와 상담 안내를 통해 확인하실 수 있습니다.",
  },
  {
    q: "주차는 가능한가요?",
    a: "건물 주차장을 이용하실 수 있습니다. 만차이거나 주차가 어려운 경우에는 내원 전 전화로 문의해주시면 이용 가능한 방법을 안내드리겠습니다.",
  },
  {
    q: "진료시간은 어떻게 되나요?",
    a: "평일 09:00~20:00 / 토요일 09:00~14:00 / 공휴일 09:00~13:00 / 일요일 휴진입니다. 공휴일 일정은 변동될 수 있어 내원 전 확인을 권합니다.",
  },
];

export default function HowToComePage() {
  return (
    <>
      <Navbar activePage="/how-to-come" />

      {/* Hero */}
      <header className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary-surface to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-neutral-500 mb-3">홈 &gt; 진료 안내</p>
          <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Guide</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6">
            진료시간·예약·<span className="text-primary">오시는 길</span>
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-3xl">
            톡바른경희한의원 본점의 진료시간, 예약 방법, 오시는 길, 주차 안내를 한곳에 정리했습니다.
            내원 전 확인하시면 더 편하게 방문하실 수 있습니다.
          </p>
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

      {/* Hours & Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
                <h2 className="text-2xl font-bold text-neutral-900">진료시간</h2>
              </div>
              <div className="space-y-4 mb-6">
                {[
                  { label: "평일 (월-금)", value: "09:00 - 20:00" },
                  { label: "토요일", value: "09:00 - 14:00" },
                  { label: "공휴일", value: "09:00 - 13:00" },
                  { label: "일요일", value: "휴진", highlight: true },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={`flex justify-between items-center py-3 border-b border-neutral-200 last:border-b-0 ${row.highlight ? "text-primary" : ""}`}
                  >
                    <span className={`font-medium ${row.highlight ? "text-primary" : "text-neutral-700"}`}>{row.label}</span>
                    <span className={`font-bold ${row.highlight ? "text-primary" : "text-neutral-900"}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                공휴일 및 임시 휴진 일정은 변동될 수 있으므로 내원 전 확인을 권합니다.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">storefront</span>
                <h2 className="text-2xl font-bold text-neutral-900">병원 정보</h2>
              </div>
              <div className="space-y-5 mb-8">
                <div>
                  <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">상호</p>
                  <p className="text-lg font-bold text-neutral-900">톡바른경희한의원 본점</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">주소</p>
                  <p className="text-neutral-700">경기도 광주시 파발로 187<br />세양빌딩 2층</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">전화</p>
                  <a href="tel:031-767-0075" className="text-lg font-bold text-neutral-900 hover:text-primary transition-colors">031-767-0075</a>
                </div>
              </div>
              <a href="tel:031-767-0075" className="w-full px-6 py-4 bg-neutral-900 text-white rounded-lg font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">call</span>
                전화하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Map */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Location</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">오시는 길·주차</h2>
              <p className="text-neutral-600 leading-relaxed mb-5">
                경기광주 탄벌동, 광주시보건소 앞 세양빌딩 2층에 위치해 있습니다.
                내원 전 지도 앱에서 <strong className="text-neutral-900">톡바른경희한의원 본점</strong> 또는
                <strong className="text-neutral-900"> 경기도 광주시 파발로 187</strong>을 검색하시면 더 편하게 찾으실 수 있습니다.
              </p>
              <div className="bg-white rounded-2xl p-6 border-2 border-primary/20 mb-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl flex-shrink-0">local_parking</span>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-2">주차 안내</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      건물 주차장을 이용하실 수 있습니다. 만차이거나 주차가 어려운 경우에는
                      내원 전 전화로 문의해주시면 광주시보건소·공설운동장 인근 공영주차장 등
                      현재 이용 가능한 방법을 안내드리겠습니다.
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="tel:031-767-0075"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all"
              >
                <span className="material-symbols-outlined">call</span>
                전화 031-767-0075
              </a>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg min-h-[400px] border border-neutral-200 bg-gradient-to-br from-primary-surface to-white relative flex items-center justify-center p-10">
              <div className="text-center">
                <span className="material-symbols-outlined text-primary text-7xl mb-4">location_on</span>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">톡바른경희한의원 본점</h3>
                <p className="text-neutral-600 mb-2">경기도 광주시 파발로 187</p>
                <p className="text-neutral-600 mb-6">세양빌딩 2층</p>
                <p className="text-sm text-neutral-500 mb-6">광주시보건소 앞 · 탄벌동</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <a
                    href="https://map.naver.com/p/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EA%B4%91%EC%A3%BC%EC%8B%9C%20%ED%8C%8C%EB%B0%9C%EB%A1%9C%20187"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white border border-primary/30 text-primary rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all"
                  >
                    네이버 지도에서 보기
                  </a>
                  <a
                    href="https://map.kakao.com/?q=%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EA%B4%91%EC%A3%BC%EC%8B%9C%20%ED%8C%8C%EB%B0%9C%EB%A1%9C%20187"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white border border-primary/30 text-primary rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all"
                  >
                    카카오맵에서 보기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before Visit */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Before Visit</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">처음 오시기 전 확인해주세요</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              예약 후 내원하시면 대기 시간을 줄일 수 있습니다.
              진료 목적에 따라 아래 내용을 준비해오시면 상담과 진료 방향을 정하는 데 도움이 됩니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", icon: "medication", title: "한약 상담", desc: "수면, 소화, 대변, 부종, 열감, 피로 변화처럼 평소 불편했던 증상을 메모해오시면 도움이 됩니다." },
              { num: "02", icon: "accessibility_new", title: "통증·교통사고", desc: "통증 부위, 악화되는 자세, 사고접수번호, 기존 검사 결과가 있다면 함께 가져오시면 좋습니다." },
              { num: "03", icon: "face", title: "피부미용 상담", desc: "최근 시술 이력, 사용 중인 화장품, 피부가 예민해진 계기, 원하는 다운타임 범위를 알려주시면 좋습니다." },
            ].map((card) => (
              <div key={card.num} className="bg-neutral-50 rounded-2xl p-8 border border-neutral-100 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 bg-primary-surface text-primary rounded-xl flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                </div>
                <p className="text-xs font-bold text-primary mb-2">{card.num}</p>
                <h3 className="text-xl font-bold mb-3 text-neutral-900">{card.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Non-covered Fee */}
      <section className="py-20 bg-primary-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Non-covered Fee</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">비급여 안내</h2>
            <p className="text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              비급여 항목과 비용은 진료 항목, 부위, 범위에 따라 달라질 수 있습니다.
              자세한 내용은 원내 고지 자료와 상담 시 안내를 통해 확인하실 수 있습니다.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border-2 border-primary/20 text-center">
            <span className="material-symbols-outlined text-primary text-3xl mb-3">info</span>
            <p className="text-neutral-700 leading-relaxed">
              정확한 비용은 진료 항목과 범위를 확인한 뒤<br />
              원내 고지 자료와 상담 안내를 기준으로 말씀드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">진료 안내 FAQ</h2>
          </div>
          <FAQSchema items={HOW_TO_COME_FAQ} />
          <div className="space-y-4">
            {HOW_TO_COME_FAQ.map((item, i) => (
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
          <div className="text-center mt-10">
            <Link href="/faq" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              전체 FAQ 보기
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
