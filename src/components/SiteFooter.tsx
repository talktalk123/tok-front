import { SITE_CONFIG } from "@/lib/site-config";

export default function SiteFooter() {
  const fullAddress = `${SITE_CONFIG.address.addressRegion} ${SITE_CONFIG.address.addressLocality} ${SITE_CONFIG.address.streetAddress}`;

  return (
    <footer className="bg-white border-t border-neutral-100 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top — quick links + hours + contacts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="text-lg font-bold text-neutral-900 mb-2">
              {SITE_CONFIG.name}
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed mb-4">
              몸 상태를 먼저 살피고,<br />
              치료 방향을 함께 정합니다.
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
              <a
                className="text-neutral-600 hover:text-primary transition-colors font-medium"
                href={SITE_CONFIG.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                네이버 블로그
              </a>
              <span className="text-neutral-300">·</span>
              <a
                className="text-neutral-600 hover:text-primary transition-colors font-medium"
                href={`tel:${SITE_CONFIG.phone}`}
              >
                전화 예약 {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-neutral-900 mb-3">진료시간</div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              평일 09:00~20:00<br />
              토요일 09:00~14:00<br />
              공휴일 09:00~13:00<br />
              일요일 휴진
            </p>
          </div>
          <div>
            <div className="text-sm font-bold text-neutral-900 mb-3">연락처</div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="hover:text-primary"
              >
                {SITE_CONFIG.phone}
              </a>
              <br />
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hover:text-primary"
              >
                {SITE_CONFIG.email}
              </a>
              <br />
              {fullAddress}
            </p>
          </div>
        </div>

        {/* Bottom — business info (의료법·전자상거래법 표시 의무 항목) */}
        <div className="border-t border-neutral-100 pt-8">
          <dl className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-neutral-500 mb-3">
            <div className="inline-flex gap-1.5">
              <dt className="text-neutral-400">상호</dt>
              <dd className="text-neutral-700">{SITE_CONFIG.name}</dd>
            </div>
            <div className="inline-flex gap-1.5">
              <dt className="text-neutral-400">대표</dt>
              <dd className="text-neutral-700">{SITE_CONFIG.ownerName}</dd>
            </div>
            <div className="inline-flex gap-1.5">
              <dt className="text-neutral-400">사업자등록번호</dt>
              <dd className="text-neutral-700">{SITE_CONFIG.businessNumber}</dd>
            </div>
            <div className="inline-flex gap-1.5">
              <dt className="text-neutral-400">주소</dt>
              <dd className="text-neutral-700">{fullAddress}</dd>
            </div>
            <div className="inline-flex gap-1.5">
              <dt className="text-neutral-400">전화</dt>
              <dd className="text-neutral-700">{SITE_CONFIG.phone}</dd>
            </div>
            <div className="inline-flex gap-1.5">
              <dt className="text-neutral-400">메일</dt>
              <dd className="text-neutral-700">{SITE_CONFIG.email}</dd>
            </div>
          </dl>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className="text-neutral-400 text-xs">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
