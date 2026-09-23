import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '장판 소요량 계산기 | 모노륨 1.8m 폭 미터(m) 및 롤 주문 계산 - 삼촌노트',
  description:
    '방 가로·세로 치수만 넣으면 국내 표준 1.8m 폭 모노륨 장판 기준으로 필요한 폭(줄) 수, 꺾어올림 여유분 포함 총 구매 미터(m) 수와 롤 수, 용착제·굽도리 부자재를 1초 만에 계산해 드립니다.',
  keywords: [
    '장판계산기',
    '모노륨장판계산',
    '장판미터계산',
    '장판폭수',
    '장판1.8m',
    '방장판셀프시공',
    '장판평수계산',
    '장판부자재용착제',
  ],
  alternates: {
    canonical: 'https://unclenote.com/flooring-calculator',
  },
  openGraph: {
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '장판(모노륨) 소요량 계산기 - 삼촌노트',
    description: '1.8m 표준 폭 기준 필요한 장판 폭(줄) 수 및 총 구매 미터(m) 1초 자동 계산',
    url: 'https://unclenote.com/flooring-calculator',
    siteName: '삼촌노트',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function FlooringCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
