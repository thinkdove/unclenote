'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function SeverancePayCalculatorPage() {
  const startDateId = useId();
  const endDateId = useId();
  const basePayId = useId();
  const allowanceId = useId();
  const bonusId = useId();
  const leaveId = useId();

  // 기본값: 3년 전 입사, 오늘 퇴사 기준 예시
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2026-03-31');
  const [basePay3Months, setBasePay3Months] = useState<number>(10500000); // 3개월 기본급 (월 350만)
  const [allowance3Months, setAllowance3Months] = useState<number>(600000); // 3개월 기타수당 (월 20만)
  const [bonusAnnual, setBonusAnnual] = useState<number>(3500000); // 연간 상여금
  const [annualLeavePay, setAnnualLeavePay] = useState<number>(0); // 연차수당
  const [copied, setCopied] = useState(false);

  // 퇴사일 입력은 화면 안내대로 마지막 근무일의 다음 날이다.
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  const datesValid = Number.isFinite(start.getTime()) && Number.isFinite(end.getTime()) && end > start;
  const totalDays = datesValid ? Math.round((end.getTime() - start.getTime()) / 86400000) : 0;
  const years = Math.floor(totalDays / 365);
  const remainingDays = totalDays % 365;
  const months = Math.floor(remainingDays / 30);
  const serviceYears = Math.max(1, Math.ceil(totalDays / 365));

  // 퇴직 전 역산한 실제 3개월의 달력 일수 (월말은 해당 월 마지막 날로 맞춤).
  const periodStart = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 3, 1));
  periodStart.setUTCDate(Math.min(end.getUTCDate(), new Date(Date.UTC(periodStart.getUTCFullYear(), periodStart.getUTCMonth() + 1, 0)).getUTCDate()));
  const last3MonthsDays = datesValid ? Math.round((end.getTime() - periodStart.getTime()) / 86400000) : 0;

  // 3개월간 임금 총액 = 3개월 기본급 + 기타수당 + (연간상여금 * 3/12) + (연간연차수당 * 3/12)
  const total3MonthsWages =
    Number(basePay3Months || 0) +
    Number(allowance3Months || 0) +
    (Number(bonusAnnual || 0) * 3) / 12 +
    (Number(annualLeavePay || 0) * 3) / 12;

  // 1일 평균임금
  const dailyAverageWage = last3MonthsDays > 0 ? Math.round(total3MonthsWages / last3MonthsDays) : 0;

  // 세전 퇴직금 = 1일 평균임금 * 30일 * (총 재직일수 / 365)
  const isEligible = totalDays >= 365;
  const grossSeverance = isEligible
    ? Math.round(dailyAverageWage * 30 * (totalDays / 365))
    : 0;

  // 2023년 이후 개정 세법 기준 퇴직소득세 간이 계산
  const calculateSeveranceTax = (severance: number, tenureYears: number) => {
    if (severance <= 0) return 0;

    // 1. 근속연수공제 (2023년 대폭 상향된 기준)
    let tenureDeduction = 0;
    if (tenureYears <= 5) {
      tenureDeduction = tenureYears * 1000000;
    } else if (tenureYears <= 10) {
      tenureDeduction = 5000000 + (tenureYears - 5) * 2000000;
    } else if (tenureYears <= 20) {
      tenureDeduction = 15000000 + (tenureYears - 10) * 2500000;
    } else {
      tenureDeduction = 40000000 + (tenureYears - 20) * 3000000;
    }

    // 2. 환산급여 = (퇴직소득 - 근속연수공제) / 근속연수 * 12
    const taxableAfterTenure = Math.max(0, severance - tenureDeduction);
    if (taxableAfterTenure <= 0) return 0;
    const convertedSalary = (taxableAfterTenure / tenureYears) * 12;

    // 3. 환산급여공제
    let convertedDeduction = 0;
    if (convertedSalary <= 8000000) {
      convertedDeduction = convertedSalary;
    } else if (convertedSalary <= 70000000) {
      convertedDeduction = 8000000 + (convertedSalary - 8000000) * 0.6;
    } else if (convertedSalary <= 100000000) {
      convertedDeduction = 45200000 + (convertedSalary - 70000000) * 0.55;
    } else if (convertedSalary <= 300000000) {
      convertedDeduction = 61700000 + (convertedSalary - 100000000) * 0.45;
    } else {
      convertedDeduction = 151700000 + (convertedSalary - 300000000) * 0.35;
    }

    // 4. 과세표준
    const taxBase = Math.max(0, convertedSalary - convertedDeduction);

    // 5. 기본세율 적용 (종합소득세율)
    let convertedTax = 0;
    if (taxBase <= 14000000) {
      convertedTax = taxBase * 0.06;
    } else if (taxBase <= 50000000) {
      convertedTax = 840000 + (taxBase - 14000000) * 0.15;
    } else if (taxBase <= 88000000) {
      convertedTax = 6240000 + (taxBase - 50000000) * 0.24;
    } else if (taxBase <= 150000000) {
      convertedTax = 15360000 + (taxBase - 88000000) * 0.35;
    } else {
      convertedTax = 37060000 + (taxBase - 150000000) * 0.38;
    }

    // 6. 산출세액 = (환산산출세액 / 12) * 근속연수
    const calculatedIncomeTax = Math.floor((convertedTax / 12) * tenureYears);
    // 지방소득세 10%
    const calculatedLocalTax = Math.floor(calculatedIncomeTax * 0.1);

    return calculatedIncomeTax + calculatedLocalTax;
  };

  const estimatedTax = calculateSeveranceTax(grossSeverance, serviceYears);
  const netSeverance = Math.max(0, grossSeverance - estimatedTax);

  const handleCopy = () => {
    const text = `[삼촌노트 퇴직금 계산 결과]
• 재직기간: ${startDate} ~ ${endDate} (${totalDays}일 / 약 ${years}년 ${months}개월)
• 1일 평균임금: ${dailyAverageWage.toLocaleString()}원
• 세전 퇴직금: ${grossSeverance.toLocaleString()}원
• 예상 퇴직소득세(지방세 포함): ${estimatedTax.toLocaleString()}원
• 실제 통장 수령액(세후): ${netSeverance.toLocaleString()}원
계산기 바로가기: https://UncleNote.com/severance-pay-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Breadcrumb & Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-[#c55232] mb-3">
          <Icon icon="solar:calculator-bold-duotone" width="20" height="20" />
          <span>2026 최신 근로기준법 & 세법 반영</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#292520] tracking-tight mb-3">
          퇴직금 실수령액 계산기
        </h1>
        <p className="text-zinc-600 text-base leading-relaxed">
          입사일과 퇴사일, 최근 3개월 급여를 입력하면 <strong className="text-[#292520]">예상 퇴직금과 세후 참고 금액</strong>을 확인할 수 있습니다. 통상임금이 평균임금보다 높은 경우 등 개별 조건은 별도 확인이 필요합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form (Card) */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-zinc-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
          <h2 className="text-lg font-bold text-[#292520] border-b border-zinc-100 pb-3 flex items-center justify-between">
            <span>근무 기간 및 임금 정보</span>
            <span className="text-xs font-normal text-zinc-400">회원가입 없이 즉시 연산</span>
          </h2>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={startDateId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                입사일
              </label>
              <input
                id={startDateId}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fdfbf7] border border-zinc-200 rounded-xl text-sm font-semibold text-[#292520] focus:outline-none focus:ring-2 focus:ring-[#c55232]/30 focus:border-[#c55232]"
              />
            </div>
            <div>
              <label htmlFor={endDateId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                퇴사일 (마지막 근무일 익일)
              </label>
              <input
                id={endDateId}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#fdfbf7] border border-zinc-200 rounded-xl text-sm font-semibold text-[#292520] focus:outline-none focus:ring-2 focus:ring-[#c55232]/30 focus:border-[#c55232]"
              />
            </div>
          </div>

          {/* Tenure summary pill */}
          <div className="bg-[#fdfbf7] p-3.5 rounded-xl border border-zinc-200/50 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-500 font-medium">총 재직 일수</span>
            <span className="font-bold text-[#292520]">
              {totalDays.toLocaleString()}일{' '}
              <span className="text-[#c55232]">
                (약 {years}년 {months}개월)
              </span>
            </span>
          </div>

          {!datesValid && (
            <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              퇴사일은 입사일보다 늦어야 합니다. 마지막 근무일의 다음 날을 입력해 주세요.
            </p>
          )}
          {datesValid && !isEligible && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
              ⚠️ 근로기준법상 계속근로기간이 <strong>1년(365일) 미만</strong>인 경우 법정 퇴직금 지급 대상이 아닙니다.
            </div>
          )}

          {/* Wages Inputs */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={basePayId} className="text-xs font-bold text-zinc-600">
                  퇴직 전 최근 3개월 기본급 합계
                </label>
                <span className="text-xs text-zinc-400">
                  (월 {Math.round(basePay3Months / 3).toLocaleString()}원 수준)
                </span>
              </div>
              <div className="relative">
                <input
                  id={basePayId}
                  type="number"
                  step="100000"
                  value={basePay3Months}
                  onChange={(e) => setBasePay3Months(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#fdfbf7] border border-zinc-200 rounded-xl text-sm font-bold text-[#292520] text-right pr-8 focus:outline-none focus:ring-2 focus:ring-[#c55232]/30 focus:border-[#c55232]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-bold">
                  원
                </span>
              </div>
            </div>

            <div>
              <label htmlFor={allowanceId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                퇴직 전 최근 3개월 기타수당 합계 (식대, 직책수당 등 정기수당)
              </label>
              <div className="relative">
                <input
                  id={allowanceId}
                  type="number"
                  step="50000"
                  value={allowance3Months}
                  onChange={(e) => setAllowance3Months(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#fdfbf7] border border-zinc-200 rounded-xl text-sm font-bold text-[#292520] text-right pr-8 focus:outline-none focus:ring-2 focus:ring-[#c55232]/30 focus:border-[#c55232]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-bold">
                  원
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={bonusId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                  최근 1년간 상여금 총액
                </label>
                <div className="relative">
                  <input
                    id={bonusId}
                    type="number"
                    step="100000"
                    value={bonusAnnual}
                    onChange={(e) => setBonusAnnual(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#fdfbf7] border border-zinc-200 rounded-xl text-sm font-bold text-[#292520] text-right pr-8 focus:outline-none focus:ring-2 focus:ring-[#c55232]/30 focus:border-[#c55232]"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-bold">
                    원
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">※ 3/12만 평균임금에 반영됩니다.</p>
              </div>

              <div>
                <label htmlFor={leaveId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                  최근 1년간 연차수당 총액
                </label>
                <div className="relative">
                  <input
                    id={leaveId}
                    type="number"
                    step="100000"
                    value={annualLeavePay}
                    onChange={(e) => setAnnualLeavePay(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#fdfbf7] border border-zinc-200 rounded-xl text-sm font-bold text-[#292520] text-right pr-8 focus:outline-none focus:ring-2 focus:ring-[#c55232]/30 focus:border-[#c55232]"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-bold">
                    원
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">※ 미사용 연차수당 3/12 반영</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Receipt Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
              <span className="text-xs uppercase tracking-wider font-bold text-zinc-400">
                Calculation Result
              </span>
              <span className="px-2.5 py-1 bg-[#c55232]/10 text-[#c55232] text-xs font-bold rounded-md">
                2026년 기준
              </span>
            </div>

            {/* Big Net Pay Display */}
            <div className="mb-6 text-center bg-[#fdfbf7] p-5 rounded-2xl border border-zinc-200/60">
              <p className="text-xs font-semibold text-zinc-500 mb-1.5">
                내 통장에 실제로 들어오는 돈 (세후)
              </p>
              <p className="text-3xl sm:text-4xl font-black text-[#c55232] tracking-tight">
                {netSeverance.toLocaleString()}
                <span className="text-xl font-bold text-[#292520] ml-1">원</span>
              </p>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center text-zinc-600">
                <span>1일 평균임금</span>
                <span className="font-semibold text-zinc-800">
                  {dailyAverageWage.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between items-center text-zinc-600">
                <span>세전 법정 퇴직금</span>
                <span className="font-bold text-zinc-900 text-base">
                  {grossSeverance.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between items-center text-zinc-500 pt-2 border-t border-dashed border-zinc-200">
                <span>예상 퇴직소득세 (지방세 포함)</span>
                <span className="font-semibold text-rose-600">
                  - {estimatedTax.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-400">
                <span>실효 세율</span>
                <span>
                  {grossSeverance > 0
                    ? ((estimatedTax / grossSeverance) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-4">
            <button
              onClick={handleCopy}
              className="w-full py-3.5 bg-[#292520] text-white font-bold text-sm rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Icon icon={copied ? 'solar:check-circle-bold' : 'solar:copy-linear'} width="18" height="18" />
              <span>{copied ? '결과가 복사되었습니다!' : '계산 결과 1초 복사하기'}</span>
            </button>

            <Link
              href="/guide/severance-pay-guide-2026"
              className="w-full py-3 bg-[#fdfbf7] text-[#c55232] border border-[#c55232]/30 font-bold text-xs rounded-xl hover:bg-[#c55232]/5 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>퇴직금 세금 30% 아끼는 IRP 꿀팁 읽기</span>
              <Icon icon="solar:arrow-right-linear" />
            </Link>
          </div>
        </div>
      </div>

      {/* Legal & Educational Info Section */}
      <section className="mt-16 bg-white/80 p-6 sm:p-8 rounded-3xl border border-zinc-200/70 shadow-xs space-y-6">
        <h3 className="text-xl font-bold text-[#292520] flex items-center gap-2">
          <Icon icon="solar:lightbulb-bold-duotone" className="text-[#c55232]" width="24" height="24" />
          <span>삼촌이 짚어주는 퇴직금 핵심 체크포인트</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-600">
          <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-zinc-200/50">
            <h4 className="font-bold text-zinc-900 mb-1.5">1. 퇴직금 지급 기한과 지연이자</h4>
            <p className="leading-relaxed">
              근로기준법 제36조에 따라 사용자는 근로자가 퇴직한 날로부터 <strong>14일 이내</strong>에 퇴직금을 전액 지급해야 합니다. 합의 없이 14일을 넘길 경우 연 20%의 지연이자가 가산됩니다.
            </p>
          </div>

          <div className="bg-[#fdfbf7] p-5 rounded-2xl border border-zinc-200/50">
            <h4 className="font-bold text-zinc-900 mb-1.5">2. 아르바이트·수습기간도 퇴직금 대상</h4>
            <p className="leading-relaxed">
              주 15시간 이상, 1년 이상 계속 근로했다면 4대 보험 가입 여부나 고용 형태(계약직, 인턴, 알바)와 무관하게 법정 퇴직금을 전액 청구할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
