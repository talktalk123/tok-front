import type { Metadata } from "next";
import type { PageSeo } from "@partyvelope/react-block-cms";
import { SITE_CONFIG } from "@/lib/site-config";

/**
 * 페이지별 SEO 단일 원천 — canonical·제목·설명·OG 를 페이지마다 자기 값으로 낸다.
 *
 * 배경(2026-09-21 SEO 피드백): 루트 layout 의 alternates.canonical / openGraph.url 이 홈 주소로 고정돼
 * 모든 하위 페이지가 "홈의 중복" 으로 읽혔고, 제목·설명은 CMS(theme.seo)에만 의존해 전부 비어
 * 루트 기본값으로 떨어졌다. 여기의 기본값이 항상 깔리고, admin 에디터의 "SEO 제목/설명" 을 채우면 그 값이 우선한다.
 *
 * 제목은 루트 title.template(`%s | 톡바른경희한의원 본점`)이 뒤에 붙으므로 여기엔 앞부분만 쓴다(home 은 absolute).
 * 문안 규칙: 효과 보장·비교 표현 금지, 페이지 실제 내용과 일치(PLAYBOOK §10).
 */
export type SeoSlug =
  | "home"
  | "about"
  | "medicine"
  | "chuna"
  | "car-accident"
  | "beauty"
  | "how-to-come"
  | "faq";

interface PageSeoDefaults {
  path: string;
  title: string;
  description: string;
}

export const PAGE_SEO: Record<SeoSlug, PageSeoDefaults> = {
  home: {
    path: "/",
    title: `${SITE_CONFIG.name} | 경기광주 탄벌동 한의원`,
    description: SITE_CONFIG.description,
  },
  about: {
    path: "/about",
    title: "이기홍 원장 소개 · 진료 철학",
    description:
      "톡바른경희한의원 본점 이기홍 원장(경희대학교 한의과대학)의 이력과 강의·저서 활동, 진료 철학을 소개합니다. 증상과 몸의 내부 상태, 구조, 피부 상태를 함께 살펴 치료 방향을 설명하는 진료입니다.",
  },
  medicine: {
    path: "/medicine",
    title: "경기광주 한약·보약 진료 (맥진·설진·복진 상담)",
    description:
      "경기광주 탄벌동 톡바른경희한의원 본점의 한약 진료 안내. 맥진·설진·복진과 생활 패턴을 함께 확인해 보충·순환·배출 방향을 나누어 처방하고, 한약 설명서로 복용 중 변화를 다음 처방에 반영합니다.",
  },
  chuna: {
    path: "/chuna",
    title: "경기광주 추나요법·통증치료 (침·약침·체외충격파)",
    description:
      "경기광주 탄벌동 톡바른경희한의원 본점의 추나·통증 진료. 골반교정 추나, 침·약침, 집중형·방사형 체외충격파, 자기장치료를 통증 부위와 몸 상태에 맞춰 조합하고, 반복되는 통증의 구조적 원인을 함께 살핍니다.",
  },
  "car-accident": {
    path: "/car-accident",
    title: "경기광주 교통사고 한의원 · 자동차보험 진료 안내",
    description:
      "경기광주 탄벌동 톡바른경희한의원 본점의 교통사고 진료. 사고접수번호로 자동차보험 접수 절차를 안내하고, 사고 후 목·허리 통증, 두통, 어깨 결림, 몸살 등 초기 상태를 확인해 경과에 맞춰 치료를 조합합니다.",
  },
  beauty: {
    path: "/beauty",
    title: "경기광주 한의원 피부미용 · 스킨부스터·레이저 상담",
    description:
      "경기광주 탄벌동 톡바른경희한의원 본점의 피부미용 진료. 피부 고민과 병변 깊이, 회복력, 다운타임을 살펴 스킨부스터·레이저·니들RF·HIFU 등 시술 방향을 함께 정합니다. 경과는 개인의 상태에 따라 달라질 수 있습니다.",
  },
  "how-to-come": {
    path: "/how-to-come",
    title: "탄벌동 한의원 진료시간·예약·오시는 길·주차 안내",
    description:
      "톡바른경희한의원 본점(경기 광주시 파발로 187 세양빌딩 2층)의 진료시간, 네이버 예약 방법, 오시는 길, 주차, 초진 준비물, 비급여 안내를 한곳에 정리했습니다.",
  },
  faq: {
    path: "/faq",
    title: "자주 묻는 질문 (한약·추나·교통사고·피부미용·예약)",
    description:
      "톡바른경희한의원 본점에 처음 오시기 전 자주 묻는 질문. 진료 과정과 예약·주차, 한약, 추나·통증, 교통사고 자동차보험, 피부미용 진료에 대해 안내합니다.",
  },
};

/**
 * 페이지 metadata 생성 — CMS(theme.seo) 값이 있으면 우선, 없으면 PAGE_SEO 기본값.
 * canonical / og:url 은 항상 자기 주소. openGraph 는 루트와 병합되지 않고 통째로 대체되므로 공통 필드를 함께 넣는다.
 */
export function buildPageMetadata(slug: SeoSlug, cmsSeo?: PageSeo | null): Metadata {
  const def = PAGE_SEO[slug];
  const title = cmsSeo?.title?.trim() || def.title;
  const description = cmsSeo?.description?.trim() || def.description;
  const url = `${SITE_CONFIG.url}${def.path === "/" ? "" : def.path}`;
  const ogTitle = slug === "home" ? title : `${title} | ${SITE_CONFIG.name}`;

  return {
    title: slug === "home" ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_CONFIG.name,
      locale: "ko_KR",
      url,
      title: ogTitle,
      description,
      ...(cmsSeo?.ogImage ? { images: [cmsSeo.ogImage] } : {}),
    },
  };
}
