import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연봉 상위 몇 %일까? | 국세청 2023년 귀속 통계',
  description:
    '국세청 2023년 귀속 연말정산 신고자 2,085만 명 통계를 바탕으로 평균 총급여와 내 연봉의 상위 백분위 추정치를 살펴봅니다.',
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
    title: '연봉 상위 몇 %일까? | 2023년 귀속 국세청 통계',
    description: '2023년 귀속 근로소득 통계에 기반한 연봉 백분위 참고 계산기',
    url: 'https://unclenote.com/guide/salary-percentile-2026',
    siteName: '삼촌생각 (Uncle Note)',
    locale: 'ko_KR',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: '연봉 상위 몇 %일까? | 2023년 귀속 국세청 통계',
    description: '국세청 2023년 귀속 통계에 기반한 연봉 백분위 참고 계산기',
  },
};

export default function SalaryPercentileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
