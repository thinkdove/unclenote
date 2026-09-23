import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '화장실·바닥 타일 계산기 | 300각·600각 박스 수량 및 로스율 계산 - 삼촌노트',
  description:
    '화장실, 베란다, 주방, 거실 타일 시공 시 가로·세로·높이 치수만 넣으면 300각(16장), 600각(4장), 300x600각(8장) 등 규격별 박스당 수량과 절단 로스율(5%~20%)을 반영한 실제 구매 박스 수를 1초 만에 계산해 드립니다.',
  keywords: [
    '타일계산기',
    '화장실타일계산기',
    '300각타일',
    '600각타일',
    '타일박스수량',
    '타일로스율',
    '욕실타일소요량',
    '타일평수계산',
    '셀프인테리어타일',
  ],
  alternates: {
    canonical: 'https://unclenote.com/tile-calculator',
  },
  openGraph: {
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '화장실·바닥 타일 계산기 - 삼촌노트',
    description: '300각·600각 타일 박스당 수량과 로스율(5%~20%) 자동 계산기',
    url: 'https://unclenote.com/tile-calculator',
    siteName: '삼촌노트',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function TileCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
