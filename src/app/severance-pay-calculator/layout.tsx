import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '퇴직금 계산기 | 재직기간과 평균임금',
  description: '입사일, 퇴사일과 퇴직 전 임금을 입력해 예상 퇴직금을 참고용으로 계산합니다.',
  alternates: { canonical: 'https://unclenote.com/severance-pay-calculator' },
  openGraph: {
    siteName: '삼촌노트',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '퇴직금 계산기 | 삼촌노트',
    description: '재직기간과 퇴직 전 평균임금을 바탕으로 예상 퇴직금을 계산합니다.',
    url: 'https://unclenote.com/severance-pay-calculator',
    type: 'website',
  },
};

export default function SeverancePayCalculatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
