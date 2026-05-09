import Link from "next/link";

const navItems = [
  { label: "메인", href: "/" },
  { label: "톡바른 소개", href: "/about" },
  { label: "한약·보약", href: "/medicine" },
  { label: "추나·통증", href: "/chuna" },
  { label: "교통사고", href: "/car-accident" },
  { label: "피부미용", href: "/beauty" },
  { label: "진료 안내", href: "/how-to-come" },
  { label: "FAQ", href: "/faq" },
];

interface NavbarProps {
  activePage?: string;
  variant?: "fixed" | "sticky";
}

export default function Navbar({
  activePage,
  variant = "sticky",
}: NavbarProps) {
  const positionClass =
    variant === "fixed"
      ? "fixed top-0 w-full"
      : "sticky top-0";

  return (
    <nav
      className={`${positionClass} z-50 glass-effect border-b border-stone-100`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
            <span className="material-icons text-white">medical_services</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-stone-900 leading-none">
              <span className="text-primary">톡바른</span>경희한의원
            </span>
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
              Talk Bareun Kyunghee
            </span>
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={
                activePage === item.href
                  ? "text-sm xl:text-base font-bold text-primary whitespace-nowrap"
                  : "text-sm xl:text-base font-bold hover:text-primary transition-colors whitespace-nowrap"
              }
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <a href="https://booking.naver.com/booking/13/bizes/1171309" target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 text-sm shadow-md">
          <span className="material-icons text-sm">calendar_today</span>
          빠른 예약하기
        </a>
      </div>
    </nav>
  );
}
