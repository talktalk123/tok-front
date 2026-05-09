import type { Metadata } from "next";
import { Noto_Sans_KR, Lexend } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "톡바른경희한의원 본점 | 경기광주 탄벌동 한의원",
  description:
    "경기광주 톡바른경희한의원 본점은 한약, 추나·통증치료, 교통사고 자동차보험 진료, 피부미용을 환자 상태에 맞춰 설명하고 치료 방향을 정합니다.",
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
      </head>
      <body
        className={`${notoSansKR.variable} ${lexend.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
