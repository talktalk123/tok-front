import type { Metadata } from "next";
import Link from "next/link";
import { getCmsPage } from "@/lib/cms/pages";
import CmsPageShell from "@/components/cms/CmsPage";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import FAQSchema from "@/components/FAQSchema";

const faqSections = [
  {
    id: "basic",
    title: "기본 진료 FAQ",
    items: [
      {
        q: "톡바른경희한의원 본점은 어떤 진료를 하나요?",
        a: "한약, 추나·통증치료, 침·약침, 집중형·방사형 체외충격파, 자기장치료, 교통사고 자동차보험 진료, 피부미용 진료를 환자 상태에 맞춰 안내합니다. 증상 하나만 보고 치료를 정하기보다 몸 상태와 생활 패턴을 함께 확인합니다.",
      },
      {
        q: "증상에 따라 어떤 치료를 먼저 선택하나요?",
        a: "본원은 증상을 근육·인대의 긴장과 염증, 뼈·관절의 움직임과 체형 불균형, 소화·수면·피로·열감·부종 같은 몸 안의 기능 문제로 나누어 확인합니다. 근육·인대 문제가 중심이면 침·약침·체외충격파를, 관절 움직임과 체형 불균형이 크면 추나요법을, 몸 안의 기능 문제가 함께 보이면 한약을 우선 고려합니다. 실제 진료에서는 여러 문제가 겹칠 수 있어 상태에 따라 순서를 정해 단계적으로 진행합니다.",
      },
      {
        q: "처음 내원하면 어떤 과정을 거치나요?",
        a: "불편한 증상과 생활 패턴을 확인한 뒤 필요한 경우 맥진·설진·복진, 체형검사, 근육 긴장도 확인, 피부 상태 확인 등을 진행합니다. 이후 현재 문제의 우선순위와 치료 방향을 설명드립니다.",
      },
      {
        q: "예약은 어떻게 하나요?",
        a: "예약은 네이버예약 또는 전화로 문의해주시면 안내드리겠습니다. 톡바른경희한의원의 피부미용 진료와 추나치료는 사전예약이 필요합니다.",
      },
      {
        q: "초진 때 무엇을 준비하면 좋나요?",
        a: "복용 중인 약, 검사 결과, 사고접수번호, 기존 치료 이력, 피부 시술 이력 등이 있다면 가져오시면 진료 방향을 정하는 데 도움이 됩니다.",
      },
      {
        q: "치료는 몇 번 정도 받아야 하나요?",
        a: "증상 기간, 몸 상태, 치료 목표에 따라 달라질 수 있습니다. 처음 진찰 후 예상 치료 방향과 경과 확인 시점을 안내드립니다.",
      },
      {
        q: "주차와 진료시간은 어떻게 되나요?",
        a: "진료시간은 평일 09:00~20:00 / 토요일 09:00~14:00 / 공휴일 09:00~13:00 / 일요일 휴진입니다. 건물 내 주차장을 이용하실 수 있으며, 만차이거나 주차가 어려운 경우에는 광주시보건소·공설운동장 인근 공영주차장 등 이용 가능한 방법을 안내드립니다.",
      },
      {
        q: "비급여 비용은 어디에서 확인하나요?",
        a: "비급여 항목과 비용은 진료 항목, 부위, 범위에 따라 달라질 수 있습니다. 내원 시 원내 고지 자료와 상담 안내를 통해 확인하실 수 있습니다.",
      },
    ],
  },
  {
    id: "about-faq",
    title: "원장 소개 FAQ",
    items: [
      {
        q: "톡바른경희한의원은 어떤 진료를 하나요?",
        a: "한약, 추나요법, 침, 약침, 체외충격파, 자기장치료, 피부(레이저, 리프팅, 피부질환 등) 진료를 진행합니다. 환자별로 상태에 맞춰 설명하고 치료 방향을 정합니다.",
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
        a: "환자의 증상과 몸 상태, 생활 패턴을 종합적으로 살피고, 효율적이고 적절한 순서에 맞춰 치료 방향을 설명하는 것입니다. 가능한 부분과 어려운 부분을 나누어 현대인에게 친숙한 말로 설명하려고 합니다.",
      },
    ],
  },
  {
    id: "herbal-faq",
    title: "한약 진료 FAQ",
    items: [
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
        a: "환자가 복용 중 어떤 변화가 생기는지 확인하고, 이후 진료에서 남은 증상에 따라 방향을 조정하는 것을 중요하게 봅니다. 성인 기준으로 물을 제외한 순수 한약재를 2kg 이상 사용하는 원칙을 두고 있습니다.",
      },
      {
        q: "한약 설명서를 자세히 써주는 이유는 무엇인가요?",
        a: "환자가 본인 몸 상태와 치료 방향을 이해해야 복용 중 변화를 잘 확인할 수 있기 때문입니다. 어려운 한의학 용어를 그대로 전달하기보다 일상적으로 와닿는 말로 풀어 설명하려고 합니다.",
      },
      {
        q: "피로, 수면, 소화불량이 같이 있을 때는 어떻게 보나요?",
        a: "여러 증상이 함께 있을 때는 한 가지 원인으로 단정하지 않고 몸 상태를 나누어 확인합니다. 소화, 수면, 열감, 부종, 스트레스 반응을 함께 보면서 보충, 순환, 배출 중 어떤 방향이 먼저 필요한지 구분합니다.",
      },
    ],
  },
  {
    id: "pain-faq",
    title: "추나·통증 진료 FAQ",
    items: [
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
    ],
  },
  {
    id: "traffic-faq",
    title: "교통사고 진료 FAQ",
    items: [
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
    ],
  },
  {
    id: "skin-faq",
    title: "피부미용 진료 FAQ",
    items: [
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
    ],
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("faq");
  const seo = page?.theme?.seo;
  if (seo?.title || seo?.description) {
    return { title: seo.title, description: seo.description };
  }
  return {};
}

export default async function FaqPage() {
  // CMS에 보이는 블록이 있으면 CMS로 렌더, 없으면 기존 콘텐츠 폴백
  const page = await getCmsPage("faq");
  if (page && page.blocks.length > 0) {
    return <CmsPageShell page={page} activePage="/faq" />;
  }
  return <FaqFallback />;
}

function FaqFallback() {
  const allFaqItems = faqSections.flatMap((s) => s.items);
  return (
    <>
      <FAQSchema items={allFaqItems} />
      <Navbar activePage="/faq" />

      {/* Hero */}
      <header className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-primary-surface to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-neutral-500 mb-3">홈 &gt; FAQ</p>
          <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">FAQ</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6">
            자주 묻는 질문
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-3xl">
            톡바른경희한의원 본점의 한약, 추나·통증, 교통사고, 피부미용,
            예약과 주차 안내를 한곳에 정리했습니다.
          </p>
          <div className="flex flex-wrap gap-2">
            {faqSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-4 py-2 bg-white border border-primary/30 text-primary text-sm font-bold rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                {section.title.replace(" FAQ", "")} ↓
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* FAQ Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {faqSections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-8 bg-primary"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.items.map((item, i) => (
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
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">더 궁금한 점이 있으시다면</h2>
          <p className="text-neutral-300 mb-10 leading-relaxed">
            상태에 맞는 진료 방향은 직접 진찰 후 안내드릴 수 있습니다. 전화나 네이버 예약으로 문의주세요.
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
