'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

// 표준 타일 규격 프리셋 데이터 (국내 유통 표준 및 사용자 요청 규격)
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
  category: 'standard' | 'large' | 'point';
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
    category: 'standard',
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
    category: 'standard',
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
    category: 'standard',
  },
  {
    id: '600x1200',
    name: '600mm × 1200mm',
    alias: '600×1200각 대형 타일',
    widthMm: 600,
    heightMm: 1200,
    piecesPerBox: 2,
    sqmPerBox: 1.44,
    recommendFor: '호텔식 고급 욕실 벽체, 세로형 대형 아트월',
    weightPerBoxKg: 33,
    category: 'large',
  },
  {
    id: '800x800',
    name: '800mm × 800mm',
    alias: '800각 대형 포세린',
    widthMm: 800,
    heightMm: 800,
    piecesPerBox: 3,
    sqmPerBox: 1.92,
    recommendFor: '신축 아파트 거실·복도·주방 대형 바닥재',
    weightPerBoxKg: 44,
    category: 'large',
  },
  {
    id: '1200x600',
    name: '1200mm × 600mm',
    alias: '1200×600각 와이드 타일',
    widthMm: 1200,
    heightMm: 600,
    piecesPerBox: 2,
    sqmPerBox: 1.44,
    recommendFor: '가로형 와이드 거실 아트월, 프리미엄 상가 벽체',
    weightPerBoxKg: 33,
    category: 'large',
  },
  {
    id: '1200x1200',
    name: '1200mm × 1200mm',
    alias: '1200각 빅슬랩 포세린',
    widthMm: 1200,
    heightMm: 1200,
    piecesPerBox: 2,
    sqmPerBox: 2.88,
    recommendFor: '고급 주택·펜트하우스 초대형 바닥·벽체 일체형',
    weightPerBoxKg: 62,
    category: 'large',
  },
  {
    id: '1200x2400',
    name: '1200mm × 2400mm',
    alias: '1200×2400 초대형 박판 빅슬랩',
    widthMm: 1200,
    heightMm: 2400,
    piecesPerBox: 1,
    sqmPerBox: 2.88,
    recommendFor: '호텔 로비, 이음매 없는 원판 아트월, 주방 아일랜드 상판',
    weightPerBoxKg: 65,
    category: 'large',
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
    category: 'point',
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
    category: 'point',
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

  // 타일 프리셋 카테고리 필터
  const [presetCategory, setPresetCategory] = useState<'all' | 'standard' | 'large' | 'point'>('all');

  // 선택된 타일 프리셋
  const [selectedPresetId, setSelectedPresetId] = useState<string>('300x600');

  // 직접 타일 규격 입력(커스텀) 모드
  const [isCustomTile, setIsCustomTile] = useState<boolean>(false);
  const [customTileWidthMm, setCustomTileWidthMm] = useState<number>(400);
  const [customTileHeightMm, setCustomTileHeightMm] = useState<number>(800);
  const [customPiecesPerBox, setCustomPiecesPerBox] = useState<number>(4);

  // 로스율 (표준 기본값: 10%)
  const [lossRate, setLossRate] = useState<number>(10);
  const [isCustomLoss, setIsCustomLoss] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  // 현재 선택된 타일 사양 (프리셋 or 커스텀)
  const matchedPreset = TILE_PRESETS.find((p) => p.id === selectedPresetId) || TILE_PRESETS[1];
  const currentTileWidthMm = isCustomTile ? customTileWidthMm : matchedPreset.widthMm;
  const currentTileHeightMm = isCustomTile ? customTileHeightMm : matchedPreset.heightMm;
  const currentPiecesPerBox = isCustomTile ? customPiecesPerBox : matchedPreset.piecesPerBox;
  const currentPieceAreaSqm = (currentTileWidthMm / 1000) * (currentTileHeightMm / 1000);
  const currentSqmPerBox = isCustomTile ? currentPieceAreaSqm * currentPiecesPerBox : matchedPreset.sqmPerBox;
  const currentWeightPerBoxKg = isCustomTile ? Math.round(currentSqmPerBox * 21) : matchedPreset.weightPerBoxKg;
  const currentTileName = isCustomTile
    ? `${currentTileWidthMm}mm × ${currentTileHeightMm}mm (직접 입력)`
    : `${matchedPreset.name} (${matchedPreset.alias})`;

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

  // 타일 장수 계산
  const netPieces = Math.ceil(netAreaSqm / currentPieceAreaSqm);
  const totalPiecesWithLoss = Math.ceil(totalAreaWithLoss / currentPieceAreaSqm);

  // 박스 수 계산 (소수점 올림)
  const netBoxes = Math.ceil(netAreaSqm / currentSqmPerBox);
  const totalBoxesWithLoss = Math.ceil(totalAreaWithLoss / currentSqmPerBox);

  // 예상 자재 무게 (kg)
  const estimatedWeightKg = totalBoxesWithLoss * currentWeightPerBoxKg;

  // 부자재 예상량 (참고용 삼촌 팁)
  // 타일 본드/압착 시멘트: 약 2~3박스당 1포(20kg)
  const estimatedAdhesiveBags = Math.ceil(totalBoxesWithLoss / 2.5);
  // 줄눈 시멘트(홈멘트): 약 4~5박스당 1포(2kg)
  const estimatedGroutBags = Math.ceil(totalBoxesWithLoss / 4);

  // 필터링된 프리셋 목록
  const filteredPresets =
    presetCategory === 'all'
      ? TILE_PRESETS
      : TILE_PRESETS.filter((p) => p.category === presetCategory);

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
• 타일 규격: ${currentTileName}
• 포장 규격: 1박스 = ${currentPiecesPerBox}장 (${currentSqmPerBox.toFixed(2)}㎡)
• 로스율(절단 여유분): ${lossRate}% 적용
---------------------------------
⭐ 추천 주문 수량: 총 ${totalBoxesWithLoss}박스 (약 ${totalPiecesWithLoss}장)
• 순수 필요량: ${netBoxes}박스 (${netPieces}장)
• 절단 손실 대비 여유분: +${Math.max(0, totalBoxesWithLoss - netBoxes)}박스
• 예상 총 무게: 약 ${estimatedWeightKg}kg (1박스 약 ${currentWeightPerBoxKg}kg)
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
          <strong>300각(16장), 300×600(8장), 600각(4장), 600×1200(2장), 800각(3장), 1200각 빅슬랩</strong>까지! 규격별 박스당 수량과 절단 로스율(5%~20%)을 반영해 <strong className="text-[#292520]">실제 사야 할 타일 박스(Box) 수</strong>를 1초 만에 계산합니다.
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
                    <div className="editorial-input-box">
                      <input
                        id={widthInputId}
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={widthM}
                        onChange={(e) => setWidthM(Math.max(0, Number(e.target.value)))}
                      />
                      <span className="input-unit">m</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">예: 1.8m (180cm)</p>
                  </div>

                  <div>
                    <label htmlFor={lengthInputId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                      세로 길이 (m)
                    </label>
                    <div className="editorial-input-box">
                      <input
                        id={lengthInputId}
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={lengthM}
                        onChange={(e) => setLengthM(Math.max(0, Number(e.target.value)))}
                      />
                      <span className="input-unit">m</span>
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
                    <div className="editorial-input-box">
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        value={widthM}
                        onChange={(e) => setWidthM(Math.max(0, Number(e.target.value)))}
                      />
                      <span className="input-unit">m</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-600 mb-1">
                      세로 길이 (m)
                    </label>
                    <div className="editorial-input-box">
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        value={lengthM}
                        onChange={(e) => setLengthM(Math.max(0, Number(e.target.value)))}
                      />
                      <span className="input-unit">m</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={heightInputId} className="block text-xs font-bold text-zinc-600 mb-1">
                      천장 높이 (m)
                    </label>
                    <div className="editorial-input-box">
                      <input
                        id={heightInputId}
                        type="number"
                        step="0.1"
                        min="1.5"
                        value={heightM}
                        onChange={(e) => setHeightM(Math.max(0, Number(e.target.value)))}
                      />
                      <span className="input-unit">m</span>
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
                  <div className="editorial-input-box">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={doorDeductionSqm}
                      onChange={(e) => setDoorDeductionSqm(Math.max(0, Number(e.target.value)))}
                    />
                    <span className="input-unit">㎡</span>
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

                <div className="editorial-input-box">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={directAreaSqm}
                    onChange={(e) => setDirectAreaSqm(Math.max(0, Number(e.target.value)))}
                    className="!text-lg"
                  />
                  <span className="input-unit !text-base">
                    {directUnit === 'sqm' ? '㎡' : '평'}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">
                  환산 면적: <strong>{netAreaSqm.toFixed(2)}㎡</strong> (약 {netAreaPyung}평)
                </p>
              </div>
            )}
          </div>

          {/* 2. Tile Preset Selector (300각, 300x600, 600각, 600x1200, 800각, 1200x600, 1200각, 빅슬랩) */}
          <div className="space-y-3 pt-2">
            <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
              <div>
                <label className="text-base font-bold text-[#292520] block">
                  2. 타일 규격 및 박스당 수량 선택
                </label>
                <span className="text-xs text-zinc-400">국내 유통 표준 패키징</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomTile(!isCustomTile)}
                className="text-xs font-bold text-[#c55232] hover:underline flex items-center gap-1"
              >
                <Icon icon="solar:pen-new-square-linear" width="14" height="14" />
                <span>{isCustomTile ? '프리셋 목록 보기' : '규격 직접 입력'}</span>
              </button>
            </div>

            {/* Custom Tile Input Form */}
            {isCustomTile ? (
              <div className="p-4 bg-[#fdfbf7] rounded-2xl border border-zinc-200 space-y-3">
                <p className="text-xs font-bold text-[#292520]">타일 규격 및 박스 수량 직접 입력:</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] text-zinc-500 mb-1">가로 폭 (mm)</label>
                    <div className="editorial-input-box !py-1 !px-2">
                      <input
                        type="number"
                        step="10"
                        value={customTileWidthMm}
                        onChange={(e) => setCustomTileWidthMm(Math.max(10, Number(e.target.value)))}
                      />
                      <span className="input-unit !text-xs">mm</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-500 mb-1">세로 높이 (mm)</label>
                    <div className="editorial-input-box !py-1 !px-2">
                      <input
                        type="number"
                        step="10"
                        value={customTileHeightMm}
                        onChange={(e) => setCustomTileHeightMm(Math.max(10, Number(e.target.value)))}
                      />
                      <span className="input-unit !text-xs">mm</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-500 mb-1">1박스당 장수</label>
                    <div className="editorial-input-box !py-1 !px-2">
                      <input
                        type="number"
                        min="1"
                        value={customPiecesPerBox}
                        onChange={(e) => setCustomPiecesPerBox(Math.max(1, Number(e.target.value)))}
                      />
                      <span className="input-unit !text-xs">장</span>
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500">
                  ※ 1박스당 시공 면적: <strong>{currentSqmPerBox.toFixed(2)}㎡</strong> (1장: {currentPieceAreaSqm.toFixed(3)}㎡)
                </p>
              </div>
            ) : (
              <>
                {/* Category Filter Pills: 모바일에서 슬라이드 스크롤 없이 2x2 그리드로 한눈에 4종 선택, 데스크톱은 가로 배치 */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 pt-1 pb-1">
                  {[
                    { id: 'all', label: '전체 (10종)' },
                    { id: 'standard', label: '국민 표준 (300·600각)' },
                    { id: 'large', label: '대형·빅슬랩 (800·1200각)' },
                    { id: 'point', label: '소형 & 쪽타일' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPresetCategory(cat.id as any)}
                      className={`px-2.5 py-2.5 rounded-xl text-xs font-bold text-center transition-all border leading-tight ${
                        presetCategory === cat.id
                          ? 'bg-[#292520] text-white border-[#292520] shadow-sm ring-1 ring-[#292520]'
                          : 'bg-[#fdfbf7] text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Preset List */}
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 mt-1">
                  {filteredPresets.map((preset) => {
                    const isSelected = !isCustomTile && selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setSelectedPresetId(preset.id);
                          setIsCustomTile(false);
                        }}
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
                            {preset.category === 'large' && (
                              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">
                                대형 규격
                              </span>
                            )}
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
              </>
            )}
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
                  <div className="editorial-input-box !py-1 !px-2.5 w-24">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={lossRate}
                      onChange={(e) => setLossRate(Math.min(50, Math.max(0, Number(e.target.value))))}
                    />
                    <span className="input-unit">%</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-zinc-500 leading-relaxed bg-zinc-50 p-3 rounded-xl border border-zinc-100">
              💡 <strong>삼촌의 기준:</strong> 가장 표준적인 권장값은 <strong>10%</strong>입니다. 배수구 구멍, 콘센트, 코너 절단이 많거나 600×1200 등 대형 타일은 잘라 버리는 손실이 커지므로 <strong>15%</strong>를 추천합니다.
            </p>
          </div>

        </div>

        {/* Right: Calculation Results Card */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6">
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
            <div className="mb-6 text-center bg-[#fdfbf7] p-5 sm:p-6 rounded-2xl border border-zinc-200/80">
              <p className="text-xs font-semibold text-zinc-500 mb-1.5">
                실제 구매하셔야 할 권장 타일 박스
              </p>
              <p className="text-4xl sm:text-5xl font-black text-[#c55232] tracking-tight">
                {totalBoxesWithLoss}
                <span className="text-2xl font-bold text-[#292520] ml-1.5">박스 (Box)</span>
              </p>
              <p className="text-sm font-bold text-zinc-600 mt-2">
                총 {totalPiecesWithLoss}장 <span className="text-xs font-normal text-zinc-400">(1박스당 {currentPiecesPerBox}장 포장)</span>
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
                <span className="font-bold text-[#292520] text-xs sm:text-sm text-right max-w-[200px] truncate">
                  {currentTileName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>1박스당 면적 & 수량</span>
                <span className="font-semibold text-zinc-800">
                  {currentSqmPerBox.toFixed(2)}㎡ ({currentPiecesPerBox}장)
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
                <span className="font-semibold text-zinc-700">약 {estimatedWeightKg}kg <span className="text-[11px] text-zinc-400">({currentWeightPerBoxKg}kg/박스)</span></span>
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
      <section className="mt-14 space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-2">
            <Icon icon="solar:lightbulb-bold-duotone" width="20" height="20" />
            <span>삼촌의 시공 현장 꿀팁</span>
          </div>
          <h2 className="editorial-h2">
            타일 주문하기 전에 삼촌이 알려주는 4가지 핵심 원칙
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                1
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#292520] tracking-tight leading-snug">
                로스율(Loss Rate)은 왜 최소 10%를 잡아야 할까요?
              </h3>
            </div>
            <p className="text-[14px] sm:text-base text-zinc-600 leading-[1.75] break-keep">
              방이나 화장실 모서리는 타일 크기에 딱 맞아떨어지지 않아 무조건 그라인더나 타일 커터기로 잘라내야 합니다. 자르다 깨지는 타일, 코너 쪽 자투리, 유가(배수구) 주변 등 버려지는 자재가 생기기 때문에 <strong>직선 시공 시 10%, 셀프 시공은 15%</strong>를 기본으로 잡아야 공사 도중 타일이 부족해지는 대참사를 막을 수 있습니다. 단순한 직사각형 바닥이라도 <strong>최소 5%</strong>는 잡는 것이 안전합니다.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                2
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#292520] tracking-tight leading-snug">
                규격별 박스당 수량 총정리 (300각부터 1200각까지)
              </h3>
            </div>
            <div className="text-[14px] sm:text-base text-zinc-600 leading-[1.75] space-y-1">
              <p>국내 유통 타일은 1박스당 대개 1.44㎡(약 0.44평) 내외로 포장됩니다:</p>
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-xs sm:text-sm font-semibold text-zinc-700 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                <div>• 300각: 16장 (1.44㎡)</div>
                <div>• 300×600: 8장 (1.44㎡)</div>
                <div>• 600각: 4장 (1.44㎡)</div>
                <div>• 600×1200: 2장 (1.44㎡)</div>
                <div>• 800각: 3장 (1.92㎡)</div>
                <div>• 1200각: 2장 (2.88㎡)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                3
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#292520] tracking-tight leading-snug">
                대형 타일(800각·1200각) 시공 시 무게 & 양중 주의!
              </h3>
            </div>
            <p className="text-[14px] sm:text-base text-zinc-600 leading-[1.75] break-keep">
              800각 타일 1박스는 약 44kg, 1200각은 1박스에 60kg을 넘어갑니다. 성인 남성 혼자 들기도 버거우며, 화물 택배 기사님이 엘리베이터가 없으면 절대 올려주지 않고 1층에 하역합니다. 사다리차나 자재 곰방(양중) 인건비 계획을 반드시 세우셔야 합니다.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                4
              </span>
              <h3 className="text-base font-bold text-[#292520] tracking-tight leading-snug">
                나중에 1박스만 추가 주문하면 생기는 문제 (이색 현상)
              </h3>
            </div>
            <p className="text-[14px] sm:text-base text-zinc-600 leading-[1.75] break-keep">
              타일은 구워내는 날짜와 가마 온도에 따라 생산 로트(Lot) 번호가 달라집니다. 같은 브랜드의 같은 모델명이라도 몇 주 뒤에 추가 주문하면 미세하게 색상 톤이 달라서 벽이나 바닥에 붙였을 때 얼룩덜룩하게 티가 납니다. 남으면 반품하거나 창고에 1~2장 보관(보수용)하더라도 <strong>반드시 한 번에 여유 있게 1~2박스 더 주문</strong>하는 것이 철칙입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="mt-12 text-center flex items-center justify-center gap-4">
        <Link
          href="/flooring-calculator"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#c55232] transition-colors"
        >
          <Icon icon="solar:floor-lamp-bold-duotone" width="18" height="18" />
          <span>장판 계산기</span>
        </Link>
        <span className="text-zinc-300">|</span>
        <Link
          href="/wallpaper-calculator"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#c55232] transition-colors"
        >
          <Icon icon="solar:brush-bold-duotone" width="18" height="18" />
          <span>도배지 계산기</span>
        </Link>
        <span className="text-zinc-300">|</span>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#c55232] transition-colors"
        >
          <Icon icon="solar:home-2-linear" width="18" height="18" />
          <span>홈으로</span>
        </Link>
      </div>
    </div>
  );
}
