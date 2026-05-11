/**
 * FAQ JSON-LD (schema.org FAQPage) 자동 생성 컴포넌트.
 *
 * Google 리치 결과·네이버 발췌·AI 어시스턴트가 Q&A를 정확히 매핑하도록 돕는다.
 * HTML 시각 렌더링과 별개로 검색 엔진용 메타데이터를 같은 페이지에 함께 출력.
 *
 * 사용:
 *   <FAQSchema items={[{ q: "질문?", a: "답변" }, ...]} />
 */

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export default function FAQSchema({ items }: FAQSchemaProps) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
