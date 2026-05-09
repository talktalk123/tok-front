import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function MedicinePage() {
  return (
    <div className="bg-neutral-50 font-body text-neutral-900 overflow-x-hidden">
      <Navbar activePage="/medicine" />

      {/* Hero */}
      <header className="relative min-h-[70vh] flex items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <img
            alt="전통 한약재"
            className="w-full h-full object-cover opacity-60 scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGEkiWcE2WCEqsbsFPUGUB7b7eGIEWVMhAJ2tD0XsmUcUivLQsJPOrzgeopOc80j469DTw5ETczO18lDHzTwSfzjAzZkiddAfePVIitJCSYw4QGO6ThmxXResVwYumq_ZeOdUKxeB-FSLVyVxQp5yxgNg-OJvzTvhrOlmJHcnUS7YEKn4C68WLuviRaiCPV1UtLdKsV4yQX9W7xdWDH94PgdMoBze7_8AwRFZ8VTaVxfhw6KgMpdmyuRd2Nc7BB-VAQmTmLgCBFKA"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <p className="text-sm text-neutral-400 mb-3">홈 &gt; 한약 진료</p>
            <span className="inline-block px-4 py-1.5 bg-primary/20 border border-primary/30 text-primary-300 rounded-full text-sm font-semibold mb-6">
              Herbal Medicine
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              한약은 증상과 몸 상태를 함께 보고<br />
              <span className="text-primary">처방 방향을 정합니다.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-10">
              톡바른경희한의원 본점의 한약 진료는 맥진·설진·복진과 생활 패턴을 함께 확인하고,<br className="hidden md:block" />
              성인 기준 물 제외 순수 한약재 2kg 이상 사용 원칙과 자세한 한약 설명서를 바탕으로 진행됩니다.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["맞춤한약", "맥진·설진·복진", "자세한 설명서", "순수 한약재 2kg 이상 원칙"].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="https://booking.naver.com/booking/13/bizes/1171309" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center gap-2">
                네이버 예약
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
              <a href="tel:031-767-0075" className="px-8 py-4 bg-white/10 backdrop-blur border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">call</span>
                전화 031-767-0075
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
                보충, 순환, 배출의<br />방향을 구분합니다
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-5">
                한약은 부족한 부분을 채우는 보약이 필요한 경우도 있고, 몸 안의 순환이 막혀 먼저 풀어주어야 하는 경우도 있습니다.
                본원은 맥진·설진·복진과 생활 패턴, 증상 변화를 함께 확인해 보충, 순환, 배출 중 어떤 방향이 먼저 필요한지 구분합니다.
                특히 소화가 막히고 몸이 무겁거나 붓고 머리가 무거운 담음 양상이 있는 경우에는
                무조건 보약을 먼저 쓰기보다 순환과 노폐물 배출을 먼저 돕는 방향을 고려합니다.
              </p>
              <p className="text-base text-neutral-700 leading-relaxed bg-primary-surface p-6 rounded-2xl border-l-4 border-primary">
                보약이 필요한 상태인지, 순환과 노폐물 배출을 먼저 도와야 하는 상태인지 함께 확인합니다.
                또한 성인 기준 물을 제외한 순수 한약재를 1제당 2kg 이상 사용하는 원칙을 두고 있습니다.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
              <h3 className="text-xl font-bold mb-6 text-neutral-900">톡바른 한약 진료의 특징</h3>
              <ul className="space-y-4">
                {[
                  "맥진·설진·복진 기반 진찰",
                  "소화·수면·부종·열감·스트레스 반응 확인",
                  "보충·순환·배출 우선순위 구분",
                  "복용 중 변화 확인 후 처방 방향 조정",
                  "환자 이해를 돕는 자세한 한약 설명서 제공",
                  "성인 기준 물 제외 순수 한약재 2kg 이상 사용 원칙",
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

      {/* Follow-up Callout */}
      <section className="py-20 bg-primary-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Follow-up</p>
          <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight text-neutral-900">
            한약은 처음 처방보다<br />두 번째 처방이 더 정확해질 수 있습니다.
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            첫 처방은 현재 증상과 진찰 소견을 바탕으로 방향을 잡는 과정입니다.
            복용 중 수면, 소화, 피로, 부종, 열감 같은 변화가 확인되면
            다음 처방에서는 남은 불편감에 맞춰 방향을 더 세밀하게 조정할 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["복용 중 변화 확인", "경과에 따른 방향 조정", "자세한 한약 설명서"].map((badge) => (
              <span key={badge} className="px-4 py-2 bg-white text-primary text-sm font-bold rounded-full border border-primary/20">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pattern Table */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Pattern</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">한약 진료에서 자주 나누어 보는 몸 상태</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              한의학 용어가 낯설 수 있지만, 일상적으로 표현하면 몸이 막힌 상태인지,
              보강이 필요한 상태인지, 열이 위로 오른 상태인지를 나누어 보는 과정입니다.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="p-4 text-left font-bold">구분</th>
                  <th className="p-4 text-left font-bold">일상적 표현</th>
                  <th className="p-4 text-left font-bold">확인하는 증상</th>
                  <th className="p-4 text-left font-bold">진료 방향</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "담음", plain: "몸 안의 노폐물과 정체감", symptoms: "더부룩함, 몸 무거움, 머리 무거움, 붓기", direction: "순환과 노폐물 배출을 돕고 소화기 부담을 줄이는 방향" },
                  { name: "기체", plain: "스트레스와 긴장으로 흐름이 막힌 상태", symptoms: "가슴 답답함, 트림, 한숨, 긴장성 통증", direction: "막힌 흐름을 풀고 긴장을 줄이는 방향" },
                  { name: "음허", plain: "몸을 식히고 촉촉하게 유지하는 힘의 부족", symptoms: "상열감, 건조감, 입마름, 불면", direction: "열감을 조절하고 회복력을 돕는 방향" },
                  { name: "심화", plain: "스트레스와 마음의 열감이 위로 오른 상태", symptoms: "불면, 두근거림, 혀 불편감, 화병 양상", direction: "마음을 안정시키고 수면을 돕는 방향" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="p-4 font-bold text-primary">{row.name}</td>
                    <td className="p-4 text-neutral-700">{row.plain}</td>
                    <td className="p-4 text-neutral-600">{row.symptoms}</td>
                    <td className="p-4 text-neutral-600">{row.direction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Categories</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">한약 진료 주요 영역</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "1", title: "보약·기력저하", desc: "체력 저하, 회복 지연, 피로감을 확인하고 보강이 필요한 상태인지 살핍니다." },
              { num: "2", title: "소화·담음", desc: "더부룩함, 식욕저하, 몸의 정체감이 있는지 확인합니다." },
              { num: "3", title: "수면·스트레스", desc: "입면, 중도각성, 가슴 답답함, 긴장 반응을 나누어 봅니다." },
              { num: "4", title: "갱년기·상열감", desc: "안면홍조, 상열감, 불면, 건조감 등 열 균형과 회복력을 살핍니다." },
              { num: "5", title: "다이어트 한약", desc: "식욕, 부종, 소화, 생활 패턴을 확인해 체중관리 방향을 설명합니다." },
              { num: "6", title: "소아·학생 한약", desc: "나이와 체중, 소화력, 체력, 수면 상태를 고려해 복용 방향을 정합니다." },
            ].map((card) => (
              <div key={card.num} className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary-surface text-primary rounded-xl flex items-center justify-center font-bold text-lg mb-4">
                  {card.num}
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900">{card.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medication Guide */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Medication Guide</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">한약 설명서를 자세히 쓰는 이유</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              복용 중 나타나는 변화는 환자마다 다릅니다.
              설명서에는 현재 몸 상태와 처방 방향을 이해할 수 있도록 필요한 내용을 정리하고,
              이후 진료에서 참고할 수 있는 개인별 증상 변화 체크 포인트를 함께 안내합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
              <h3 className="text-xl font-bold mb-6 text-neutral-900">설명서에 담는 내용</h3>
              <ul className="space-y-3">
                {[
                  "주요 증상 정리",
                  "한의학적 원인 설명",
                  "맥진·설진·복진 소견",
                  "기대할 수 있는 변화와 한계",
                  "복약 안내와 증상 변화 체크 포인트",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-neutral-700">
                    <span className="text-primary font-bold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
              <h3 className="text-xl font-bold mb-3 text-neutral-900">복용 중 체크할 변화 예시</h3>
              <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
                확인해야 할 항목은 환자 상태와 처방 방향에 따라 달라질 수 있습니다.
              </p>
              <ul className="space-y-3">
                {[
                  "피로, 수면, 회복감",
                  "식욕, 소화, 속쓰림",
                  "대변·소변 변화",
                  "부종, 열감, 땀, 갈증",
                  "두통, 어지럼, 가슴 답답함",
                  "피부 상태, 통증, 생리 등 개인별 주요 증상",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-neutral-700">
                    <span className="text-primary font-bold">·</span>
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
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">한약 진료 FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "한약은 어떤 기준으로 처방하나요?",
                a: "한약은 부족한 부분을 채우는 보약이 필요한 경우도 있고, 몸 안의 순환이 막혀 먼저 풀어주어야 하는 경우도 있습니다. 본원은 맥진·설진·복진과 생활 패턴, 증상 변화를 함께 확인해 보충, 순환, 배출 중 어떤 방향이 먼저 필요한지 구분합니다.",
              },
              {
                q: "보약 중심 한약과 순환·배출을 돕는 한약은 어떻게 다른가요?",
                a: "보약 중심 한약은 기력, 체력, 회복력처럼 부족한 부분을 채우는 데 초점을 둡니다. 반면 순환과 배출을 돕는 한약은 몸이 무겁거나 붓고, 소화가 막히고, 흐름이 정체된 상태를 먼저 풀어주는 데 초점을 둡니다. 본원은 두 방향의 우선순위를 구분해 처방 방향을 정합니다.",
              },
              {
                q: "톡바른경희한의원의 한약은 어떤 점을 중요하게 보나요?",
                a: "복용 중 어떤 변화가 생기는지 확인하고, 이후 진료에서 남은 증상을 더 정확히 전달할 수 있도록 안내하는 것을 중요하게 봅니다. 성인 기준으로 물을 제외한 순수 한약재를 2kg 이상 사용하는 원칙을 두고 있습니다.",
              },
              {
                q: "한약 설명서를 자세히 써주는 이유는 무엇인가요?",
                a: "환자가 본인 몸 상태와 치료 방향을 이해해야 복용 중 변화를 잘 확인할 수 있기 때문입니다. 어려운 한의학 용어를 그대로 전달하기보다 일상적으로 와닿는 말로 풀어 설명하려고 합니다.",
              },
              {
                q: "피로, 수면, 소화불량이 같이 있을 때는 어떻게 보나요?",
                a: "여러 증상이 함께 있을 때는 한 가지 원인으로 단정하지 않고 몸 상태를 나누어 확인합니다. 소화, 수면, 열감, 부종, 스트레스 반응을 함께 보면서 보충, 순환, 배출 중 어떤 방향이 먼저 필요한지 구분합니다.",
              },
            ].map((item, i) => (
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">한약 상담은 예약 후 내원을 권합니다</h2>
          <p className="text-neutral-300 mb-10 leading-relaxed">
            맥진·설진·복진과 함께 충분한 설명 시간이 필요할 수 있습니다.
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
            <Link href="/faq" className="px-8 py-4 border border-white/30 hover:bg-white hover:text-neutral-900 rounded-lg font-bold transition-all flex items-center gap-2">
              자주 묻는 질문
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
