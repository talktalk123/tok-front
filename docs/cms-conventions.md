# CMS 규약 (블록 기반 콘텐츠 관리)

톡바른경희한의원 본점 사이트의 **공개 콘텐츠를 admin에서 관리**하기 위한 규약 문서.
"메뉴(네비게이션)를 제외한 모든 페이지 콘텐츠"를 DB(`pages` / `page_contents`)에 저장하고,
admin에서 블록 단위로 추가·수정·순서변경·표시토글하며, 공개 페이지는 **서버에서 렌더**한다.

---

## 0. 가장 중요한 규칙 — 크롤링/SEO 안전

> **공개 콘텐츠는 반드시 "서버에서" DB를 조회해 HTML에 담아 보낸다.**

- 공개 페이지는 **Server Component**로 유지한다. `"use client"` 금지.
- 데이터는 `apiFetchServer`(= Next.js `fetch` + ISR 캐시)로 가져온다. → 봇이 받는 초기 HTML에 콘텐츠가 들어있다 (구글봇·네이버 Yeti 모두 JS 실행 없이 읽음).
- **클라이언트 fetch(`apiFetchClient`/`useEffect`)로 공개 콘텐츠를 그리지 않는다.** 네이버 Yeti는 JS 렌더링이 약해 빈 페이지로 색인될 수 있다. 클라이언트 fetch는 admin 전용.
- 페이지별 메타(title/description/canonical/OG)는 `generateMetadata()`에서 **서버 조회**로 생성한다.
- 존재하지 않는 slug는 `notFound()`로 404를 반환한다 (빈 페이지 인덱싱 방지).
- 새로 CMS화한 라우트는 `sitemap.ts`에도 동적으로 포함한다.

근거/배경: `src/lib/api/server.ts`, `src/lib/ai-posts.ts`(이미 이 패턴으로 동작 중인 `/ai-content`).

---

## 1. 데이터 모델

테이블은 이미 `prisma/schema.prisma` / `prisma/init.sql`에 정의돼 있다.

### `pages` — 페이지 한 개
| 컬럼 | 의미 |
|------|------|
| `page_key` | 라우트 식별자. 프론트 경로와 1:1 (`home`, `about`, `medicine`, `chuna`, `beauty`, `car-accident`, `how-to-come`, `faq`) |
| `page_name` | admin 표시용 한글명 |
| `is_active` | 페이지 노출 여부 |
| `sort_order` | admin 목록 정렬 |
| `theme` | JSON. **페이지 메타(SEO) 보관소** → `{ "seo": { "title": "...", "description": "...", "ogImage": "..." } }` |

### `page_contents` — 블록 한 개
| 컬럼 | 의미 |
|------|------|
| `page_id` | 소속 페이지 FK |
| `content_type` | **블록 타입** (kebab-case, ≤20자). 아래 레지스트리 참조 |
| `data` | JSON. **블록의 모든 콘텐츠**가 여기 들어간다 (타입별 스키마는 §2) |
| `sort_order` | 블록 순서 (0부터) |
| `is_active` | 블록 표시/숨김 |
| `title`/`content`/`image_path` | (레거시 컬럼) 사용하지 않음. 모든 데이터는 `data`에 담는다 |

> 규칙: **블록 콘텐츠는 전부 `data`(JSON)에 담는다.** title/content/image_path 컬럼은 쓰지 않는다.

---

## 2. 블록 타입 레지스트리

블록 타입은 프론트 `src/lib/cms/blocks.ts`에 **단일 소스로 정의**한다.
새 블록을 추가하려면: ① 타입/스키마 추가 → ② 렌더러 컴포넌트 추가 → ③ admin 에디터 폼 추가 → ④ 백엔드 `create-block.dto.ts`의 허용 목록 추가. (§5 레시피)

| `content_type` | 용도 | `data` 핵심 필드 |
|----------------|------|------------------|
| `hero` | 페이지 상단 히어로 | `eyebrow?`, `title`, `subtitle?`, `bg`, `buttons[]` |
| `rich-text` | 제목 + 본문(prose) | `eyebrow?`, `heading?`, `html` |
| `card-grid` | 카드 그리드(서비스/특징) | `eyebrow?`, `heading?`, `intro?`, `columns`, `cards[]` |
| `two-column` | 이미지+텍스트 비대칭 | `eyebrow?`, `heading`, `paragraphs[]`, `image`, `imageSide`, `list?`, `buttons?` |
| `process-steps` | 단계 안내 | `eyebrow?`, `heading`, `intro?`, `steps[]` |
| `faq` | 아코디언 Q&A | `eyebrow?`, `heading?`, `items[]` |
| `cta` | 강조 배너(전화/예약 등) | `heading`, `text?`, `buttons[]`, `theme` |

