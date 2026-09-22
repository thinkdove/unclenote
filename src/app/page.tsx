import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-10">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 rounded-3xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-xs font-semibold text-blue-700 bg-white border border-blue-200 rounded-full shadow-sm">
          <span>✨</span>
          <span>당신의 복잡한 셈을 1초 만에 해결해 드립니다</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-4">
          생활의 지혜, <br className="sm:hidden" />
          <span className="text-blue-600">삼촌생각 (Uncle Note)</span>
        </h1>
        <p className="text-lg text-zinc-600 max-w-xl mx-auto">
          가장 자주 쓰지만 매번 헷갈리는 금융, 세무 계산과 알짜 정보를 삼촌이 친절하고 정확하게 알려드립니다.
        </p>
      </section>

      {/* Tool Grid Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <span>🧮</span>
            <span>삼촌의 스마트 도구함</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {/* Card 1: 부가세 계산기 */}
          <Link href="/vat-calculator" className="group flex flex-col bg-white border border-zinc-200 hover:border-blue-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4 group-hover:scale-110 transition-transform">
              🧾
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1 group-hover:text-blue-600 transition-colors">
              부가세(VAT) 계산기
            </h3>
            <p className="text-sm text-zinc-500">
              일반/간이과세자 공급가액 및 합계금액 역산 1초 완료.
            </p>
          </Link>

          {/* Card 2: 연봉 계산기 (Coming Soon) */}
          <div className="flex flex-col bg-zinc-50 border border-zinc-200 rounded-2xl p-6 opacity-75">
            <div className="w-12 h-12 bg-zinc-200 rounded-xl flex items-center justify-center text-zinc-500 text-2xl mb-4">
              💰
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">
              연봉 실수령액 계산기
            </h3>
            <p className="text-sm text-zinc-500">
              4대보험 및 각종 세금을 공제한 진짜 내 월급. (준비 중)
            </p>
          </div>

          {/* Card 3: 실업급여 계산기 (Coming Soon) */}
          <div className="flex flex-col bg-zinc-50 border border-zinc-200 rounded-2xl p-6 opacity-75">
            <div className="w-12 h-12 bg-zinc-200 rounded-xl flex items-center justify-center text-zinc-500 text-2xl mb-4">
              🏢
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">
              실업급여 모의계산
            </h3>
            <p className="text-sm text-zinc-500">
              퇴사 후 내가 받을 수 있는 실업급여 총액은? (준비 중)
            </p>
          </div>
        </div>
      </section>

      {/* Blog/Guide Section */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <span>📚</span>
            <span>알짜 생활 가이드</span>
          </h2>
          <span className="text-sm font-medium text-blue-600 hover:underline cursor-pointer">
            모두 보기 →
          </span>
        </div>
        
        <div className="flex flex-col gap-4">
          <Link href="/vat-calculator" className="flex items-start gap-4 p-5 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-colors">
            <div className="w-20 h-20 bg-blue-100 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl">
              💡
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[11px] font-bold rounded">세무/회계</span>
                <span className="text-xs text-zinc-400">2026.09.22</span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 mb-1 line-clamp-1">
                2026년 간이과세자와 일반과세자, 나에게 유리한 것은?
              </h3>
              <p className="text-sm text-zinc-500 line-clamp-2">
                사업을 시작할 때 가장 고민되는 세금 문제! 매출 기준 변경점과 부가가치세 절세 팁을 삼촌생각(Uncle Note)에서 알기 쉽게 정리해 드립니다.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}