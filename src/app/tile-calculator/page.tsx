'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

// 표준 타일 규격 프리셋 데이터 (국내 유통 표준)
interface TilePreset {
  id: string;
  name: string;
  alias: string;
  widthMm: number;
  heightMm: number;
  piecesPerBox: number;
  sqmPerBox: number;
  recommendFor: string;
  weightPerBoxKg: number;
}

const TILE_PRESETS: TilePreset[] = [
  {
    id: '300x300',
    name: '300mm × 300mm',
    alias: '300각 타일',
    widthMm: 300,
    heightMm: 300,
    piecesPerBox: 16,
    sqmPerBox: 1.44,
    recommendFor: '욕실 바닥, 베란다, 다용도실 표준 바닥재',
    weightPerBoxKg: 20,
  },
  {
    id: '300x600',
    name: '300mm × 600mm',
    alias: '300×600각 타일',
    widthMm: 300,
    heightMm: 600,
    piecesPerBox: 8,
    sqmPerBox: 1.44,
    recommendFor: '욕실 벽면, 주방 싱크대 벽면 가장 보편적인 규격',
    weightPerBoxKg: 22,
  },
  {
    id: '600x600',
    name: '600mm × 600mm',
    alias: '600각 포세린',
    widthMm: 600,
    heightMm: 600,
    piecesPerBox: 4,
    sqmPerBox: 1.44,
    recommendFor: '거실 바닥, 현관, 호텔식 고급 욕실 바닥·벽면 일체형',
    weightPerBoxKg: 30,
  },
  {
    id: '200x200',
    name: '200mm × 200mm',
    alias: '200각 소형 타일',
    widthMm: 200,
    heightMm: 200,
    piecesPerBox: 25,
    sqmPerBox: 1.0,
    recommendFor: '소형 화장실, 레트로 패턴 타일, 포인트 바닥',
    weightPerBoxKg: 15,
  },
  {
    id: '100x300',
    name: '100mm × 300mm',
    alias: '쪽타일 / 서브웨이',
    widthMm: 100,
    heightMm: 300,
    piecesPerBox: 33,
    sqmPerBox: 0.99,
    recommendFor: '주방 벽면, 세련된 카페풍 인테리어 포인트',
    weightPerBoxKg: 14,
  },
];

type CalcMode = '2d' | '3d' | 'area';

