import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from '@iconify/react';
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://unclenote.com"),
  title: {
    default: "삼촌생각 (Uncle Note) - 유용한 계산기 & 생활 가이드",
    template: "%s | 삼촌생각 (Uncle Note)",
  },
  description: "가장 자주 쓰지만 매번 헷갈리는 금융, 세무 계산과 알짜 정보를 삼촌이 친절하고 정확하게 알려드립니다.",
  keywords: ["삼촌생각", "Uncle Note", "연봉 실수령액 계산기", "부가세 계산기", "세무 계산기", "생활 가이드"],
  alternates: {
    canonical: "https://unclenote.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "삼촌생각 (Uncle Note) - 유용한 계산기 & 생활 가이드",
    description: "가장 자주 쓰지만 매번 헷갈리는 금융, 세무 계산과 알짜 정보를 삼촌이 친절하고 정확하게 알려드립니다.",
    url: "https://unclenote.com",
    siteName: "삼촌생각 (Uncle Note)",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "yVyexXOTmwcocBDoRj3gI9-DIZyHI4ESF_R8prYqODE",
    other: {
      "naver-site-verification": "1947aa7320cad4858c04c051c1dd8bc8554e2fb2",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard Font */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css" />
      </head>
      <body className="antialiased bg-[#fdfbf7] text-[#292520] min-h-screen flex flex-col font-['Pretendard'] break-keep selection:bg-[#c55232]/10 selection:text-[#a74126] transition-colors duration-500">

        {/* Floating Glass Navigation (Responsive Navbar) */}
        <Navbar />

        {/* 메인 콘텐츠 (여백 대폭 확보) */}
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 pt-32 pb-24 md:py-40 max-w-5xl">
          {children}
        </main>

        {/* 하단 푸터 (Warm Minimalist Editorial) */}
        <footer className="bg-[#f4efe8]/60 py-16 md:py-24 border-t border-zinc-200/70">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
            <div className="text-center md:text-left">
              <p className="font-extrabold text-zinc-900 text-xl mb-2 flex items-center justify-center md:justify-start gap-2">
                <Icon icon="solar:lightbulb-bold-duotone" style={{ color: '#c55232' }} />
                <span>삼촌생각</span>
              </p>
              <p className="text-[15px] text-zinc-600 font-medium">당신의 복잡한 셈을 1초 만에 해결해 드립니다.</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-[15px] font-semibold text-zinc-500">
              <Link href="/about" className="hover:text-zinc-900 transition-colors duration-300">소개 및 문의</Link>
              <Link href="/terms" className="hover:text-zinc-900 transition-colors duration-300">이용약관</Link>
              <Link href="/privacy" className="hover:text-zinc-900 transition-colors duration-300">개인정보처리방침</Link>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-zinc-200/70 text-center md:text-left text-sm text-zinc-400 font-medium tracking-wide">
            © 2026 Uncle Note. All rights reserved.
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}