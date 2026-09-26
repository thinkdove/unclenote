"use client";

import { useState, useMemo } from "react";
import { Icon } from "@iconify/react";

// 분야별 프리셋 정의
type LoanCategory = "auto_new" | "auto_used" | "jeonse" | "credit";

interface CategoryPreset {
  id: LoanCategory;
  name: string;
  icon: string;
  badge: string;
  defaultAmount: number; // 원
  defaultMonths: number;
  bank1Rate: number; // 1금융권 평균 금리 (%)
  capitalRate: number; // 캐피탈/2금융권 평균 금리 (%)
  description: string;
  subOptions?: string[];
}

const CATEGORY_PRESETS: Record<LoanCategory, CategoryPreset> = {
  auto_new: {
    id: "auto_new",
    name: "신차 할부",
    icon: "solar:car-bold-duotone",
    badge: "자동차 금융",
    defaultAmount: 35000000,
    defaultMonths: 60,
    bank1Rate: 4.8,
    capitalRate: 7.9,
    description: "신차 출고 시 은행 오토론 vs 카드사/전속 캐피탈 할부 비교",
  },
  auto_used: {
    id: "auto_used",
    name: "중고차 할부",
    icon: "solar:car-smart-bold-duotone",
    badge: "자동차 금융",
    defaultAmount: 18000000,
    defaultMonths: 48,
    bank1Rate: 5.8,
    capitalRate: 11.5,
    description: "중고차 매매단지 연계 캐피탈과 1금융 모바일 전환대출 비교",
  },
  jeonse: {
    id: "jeonse",
    name: "전세자금 대출",
    icon: "solar:home-bold-duotone",
    badge: "주거 금융",
    defaultAmount: 150000000,
    defaultMonths: 24,
    bank1Rate: 3.9,
    capitalRate: 6.8,
    description: "버팀목·시중은행 전세대출 vs 한도 초과 시 2금융 보증금 담보",
  },
  credit: {
    id: "credit",
    name: "직장인 신용대출",
    icon: "solar:wallet-money-bold-duotone",
    badge: "생활 자금",
    defaultAmount: 30000000,
    defaultMonths: 36,
    bank1Rate: 4.5,
    capitalRate: 10.9,
    description: "급여이체 우대 시중은행 마통/신용대출 vs 캐피탈 긴급 대출",
  },
};

type RepaymentMethod = "equal_principal_interest" | "equal_principal" | "bullet";

interface MonthlySchedule {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function LoanCalculator() {
  const [selectedCategory, setSelectedCategory] = useState<LoanCategory>("auto_new");
  const [institution, setInstitution] = useState<"bank1" | "capital" | "custom">("bank1");
  const [repaymentMethod, setRepaymentMethod] = useState<RepaymentMethod>("equal_principal_interest");
  
  const [principalStr, setPrincipalStr] = useState<string>("35,000,000");
  const [customInterestRate, setCustomInterestRate] = useState<string>("4.8");
  const [months, setMonths] = useState<number>(60);
  const [gracePeriod, setGracePeriod] = useState<number>(0); // 거치기간 (개월)

  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  // 카테고리 변경 시 초기화
  const handleCategoryChange = (cat: LoanCategory) => {
    setSelectedCategory(cat);
    const preset = CATEGORY_PRESETS[cat];
    setPrincipalStr(new Intl.NumberFormat("ko-KR").format(preset.defaultAmount));
    setMonths(preset.defaultMonths);
    setGracePeriod(0);

    if (institution === "bank1") {
      setCustomInterestRate(preset.bank1Rate.toString());
    } else if (institution === "capital") {
      setCustomInterestRate(preset.capitalRate.toString());
    }
  };

  // 금융권 선택 변경
  const handleInstitutionChange = (type: "bank1" | "capital" | "custom") => {
    setInstitution(type);
    const preset = CATEGORY_PRESETS[selectedCategory];
    if (type === "bank1") {
      setCustomInterestRate(preset.bank1Rate.toString());
    } else if (type === "capital") {
      setCustomInterestRate(preset.capitalRate.toString());
    }
  };

  // 금액 포맷 핸들러
  const handleAmountChange = (val: string) => {
    const raw = val.replace(/[^0-9]/g, "");
    setPrincipalStr(raw ? new Intl.NumberFormat("ko-KR").format(Number(raw)) : "");
  };

  const addAmount = (addVal: number) => {
    const current = Number(principalStr.replace(/,/g, "")) || 0;
    setPrincipalStr(new Intl.NumberFormat("ko-KR").format(current + addVal));
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.max(0, Math.round(num)));
  };

