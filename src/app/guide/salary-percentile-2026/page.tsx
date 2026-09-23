'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Icon } from '@iconify/react';

// 국세청(TASIS) 2,085만 명 전수조사 컷오프 데이터 (단위: 만 원)
const PERCENTILE_CUTOFFS = [
  { salary: 102000, topPercent: 0.1 },
  { salary: 18500, topPercent: 1.0 },
  { salary: 13500, topPercent: 3.0 },
  { salary: 11500, topPercent: 5.0 },
  { salary: 10000, topPercent: 6.7 }, // 억대 연봉자 컷
  { salary: 8700, topPercent: 10.0 },
  { salary: 7400, topPercent: 15.0 },
  { salary: 6400, topPercent: 20.0 },
  { salary: 5600, topPercent: 25.0 },
  { salary: 4900, topPercent: 30.0 },
  { salary: 4332, topPercent: 35.8 }, // 전체 평균
  { salary: 4000, topPercent: 40.0 },
  { salary: 3550, topPercent: 45.0 },
  { salary: 3213, topPercent: 50.0 }, // 중위소득 (중간값)
  { salary: 2900, topPercent: 55.0 },
  { salary: 2650, topPercent: 60.0 },
  { salary: 2400, topPercent: 65.0 },
  { salary: 2150, topPercent: 70.0 },
  { salary: 1900, topPercent: 75.0 },
  { salary: 1700, topPercent: 80.0 },
  { salary: 1450, topPercent: 85.0 },
  { salary: 1150, topPercent: 90.0 },
  { salary: 800, topPercent: 95.0 },
  { salary: 0, topPercent: 100.0 },
];

const TOTAL_WORKERS = 20850000; // 2,085만 명
const AVERAGE_SALARY = 4332; // 4,332만 원
const MEDIAN_SALARY = 3213; // 3,213만 원

// 상위 백분위 계산 보간 알고리즘
function calculatePercentile(salaryManwon: number): number {
  if (salaryManwon <= 0) return 100.0;
  if (salaryManwon >= 102000) return 0.1;

  for (let i = 0; i < PERCENTILE_CUTOFFS.length - 1; i++) {
    const higher = PERCENTILE_CUTOFFS[i];
    const lower = PERCENTILE_CUTOFFS[i + 1];

    if (salaryManwon <= higher.salary && salaryManwon >= lower.salary) {
      const salaryRange = higher.salary - lower.salary;
      const percentRange = lower.topPercent - higher.topPercent;
      if (salaryRange === 0) return higher.topPercent;

      const ratio = (salaryManwon - lower.salary) / salaryRange;
      const calculated = lower.topPercent - ratio * percentRange;
      return Math.max(0.1, Math.min(100.0, Number(calculated.toFixed(1))));
    }
  }

  return 50.0;
}

// SVG 커브 X 좌표 (0~100) 매핑
function getSvgXRatio(salaryManwon: number): number {
  // 1,000만~1억5천만 범위를 비선형 스케일로 압축 매핑
  if (salaryManwon <= 1000) return 5;
  if (salaryManwon >= 15000) return 95;
  if (salaryManwon <= 3213) {
    return 5 + ((salaryManwon - 1000) / (3213 - 1000)) * 40; // 5% ~ 45%
  } else if (salaryManwon <= 7000) {
    return 45 + ((salaryManwon - 3213) / (7000 - 3213)) * 30; // 45% ~ 75%
  } else {
    return 75 + ((salaryManwon - 7000) / (15000 - 7000)) * 20; // 75% ~ 95%
  }
}

// SVG 커브 Y 좌표 계산 (벨 커브 높이)
function getSvgCurveY(xRatio: number): number {
  // Peak at x=45 (중위소득 구간 3,213만 원 부근)
  const peakX = 45;
  const spread = 22;
  const height = 120; // 최대 높이
  const baseY = 175; // 바닥 기준선
  const val = Math.exp(-Math.pow(xRatio - peakX, 2) / (2 * Math.pow(spread, 2)));
  return baseY - val * height;
}

