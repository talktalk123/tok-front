export interface PostTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  /** 전체 마스터 템플릿 (프론트매터 + 본문). 워커가 이 한 덩어리를 입력창에 넣음. */
  master: string;
  /** 본문(HTML)만 — AI 프롬프트에 본문 골격으로 전달. */
  htmlBody: string;
  /** 카테고리별 추가 안전 규칙. */
  extraRules?: string[];
}

const COMMON_RULES = [
  "h1 사용 금지 (글 제목은 자동으로 h1 처리됨).",
  "섹션은 <h2>, 하위 섹션은 <h3>로 구분.",
  "강조는 <strong>, 인용/주의는 <blockquote>.",
  "목록은 <ul>/<ol>/<li>, 일반 단락은 <p>.",
  "외부 링크는 <a href=\"https://...\">로.",
  "코드블럭/이미지/표는 사용 금지.",
  "마크다운 문법(#, **, - 등) 일체 금지. HTML만 사용.",
  "출력은 마스터 템플릿 형식 그대로(프론트매터 포함). 코드 블록·인사말·설명 금지.",
];

const FORBIDDEN_PHRASES = [
  '"반드시", "확실히", "완벽한", "100%", "최고의", "가장 효과적" 같은 단정·과장 표현 금지.',
  '효과 단정형 ("○○에 효과가 있습니다") → 가능형으로 ("○○에 도움이 될 수 있습니다").',
  '"치료됩니다" → "치료를 도울 수 있습니다", "관리에 도움이 됩니다" 등으로.',
  '"다른 한의원과 다르게", "타 의료기관 대비" 같은 비교 광고 표현 금지.',
];

const FRONTMATTER_GUIDE = `[프론트매터 작성 규칙]
- 항상 \`---\`로 시작하고 \`---\`로 닫음.
- 각 줄은 \`키: 값\` 형식.
- title: 글 제목 (필수). h1으로 자동 처리됨.
- slug: URL용. 비워두면 제목에서 자동 생성. 영문 소문자/숫자/하이픈/한글만.
- summary: 1~2 문장 요약 (검색·AI 발췌용). 비워두면 본문 첫 단락에서 자동.
- category: 글 분류 (한 단어).
- tags: 쉼표로 구분.
- publishedAt: YYYY-MM-DD. 비워두면 오늘.
- language: ko-KR (기본).`;

function makeMaster(opts: {
  category: string;
  exampleTitle: string;
  exampleTags: string;
  body: string;
}): string {
  return `---
title: ${opts.exampleTitle}
slug:
summary:
category: ${opts.category}
tags: ${opts.exampleTags}
publishedAt:
language: ko-KR
---
${opts.body}`;
}

const BODY_CLINIC_INFO = `<h2>개요</h2>
<p>이 글이 다루는 주제를 환자 시선에서 한 단락으로 소개합니다.</p>

<h2>핵심 항목</h2>
<ul>
  <li>핵심 1</li>
  <li>핵심 2</li>
  <li>핵심 3</li>
</ul>

<h2>세부 안내</h2>
<h3>하위 항목 A</h3>
<p>설명 본문...</p>

<h3>하위 항목 B</h3>
<p>설명 본문...</p>

<blockquote>꼭 알아두실 점이 있다면 여기에 강조합니다.</blockquote>

<h2>마무리</h2>
<p>요약 또는 다음 단계 안내(예약·전화 문의).</p>
`;

