'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function WageCalculatorPage() {
  const hourlyWageId = useId();
  const daysPerWeekId = useId();
  const hoursPerDayId = useId();
  const breakTimeId = useId();

  // 2026년 법정 최저시급: 10,320원 (2025년 10,030원, 2027년 예상치 약 10,650원)
  const MIN_WAGE_2025 = 10030;
  const MIN_WAGE_2026 = 10320;
  const ESTIMATED_WAGE_2027 = 10650;

  const [hourlyWage, setHourlyWage] = useState<number>(MIN_WAGE_2026);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [hoursPerDay, setHoursPerDay] = useState<number>(9); // 체류시간 (예: 9시~18시 9시간 체류)
  const [breakMinutes, setBreakMinutes] = useState<number>(60); // 법정 무급 휴게시간 1시간(60분)
  const [taxOption, setTaxOption] = useState<'none' | 'fourInsurance' | 'freelancer'>('fourInsurance');
  const [copied, setCopied] = useState(false);

  // 실제 1일 유급 실근로시간 (체류시간 - 무급 휴게시간)
  const paidDailyHours = Math.max(0, hoursPerDay - breakMinutes / 60);

  // 1주 소정근로시간
  const weeklyWorkHours = Math.max(0, daysPerWeek * paidDailyHours);

  // 주 15시간 이상 여부 (근로기준법 제18조 제3항)
  const isHolidayAllowanceEligible = weeklyWorkHours >= 15;

  // 1주 주휴시간 (근로기준법 시행령 제30조)
  // 주 40시간 이상: 8시간 / 주 15시간 이상 40시간 미만: (주 근로시간 / 40) * 8
  const weeklyHolidayHours = isHolidayAllowanceEligible
    ? weeklyWorkHours >= 40
      ? 8
      : (weeklyWorkHours / 40) * 8
    : 0;

  // 1주 기본급 및 주휴수당
  const weeklyBasePay = Math.round(weeklyWorkHours * hourlyWage);
  const weeklyHolidayPay = Math.round(weeklyHolidayHours * hourlyWage);
  const weeklyTotalPay = weeklyBasePay + weeklyHolidayPay;

  // 월 환산 (1달 = 평균 4.345주, 365일 / 12개월 / 7일)
  const monthlyAverageWeeks = 365 / 12 / 7; // 약 4.3452주
  const monthlyTotalHours = Math.round((weeklyWorkHours + weeklyHolidayHours) * monthlyAverageWeeks);
  const monthlyGrossPay = Math.round(weeklyTotalPay * monthlyAverageWeeks);

  // 공제액 계산
  let deductionAmount = 0;
  let deductionLabel = '공제 없음';

  if (taxOption === 'freelancer') {
    // 3.3% 사업소득세
    deductionAmount = Math.floor(monthlyGrossPay * 0.033);
    deductionLabel = '3.3% 사업소득세';
  } else if (taxOption === 'fourInsurance') {
    // 4대 보험 (월 60시간 이상 시 의무: 약 9.4%)
    if (weeklyWorkHours * monthlyAverageWeeks >= 60) {
      deductionAmount = Math.floor(monthlyGrossPay * 0.094);
      deductionLabel = '4대 보험료 (약 9.4%)';
    } else {
      deductionAmount = 0;
      deductionLabel = '월 60시간 미만 (4대보험 면제)';
    }
  }

  const monthlyNetPay = Math.max(0, monthlyGrossPay - deductionAmount);

  // 최저임금 미달 여부 판별
  const isUnderMinWage = hourlyWage < MIN_WAGE_2026;

  const handleCopy = () => {
    const text = `[삼촌생각 최저임금 & 주휴수당 계산 결과]
• 적용 시급: ${hourlyWage.toLocaleString()}원 (2026 법정 최저시급: 10,320원)
• 근무 조건: 주 ${daysPerWeek}일 / 체류 ${hoursPerDay}시간 (무급 휴게 ${breakMinutes}분 제외, 1일 실근로 ${paidDailyHours}시간)
• 1주 실근로: ${weeklyWorkHours}시간 ${isHolidayAllowanceEligible ? '(주 15시간 이상: 주휴수당 발생 대상)' : '(주 15시간 미만: 주휴수당 미발생)'}
• 1주 주휴수당: ${weeklyHolidayPay.toLocaleString()}원 (주휴시간: ${weeklyHolidayHours.toFixed(1)}시간)
• 월 환산 총급여(세전): ${monthlyGrossPay.toLocaleString()}원 (월 ${monthlyTotalHours}시간분)
• 공제 항목: ${deductionLabel} (-${deductionAmount.toLocaleString()}원)
• 실제 통장 입금액(세후): ${monthlyNetPay.toLocaleString()}원
• 1년 이상 근무 시 퇴직금: ${isHolidayAllowanceEligible ? '✅ 법정 퇴직금 100% 발생 대상' : '❌ 주 15시간 미만으로 퇴직금 미발생'}
계산기 바로가기: https://unclenote.com/wage-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-[#c55232] mb-3">
          <Icon icon="solar:clock-circle-bold-duotone" width="20" height="20" />
          <span>2026·2027 최신 근로기준법 제54조·제55조 반영</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#292520] tracking-tight mb-3">
          최저임금 & 주휴수당 급여계산기
        </h1>
        <p className="text-zinc-600 text-base leading-relaxed">
          2026년 확정 최저시급(10,320원)과 무급 휴게시간 규정을 반영하여, 주 15시간 이상 근로 시 발생하는 <strong className="text-[#292520]">법정 주휴수당과 통장 실수령액</strong>을 1초 만에 정확하게 산출해 드립니다.
        </p>
      </div>

      {/* Year Selection Quick Pills */}
      <div className="bg-white/80 p-4 rounded-2xl border border-zinc-200/70 mb-8 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <span className="text-xs font-bold text-zinc-500 flex items-center gap-1.5">
          <Icon icon="solar:tag-bold" className="text-[#c55232]" />
          <span>기준 시급 빠른 선택:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setHourlyWage(MIN_WAGE_2025)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              hourlyWage === MIN_WAGE_2025
                ? 'bg-[#292520] text-white shadow-xs'
                : 'bg-[#fdfbf7] border border-zinc-200 text-zinc-600 hover:border-zinc-400'
            }`}
          >
            2025년 (10,030원)
          </button>
          <button
            onClick={() => setHourlyWage(MIN_WAGE_2026)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              hourlyWage === MIN_WAGE_2026
                ? 'bg-[#c55232] text-white shadow-xs'
                : 'bg-[#fdfbf7] border border-zinc-200 text-zinc-600 hover:border-zinc-400'
            }`}
          >
            ⭐ 2026년 확정 (10,320원)
          </button>
          <button
            onClick={() => setHourlyWage(ESTIMATED_WAGE_2027)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              hourlyWage === ESTIMATED_WAGE_2027
                ? 'bg-[#292520] text-white shadow-xs'
                : 'bg-[#fdfbf7] border border-zinc-200 text-zinc-600 hover:border-zinc-400'
            }`}
          >
            2027년 전망치 (약 10,650원)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-zinc-200/70 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
          <h2 className="text-lg font-bold text-[#292520] border-b border-zinc-100 pb-3 flex items-center justify-between">
            <span>근무 조건 입력</span>
            <span className="text-xs font-normal text-zinc-400">근로기준법 표준</span>
          </h2>

          {/* Hourly Wage Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor={hourlyWageId} className="text-sm font-bold text-[#292520]">
                시급 (원)
              </label>
              {isUnderMinWage && (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md">
                  ⚠️ 2026 최저시급(10,320원) 미달
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id={hourlyWageId}
                type="number"
                step="10"
                value={hourlyWage}
                onChange={(e) => setHourlyWage(Number(e.target.value))}
                className="w-full px-4 py-3 bg-[#fdfbf7] border border-zinc-200 rounded-xl text-base font-bold text-[#292520] text-right pr-9 focus:outline-none focus:ring-2 focus:ring-[#c55232]/30 focus:border-[#c55232]"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-bold">
                원
              </span>
            </div>
          </div>

          {/* Days & Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={daysPerWeekId} className="block text-sm font-bold text-[#292520] mb-2">
                1주일 근무 일수
              </label>
              <select
                id={daysPerWeekId}
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full px-3.5 py-3 bg-[#fdfbf7] border border-zinc-200 rounded-xl text-base font-bold text-[#292520] focus:outline-none focus:ring-2 focus:ring-[#c55232]/30 focus:border-[#c55232]"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <option key={d} value={d}>
                    주 {d}일 근무
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={hoursPerDayId} className="block text-sm font-bold text-[#292520] mb-2">
                하루 체류 시간 (출근~퇴근)
              </label>
              <select
                id={hoursPerDayId}
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full px-3.5 py-3 bg-[#fdfbf7] border border-zinc-200 rounded-xl text-base font-bold text-[#292520] focus:outline-none focus:ring-2 focus:ring-[#c55232]/30 focus:border-[#c55232]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((h) => (
                  <option key={h} value={h}>
                    하루 {h}시간 체류 {h === 9 ? '(9~18시)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Break Time (휴게시간 - 근로기준법 제54조) */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <label htmlFor={breakTimeId} className="text-sm font-bold text-[#292520]">
                무급 휴게시간 (점심·식사시간 등)
              </label>
              <span className="text-xs text-[#c55232] font-bold">
                근로기준법 제54조: 4h당 30분, 8h당 1h 의무
              </span>
            </div>
            <select
              id={breakTimeId}
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
              className="w-full px-3.5 py-3 bg-[#fdfbf7] border border-zinc-200 rounded-xl text-base font-bold text-[#292520] focus:outline-none focus:ring-2 focus:ring-[#c55232]/30 focus:border-[#c55232]"
            >
              <option value={0}>휴게시간 없음 (0분)</option>
              <option value={30}>30분 무급 휴게 (4시간 이상 근무 시 법정)</option>
              <option value={60}>1시간 무급 휴게 (8시간 이상 근무 시 법정 점심시간)</option>
              <option value={90}>1시간 30분 무급 휴게</option>
              <option value={120}>2시간 무급 휴게</option>
            </select>
            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
              ※ 휴게시간은 근로자가 자유롭게 이용할 수 있는 시간이므로 법적으로 임금 계산에서 제외됩니다.
            </p>
          </div>

          {/* Real Work Hours & Holiday Eligibility Banner */}
          <div className="bg-[#fdfbf7] p-4 rounded-2xl border border-zinc-200/60 space-y-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 font-medium">1일 실제 유급 근로시간:</span>
              <span className="font-bold text-[#292520]">
                {paidDailyHours}시간{' '}
                <span className="text-zinc-400 font-normal">
                  (체류 {hoursPerDay}h - 무급 휴게 {breakMinutes}분)
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 font-medium">1주일 총 유급 근로시간:</span>
              <span className="font-bold text-[#292520]">{weeklyWorkHours}시간</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-zinc-200/50">
              <span className="text-zinc-500 font-medium">주휴수당 발생 여부:</span>
              <span
                className={`font-bold px-2.5 py-1 rounded-md text-xs ${
                  isHolidayAllowanceEligible
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                {isHolidayAllowanceEligible
                  ? `✅ 주휴수당 발생 (${weeklyHolidayHours.toFixed(1)}시간분)`
                  : '⚠️ 주 15시간 미만으로 미발생'}
              </span>
            </div>
          </div>

          {/* Tax/Deduction Option */}
          <div>
            <span className="block text-xs font-bold text-zinc-600 mb-2">
              세금 및 4대보험 공제 선택
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTaxOption('none')}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  taxOption === 'none'
                    ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                    : 'border-zinc-200 bg-[#fdfbf7] text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                미적용 (세전)
              </button>
              <button
                type="button"
                onClick={() => setTaxOption('fourInsurance')}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  taxOption === 'fourInsurance'
                    ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                    : 'border-zinc-200 bg-[#fdfbf7] text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                4대 보험
              </button>
              <button
                type="button"
                onClick={() => setTaxOption('freelancer')}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  taxOption === 'freelancer'
                    ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                    : 'border-zinc-200 bg-[#fdfbf7] text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                3.3% 공제
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1.5">
              ※ 주 15시간(월 60시간) 이상 근무 시 4대 보험 의무 가입 대상입니다.
            </p>
          </div>
        </div>

        {/* Right: Results Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
              <span className="text-xs uppercase tracking-wider font-bold text-zinc-400">
                Monthly Wage Summary
              </span>
              <span className="px-2.5 py-1 bg-[#c55232]/10 text-[#c55232] text-xs font-bold rounded-md">
                주휴수당 포함
              </span>
            </div>

            {/* Monthly Net Pay Display */}
            <div className="mb-6 text-center bg-[#fdfbf7] p-5 rounded-2xl border border-zinc-200/60">
              <p className="text-xs font-semibold text-zinc-500 mb-1.5">
                월 예상 실수령액 ({taxOption === 'none' ? '세전' : '공제 후'})
              </p>
              <p className="text-3xl sm:text-4xl font-black text-[#c55232] tracking-tight">
                {monthlyNetPay.toLocaleString()}
                <span className="text-xl font-bold text-[#292520] ml-1">원</span>
              </p>
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center text-zinc-600">
                <span>1주 기본급 ({weeklyWorkHours}시간)</span>
                <span className="font-semibold text-zinc-800">
                  {weeklyBasePay.toLocaleString()}원
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-600">
                <span>
                  1주 주휴수당{' '}
                  <span className="text-xs text-[#c55232] font-semibold">
                    ({weeklyHolidayHours.toFixed(1)}시간분)
                  </span>
                </span>
                <span className="font-bold text-[#c55232]">
                  + {weeklyHolidayPay.toLocaleString()}원
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-600 pt-2 border-t border-dashed border-zinc-200">
                <span>1주일 총 급여 (주휴 포함)</span>
                <span className="font-bold text-zinc-900">
                  {weeklyTotalPay.toLocaleString()}원
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-600">
                <span>월 환산 총 급여 (세전)</span>
                <span className="font-bold text-zinc-900">
                  {monthlyGrossPay.toLocaleString()}원
                </span>
              </div>

              {deductionAmount > 0 && (
                <div className="flex justify-between items-center text-zinc-500 text-xs pt-1">
                  <span>{deductionLabel}</span>
                  <span className="font-semibold text-rose-600">
                    - {deductionAmount.toLocaleString()}원
                  </span>
                </div>
              )}

              {/* Severance Pay Eligibility Callout */}
              <div className="mt-4 p-3 bg-[#fdfbf7] rounded-xl border border-zinc-200/60 text-xs text-zinc-600 space-y-1">
                <div className="flex items-center justify-between font-bold text-[#292520]">
                  <span>퇴직금 발생 여부:</span>
                  <span className={isHolidayAllowanceEligible ? 'text-emerald-700' : 'text-amber-700'}>
                    {isHolidayAllowanceEligible ? '1년 이상 근무 시 발생' : '발생 안 함 (주 15h 미만)'}
                  </span>
                </div>
                {isHolidayAllowanceEligible && (
                  <p className="text-[11px] text-zinc-500">
                    주 15시간 이상 일하셨다면 알바라도 1년 후 법정 퇴직금을 전액 수령합니다.{' '}
                    <Link href="/severance-pay-calculator" className="text-[#c55232] font-bold underline">
                      퇴직금 계산하기 →
                    </Link>
                  </p>
                )}
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
              <span>{copied ? '결과가 복사되었습니다!' : '급여 계산 결과 1초 복사하기'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Labor Standards Act Guide & FAQ Section */}
      <section className="mt-16 space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <h2 className="text-2xl font-bold text-[#292520] flex items-center gap-2">
            <Icon icon="solar:lightbulb-bold-duotone" className="text-[#c55232]" width="26" height="26" />
            <span>근로기준법 핵심 FAQ: 휴게시간과 퇴직금의 모든 것</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-1">알바와 직장인이 가장 많이 묻는 4대 핵심 노동법 쟁점</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-600">
          
          {/* FAQ 1: 휴게시간 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-xs space-y-2">
            <h3 className="font-bold text-[#292520] text-base flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">1</span>
              휴게시간(점심시간)은 어떻게 처리되나요?
            </h3>
            <p className="leading-relaxed text-xs sm:text-sm text-zinc-600">
              <strong>근로기준법 제54조</strong>에 따라 근로시간이 4시간이면 30분 이상, 8시간이면 1시간 이상의 휴게시간을 <strong>근로시간 도중에 반드시 유급이 아닌 &apos;무급&apos;으로 부여</strong>해야 합니다.
            </p>
            <p className="text-xs text-zinc-500 bg-[#fdfbf7] p-3 rounded-xl border border-zinc-100">
              ⚠️ <strong>주의 (대기시간):</strong> 손님이 없어서 카운터에 앉아 대기하거나 전화를 받는 시간은 자유로운 휴게시간이 아니라 &apos;근로 대기시간&apos;이므로 <strong>전액 시급이 지급</strong>되어야 합니다.
            </p>
          </div>

          {/* FAQ 2: 주 15시간 퇴직금 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-xs space-y-2">
            <h3 className="font-bold text-[#292520] text-base flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">2</span>
              주 15시간 알바도 퇴직금을 받을 수 있나요?
            </h3>
            <p className="leading-relaxed text-xs sm:text-sm text-zinc-600">
              <strong>네, 무조건 100% 보장됩니다.</strong> 4주간 평균하여 1주 소정근로시간이 15시간 이상이고 계속근로기간이 1년(365일)을 넘었다면 고용 형태(알바, 계약직, 수습)나 4대보험 가입 여부, 사업장 규모(5인 미만 포함)와 무관하게 법정 퇴직금을 전액 지급해야 합니다.
            </p>
            <p className="text-xs text-zinc-500 bg-[#fdfbf7] p-3 rounded-xl border border-zinc-100">
              💡 퇴직금은 <code>(1일 평균임금 × 30일 × 재직일수) ÷ 365</code>로 산출됩니다.
            </p>
          </div>

          {/* FAQ 3: 수습 감액 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-xs space-y-2">
            <h3 className="font-bold text-[#292520] text-base flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">3</span>
              수습기간이라고 시급 10% 깎아도 합법인가요?
            </h3>
            <p className="leading-relaxed text-xs sm:text-sm text-zinc-600">
              <strong>원칙적으로 불법인 경우가 많습니다.</strong> 최저임금법 제5조에 따라 시급을 90%로 감액 지급하려면 <strong>① 근로계약 기간이 1년 이상</strong>이어야 하고 <strong>② 수습 시작일로부터 3개월 이내</strong>여야 합니다.
            </p>
            <p className="text-xs text-zinc-500 bg-[#fdfbf7] p-3 rounded-xl border border-zinc-100">
              ❌ <strong>단순노무직 감액 금지:</strong> 편의점, 패스트푸드, 주유원, 서빙 등 한국표준직업분류상 단순노무종사자는 계약 기간과 무관하게 <strong>수습 감액이 법적으로 금지</strong>되며 최저시급 100%를 전액 받아야 합니다.
            </p>
          </div>

          {/* FAQ 4: 주휴수당 쪼개기 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/70 shadow-xs space-y-2">
            <h3 className="font-bold text-[#292520] text-base flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">4</span>
              주휴수당 안 주면 처벌 수위는?
            </h3>
            <p className="leading-relaxed text-xs sm:text-sm text-zinc-600">
              주휴수당은 권고사항이 아닌 근로기준법상 <strong>강행규정</strong>입니다. 정당한 사유 없이 주휴수당을 미지급할 경우 근로기준법 제109조에 따라 <strong>3년 이하의 징역 또는 3천만 원 이하의 벌금</strong>에 처해집니다.
            </p>
            <p className="text-xs text-zinc-500 bg-[#fdfbf7] p-3 rounded-xl border border-zinc-100">
              📞 미지급 시 노동청 진정을 통해 최근 3년 치 미지급 주휴수당을 소급 청구할 수 있습니다.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
