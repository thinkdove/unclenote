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
      { url: "/favicon.ico?v=mascot-square-bulb", sizes: "any" },
      { url: "/icon.png?v=mascot-square-bulb", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png?v=mascot-square-bulb", sizes: "180x180", type: "image/png" },
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
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Pretendard Font */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css" />
      </head>
      <body suppressHydrationWarning className="antialiased bg-[#fdfbf7] text-[#292520] min-h-screen flex flex-col font-['Pretendard'] break-keep selection:bg-[#c55232]/10 selection:text-[#a74126] transition-colors duration-500">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#292520]">본문으로 건너뛰기</a>

        {/* Floating Glass Navigation (Responsive Navbar) */}
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="w-full border-t border-[#e8e1d8] bg-[#fbf8f3] mt-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#746d65]">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span className="font-extrabold text-[#292520]">삼촌노트 (Uncle Note)</span>
              <span>생활 속 궁금한 주제를 읽기 쉽게 정리한 정보 글과 일상에 유용한 계산 도구</span>
            </div>
            <div className="flex items-center gap-4 font-medium">
              <Link href="/about" className="hover:text-[#c55232] transition-colors">소개</Link>
              <Link href="/privacy" className="hover:text-[#c55232] transition-colors">개인정보처리방침</Link>
              <Link href="/terms" className="hover:text-[#c55232] transition-colors">이용약관</Link>
              <a href="https://github.com/thinkdove/unclenote" target="_blank" rel="noopener noreferrer" className="hover:text-[#c55232] transition-colors">GitHub</a>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}
