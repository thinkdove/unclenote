import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from '@iconify/react';
import Script from "next/script";
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
      <body className="antialiased bg-[#fdfdfd] text-[#111111] min-h-screen flex flex-col font-['Pretendard'] break-keep selection:bg-blue-100 selection:text-blue-900 transition-colors duration-500">

        {/* Floating Glass Navigation (Supanova Style) */}
        <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-6 pointer-events-none flex justify-center">
          <header className="pointer-events-auto bg-white/70 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between w-full max-w-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl group-hover:scale-110 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom">
                <Icon icon="solar:lightbulb-bold-duotone" style={{ color: '#2563eb' }} />
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors duration-500">
                  삼촌생각
                </span>
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <nav className="hidden sm:flex items-center gap-8 text-[15px] font-semibold text-zinc-500">
              <Link href="/" className="hover:text-zinc-900 transition-colors duration-300">홈</Link>
              <Link href="/vat-calculator" className="hover:text-zinc-900 transition-colors duration-300">도구</Link>
              <span className="text-zinc-300 cursor-not-allowed">가이드</span>
            </nav>
            
            {/* Mobile Menu Icon */}
            <button className="sm:hidden p-1 text-zinc-600 flex items-center justify-center">
              <Icon icon="solar:hamburger-menu-linear" width="24" height="24" />
            </button>
          </header>
        </div>

        {/* 메인 콘텐츠 (여백 대폭 확보) */}
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 pt-32 pb-24 md:py-40 max-w-5xl">
          {children}
        </main>

        {/* 하단 푸터 (Minimalist Editorial) */}
        <footer className="bg-white py-16 md:py-24 border-t border-black/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
            <div className="text-center md:text-left">
              <p className="font-extrabold text-zinc-900 text-xl mb-2 flex items-center justify-center md:justify-start gap-2">
                <Icon icon="solar:lightbulb-bold-duotone" style={{ color: '#2563eb' }} />
                <span>삼촌생각</span>
              </p>
              <p className="text-[15px] text-zinc-500 font-medium">당신의 복잡한 셈을 1초 만에 해결해 드립니다.</p>
            </div>
            <div className="flex gap-6 text-[15px] font-semibold text-zinc-400">
              <Link href="#" className="hover:text-zinc-900 transition-colors duration-300">이용약관</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors duration-300">개인정보처리방침</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors duration-300">문의하기</Link>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-black/5 text-center md:text-left text-sm text-zinc-400 font-medium tracking-wide">
            © 2026 Uncle Note. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}