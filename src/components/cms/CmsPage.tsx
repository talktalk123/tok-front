/**
 * CMS 페이지 셸 — 공개 라우트에서 블록을 렌더할 때 사용.
 * Navbar(메뉴는 CMS 대상 아님) + 블록 본문 + Footer.
 */
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import BlockRenderer from "@/components/cms/BlockRenderer";
import type { CmsPage } from "@/lib/cms/blocks";

export default function CmsPageShell({
  page,
  activePage,
}: {
  page: CmsPage;
  activePage: string;
}) {
  return (
    <>
      <Navbar activePage={activePage} />
      <main>
        <BlockRenderer blocks={page.blocks} />
      </main>
      <SiteFooter />
    </>
  );
}
