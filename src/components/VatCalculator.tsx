"use client";

import { useState } from "react";
import { Icon } from '@iconify/react';

export default function VatCalculator() {
  const [amount, setAmount] = useState<string>("");
  const [vatType, setVatType] = useState<"general" | "simplified">("general");
  const [calculationMode, setCalculationMode] = useState<"exclude" | "include">("exclude");
  
  const [result, setResult] = useState<{
    supplyValue: number;
    vatAmount: number;
    totalAmount: number;
  } | null>(null);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.floor(num));
  };

  const calculateVat = () => {
    const numAmount = parseFloat(amount.replace(/,/g, ""));
    if (isNaN(numAmount) || numAmount <= 0) return;
    if (vatType === "simplified") return;

    let supplyValue = 0;
    let vatAmount = 0;
    let totalAmount = 0;

    if (vatType === "general") {
      if (calculationMode === "exclude") {
        // 공급가액 입력 시 (합계금액 역산)
        supplyValue = numAmount;
        vatAmount = numAmount * 0.1;
        totalAmount = numAmount * 1.1;
      } else {
        // 합계금액 입력 시 (공급가액 역산)
        totalAmount = numAmount;
        supplyValue = numAmount / 1.1;
        vatAmount = numAmount - supplyValue;
      }
    }

    setResult({
      supplyValue,
      vatAmount,
      totalAmount,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Double-Bezel Architecture Outer */}
      <div className="bg-black/[0.03] ring-1 ring-black/5 p-2 sm:p-2.5 rounded-[2.5rem]">
        {/* Inner Core */}
        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(2.5rem-0.625rem)] p-6 sm:p-10 flex flex-col gap-8">
          
          {/* 과세유형 선택 */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-zinc-700 tracking-tight">과세 유형</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100/50 rounded-2xl border border-zinc-200/50">
              <button
                onClick={() => { setResult(null); setVatType("general"); }}
                className={`py-3 text-[15px] font-bold rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  vatType === "general"
                    ? "bg-white text-[#c55232] shadow-sm border border-zinc-200/50"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                일반과세자 (10%)
              </button>
              <button
                onClick={() => { setResult(null); setVatType("simplified"); }}
                className={`py-3 text-[15px] font-bold rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  vatType === "simplified"
                    ? "bg-white text-[#c55232] shadow-sm border border-zinc-200/50"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                간이과세자
              </button>
            </div>
          </div>

          {/* 계산 기준 선택 */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-zinc-700 tracking-tight">계산 기준 (내가 입력할 금액)</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100/50 rounded-2xl border border-zinc-200/50">
              <button
                onClick={() => { setResult(null); setCalculationMode("exclude"); }}
                className={`py-3 text-[15px] font-bold rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  calculationMode === "exclude"
                    ? "bg-white text-[#c55232] shadow-sm border border-zinc-200/50"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                공급가액 입력
              </button>
              <button
                onClick={() => { setResult(null); setCalculationMode("include"); }}
                className={`py-3 text-[15px] font-bold rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  calculationMode === "include"
                    ? "bg-white text-[#c55232] shadow-sm border border-zinc-200/50"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                합계금액 입력
              </button>
            </div>
          </div>

          {/* 금액 입력 */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-zinc-700 tracking-tight">금액 입력</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setResult(null);
                  setAmount(val ? new Intl.NumberFormat("ko-KR").format(Number(val)) : "");
                }}
                placeholder="0"
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-xl font-bold rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#c55232]/20 focus:border-[#c55232] transition-all duration-300"
              />
              <span className="absolute right-5 text-zinc-400 font-bold">원</span>
            </div>
          </div>

          {/* Premium CTA Button */}
          {vatType === "simplified" && (
            <p className="rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
              간이과세자의 납부세액은 업종별 부가가치율과 공제세액에 따라 달라집니다. 단일 금액만으로는 정확히 계산할 수 없어 이 모드에서는 결과를 제공하지 않습니다. <a className="underline" href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7693&mi=2310" target="_blank" rel="noreferrer">국세청 계산 안내</a>를 확인하세요.
            </p>
          )}
          <button
            onClick={calculateVat}
            disabled={vatType === "simplified"}
            className="group relative w-full bg-[#c55232] text-white font-bold text-lg rounded-full px-8 py-4 mt-2 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.01] active:scale-[0.98] shadow-[0_4px_20px_rgba(197,82,50,0.2)] hover:shadow-[0_8px_30px_rgba(197,82,50,0.3)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
            <span className="relative z-10 flex items-center justify-center gap-3">
              결과 확인하기
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                <Icon icon="solar:arrow-right-linear" width="20" height="20" className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </span>
          </button>

          {/* 결과 창 */}
          {result && (
            <div className="mt-4 bg-[#fff4ee]/50 border border-[#f1d8cc] rounded-[1.5rem] p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <h3 className="text-sm font-extrabold text-[#c55232] tracking-tight mb-4 flex items-center gap-2">
                <Icon icon="solar:check-circle-bold-duotone" />
                계산 결과
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center py-2 border-b border-[#f1d8cc]/50">
                  <span className="text-[15px] font-semibold text-zinc-600">공급가액</span>
                  <span className="text-[17px] font-bold text-zinc-900">{formatNumber(result.supplyValue)}원</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#f1d8cc]/50">
                  <span className="text-[15px] font-semibold text-[#c55232]">부가가치세 (VAT)</span>
                  <span className="text-[17px] font-bold text-[#c55232]">+{formatNumber(result.vatAmount)}원</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-base font-bold text-zinc-900">합계금액</span>
                  <span className="text-2xl font-extrabold text-zinc-900 tracking-tight">{formatNumber(result.totalAmount)}원</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
