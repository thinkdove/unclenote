import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '광고 배너 테스트',
  robots: { index: false, follow: false },
};

export default function TestBannerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
