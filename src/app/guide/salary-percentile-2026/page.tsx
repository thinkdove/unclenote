'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';

// 국세청 「근로소득 백분위(천분위) 자료」 2024년 귀속·2025년 신고분.
// 각 경계는 인접한 두 구간의 평균 총급여를 중간값으로 놓은 추정치(단위: 만 원)다.
// 원본에는 개인별 급여나 정확한 백분위 경계가 없다.
const ESTIMATED_BOUNDARIES = [
  { top: 1, salary: 18642 },
  { top: 3, salary: 13917 },
  { top: 5, salary: 11560 },
  { top: 7, salary: 10190 },
  { top: 8, salary: 9712 },
  { top: 10, salary: 8944 },
  { top: 15, salary: 7502 },
  { top: 20, salary: 6443 },
  { top: 25, salary: 5655 },
  { top: 30, salary: 5005 },
  { top: 35, salary: 4490 },
  { top: 40, salary: 4061 },
  { top: 45, salary: 3694 },
  { top: 50, salary: 3388 },
  { top: 55, salary: 3092 },
  { top: 60, salary: 2825 },
  { top: 65, salary: 2570 },
  { top: 70, salary: 2348 },
  { top: 75, salary: 1965 },
  { top: 80, salary: 1542 },
  { top: 85, salary: 1124 },
  { top: 90, salary: 730 },
  { top: 95, salary: 344 },
  { top: 100, salary: 0 },
] as const;

const WORKERS = 21_078_535;
const AVERAGE = 4475;
const MEDIAN_ESTIMATE = 3388;
const SOURCE_URL = 'https://www.data.go.kr/data/15082063/fileData.do';

function estimateTopPercent(salary: number): number {
  if (salary <= 0) return 100;
  if (salary >= ESTIMATED_BOUNDARIES[0].salary) return 1;

  for (let i = 0; i < ESTIMATED_BOUNDARIES.length - 1; i++) {
    const high = ESTIMATED_BOUNDARIES[i];
    const low = ESTIMATED_BOUNDARIES[i + 1];
    if (salary <= high.salary && salary >= low.salary) {
      const share = (high.salary - salary) / (high.salary - low.salary);
      return Math.round((high.top + share * (low.top - high.top)) * 10) / 10;
    }
  }

  return 100;
}

const examples = [
  { label: '상위 1%', salary: 18642 },
  { label: '상위 5%', salary: 11560 },
  { label: '상위 10%', salary: 8944 },
  { label: '상위 20%', salary: 6443 },
  { label: '중간값(상위 50%)', salary: MEDIAN_ESTIMATE },
];

const faqs = [
  {
    question: '이 계산기는 어떤 연도 자료를 사용하나요?',
    answer: '국세청이 공개한 2024년 귀속 근로소득의 2025년 신고 자료를 사용합니다. 2026년에 받는 급여의 분포를 뜻하지 않습니다.',
  },
  {
    question: '상위 10%의 정확한 연봉 기준이 8,944만 원인가요?',
    answer: '아닙니다. 원본은 구간별 인원과 총급여 합계만 제공하며 개인별 급여나 경계값을 공개하지 않습니다. 약 8,944만 원은 인접 구간 평균을 이용한 추정값입니다.',
  },
  {
    question: '평균과 중간값은 왜 다른가요?',
    answer: '평균 약 4,475만 원은 전체 총급여를 전체 신고 인원으로 나눈 값입니다. 중간값 약 3,388만 원은 구간별 평균으로 추정한 50% 경계이며 공식 중위급여 발표값이 아닙니다.',
  },
  {
    question: '내 연봉과 비교할 때 무엇을 입력해야 하나요?',
    answer: '세후 실수령액이나 과세표준이 아닌 연간 세전 총급여를 입력하세요. 비과세 항목과 개인별 신고 조건 때문에 실제 비교 대상과 차이가 있을 수 있습니다.',
  },
];

function useCountUpOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let inView = false;
    setProgress(0);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView) {
        inView = true;
        cancelAnimationFrame(frame);
        setProgress(0);
        const start = performance.now();
        const tick = (now: number) => {
          const next = Math.min((now - start) / 2200, 1);
          setProgress(next);
          if (next < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && inView) {
        inView = false;
        cancelAnimationFrame(frame);
        setProgress(0);
      }
    }, { threshold: 0.2 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

export default function SalaryPercentileGuidePage() {
  const inputId = useId();
  const [salary, setSalary] = useState(5000);
  const { ref: summaryRef, progress: summaryProgress } = useCountUpOnView<HTMLElement>();
  const { ref: exampleTableRef, progress: exampleTableProgress } = useCountUpOnView<HTMLDivElement>();
  const top = estimateTopPercent(salary);
  const rank = salary >= ESTIMATED_BOUNDARIES[0].salary ? '상위 1% 이내' : `상위 약 ${top}%`;
  const rangeProgress = Math.min(100, Math.max(0, ((salary - 1000) / 19000) * 100));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '내 연봉은 상위 몇 %? 국세청 2024년 귀속 통계로 추정하기',
    description: '국세청의 2024년 귀속 근로소득 백분위 자료를 바탕으로 총급여 위치를 참고용으로 추정합니다.',
    datePublished: '2026-09-22',
    dateModified: '2026-09-23',
    author: { '@type': 'Organization', name: '삼촌노트', url: 'https://unclenote.com' },
    publisher: { '@type': 'Organization', name: '삼촌노트', url: 'https://unclenote.com' },
    mainEntityOfPage: 'https://unclenote.com/guide/salary-percentile-2026',
    isBasedOn: SOURCE_URL,
  };

  return (
    <article className="max-w-[760px] mx-auto py-6 px-3 sm:px-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <nav aria-label="현재 위치" className="mb-6 text-xs font-semibold text-zinc-500">
        <Link href="/" className="hover:text-[#c55232]">홈</Link> <span aria-hidden="true">/</span>{' '}
        <Link href="/guide" className="hover:text-[#c55232]">생활 가이드</Link> <span aria-hidden="true">/</span> 연봉 통계
      </nav>

      <header className="mb-8">
        <div className="relative overflow-hidden rounded-[1.7rem] bg-[#292520] px-6 py-8 text-white sm:px-9 sm:py-10">
          <div className="pointer-events-none absolute bottom-8 right-5 top-24 hidden w-[43%] overflow-hidden rounded-2xl md:block" aria-hidden="true">
            <Image src="/images/salary-percentile-cover-preview.png" alt="" fill sizes="320px" className="object-cover object-[58%_center]" priority />
          </div>
          <div className="relative z-10 border-b border-white/20 pb-5 text-xs font-bold tracking-wide text-[#f0a791]">2024년 귀속 국세청 통계 · 2025년 신고분</div>
          <div className="relative z-10 py-10 md:max-w-[57%]">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#f0a791]">SALARY DATA</p>
            <h1 className="break-keep text-balance text-[2rem] font-extrabold leading-[1.25] tracking-tight text-white sm:text-[2.65rem]">내 연봉은<br /><span className="text-[#f0a791]">상위 몇 %</span>일까?</h1>
            <p className="mt-5 break-keep text-sm leading-relaxed text-[#e9ddd2] sm:text-base">약 2,108만 명의 신고 통계로 내 위치를 가늠해 봅니다.</p>
          </div>
          <p className="relative z-10 border-t border-white/20 pt-5 text-xs text-[#d3c6bb]">자료 기준: 2024년 귀속 · 글 수정: 2026.09.23</p>
        </div>
        <p className="editorial-lead mt-7">국세청 근로소득 신고자 약 2,108만 명의 공개 자료로 내 세전 총급여가 어느 위치인지 살펴보세요. 표시되는 백분위와 연봉 경계는 정확한 개인 순위가 아닌 <strong>참고용 추정치</strong>입니다.</p>
      </header>

      <section ref={summaryRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10" aria-label="통계 요약">
        <div className="rounded-2xl border border-[#e8e1d8] bg-white p-5">
          <p className="text-sm text-zinc-500">신고 인원</p>
          <p className="text-2xl font-extrabold text-[#292520] mt-1 tabular-nums"><span className="sr-only">약 2,108만 명</span><span aria-hidden="true">약 {Math.round(2108 * summaryProgress).toLocaleString()}만 명</span></p>
          <p className="text-xs text-zinc-500 mt-2 tabular-nums"><span className="sr-only">정확히 {WORKERS.toLocaleString()}명</span><span aria-hidden="true">정확히 {Math.round(WORKERS * summaryProgress).toLocaleString()}명</span></p>
        </div>
        <div className="rounded-2xl border border-[#e8e1d8] bg-white p-5">
          <p className="text-sm text-zinc-500">평균 총급여</p>
          <p className="text-2xl font-extrabold text-[#292520] mt-1 tabular-nums"><span className="sr-only">약 {AVERAGE.toLocaleString()}만 원</span><span aria-hidden="true">약 {Math.round(AVERAGE * summaryProgress).toLocaleString()}만 원</span></p>
          <p className="text-xs text-zinc-500 mt-2">총급여 합계 ÷ 신고 인원</p>
        </div>
        <div className="rounded-2xl border border-[#e8e1d8] bg-white p-5">
          <p className="text-sm text-zinc-500">50% 경계 추정</p>
          <p className="text-2xl font-extrabold text-[#c55232] mt-1 tabular-nums"><span className="sr-only">약 {MEDIAN_ESTIMATE.toLocaleString()}만 원</span><span aria-hidden="true">약 {Math.round(MEDIAN_ESTIMATE * summaryProgress).toLocaleString()}만 원</span></p>
          <p className="text-xs text-zinc-500 mt-2">공식 중위값이 아닌 추정</p>
        </div>
      </section>

      <section className="rounded-3xl border border-[#e8e1d8] bg-white p-5 sm:p-8 mb-10 shadow-[0_10px_35px_rgba(41,37,32,0.04)]" aria-labelledby="calculator-title">
        <div className="mb-6">
          <p className="editorial-eyebrow">INTERACTIVE TOOL</p>
          <h2 id="calculator-title" className="editorial-h2 mt-2">내 총급여로 위치 가늠하기</h2>
          <p className="editorial-desc mt-2">금액을 입력하거나 바를 드래그해 보세요. 2024년 귀속 소득 분포에 대입한 추정값입니다.</p>
        </div>
        <label htmlFor={inputId} className="block font-bold text-sm mb-2">연간 세전 총급여</label>
        <div className="editorial-input-box w-full max-w-xs mb-5">
          <input id={inputId} type="number" inputMode="numeric" min="0" max="100000" step="100" value={salary} onChange={(event) => setSalary(Math.max(0, Number(event.target.value) || 0))} className="text-right font-black text-xl text-[#292520]" />
          <span className="input-unit text-base font-bold text-zinc-700">만 원</span>
        </div>
        <input type="range" aria-label="연간 세전 총급여 조절" min="1000" max="20000" step="100" value={salary} onChange={(event) => setSalary(Number(event.target.value))} style={{ '--salary-progress': `${rangeProgress}%` } as CSSProperties} className="salary-range w-full cursor-pointer" />
        <div className="flex justify-between text-xs text-zinc-500 mt-2"><span>1,000만</span><span>1억</span><span>2억</span></div>
        <div className="flex flex-wrap gap-2 mt-5" aria-label="빠른 금액 선택">
          {[3388, 4475, 5000, 10000, 18642].map((value) => (
            <button key={value} type="button" onClick={() => setSalary(value)} className="rounded-full border border-[#e8e1d8] px-3 py-1.5 text-xs font-semibold hover:border-[#c55232] hover:text-[#c55232] transition-colors">{value.toLocaleString()}만</button>
          ))}
        </div>
        <div className="mt-7 rounded-2xl bg-[#292520] p-5 sm:p-6 text-white" aria-live="polite">
          <p className="text-sm text-zinc-300">2024년 귀속 신고자 중 예상 위치</p>
          <p className="text-3xl sm:text-4xl font-black text-[#f5b08c] mt-2">{rank}</p>
          <p className="text-sm text-zinc-300 mt-3">평균 총급여 대비 {salary >= AVERAGE ? '+' : ''}{(salary - AVERAGE).toLocaleString()}만 원</p>
          <p className="text-xs text-zinc-400 mt-4">구간 평균으로 보간한 대략적인 위치입니다. 정확한 순위·올해의 소득 분포·세후 실수령액을 뜻하지 않습니다.</p>
        </div>
      </section>

      <div className="space-y-10 text-[#292520] leading-[1.8]">
        <section className="reading-section">
          <h2 className="editorial-h2 mb-4">평균 4,475만 원과 중간값 추정 3,388만 원이 다른 이유</h2>
          <p className="editorial-body">평균은 전체 총급여액 9,432,577억 원을 신고 인원 21,078,535명으로 나눈 값입니다. 높은 급여를 받는 소수의 금액도 모두 합산하므로, 평균만으로 &ldquo;보통 사람&rdquo;의 급여를 설명하기는 어렵습니다. 중간값은 사람들을 총급여 순서로 세웠을 때 가운데에 있는 금액을 뜻합니다.</p>
          <p className="editorial-body mt-4">다만 국세청 원본은 사람마다 받은 급여를 공개하지 않습니다. 이 페이지의 3,388만 원은 상위 50%와 다음 구간의 평균값을 이용해 추정한 경계입니다. 따라서 공식 중위 총급여나 정밀한 개인 순위로 인용하면 안 됩니다.</p>
        </section>

        <section className="reading-section">
          <h2 className="editorial-h2 mb-3">상위 구간별 연봉은 어느 정도일까?</h2>
          <p className="editorial-body mb-5">아래 금액은 2024년 귀속 자료의 <strong>인접 구간별 평균 총급여</strong> 사이를 중간값으로 잡은 참고 경계입니다. 실제 경계는 원본 자료만으로 알 수 없습니다.</p>
          <div ref={exampleTableRef} className="overflow-x-auto rounded-2xl border border-[#e8e1d8]">
            <table className="w-full text-left text-sm min-w-[430px]">
              <thead className="bg-[#292520] text-white"><tr><th scope="col" className="p-3">예상 위치</th><th scope="col" className="p-3">경계 추정 연봉(세전 총급여)</th></tr></thead>
              <tbody className="divide-y divide-[#e8e1d8] bg-white">
                {examples.map((row) => <tr key={row.label}><th scope="row" className="p-3 font-semibold">{row.label}</th><td className="p-3 tabular-nums"><span className="sr-only">약 {row.salary.toLocaleString()}만 원</span><span aria-hidden="true">약 {Math.round(row.salary * exampleTableProgress).toLocaleString()}만 원</span></td></tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <section className="reading-section">
          <h2 className="editorial-h2 mb-4">자료와 계산 방법</h2>
          <p className="editorial-body">출처는 국세청이 공공데이터포털에 공개한 <a className="underline text-[#a74126]" href={SOURCE_URL} target="_blank" rel="noopener noreferrer">근로소득 백분위(천분위) 자료</a>입니다. 데이터는 2024년 소득에 대한 2025년 신고분이며, 2026년의 실시간 연봉 통계가 아닙니다. 1% 미만은 0.1% 간격, 그 밖의 구간은 1% 간격으로 인원과 총급여 합계를 제공합니다.</p>
          <ol className="list-decimal pl-5 mt-4 space-y-2 text-sm text-zinc-700">
            <li>각 구간의 총급여 합계를 해당 인원으로 나눠 구간 평균을 구했습니다.</li>
            <li>인접한 두 구간의 평균을 다시 평균해 백분위 경계를 추정했습니다.</li>
            <li>입력 금액이 두 경계 사이에 있으면 직선으로 보간해 예상 백분위를 표시합니다.</li>
          </ol>
          <p className="mt-4 text-sm text-zinc-600">구간 내부의 소득 분포를 알 수 없으므로 이 방법은 근사치에 불과합니다. 특히 초고소득 구간이나 단기 근무·중도 입퇴사자의 비교에는 오차가 클 수 있습니다. 세후 월급은 <Link href="/salary-calculator" className="underline text-[#a74126]">연봉 실수령액 계산기</Link>에서 별도로 살펴보세요.</p>
        </section>

        <section className="reading-section">
          <h2 className="editorial-h2 mb-4">자주 묻는 질문</h2>
          <div className="space-y-3">
            {faqs.map((faq) => <details key={faq.question} className="rounded-xl border border-[#e8e1d8] bg-white p-4"><summary className="cursor-pointer font-bold text-sm">{faq.question}</summary><p className="pt-3 text-sm text-zinc-600">{faq.answer}</p></details>)}
          </div>
        </section>
      </div>

      <div className="reading-footer-cta salary-guide-cta">
        <p className="essay-cta-kicker">읽었다면, 이제 내 월급으로</p>
        <h2>세후 월급은 얼마일까?</h2>
        <p className="essay-cta-description">연봉과 비과세 금액을 입력하면 예상 월 실수령액을 바로 확인할 수 있습니다.</p>
        <Link href="/salary-calculator" className="essay-calculator-link">
          <span>내 실수령액 계산하기</span>
          <Icon icon="solar:arrow-right-linear" width="20" height="20" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