`buttons[]` 항목: `{ label, href, style: "primary" | "outline" }`
`bg`: `{ type: "color" | "image", value }` (color=Tailwind/hex, image=경로)

타입 정의의 정확한 형태는 `src/lib/cms/blocks.ts`가 기준이다 (이 표는 요약).

---

## 3. API 계약 (백엔드 NestJS, 글로벌 프리픽스 `/api`)

| 메서드 | 경로 | 인증 | 용도 |
|--------|------|------|------|
| `GET` | `/api/content/public/pages/:slug` | ❌ 공개 | **공개 렌더용**. `is_active` 페이지 + `is_active` 블록만, `sort_order` 순 |
| `GET` | `/api/content/pages` | ✅ JWT | admin 페이지 목록 |
| `GET` | `/api/content/pages/:slug` | ✅ JWT | admin 편집용. **모든** 블록(숨김 포함) |
| `PUT` | `/api/content/pages/:slug` | ✅ JWT | **일괄 저장**. 블록 전체 교체 + 페이지 메타(theme/seo) 갱신 |
| `POST/PATCH/DELETE` | `/api/content/...blocks...` | ✅ JWT | (보조) 블록 단위 CRUD/순서/토글 |

- **공개 읽기 엔드포인트가 핵심**: SSR은 토큰이 없으므로 이게 없으면 401 → 빈 페이지. 반드시 별도 공개 경로로 둔다.
- **일괄 저장(PUT)** 이 에디터의 주 경로다: "불러오기 → 초안 수정 → 미리보기 → 저장(PUT)". 블록 단위 API보다 단순하고 원자적이다.

---

## 4. 미리보기(Preview) 규칙

> **미리보기는 100% 클라이언트, DB·엔드포인트·추가 테이블 불필요.**

- admin 에디터는 블록 목록을 **React 초안 상태(draft)** 로 들고 있는다.
- "미리보기"는 공개 페이지가 쓰는 **동일한 `<BlockRenderer>`** 에 초안 상태를 그대로 먹여 렌더한다.
- 저장(PUT) 전까지 DB에는 아무 변화 없음 → 저장 전 결과를 그대로 확인 가능.
- 레이아웃: 좌측 폼 / 우측 라이브 프리뷰 분할(split view) 또는 프리뷰 토글.

---

## 5. CMS 페이지/블록 추가 레시피

### 새 블록 타입 추가
1. `src/lib/cms/blocks.ts` — 타입(TS) + 기본값(default data) + 메타(label/icon) 추가
2. `src/components/cms/blocks/<Type>.tsx` — 렌더러 (서버 호환, `"use client"` 금지)
3. `src/components/cms/BlockRenderer.tsx` — switch에 매핑 추가
4. `src/components/admin/blocks/<Type>Form.tsx` — admin 편집 폼
5. 백엔드 `dto/create-block.dto.ts`·`save-page.dto.ts` 허용 타입 목록에 추가

### 기존 하드코딩 페이지를 CMS로 전환 (안전 절차)
1. `pages`에 해당 `page_key` 행 seed (SQL) + 현재 콘텐츠를 블록 `data`로 seed
2. 공개 페이지를 Server Component로 전환:
   ```tsx
   const page = await getCmsPage("about");
   if (!page) return <FallbackAbout />;   // DB 비었으면 기존 JSX 폴백 → 사이트 안 비게
   return <CmsPage page={page} />;
   ```
3. `generateMetadata`를 `page.theme.seo` 기반으로
4. 빌드/프리뷰로 확인 후 배포
5. **한 번에 한 페이지씩.** DB가 비어있는 라우트를 배포하지 않는다.

---

## 6. 캐시 무효화(Revalidation) 계약

- 서버 로더는 `apiFetchServer(..., { tags: ["page:<slug>"] })`로 태그를 단다.
- admin이 저장(PUT 성공) 후 프론트 `POST /api/revalidate?tag=page:<slug>`를 호출 → `revalidateTag`로 즉시 갱신.
- 이게 없으면 저장해도 ISR 캐시(기본 30s) 동안 옛 HTML이 나간다.

---

## 7. 진행 현황 (마이그레이션 체크리스트)

- [ ] 백엔드: ContentModule 등록 + 공개 읽기 + 일괄 저장 + `page_contents.updated_at`
- [ ] SQL: `pages` seed + `ALTER`
- [ ] 프론트 기반: 블록 타입/렌더러/서버 로더/revalidate
- [ ] admin: 페이지 목록 + 에디터(미리보기) + 사이드바
- [ ] 페이지 전환: about → home → medicine → chuna → beauty → car-accident → how-to-come → faq
- [ ] 각 전환 페이지 `sitemap.ts`/메타 반영
