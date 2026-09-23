import Link from "next/link";
import { Icon } from '@iconify/react';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-16">
      
      {/* Hero Section (Warm Editorial Vibe) */}
      <section className="text-center flex flex-col items-center pt-6">
        <div className="rounded-full px-4 py-1.5 text-[12px] uppercase tracking-[0.2em] font-bold bg-[#c55232]/10 text-[#c55232] mb-6 inline-block">
          Smart Life & Work Tools
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#292520] leading-[1.15] mb-5">
          복잡한 셈을 1초 만에, <br className="sm:hidden" />
          <span className="text-[#c55232]">삼촌생각</span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed font-medium [text-wrap:balance]">
          셀프 인테리어 자재 계산부터 내 통장 월급·세무까지, <br className="hidden sm:inline" />
          매번 헷갈리는 일상의 계산을 삼촌이 친절하고 정확하게 알려드립니다.
        </p>
      </section>

      {/* Section 1: 생활 & 셀프 인테리어 도구 (타일, 도배지, 장판 3종 라인업) */}
      <section>
        <div className="flex items-center justify-between mb-8 px-1">
          <div>
            <span className="text-xs font-bold text-[#c55232] tracking-wider uppercase">Life & Interior</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292520] tracking-tight mt-0.5">
              생활 & 셀프 인테리어 도구
            </h2>
            <p className="text-xs text-zinc-400 mt-1">국내 표준 유통 규격 및 로스율을 반영한 실전 자재 계산기</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Interior Tool 1: 타일 계산기 */}
          <div className="bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.8rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link 
              href="/tile-calculator" 
              className="flex flex-col justify-between h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.8rem-0.375rem)] p-7 sm:p-8 transition-colors"
            >
              <div>
                <div className="w-12 h-12 bg-[#c55232]/10 rounded-2xl flex items-center justify-center text-[#c55232] text-2xl mb-5 shadow-xs">
                  <Icon icon="solar:ruler-pen-bold-duotone" />
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl font-bold text-[#292520] tracking-tight group-hover:text-[#c55232] transition-colors duration-300">
                    타일 소요량 계산기
                  </h3>
                  <span className="px-1.5 py-0.5 bg-[#c55232] text-white text-[10px] font-bold rounded">HOT</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  300각·600각 규격별 박스당 수량 및 절단 로스율(5%~20%) 반영 구매 박스 수 1초 계산.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-[#c55232]">300각(16장)·600각(4장)</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#c55232] group-hover:text-white transition-all duration-300">
                  <Icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Interior Tool 2: 도배지 계산기 */}
          <div className="bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.8rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link 
              href="/wallpaper-calculator" 
              className="flex flex-col justify-between h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.8rem-0.375rem)] p-7 sm:p-8 transition-colors"
            >
              <div>
                <div className="w-12 h-12 bg-[#c55232]/10 rounded-2xl flex items-center justify-center text-[#c55232] text-2xl mb-5 shadow-xs">
                  <Icon icon="solar:brush-bold-duotone" />
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl font-bold text-[#292520] tracking-tight group-hover:text-[#c55232] transition-colors duration-300">
                    도배지 소요량 계산기
                  </h3>
                  <span className="px-1.5 py-0.5 bg-[#c55232]/10 text-[#c55232] text-[10px] font-bold rounded">NEW</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  실크(5평형)·합지(5평/2평형) 롤 수와 천장 포함 여부, 도배 풀·본드 부자재까지 자동 산출.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-[#c55232]">실크·광폭·소폭 롤 계산</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#c55232] group-hover:text-white transition-all duration-300">
                  <Icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Interior Tool 3: 장판 계산기 */}
          <div className="bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.8rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link 
              href="/flooring-calculator" 
              className="flex flex-col justify-between h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.8rem-0.375rem)] p-7 sm:p-8 transition-colors"
            >
              <div>
                <div className="w-12 h-12 bg-[#c55232]/10 rounded-2xl flex items-center justify-center text-[#c55232] text-2xl mb-5 shadow-xs">
                  <Icon icon="solar:floor-lamp-bold-duotone" />
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl font-bold text-[#292520] tracking-tight group-hover:text-[#c55232] transition-colors duration-300">
                    장판(모노륨) 계산기
                  </h3>
                  <span className="px-1.5 py-0.5 bg-[#c55232]/10 text-[#c55232] text-[10px] font-bold rounded">NEW</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  국내 표준 1.8m 폭 기준 최적 깔기 방향 자동 비교 및 꺾어올림 포함 구매 미터(m) 수 계산.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-[#c55232]">1.8m 폭 최적화 재단</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#c55232] group-hover:text-white transition-all duration-300">
                  <Icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Interior Tool 4: 페인트 계산기 */}
          <div className="bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.8rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link 
              href="/paint-calculator" 
              className="flex flex-col justify-between h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.8rem-0.375rem)] p-7 sm:p-8 transition-colors"
            >
              <div>
                <div className="w-12 h-12 bg-[#c55232]/10 rounded-2xl flex items-center justify-center text-[#c55232] text-2xl mb-5 shadow-xs">
                  <Icon icon="solar:paint-roller-bold-duotone" />
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl font-bold text-[#292520] tracking-tight group-hover:text-[#c55232] transition-colors duration-300">
                    페인트 소요량 계산기
                  </h3>
                  <span className="px-1.5 py-0.5 bg-[#c55232]/10 text-[#c55232] text-[10px] font-bold rounded">NEW</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  벽면·방문 2회 도장 기준 필요 리터(L) 수와 캔 규격(1L·4L), 젯소 및 부자재 자동 산출.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-[#c55232]">2회 도장·젯소·캔 조합</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#c55232] group-hover:text-white transition-all duration-300">
                  <Icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

          {/* Interior Tool 5: 커튼·블라인드 계산기 */}
          <div className="bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.8rem] group transition-transform duration-500 hover:scale-[1.01] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Link 
              href="/curtain-calculator" 
              className="flex flex-col justify-between h-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.8rem-0.375rem)] p-7 sm:p-8 transition-colors"
            >
              <div>
                <div className="w-12 h-12 bg-[#c55232]/10 rounded-2xl flex items-center justify-center text-[#c55232] text-2xl mb-5 shadow-xs">
                  <Icon icon="solar:hanger-2-bold-duotone" />
                </div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-xl font-bold text-[#292520] tracking-tight group-hover:text-[#c55232] transition-colors duration-300">
                    커튼·블라인드 치수 계산기
                  </h3>
                  <span className="px-1.5 py-0.5 bg-[#c55232]/10 text-[#c55232] text-[10px] font-bold rounded">NEW</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  나비주름(2배)·평주름 원단 폭(장) 수와 레일·봉 세로 길이 공제, 블라인드 헤베 1초 계산.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-100">
                <span className="text-xs font-bold text-[#c55232]">주름 배수·황금 세로 핏</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 group-hover:bg-[#c55232] group-hover:text-white transition-all duration-300">
                  <Icon icon="solar:arrow-right-linear" width="18" height="18" className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* Section 2: 월급 & 세무 도구 (2x2 Balanced Grid) */}
      <section>
        <div className="flex items-center justify-between mb-8 px-1">
          <div>
            <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase">Work & Finance</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292520] tracking-tight mt-0.5">
              월급 & 세무 도구
            </h2>
            <p className="text-xs text-zinc-400 mt-1">2026년 최신 세법 및 근로기준법 개정안 반영</p>
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
                <span className="text-xs font-bold text-[#c55232]">2026 보험료율 기준 예상액</span>
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
                <span className="text-xs font-bold text-[#c55232]">2026·2027 확정 시급</span>
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
            <p className="text-xs text-zinc-400 mt-1">놓치기 쉬운 세무·노무·인테리어 상식을 알기 쉽게 짚어드립니다</p>
          </div>
          <Link 
            href="/guide" 
            className="text-sm font-bold text-[#c55232] hover:text-[#a74126] flex items-center gap-1 transition-colors"
          >
            <span>모두 보기</span>
            <Icon icon="solar:arrow-right-linear" width="16" height="16" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Article 1 */}
          <Link 
            href="/guide/salary-table-2026"
            className="bg-white p-7 rounded-[1.6rem] border border-zinc-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#c55232]/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#c55232] mb-3">
                <span className="bg-[#c55232]/10 px-2.5 py-1 rounded-md">2026 최신 개정</span>
                <span className="text-zinc-400 font-normal">3분 정독</span>
              </div>
              <h3 className="text-lg font-bold text-[#292520] group-hover:text-[#c55232] transition-colors mb-2">
                2026년 연봉별 실수령액 표 & 4대 보험 공제율 총정리
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                국민연금 상한액 인상 및 건강보험 요율 반영! 연봉 3,000만 원부터 1억 원까지 실수령액 구간별 변동표를 확인하세요.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-zinc-700 group-hover:text-[#c55232]">
              <span>자세히 읽기</span>
              <Icon icon="solar:arrow-right-linear" width="14" height="14" />
            </div>
          </Link>

          {/* Article 2 */}
          <Link 
            href="/guide/severance-pay-guide-2026"
            className="bg-white p-7 rounded-[1.6rem] border border-zinc-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-[#c55232]/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#c55232] mb-3">
                <span className="bg-[#c55232]/10 px-2.5 py-1 rounded-md">퇴직금 가이드</span>
                <span className="text-zinc-400 font-normal">4분 정독</span>
              </div>
              <h3 className="text-lg font-bold text-[#292520] group-hover:text-[#c55232] transition-colors mb-2">
                퇴직금 계산법과 지급기한 14일 규정, 퇴직소득세 절세 팁
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                퇴직금 산정 기준인 3개월 평균임금과 상여금 반영 비율, 근속연수공제로 세금 아끼는 IRP 이전 팁을 알려드립니다.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-zinc-700 group-hover:text-[#c55232]">
              <span>자세히 읽기</span>
              <Icon icon="solar:arrow-right-linear" width="14" height="14" />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
