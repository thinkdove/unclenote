import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Icon } from "@iconify/react";

const salaryRows = [
  { annual: "3,000만", gross: "250.0만", insurance: "22.3만", tax: "3.0만", net: "224.6만", highlight: false },
  { annual: "3,500만", gross: "291.7만", insurance: "26.4만", tax: "4.8만", net: "260.4만", highlight: false },
  { annual: "4,000만", gross: "333.3만", insurance: "30.4만", tax: "9.2만", net: "293.7만", highlight: false },
  { annual: "4,500만", gross: "375.0만", insurance: "34.5만", tax: "14.4만", net: "326.1만", highlight: false },
  { annual: "5,000만", gross: "416.7만", insurance: "38.5만", tax: "20.1만", net: "358.0만", highlight: true },
  { annual: "6,000만", gross: "500.0만", insurance: "46.6만", tax: "33.1만", net: "420.3만", highlight: false },
  { annual: "7,000만", gross: "583.3만", insurance: "54.7만", tax: "45.3만", net: "483.3만", highlight: false },
  { annual: "8,000만", gross: "666.7만", insurance: "62.8만", tax: "63.0만", net: "540.9만", highlight: false },
  { annual: "9,000만", gross: "750.0만", insurance: "67.6만", tax: "83.7만", net: "598.7만", highlight: false },
  { annual: "1억", gross: "833.3만", insurance: "71.7만", tax: "104.6만", net: "657.0만", highlight: false },
];

export const metadata: Metadata = {
  title: "2026년 연봉 실수령액 표 | 3,000만~1억 구간별 월급 & 공제액 분석",
  description: "2026년 연봉 3,000만 원부터 1억 원까지 월 실수령액 추정치를 정리했습니다. 실제 원천징수액은 급여명세서에서 확인하세요.",
  alternates: { canonical: "https://unclenote.com/guide/salary-table-2026" },
  openGraph: {
    siteName: '삼촌노트',
    title: "2026년 연봉 실수령액 표 | 3,000만~1억 구간별 월급",
    description: "연봉 협상 전에 참고하는 2026년 예상 월 실수령액과 보험료 분석.",
    url: "https://unclenote.com/guide/salary-table-2026",
    images: [{ url: "/images/salary-guide-thumbnail.jpg", width: 1200, height: 675, alt: "2026 연봉 실수령액 안내" }],
  },
};

