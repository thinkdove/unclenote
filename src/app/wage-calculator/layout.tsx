import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2026·2027 최저임금 및 주휴수당 계산기',
  description: '시급과 근무시간을 입력해 예상 월급, 주휴수당과 공제 후 금액을 참고용으로 계산합니다.',
  alternates: { canonical: 'https://unclenote.com/wage-calculator' },
  openGraph: {
    siteName: '삼촌노트',
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '최저임금 및 주휴수당 계산기 | 삼촌노트',
    description: '시급과 근무시간에 따른 예상 월급과 주휴수당을 계산합니다.',
    url: 'https://unclenote.com/wage-calculator',
    type: 'website',
  },
};

export default function WageCalculatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
