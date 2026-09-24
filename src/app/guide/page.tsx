import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export const metadata: Metadata = {
  title: '읽을거리',
  description: '생활 속 궁금한 주제를 읽기 쉽게 정리한 삼촌노트의 정보 글을 모았습니다.',
  alternates: {
    canonical: 'https://unclenote.com/guide',
  },
  openGraph: {
    siteName: '삼촌노트',
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '읽을거리 | 삼촌노트',
    description: '생활 속 궁금한 주제를 읽기 쉽게 정리한 정보 글을 살펴보세요.',
    url: 'https://unclenote.com/guide',
    type: 'website',
  },
};

const GUIDES = [
  {
    slug: 'first-marriage-age-2025',
    title: '첫 결혼 평균 나이 2025: 가장 이른·늦은 초혼은 몇 살일까?',
    description: '국가데이터처와 KOSIS 원표로 초혼 연령대별 인원, 17개 시도 평균, 가장 이른·늦은 공개 구간을 한눈에 비교합니다.',
    category: '생활·결혼 통계',
    date: '2026.09.24',
    thumbnail: '/images/share-samchon-note-v2.png',
    icon: 'solar:chart-2-bold-duotone',
  },
  {
    slug: 'salary-percentile-2026',
    title: '내 연봉은 상위 몇 %? 국세청 2024년 귀속 통계로 살펴보기',
    description: '국세청 2024년 귀속 근로소득 신고자 약 2,108만 명의 통계로 내 연봉 위치를 참고용으로 추정합니다.',
    category: '경제·연봉 통계',
    date: '자료: 2024년 귀속',
    thumbnail: '/images/salary-percentile-hero.jpg',
    icon: 'solar:chart-2-bold-duotone',
    featured: true,
  },
  {
    slug: 'salary-table-2026',
    title: '2026년 연봉 실수령액 표 총정리: 3,000만~1억 구간별 월급 & 공제액 분석',
    description: '2026년 보험료율을 참고한 연봉 구간별 예상 월 실수령액과 식대 비과세 정보를 정리했습니다. 실제 원천징수액은 급여명세서를 확인하세요.',
    category: '세무·노무',
    date: '2026.09.22',
    thumbnail: '/images/salary-guide-thumbnail.jpg',
    icon: 'solar:calculator-bold-duotone',
  },
  {
    slug: 'severance-pay-guide-2026',
    title: '2026년 퇴직금 계산법 총정리: 평균임금 계산식부터 세금 절세 팁까지',
    description: '1일 평균임금 계산법, 퇴직금 지급 기한과 IRP 계좌 이전·연금 수령 시 세금 차이를 정리했습니다.',
    category: '노무·세무',
    date: '2026.09.23',
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
          <span>삼촌노트 읽을거리</span>
        </div>
        <h1 className="editorial-h1 mb-3">
          읽을거리
        </h1>
        <p className="editorial-body text-zinc-600 max-w-2xl">
          생활 속 궁금한 주제를 하나씩 살펴봅니다. 일과 돈, 결혼과 생활 통계까지 믿을 만한 자료를 읽기 쉽게 풀어냅니다.
        </p>
      </header>

      {/* Featured Special Story Banner */}
      {featuredGuide && (
        <div className="mb-10">
          <span className="text-xs font-black text-[#c55232] uppercase tracking-wider block mb-3">
            먼저 읽어볼 글
          </span>
          <Link
            href={`/guide/${featuredGuide.slug}`}
            className="group block bg-white rounded-3xl border border-zinc-200/80 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-[#c55232]/50 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              <div className="md:col-span-5 bg-gradient-to-br from-[#292520] to-[#38332c] p-6 sm:p-8 text-white flex flex-col justify-between">
                <div>
                  <span className="px-2.5 py-1 bg-[#c55232] text-white text-xs font-black rounded-md inline-block">
                    2024년 귀속 국세청 통계
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-4 leading-tight text-white">
                    내 연봉은 <br />
                    <span className="text-[#f39c12]">상위 몇 %일까?</span>
                  </h3>
                </div>
                <div className="text-xs text-zinc-300 space-y-1.5 mt-6 pt-4 border-t border-zinc-700">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">중위 연봉 (중간값):</span>
                    <span className="font-bold text-white">약 3,388만 원 (추정)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">평균 연봉:</span>
                    <span className="font-bold text-white">약 4,475만 원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">상위 10% 경계:</span>
                    <span className="font-bold text-amber-300">약 8,944만 원 (상위 10% 추정)</span>
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