const BODY_TREATMENT_DETAIL = `<h2>치료 개요</h2>
<p>이 치료가 어떤 환자 상태에 적용되는지 한 단락으로 설명합니다.</p>

<h2>이런 경우에 고려할 수 있습니다</h2>
<ul>
  <li>증상 1</li>
  <li>증상 2</li>
  <li>증상 3</li>
</ul>

<h2>치료 흐름</h2>
<ol>
  <li>1단계: 진찰과 상담</li>
  <li>2단계: 치료 방향 결정</li>
  <li>3단계: 치료 진행</li>
  <li>4단계: 경과 확인</li>
</ol>

<h2>치료 후 안내</h2>
<p>치료 후 일상에서 주의할 점, 회복 흐름을 안내합니다.</p>

<blockquote>응급평가가 필요한 경우(예: 심한 두통, 의식 저하, 팔다리 힘 빠짐, 심한 저림 등)에는 즉시 의료기관에서 평가받으셔야 합니다.</blockquote>

<h2>자주 묻는 점</h2>
<h3>치료 횟수는 어떻게 정하나요?</h3>
<p>증상 기간, 몸 상태, 치료 목표에 따라 달라질 수 있습니다.</p>
`;

const BODY_FAQ = `<h2>Q. 첫 번째 질문은 무엇인가요?</h2>
<p>답변 본문 한~두 단락. 환자 시선에서 친절하게 설명합니다.</p>

<h2>Q. 두 번째 질문은 무엇인가요?</h2>
<p>답변 본문.</p>

<h2>Q. 세 번째 질문은 무엇인가요?</h2>
<p>답변 본문.</p>

<h2>Q. 네 번째 질문은 무엇인가요?</h2>
<p>답변 본문.</p>

<h2>Q. 다섯 번째 질문은 무엇인가요?</h2>
<p>답변 본문.</p>
`;

const BODY_NEWS = `<h2>안내</h2>
<p>이번 소식의 배경과 요지를 한 단락으로 설명합니다.</p>

<h2>변경/시행 사항</h2>
<ul>
  <li>변경 1: 무엇이 어떻게 바뀝니다.</li>
  <li>변경 2: 시행 일자와 적용 범위.</li>
  <li>변경 3: 기존 환자분들이 알아두실 점.</li>
</ul>

<h2>적용 일정</h2>
<p>적용 시작일과 종료일(있는 경우)을 명시합니다.</p>

<h2>문의</h2>
<p>전화 031-767-0075 또는 네이버 예약을 통해 문의하실 수 있습니다.</p>
`;

const BODY_REVIEW = `<h2>방문 배경</h2>
<p>환자분이 어떤 고민으로 내원하셨는지를 환자 시선에서 한 단락으로 설명합니다. 개인 식별 정보는 적지 않습니다.</p>

<h2>진료에서 확인한 부분</h2>
<ul>
  <li>피부 상태 / 통증 부위 등 진찰에서 확인한 항목</li>
  <li>생활 패턴, 기존 치료 이력</li>
  <li>회복력, 다운타임 가능성</li>
</ul>

<h2>진행한 진료</h2>
<p>어떤 시술 또는 치료를 어떤 기준으로 선택했는지 설명합니다. 시술 효과는 가능형으로 기술합니다.</p>

<h2>경과와 안내</h2>
<p>치료 이후 어떤 변화를 함께 확인했는지, 다음 진료 방향을 어떻게 정했는지 적습니다.</p>

<blockquote>본 글은 한 환자분의 진료 사례 안내이며, 동일한 결과를 보장하지 않습니다. 치료 적합도와 결과는 개인 상태에 따라 달라질 수 있습니다.</blockquote>

<h2>비슷한 고민이 있다면</h2>
<p>전화 031-767-0075 또는 네이버 예약으로 상담하실 수 있습니다.</p>
`;

