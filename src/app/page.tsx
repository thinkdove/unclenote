import Link from "next/link";
import { Icon } from '@iconify/react';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-16">
      
      {/* Hero Section (Clean Structural Vibe) */}
      <section className="text-center flex flex-col items-center pt-8">
        <div className="rounded-full px-4 py-1.5 text-[12px] uppercase tracking-[0.2em] font-bold bg-blue-600/10 text-blue-700 mb-8 inline-block shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
          Smart Financial Tools
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.02em] text-[#111111] leading-[1.1] mb-6">
          생활의 지혜, <br className="sm:hidden" />
          <span className="text-blue-600">삼촌생각</span>
        </h1>
        <p className="text-[15px] sm:text-[18px] text-zinc-500 max-w-xl mx-auto leading-relaxed font-medium [text-wrap:balance]">
          매번 헷갈리는 금융·세무 계산과 알짜 정보, <br className="sm:hidden" />
          삼촌이 친절하고 정확하게 알려드립니다.
        </p>
      </section>

      {/* Tool Grid Section (Double-Bezel Architecture) */}
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
            스마트 도구함
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: 부가세 계산기 (Col span 8 - Asymmetrical) */}
          <div className="md:col-span-7 bg-black/[0.03] ring-1 ring-black/5 p-2 rounded-[2rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link href="/vat-calculator" className="flex flex-col sm:flex-row h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(2rem-0.5rem)] p-8 sm:p-10 transition-colors">
              <div className="flex-1">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mb-6 shadow-sm">
                  <Icon icon="solar:calculator-minimalistic-bold-duotone" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  부가세(VAT) 계산기
                </h3>
                <p className="text-[15px] text-zinc-500 leading-relaxed max-w-xs">
                  일반/간이과세자 공급가액 및 합계금액 역산 1초 완료.
                </p>
              </div>
              <div className="mt-8 sm:mt-auto sm:self-end flex items-center justify-center w-12 h-12 rounded-full bg-black/5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <Icon icon="solar:arrow-right-linear" width="24" height="24" className="group-hover:translate-x-0.5 transition-transform duration-500" />
              </div>
            </Link>
          </div>

          {/* Card 2: 연봉 계산기 (Col span 5) */}
          <div className="md:col-span-5 bg-black/[0.03] ring-1 ring-black/5 p-2 rounded-[2rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link href="/salary-calculator" className="flex flex-col h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(2rem-0.5rem)] p-8 transition-colors">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-5 shadow-xs">
                <Icon icon="solar:wallet-money-bold-duotone" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                연봉 실수령액 계산기
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                4대보험 및 각종 세금을 공제한 진짜 내 통장 월급 1초 계산.
              </p>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-blue-600">2026 최신 요율</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <Icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform duration-500" />
                </div>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* Editorial Split: Guide Section */}
      <section className="pt-12">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
            알짜 생활 가이드
          </h2>
          <span className="text-[15px] font-semibold text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1 transition-colors">
            모두 보기 <Icon icon="solar:arrow-right-linear" />
          </span>
        </div>
        
        <div className="flex flex-col gap-6">
          <Link href="/vat-calculator" className="group bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.5rem] transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.5rem-0.375rem)]">
              <div className="w-full sm:w-40 h-32 bg-blue-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-blue-400 text-5xl">
                <Icon icon="solar:document-text-bold-duotone" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 bg-zinc-100 text-zinc-600 text-[11px] font-bold tracking-wide rounded-md">세무/회계</span>
                  <span className="text-[13px] text-zinc-400 font-medium">2026.09.22</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  2026년 간이과세자와 일반과세자, 나에게 유리한 것은?
                </h3>
                <p className="text-[15px] text-zinc-500 leading-relaxed line-clamp-2">
                  사업을 시작할 때 가장 고민되는 세금 문제! 매출 기준 변경점과 부가가치세 절세 팁을 삼촌생각(Uncle Note)에서 알기 쉽게 정리해 드립니다.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}