  // 계산 로직 (순수 함수)
  const calculateResult = (
    p: number,
    annualRate: number,
    termMonths: number,
    graceMonths: number,
    method: RepaymentMethod
  ) => {
    if (p <= 0 || annualRate <= 0 || termMonths <= 0) {
      return {
        firstMonthPayment: 0,
        averageMonthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
        schedules: [] as MonthlySchedule[],
      };
    }

    const r = annualRate / 100 / 12; // 월 금리
    const schedules: MonthlySchedule[] = [];
    let balance = p;
    let totalInterest = 0;

    const effectiveAmortMonths = Math.max(1, termMonths - graceMonths);

    // 원리금 균등 공식 월 납입금 (거치 후)
    const pmt =
      r > 0
        ? (p * (r * Math.pow(1 + r, effectiveAmortMonths))) / (Math.pow(1 + r, effectiveAmortMonths) - 1)
        : p / effectiveAmortMonths;

    // 원금 균등 공식 월 원금 상환액
    const fixedPrincipal = p / effectiveAmortMonths;

    for (let m = 1; m <= termMonths; m++) {
      const monthInterest = balance * r;
      let monthPrincipal = 0;
      let monthPayment = 0;

      if (m <= graceMonths) {
        // 거치 기간: 이자만 납부
        monthPrincipal = 0;
        monthPayment = monthInterest;
      } else {
        if (method === "equal_principal_interest") {
          monthPayment = pmt;
          monthPrincipal = monthPayment - monthInterest;
          if (m === termMonths || balance - monthPrincipal < 0) {
            monthPrincipal = balance;
            monthPayment = monthPrincipal + monthInterest;
          }
        } else if (method === "equal_principal") {
          monthPrincipal = fixedPrincipal;
          if (m === termMonths || balance - monthPrincipal < 0) {
            monthPrincipal = balance;
          }
          monthPayment = monthPrincipal + monthInterest;
        } else {
          // 만기 일시 상환: 만기 전까지 이자만, 마지막 달에 전액
          if (m === termMonths) {
            monthPrincipal = balance;
            monthPayment = balance + monthInterest;
          } else {
            monthPrincipal = 0;
            monthPayment = monthInterest;
          }
        }
      }

      balance = Math.max(0, balance - monthPrincipal);
      totalInterest += monthInterest;

      schedules.push({
        month: m,
        payment: Math.round(monthPayment),
        principal: Math.round(monthPrincipal),
        interest: Math.round(monthInterest),
        balance: Math.round(balance),
      });
    }

    const totalPayment = p + totalInterest;
    const firstMonthPayment = schedules[0]?.payment || 0;
    const averageMonthlyPayment = totalPayment / termMonths;

    return {
      firstMonthPayment,
      averageMonthlyPayment,
      totalInterest,
      totalPayment,
      schedules,
    };
  };

  // 현재 입력 상태에 대한 계산
  const principal = Number(principalStr.replace(/,/g, "")) || 0;
  const currentRate = parseFloat(customInterestRate) || 0;

  const currentResult = useMemo(() => {
    return calculateResult(principal, currentRate, months, gracePeriod, repaymentMethod);
  }, [principal, currentRate, months, gracePeriod, repaymentMethod]);