export default function SalaryPercentileGuidePage() {
  const inputId = useId();
  const [salaryManwon, setSalaryManwon] = useState<number>(5000);
  const [copied, setCopied] = useState<boolean>(false);

  const topPercent = calculatePercentile(salaryManwon);
  const workersAhead = Math.round(TOTAL_WORKERS * (topPercent / 100));
  const workersBehind = Math.max(0, TOTAL_WORKERS - workersAhead);

  const diffAvg = salaryManwon - AVERAGE_SALARY;
  const diffMedian = salaryManwon - MEDIAN_SALARY;

  const svgX = getSvgXRatio(salaryManwon);
  const svgY = getSvgCurveY(svgX);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://unclenote.com/guide/salary-percentile-2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // AEO / SEO Structured Data (BlogPosting + FAQPage + WebApplication)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': 'https://unclenote.com/guide/salary-percentile-2026#article',
        'headline': '2026년 대한민국 연봉 통계, 나는 상위 몇%? (국세청 2,085만 명 전수조사 팩트)',
        'description': '국세청 연말정산 전수조사(2,085만 명)와 통계청 공식 데이터를 기반으로 내 연봉이 대한민국 상위 몇%인지 실시간 계산하고 중위소득과 평균의 함정을 심층 분석합니다.',
        'image': 'https://unclenote.com/images/salary-percentile-hero.jpg',
        'author': {
          '@type': 'Organization',
          'name': '삼촌생각 에디토리얼 팀',
          'url': 'https://unclenote.com',
        },
        'publisher': {
          '@type': 'Organization',
          'name': '삼촌생각 (Uncle Note)',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://unclenote.com/favicon.ico',
          },
        },
        'datePublished': '2026-09-22T09:00:00+09:00',
        'dateModified': '2026-09-22T09:00:00+09:00',
      },
      {
        '@type': 'WebApplication',
        'name': '대한민국 연봉 상위 백분위 계산기',
        'url': 'https://unclenote.com/guide/salary-percentile-2026',
        'applicationCategory': 'FinanceApplication',
        'operatingSystem': 'All',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'KRW',
        },
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': '대한민국 근로자 평균 연봉과 중위 연봉의 차이는 얼마인가요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '국세청 2,085만 명 연말정산 전수조사 기준 1인당 평균 연봉은 4,332만 원이지만, 전체 근로자를 줄 세웠을 때 딱 정가운데 위치한 중위 연봉(중간값)은 3,213만 원입니다. 초고소득자들의 영향으로 평균이 중위값보다 약 1,119만 원 더 높게 형성됩니다.',
            },
          },
          {
            '@type': 'Question',
            'name': '대한민국에서 연봉 1억 원은 상위 몇 %에 해당하나요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '국세청 공식 통계에 따르면 총급여 1억 원을 초과하는 근로자는 약 139만 명으로 전체 근로자의 상위 6.7%에 해당합니다.',
            },
          },
          {
            '@type': 'Question',
            'name': '상위 10%와 상위 1%에 진입하려면 연봉이 얼마여야 하나요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '상위 10% 커트라인은 세전 연봉 약 8,700만 원 이상이며, 상위 1% 초고소득자 커트라인은 세전 연봉 약 1억 8,500만 원 이상입니다.',
            },
          },
        ],
      },
    ],
  };

  return (
    <article className="max-w-[760px] mx-auto py-6 px-3 sm:px-0">
      {/* AEO / SEO Structured Data */}
      <Script
        id="salary-percentile-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-zinc-400">
        <Link href="/" className="hover:text-zinc-700 transition-colors">홈</Link>
        <span>/</span>
        <Link href="/guide" className="hover:text-zinc-700 transition-colors">삼촌 매거진</Link>
        <span>/</span>
        <span className="text-[#c55232]">경제·연봉 통계</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs font-bold">
            국세청 전수조사 팩트
          </span>
          <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-bold">
            인터랙티브 분석
          </span>
          <span className="text-xs text-zinc-400 ml-auto flex items-center gap-1">
            <Icon icon="solar:clock-circle-linear" width="14" height="14" />
            읽는 시간 약 4분
          </span>
        </div>

        <h1 className="editorial-h1 text-2xl sm:text-4xl font-extrabold text-[#292520] tracking-tight leading-[1.3] break-keep [text-wrap:balance]">
          <span className="inline-block">2026년 대한민국 연봉 통계,</span>{' '}
          <span className="inline-block whitespace-nowrap text-[#c55232]">나는 상위 몇%일까?</span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
          &ldquo;남들은 다 나보다 많이 버는 것 같은데...&rdquo; 국세청 연말정산 신고자 <strong>2,085만 명의 공식 전수 데이터</strong>를 바탕으로 내 실제 소득 순위와 평균의 진실을 투명하게 공개합니다.
        </p>

        <div className="pt-2 pb-4 border-b border-zinc-200/80 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#292520] text-white flex items-center justify-center font-bold text-xs">
              삼촌
            </div>
            <div>
              <p className="font-bold text-[#292520]">삼촌생각 경제팀</p>
              <p className="text-zinc-400">2026년 최신 갱신 • 출처: 국세청 TASIS</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 font-bold transition-all shadow-2xs"
          >
            <Icon icon={copied ? 'solar:check-circle-bold' : 'solar:share-linear'} width="15" height="15" className={copied ? 'text-emerald-600' : ''} />
            <span>{copied ? '링크 복사됨!' : '공유하기'}</span>
          </button>
        </div>
      </header>

      {/* 대한민국 소득 계층 5단계 팩트 인포그래픽 카드 (난해한 추상 일러스트 대신 직관적 데이터 시각화) */}
      <div className="mb-10 p-6 bg-white rounded-3xl border border-zinc-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <span className="font-extrabold text-sm text-[#292520] flex items-center gap-1.5">
            <Icon icon="solar:chart-square-bold-duotone" className="text-[#c55232]" width="18" height="18" />
            <span>대한민국 연봉 5단계 핵심 커트라인 한눈에 보기</span>
          </span>
          <span className="text-xs text-zinc-400">국세청 2,085만 명 기준</span>
        </div>

        <div className="space-y-2.5">
          {/* 상위 1% */}
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-black text-xs">상위 1%</span>
              <span className="font-bold text-sm text-[#292520]">세전 1억 8,500만 원 이상</span>
            </div>
            <span className="text-xs text-zinc-500 hidden sm:inline">대기업 임원, 상위 전문직</span>
          </div>

          {/* 상위 6.7% (1억 컷) */}
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-black text-xs">상위 6.7%</span>
              <span className="font-bold text-sm text-blue-950">세전 1억 원 (억대 연봉자 139만 명)</span>
            </div>
            <span className="text-xs text-blue-600 font-bold hidden sm:inline">15명 중 1명 꼴</span>
          </div>

          {/* 상위 10% */}
          <div className="p-3 bg-zinc-100 rounded-xl border border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#292520] text-white font-black text-xs">상위 10%</span>
              <span className="font-bold text-sm text-[#292520]">세전 8,700만 원 이상</span>
            </div>
            <span className="text-xs text-zinc-500 hidden sm:inline">대기업 과·차장급</span>
          </div>

          {/* 평균 */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-700 text-white font-black text-xs">상위 35.8%</span>
              <span className="font-bold text-sm text-emerald-950">세전 4,332만 원 (대한민국 평균)</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold hidden sm:inline">고소득자 포함 산술평균</span>
          </div>

          {/* 중위소득 */}
          <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#c55232] text-white font-black text-xs">상위 50%</span>
              <span className="font-black text-sm text-[#c55232]">세전 3,213만 원 (중위소득 · 중간값) ⭐</span>
            </div>
            <span className="text-xs text-[#c55232] font-bold hidden sm:inline">대한민국 딱 절반의 위치!</span>
          </div>
        </div>
      </div>

      {/* TL;DR Summary Callout Card (AEO 핵심 타겟) */}
      <div className="mb-10 p-5 sm:p-6 bg-[#f7f4ed] rounded-2xl border border-[#e8e2d5] space-y-3">
        <div className="flex items-center gap-2 text-[#c55232] font-bold text-sm">
          <Icon icon="solar:stars-minimalistic-bold" width="18" height="18" />
          <span>삼촌의 3줄 핵심 요약 (Fact Check)</span>
        </div>
        <ul className="space-y-2 text-sm text-[#292520] leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#c55232] font-black">•</span>
            <span><strong>대한민국 평균 연봉은 4,332만 원</strong>이지만, 딱 정가운데 사람의 <strong>중위 연봉은 3,213만 원</strong>입니다. (고소득자 착시로 1,119만 원 차이 발생)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c55232] font-black">•</span>
            <span><strong>연봉 1억 원</strong>을 받으면 대한민국 근로자 2,085만 명 중 <strong>상위 6.7% (139만 명)</strong>의 최상위권입니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c55232] font-black">•</span>
            <span><strong>상위 10% 컷은 8,700만 원</strong>, <strong>상위 1% 초고소득자 컷은 1억 8,500만 원</strong>입니다.</span>
          </li>
        </ul>
      </div>

      {/* ========================================================
          INTERACTIVE WIDGET: 상위 몇 % 실시간 계산기 & 모션그래픽
          ======================================================== */}
      <section className="mb-12 p-6 sm:p-8 bg-white rounded-3xl border-2 border-[#292520] shadow-[0_12px_40px_rgba(0,0,0,0.06)] space-y-6">
        <div className="text-center space-y-1">
          <span className="inline-block px-3 py-1 bg-[#c55232]/10 text-[#c55232] rounded-full text-xs font-black">
            LIVE INTERACTIVE
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#292520]">
            🎯 내 연봉 넣고 상위 몇 %인지 즉시 확인하기
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500">
            슬라이더를 움직이거나 금액을 입력하면 대한민국 2,085만 명 곡선에서 내 위치를 찾아줍니다.
          </p>
        </div>

        {/* Input Controls */}
        <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-zinc-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label htmlFor={inputId} className="font-extrabold text-sm text-[#292520]">
              내 세전(총급여) 연봉:
            </label>
            <div className="editorial-input-box w-full sm:w-64">
              <input
                id={inputId}
                type="number"
                step="100"
                min="1000"
                max="30000"
                value={salaryManwon}
                onChange={(e) => setSalaryManwon(Math.max(0, Number(e.target.value)))}
                className="text-right font-black text-xl text-[#292520]"
              />
              <span className="input-unit text-base font-bold text-zinc-700">만 원</span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-1.5">
            <input
              type="range"
              min="1500"
              max="15000"
              step="100"
              value={salaryManwon}
              onChange={(e) => setSalaryManwon(Number(e.target.value))}
              className="w-full h-2.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#c55232]"
            />
            <div className="flex justify-between text-[11px] font-bold text-zinc-400">
              <span>1,500만</span>
              <span>3,213만 (중간값)</span>
              <span>4,332만 (평균)</span>
              <span>1억 (상위 6.7%)</span>
              <span>1.5억</span>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-xs text-zinc-400 self-center mr-1">빠른 선택:</span>
            {[
              { label: '3,200만(중위)', val: 3200 },
              { label: '4,300만(평균)', val: 4300 },
              { label: '5,000만', val: 5000 },
              { label: '6,500만(상위20%)', val: 6500 },
              { label: '8,700만(상위10%)', val: 8700 },
              { label: '1억(상위6.7%)', val: 10000 },
            ].map((btn) => (
              <button
                key={btn.val}
                type="button"
                onClick={() => setSalaryManwon(btn.val)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-700 transition-all shadow-2xs"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean High-Clarity Income Spectrum Gauge (글자 뭉개짐 없는 선명한 반응형 스펙트럼 인디케이터) */}
        <div className="p-5 sm:p-6 bg-[#fdfbf7] rounded-2xl border border-zinc-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-600 flex items-center gap-1.5">
              <Icon icon="solar:align-horizontal-center-bold" width="16" height="16" className="text-[#c55232]" />
              <span>대한민국 근로소득 2,085만 명 스펙트럼 분포</span>
            </span>
            <span className="text-xs font-bold text-[#c55232]">
              ● 내 위치: 상위 {topPercent}%
            </span>
          </div>

          {/* Key Reference Markers (선명한 상단 기준 눈금) */}
          <div className="relative h-7 text-[11px] sm:text-xs font-bold select-none">
            <div className="absolute left-[35%] transform -translate-x-1/2 text-center text-zinc-500 whitespace-nowrap">
              <span>중위 3,213만</span>
              <span className="block text-[10px] text-zinc-400 font-normal">(50.0%)</span>
            </div>
            <div className="absolute left-[52%] transform -translate-x-1/2 text-center text-emerald-700 whitespace-nowrap">
              <span>평균 4,332만</span>
              <span className="block text-[10px] text-emerald-600 font-normal">(35.8%)</span>
            </div>
            <div className="absolute left-[75%] transform -translate-x-1/2 text-center text-blue-700 whitespace-nowrap hidden xs:block sm:block">
              <span>상위10% 8,700만</span>
              <span className="block text-[10px] text-blue-500 font-normal">(10.0%)</span>
            </div>
            <div className="absolute left-[88%] transform -translate-x-1/2 text-center text-[#292520] whitespace-nowrap">
              <span>1억 원</span>
              <span className="block text-[10px] text-zinc-500 font-normal">(6.7%)</span>
            </div>
          </div>

          {/* Spectrum Bar with Dynamic User Pin */}
          <div className="relative pt-6 pb-2">
            {/* Background Spectrum Track */}
            <div className="w-full h-4 rounded-full bg-gradient-to-r from-zinc-200 via-amber-200 via-rose-300 via-orange-400 to-[#292520] shadow-inner relative overflow-hidden">
              {/* Reference Vertical Divider Lines */}
              <div className="absolute top-0 bottom-0 left-[35%] w-[1.5px] bg-zinc-400/50" />
              <div className="absolute top-0 bottom-0 left-[52%] w-[1.5px] bg-emerald-600/60" />
              <div className="absolute top-0 bottom-0 left-[75%] w-[1.5px] bg-blue-600/60" />
              <div className="absolute top-0 bottom-0 left-[88%] w-[1.5px] bg-zinc-800/80" />
            </div>

            {/* Dynamic Moving Pin & Badge */}
            <div
              className="absolute top-0 transition-all duration-300 transform -translate-x-1/2 flex flex-col items-center"
              style={{
                left: `${Math.min(96, Math.max(4, svgX))}%`,
              }}
            >
              {/* Badge */}
              <div className="bg-[#292520] text-white px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-black whitespace-nowrap shadow-lg flex items-center gap-1.5 border border-zinc-700">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>상위 {topPercent}%</span>
                <span className="text-amber-300 font-bold">
                  ({salaryManwon >= 10000 ? `${(salaryManwon / 10000).toFixed(1)}억` : `${salaryManwon.toLocaleString()}만`})
                </span>
              </div>

              {/* Pin Arrow */}
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#292520]" />

              {/* Pin Target Head */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#c55232] border-2 border-white shadow-md mt-0.5" />
            </div>
          </div>

          {/* Bottom Labels */}
          <div className="flex justify-between text-[11px] font-bold text-zinc-400 pt-1">
            <span>◀ 하위 소득 구간</span>
            <span>대한민국 전체 근로자 2,085만 명</span>
            <span>최상위 소득 구간 ▶</span>
          </div>
        </div>

        {/* Calculation Result Cards */}
        <div className="p-6 bg-[#292520] text-white rounded-2xl space-y-5">
          <div className="text-center border-b border-zinc-700 pb-5">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">
              대한민국 2,085만 명 근로자 중 내 소득 순위
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[#f39c12] tracking-tight">
                상위 {topPercent}%
              </span>
              <span className="text-sm text-zinc-300 font-bold self-end mb-1">
                (상위 100명 중 {Math.max(1, Math.round(topPercent))}등)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700">
              <span className="text-[11px] text-zinc-400 block font-medium">내 앞의 인원 (나보다 높은 소득)</span>
              <span className="text-base sm:text-lg font-black text-white mt-0.5 block">
                약 {(workersAhead / 10000).toFixed(1)}만 명
              </span>
            </div>

            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700">
              <span className="text-[11px] text-zinc-400 block font-medium">대한민국 평균(4,332만) 대비</span>
              <span className={`text-base sm:text-lg font-black mt-0.5 block ${diffAvg >= 0 ? 'text-emerald-400' : 'text-zinc-300'}`}>
                {diffAvg >= 0 ? `+${diffAvg.toLocaleString()}만 원` : `${diffAvg.toLocaleString()}만 원`}
              </span>
            </div>

            <div className="p-3 bg-zinc-800/80 rounded-xl border border-zinc-700">
              <span className="text-[11px] text-zinc-400 block font-medium">중위소득(3,213만) 대비</span>
              <span className={`text-base sm:text-lg font-black mt-0.5 block ${diffMedian >= 0 ? 'text-amber-400' : 'text-zinc-300'}`}>
                {diffMedian >= 0 ? `+${diffMedian.toLocaleString()}만 원` : `${diffMedian.toLocaleString()}만 원`}
              </span>
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-zinc-400">
            ※ 연봉 <strong>{salaryManwon.toLocaleString()}만 원</strong> 기준 월 예상 실수령액은 약 <strong>{Math.round(salaryManwon / 12 * 0.88).toLocaleString()}만 원</strong> 선입니다. (비과세 식대 및 4대보험 기본공제 기준)
          </div>
        </div>
      </section>

      {/* ========================================================
          ARTICLE BODY: 정밀 분석 및 가이드
          ======================================================== */}
      <div className="space-y-12 text-[#292520] text-base sm:text-[17px] leading-[1.8] font-normal break-keep">

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#292520] tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-sm font-black shrink-0">1</span>
            <span>내가 느끼는 체감과 통계의 괴리: &lsquo;평균의 함정&rsquo;</span>
          </h2>

          <p>
            직장인들이 모이는 커뮤니티나 뉴스를 보면 다들 연봉 7,000만 원, 1억 원은 우습게 버는 것처럼 보입니다. 그래서 <strong>&ldquo;대한민국 평균 연봉이 4,332만 원이라는데, 왜 내 주변엔 다들 나보다 훨씬 잘 버는 것 같지?&rdquo;</strong>라는 상대적 박탈감을 느끼곤 합니다.
          </p>

          <p>
            하지만 여기에는 통계학에서 가장 유명한 <strong>&lsquo;산술 평균의 착시&rsquo;</strong>가 숨어 있습니다.
          </p>

          <div className="p-4 bg-zinc-50 rounded-2xl border-l-4 border-[#c55232] text-sm text-zinc-700 space-y-1 my-4">
            <p className="font-bold text-[#292520]">💡 빌 게이츠가 술집에 들어오면 생기는 일:</p>
            <p>
              손님 10명이 모인 술집에 연봉 100억 원의 빌 게이츠가 한 명 들어오는 순간, 그 술집 손님들의 &lsquo;평균 연봉&rsquo;은 순식간에 10억 원으로 뜁니다. 하지만 나머지 9명의 실제 통장 잔고는 단 1원도 변하지 않았습니다.
            </p>
          </div>

          <p>
            대한민국 근로소득 통계도 똑같습니다. 연봉 수억~수십억 원을 받는 대기업 임원과 고소득 전문직이 전체 평균을 위로 강하게 끌어올리기 때문에, <strong>대한민국 근로자의 64.2%는 평균 연봉(4,332만 원)을 받지 못합니다.</strong>
          </p>

          <p>
            따라서 내 소득 수준의 현실적인 위치를 볼 때는 평균값이 아니라, <strong>전체 2,085만 명 중 정확히 정가운데 서 있는 사람의 소득인 &lsquo;중위 연봉(3,213만 원)&rsquo;</strong>을 기준으로 삼아야 합니다. 연봉 3,300만 원만 넘어도 당신은 이미 대한민국 절반 이상의 직장인보다 앞서 나가고 있는 것입니다.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#292520] tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-sm font-black shrink-0">2</span>
            <span>국세청 전수조사 소득 10분위 팩트 시트</span>
          </h2>

          <p>
            국세청이 발표한 가장 최근 근로소득 연말정산 확정 신고 자료를 10분위로 쪼개어 보면 대한민국 소득의 피라미드가 한눈에 드러납니다.
          </p>

          {/* Table */}
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#292520] text-white">
                  <th className="py-3 px-3.5 rounded-tl-xl font-bold">소득 분위</th>
                  <th className="py-3 px-3.5 font-bold">상위 백분위</th>
                  <th className="py-3 px-3.5 font-bold">세전 연봉 컷</th>
                  <th className="py-3 px-3.5 font-bold">월 실수령액 (추정)</th>
                  <th className="py-3 px-3.5 rounded-tr-xl font-bold">해당 계층 비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 border border-zinc-200 bg-white">
                <tr className="bg-amber-50/60 font-bold">
                  <td className="py-3 px-3.5 text-[#c55232]">최상위 0.1%</td>
                  <td className="py-3 px-3.5">상위 0.1%</td>
                  <td className="py-3 px-3.5">약 10억 2,000만 원~</td>
                  <td className="py-3 px-3.5">약 4,500만 원~/월</td>
                  <td className="py-3 px-3.5 text-zinc-500 font-normal">대기업 오너, 초고소득 전문직</td>
                </tr>
                <tr className="bg-amber-50/30 font-semibold">
                  <td className="py-3 px-3.5 text-[#c55232]">상위 1%</td>
                  <td className="py-3 px-3.5">상위 1.0%</td>
                  <td className="py-3 px-3.5">약 1억 8,500만 원~</td>
                  <td className="py-3 px-3.5">약 1,060만 원/월</td>
                  <td className="py-3 px-3.5 text-zinc-500 font-normal">대기업 임원, 개원의, 파트너 변호사</td>
                </tr>
                <tr className="font-semibold">
                  <td className="py-3 px-3.5">상위 5%</td>
                  <td className="py-3 px-3.5">상위 5.0%</td>
                  <td className="py-3 px-3.5">약 1억 1,500만 원~</td>
                  <td className="py-3 px-3.5">약 720만 원/월</td>
                  <td className="py-3 px-3.5 text-zinc-500 font-normal">대기업 부장급, 금융권 책임자</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="py-3 px-3.5 font-bold text-blue-600">억대 연봉 컷</td>
                  <td className="py-3 px-3.5 font-bold text-blue-600">상위 6.7%</td>
                  <td className="py-3 px-3.5 font-bold text-blue-600">1억 원</td>
                  <td className="py-3 px-3.5 font-bold text-blue-600">약 657만 원/월 (추정)</td>
                  <td className="py-3 px-3.5 text-zinc-500">총 139만 명 진입 구간</td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-medium">상위 10% (10분위)</td>
                  <td className="py-3 px-3.5">상위 10.0%</td>
                  <td className="py-3 px-3.5">약 8,700만 원~</td>
                  <td className="py-3 px-3.5">약 570만 원/월</td>
                  <td className="py-3 px-3.5 text-zinc-500">대기업 과·차장급, 중견 핵심 인력</td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-medium">상위 20% (9분위)</td>
                  <td className="py-3 px-3.5">상위 20.0%</td>
                  <td className="py-3 px-3.5">약 6,400만 원~</td>
                  <td className="py-3 px-3.5">약 440만 원/월</td>
                  <td className="py-3 px-3.5 text-zinc-500">경력 7~10년 차 안정권</td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-medium">상위 30% (8분위)</td>
                  <td className="py-3 px-3.5">상위 30.0%</td>
                  <td className="py-3 px-3.5">약 4,900만 원~</td>
                  <td className="py-3 px-3.5">약 350만 원/월</td>
                  <td className="py-3 px-3.5 text-zinc-500">중견·강소기업 대리급</td>
                </tr>
                <tr className="bg-emerald-50/50">
                  <td className="py-3 px-3.5 font-bold text-emerald-800">전체 평균 (Average)</td>
                  <td className="py-3 px-3.5 font-bold text-emerald-800">상위 35.8%</td>
                  <td className="py-3 px-3.5 font-bold text-emerald-800">4,332만 원</td>
                  <td className="py-3 px-3.5 font-bold text-emerald-800">약 315만 원/월</td>
                  <td className="py-3 px-3.5 text-zinc-500">고소득자 포함 산술평균</td>
                </tr>
                <tr className="bg-amber-100/50">
                  <td className="py-3 px-3.5 font-black text-[#292520]">중위소득 (Median) ⭐</td>
                  <td className="py-3 px-3.5 font-black text-[#292520]">상위 50.0%</td>
                  <td className="py-3 px-3.5 font-black text-[#292520]">3,213만 원</td>
                  <td className="py-3 px-3.5 font-black text-[#292520]">약 240만 원/월</td>
                  <td className="py-3 px-3.5 text-[#292520] font-bold">대한민국 딱 절반의 위치</td>
                </tr>
                <tr>
                  <td className="py-3 px-3.5 font-medium">상위 70% (4분위)</td>
                  <td className="py-3 px-3.5">상위 70.0%</td>
                  <td className="py-3 px-3.5">약 2,150만 원~</td>
                  <td className="py-3 px-3.5">약 165만 원/월</td>
                  <td className="py-3 px-3.5 text-zinc-500">초년생, 단기직, 파트타임 포함</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-400">
            * 기준: 국세청 국세통계포털(TASIS) 최신 근로소득 연말정산 전수조사 (단위: 세전 총급여액). 비과세 소득 제외.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#292520] tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-sm font-black shrink-0">3</span>
            <span>억대 연봉자 139만 명 시대의 실체</span>
          </h2>

          <p>
            최근 통계에서 가장 눈에 띄는 변화는 <strong>총급여 1억 원을 넘는 근로자가 139만 명(6.7%)</strong>으로 역대 최고치를 기록했다는 점입니다.
          </p>

          <p>
            과거에는 &lsquo;억대 연봉&rsquo;이라 하면 극소수 대기업 임원이나 엘리트의 전유물로 여겨졌으나, 최근 대기업의 성과급 확대, IT 개발 직군 및 반도체·배터리 등 신성장 제조업의 연봉 인상으로 인해 <strong>근로자 15명 중 1명은 억대 연봉자</strong>인 세상이 되었습니다.
          </p>

          <p>
            하지만 억대 연봉자가 체감하는 현실은 또 다릅니다. 대한민국 소득세율은 누진세율 구조이기 때문에, 연봉 1억 원의 세전 월급은 약 833만 원이지만 <strong>이 사이트의 참고용 계산 기준 예상 월 실수령액은 약 657만 원</strong>입니다. 실제 금액은 다를 수 있습니다.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-[#292520] tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-sm font-black shrink-0">4</span>
            <span>삼촌의 현실 코멘트: 연봉 인상보다 중요한 세테크</span>
          </h2>

          <p>
            연봉 백분위를 높이는 것도 중요하지만, 더 중요한 것은 <strong>&lsquo;세후 통장에 남는 돈&rsquo;</strong>을 지키는 것입니다. 연봉이 오를수록 과세표준 구간이 뛰어올라 추가 인상분의 24%~35%가 세금으로 빠져나가기 때문입니다.
          </p>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-xs space-y-2">
            <h3 className="font-bold text-[#292520] flex items-center gap-2">
              <Icon icon="solar:shield-check-bold" className="text-[#c55232]" width="20" height="20" />
              <span>삼촌이 권하는 3가지 실천 행동</span>
            </h3>
            <ul className="text-sm space-y-1.5 text-zinc-600">
              <li>• <strong>연봉 협상 시</strong>: 단순 총액뿐만 아니라 비과세 식대(월 20만 원 한도)나 복지포인트 등 비과세 항목 확대를 체크하세요.</li>
              <li>• <strong>절세 삼총사</strong>: IRP(개인형 퇴직연금), 연금저축, 청년도약계좌 등으로 연말정산 환급금을 극대화하세요.</li>
              <li>• <strong>실수령액 사전 확인</strong>: 이직할 회사의 연봉을 제안받았다면 아래 계산기로 실제 통장 입금액을 1원 단위까지 확인해 보세요.</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Official Sources & Methodology */}
        <section className="p-5 sm:p-6 bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-3 text-xs text-zinc-600">
          <div className="flex items-center gap-2 font-bold text-zinc-800 text-sm">
            <Icon icon="solar:document-text-bold-duotone" width="18" height="18" className="text-zinc-600" />
            <span>데이터 출처 및 통계 산출 기준 안내</span>
          </div>
          <p className="leading-relaxed">
            본 아티클과 상위 백분위 계산기는 공공데이터의 객관성과 신뢰성을 최우선으로 하여 제작되었습니다:
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>국세청 국세통계포털(TASIS)</strong>: 최신 귀속 근로소득 연말정산 신고 현황 (2,085만 명 전수조사 원자료)</li>
            <li><strong>통계청(KOSIS) 국가통계포털</strong>: 임금근로일자리 소득(보수) 결과 및 소득 10분위 통계</li>
            <li><strong>고용노동부</strong>: 사업체노동력조사 및 고용형태별 근로실태조사</li>
          </ul>
          <p className="text-[11px] text-zinc-400">
            ※ 참고: 본 통계는 연말정산을 신고한 모든 근로자(중도 입·퇴사자, 파트타임 근로자 포함)를 포괄하므로, 1년 이상 계속 근속한 전일제 정규직만을 대상으로 한 통계와는 수치상 다소 차이가 있을 수 있습니다.
          </p>
        </section>
      </div>

      {/* ========================================================
          BOTTOM CONVERSION BANNER: 연봉 계산기로 유입 유도
          ======================================================== */}
      <div className="my-12 p-6 sm:p-8 bg-gradient-to-br from-[#292520] to-[#3d3832] text-white rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="px-2.5 py-0.5 rounded-full bg-[#c55232] text-white text-[11px] font-bold">
            1초 자동 계산
          </span>
          <h3 className="text-xl font-black">
            내 연봉의 정확한 세후 월급이 궁금하다면?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300">
            2026년 보험료율과 소득세 추정치를 적용한 참고용 실수령액 계산기
          </p>
        </div>
        <Link
          href="/salary-calculator"
          className="px-6 py-3.5 rounded-xl bg-white text-[#292520] font-black text-sm hover:bg-zinc-100 transition-all shrink-0 flex items-center gap-2 shadow-md"
        >
          <span>연봉 실수령액 계산하기</span>
          <Icon icon="solar:arrow-right-linear" width="16" height="16" />
        </Link>
      </div>

      {/* Recommended Articles Grid */}
      <section className="pt-8 border-t border-zinc-200 space-y-4">
        <h3 className="text-lg font-bold text-[#292520]">
          삼촌 매거진 다른 추천 글
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/guide/salary-table-2026"
            className="p-4 rounded-2xl border border-zinc-200 bg-white hover:border-[#c55232] transition-all group"
          >
            <span className="text-xs font-bold text-[#c55232]">근로·세무</span>
            <h4 className="font-extrabold text-sm text-[#292520] group-hover:text-[#c55232] transition-colors mt-1">
              2026 연봉 실수령액표 총정리 (2,400만~1억 원)
            </h4>
            <p className="text-xs text-zinc-500 mt-1">
              연봉대별 4대 보험 공제액과 진짜 통장 입금액 한눈에 보기
            </p>
          </Link>

          <Link
            href="/guide/severance-pay-guide-2026"
            className="p-4 rounded-2xl border border-zinc-200 bg-white hover:border-[#c55232] transition-all group"
          >
            <span className="text-xs font-bold text-[#c55232]">노무 상식</span>
            <h4 className="font-extrabold text-sm text-[#292520] group-hover:text-[#c55232] transition-colors mt-1">
              2026 퇴직금 지급기준 및 세금 감면 계산법
            </h4>
            <p className="text-xs text-zinc-500 mt-1">
              1년 미만 퇴직금, 주 15시간 미만 알바생도 받을 수 있을까?
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}