export default function SalaryGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "2026년 연봉 실수령액 표 | 3,000만~1억 구간별 월급 & 공제액 분석",
    description: metadata.description,
    datePublished: "2026-09-22",
    dateModified: "2026-09-22",
    author: { "@type": "Organization", name: "삼촌노트" },
    publisher: { "@type": "Organization", name: "삼촌노트" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "연봉 5,000만 원이면 실제 월 실수령액은 얼마인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "월 식대 20만 원 비과세, 부양가족 본인 1인 기준 월 세전 급여는 약 416.7만 원이며, 이 페이지의 참고용 계산 기준 예상 월 실수령액은 약 358.0만 원입니다. 실제 금액은 다를 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "식대는 모든 직장인이 비과세 혜택을 받나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "회사가 구내식당 등 식사를 별도 제공하지 않고 식대 명목으로 지급하는 경우, 월 20만 원 한도 내에서 비과세 처리가 가능합니다. 근로계약서와 급여명세서를 확인하세요.",
        },
      },
      {
        "@type": "Question",
        name: "가장 정확한 내 실수령액은 어떻게 확인하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "삼촌노트 연봉 실수령액 계산기에서 본인의 부양가족 수와 비과세액을 적용해 즉시 모의 계산해 볼 수 있습니다.",
        },
      },
    ],
  };

  return (
    <article className="salary-guide overflow-hidden pb-12">
      <Script
        id="salary-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="salary-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Header (Editorial Warm Canvas) */}
      <header className="mb-20 grid gap-10 border-b border-zinc-200/70 pb-14 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
        <div className="break-keep-all">
          <nav className="mb-8 flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <Link href="/" className="hover:text-[#c55232] transition-colors">홈</Link>
            <Icon icon="solar:alt-arrow-right-linear" />
            <span>생활 가이드</span>
            <Icon icon="solar:alt-arrow-right-linear" />
            <span className="text-zinc-700">연봉 실수령액</span>
          </nav>
          
          <p className="mb-5 inline-flex rounded-full bg-[#c55232]/10 px-3.5 py-1.5 text-[11px] font-bold tracking-[.14em] text-[#a74126]">
            2026 SALARY GUIDE
          </p>
          
          <h1 className="max-w-3xl text-[2.6rem] font-extrabold leading-[1.16] tracking-[-.055em] text-zinc-950 sm:text-5xl lg:text-[4.2rem]">
            연봉은 숫자고,<br />
            <span className="font-serif italic font-medium text-[#c55232]">실수령액</span>은 생활입니다.
          </h1>
          
          <p className="mt-7 max-w-xl text-base leading-8 text-zinc-600 sm:text-lg">
            3,000만 원부터 1억 원까지. 통장에 실제로 찍히는 진짜 월급과 빠져나가는 4대 보험·세금 공제액을 한눈에 정리했습니다.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-zinc-500">
            <span className="flex items-center gap-2">
              <Icon icon="solar:calendar-mark-bold-duotone" className="text-[#c55232]" />
              2026.09.22 업데이트
            </span>
            <span className="flex items-center gap-2">
              <Icon icon="solar:clock-circle-bold-duotone" className="text-[#c55232]" />
              읽는 시간 4분
            </span>
          </div>
        </div>

        {/* Hero Artwork Frame */}
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-[#ede8df] p-2 shadow-[0_25px_60px_-32px_rgba(67,45,34,.38)]">
          <Image
            src="/images/salary-guide-thumbnail.jpg"
            alt="2026 연봉 실수령액 안내"
            fill
            priority
            className="rounded-[1.55rem] object-cover"
          />
          <div className="absolute bottom-5 left-5 rounded-full bg-[#fdfbf7]/90 backdrop-blur-md px-4 py-2 text-xs font-bold text-zinc-800 shadow-sm">
            기준일 2026.09
          </div>
        </div>
      </header>

      {/* 2. Key Stats Strip */}
      <section className="mb-24 grid gap-6 border-y border-zinc-200/80 py-8 sm:grid-cols-3">
        {[
          { number: "4.75%", label: "국민연금 근로자 부담", detail: "2026년 7월 기준 상한 659만 원" },
          { number: "약 4.0674%", label: "건강·장기요양 합산", detail: "건보 3.595% + 장기요양 약 0.4724%" },
          { number: "20만 원", label: "월 식대 비과세 한도", detail: "연간 240만 원 과세 제외 혜택" },
        ].map((item, idx) => (
          <div key={idx} className="border-zinc-200/80 px-1 sm:border-r sm:px-7 sm:last:border-0">
            <p className="text-3xl sm:text-4xl font-extrabold tracking-[-.05em] text-zinc-950">{item.number}</p>
            <p className="mt-2 text-sm font-bold text-zinc-800">{item.label}</p>
            <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
          </div>
        ))}
      </section>

      {/* 3. Quick Answer with Dark Contrast Bezel Card */}
      <section className="mb-24 grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div className="break-keep-all">
          <p className="text-xs font-bold tracking-[.16em] text-[#c55232]">QUICK ANSWER</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-snug tracking-[-.045em] text-zinc-950 sm:text-4xl">
            내 연봉의 진짜 월급은<br />얼마일까요?
          </h2>
          <p className="mt-5 max-w-md leading-7 text-zinc-600">
            부양가족 본인 1명, 퇴직금 별도, 월 식대 20만 원 비과세를 가정한 표준 시뮬레이션입니다.
          </p>
          <Link
            href="/salary-calculator"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#c55232] py-2.5 pl-6 pr-2 text-sm font-bold text-white shadow-[0_14px_30px_-15px_rgba(197,82,50,.7)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[.98]"
          >
            <span>내 조건으로 계산하기</span>
            <span className="grid size-8 place-items-center rounded-full bg-white/20">
              <Icon icon="solar:arrow-right-linear" />
            </span>
          </Link>
        </div>

        {/* Contrast Bezel Highlight Card */}
        <div className="rounded-[2rem] bg-[#292520] p-2 shadow-[0_30px_70px_-35px_rgba(41,37,32,.7)]">
          <div className="rounded-[1.6rem] border border-white/10 bg-[#332e29] p-7 text-[#fdfbf7] sm:p-9">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold tracking-[.15em] text-[#e8b3a2]">EXAMPLE</p>
                <h3 className="mt-2 text-xl font-bold">연봉 5,000만 원 기준</h3>
              </div>
              <Icon icon="solar:wallet-money-bold-duotone" width="38" className="text-[#e8b3a2]" />
            </div>
            
            <p className="mt-8 text-sm text-[#d8d0c7]">예상 월 실수령액</p>
            <p className="mt-1 text-5xl font-extrabold tracking-[-.07em] text-white">
              358.0<span className="ml-1.5 text-xl font-normal text-[#d8d0c7]">만 원</span>
            </p>
            
            <div className="mt-8 grid grid-cols-2 border-t border-white/10 pt-5 text-sm">
              <div>
                <p className="text-[#b9aea4] text-xs font-medium">4대 보험 합계</p>
                <p className="mt-1 font-bold text-white">약 38.5만 원</p>
              </div>
              <div className="border-l border-white/10 pl-5">
                <p className="text-[#b9aea4] text-xs font-medium">소득세·지방세</p>
                <p className="mt-1 font-bold text-white">약 20.1만 원</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Salary Table Section */}
      <section className="mb-24">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold tracking-[.16em] text-[#c55232]">SALARY TABLE</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-zinc-950 sm:text-4xl">
              연봉 구간별 예상 실수령액
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-5 text-zinc-500">
            2026년 9월 기준, 식대 비과세 월 20만 원·부양가족 1명으로 계산한 참고용 추정치입니다. 금액은 만 원 단위로 반올림했으며 실제 원천징수액은 다를 수 있습니다.
          </p>
        </div>

        <div className="overflow-x-auto rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_18px_40px_-30px_rgba(66,51,41,.2)]">
          <table className="min-w-[650px] w-full text-left text-sm">
            <thead className="bg-[#f3efe8] text-xs font-bold text-zinc-600">
              <tr>
                <th className="px-6 py-5">세전 연봉</th>
                <th className="px-5 py-5">월 세전 급여</th>
                <th className="px-5 py-5">4대 보험료</th>
                <th className="px-5 py-5">소득·지방세</th>
                <th className="px-6 py-5 text-right text-[#a74126]">예상 월 실수령액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {salaryRows.map((row) => (
                <tr key={row.annual} className={row.highlight ? "bg-[#fdf5f1]" : "hover:bg-zinc-50/50 transition-colors"}>
                  <td className="px-6 py-5 font-extrabold text-zinc-900">{row.annual} 원</td>
                  <td className="px-5 py-5 text-zinc-600">{row.gross}</td>
                  <td className="px-5 py-5 text-zinc-600">{row.insurance}</td>
                  <td className="px-5 py-5 text-zinc-600">{row.tax}</td>
                  <td className="px-6 py-5 text-right text-lg font-extrabold tracking-tight text-[#a74126]">
                    {row.net} 원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Editorial Breakdown: Why It Changes */}
      <section className="mb-24 grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div className="break-keep-all">
          <p className="text-xs font-bold tracking-[.16em] text-[#c55232]">WHY IT CHANGES</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-snug tracking-[-.045em] text-zinc-950 sm:text-4xl">
            같은 1,000만 원 인상이라도<br />통장에 남는 금액은 다릅니다.
          </h2>
          <p className="mt-6 max-w-xl leading-8 text-zinc-600">
            연봉이 오를수록 누진 소득세율과 사회보험료가 증가합니다. 다만 국민연금은 기준소득월액 상한선(2026년 7월 기준 659만 원)이 있어 고소득 구간부터 공제 증가 폭이 둔화됩니다.
          </p>
        </div>

        <div className="space-y-3">
          {[
            { num: "01", title: "국민연금 상한액", desc: "2026년 근로자 부담분 4.75%가 적용되며, 7월 기준 상한소득월액은 659만 원입니다." },
            { num: "02", title: "건강보험 & 장기요양", desc: "상한선이 사실상 매우 높아 연봉이 늘어날수록 비례하여 공제액이 커집니다." },
            { num: "03", title: "누진 소득세율", desc: "소득 구간에 따라 6%부터 최대 40% 이상까지 누진세율이 적용되어 실수령액 차이를 만듭니다." },
          ].map((item) => (
            <div key={item.num} className="flex gap-5 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-2xs">
              <span className="font-serif text-2xl italic text-[#c55232]">{item.num}</span>
              <div>
                <h3 className="font-bold text-zinc-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Tax-Free Meal Allowance (Oat Muted Panel) */}
      <section className="mb-24 rounded-[2rem] bg-[#e8e3da] p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="break-keep-all">
            <p className="text-xs font-bold tracking-[.16em] text-[#a74126]">TAX-FREE MEAL ALLOWANCE</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-snug tracking-[-.045em] text-zinc-950 sm:text-4xl">
              식대 20만 원 비과세를<br />그냥 넘기지 마세요.
            </h2>
          </div>
          <div>
            <p className="leading-8 text-zinc-700">
              식사를 제공받지 않는 근로자에게 지급하는 식대는 월 20만 원까지 전액 비과세가 적용됩니다. 연간 240만 원의 과세 대상 급여가 줄어들어 매월 약 4~5만 원 이상의 세금 및 4대 보험료 절감 효과가 발생합니다.
            </p>
            <a
              href="https://www.hometax.go.kr"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#a74126] hover:text-zinc-950 transition-colors"
            >
              <span>국세청 비과세 급여 기준 확인</span>
              <Icon icon="solar:arrow-right-up-linear" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section (Accordion Details) */}
      <section className="mb-24 max-w-3xl">
        <p className="text-xs font-bold tracking-[.16em] text-[#c55232]">FAQ</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em] text-zinc-950 sm:text-4xl">
          자주 묻는 질문
        </h2>
        
        <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
          {[
            {
              q: "연봉 5,000만 원이면 월 실수령액은 정확히 얼마인가요?",
              a: "부양가족 본인 1명, 퇴직금 별도, 식대 20만 원 비과세 기준 참고용 추정치는 약 358.0만 원입니다. 실제 원천징수 방식에 따라 차이가 있을 수 있습니다.",
            },
            {
              q: "퇴직금 별도와 퇴직금 포함은 실수령액에 얼마나 차이가 나나요?",
              a: "연봉 5,000만 원 기준 퇴직금 별도는 12분할(월 세전 416.7만 원)이지만, 포함은 13분할(월 세전 약 384.6만 원)로 계산되어 매월 약 25만 원 이상의 실수령액 차이가 납니다.",
            },
            {
              q: "식대 비과세는 어떻게 적용받나요?",
              a: "회사가 식사를 현물로 제공하지 않는 조건에서 급여 명세서상 식대 항목으로 분리 지급되어야 비과세 혜택이 적용됩니다.",
            },
          ].map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold text-zinc-900">
                <span>{item.q}</span>
                <Icon icon="solar:add-circle-linear" className="shrink-0 text-xl text-[#c55232] transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-2xl pt-4 text-sm leading-7 text-zinc-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 8. Final CTA (Dark Card with Glow) */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#292520] px-7 py-12 text-center text-[#fdfbf7] sm:px-12 sm:py-16 shadow-[0_30px_70px_-35px_rgba(41,37,32,.7)]">
        <div className="absolute -right-16 -top-20 size-64 rounded-full bg-[#c55232]/30 blur-3xl pointer-events-none" />
        <div className="relative">
          <p className="text-xs font-bold tracking-[.18em] text-[#e8b3a2]">YOUR NUMBER, NOT AN AVERAGE</p>
          <h2 className="mx-auto mt-4 max-w-2xl break-keep-all text-3xl font-extrabold leading-snug tracking-[-.045em] sm:text-4xl text-white">
            부양가족과 비과세액까지<br />
            내 진짜 조건으로 확인하세요.
          </h2>
          <Link
            href="/salary-calculator"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#fdfbf7] py-2 pl-6 pr-2 text-sm font-bold text-zinc-900 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.02] active:scale-[.98]"
          >
            <span>연봉 실수령액 계산기</span>
            <span className="grid size-8 place-items-center rounded-full bg-zinc-900 text-white">
              <Icon icon="solar:arrow-right-linear" />
            </span>
          </Link>
        </div>
      </section>

      {/* 9. Footer References (E-E-A-T) */}
      <footer className="mt-12 border-t border-zinc-200/80 pt-6 text-xs leading-6 text-zinc-500">
        <p>
          기준일: 2026년 9월 22일. 본 안내는 일반적인 급여 계산 정보를 제공하며, 법적·세무 자문을 대신하지 않습니다.
        </p>
        <div className="mt-2 flex flex-wrap gap-4">
          <span>공식 출처:</span>
          <a className="underline hover:text-[#a74126]" href="https://www.hometax.go.kr" target="_blank" rel="noreferrer">국세청 홈택스</a>
          <a className="underline hover:text-[#a74126]" href="https://www.nhis.or.kr" target="_blank" rel="noreferrer">국민건강보험공단</a>
          <a className="underline hover:text-[#a74126]" href="https://www.nps.or.kr" target="_blank" rel="noreferrer">국민연금공단</a>
        </div>
      </footer>
    </article>
  );
}
