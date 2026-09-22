import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "삼촌생각 (Uncle Note) - 유용한 계산기 & 생활 가이드",
  description: "실시간 부가세(VAT) 계산기, 금융·세무 유틸리티와 알기 쉬운 생활 정보 가이드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-zinc-50 text-zinc-900 min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <span className="font-extrabold text-xl tracking-tight text-blue-600">
                삼촌생각 <span className="text-zinc-500 font-normal text-sm ml-1">Uncle Note</span>
              </span>
            </div>
            <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600">
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                ● Vercel 배포 테스트
              </span>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        <footer className="border-t border-zinc-200 bg-white py-8 text-center text-xs text-zinc-400">
          <p>© 2026 삼촌생각 (Uncle Note). All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}