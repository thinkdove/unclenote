"use client";

import { useState } from "react";

export default function VatCalculator() {
  const [calcMode, setCalcMode] = useState<"supply" | "total">("supply");
  const [amount, setAmount] = useState<number>(100000);
  const [taxRate] = useState<number>(10); // 부가세 기본세율 10%

  let supplyPrice = 0;
  let vat = 0;
  let totalPrice = 0;

  if (calcMode === "supply") {
    supplyPrice = Math.round(amount);
    vat = Math.round(supplyPrice * (taxRate / 100));
    totalPrice = supplyPrice + vat;
  } else {
    totalPrice = Math.round(amount);
    supplyPrice = Math.round(totalPrice / (1 + taxRate / 100));
    vat = totalPrice - supplyPrice;
  }

  const formatNumber = (num: number) => {
    return isNaN(num) ? "0" : num.toLocaleString("ko-KR");
  };

  return (
    <div className="w-full max-w-xl bg-white border border-zinc-200 rounded-2xl shadow-lg p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
            실시간 간편 계산
          </span>
          <h2 className="text-xl font-bold text-zinc-900 mt-1">
            삼촌생각 부가세(VAT) 계산기
          </h2>
        </div>
        <div className="text-right">
          <span className="text-xs text-zinc-500">기본 세율</span>
          <p className="text-sm font-semibold text-blue-600">10%</p>
        </div>
      </div>

      {/* 탭: 공급가액 기준 vs 총액 기준 */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-zinc-100 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setCalcMode("supply")}
          className={`py-2.5 text-sm font-medium rounded-lg transition-all ${
            calcMode === "supply"
              ? "bg-white text-blue-600 shadow-sm font-semibold"
              : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          공급가액 입력 (세액 별도)
        </button>
        <button
          type="button"
          onClick={() => setCalcMode("total")}
          className={`py-2.5 text-sm font-medium rounded-lg transition-all ${
            calcMode === "total"
              ? "bg-white text-blue-600 shadow-sm font-semibold"
              : "text-zinc-600 hover:text-zinc-900"
          }`}
        >
          합계금액 입력 (세액 포함 역산)
        </button>
      </div>

      {/* 금액 입력창 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          {calcMode === "supply" ? "공급가액 (물품/서비스 금액)" : "총 결제금액 (부가세 포함 금액)"}
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            placeholder="금액을 입력하세요"
            className="w-full px-4 py-3.5 pr-12 text-lg font-semibold bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
            원
          </span>
        </div>

        {/* 간편 증감 버튼 */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {[10000, 50000, 100000, 1000000].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => setAmount((prev) => prev + step)}
              className="text-xs px-2.5 py-1.5 bg-zinc-100 text-zinc-700 rounded-md hover:bg-zinc-200 transition"
            >
              +{step.toLocaleString()}원
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount(0)}
            className="text-xs px-2.5 py-1.5 text-red-500 hover:bg-red-50 rounded-md transition ml-auto"
          >
            초기화
          </button>
        </div>
      </div>

      {/* 계산 결과 카드 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-100 rounded-xl p-5 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-600">공급가액</span>
          <span className="font-semibold text-zinc-900">
            {formatNumber(supplyPrice)} 원
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-blue-600 font-medium">부가가치세 (10%)</span>
          <span className="font-semibold text-blue-600">
            + {formatNumber(vat)} 원
          </span>
        </div>
        <div className="pt-3 border-t border-blue-200 flex justify-between items-center">
          <span className="font-bold text-zinc-900">최종 합계 금액</span>
          <span className="text-2xl font-extrabold text-blue-600">
            {formatNumber(totalPrice)} 원
          </span>
        </div>
      </div>

      <p className="text-xs text-zinc-400 mt-4 text-center">
        * Uncle Note 삼촌생각 계산기는 일반과세자(세율 10%) 기준 부가가치세를 산출합니다.
      </p>
    </div>
  );
}