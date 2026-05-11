"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "대시보드", icon: "dashboard", exact: true },
  { href: "/admin/posts", label: "AI 게시판", icon: "article" },
  { href: "/admin/settings", label: "사이트 설정", icon: "settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname?.startsWith(`${item.href}/`);
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-neutral-200 min-h-screen flex flex-col">
      <div className="px-6 py-8 border-b border-neutral-100">
        <p className="text-xs font-bold text-primary tracking-widest uppercase mb-1">
          Admin
        </p>
        <h1 className="text-lg font-bold text-neutral-900 leading-tight">
          톡바른경희한의원
          <br />
          관리자
        </h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary-surface text-primary"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-neutral-100 space-y-1">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-neutral-500 hover:text-primary hover:bg-neutral-50 transition-colors"
        >
          <span className="material-symbols-outlined text-base">launch</span>
          공개 사이트 보기
        </Link>
        <Link
          href="/ai-content"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-neutral-500 hover:text-primary hover:bg-neutral-50 transition-colors"
        >
          <span className="material-symbols-outlined text-base">menu_book</span>
          AI 게시판 보기
        </Link>
      </div>
    </aside>
  );
}
