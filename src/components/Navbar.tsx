"use client";

import Link from "next/link";

const navItems = [
  { label: "메인", href: "/" },
  { label: "톡바른 소개", href: "/about" },
  { label: "한약·보약", href: "/medicine" },
  { label: "추나·통증", href: "/chuna" },
  { label: "교통사고", href: "/car-accident" },
  { label: "피부미용", href: "/beauty" },
  { label: "맞춤 베개", href: "/#pillow" },
  { label: "진료 안내", href: "/how-to-come" },
  { label: "FAQ", href: "/faq" },
];

interface NavbarProps { activePage?: string; variant?: "fixed" | "sticky"; }

export default function Navbar({ activePage, variant = "sticky" }: NavbarProps) {
  const positionClass = variant === "fixed" ? "fixed top-0 w-full" : "sticky top-0";
  return (
    <nav className={positionClass + " tbr-shared-nav z-50 glass-effect border-b border-stone-100"}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="톡바른경희한의원 메인">
          <div className="hidden" aria-hidden="true"><span className="material-icons">medical_services</span></div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-stone-900 leading-none whitespace-nowrap"><span className="text-primary">톡바른</span>경희한의원</span>
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Talk Bareun Kyunghee</span>
          </div>
        </Link>
        <div className="hidden xl:flex items-center gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={activePage === item.href ? "text-base font-bold text-primary whitespace-nowrap" : "text-base font-bold hover:text-primary transition-colors whitespace-nowrap"}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a href="https://booking.naver.com/booking/13/bizes/1171309" target="_blank" rel="noopener noreferrer" className="tbr-booking bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-sm shadow-md whitespace-nowrap">
            <span className="material-icons text-sm">calendar_today</span>빠른 예약하기
          </a>
          <details className="xl:hidden">
            <summary aria-label="전체 메뉴 열기" className="tbr-shared-menu-button flex items-center justify-center w-10 h-10 border border-stone-200 rounded-lg bg-white text-stone-700 cursor-pointer list-none">☰</summary>
            <div className="fixed top-20 left-0 right-0 grid grid-cols-2 gap-x-3 gap-y-1 bg-white border-t border-stone-100 shadow-lg px-5 py-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")} className="py-3 px-2 text-base font-bold text-stone-700 hover:text-primary">
                  {item.label}{item.href === "/#pillow" ? " · 준비중" : ""}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
      <style>{"body .tbr-mobile{display:none!important}body>main>nav.tbr-shared-nav>div>div.hidden>a{font-size:16px!important}.tbr-shared-menu-button::-webkit-details-marker{display:none}@media(max-width:1023px){body>main>nav.tbr-shared-nav>div:first-child{padding-right:12px!important;padding-left:14px!important}}@media(max-width:420px){.tbr-shared-nav .text-2xl{font-size:1.08rem!important}.tbr-shared-nav .tbr-booking{font-size:11px;padding:9px 10px}}"}</style>
    </nav>
  );
}