const BODY_CASE = `<h2>사례 요약</h2>
<p>나이대·성별·주요 호소를 익명화해 1~2줄로 요약합니다.</p>

<h2>호소와 진찰</h2>
<p>환자분이 어떤 불편을 느끼셨고, 진찰에서 무엇을 확인했는지 정리합니다.</p>

<h3>주요 증상</h3>
<ul>
  <li>증상 1</li>
  <li>증상 2</li>
</ul>

<h3>진찰 소견</h3>
<ul>
  <li>맥진/설진/체형/근육 긴장 등 항목별 소견</li>
</ul>

<h2>치료 계획</h2>
<p>어떤 우선순위로 어떤 치료를 조합했는지 설명합니다.</p>

<h2>경과 관찰</h2>
<p>치료 회차에 따라 어떤 변화를 함께 확인했는지 정리합니다.</p>

<h2>임상적 시사점</h2>
<p>이 사례에서 일반적으로 참고할 수 있는 부분을 정리합니다. 일반화는 신중하게.</p>

<blockquote>본 사례는 익명화된 진료 기록이며, 동일한 증상이라도 개별 진찰 후 치료 방향이 달라질 수 있습니다.</blockquote>
`;

const BODY_LECTURE = `<h2>강의 개요</h2>
<p>강의명, 일시, 장소, 주최를 한 단락으로 소개합니다.</p>

<h2>다룬 주제</h2>
<ul>
  <li>주제 1</li>
  <li>주제 2</li>
  <li>주제 3</li>
</ul>

<h2>핵심 내용</h2>
<h3>주제 A</h3>
<p>강의에서 정리한 핵심 메시지를 적습니다.</p>

<h3>주제 B</h3>
<p>강의에서 정리한 핵심 메시지를 적습니다.</p>

<h2>현장 분위기·질의응답</h2>
<p>현장에서 오갔던 질의응답 또는 토론 내용 중 일반화 가능한 부분을 정리합니다.</p>

<h2>마무리</h2>
<p>강의 후 추가로 정리할 점, 다음 강의/글 안내를 적습니다.</p>
`;

export const POST_TEMPLATES: PostTemplate[] = [
  {
    id: "clinic-info-basic",
    name: "한의원 정보 (기본)",
    category: "clinic-info",
    description: "한의원의 일반 안내·소개·운영 정보를 정리할 때 사용합니다.",
    htmlBody: BODY_CLINIC_INFO,
    master: makeMaster({
      category: "clinic-info",
      exampleTitle: "글 제목을 입력하세요",
      exampleTags: "한의원, 안내",
      body: BODY_CLINIC_INFO,
    }),
  },
  {
    id: "treatment-detail-basic",
    name: "진료 상세 (기본)",
    category: "treatment-detail",
    description:
      "특정 진료/치료 영역의 적용 대상·흐름·주의사항을 설명할 때 사용합니다.",
    htmlBody: BODY_TREATMENT_DETAIL,
    master: makeMaster({
      category: "treatment-detail",
      exampleTitle: "글 제목을 입력하세요",
      exampleTags: "진료, 치료흐름",
      body: BODY_TREATMENT_DETAIL,
    }),
    extraRules: [
      "치료 효과는 항상 가능형으로 표현 (예: \"도움이 될 수 있습니다\").",
      "응급 상황 안내(blockquote)는 반드시 포함할 것.",
    ],
  },
  {
    id: "faq-basic",
    name: "FAQ (5문항)",
    category: "faq",
    description: "자주 묻는 질문 5개 형태로 정리할 때 사용합니다.",
    htmlBody: BODY_FAQ,
    master: makeMaster({
      category: "faq",
      exampleTitle: "자주 묻는 질문 — 주제",
      exampleTags: "faq, 자주묻는질문",
      body: BODY_FAQ,
    }),
    extraRules: [
      "각 질문(h2)은 \"Q. \"로 시작.",
      "답변은 1~2 단락. 너무 길지 않게.",
    ],
  },
  {
    id: "news-basic",
    name: "소식·공지",
    category: "news",
    description: "운영 변경, 휴진 안내, 신규 도입 등 소식을 알릴 때 사용합니다.",
    htmlBody: BODY_NEWS,
    master: makeMaster({
      category: "news",
      exampleTitle: "공지·안내 제목",
      exampleTags: "공지, 안내",
      body: BODY_NEWS,
    }),
    extraRules: ["적용 일자/범위는 구체적으로. 모호한 표현 금지."],
  },
  {
    id: "review-basic",
    name: "시술 후기 (1인 사례)",
    category: "review",
    description:
      "한 환자분의 진료 사례를 익명화해 안내할 때 사용합니다. 동일 결과 보장 표현은 절대 금지.",
    htmlBody: BODY_REVIEW,
    master: makeMaster({
      category: "review",
      exampleTitle: "시술 후기 — 주제",
      exampleTags: "후기, 사례",
      body: BODY_REVIEW,
    }),
    extraRules: [
      "환자 식별 정보(이름·생년월일·연락처·구체 직장 등) 절대 금지.",
      "\"동일한 효과를 봅니다\", \"누구에게나 효과적\" 같은 일반화 금지.",
      "면책 blockquote(\"본 글은... 동일한 결과를 보장하지 않습니다.\")는 반드시 포함.",
      "전후 사진/수치 비교 표현 금지.",
    ],
  },
  {
    id: "case-basic",
    name: "임상 사례 (기록)",
    category: "case",
    description:
      "익명화된 임상 사례를 학술적 톤으로 정리할 때 사용합니다. 시술 후기보다 진료 기록 성격.",
    htmlBody: BODY_CASE,
    master: makeMaster({
      category: "case",
      exampleTitle: "임상 사례 — 주제",
      exampleTags: "임상사례, 진료기록",
      body: BODY_CASE,
    }),
    extraRules: [
      "환자 식별 정보 절대 금지. 나이는 \"30대\" 같은 범위로.",
      "\"이 치료가 ○○에 효과적이다\" 같은 일반 단정 금지. \"이 사례에서는 ○○ 변화가 관찰되었습니다\" 정도로.",
      "면책 blockquote 반드시 포함.",
    ],
  },
  {
    id: "lecture-basic",
    name: "강의 후기",
    category: "lecture",
    description: "원장이 진행/참석한 강의를 정리해 공유할 때 사용합니다.",
    htmlBody: BODY_LECTURE,
    master: makeMaster({
      category: "lecture",
      exampleTitle: "강의 후기 — 강의명",
      exampleTags: "강의, 학술",
      body: BODY_LECTURE,
    }),
    extraRules: [
      "강의 슬라이드/자료 무단 인용 금지.",
      "참석자 개인 정보 노출 금지.",
    ],
  },
];