  // 비교 분석용 (1금융권 vs 캐피탈 동일 조건 비교)
  const comparisonResult = useMemo(() => {
    const preset = CATEGORY_PRESETS[selectedCategory];
    const bank1Calc = calculateResult(principal, preset.bank1Rate, months, gracePeriod, repaymentMethod);
    const capitalCalc = calculateResult(principal, preset.capitalRate, months, gracePeriod, repaymentMethod);
    const interestDiff = capitalCalc.totalInterest - bank1Calc.totalInterest;
    const monthlyDiff = capitalCalc.firstMonthPayment - bank1Calc.firstMonthPayment;

    return {
      bank1Rate: preset.bank1Rate,
      capitalRate: preset.capitalRate,
      bank1TotalInterest: bank1Calc.totalInterest,
      capitalTotalInterest: capitalCalc.totalInterest,
      interestDiff,
      monthlyDiff,
      bank1Monthly: bank1Calc.firstMonthPayment,
      capitalMonthly: capitalCalc.firstMonthPayment,
    };
  }, [principal, months, gracePeriod, repaymentMethod, selectedCategory]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* 1. 카테고리 분야 선택 탭 (신차/중고차/전세/신용) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e8e1d8]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-[#c55232] tracking-wider uppercase flex items-center gap-1.5">
            <Icon icon="solar:stars-minimalistic-bold-duotone" width="16" height="16" />
            활용 분야 선택
          </span>
          <span className="text-xs text-zinc-400">분야별 실시간 평균 금리 자동 세팅</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(Object.keys(CATEGORY_PRESETS) as LoanCategory[]).map((catKey) => {
            const cat = CATEGORY_PRESETS[catKey];
            const isActive = selectedCategory === catKey;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(catKey)}
                className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#c55232]/5 border-[#c55232] text-[#c55232] shadow-xs"
                    : "bg-zinc-50/70 border-zinc-200/80 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100/50"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-2 transition-transform ${
                  isActive ? "bg-[#c55232] text-white scale-105" : "bg-zinc-200/60 text-zinc-600"
                }`}>
                  <Icon icon={cat.icon} />
                </div>
                <strong className="text-sm font-bold block">{cat.name}</strong>
                <span className="text-[11px] text-zinc-400 mt-0.5">{cat.badge}</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-zinc-500 mt-3 text-center sm:text-left bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
          💡 <strong>{CATEGORY_PRESETS[selectedCategory].name}</strong>: {CATEGORY_PRESETS[selectedCategory].description}
        </p>
      </div>

      {/* 2. 대출 조건 입력 카드 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e8e1d8] space-y-6">
        <h3 className="text-lg font-bold text-[#292520] flex items-center gap-2">
          <Icon icon="solar:settings-minimalistic-bold-duotone" className="text-[#c55232]" width="22" height="22" />
          상세 조건 설정
        </h3>

        {/* 2-1. 금융권 선택 (1금융권 vs 캐피탈 vs 직접입력) */}
        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-2">금융기관 구분</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleInstitutionChange("bank1")}
              className={`py-3 px-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                institution === "bank1"
                  ? "bg-[#292520] text-white border-[#292520] shadow-sm"
                  : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              제1금융권 (시중은행)
              <span className="block text-[10px] opacity-70 font-normal mt-0.5">평균 연 {CATEGORY_PRESETS[selectedCategory].bank1Rate}%</span>
            </button>
            <button
              type="button"
              onClick={() => handleInstitutionChange("capital")}
              className={`py-3 px-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                institution === "capital"
                  ? "bg-[#c55232] text-white border-[#c55232] shadow-sm"
                  : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              캐피탈·2금융권
              <span className="block text-[10px] opacity-70 font-normal mt-0.5">평균 연 {CATEGORY_PRESETS[selectedCategory].capitalRate}%</span>
            </button>
            <button
              type="button"
              onClick={() => handleInstitutionChange("custom")}
              className={`py-3 px-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                institution === "custom"
                  ? "bg-zinc-800 text-white border-zinc-800 shadow-sm"
                  : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              직접 금리 입력
              <span className="block text-[10px] opacity-70 font-normal mt-0.5">상담 금리 지정</span>
            </button>
          </div>
        </div>

        {/* 2-2. 상환 방식 (원리금균등, 원금균등, 만기일시) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-zinc-600">상환 방식</label>
            <span className="text-[11px] text-zinc-400">
              {repaymentMethod === "equal_principal_interest" && "매달 납부액이 고정되어 자금 계획에 유리"}
              {repaymentMethod === "equal_principal" && "매달 이자가 줄어들어 총 납부 이자가 가장 적음"}
              {repaymentMethod === "bullet" && "만기까지 이자만 납부 (만기 시 원금 일시상환)"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "equal_principal_interest", label: "원리금 균등", sub: "원금+이자 고정" },
              { id: "equal_principal", label: "원금 균등", sub: "이자 절약형" },
              { id: "bullet", label: "만기 일시 (이자만)", sub: "월 지출 최소" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setRepaymentMethod(m.id as RepaymentMethod)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  repaymentMethod === m.id
                    ? "bg-[#c55232]/10 border-[#c55232] text-[#c55232] font-bold"
                    : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                <span className="block text-xs sm:text-sm">{m.label}</span>
                <span className="block text-[10px] text-zinc-400 font-normal mt-0.5">{m.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-3. 대출 원금 및 빠른 증액 버튼 */}
        <div>
          <label className="block text-xs font-bold text-zinc-600 mb-2">
            대출·할부 원금
          </label>
          <div className="relative">
            <input
              type="text"
              value={principalStr}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3.5 text-right font-extrabold text-xl text-[#292520] focus:bg-white focus:border-[#c55232] focus:outline-none transition-colors"
              placeholder="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400 text-base">
              원
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {[
              { label: "+500만", val: 5000000 },
              { label: "+1,000만", val: 10000000 },
              { label: "+3,000만", val: 30000000 },
              { label: "+5,000만", val: 50000000 },
              { label: "+1억", val: 100000000 },
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={() => addAmount(btn.val)}
                className="px-2.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                {btn.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPrincipalStr("0")}
              className="px-2.5 py-1.5 bg-zinc-100 hover:bg-red-50 text-zinc-500 hover:text-red-600 text-xs font-medium rounded-lg ml-auto transition-colors cursor-pointer"
            >
              초기화
            </button>
          </div>
        </div>

        {/* 2-4. 금리 및 대출 기간 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-600 mb-2">
              연 대출 금리 (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="25"
                value={customInterestRate}
                onChange={(e) => {
                  setCustomInterestRate(e.target.value);
                  setInstitution("custom");
                }}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-right font-extrabold text-lg text-[#292520] focus:bg-white focus:border-[#c55232] focus:outline-none transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-zinc-400">
                %
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-600 mb-2">
              대출 기간 (개월)
            </label>
            <div className="flex gap-2">
              <select
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-3 font-bold text-zinc-700 focus:bg-white focus:border-[#c55232] focus:outline-none transition-colors"
              >
                <option value={12}>12개월 (1년)</option>
                <option value={24}>24개월 (2년)</option>
                <option value={36}>36개월 (3년)</option>
                <option value={48}>48개월 (4년)</option>
                <option value={60}>60개월 (5년)</option>
                <option value={72}>72개월 (6년)</option>
                <option value={84}>84개월 (7년)</option>
                <option value={120}>120개월 (10년)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-5. 거치 기간 (선택) */}
        {repaymentMethod !== "bullet" && (
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-zinc-700 block">거치 기간 (이자만 먼저 내는 기간)</span>
              <span className="text-[11px] text-zinc-400">대출 초기 원금 상환을 유예할 개월 수</span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={gracePeriod}
                onChange={(e) => setGracePeriod(Number(e.target.value))}
                className="bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-zinc-700"
              >
                <option value={0}>거치 없음 (즉시 분할상환)</option>
                <option value={6}>6개월 거치</option>
                <option value={12}>12개월 (1년) 거치</option>
                <option value={24}>24개월 (2년) 거치</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* 3. 핵심 산출 결과 카드 (Hero Result) */}
      <div className="bg-[#292520] text-white rounded-3xl p-6 sm:p-9 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#c55232]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#f7e9e2]">
            <Icon icon="solar:calculator-minimalistic-bold-duotone" />
            예상 상환액 산출 결과
          </span>
          <span className="text-xs text-zinc-400">
            {months}개월 / 연 {currentRate}% 기준
          </span>
        </div>

        <div className="mb-6">
          <span className="text-xs text-zinc-400 block mb-1">
            {repaymentMethod === "equal_principal"
              ? "첫 달 예상 납입금 (원금+이자)"
              : repaymentMethod === "bullet"
              ? "매월 납부 이자 (원금 제외)"
              : "매월 고정 납입금 (원금+이자)"}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {formatNumber(currentResult.firstMonthPayment)}
            </span>
            <span className="text-lg sm:text-xl font-bold text-zinc-300">원</span>
          </div>
          {repaymentMethod === "equal_principal" && (
            <p className="text-xs text-[#c55232] mt-1 font-medium">
              * 원금균등 방식은 원금이 매달 갚아지므로 회차가 지날수록 납부액이 점차 감소합니다.
            </p>
          )}
        </div>

        {/* 3대 핵심 지표 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-sm">
          <div className="bg-white/5 p-4 rounded-2xl">
            <span className="text-xs text-zinc-400 block mb-1">대출 원금</span>
            <strong className="text-base sm:text-lg font-bold text-white">
              {formatNumber(principal)} 원
            </strong>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl">
            <span className="text-xs text-zinc-400 block mb-1">만기까지 총 이자</span>
            <strong className="text-base sm:text-lg font-bold text-[#c55232]">
              +{formatNumber(currentResult.totalInterest)} 원
            </strong>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl">
            <span className="text-xs text-zinc-400 block mb-1">총 상환 금액 (원금+이자)</span>
            <strong className="text-base sm:text-lg font-bold text-white">
              {formatNumber(currentResult.totalPayment)} 원
            </strong>
          </div>
        </div>
      </div>

      {/* 4. 1금융권 vs 캐피탈 비교 분석 카드 (Insight Box) */}
      <div className="bg-gradient-to-br from-[#fbf8f3] to-[#f4ebe4] rounded-3xl p-6 sm:p-8 border border-[#e8e1d8] space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#c55232] text-white flex items-center justify-center text-lg">
            <Icon icon="solar:scale-bold-duotone" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-[#292520]">
              1금융권(은행) vs 캐피탈(2금융권) 실제 지출 격차 비교
            </h3>
            <p className="text-xs text-zinc-500">
              동일한 {formatNumber(principal)}원 대출 시 금융권별 금리 차이가 만드는 비용
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1금융권 카드 */}
          <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 text-xs font-bold rounded-md">
                제1금융권 (시중은행)
              </span>
              <span className="text-xs font-extrabold text-blue-600">연 {comparisonResult.bank1Rate}%</span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block">첫 달 상환액</span>
              <strong className="text-lg font-bold text-[#292520]">
                월 {formatNumber(comparisonResult.bank1Monthly)} 원
              </strong>
            </div>
            <div className="pt-2 border-t border-zinc-100 text-xs text-zinc-600 flex justify-between">
              <span>총 이자 비용:</span>
              <strong className="text-zinc-800">{formatNumber(comparisonResult.bank1TotalInterest)} 원</strong>
            </div>
          </div>

          {/* 캐피탈 카드 */}
          <div className="bg-white p-5 rounded-2xl border border-[#c55232]/30 shadow-xs space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#c55232] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
              이자 주의
            </div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-[#c55232]/10 text-[#c55232] text-xs font-bold rounded-md">
                캐피탈·2금융권
              </span>
              <span className="text-xs font-extrabold text-[#c55232]">연 {comparisonResult.capitalRate}%</span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block">첫 달 상환액</span>
              <strong className="text-lg font-bold text-[#c55232]">
                월 {formatNumber(comparisonResult.capitalMonthly)} 원
              </strong>
            </div>
            <div className="pt-2 border-t border-zinc-100 text-xs text-zinc-600 flex justify-between">
              <span>총 이자 비용:</span>
              <strong className="text-[#c55232]">{formatNumber(comparisonResult.capitalTotalInterest)} 원</strong>
            </div>
          </div>
        </div>

        {/* 결론 요약 박스 */}
        <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#c55232]/20 flex items-start gap-3">
          <Icon icon="solar:danger-triangle-bold-duotone" className="text-[#c55232] shrink-0 mt-0.5" width="20" height="20" />
          <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
            캐피탈 이용 시 1금융권 대비 <strong className="text-[#c55232]">총 {formatNumber(comparisonResult.interestDiff)}원</strong>의 이자가 추가 발생합니다.
            {comparisonResult.monthlyDiff > 0 && (
              <span> (월 상환액 기준 약 <strong>{formatNumber(comparisonResult.monthlyDiff)}원</strong> 추가 부담)</span>
            )}
            <br />
            <span className="text-zinc-500 text-xs mt-1 block">
              💡 딜러가 권하는 빠른 승인의 유혹 대신, 1금융 모바일 오토론 또는 주거래 우대 금리를 먼저 조회하는 것이 훨씬 유리합니다.
            </span>
          </div>
        </div>
      </div>

      {/* 5. 회차별 상환 스케줄러 (아코디언 토글) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e8e1d8]">
        <button
          type="button"
          onClick={() => setShowSchedule(!showSchedule)}
          className="w-full flex items-center justify-between text-left font-bold text-[#292520] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Icon icon="solar:calendar-date-bold-duotone" className="text-[#c55232]" width="22" height="22" />
            <span className="text-base sm:text-lg">회차별 상세 상환 스케줄 (1회차~{months}회차)</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#c55232]">
            <span>{showSchedule ? "접기" : "자세히 보기"}</span>
            <Icon icon={showSchedule ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"} width="16" height="16" />
          </div>
        </button>

        {showSchedule && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold">
                  <th className="py-2.5 px-3 text-center">회차</th>
                  <th className="py-2.5 px-3">월 납입금</th>
                  <th className="py-2.5 px-3">납입 원금</th>
                  <th className="py-2.5 px-3">납입 이자</th>
                  <th className="py-2.5 px-3">대출 잔액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {currentResult.schedules.map((row) => (
                  <tr key={row.month} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-2.5 px-3 text-center font-bold text-zinc-500">{row.month}회</td>
                    <td className="py-2.5 px-3 font-extrabold text-[#292520]">{formatNumber(row.payment)}원</td>
                    <td className="py-2.5 px-3 text-zinc-600">{formatNumber(row.principal)}원</td>
                    <td className="py-2.5 px-3 text-[#c55232]">{formatNumber(row.interest)}원</td>
                    <td className="py-2.5 px-3 text-zinc-400">{formatNumber(row.balance)}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
