import type { Metadata } from "next";
import { Noto_Sans_KR, Lexend } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const NAVER_VERIFICATION = process.env.NEXT_PUBLIC_NAVER_VERIFICATION;
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | 경기광주 탄벌동 한의원`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "톡바른경희한의원",
    "경기광주 한의원",
    "탄벌동 한의원",
    "광주시 한의원",
    "한약",
    "추나",
    "교통사고 한의원",
    "자동차보험 진료",
    "피부미용 한의원",
    "스킨부스터",
    "이기홍 원장",
  ],
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | 경기광주 탄벌동 한의원`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    locale: "ko_KR",
  },
  ...(NAVER_VERIFICATION || GOOGLE_VERIFICATION
    ? {
        verification: {
          ...(GOOGLE_VERIFICATION && { google: GOOGLE_VERIFICATION }),
          ...(NAVER_VERIFICATION && {
            other: { "naver-site-verification": NAVER_VERIFICATION },
          }),
        },
      }
    : {}),
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_CONFIG.url}/#organization`,
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address.streetAddress,
    addressLocality: SITE_CONFIG.address.addressLocality,
    addressRegion: SITE_CONFIG.address.addressRegion,
    addressCountry: SITE_CONFIG.address.addressCountry,
  },
  founder: {
    "@type": "Person",
    name: SITE_CONFIG.ownerName,
  },
  taxID: SITE_CONFIG.businessNumber,
  medicalSpecialty: [
    "한약 진료",
    "추나요법",
    "침·약침 치료",
    "체외충격파",
    "피부미용 진료",
    "교통사고 후유증 진료",
  ],
  sameAs: [SITE_CONFIG.blogUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms.txt"
          title="LLM-friendly site index"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss.xml"
          title={`${SITE_CONFIG.name} RSS`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body
        className={`${notoSansKR.variable} ${lexend.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
