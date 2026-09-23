import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '도배지(벽지) 소요량 계산기 | 실크·합지 롤 수 및 평수 계산 - 삼촌노트',
  description:
    '방 가로·세로·높이만 넣으면 실크벽지(5평형), 광폭합지(5평형), 소폭합지(2평형) 등 규격별 필요한 도배지 롤(Roll) 수와 로스율, 도배 풀·본드 부자재 소요량을 1초 만에 계산해 드립니다.',
  keywords: [
    '도배계산기',
    '벽지계산기',
    '도배평수계산',
    '실크벽지롤수',
    '합지벽지',
    '방도배비용',
    '셀프도배',
    '도배부자재계산',
  ],
  alternates: {
    canonical: 'https://unclenote.com/wallpaper-calculator',
  },
  openGraph: {
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '도배지(벽지) 소요량 계산기 - 삼촌노트',
    description: '실크·합지 규격별 필요한 벽지 롤(Roll) 수 및 도배 풀·부자재 1초 자동 계산',
    url: 'https://unclenote.com/wallpaper-calculator',
    siteName: '삼촌노트',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function WallpaperCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
