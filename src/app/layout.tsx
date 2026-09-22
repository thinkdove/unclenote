import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "삼촌생각 (Uncle Note) - 유용한 계산기 & 생활 가이드",
  description: "삼촌생각(Uncle Note)에서 제공하는 실시간 부가세(VAT) 계산기 및 생활·세무 알짜 가이드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-zinc-50 text-zinc-900 min-h-screen flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* 상단 네비게이션 (GNB) */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200 shadow-sm transition-all">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* 로고 영역 */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl group-hover:scale-110 transition-transform origin-bottom">💡</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-blue-600 group-hover:text-blue-700 transition-colors">
                  삼촌생각
                </span>
                <span className="font-semibold text-xs tracking-wider text-zinc-500 uppercase">
                  Uncle Note
                </span>
              </div>
            </Link>
            
            {/* 메뉴 영역 */}
            <nav className="hidden sm:flex items-center gap-6 text-sm font-semibold text-zinc-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">홈</Link>
              <Link href="/vat-calculator" className="hover:text-blue-600 transition-colors">계산기 도구</Link>
              <span className="text-zinc-400 cursor-not-allowed">알짜 가이드</span>
            </nav>
            
            {/* 모바일 햄버거 아이콘 (장식용) */}
            <button className="sm:hidden p-2 text-zinc-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {children}
        </main>

        {/* 하단 푸터 (Footer) */}
        <footer className="border-t border-zinc-200 bg-white py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-zinc-800 text-lg mb-1">
                삼촌생각 <span className="text-zinc-300 font-normal">|</span> <span className="text-zinc-500 text-base">Uncle Note</span>
              </p>
              <p className="text-sm text-zinc-500">당신의 복잡한 셈을 1초 만에 해결해 드립니다.</p>
            </div>
            <div className="flex gap-4 text-sm font-medium text-zinc-500">
              <Link href="#" className="hover:text-zinc-900 transition-colors">이용약관</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors">개인정보처리방침</Link>
              <Link href="#" className="hover:text-zinc-900 transition-colors">문의하기</Link>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 pt-8 border-t border-zinc-100 text-center md:text-left text-xs text-zinc-400">
            © 2026 삼촌생각 (Uncle Note). All rights reserved. 본 사이트의 모든 계산기는 참고용이며, 법적 효력을 갖지 않습니다.
          </div>
        </footer>
      </body>
    </html>
  );
}