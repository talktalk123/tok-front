import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CarAccidentPage() {
  return (
    <>
      <Navbar activePage="/car-accident" />

      {/* Hero */}
      <header className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary-surface to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-neutral-500 mb-3">홈 &gt; 교통사고 진료</p>
          <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Traffic Accident Care</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6 max-w-4xl">
            교통사고 후 통증,<br />
            <span className="text-primary">초기 상태 확인이 중요합니다.</span>
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-3xl">
            톡바른경희한의원 본점의 교통사고 진료는 사고접수번호와 자동차보험 접수 절차를 안내하고,
            사고 후 목·허리 통증, 두통, 어깨 결림, 몸살, 수면 변화를 함께 확인합니다.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {["사고접수번호 안내", "자동차보험 진료", "목·허리 통증", "두통·어깨 결림", "추나·침·약침·한약"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-white border border-primary/30 text-primary text-xs font-bold rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:031-767-0075" className="px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">call</span>
              전화 문의 031-767-0075
            </a>
            <Link href="/how-to-come" className="px-8 py-4 bg-white border border-neutral-200 text-neutral-800 rounded-lg font-bold hover:bg-neutral-50 transition-all flex items-center gap-2">
              오시는 길 보기
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Why Early Care Matters */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Why Early Care Matters</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                처음에는 괜찮아도,<br />며칠 뒤 불편감이 올라올 수 있습니다
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-5">
                편타성 손상은 교통사고 이후 흔히 이야기되는 목·어깨·등 주변의 통증 양상입니다.
                목 통증과 뻣뻣함, 움직일 때 심해지는 통증, 두통, 어깨·등·팔의 통증, 피로감이나 어지럼 같은 증상이 나타날 수 있습니다.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-5">
                교통사고 후에는 통증 부위와 기능 제한, 일상생활 불편감이 시간에 따라 달라질 수 있습니다.
                본원에서는 사고 직후 증상만 보지 않고, 움직임과 근육 긴장, 두통이나 수면 변화까지 함께 살피며 경과를 확인합니다.
              </p>
              <p className="text-base text-neutral-700 leading-relaxed bg-primary-surface p-6 rounded-2xl border-l-4 border-primary">
                교통사고 후 진료는 단순히 아픈 부위만 보는 것보다 사고 이후 몸의 긴장과 움직임 변화를 함께 확인하는 과정이 중요합니다.
              </p>
            </div>
            <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
              <h3 className="text-xl font-bold mb-6 text-neutral-900">이런 증상이 있다면 확인해보세요</h3>
              <ul className="space-y-4">
                {[
                  "목·허리 통증과 뻣뻣함",
                  "두통, 어깨 결림, 등 통증",
                  "팔 저림, 손 저림, 움직임 제한",
                  "몸살 같은 피로감, 어지럼, 수면 불편",
                  "처음에는 괜찮았는데 며칠 뒤 올라온 통증",
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

      {/* First Visit Steps */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">First Visit</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">사고접수번호만 준비해오시면 접수 절차를 안내드립니다</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              자동차보험 진료가 필요한 경우 보험사 접수 여부와 사고접수번호를 확인해오시면 진료 접수가 더 수월합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "사고접수번호 확인", desc: "보험사에 사고가 접수되어 있다면 사고접수번호를 알려주세요. 접수 상황에 따라 필요한 절차를 안내드립니다." },
              { num: "02", title: "사고 경위와 증상 확인", desc: "추돌 방향, 충격 정도, 사고 후 증상이 언제부터 시작되었는지 확인합니다." },
              { num: "03", title: "목·허리·어깨 움직임 확인", desc: "통증 부위, 관절 움직임, 근육 긴장, 두통이나 저림 여부를 함께 살펴봅니다." },
              { num: "04", title: "치료 방향 안내", desc: "침, 약침, 추나, 한약, 물리치료 등 상태에 맞는 치료 방향과 경과 확인 기준을 말씀드립니다." },
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
                <div className="text-3xl font-black text-primary mb-3">{step.num}</div>
                <h3 className="text-lg font-bold mb-3 text-neutral-900">{step.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Options Table */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Treatment Options</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">사고 후 몸 상태에 맞춰 치료를 조합합니다</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              교통사고 후 통증은 근육 긴장, 관절 움직임 제한, 전신 피로감, 수면 변화가 함께 나타날 수 있어 상태에 맞는 치료 조합이 중요합니다.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100">
              <thead>
                <tr className="bg-neutral-900 text-white">
                  <th className="p-4 text-left font-bold">치료</th>
                  <th className="p-4 text-left font-bold">확인하는 부분</th>
                  <th className="p-4 text-left font-bold">설명</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "침치료", focus: "통증 부위와 연결된 근육 긴장", desc: "목·어깨·허리 주변 긴장과 혈자리 반응을 함께 확인합니다." },
                  { name: "약침치료", focus: "통증 부위, 염증 반응, 근육 긴장", desc: "환자 상태와 목적에 따라 약침 종류를 구분해 적용합니다." },
                  { name: "추나요법", focus: "목·허리·골반 움직임", desc: "사고 이후 움직임 제한과 체형 변화를 확인하며 시행합니다." },
                  { name: "한약", focus: "전신 긴장, 몸살, 수면, 회복력", desc: "교통사고 이후 몸의 긴장과 피로감, 수면 변화를 함께 살펴 처방 방향을 정합니다." },
                  { name: "물리치료·자기장치료", focus: "통증 완화와 회복 보조", desc: "통증 양상과 일상생활 불편감에 따라 보조적으로 활용합니다." },
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

      {/* Recovery Flow */}
      <section className="py-24 bg-primary-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Recovery Flow</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-neutral-900">
                상태에 맞는 회복 흐름이 중요합니다
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-5">
                교통사고 후 통증은 가만히 쉬기만 한다고 모두 해결되는 문제가 아니라,
                현재 통증 정도와 움직임 제한을 확인하면서 회복 흐름을 조절하는 과정이 중요합니다.
                본원에서는 환자가 안심하고 일상으로 돌아갈 수 있도록 통증 양상, 움직임, 수면과 피로 변화를 함께 확인합니다.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                통증이 심한 초기에는 불편감을 줄이는 치료를 우선하고,
                이후 움직임 회복과 일상 복귀를 함께 고려해 치료 방향을 조정합니다.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-10 border-2 border-red-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
                <h3 className="text-xl font-bold text-neutral-900">바로 의료기관 확인이 필요한 경우</h3>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                심한 두통, 의식 저하, 팔다리 힘 빠짐, 심한 저림, 보행 이상,
                대소변 조절 문제, 심한 흉통이나 호흡곤란이 있다면 응급 평가가 우선입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Follow-up */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Follow-up</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">교통사고 진료는 경과 확인이 중요합니다</h2>
            <p className="text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              사고 후 통증은 하루하루 양상이 달라질 수 있습니다.
              처음 진료에서 현재 상태를 확인하고, 이후 통증 부위와 움직임 변화를 보며 치료 방향을 조정합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "초기 통증 조절", desc: "목·허리 통증, 두통, 어깨 긴장을 줄이고 일상생활 불편감을 확인합니다." },
              { num: "02", title: "움직임 회복", desc: "목·허리·골반 움직임과 근육 긴장을 살피며 회복 흐름을 확인합니다." },
              { num: "03", title: "일상 복귀 관리", desc: "수면, 업무, 운전, 운동 복귀 과정에서 남는 불편감을 함께 조정합니다." },
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

      {/* FAQ */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">교통사고 진료 FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "교통사고 후 한의원 진료를 받으려면 무엇을 준비해야 하나요?",
                a: "자동차보험 진료가 필요한 경우 사고접수번호를 알려주시면 접수 절차를 안내드릴 수 있습니다. 보험사 접수 여부와 사고접수번호를 미리 확인해오시면 내원 과정이 더 수월합니다.",
              },
              {
                q: "사고 직후에는 괜찮았는데 며칠 뒤 아플 수 있나요?",
                a: "교통사고 후 목 통증과 두통, 어깨·등 통증, 피로감, 어지럼 같은 증상은 사고 직후보다 며칠 뒤 나타나는 경우가 있습니다. 초기 상태를 확인하고 경과를 살피는 것이 도움이 됩니다.",
              },
              {
                q: "교통사고 진료에서는 어떤 증상을 확인하나요?",
                a: "목·허리 통증, 두통, 어깨와 등 긴장, 손발 저림, 몸살 같은 전신 불편감, 수면 변화 등을 확인합니다. 사고 경위와 통증이 심해지는 자세도 함께 살펴봅니다.",
              },
              {
                q: "자동차보험으로 어떤 치료를 받을 수 있나요?",
                a: "자동차보험 적용 범위와 환자 상태에 따라 침, 약침, 추나, 한약, 물리치료 등 진료 방향이 달라질 수 있습니다. 실제 적용 여부는 보험 접수 상황과 진찰 결과에 따라 안내드립니다.",
              },
              {
                q: "교통사고 후 얼마나 치료받아야 하나요?",
                a: "사고 충격의 정도, 증상 기간, 통증 부위, 일상생활 불편감에 따라 달라질 수 있습니다. 처음 진료에서 현재 상태를 확인하고 경과를 보며 치료 간격과 방향을 조정합니다.",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">사고접수번호와 함께 전화 주세요</h2>
          <p className="text-neutral-300 mb-10 leading-relaxed">
            보험사 접수 여부와 사고접수번호를 확인해오시면 접수 절차가 더 수월합니다.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:031-767-0075" className="px-8 py-4 bg-primary hover:bg-primary-dark rounded-lg font-bold transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">call</span>
              전화 031-767-0075
            </a>
            <a href="https://booking.naver.com/booking/13/bizes/1171309" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/30 hover:bg-white hover:text-neutral-900 rounded-lg font-bold transition-all flex items-center gap-2">
              네이버 예약
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <Link href="/how-to-come" className="px-8 py-4 border border-white/30 hover:bg-white hover:text-neutral-900 rounded-lg font-bold transition-all flex items-center gap-2">
              오시는 길
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
