import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연봉 상위 몇 %일까? | 국세청 2024년 귀속 통계',
  description:
    '국세청 2024년 귀속 근로소득 신고자 약 2,108만 명의 공개 자료로 평균 총급여와 연봉 위치를 참고용으로 추정합니다.',
  keywords: [
    '대한민국 연봉 순위',
    '연봉 상위 몇 프로',
    '2026 연봉 백분위',
    '대한민국 평균 연봉',
    '대한민국 중위 연봉',
    '억대 연봉 비율',
    '연봉 분포도',
    '국세청 연말정산 통계',
    '직장인 연봉 순위',
  ],
  alternates: {
    canonical: 'https://unclenote.com/guide/salary-percentile-2026',
  },
  openGraph: {
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '연봉 상위 몇 %일까? | 2024년 귀속 국세청 통계',
    description: '2024년 귀속 근로소득 자료에 기반한 연봉 백분위 참고 계산기',
    url: 'https://unclenote.com/guide/salary-percentile-2026',
    siteName: '삼촌노트',
    locale: 'ko_KR',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: '연봉 상위 몇 %일까? | 2024년 귀속 국세청 통계',
    description: '국세청 2024년 귀속 통계에 기반한 연봉 백분위 참고 계산기',
  },
};

export default function SalaryPercentileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