export default function TileCalculatorPage() {
  const widthInputId = useId();
  const lengthInputId = useId();
  const heightInputId = useId();
  const customLossId = useId();

  // 계산 모드:
  // '2d' (가로 × 세로만 알 때: 바닥 or 단일벽)
  // '3d' (가로 × 세로 × 높이 다 알 때: 욕실/방 입체 공간 전체)
  // 'area' (총 면적 ㎡ 또는 평수만 알 때)
  const [calcMode, setCalcMode] = useState<CalcMode>('3d');

  // 치수 입력 (단위: 미터 m)
  const [widthM, setWidthM] = useState<number>(1.6); // 가로 (일반 아파트 욕실 기준 1.6m)
  const [lengthM, setLengthM] = useState<number>(2.1); // 세로 (일반 아파트 욕실 기준 2.1m)
  const [heightM, setHeightM] = useState<number>(2.2); // 높이 (일반 아파트 욕실 기준 2.2m)
  const [scope3D, setScope3D] = useState<'all' | 'wallOnly'>('all'); // all: 바닥+벽4면, wallOnly: 벽4면만
  const [doorDeductionSqm, setDoorDeductionSqm] = useState<number>(2.0); // 문/거울장 공제 면적 (기본 2㎡)

  // 직접 면적 입력 모드용
  const [directAreaSqm, setDirectAreaSqm] = useState<number>(5.0);
  const [directUnit, setDirectUnit] = useState<'sqm' | 'pyung'>('sqm');

  // 선택된 타일 프리셋
  const [selectedPresetId, setSelectedPresetId] = useState<string>('300x600');

  // 로스율 (표준 기본값: 10%)
  const [lossRate, setLossRate] = useState<number>(10);
  const [isCustomLoss, setIsCustomLoss] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  const currentPreset = TILE_PRESETS.find((p) => p.id === selectedPresetId) || TILE_PRESETS[1];

  // 순 면적(Net Area ㎡) 계산
  let netAreaSqm = 0;
  if (calcMode === '2d') {
    // 가로 x 세로만 알 때 (단일 평면)
    netAreaSqm = Math.max(0, widthM * lengthM);
  } else if (calcMode === '3d') {
    // 가로 x 세로 x 높이 다 알 때 (입체 공간)
    const floorArea = widthM * lengthM;
    const wallArea = 2 * (widthM + lengthM) * heightM;
    if (scope3D === 'all') {
      netAreaSqm = Math.max(0, floorArea + wallArea - doorDeductionSqm);
    } else {
      netAreaSqm = Math.max(0, wallArea - doorDeductionSqm);
    }
  } else {
    // 총 면적 다이렉트 입력
    if (directUnit === 'pyung') {
      netAreaSqm = Math.max(0, directAreaSqm * 3.3058);
    } else {
      netAreaSqm = Math.max(0, directAreaSqm);
    }
  }

  // 평수 환산 (1평 = 3.3058㎡)
  const netAreaPyung = (netAreaSqm / 3.3058).toFixed(1);

  // 로스율(여유분) 반영 면적
  const totalAreaWithLoss = netAreaSqm * (1 + lossRate / 100);

  // 1장당 면적 (㎡)
  const pieceAreaSqm = (currentPreset.widthMm / 1000) * (currentPreset.heightMm / 1000);

  // 타일 장수 계산
  const netPieces = Math.ceil(netAreaSqm / pieceAreaSqm);
  const totalPiecesWithLoss = Math.ceil(totalAreaWithLoss / pieceAreaSqm);

  // 박스 수 계산 (소수점 올림)
  const netBoxes = Math.ceil(netAreaSqm / currentPreset.sqmPerBox);
  const totalBoxesWithLoss = Math.ceil(totalAreaWithLoss / currentPreset.sqmPerBox);

  // 예상 자재 무게 (kg)
  const estimatedWeightKg = totalBoxesWithLoss * currentPreset.weightPerBoxKg;

  // 부자재 예상량 (참고용 삼촌 팁)
  // 타일 본드/압착 시멘트: 약 2~3박스당 1포(20kg)
  const estimatedAdhesiveBags = Math.ceil(totalBoxesWithLoss / 2.5);
  // 줄눈 시멘트(홈멘트): 약 4~5박스당 1포(2kg)
  const estimatedGroutBags = Math.ceil(totalBoxesWithLoss / 4);

  const handleCopy = () => {
    let modeDesc = '';
    if (calcMode === '2d') {
      modeDesc = `가로 ${widthM}m × 세로 ${lengthM}m (단일 바닥/벽면)`;
    } else if (calcMode === '3d') {
      modeDesc = `가로 ${widthM}m × 세로 ${lengthM}m × 높이 ${heightM}m (${scope3D === 'all' ? '바닥+벽 4면 전체' : '벽 4면'})`;
    } else {
      modeDesc = `직접 입력 면적: ${netAreaSqm.toFixed(2)}㎡ (${netAreaPyung}평)`;
    }

    const text = `[삼촌생각 타일 소요량 견적서]
• 시공 방식: ${modeDesc}
• 순 면적: ${netAreaSqm.toFixed(2)}㎡ (약 ${netAreaPyung}평)
• 타일 규격: ${currentPreset.name} (${currentPreset.alias})
• 포장 규격: 1박스 = ${currentPreset.piecesPerBox}장 (${currentPreset.sqmPerBox}㎡)
• 로스율(절단 여유분): ${lossRate}% 적용
---------------------------------
⭐ 추천 주문 수량: 총 ${totalBoxesWithLoss}박스 (약 ${totalPiecesWithLoss}장)
• 순수 필요량: ${netBoxes}박스 (${netPieces}장)
• 절단 손실 대비 여유분: +${totalBoxesWithLoss - netBoxes}박스
• 예상 총 무게: 약 ${estimatedWeightKg}kg
• 추천 부자재: 압착시멘트 약 ${estimatedAdhesiveBags}포 / 줄눈시멘트 약 ${estimatedGroutBags}포
계산기 바로가기: https://unclenote.com/tile-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-3">
          <Icon icon="solar:ruler-pen-bold-duotone" width="20" height="20" />
          <span>삼촌의 셀프 인테리어 도구</span>
        </div>
        <h1 className="editorial-h1 mb-3">
          화장실·바닥 타일 소요량 계산기
        </h1>
        <p className="editorial-body text-zinc-600">
          가로·세로 치수만 알 때부터 가로·세로·높이 입체 공간까지! <strong>300각·600각 타일</strong>의 규격별 박스당 수량과 절단 손실(로스율)을 반영해 <strong className="text-[#292520]">실제 사야 할 타일 박스(Box) 수</strong>를 1초 만에 계산합니다.
        </p>
      </div>

      {/* Mode Selector (3가지 계산 방식 탭) */}
      <div className="mb-8">
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
          계산 방식 선택
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-zinc-200/60 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setCalcMode('3d')}
            className={`py-3 px-3 text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              calcMode === '3d'
                ? 'bg-white text-[#292520] shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Icon icon="solar:bath-bold-duotone" className="text-[#c55232]" width="18" height="18" />
            <span>가로·세로·높이 (욕실 전체)</span>
          </button>

          <button
            type="button"
            onClick={() => setCalcMode('2d')}
            className={`py-3 px-3 text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              calcMode === '2d'
                ? 'bg-white text-[#292520] shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Icon icon="solar:floor-lamp-bold-duotone" className="text-[#c55232]" width="18" height="18" />
            <span>가로·세로만 알 때 (바닥/벽 1면)</span>
          </button>

          <button
            type="button"
            onClick={() => setCalcMode('area')}
            className={`py-3 px-3 text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              calcMode === 'area'
                ? 'bg-white text-[#292520] shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Icon icon="solar:calculator-minimalistic-bold-duotone" className="text-[#c55232]" width="18" height="18" />
            <span>면적(㎡/평) 직접 입력</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
          
          {/* 1. Dimension Inputs based on Mode */}
          <div className="space-y-4">
            <div className="border-b border-zinc-100 pb-3 flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-[#292520] flex items-center gap-2">
                <span>1. 시공 공간 크기 입력</span>
              </h2>
              <span className="text-xs text-zinc-400">
                {calcMode === '3d' ? '입체 공간(화장실/방)' : calcMode === '2d' ? '단일 평면(바닥/벽면)' : '직접 면적'}
              </span>
            </div>

            {/* Mode: 2D (가로 x 세로만 알 때) */}
            {calcMode === '2d' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={widthInputId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                      가로 폭 (m)
                    </label>
                    <div className="relative">
                      <input
                        id={widthInputId}
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={widthM}
                        onChange={(e) => setWidthM(Math.max(0, Number(e.target.value)))}
                        className="editorial-input text-right pr-9"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-bold">
                        m
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">예: 1.8m (180cm)</p>
                  </div>

                  <div>
                    <label htmlFor={lengthInputId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                      세로 길이 (m)
                    </label>
                    <div className="relative">
                      <input
                        id={lengthInputId}
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={lengthM}
                        onChange={(e) => setLengthM(Math.max(0, Number(e.target.value)))}
                        className="editorial-input text-right pr-9"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-bold">
                        m
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">예: 2.4m (240cm)</p>
                  </div>
                </div>
                <div className="p-3 bg-[#fdfbf7] rounded-xl border border-zinc-200/80 text-xs text-zinc-600 flex items-center justify-between">
                  <span>바닥/단일 벽면 면적:</span>
                  <span className="font-bold text-[#292520]">
                    {netAreaSqm.toFixed(2)}㎡ (약 {netAreaPyung}평)
                  </span>
                </div>
              </div>
            )}

            {/* Mode: 3D (가로 x 세로 x 높이 다 알 때) */}
            {calcMode === '3d' && (
              <div className="space-y-4">
                {/* 시공 범위 선택 */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setScope3D('all')}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                      scope3D === 'all'
                        ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    바닥 + 벽 4면 전체 시공
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope3D('wallOnly')}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                      scope3D === 'wallOnly'
                        ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    벽 4면만 시공 (바닥 제외)
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1">
                      가로 폭 (m)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        value={widthM}
                        onChange={(e) => setWidthM(Math.max(0, Number(e.target.value)))}
                        className="editorial-input text-right pr-7 sm:pr-8 text-sm sm:text-base"
                      />
                      <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-bold">
                        m
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1">
                      세로 길이 (m)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        value={lengthM}
                        onChange={(e) => setLengthM(Math.max(0, Number(e.target.value)))}
                        className="editorial-input text-right pr-7 sm:pr-8 text-sm sm:text-base"
                      />
                      <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-bold">
                        m
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={heightInputId} className="block text-xs font-bold text-zinc-600 mb-1">
                      천장 높이 (m)
                    </label>
                    <div className="relative">
                      <input
                        id={heightInputId}
                        type="number"
                        step="0.1"
                        min="1.5"
                        value={heightM}
                        onChange={(e) => setHeightM(Math.max(0, Number(e.target.value)))}
                        className="editorial-input text-right pr-7 sm:pr-8 text-sm sm:text-base"
                      />
                      <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-bold">
                        m
                      </span>
                    </div>
                  </div>
                </div>

                {/* 문/거울장 공제 면적 */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-zinc-600">
                      문 / 거울장 공제 면적 (㎡)
                    </label>
                    <span className="text-xs text-zinc-400">타일 제외 면적</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={doorDeductionSqm}
                      onChange={(e) => setDoorDeductionSqm(Math.max(0, Number(e.target.value)))}
                      className="editorial-input text-right pr-9"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-bold">
                      ㎡
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">※ 일반 아파트 욕실문(약 1.5㎡) + 거울수납장 등 기본 2.0㎡ 차감</p>
                </div>
              </div>
            )}

            {/* Mode: Area (총 면적 직접 입력) */}
            {calcMode === 'area' && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDirectUnit('sqm')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                      directUnit === 'sqm'
                        ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                        : 'border-zinc-200 text-zinc-600'
                    }`}
                  >
                    제곱미터 (㎡) 단위로 입력
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirectUnit('pyung')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                      directUnit === 'pyung'
                        ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                        : 'border-zinc-200 text-zinc-600'
                    }`}
                  >
                    평수 (평) 단위로 입력
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={directAreaSqm}
                    onChange={(e) => setDirectAreaSqm(Math.max(0, Number(e.target.value)))}
                    className="editorial-input text-right pr-12 text-lg font-bold"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-bold">
                    {directUnit === 'sqm' ? '㎡' : '평'}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">
                  환산 면적: <strong>{netAreaSqm.toFixed(2)}㎡</strong> (약 {netAreaPyung}평)
                </p>
              </div>
            )}
          </div>

          {/* 2. Tile Preset Selector (300각, 600각 등 괄호 표기 & 박스당 수량 명시) */}
          <div className="space-y-3 pt-2">
            <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
              <label className="text-base font-bold text-[#292520]">
                2. 타일 규격 및 박스당 포장 수량 선택
              </label>
              <span className="text-xs text-zinc-400">국내 표준 유통 규격</span>
            </div>

            <div className="space-y-2">
              {TILE_PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#c55232] bg-[#c55232]/5 ring-1.5 ring-[#c55232]'
                        : 'border-zinc-200 bg-[#fdfbf7] hover:border-zinc-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm sm:text-base text-[#292520]">
                          {preset.name}
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-200/70 rounded text-xs font-bold text-zinc-800">
                          ({preset.alias})
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">
                        {preset.recommendFor}
                      </p>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                      <p className="text-sm font-extrabold text-[#c55232]">
                        1박스 = {preset.piecesPerBox}장
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        {preset.sqmPerBox}㎡ (약 {preset.weightPerBoxKg}kg)
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Loss Rate (로스율) Setting: 5%, 10%(기본값), 15%, 20% + 임의 직접 설정 */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <label className="text-base font-bold text-[#292520]">
                3. 절단 손실 여유분 (로스율 Loss Rate)
              </label>
              <span className="text-xs font-extrabold text-[#c55232]">
                현재 적용: {lossRate}%
              </span>
            </div>

            {/* Presets Button Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { rate: 5, label: '5%', desc: '단순 직사각형' },
                { rate: 10, label: '10%', desc: '표준 권장 기본값', isDefault: true },
                { rate: 15, label: '15%', desc: '코너/초보 셀프' },
                { rate: 20, label: '20%', desc: '대각선·헤링본' },
              ].map((opt) => {
                const isSelected = !isCustomLoss && lossRate === opt.rate;
                return (
                  <button
                    key={opt.rate}
                    type="button"
                    onClick={() => {
                      setLossRate(opt.rate);
                      setIsCustomLoss(false);
                    }}
                    className={`py-2.5 px-2 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232] ring-1 ring-[#c55232]'
                        : 'border-zinc-200 bg-[#fdfbf7] text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="font-extrabold text-sm flex items-center justify-center gap-1">
                      <span>{opt.label}</span>
                      {opt.isDefault && (
                        <span className="text-[10px] px-1 bg-[#c55232] text-white rounded font-normal">
                          기본
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{opt.desc}</div>
                  </button>
                );
              })}
            </div>

            {/* Custom Loss Rate Toggle & Input */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <button
                  type="button"
                  onClick={() => setIsCustomLoss(!isCustomLoss)}
                  className="text-zinc-500 hover:text-[#c55232] font-semibold flex items-center gap-1 underline underline-offset-2"
                >
                  <Icon icon="solar:pen-new-square-linear" width="14" height="14" />
                  <span>로스율 직접 임의 설정하기</span>
                </button>
                {isCustomLoss && (
                  <span className="text-zinc-400 text-[11px]">0% ~ 50%까지 입력 가능</span>
                )}
              </div>

              {isCustomLoss && (
                <div className="p-3 bg-[#fdfbf7] rounded-xl border border-zinc-200 flex items-center gap-3">
                  <input
                    id={customLossId}
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={lossRate}
                    onChange={(e) => setLossRate(Number(e.target.value))}
                    className="flex-1 accent-[#c55232] h-2 bg-zinc-200 rounded-lg cursor-pointer"
                  />
                  <div className="relative w-20">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={lossRate}
                      onChange={(e) => setLossRate(Math.min(50, Math.max(0, Number(e.target.value))))}
                      className="editorial-input text-right pr-6 py-1.5 text-sm"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                      %
                    </span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed bg-zinc-50 p-3 rounded-xl border border-zinc-100">
              💡 <strong>삼촌의 기준:</strong> 가장 표준적인 권장값은 <strong>10%</strong>입니다. 배수구 구멍, 콘센트, 코너 절단이 많거나 초보 셀프 시공이라면 <strong>15%</strong>, 단순 직사각형 바닥은 <strong>5%</strong>만 잡아도 충분합니다.
            </p>
          </div>

        </div>

        {/* Right: Calculation Results Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
              <span className="text-xs uppercase tracking-wider font-bold text-zinc-400">
                주문 권장 견적
              </span>
              <span className="px-2.5 py-1 bg-[#c55232]/10 text-[#c55232] text-xs font-bold rounded-md">
                로스율 {lossRate}% 반영
              </span>
            </div>

            {/* Big Recommended Box Count Display */}
            <div className="mb-6 text-center bg-[#fdfbf7] p-6 rounded-2xl border border-zinc-200/80">
              <p className="text-xs font-semibold text-zinc-500 mb-1.5">
                실제 구매하셔야 할 권장 타일 박스
              </p>
              <p className="text-4xl sm:text-5xl font-black text-[#c55232] tracking-tight">
                {totalBoxesWithLoss}
                <span className="text-2xl font-bold text-[#292520] ml-1.5">박스 (Box)</span>
              </p>
              <p className="text-sm font-bold text-zinc-600 mt-2">
                총 {totalPiecesWithLoss}장 <span className="text-xs font-normal text-zinc-400">(1박스당 {currentPreset.piecesPerBox}장 포장)</span>
              </p>
            </div>

            {/* Detailed Area & Specs Breakdown */}
            <div className="space-y-3 text-sm sm:text-base text-zinc-600">
              <div className="flex justify-between items-center">
                <span>시공 순 면적</span>
                <span className="font-bold text-[#292520]">
                  {netAreaSqm.toFixed(2)}㎡ <span className="text-xs font-normal text-zinc-400">(약 {netAreaPyung}평)</span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>선택 타일 규격</span>
                <span className="font-bold text-[#292520]">
                  {currentPreset.alias}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>1박스당 면적 & 수량</span>
                <span className="font-semibold text-zinc-800">
                  {currentPreset.sqmPerBox}㎡ ({currentPreset.piecesPerBox}장)
                </span>
              </div>

              <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-zinc-200 text-zinc-500 text-xs sm:text-sm">
                <span>순수 필요량 (로스 미포함)</span>
                <span>{netBoxes}박스 ({netPieces}장)</span>
              </div>

              <div className="flex justify-between items-center text-[#c55232] text-xs sm:text-sm font-bold">
                <span>절단 손실 대비 추천 여유분</span>
                <span>+ {Math.max(0, totalBoxesWithLoss - netBoxes)}박스 ({Math.max(0, totalPiecesWithLoss - netPieces)}장)</span>
              </div>

              <div className="flex justify-between items-center pt-2.5 border-t border-zinc-100 text-xs text-zinc-500">
                <span>예상 총 자재 무게</span>
                <span className="font-semibold text-zinc-700">약 {estimatedWeightKg}kg <span className="text-[11px] text-zinc-400">({currentPreset.weightPerBoxKg}kg/박스)</span></span>
              </div>

              <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-xs space-y-1 mt-3">
                <p className="font-bold text-[#292520]">📦 함께 살 부자재 추천 (참고용):</p>
                <div className="flex justify-between text-zinc-600">
                  <span>타일 압착시멘트 (20kg)</span>
                  <span className="font-semibold text-[#292520]">약 {estimatedAdhesiveBags}포</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>줄눈 백시멘트/홈멘트 (2kg)</span>
                  <span className="font-semibold text-[#292520]">약 {estimatedGroutBags}포</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-4">
            <button
              onClick={handleCopy}
              className="w-full py-3.5 bg-[#292520] text-white font-bold text-base rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Icon icon={copied ? 'solar:check-circle-bold' : 'solar:copy-linear'} width="20" height="20" />
              <span>{copied ? '견적 결과가 복사되었습니다!' : '타일 주문 견적 1초 복사하기'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Uncle's Pro Tile Tips */}
      <section className="mt-16 space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-2">
            <Icon icon="solar:lightbulb-bold-duotone" width="20" height="20" />
            <span>삼촌의 시공 현장 꿀팁</span>
          </div>
          <h2 className="editorial-h2">
            타일 주문하기 전에 삼촌이 알려주는 4가지 핵심 원칙
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              로스율(Loss Rate)은 왜 최소 10%를 잡아야 할까요?
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              방이나 화장실 모서리는 타일 크기에 딱 맞아떨어지지 않아 무조건 그라인더나 타일 커터기로 잘라내야 합니다. 자르다 깨지는 타일, 코너 쪽 자투리, 유가(배수구) 주변 등 버려지는 자재가 생기기 때문에 <strong>직선 시공 시 10%, 셀프 시공은 15%</strong>를 기본으로 잡아야 공사 도중 타일이 부족해지는 대참사를 막을 수 있습니다. 단순한 직사각형 바닥이라도 <strong>최소 5%</strong>는 잡는 것이 안전합니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              &apos;300각&apos;과 &apos;600각&apos;의 차이와 박스당 수량
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              인테리어 업계에서는 300mm 단위를 흔히 <strong>&apos;300각&apos;</strong>, 600mm를 <strong>&apos;600각&apos;</strong>이라고 부릅니다. 국내 유통 타일은 대개 <strong>1박스당 1.44㎡(약 0.44평)</strong>를 기준으로 포장되어 있습니다. 따라서 <strong>300각은 1박스에 16장</strong>, <strong>300×600각은 8장</strong>, <strong>600각은 4장</strong>이 들어갑니다. (소형 200각은 보통 1.0㎡ 기준 25장).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              엘리베이터 없는 빌라/상가 배송 주의 (무게 체크!)
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              타일은 흙과 돌을 고온에 압축해 구운 돌덩이입니다. 600각 타일 1박스는 약 30kg에 달합니다. 15박스만 시켜도 <strong>450kg에 육박</strong>하므로 화물 택배 기사님이 집 앞까지 올려다 주지 않고 1층 길가에 하역해 주는 경우가 대부분입니다. 양중(자재 옮기기) 계획을 미리 세우셔야 허리를 다치지 않습니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              4
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              나중에 1박스만 추가 주문하면 생기는 문제 (이색 현상)
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              타일은 구워내는 날짜와 가마 온도에 따라 생산 로트(Lot) 번호가 달라집니다. 같은 브랜드의 같은 모델명이라도 몇 주 뒤에 추가 주문하면 미세하게 색상 톤이 달라서 벽이나 바닥에 붙였을 때 얼룩덜룩하게 티가 납니다. 남으면 반품하거나 창고에 1~2장 보관(보수용)하더라도 <strong>반드시 한 번에 여유 있게 1~2박스 더 주문</strong>하는 것이 철칙입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#c55232] transition-colors"
        >
          <Icon icon="solar:arrow-left-linear" width="18" height="18" />
          <span>삼촌생각 다른 계산기 보러가기</span>
        </Link>
      </div>
    </div>
  );
}
