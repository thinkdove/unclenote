import SalaryCalculator from "@/components/SalaryCalculator";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기",
  description: "2026년 보험료율을 적용하고 소득세를 추정하는 연봉 실수령액 참고 계산기. 실제 원천징수액은 급여명세서와 국세청 간이세액표를 확인하세요.",
  keywords: ["연봉 실수령액", "2026 연봉 계산기", "월급 실수령액", "4대보험 계산", "삼촌생각", "Uncle Note"],
  alternates: { canonical: "https://unclenote.com/salary-calculator" },
  openGraph: {
    title: "연봉 실수령액 계산기 | 삼촌생각",
    description: "연봉과 비과세액, 부양가족 수를 입력하고 2026년 예상 월 실수령액을 확인하세요.",
    url: "https://unclenote.com/salary-calculator",
    type: "website",
  },
};

export default function SalaryCalculatorPage() {
  // AEO/SEO를 위한 JSON-LD 구조화 데이터
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "연봉 5,000만 원의 실제 월 실수령액은 얼마인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "실수령액은 비과세액, 부양가족, 회사의 원천징수 방식에 따라 달라집니다. 조건을 입력한 뒤 참고용 추정치를 확인하고 실제 금액은 급여명세서와 대조하세요."
        }
      },
      {
        "@type": "Question",
        "name": "식대 비과세 한도 20만 원은 실수령액에 어떤 영향을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "식대 비과세 한도는 월 20만 원까지 소득세 및 4대 보험료 부과 대상에서 제외됩니다. 즉, 월 급여 중 20만 원에 대해서는 세금과 보험료를 떼지 않으므로 과세 대상 소득이 줄어들어 실수령액이 늘어나는 절세 효과가 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "2026년 4대 보험 요율은 어떻게 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "2026년 근로자 부담 기준 국민연금 4.75%, 건강보험 3.595%, 장기요양보험은 건강보험료에 0.9448%/7.19% 비율을 적용하고 고용보험은 0.9%를 사용합니다."
        }
      }
    ]
  };

  return (
    <div className="calculator-page">
      {/* FAQ Structured Data for Google/AI Rich Snippet */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 빵부스러기(Breadcrumb) */}
      <nav aria-label="현재 위치" className="page-breadcrumb">
        <Link href="/" className="hover:text-[#c55232] transition-colors">
          ← 홈으로 돌아가기
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800">연봉 실수령액 계산기</span>
      </nav>

      {/* Hero Section */}
      <header className="calculator-page-header">
        <span className="editorial-badge">SALARY CALCULATOR · 2026</span>
        <h1 className="editorial-h1 mt-3">
          <span className="text-[#c55232]">연봉 실수령액</span> 스마트 계산기
        </h1>
        <p className="editorial-body mt-4 max-w-2xl text-zinc-600">
          2026년 보험료율과 소득세 추정치를 바탕으로
          월 실수령액의 참고 범위를 확인해 보세요.
        </p>
      </header>

      {/* Calculator Section */}
      <section aria-label="연봉 실수령액 계산" className="w-full">
        <SalaryCalculator />
      </section>

      {/* SEO & Guide Section for AdSense (AEO 최적화 지식 콘텐츠) */}
      <section className="calculator-guide" aria-labelledby="salary-guide-title">
        <div className="calculator-guide-heading">
          <span className="editorial-badge">PAYCHECK GUIDE</span>
          <h2 id="salary-guide-title" className="editorial-h2 mt-2">월급 명세서 읽는 법</h2>
          <p className="editorial-desc mt-2">계산 결과를 확인할 때 함께 알아두면 좋은 세 가지입니다.</p>
        </div>

        <div className="calculator-guide-list">
          
          <div className="calculator-guide-item">
            <h3 className="text-base font-bold text-zinc-900 mb-2">
              Q. 연봉 5,000만 원이면 한 달에 실제로 얼마나 들어오나요?
            </h3>
            <p className="editorial-desc">
              연봉 5,000만 원을 12개월로 나누면 세전 월급은 약 <strong>416만 6,667원</strong>입니다. 월 식대 비과세 20만 원, 부양가족 1명 가정 시 이 계산기의 참고값은 보험료 약 38.5만 원, 세금 추정 약 20.1만 원을 뺀 <strong>월 약 358만 원</strong>입니다. 실제 원천징수액은 다를 수 있습니다.
            </p>
          </div>

          <div className="calculator-guide-item">
            <h3 className="text-base font-bold text-zinc-900 mb-2">
              Q. 식대 20만 원 비과세는 왜 중요한가요?
            </h3>
            <p className="editorial-desc">
              월 급여 항목 중 <strong>비과세 식대(월 최대 20만 원)</strong>는 소득세와 4대 보험료를 부과하는 기준 금액에서 통째로 제외됩니다. 따라서 식대 비과세 처리가 되어 있으면 매월 수만 원 이상의 절세 및 보험료 절감 효과가 발생하여 실수령액이 직접적으로 올라갑니다.
            </p>
          </div>

          <div className="calculator-guide-item">
            <h3 className="text-base font-bold text-zinc-900 mb-2">
              Q. 4대 보험 공제 요율 총정리
            </h3>
            <ul className="editorial-desc space-y-1.5 mt-3">
              <li>• <strong>국민연금</strong>: 4.75% (2026년 7월 기준 상한 659만 원)</li>
              <li>• <strong>건강보험</strong>: 3.595%</li>
              <li>• <strong>장기요양보험</strong>: 건강보험료 × 0.9448% ÷ 7.19%</li>
              <li>• <strong>고용보험</strong>: 0.9%</li>
              <li>• <strong>소득세/지방소득세</strong>: 화면의 금액은 추정치이며 실제 원천징수는 국세청 간이세액표를 확인</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
