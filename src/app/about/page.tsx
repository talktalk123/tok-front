import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import FAQSchema, { type FAQItem } from "@/components/FAQSchema";

const ABOUT_FAQ: FAQItem[] = [
  {
    q: "톡바른경희한의원은 어떤 진료를 하나요?",
    a: "한약, 추나요법, 침, 약침, 체외충격파, 자기장치료, 피부(레이저, 리프팅, 피부질환 등) 진료를 진행합니다. 환자별로 상태에 맞춰 설명하고 치료 방향을 정합니다.",
  },
  {
    q: "치료는 어떤 기준으로 나누어 보나요?",
    a: "근육·인대의 긴장과 염증 반응은 침·약침·체외충격파를, 뼈·관절의 움직임과 체형 불균형은 추나요법을, 소화·수면·피로·열감·부종처럼 몸 안의 기능 문제는 한약을 우선 고려합니다. 한 가지 치료를 정해놓기보다 현재 문제의 층을 나누어 보고, 필요한 순서에 맞춰 단계적으로 안내합니다.",
  },
  {
    q: "피부미용 진료에서 원장의 경험이 왜 중요한가요?",
    a: "피부미용 진료는 장비 선택과 피부 상태 판단이 함께 이루어져야 합니다. 병변의 종류, 피부 두께, 회복력, 다운타임, 시술 목적을 함께 판단해야 합니다. 이기홍 원장은 스킨부스터와 피부미용 장비의 원리, 성분, 임상 근거를 책과 강의로 정리해온 경험을 바탕으로 진료 방향을 말씀드립니다.",
  },
  {
    q: "피부미용 장비가 다양하면 어떤 점이 좋은가요?",
    a: "피부 고민은 색소, 홍조, 모공, 흉터, 탄력, 피부결처럼 원인과 깊이가 다를 수 있습니다. 장비 선택지가 다양하면 병변의 종류와 깊이, 피부 회복력, 다운타임 가능성을 고려해 더 세밀하게 시술 방향을 정할 수 있습니다.",
  },
  {
    q: "진료 철학은 무엇인가요?",
    a: "환자의 증상과 몸 상태, 생활 패턴을 종합적으로 살피고 적절한 순서에 맞춰 치료 방향을 말씀드리는 것입니다. 가능한 부분과 어려운 부분을 나누어 현대인에게 친숙한 말로 설명하려고 합니다.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar activePage="/about" />

      {/* Hero */}
      <header className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary-surface to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-neutral-500 mb-3">홈 &gt; 톡바른 소개</p>
          <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">About Talkbareun</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6">
            몸 상태를 종합적으로 살피고,<br />
            <span className="text-primary">치료 방향을 함께 정합니다.</span>
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-3xl">
            톡바른경희한의원 본점은 증상과 몸의 내부 상태, 구조, 피부 상태를 함께 살펴
            적절한 치료 방향을 말씀드리는 한의원입니다.
          </p>
          <div className="flex flex-wrap gap-3">
            {["꼼꼼한 진찰", "솔직한 설명", "치료 순서 정리", "과잉진료 지양"].map((tag) => (
              <span key={tag} className="px-4 py-2 bg-white border border-primary/20 text-primary text-sm font-bold rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Director */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-surface rounded-full blur-3xl opacity-50"></div>
              <div className="relative aspect-[4/5] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="이기홍 원장"
                  src="/images/doctor.jpg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-neutral-100">
                <p className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">Director</p>
                <p className="text-xl font-bold text-neutral-900">이기홍 원장</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Director</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">이기홍 원장</h2>
              <p className="text-neutral-600 leading-relaxed mb-5">
                이기홍 원장은 경희대학교 한의과대학을 졸업한 한의사로,
                한약, 추나·통증치료, 침·약침, 체외충격파, 피부미용을 함께 진료하며
                환자 상태에 맞는 치료 방향을 설명하는 것을 중요하게 생각합니다.
                추나·통증 진료에서는 척추도인안교학회 창립 이전부터 척추도인안교요법 수련 멤버로 참여해온 경험을 바탕으로,
                골반·척추·관절 움직임을 함께 확인합니다.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                피부미용 진료에 사용되는 장비와 성분에 대해 작용 기전과 임상 근거를 논문 단위로 검토하고
                정리해온 경험을 바탕으로 진료에 적용합니다. 국제레이저미용피부과학회 학술이사 활동 역시
                피부미용 진료 기준을 정리하는 과정과 연결됩니다. 강의와 저서 활동은 단순한 이력 소개가 아니라,
                환자에게 왜 이 치료가 필요한지, 어떤 경우에는 조심해야 하는지 설명하기 위한 기준을 정리해온 과정입니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "경희대 한의대 졸업",
                  "척추도인안교학회 정회원",
                  "국제레이저미용피부과학회 학술이사",
                  "2026년 K-MEX 보수교육 강의",
                  "한케어 강의 진행",
                  "Evidence Based Skinbooster 저자",
                  "대한통합레이저의학회 교육위원",
                ].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-semibold rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Authority</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">진료 신뢰를 만드는 이력과 경험</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              강의와 저서, 수상 이력은 단순한 소개가 아니라
              진료실에서 환자 상태를 판단하고 설명하는 기준으로 이어집니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "학력과 임상 기반",
                items: [
                  "경희대학교 한의과대학 졸업",
                  "톡바른경희한의원 대표원장",
                  "한약·추나·통증·피부미용 통합 진료",
                  "척추도인안교학회 정회원",
                  "척추도인안교학회 창립 이전부터 척추도인안교요법 수련 멤버",
                ],
              },
              {
                num: "02",
                title: "강의와 교육 활동",
                items: [
                  "국제레이저미용피부과학회 학술이사",
                  "전국한의학학술대회 레이저세션 대표강사",
                  "2026년 K-MEX 보수교육 강의: 스킨부스터 선택기준과 유효성분 전달방법",
                  "한케어 피부미용 강의",
                  "대한통합레이저의학회 교육위원",
                ],
              },
              {
                num: "03",
                title: "저서와 수상",
                items: [
                  "피부미용진료를 위한 EBS : Evidence Based Skinbooster 저자",
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

      {/* Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Philosophy</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">진료 철학</h2>
              <p className="text-neutral-600 leading-relaxed mb-5">
                환자가 느끼는 증상은 하나여도 실제 원인은 여러 층으로 얽혀 있을 수 있습니다.
                피로는 단순한 체력 저하일 수도 있지만 소화력 저하, 수면 문제, 스트레스 반응, 열감, 부종과 연결될 수 있습니다.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-5">
                통증도 마찬가지입니다. 아픈 부위가 목이어도 문제는 어깨, 등, 골반, 반복되는 자세, 근육 긴장과 연결될 수 있습니다.
                피부미용 역시 피부 상태, 병변의 깊이, 회복력, 다운타임을 함께 확인해야 합니다.
                스킨부스터와 피부미용 장비의 원리, 성분, 임상 근거를 책과 강의로 정리해온 경험은 이러한 판단 기준을 세우는 바탕이 됩니다.
              </p>
              <p className="text-base text-neutral-700 leading-relaxed bg-primary-surface p-6 rounded-2xl border-l-4 border-primary">
                그래서 본원은 진찰 결과를 바탕으로 우선적으로 살펴볼 문제와 경과를 보며 조정할 부분을 나누어 말씀드립니다.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
              <h3 className="text-xl font-bold mb-6 text-neutral-900">환자분께 드리는 진료 원칙</h3>
              <ul className="space-y-4">
                {[
                  "확실한 개선을 단정하기보다, 가능한 방향과 한계를 함께 설명합니다.",
                  "환자 상태에 맞는 치료 순서와 선택지를 차분히 안내합니다.",
                  "어려운 한의학 용어는 일상적으로 와닿는 말로 풀어 설명합니다.",
                  "여러 치료 방법 중 환자의 상태와 목적에 맞는 선택지를 정리해 안내합니다.",
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

      {/* FAQ */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">톡바른 소개 FAQ</h2>
          </div>
          <FAQSchema items={ABOUT_FAQ} />
          <div className="space-y-4">
            {ABOUT_FAQ.map((item, i) => (
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">상태에 맞는 치료 방향이 궁금하다면</h2>
          <p className="text-neutral-300 mb-10 leading-relaxed">
            전화로 문의주시거나 네이버 예약을 통해 진료 일정을 잡아드립니다.
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
            <Link href="/how-to-come" className="px-8 py-4 border border-white/30 hover:bg-white hover:text-neutral-900 rounded-lg font-bold transition-all flex items-center gap-2">
              진료 안내
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
