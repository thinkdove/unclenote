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
    slug: 'salary-percentile-2026',
    title: '2026년 대한민국 연봉 통계, 나는 상위 몇%? (국세청 2,085만 명 전수조사 팩트)',
    description: '국세청 연말정산 전수조사 2,085만 명 공식 데이터를 바탕으로 내 연봉의 상위 백분위를 실시간 계산하고, 대한민국 평균(4,332만)과 중위(3,213만) 소득의 진실을 분석합니다.',
    category: '경제·연봉 통계',
    date: '2026.09.22',
    thumbnail: '/images/salary-percentile-hero.jpg',
    icon: 'solar:chart-2-bold-duotone',
    featured: true,
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
  {
    slug: 'severance-pay-guide-2026',
    title: '2026년 퇴직금 계산법 총정리: 평균임금 계산식부터 세금 절세 팁까지',
    description: '입사일과 퇴사일 기준 1일 평균임금 계산법, 지급 기한(14일)과 지연이자, IRP 계좌 이전으로 퇴직소득세 30% 감면받는 실전 꿀팁을 전해드립니다.',
    category: '노무·세무',
    date: '2026.09.22',
    thumbnail: '/images/salary-guide-thumbnail.jpg',
    icon: 'solar:wallet-money-bold-duotone',
  },
];

export default function GuideIndexPage() {
  const featuredGuide = GUIDES.find((g) => g.featured) || GUIDES[0];
  const regularGuides = GUIDES.filter((g) => g.slug !== featuredGuide.slug);

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Header */}
      <header className="mb-10 border-b border-zinc-200/80 pb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-3">
          <Icon icon="solar:book-bookmark-bold-duotone" width="20" height="20" />
          <span>삼촌생각 지식 매거진</span>
        </div>
        <h1 className="editorial-h1 mb-3">
          알짜 생활·경제 가이드
        </h1>
        <p className="editorial-body text-zinc-600 max-w-2xl">
          가장 자주 쓰지만 매번 헷갈리는 금융, 세무, 셀프 인테리어의 핵심 상식을 공공데이터 팩트 기반으로 삼촌이 친절하고 정확하게 알려드립니다.
        </p>
      </header>

      {/* Featured Special Story Banner */}
      {featuredGuide && (
        <div className="mb-10">
          <span className="text-xs font-black text-[#c55232] uppercase tracking-wider block mb-3">
            ⭐ 이번 주 추천 스페셜 아티클
          </span>
          <Link
            href={`/guide/${featuredGuide.slug}`}
            className="group block bg-white rounded-3xl border border-zinc-200/80 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-[#c55232]/50 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              <div className="md:col-span-5 bg-gradient-to-br from-[#292520] to-[#38332c] p-6 sm:p-8 text-white flex flex-col justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-[#c55232] text-white text-xs font-black rounded-md inline-block">
                    국세청 2,085만 명 전수 팩트
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-4 leading-tight text-white">
                    내 연봉은 <br />
                    <span className="text-[#f39c12]">상위 몇 %일까?</span>
                  </h3>
                </div>
                <div className="text-xs text-zinc-300 space-y-1.5 mt-6 pt-4 border-t border-zinc-700">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">중위 연봉 (중간값):</span>
                    <span className="font-bold text-white">3,213만 원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">평균 연봉:</span>
                    <span className="font-bold text-white">4,332만 원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">억대 연봉 컷:</span>
                    <span className="font-bold text-amber-300">1억 원 (상위 6.7%)</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-[#c55232]/10 text-[#c55232] text-xs font-bold rounded-md">
                      {featuredGuide.category}
                    </span>
                    <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[11px] font-bold rounded">
                      인터랙티브 분석
                    </span>
                    <span className="text-xs text-zinc-400 ml-auto">
                      {featuredGuide.date}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-[#292520] group-hover:text-[#c55232] transition-colors leading-snug mb-2 break-keep [text-wrap:balance]">
                    {featuredGuide.title}
                  </h2>

                  <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3">
                    {featuredGuide.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-[#c55232]">
                  <span>아티클 정독 및 상위 % 계산하기</span>
                  <div className="w-8 h-8 rounded-full bg-[#c55232] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Icon icon="solar:arrow-right-linear" width="16" height="16" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Regular Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regularGuides.map((guide) => (
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

              <h2 className="text-lg font-bold text-[#292520] mb-3 group-hover:text-[#c55232] transition-colors leading-snug">
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
