"use client";

import { useState } from "react";
import { Icon } from '@iconify/react';

export default function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState<string>("50,000,000"); // 기본 5천만 원
  const [nonTaxableMonthly, setNonTaxableMonthly] = useState<string>("200,000"); // 식대 등 기본 20만 원
  const [dependents, setDependents] = useState<number>(1); // 본인 포함 부양가족 수 (기본 1)
  const [childrenCount, setChildrenCount] = useState<number>(0); // 20세 이하 자녀 수
  const [severancePay, setSeverancePay] = useState<"exclude" | "include">("exclude"); // 퇴직금 별도 / 포함

  const [result, setResult] = useState<{
    monthlyGross: number;
    monthlyNet: number;
    annualNet: number;
    totalDeduction: number;
    pension: number;
    health: number;
    care: number;
    employment: number;
    incomeTax: number;
    localTax: number;
    insuranceTotal: number;
    taxTotal: number;
  } | null>(null);

  const clearResult = () => setResult(null);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.max(0, Math.floor(num)));
  };

  const handleSalaryChange = (val: string) => {
    clearResult();
    const numeric = val.replace(/[^0-9]/g, "");
    setAnnualSalary(numeric ? new Intl.NumberFormat("ko-KR").format(Number(numeric)) : "");
  };

  const addSalary = (addition: number) => {
    clearResult();
    const current = Number(annualSalary.replace(/,/g, "")) || 0;
    const updated = current + addition;
    setAnnualSalary(new Intl.NumberFormat("ko-KR").format(updated));
  };

  const setPresetSalary = (amount: number) => {
    clearResult();
    setAnnualSalary(new Intl.NumberFormat("ko-KR").format(amount));
  };

  const calculateSalary = () => {
    const rawSalary = parseFloat(annualSalary.replace(/,/g, ""));
    if (isNaN(rawSalary) || rawSalary <= 0) return;

    // 퇴직금 포함인 경우 13으로 분할, 별도인 경우 12로 분할
    const divider = severancePay === "include" ? 13 : 12;
    const monthlyGross = rawSalary / divider;
    const monthlyNonTax = parseFloat(nonTaxableMonthly.replace(/,/g, "")) || 0;
    
    // 과세 대상 월 급여
    const taxableMonthly = Math.max(0, monthlyGross - monthlyNonTax);

    // 2026년 7월부터 국민연금 기준소득월액 41만~659만 원, 근로자 부담 4.75%.
    const pensionBase = Math.min(Math.max(taxableMonthly, 410000), 6590000);
    const pension = Math.floor((pensionBase * 0.0475) / 10) * 10;

    // 2026년 건강보험료율 7.19%, 근로자 50% 부담.
    const health = Math.floor((taxableMonthly * 0.03595) / 10) * 10;

    // 2026년 장기요양보험료율 0.9448% / 건강보험료율 7.19%.
    const care = Math.floor((health * (0.009448 / 0.0719)) / 10) * 10;

    // 4. 고용보험 (0.9%)
    const employment = Math.floor((taxableMonthly * 0.009) / 10) * 10;

    const insuranceTotal = pension + health + care + employment;

    // 5. 근로소득세 추정. 국세청의 월별 근로소득 간이세액표를 직접 조회한 값은 아님.
    const taxableAnnual = taxableMonthly * 12;
    
    // 근로소득공제
    let earnedIncomeDeduction = 0;
    if (taxableAnnual <= 5000000) {
      earnedIncomeDeduction = taxableAnnual * 0.7;
    } else if (taxableAnnual <= 15000000) {
      earnedIncomeDeduction = 3500000 + (taxableAnnual - 5000000) * 0.4;
    } else if (taxableAnnual <= 45000000) {
      earnedIncomeDeduction = 7500000 + (taxableAnnual - 15000000) * 0.15;
    } else if (taxableAnnual <= 100000000) {
      earnedIncomeDeduction = 12000000 + (taxableAnnual - 45000000) * 0.05;
    } else {
      earnedIncomeDeduction = 14750000 + (taxableAnnual - 100000000) * 0.02;
    }

    // 인적공제 (부양가족 1인당 150만 원)
    const personalDeduction = dependents * 1500000;

    // 연금보험료 공제 (국민연금 연간 납부액 전액)
    const pensionDeduction = pension * 12;

    // 특별소득공제 (표준 간이공제 추정)
    let specialDeduction = 0;
    if (taxableAnnual <= 30000000) specialDeduction = 3100000;
    else if (taxableAnnual <= 45000000) specialDeduction = 3100000 + (taxableAnnual - 30000000) * 0.04;
    else if (taxableAnnual <= 70000000) specialDeduction = 3700000 + (taxableAnnual - 45000000) * 0.015;
    else specialDeduction = 4075000;

    // 과세표준
    const taxBase = Math.max(0, taxableAnnual - earnedIncomeDeduction - personalDeduction - pensionDeduction - specialDeduction);

    // 산출세액 (기본세율 적용)
    let calculatedTax = 0;
    if (taxBase <= 14000000) {
      calculatedTax = taxBase * 0.06;
    } else if (taxBase <= 50000000) {
      calculatedTax = 840000 + (taxBase - 14000000) * 0.15;
    } else if (taxBase <= 88000000) {
      calculatedTax = 6240000 + (taxBase - 50000000) * 0.24;
    } else if (taxBase <= 150000000) {
      calculatedTax = 15360000 + (taxBase - 88000000) * 0.35;
    } else if (taxBase <= 300000000) {
      calculatedTax = 37060000 + (taxBase - 150000000) * 0.38;
    } else {
      calculatedTax = 94060000 + (taxBase - 300000000) * 0.40;
    }

    // 근로소득세액공제
    let taxCredit = 0;
    if (calculatedTax <= 1300000) {
      taxCredit = calculatedTax * 0.55;
    } else {
      taxCredit = 715000 + (calculatedTax - 1300000) * 0.30;
    }
    // 세액공제 한도
    let creditLimit = 740000;
    if (taxableAnnual > 70000000) creditLimit = 500000;
    else if (taxableAnnual > 55000000) creditLimit = 660000;
    taxCredit = Math.min(taxCredit, creditLimit);

    // 자녀세액공제 (1명 15만, 2명 35만, 3명 이상은 추가당 30만)
    let childCredit = 0;
    if (childrenCount === 1) childCredit = 150000;
    else if (childrenCount === 2) childCredit = 350000;
    else if (childrenCount > 2) childCredit = 350000 + (childrenCount - 2) * 300000;

    // 최종 연간 소득세 -> 월 소득세
    const annualIncomeTax = Math.max(0, calculatedTax - taxCredit - childCredit);
    const incomeTax = Math.floor((annualIncomeTax / 12) / 10) * 10;

    // 6. 지방소득세 (소득세의 10%)
    const localTax = Math.floor((incomeTax * 0.1) / 10) * 10;

    const taxTotal = incomeTax + localTax;
    const totalDeduction = insuranceTotal + taxTotal;
    const monthlyNet = monthlyGross - totalDeduction;
    const annualNet = monthlyNet * 12;

    setResult({
      monthlyGross,
      monthlyNet,
      annualNet,
      totalDeduction,
      pension,
      health,
      care,
      employment,
      incomeTax,
      localTax,
      insuranceTotal,
      taxTotal,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Double-Bezel Architecture Outer */}
      <div className="bg-black/[0.03] ring-1 ring-black/5 p-2 sm:p-2.5 rounded-[2.5rem]">
        {/* Inner Core */}
        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(2.5rem-0.625rem)] p-6 sm:p-10 flex flex-col gap-8">
          
          {/* 1. 연봉 입력 & 퀵 프리셋 버튼 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-zinc-800 tracking-tight">희망 / 계약 연봉</label>
              <span className="text-xs text-[#c55232] font-semibold">세전 기준</span>
            </div>
            
            <div className="relative flex items-center">
              <input
                type="text"
                value={annualSalary}
                onChange={(e) => handleSalaryChange(e.target.value)}
                placeholder="50,000,000"
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-2xl font-extrabold rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#c55232]/20 focus:border-[#c55232] transition-all duration-300"
              />
              <span className="absolute right-5 text-zinc-400 font-bold text-base">원</span>
            </div>

            {/* 연봉 빠른 선택 버튼 */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[30000000, 40000000, 50000000, 60000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setPresetSalary(amt)}
                  className="py-2 text-xs font-bold text-zinc-600 bg-zinc-100 hover:bg-[#fff4ee] hover:text-[#c55232] rounded-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  {amt / 10000000}천만
                </button>
              ))}
            </div>

            {/* 증액 버튼 */}
            <div className="flex gap-1.5">
              {[1000000, 5000000, 10000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => addSalary(amt)}
                  className="flex-1 py-1.5 text-xs font-semibold text-zinc-500 bg-zinc-50 hover:bg-zinc-200/70 rounded-lg border border-zinc-200/50 transition-colors"
                >
                  +{amt / 10000}만
                </button>
              ))}
            </div>
          </div>

          {/* 2. 퇴직금 포함 여부 */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-zinc-800 tracking-tight">퇴직금 설정</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100/50 rounded-2xl border border-zinc-200/50">
              <button
                type="button"
                onClick={() => { clearResult(); setSeverancePay("exclude"); }}
                className={`py-3 text-[14px] font-bold rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  severancePay === "exclude"
                    ? "bg-white text-[#c55232] shadow-sm border border-zinc-200/50"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                별도 지급 (일반적)
              </button>
              <button
                type="button"
                onClick={() => { clearResult(); setSeverancePay("include"); }}
                className={`py-3 text-[14px] font-bold rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  severancePay === "include"
                    ? "bg-white text-[#c55232] shadow-sm border border-zinc-200/50"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                연봉에 포함
              </button>
            </div>
          </div>

          {/* 3. 비과세액 & 부양가족 설정 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 비과세액 */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-700 flex items-center justify-between">
                <span>월 비과세액 (식대 등)</span>
                <span className="text-[11px] text-zinc-400 font-normal">기본 20만</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={nonTaxableMonthly}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    clearResult();
                    setNonTaxableMonthly(val ? new Intl.NumberFormat("ko-KR").format(Number(val)) : "");
                  }}
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 font-bold rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#c55232]"
                />
                <span className="absolute right-4 text-xs text-zinc-400 font-semibold">원</span>
              </div>
            </div>

            {/* 부양가족 수 스텝퍼 */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-zinc-700 flex items-center justify-between">
                <span>부양가족 수 (본인 포함)</span>
                <span className="text-[11px] text-[#c55232] font-medium">{dependents}명</span>
              </label>
              <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-2 py-1">
                <button
                  type="button"
                  onClick={() => { clearResult(); const next = Math.max(1, dependents - 1); setDependents(next); setChildrenCount(Math.min(childrenCount, next - 1)); }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:bg-zinc-200 active:scale-95 transition-all"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-zinc-900 text-sm">{dependents}명</span>
                <button
                  type="button"
                  onClick={() => { clearResult(); setDependents(dependents + 1); }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:bg-zinc-200 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* 20세 이하 자녀 수 (부양가족 2명 이상일 때 노출) */}
          {dependents > 1 && (
            <div className="flex flex-col gap-2 p-3.5 bg-[#fff4ee]/40 rounded-2xl border border-[#f1d8cc]/60 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-800">20세 이하 자녀 수</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => { clearResult(); setChildrenCount(Math.max(0, childrenCount - 1)); }}
                    className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center font-bold text-zinc-600 hover:bg-zinc-100"
                  >
                    -
                  </button>
                  <span className="font-bold text-[#c55232] text-sm min-w-[20px] text-center">{childrenCount}명</span>
                  <button
                    type="button"
                    onClick={() => { clearResult(); setChildrenCount(Math.min(dependents - 1, childrenCount + 1)); }}
                    className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center font-bold text-zinc-600 hover:bg-zinc-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500">자녀 세액공제가 추가 반영되어 실수령액이 늘어납니다.</p>
            </div>
          )}

          {/* Premium CTA Button */}
          <button
            type="button"
            onClick={calculateSalary}
            className="group relative w-full bg-[#c55232] text-white font-bold text-lg rounded-full px-8 py-4 mt-2 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.01] active:scale-[0.98] shadow-[0_4px_20px_rgba(197,82,50,0.2)] hover:shadow-[0_8px_30px_rgba(197,82,50,0.3)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
            <span className="relative z-10 flex items-center justify-center gap-3">
              실수령액 계산하기
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                <Icon icon="solar:arrow-right-linear" width="20" height="20" className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </span>
          </button>

          {/* 4. 결과 창 (Supanova Editorial Layout) */}
          {result && (
            <div className="mt-2 bg-[#fff4ee]/40 border border-[#f1d8cc] rounded-[2rem] p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col gap-6">
              
              {/* 메인 하이라이트 박스 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f1d8cc]/80 text-center flex flex-col items-center">
                <span className="text-xs font-bold text-[#c55232] uppercase tracking-wider mb-1">
                  예상 월 실수령액
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight my-2">
                  {formatNumber(result.monthlyNet)}
                  <span className="text-2xl sm:text-3xl font-bold ml-1 text-zinc-600">원</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium mt-1">
                  <span>세전 월급 {formatNumber(result.monthlyGross)}원</span>
                  <span>•</span>
                  <span className="text-red-500 font-bold">공제액 {formatNumber(result.totalDeduction)}원</span>
                </div>
              </div>

              {/* 연간 환산 배지 */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/70 rounded-xl border border-[#f1d8cc]/50 text-sm">
                <span className="font-semibold text-zinc-600">연간 실수령 환산액</span>
                <span className="font-bold text-zinc-900">{formatNumber(result.annualNet)}원</span>
              </div>

              {/* 공제 내역 리스트 (4대보험 & 세금) */}
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-extrabold text-zinc-700 uppercase tracking-wider px-1">
                  공제액 세부 내역
                </h4>

                {/* 4대 보험 */}
                <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-xs flex flex-col gap-2.5">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-100 text-xs font-bold text-zinc-800">
                    <span className="flex items-center gap-1.5">
                      <Icon icon="solar:shield-check-bold-duotone" className="text-[#c55232] text-base" />
                      4대 보험 합계
                    </span>
                    <span className="text-[#c55232]">-{formatNumber(result.insuranceTotal)}원</span>
                  </div>
                  
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>국민연금 (4.75%)</span>
                    <span className="font-semibold text-zinc-700">{formatNumber(result.pension)}원</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>건강보험 (3.595%)</span>
                    <span className="font-semibold text-zinc-700">{formatNumber(result.health)}원</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>장기요양보험 (건보료의 약 13.14%)</span>
                    <span className="font-semibold text-zinc-700">{formatNumber(result.care)}원</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>고용보험 (0.9%)</span>
                    <span className="font-semibold text-zinc-700">{formatNumber(result.employment)}원</span>
                  </div>
                </div>

                {/* 세금 (소득세/지방소득세) */}
                <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-xs flex flex-col gap-2.5">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-100 text-xs font-bold text-zinc-800">
                    <span className="flex items-center gap-1.5">
                      <Icon icon="solar:bill-list-bold-duotone" className="text-[#c55232] text-base" />
                      세금 합계 (소득세·지방세)
                    </span>
                    <span className="text-[#c55232]">-{formatNumber(result.taxTotal)}원</span>
                  </div>
                  
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>근로소득세 (추정)</span>
                    <span className="font-semibold text-zinc-700">{formatNumber(result.incomeTax)}원</span>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500">
                    <span>지방소득세 (소득세의 10%)</span>
                    <span className="font-semibold text-zinc-700">{formatNumber(result.localTax)}원</span>
                  </div>
                </div>

              </div>

              <p className="text-sm leading-relaxed text-zinc-600">
                2026년 보험료율을 적용한 참고용 추정치입니다. 소득세는 국세청 월별 간이세액표를 직접 조회한 값이 아니며, 실제 급여명세서와 다를 수 있습니다.
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
