import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '창문 커튼·블라인드 계산기 | 주름 배수별 폭 수 및 레일·봉 세로 길이 계산 - 삼촌노트',
  description:
    '창문 가로·세로 치수만 넣으면 나비주름(2배)·평주름(1.5배)·암막 커튼 원단 폭(장) 수와 레일·커튼봉 부속 공제 세로 길이, 블라인드 헤베(㎡) 규격을 1초 만에 계산해 드립니다.',
  keywords: [
    '커튼계산기',
    '커튼폭수계산',
    '나비주름커튼',
    '커튼세로길이',
    '블라인드계산기',
    '블라인드헤베',
    '커튼박스치수',
    '셀프커튼달기',
  ],
  alternates: {
    canonical: 'https://unclenote.com/curtain-calculator',
  },
  openGraph: {
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '창문 커튼·블라인드 계산기 - 삼촌노트',
    description: '주름 배수별 필요한 커튼 원단 폭(장) 수 및 레일/봉 세로 길이 1초 자동 계산',
    url: 'https://unclenote.com/curtain-calculator',
    siteName: '삼촌노트',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function CurtainCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
