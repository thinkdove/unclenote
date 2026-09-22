import Link from "next/link";
import { Icon } from '@iconify/react';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-16">
      
      {/* Hero Section (Warm Editorial Vibe) */}
      <section className="text-center flex flex-col items-center pt-6">
        <div className="rounded-full px-4 py-1.5 text-[12px] uppercase tracking-[0.2em] font-bold bg-[#c55232]/10 text-[#c55232] mb-6 inline-block">
          Smart Financial Tools
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#292520] leading-[1.15] mb-5">
          복잡한 셈을 1초 만에, <br className="sm:hidden" />
          <span className="text-[#c55232]">삼촌생각</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed font-medium [text-wrap:balance]">
          가장 자주 쓰지만 매번 헷갈리는 금융·세무 계산과 알짜 정보를 <br className="hidden sm:inline" />
          삼촌이 친절하고 정확하게 알려드립니다.
        </p>
      </section>

      {/* Tool Grid Section (2x2 Balanced Grid) */}
      <section>
        <div className="flex items-center justify-between mb-8 px-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292520] tracking-tight">
              스마트 도구함
            </h2>
            <p className="text-xs text-zinc-400 mt-1">회원가입 없이 즉시 무료로 사용하는 생활 계산기</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: 연봉 실수령액 계산기 */}
          <div className="bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.8rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link 
              href="/salary-calculator" 
              className="flex flex-col justify-between h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.8rem-0.375rem)] p-7 sm:p-8 transition-colors"
            >
              <div>
                <div className="w-12 h-12 bg-[#c55232]/10 rounded-2xl flex items-center justify-center text-[#c55232] text-2xl mb-5 shadow-xs">
                  <Icon icon="solar:wallet-money-bold-duotone" />
                </div>
                <h3 className="text-xl font-bold text-[#292520] mb-2 tracking-tight group-hover:text-[#c55232] transition-colors duration-300">
                  연봉 실수령액 계산기
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  4대보험 및 근로소득세를 공제한 진짜 내 통장 월급 1초 계산.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-[#c55232]">2026 최신 간이세액표</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#c55232] group-hover:text-white transition-all duration-300">
                  <Icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Card 2: 퇴직금 실수령액 계산기 */}
          <div className="bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.8rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link 
              href="/severance-pay-calculator" 
              className="flex flex-col justify-between h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.8rem-0.375rem)] p-7 sm:p-8 transition-colors"
            >
              <div>
                <div className="w-12 h-12 bg-[#c55232]/10 rounded-2xl flex items-center justify-center text-[#c55232] text-2xl mb-5 shadow-xs">
                  <Icon icon="solar:calculator-minimalistic-bold-duotone" />
                </div>
                <h3 className="text-xl font-bold text-[#292520] mb-2 tracking-tight group-hover:text-[#c55232] transition-colors duration-300">
                  퇴직금 실수령액 계산기
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  1일 평균임금과 개정 퇴직소득세를 반영한 세후 통장 수령액 계산.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-[#c55232]">근로기준법 기준</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#c55232] group-hover:text-white transition-all duration-300">
                  <Icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Card 3: 최저임금 & 주휴수당 계산기 */}
          <div className="bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.8rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link 
              href="/wage-calculator" 
              className="flex flex-col justify-between h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.8rem-0.375rem)] p-7 sm:p-8 transition-colors"
            >
              <div>
                <div className="w-12 h-12 bg-[#c55232]/10 rounded-2xl flex items-center justify-center text-[#c55232] text-2xl mb-5 shadow-xs">
                  <Icon icon="solar:clock-circle-bold-duotone" />
                </div>
                <h3 className="text-xl font-bold text-[#292520] mb-2 tracking-tight group-hover:text-[#c55232] transition-colors duration-300">
                  최저임금 & 주휴수당 계산기
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  2026 최저시급(10,320원) 및 주 15시간 이상 법정 주휴수당 자동 산출.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-[#c55232]">2026·2027 법정 시급</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#c55232] group-hover:text-white transition-all duration-300">
                  <Icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Card 4: 부가세(VAT) 계산기 */}
          <div className="bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.8rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link 
              href="/vat-calculator" 
              className="flex flex-col justify-between h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.8rem-0.375rem)] p-7 sm:p-8 transition-colors"
            >
              <div>
                <div className="w-12 h-12 bg-[#c55232]/10 rounded-2xl flex items-center justify-center text-[#c55232] text-2xl mb-5 shadow-xs">
                  <Icon icon="solar:bill-check-bold-duotone" />
                </div>
                <h3 className="text-xl font-bold text-[#292520] mb-2 tracking-tight group-hover:text-[#c55232] transition-colors duration-300">
                  부가세(VAT) 계산기
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  일반/간이과세자 공급가액과 부가세액, 합계금액 역산 1초 완료.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-[#c55232]">공급가·세액 역산</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#c55232] group-hover:text-white transition-all duration-300">
                  <Icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* Editorial Split: Guide Section (2-Column Balanced Grid) */}
      <section className="pt-4">
        <div className="flex items-center justify-between mb-8 px-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292520] tracking-tight">
              알짜 생활 가이드
            </h2>
            <p className="text-xs text-zinc-400 mt-1">놓치기 쉬운 세무·노무 상식을 알기 쉽게 짚어드립니다</p>
          </div>
          <Link 
            href="/guide" 
            className="text-sm font-bold text-[#c55232] hover:text-[#a74126] flex items-center gap-1 transition-colors"
          >
            <span>모두 보기</span>
            <Icon icon="solar:arrow-right-linear" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Guide 1: 퇴직금 가이드 */}
          <Link 
            href="/guide/severance-pay-guide-2026" 
            className="group bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.6rem] transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <div className="flex flex-col justify-between h-full p-6 sm:p-7 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.6rem-0.375rem)]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-[#c55232]/10 text-[#c55232] text-[11px] font-bold tracking-wide rounded-md">노무·세무</span>
                  <span className="text-xs text-zinc-400 font-medium">2026.09.22</span>
                </div>
                <h3 className="text-lg font-bold text-[#292520] mb-2 group-hover:text-[#c55232] transition-colors duration-300 leading-snug">
                  2026년 퇴직금 계산법 총정리: 평균임금 계산식부터 세금 절세 팁까지
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-6">
                  1일 평균임금 계산법, 지급 기한(14일)과 지연이자, IRP 계좌 이전으로 퇴직소득세 30% 감면받는 실전 꿀팁을 전해드립니다.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-500 group-hover:text-[#c55232] transition-colors">
                <span>가이드 읽기</span>
                <Icon icon="solar:arrow-right-linear" width="16" height="16" className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          {/* Guide 2: 연봉 표 가이드 */}
          <Link 
            href="/guide/salary-table-2026" 
            className="group bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.6rem] transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <div className="flex flex-col justify-between h-full p-6 sm:p-7 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.6rem-0.375rem)]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-[#c55232]/10 text-[#c55232] text-[11px] font-bold tracking-wide rounded-md">세무·노무</span>
                  <span className="text-xs text-zinc-400 font-medium">2026.09.22</span>
                </div>
                <h3 className="text-lg font-bold text-[#292520] mb-2 group-hover:text-[#c55232] transition-colors duration-300 leading-snug">
                  2026년 연봉 실수령액 표 총정리: 3,000만~1억 구간별 월급 & 공제액 분석
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-6">
                  최신 4대 보험 요율과 소득세 간이세액표를 반영한 연봉 구간별 실제 월 실수령액과 식대 비과세 절세 팁을 상세히 전해드립니다.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-500 group-hover:text-[#c55232] transition-colors">
                <span>가이드 읽기</span>
                <Icon icon="solar:arrow-right-linear" width="16" height="16" className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
}