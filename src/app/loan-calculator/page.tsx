import LoanCalculator from "@/components/LoanCalculator";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Icon } from "@iconify/react";

export const metadata: Metadata = {
  title: "대출·할부금 계산기 | 1금융권 vs 캐피탈 금리 비교",
  description: "신차·중고차 자동차 할부부터 전세자금, 직장인 신용대출까지. 제1금융권 은행과 캐피탈(2금융권)의 금리 격차와 원리금균등, 원금균등, 만기일시 상환 방식별 월 납입금 및 총 이자를 1초 만에 비교해 드립니다.",
  keywords: ["대출이자 계산기", "할부금 계산기", "신차할부 계산", "중고차 캐피탈 금리", "1금융권 2금융권 차이", "원리금균등상환", "원금균등상환", "만기일시상환", "삼촌노트", "Uncle Note"],
  alternates: { canonical: "https://unclenote.com/loan-calculator" },
  openGraph: {
    siteName: "삼촌노트",
    images: [{ url: "/images/share-samchon-note-v2.png", width: 1672, height: 941, alt: "삼촌노트 — 대출·할부금 계산기" }],
    title: "대출·할부금 계산기 | 1금융권 vs 캐피탈 비교 | 삼촌노트",
    description: "자동차 할부, 전세자금대출, 신용대출의 금융권별 금리 차이와 상환 방식별 실제 월 지출액을 한눈에 확인하세요.",
    url: "https://unclenote.com/loan-calculator",
    type: "website",
  },
};

export default function LoanCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "제1금융권 은행과 캐피탈(2금융권) 할부의 실제 이자 차이는 얼마나 나나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "신차 3,500만 원(60개월) 기준 1금융권 오토론(연 4.8%)은 총 이자가 약 447만 원인 반면, 캐피탈(연 7.9%)은 약 763만 원으로 약 316만 원 이상의 이자 차이가 발생합니다. 승인 절차가 조금 더 까다롭더라도 1금융권을 우선 조회하는 것이 유리합니다."
        }
      },
      {
        "@type": "Question",
        "name": "원리금균등상환과 원금균등상환 중 어떤 방식이 더 유리한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "총 납부 이자를 최소화하려면 원금이 처음부터 빠르게 줄어드는 '원금균등상환'이 가장 유리합니다. 반면 매달 지출되는 고정 예산을 일정하게 유지하여 가계부를 관리하고 싶다면 매월 상환액이 같은 '원리금균등상환'이 적합합니다."
        }
      },
      {
        "@type": "Question",
        "name": "만기일시상환(이자만 납부)을 선택할 때 주의할 점은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "만기일시상환은 대출 기간 동안 원금을 전혀 갚지 않고 이자만 내기 때문에 매월 나가는 현금 부담은 가장 적습니다. 그러나 대출 원금 전체에 대해 만기까지 이자가 계속 붙어 총 이자 비용이 가장 크며, 만기 시점에 원금 전액을 일시에 마련하거나 대환해야 하는 상환 리스크가 큽니다."
        }
      }
    ]
  };

  return (
    <div className="calculator-page max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* FAQ Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 헤더 섹션 */}
      <header className="mb-8 sm:mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#c55232]/10 text-[#c55232] rounded-full text-xs font-bold mb-3">
          <Icon icon="solar:card-2-bold-duotone" width="16" height="16" />
          금융 & 스마트 대출 도구
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#292520] tracking-tight">
          대출 금리 & 월 할부금 스마트 계산기
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 mt-2 max-w-2xl leading-relaxed">
          <strong>제1금융권(시중은행)</strong> vs <strong>캐피탈(2금융권)</strong>의 금리 차이와 신차·중고차·전세·신용대출 분야별 월 상환액 및 만기까지 버리는 총 이자 비용을 실시간 비교합니다.
        </p>
      </header>

      {/* 대출 계산기 본체 컴포넌트 */}
      <LoanCalculator />

      {/* 카드뉴스형 가이드 섹션 (AEO / SEO 최적화) */}
      <section className="mt-16 sm:mt-24 space-y-8">
        <div className="border-b border-[#e8e1d8] pb-4">
          <span className="text-xs font-bold text-[#c55232] tracking-wider uppercase">Finance Guide</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#292520] mt-1">
            대출·할부 진행 전 반드시 알아야 할 3대 체크포인트
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">내 지갑을 지키는 실전 금융 상식 카드뉴스</p>
        </div>

        {/* 3열 카드뉴스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 카드 1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8e1d8] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:bank-bold-duotone" />
              </div>
              <span className="text-xs font-bold text-blue-600">체크포인트 01</span>
              <h3 className="text-base font-bold text-[#292520] mt-1 mb-2">
                1금융 오토론 vs 캐피탈 제휴
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                자동차 매장에서 딜러가 당일 출고를 이유로 캐피탈을 권유하더라도, 주거래 은행의 <strong>모바일 오토론(신한 마이카, 국민 매직카 등)</strong>을 1순위로 조회하세요. 금리 3%p 차이는 5년 기준 수백만 원의 차이를 만듭니다.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400">
              💡 신용점수 하락 방어에도 1금융권이 유리합니다.
            </div>
          </div>

          {/* 카드 2 */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8e1d8] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#c55232] flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:pie-chart-2-bold-duotone" />
              </div>
              <span className="text-xs font-bold text-[#c55232]">체크포인트 02</span>
              <h3 className="text-base font-bold text-[#292520] mt-1 mb-2">
                상환 방식에 따른 이자 함정
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                <strong>만기일시상환</strong>은 당장 매달 나가는 돈이 적어 솔깃하지만, 원금이 줄지 않아 만기까지 이자가 최고 수준으로 누적됩니다. 상환 여력이 있다면 원금을 같이 갚아나가는 <strong>원리금/원금균등</strong>을 택하세요.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400">
              💡 총 이자 절약: 원금균등 &gt; 원리금균등 &gt; 만기일시
            </div>
          </div>

          {/* 카드 3 */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8e1d8] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:tag-price-bold-duotone" />
              </div>
              <span className="text-xs font-bold text-emerald-600">체크포인트 03</span>
              <h3 className="text-base font-bold text-[#292520] mt-1 mb-2">
                중도상환수수료와 금리인하요구권
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                대출 실행 후 3년이 지나면 법적으로 <strong>중도상환수수료가 면제</strong>됩니다. 또한 취업, 승진, 신용점수 상승 등 재정 상태가 개선되었다면 금융사에 <strong>금리인하요구권</strong>을 반드시 행사하세요.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400">
              💡 금융소비자보호법에 따른 정당한 권리입니다.
            </div>
          </div>
        </div>
      </section>

      {/* 관련 읽을거리 및 추천 도구 링크 */}
      <section className="mt-12 p-6 bg-zinc-50 rounded-2xl border border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <strong className="text-sm font-bold text-[#292520] block">
            내 월급에서 대출 상환액이 차지하는 비중은 얼마일까?
          </strong>
          <span className="text-xs text-zinc-500">
            2026년 4대보험과 세금을 뗀 진짜 내 통장 월급을 확인해 보세요.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/salary-calculator"
            className="px-4 py-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-700 rounded-xl transition-colors shadow-2xs"
          >
            연봉 실수령액 계산기
          </Link>
          <Link
            href="/guide"
            className="px-4 py-2 bg-[#292520] hover:bg-[#c55232] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
          >
            읽을거리 가이드 전체보기
          </Link>
        </div>
      </section>
    </div>
  );
}
