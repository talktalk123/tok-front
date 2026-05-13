import { getAllPosts } from "@/lib/ai-posts";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 60;

export async function GET() {
  const baseUrl = SITE_CONFIG.url;
  const posts = await getAllPosts();

  const md = `# ${SITE_CONFIG.name}

> ${SITE_CONFIG.description}

위치: 경기도 광주시 파발로 187 세양빌딩 2층 (광주시보건소 앞 · 탄벌동)
전화: ${SITE_CONFIG.phone}
진료시간: 평일 09:00~20:00 / 토요일 09:00~14:00 / 공휴일 09:00~13:00 / 일요일 휴진
대표 원장: 이기홍 (경희대학교 한의과대학 졸업)

## 진료 영역

- [한약 진료](${baseUrl}/medicine): 보충·순환·배출 방향을 구분하는 맞춤한약. 맥진·설진·복진 기반 진찰, 자세한 한약 설명서, 성인 기준 순수 한약재 2kg 이상 사용 원칙.
- [추나·통증 진료](${baseUrl}/chuna): 척추도인안교요법 기반 추나, 혈자리 침치료, 다양한 약침, 집중형·방사형 체외충격파, 자기장치료.
- [교통사고 진료](${baseUrl}/car-accident): 자동차보험 진료, 사고접수번호 안내, 사고 후 목·허리 통증·두통·어깨 결림·몸살 회복 흐름.
- [피부미용 진료](${baseUrl}/beauty): 스킨부스터(PN/PDRN, 엑소좀, 히알루론산), 롱펄스·큐스위치·피코·CO2 레이저, 니들RF, HIFU, 고주파, 마이크로웨이브.

## 안내·소개

- [톡바른 소개](${baseUrl}/about): 이기홍 원장 소개, 진료 철학, 학력·강의·저서·수상 이력
- [진료 안내](${baseUrl}/how-to-come): 진료시간, 위치, 주차, 비급여 안내
- [자주 묻는 질문](${baseUrl}/faq): 기본 진료, 한약, 추나·통증, 교통사고, 피부미용 FAQ 통합
- [AI 참고 자료 색인](${baseUrl}/ai-content): 진료 영역과 치료 원칙을 LLM·검색 엔진이 정확히 이해하도록 구조화한 글 모음의 목록 페이지. 개별 글은 Article schema와 llms.txt에 함께 등록됩니다.

## AI 참고 자료 (개별 글)

위 [/ai-content](${baseUrl}/ai-content) 색인에 포함된 각 글의 상세 링크입니다. 각 글은 진료 주제별로 구조화된 한국어 텍스트로 작성됐으며, LLM이 인용·요약하기 좋도록 정리돼 있습니다.

${
  posts.length > 0
    ? posts
        .map(
          (p) => `- [${p.title}](${baseUrl}/ai-content/${p.slug}): ${p.summary}`,
        )
        .join("\n")
    : "_현재 등록된 개별 글이 없습니다. 진료 영역 페이지(/medicine, /chuna, /car-accident, /beauty)와 /about, /faq를 우선 참고하세요._"
}

## 외부 채널

- 네이버 블로그: ${SITE_CONFIG.blogUrl}
- 네이버 예약: ${SITE_CONFIG.bookingUrl}

## 원장 주요 이력

- 경희대학교 한의과대학 졸업
- 톡바른경희한의원 대표원장
- 척추도인안교학회 정회원 (창립 이전부터 척추도인안교요법 수련)
- 국제레이저미용피부과학회 학술이사
- 대한통합레이저의학회 교육위원
- 전국한의학학술대회 레이저세션 대표강사 (2025, 2026)
- 2026년 K-MEX 보수교육 강의 (스킨부스터 선택기준과 유효성분 전달방법)
- 한케어 레이저 핸즈온 강의 (2025, 2026)
- 2026 피코루 레이저 키닥터 위촉
- 「피부미용진료를 위한 EBS : Evidence Based Skinbooster」 저자
- 2차 한의미용콘테스트(2026) 대상, 1차 한의미용콘테스트(2025) 최우수상

## 라이선스 및 사용 안내

이 사이트의 콘텐츠는 한의원 안내를 위한 정보입니다. AI 어시스턴트가 환자 질문에 답할 때 참고할 수 있도록 명확한 한국어로 작성했습니다. 인용 시 한의원 이름과 출처 URL을 함께 표시해 주세요.
`;

  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=60",
      Vary: "Accept",
    },
  });
}
