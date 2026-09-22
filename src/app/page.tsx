import VatCalculator from "@/components/VatCalculator";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10">
      {/* Hero Section */}
      <section className="text-center max-w-2xl pt-4">
        <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-full">
          🎉 삼촌생각 첫 번째 웹서비스
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
          복잡한 계산은 뚝딱, <br />
          <span className="text-blue-600">삼촌이 알려주는 쉬운 계산기</span>
        </h1>
        <p className="mt-3 text-base text-zinc-600">
          공급가액부터 세액 역산까지 1초 만에 확인하는 스마트 부가세 계산기입니다.
        </p>
      </section>

      {/* Calculator Component */}
      <section className="w-full flex justify-center">
        <VatCalculator />
      </section>

      {/* SEO & Guide Section for AdSense */}
      <section className="w-full max-w-xl bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-4 text-zinc-700">
        <h3 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-2">
          📖 삼촌의 부가세(VAT) 알짜 상식
        </h3>
        <div className="text-sm space-y-2 leading-relaxed">
          <p>
            <strong>Q. 공급가액과 합계금액의 차이는?</strong><br />
            공급가액은 순수한 물품 또는 서비스의 가격이며, 여기에 10%의 부가가치세가 붙은 최종 결제 금액이 합계금액입니다.
          </p>
          <p>
            <strong>Q. 일반과세자와 간이과세자는 어떻게 다른가요?</strong><br />
            연 매출 1억 400만 원 미만인 개인사업자는 간이과세자로 분류되어 업종별 부가가치율(15~40%)에 따른 낮은 세금을 부담하게 됩니다.
          </p>
        </div>
      </section>
    </div>
  );
}