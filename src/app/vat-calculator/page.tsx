import VatCalculator from "@/components/VatCalculator";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "부가세 계산기",
  description: "일반과세자 공급가액과 부가세 포함 금액을 계산합니다. 간이과세자 납부세액은 업종과 공제액에 따라 달라져 국세청 안내를 연결합니다.",
  alternates: { canonical: "https://unclenote.com/vat-calculator" },
  openGraph: {
    siteName: '삼촌노트',
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: "부가세 계산기 | 삼촌노트",
    description: "일반과세자 공급가액과 부가세 포함 금액을 계산합니다.",
    url: "https://unclenote.com/vat-calculator",
    type: "website",
  },
};

export default function VatCalculatorPage() {
  return (
    <div className="flex flex-col items-center gap-10">
      {/* 빵부스러기(Breadcrumb) & 뒤로가기 */}
      <div className="w-full max-w-xl text-sm font-medium text-zinc-500 mb-[-1.5rem]">
        <Link href="/" className="hover:text-[#c55232] transition-colors">
          ← 홈으로 돌아가기
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800">부가세 계산기</span>
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-2xl pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
          <span className="text-[#c55232]">부가세(VAT)</span> 간편 계산기
        </h1>
        <p className="mt-3 text-base text-zinc-600 [text-wrap:balance]">
          일반과세자의 공급가액과 부가세 포함 금액을 계산합니다. <br className="sm:hidden" />
          간이과세자는 업종별 기준을 먼저 확인해 주세요.
        </p>
      </section>

      {/* Calculator Section */}
      <section className="w-full flex justify-center">
        <VatCalculator />
      </section>

      {/* SEO & Guide Section for AdSense (AEO 최적화 구조) */}
      <section className="w-full max-w-xl bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-zinc-100 pb-3">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <span>📖</span>
            <span>삼촌노트 부가세 알짜 상식</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-1">계산하기 전 알아두면 좋은 필수 세무 지식</p>
        </div>

        <div className="space-y-4 text-zinc-700 leading-relaxed">
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <h3 className="text-base font-bold text-zinc-900 mb-2">
              Q. 공급가액과 합계금액의 차이는 무엇인가요?
            </h3>
            <p className="text-sm">
              <strong>공급가액</strong>은 순수한 물품 또는 서비스의 가격을 의미하며, 여기에 <strong>10%의 부가가치세</strong>가 더해진 최종 결제 금액이 바로 <strong>합계금액</strong>입니다.
            </p>
          </div>
          
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <h3 className="text-base font-bold text-zinc-900 mb-2">
              Q. 일반과세자와 간이과세자는 어떻게 다른가요?
            </h3>
            <p className="text-sm">
              연 매출 1억 400만 원(2024년 7월 세법 개정 반영) 미만인 개인사업자는 <strong>간이과세자</strong>로 분류될 수 있습니다. 일반과세자는 일괄 10%의 세율이 적용되지만, 간이과세자는 업종별 부가가치율(15~40%)에 따라 훨씬 낮은 세금을 부담하게 됩니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
