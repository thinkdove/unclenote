import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2026년 대한민국 연봉 통계, 나는 상위 몇%? | 국세청 2,085만 명 전수 팩트',
  description:
    '국세청 연말정산 전수조사 2,085만 명 공식 데이터를 바탕으로 내 연봉의 상위 백분위를 실시간 계산하고, 대한민국 평균(4,332만)과 중위소득(3,213만)의 진실, 소득 10분위 팩트 시트를 분석합니다.',
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
    title: '2026년 대한민국 연봉 통계, 나는 상위 몇%? | 삼촌생각',
    description: '국세청 2,085만 명 전수조사 기준 내 연봉 상위 백분위 실시간 계산기 & 소득 10분위 팩트 분석',
    url: 'https://unclenote.com/guide/salary-percentile-2026',
    siteName: '삼촌생각 (Uncle Note)',
    locale: 'ko_KR',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    title: '2026년 대한민국 연봉 통계, 나는 상위 몇%?',
    description: '국세청 2,085만 명 전수조사 기준 내 연봉 상위 백분위 실시간 계산기',
  },
};

export default function SalaryPercentileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