export function buildAiPrompt(
  template: PostTemplate,
  topic = "___여기에 주제 입력___",
): string {
  const ruleLines = COMMON_RULES.map((r) => `- ${r}`).join("\n");
  const forbiddenLines = FORBIDDEN_PHRASES.map((r) => `- ${r}`).join("\n");
  const extraLines =
    template.extraRules && template.extraRules.length > 0
      ? template.extraRules.map((r) => `- ${r}`).join("\n")
      : "";

  return `다음 마스터 템플릿(프론트매터 + HTML 본문)을 채워주세요. 구조는 그대로 유지합니다.

[주제]: ${topic}
[대상]: 톡바른경희한의원 본점 환자
[톤]: 차분하고 설명적. 가능형 표현 위주, 단정·과장 금지.

${FRONTMATTER_GUIDE}

[일반 규칙]
${ruleLines}

[금지 표현]
${forbiddenLines}
${
  extraLines
    ? `\n[이 템플릿 추가 규칙]\n${extraLines}\n`
    : ""
}
[마스터 템플릿 — 그대로 채워서 출력]
${template.master}`;
}

export const TEMPLATE_CATEGORIES: Array<{ value: string; label: string }> = [
  { value: "clinic-info", label: "한의원 정보" },
  { value: "treatment-detail", label: "진료 상세" },
  { value: "faq", label: "FAQ" },
  { value: "news", label: "소식·공지" },
  { value: "review", label: "시술 후기" },
  { value: "case", label: "임상 사례" },
  { value: "lecture", label: "강의 후기" },
];
