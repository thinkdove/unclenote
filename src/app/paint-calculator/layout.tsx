import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '셀프 페인트 소요량 계산기 | 벽면·방문 페인트 용량(L) 및 젯소 계산 - 삼촌노트',
  description:
    '벽면·방문·베란다 가로·세로 치수만 넣으면 2회 도장 기준 필요한 페인트 리터(L) 수와 캔 규격(1L·4L·18L), 젯소(프라이머), 롤러·부자재 세트를 1초 만에 계산해 드립니다.',
  keywords: [
    '페인트계산기',
    '페인트소요량',
    '방문페인트칠',
    '벽면페인트리터',
    '젯소소요량',
    '셀프페인팅',
    '페인트몇통',
    '페인트부자재',
  ],
  alternates: {
    canonical: 'https://unclenote.com/paint-calculator',
  },
  openGraph: {
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '셀프 페인트 소요량 계산기 - 삼촌노트',
    description: '2회 도장 기준 필요한 페인트 리터(L) 수 및 젯소·부자재 1초 자동 계산',
    url: 'https://unclenote.com/paint-calculator',
    siteName: '삼촌노트',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function PaintCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
