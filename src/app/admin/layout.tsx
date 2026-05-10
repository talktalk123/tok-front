import type { Metadata } from "next";
import AdminAuthGate from "@/components/admin/AdminAuthGate";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "관리자 | 톡바른경희한의원 본점",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGate>
      <div className="min-h-screen flex bg-neutral-50">
        <AdminSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </AdminAuthGate>
  );
}
