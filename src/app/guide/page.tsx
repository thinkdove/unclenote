import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export const metadata: Metadata = {
  title: '알짜 생활 가이드 전체보기',
  description: '연봉 실수령액, 퇴직금 계산, 부가가치세 절세 등 실생활에 꼭 필요한 금융·세무 가이드를 알기 쉽게 전해드립니다.',
  alternates: {
    canonical: 'https://unclenote.com/guide',
  },
};

const GUIDES = [
  {
    slug: 'severance-pay-guide-2026',
    title: '2026년 퇴직금 계산법 총정리: 평균임금 계산식부터 세금 절세 팁까지',
    description: '입사일과 퇴사일 기준 1일 평균임금 계산법, 지급 기한(14일)과 지연이자, IRP 계좌 이전으로 퇴직소득세 30% 감면받는 실전 꿀팁을 전해드립니다.',
    category: '노무·세무',
    date: '2026.09.22',
    thumbnail: '/images/salary-guide-thumbnail.jpg', // fallback image
    icon: 'solar:wallet-money-bold-duotone',
  },
  {
    slug: 'salary-table-2026',
    title: '2026년 연봉 실수령액 표 총정리: 3,000만~1억 구간별 월급 & 공제액 분석',
    description: '최신 4대 보험 요율과 근로소득세 간이세액표를 반영한 연봉 구간별 실제 월 실수령액과 식대 비과세 절세 팁을 상세히 전해드립니다.',
    category: '세무·노무',
    date: '2026.09.22',
    thumbnail: '/images/salary-guide-thumbnail.jpg',
    icon: 'solar:calculator-bold-duotone',
  },
];

export default function GuideIndexPage() {
  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Header */}
      <header className="mb-12 border-b border-zinc-200/80 pb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-[#c55232] mb-3">
          <Icon icon="solar:book-bookmark-bold-duotone" width="20" height="20" />
          <span>삼촌생각 에디토리얼</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#292520] tracking-tight mb-3">
          알짜 생활 가이드
        </h1>
        <p className="text-zinc-600 text-base leading-relaxed max-w-2xl">
          가장 자주 쓰지만 매번 헷갈리는 금융과 세무의 핵심 상식을 삼촌이 친절하고 정확하게 알려드립니다.
        </p>
      </header>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guide/${guide.slug}`}
            className="group bg-white p-6 sm:p-7 rounded-3xl border border-zinc-200/70 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#c55232]/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-2.5 py-1 bg-[#c55232]/10 text-[#c55232] text-xs font-bold rounded-md">
                  {guide.category}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  {guide.date}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#292520] mb-3 group-hover:text-[#c55232] transition-colors leading-snug">
                {guide.title}
              </h2>

              <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-6">
                {guide.description}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-500 group-hover:text-[#c55232] transition-colors">
              <span>가이드 읽기</span>
              <div className="w-7 h-7 rounded-full bg-black/5 group-hover:bg-[#c55232] group-hover:text-white flex items-center justify-center transition-all">
                <Icon icon="solar:arrow-right-linear" width="14" height="14" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
