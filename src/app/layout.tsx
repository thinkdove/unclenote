import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://unclenote.com"),
  title: {
    default: "삼촌노트 (Uncle Note) - 읽을거리와 생활 계산 도구",
    template: "%s | 삼촌노트 (Uncle Note)",
  },
  description: "생활 속 궁금한 주제를 읽기 쉽게 정리한 정보 글과 일상에 유용한 계산 도구를 제공합니다.",
  keywords: ["삼촌노트", "Uncle Note", "UncleNote", "연봉 실수령액 계산기", "부가세 계산기", "세무 계산기", "생활 가이드"],
  icons: {
    icon: [
      { url: "/favicon.ico?v=share-avatar", sizes: "any" },
      { url: "/icon.png?v=share-avatar", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png?v=share-avatar", sizes: "180x180", type: "image/png" },
    ],
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#292520]">본문으로 건너뛰기</a>

        {/* Floating Glass Navigation (Responsive Navbar) */}
        <Navbar />

        {/* 메인 콘텐츠 (여백 대폭 확보) */}
        <main id="main-content" tabIndex={-1} className="flex-1 w-full mx-auto px-4 sm:px-6 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 max-w-6xl">
          {children}
        </main>

        <footer className="site-footer">
          <div className="site-footer-inner">
            <div className="site-footer-main">
              <div className="site-footer-brand">
                <Link href="/" className="site-footer-logo" aria-label="삼촌노트 홈">
                  <Image src="/images/brand-avatar.png" alt="" width={32} height={32} />
                  <span>삼촌노트</span>
                </Link>
                <p>읽기 쉬운 정보 글과<br className="hidden sm:block" /> 유용한 생활 도구를 모았습니다.</p>
              </div>
              <nav className="site-footer-nav" aria-label="하단 메뉴">
                <div className="site-footer-nav-group">
                  <p>둘러보기</p>
                  <Link href="/guide">읽을거리</Link>
                  <Link href="/">계산 도구</Link>
                </div>
                <div className="site-footer-nav-group">
                  <p>사이트 안내</p>
                  <Link href="/about">소개 및 문의</Link>
                  <Link href="/privacy">개인정보처리방침</Link>
                </div>
              </nav>
            </div>
            <div className="site-footer-bottom">© 2026 삼촌노트 · Uncle Note</div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
