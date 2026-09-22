import SalaryCalculator from "@/components/SalaryCalculator";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 - 삼촌생각 (Uncle Note)",
  description: "2026년 최신 4대 보험 요율과 근로소득세 간이세액표를 반영한 연봉 실수령액 자동 계산기. 국민연금, 건강보험, 고용보험 공제 후 진짜 내 월급을 1초 만에 확인하세요.",
  keywords: ["연봉 실수령액", "2026 연봉 계산기", "월급 실수령액", "4대보험 계산", "삼촌생각", "Uncle Note"],
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
          "text": "비과세 식대 월 20만 원, 부양가족 1인(본인) 기준 연봉 5,000만 원의 월 예상 실수령액은 약 3,53만 원~3,55만 원 수준입니다. 국민연금, 건강보험, 고용보험 등 4대 보험료와 근로소득세 및 지방소득세로 월 약 62만 원 가량이 공제됩니다."
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
          "text": "근로자 부담 기준 국민연금 4.5%(월 상한액 기준 적용), 건강보험 3.545%, 장기요양보험은 건강보험료의 12.95%, 고용보험은 0.9%가 적용됩니다."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col items-center gap-10">
      {/* FAQ Structured Data for Google/AI Rich Snippet */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 빵부스러기(Breadcrumb) */}
      <div className="w-full max-w-xl text-sm font-medium text-zinc-500 mb-[-1.5rem]">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          ← 홈으로 돌아가기
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800">연봉 실수령액 계산기</span>
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-2xl pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
          <span className="text-blue-600">연봉 실수령액</span> 스마트 계산기
        </h1>
        <p className="mt-3 text-base text-zinc-600 [text-wrap:balance]">
          최신 4대 보험 요율과 소득세 간이세액표를 반영하여 <br className="sm:hidden" />
          공제 후 진짜 내 통장에 꽂히는 월급을 계산해 드립니다.
        </p>
      </section>

      {/* Calculator Section */}
      <section className="w-full flex justify-center">
        <SalaryCalculator />
      </section>

      {/* SEO & Guide Section for AdSense (AEO 최적화 지식 콘텐츠) */}
      <section className="w-full max-w-xl bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-zinc-100 pb-3">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <span>📖</span>
            <span>삼촌생각 연봉·급여 알짜 상식</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-1">월급 명세서를 받기 전 알아두면 돈이 되는 핵심 가이드</p>
        </div>

        <div className="space-y-4 text-zinc-700 leading-relaxed">
          
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <h3 className="text-base font-bold text-zinc-900 mb-2">
              Q. 연봉 5,000만 원이면 한 달에 실제로 얼마나 들어오나요?
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              연봉 5,000만 원을 12개월로 나누면 세전 월급은 약 <strong>416만 6,666원</strong>입니다. 여기서 4대 보험료(약 38만 원)와 근로소득세 및 지방소득세(약 23만 원) 등 총 <strong>약 61~62만 원</strong>이 공제되어, 실제 손에 쥐는 월 실수령액은 <strong>약 354만 원</strong> 안팎이 됩니다.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <h3 className="text-base font-bold text-zinc-900 mb-2">
              Q. 식대 20만 원 비과세는 왜 중요한가요?
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              월 급여 항목 중 <strong>비과세 식대(월 최대 20만 원)</strong>는 소득세와 4대 보험료를 부과하는 기준 금액에서 통째로 제외됩니다. 따라서 식대 비과세 처리가 되어 있으면 매월 수만 원 이상의 절세 및 보험료 절감 효과가 발생하여 실수령액이 직접적으로 올라갑니다.
            </p>
          </div>

          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <h3 className="text-base font-bold text-zinc-900 mb-2">
              Q. 4대 보험 공제 요율 총정리
            </h3>
            <ul className="text-xs text-zinc-600 space-y-1.5 mt-2 bg-white p-3 rounded-lg border border-zinc-200/60">
              <li>• <strong>국민연금</strong>: 4.5% (기준소득월액 상한 617만 원 적용)</li>
              <li>• <strong>건강보험</strong>: 3.545%</li>
              <li>• <strong>장기요양보험</strong>: 건강보험료의 12.95%</li>
              <li>• <strong>고용보험</strong>: 0.9%</li>
              <li>• <strong>소득세/지방소득세</strong>: 부양가족 수 및 소득 구간에 따른 간이세액표 차등 적용</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
