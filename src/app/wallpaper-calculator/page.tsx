'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Icon } from '@iconify/react';

interface WallpaperPreset {
  id: string;
  name: string;
  alias: string;
  widthCm: number;
  lengthM: number;
  sqmPerRoll: number;
  pyungPerRoll: number;
  recommendFor: string;
  seamType: string; // 맞댐 시공 vs 겹침 시공
}

const WALLPAPER_PRESETS: WallpaperPreset[] = [
  {
    id: 'silk',
    name: '실크 벽지 (PVC 코팅)',
    alias: '5평형 표준 롤',
    widthCm: 106,
    lengthM: 15.6,
    sqmPerRoll: 16.5,
    pyungPerRoll: 5.0,
    recommendFor: '아파트·주택 표준, 오염에 강하고 고급스러운 이음새 맞댐 시공',
    seamType: '맞댐 시공 (이음새 티 안 남)',
  },
  {
    id: 'wide-paper',
    name: '광폭 합지 (종이 벽지)',
    alias: '5평형 종이 롤',
    widthCm: 93,
    lengthM: 17.75,
    sqmPerRoll: 16.5,
    pyungPerRoll: 5.0,
    recommendFor: '친환경 종이 소재, 가성비 주거용, 통기성 우수',
    seamType: '겹침 시공 (약 5mm 포갬)',
  },
  {
    id: 'narrow-paper',
    name: '소폭 합지 (종이 벽지)',
    alias: '2평형 미니 롤',
    widthCm: 53,
    lengthM: 12.5,
    sqmPerRoll: 6.6,
    pyungPerRoll: 2.0,
    recommendFor: '원룸, 전월세 임대용, 폭이 좁아 혼자 도배하기 가장 쉬움',
    seamType: '겹침 시공 (약 5mm 포갬)',
  },
];

type InputMode = 'room' | 'apt' | 'area';

export default function WallpaperCalculatorPage() {
  const widthInputId = useId();
  const lengthInputId = useId();
  const heightInputId = useId();

  // 계산 모드: 'room' (방 치수) | 'apt' (아파트 분양평수) | 'area' (순 면적 직접 입력)
  const [inputMode, setInputMode] = useState<InputMode>('room');

  // 방 치수 (m)
  const [widthM, setWidthM] = useState<number>(3.3); // 안방 기준 3.3m
  const [lengthM, setLengthM] = useState<number>(3.6); // 안방 기준 3.6m
  const [heightM, setHeightM] = useState<number>(2.3); // 천장 높이 (기본 2.3m)
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(true); // 천장 포함 여부
  const [doorDeductionSqm, setDoorDeductionSqm] = useState<number>(3.0); // 문/창문 공제 면적 (기본 3.0㎡)

  // 아파트 평수 모드용
  const [aptPyung, setAptPyung] = useState<number>(32); // 분양 32평
  const [aptMultiplier, setAptMultiplier] = useState<number>(2.5); // 도배 계수 (보통 2.5~2.8배)

  // 직접 면적 모드용
  const [directPyung, setDirectPyung] = useState<number>(15);

  // 벽지 규격 선택
  const [selectedPresetId, setSelectedPresetId] = useState<string>('silk');

  // 로스율 (표준 10%)
  const [lossRate, setLossRate] = useState<number>(10);
  const [isCustomLoss, setIsCustomLoss] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentPreset = WALLPAPER_PRESETS.find((p) => p.id === selectedPresetId) || WALLPAPER_PRESETS[0];

  // 순 도배 면적 계산 (㎡ 및 평)
  let netSqm = 0;
  if (inputMode === 'room') {
    // 벽면 면적 = 2 * (가로 + 세로) * 높이
    const wallSqm = 2 * (widthM + lengthM) * heightM;
    // 천장 면적 = 가로 * 세로
    const ceilingSqm = includeCeiling ? widthM * lengthM : 0;
    netSqm = Math.max(0, wallSqm + ceilingSqm - doorDeductionSqm);
  } else if (inputMode === 'apt') {
    // 아파트 분양평수 x 계수 (2.5배)
    const totalPyungEstimate = aptPyung * aptMultiplier;
    netSqm = totalPyungEstimate * 3.3058;
  } else {
    // 직접 평수 입력
    netSqm = directPyung * 3.3058;
  }

  const netPyung = (netSqm / 3.3058).toFixed(1);

  // 로스율 적용 총 면적
  const totalSqmWithLoss = netSqm * (1 + lossRate / 100);
  const totalPyungWithLoss = totalSqmWithLoss / 3.3058;

  // 필요한 롤(Roll) 수 계산 (올림)
  const netRolls = Math.ceil(netSqm / currentPreset.sqmPerRoll);
  const totalRollsWithLoss = Math.ceil(totalSqmWithLoss / currentPreset.sqmPerRoll);

  // 추천 부자재 수량 (삼촌 팁)
  // 도배용 풀: 약 3~4롤당 1봉지(2kg)
  const pasteBags = Math.max(1, Math.ceil(totalRollsWithLoss / 3));
  // 친환경 지물본드 (접착력 보강): 약 5롤당 1개
  const bondTubes = Math.max(1, Math.ceil(totalRollsWithLoss / 5));
  // 이음새 초배지(네바리): 1~2롤
  const nevariRolls = Math.max(1, Math.ceil(totalRollsWithLoss / 6));

  const handleCopy = () => {
    let specSummary = '';
    if (inputMode === 'room') {
      specSummary = `가로 ${widthM}m × 세로 ${lengthM}m × 높이 ${heightM}m (${includeCeiling ? '벽+천장' : '벽만'})`;
    } else if (inputMode === 'apt') {
      specSummary = `아파트 공급/분양 ${aptPyung}평형 전체`;
    } else {
      specSummary = `직접 입력 ${netPyung}평`;
    }

    const text = `[삼촌노트 도배지 소요량 견적서]
• 시공 대상: ${specSummary}
• 순 도배 면적: 약 ${netPyung}평 (${netSqm.toFixed(2)}㎡)
• 선택 벽지: ${currentPreset.name} (${currentPreset.alias})
• 1롤 규격: 폭 ${currentPreset.widthCm}cm × 길이 ${currentPreset.lengthM}m (${currentPreset.pyungPerRoll}평형)
• 로스율(절단 여유분): ${lossRate}% 반영
---------------------------------
⭐ 추천 주문 수량: 총 ${totalRollsWithLoss}롤
• 순수 필요량: ${netRolls}롤 (여유분: +${totalRollsWithLoss - netRolls}롤)
• 시공 방식: ${currentPreset.seamType}
• 추천 부자재: 도배풀 약 ${pasteBags}봉지(2kg), 지물본드 약 ${bondTubes}개, 네바리 ${nevariRolls}롤
계산기 바로가기: https://unclenote.com/wallpaper-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // AEO & Google Rich Snippet Structured Data (SoftwareApplication + FAQPage)
  const wallpaperStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://unclenote.com/wallpaper-calculator#webapp',
        'name': '도배지(벽지) 소요량 및 롤 수량 계산기',
        'url': 'https://unclenote.com/wallpaper-calculator',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'All',
        'description': '방 크기 실측 치수 또는 아파트 평수 기반 실크벽지(5평형), 광폭합지(5평형), 소폭합지(2평형) 필요 롤(Roll) 수 및 도배풀 부자재 자동 계산기',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'KRW',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://unclenote.com/wallpaper-calculator#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': '실크벽지(5평형)와 합지벽지(광폭/소폭)의 규격 차이는 어떻게 되나요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '실크벽지는 폭 106cm × 길이 15.6m(약 5평형, 16.5㎡)로 이음새 맞댐 시공을 합니다. 광폭합지는 폭 93cm × 길이 17.75m(약 5평형), 소폭합지는 폭 53cm × 길이 12.5m(약 2평형, 6.6㎡)로 겹침 시공을 진행합니다.',
            },
          },
          {
            '@type': 'Question',
            'name': '아파트 평수 기준으로 도배지 소요 평수는 어떻게 계산하나요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '일반적인 아파트 전체 도배 시 벽과 천장을 합친 총 도배 면적은 분양 평수의 약 2.5배(확장형은 약 2.8배)를 적용하는 것이 인테리어 업계의 표준 견적 공식입니다.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* AEO / SEO Structured Data */}
      <Script
        id="wallpaper-calc-aeo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(wallpaperStructuredData) }}
      />

      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-3">
          <Icon icon="solar:brush-bold-duotone" width="20" height="20" />
          <span>삼촌의 셀프 인테리어 도구</span>
        </div>
        <h1 className="editorial-h1 mb-3">
          도배지(벽지) 소요량 계산기
        </h1>
        <p className="editorial-body text-zinc-600">
          방 치수나 아파트 평수만 넣으면 <strong>실크벽지(5평형)·광폭합지(5평형)·소폭합지(2평형)</strong> 규격별 필요한 <strong>벽지 롤(Roll) 수</strong>와 절단 여유분, 도배 풀·부자재까지 1초 만에 계산해 드립니다.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="mb-8">
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
          계산 방식 선택
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-zinc-200/60 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setInputMode('room')}
            className={`py-3 px-3 text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              inputMode === 'room'
                ? 'bg-white text-[#292520] shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Icon icon="solar:home-smile-bold-duotone" className="text-[#c55232]" width="18" height="18" />
            <span>방 크기 실측 (가로·세로·높이)</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('apt')}
            className={`py-3 px-3 text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              inputMode === 'apt'
                ? 'bg-white text-[#292520] shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Icon icon="solar:buildings-bold-duotone" className="text-[#c55232]" width="18" height="18" />
            <span>아파트 분양 평수 간이 계산</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('area')}
            className={`py-3 px-3 text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              inputMode === 'area'
                ? 'bg-white text-[#292520] shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Icon icon="solar:calculator-minimalistic-bold-duotone" className="text-[#c55232]" width="18" height="18" />
            <span>도배 평수(평) 직접 입력</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Card */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
          
          {/* 1. Dimension Section */}
          <div className="space-y-4">
            <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#292520]">
                1. 공간 크기 및 시공 범위
              </h2>
              <span className="text-xs text-zinc-400">
                {inputMode === 'room' ? '방 개별 실측' : inputMode === 'apt' ? '아파트 전체' : '직접 입력'}
              </span>
            </div>

            {inputMode === 'room' && (
              <div className="space-y-4">
                {/* Ceiling toggle */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIncludeCeiling(true)}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                      includeCeiling
                        ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    벽 4면 + 천장 전체 도배 (기본)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIncludeCeiling(false)}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                      !includeCeiling
                        ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                        : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    벽 4면만 도배 (천장 제외)
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  <div>
                    <label htmlFor={widthInputId} className="block text-xs font-bold text-zinc-600 mb-1">
                      가로 폭 (m)
                    </label>
                    <div className="relative">
                      <input
                        id={widthInputId}
                        type="number"
                        step="0.1"
                        min="1"
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
                    <label htmlFor={lengthInputId} className="block text-xs font-bold text-zinc-600 mb-1">
                      세로 길이 (m)
                    </label>
                    <div className="relative">
                      <input
                        id={lengthInputId}
                        type="number"
                        step="0.1"
                        min="1"
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
                        min="1.8"
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

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-zinc-600">
                      문/창문 공제 면적 (㎡)
                    </label>
                    <span className="text-[11px] text-zinc-400">도배하지 않는 공간</span>
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
                  <p className="text-[11px] text-zinc-400 mt-1">※ 방문 1개(약 1.8㎡) + 중간 창문(약 1.2㎡) 기준 보통 3.0㎡ 차감</p>
                </div>
              </div>
            )}

            {inputMode === 'apt' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1.5">
                    아파트 공급 / 분양 평수 (평)
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[18, 24, 32, 42].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setAptPyung(p)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          aptPyung === p
                            ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                            : 'border-zinc-200 text-zinc-600'
                        }`}
                      >
                        {p}평형
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={aptPyung}
                      onChange={(e) => setAptPyung(Math.max(1, Number(e.target.value)))}
                      className="editorial-input text-right pr-10 text-lg font-bold"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-bold">
                      평
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#fdfbf7] rounded-xl border border-zinc-200 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">현장 표준 도배 면적 계수:</span>
                    <span className="font-bold text-[#292520]">분양 평수의 약 {aptMultiplier}배</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    ※ 집 구조상 방 3개, 거실, 천장 전체를 도배할 경우 통상 분양 평수의 2.5배 면적의 벽지가 들어갑니다.
                  </p>
                </div>
              </div>
            )}

            {inputMode === 'area' && (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-zinc-600">
                  총 도배 평수 직접 입력 (평)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={directPyung}
                    onChange={(e) => setDirectPyung(Math.max(1, Number(e.target.value)))}
                    className="editorial-input text-right pr-10 text-lg font-bold"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-bold">
                    평
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  환산 면적: <strong>{netSqm.toFixed(2)}㎡</strong>
                </p>
              </div>
            )}
          </div>

          {/* 2. Wallpaper Type Selector */}
          <div className="space-y-3 pt-2">
            <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
              <label className="text-base font-bold text-[#292520]">
                2. 벽지 종류 및 규격 (롤당 평수)
              </label>
              <span className="text-xs text-zinc-400">국내 유통 표준</span>
            </div>

            <div className="space-y-2">
              {WALLPAPER_PRESETS.map((preset) => {
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
                          {preset.alias}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">
                        {preset.recommendFor}
                      </p>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                      <p className="text-sm font-extrabold text-[#c55232]">
                        1롤 = {preset.pyungPerRoll}평형
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        폭 {preset.widthCm}cm × {preset.lengthM}m
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Loss Rate */}
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <label className="text-base font-bold text-[#292520]">
                3. 절단 및 이음매 여유분 (로스율)
              </label>
              <span className="text-xs font-extrabold text-[#c55232]">
                {lossRate}% 적용
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { rate: 10, label: '10%', desc: '무지 벽지 표준 기본값', isDefault: true },
                { rate: 15, label: '15%', desc: '무늬·패턴 맞춤 / 셀프' },
                { rate: 20, label: '20%', desc: '대형 패턴 벽지' },
              ].map((opt) => (
                <button
                  key={opt.rate}
                  type="button"
                  onClick={() => {
                    setLossRate(opt.rate);
                    setIsCustomLoss(false);
                  }}
                  className={`py-2.5 px-2 rounded-xl border text-center transition-all ${
                    !isCustomLoss && lossRate === opt.rate
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
              ))}
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIsCustomLoss(!isCustomLoss)}
                className="text-xs text-zinc-500 hover:text-[#c55232] font-semibold flex items-center gap-1 underline underline-offset-2"
              >
                <Icon icon="solar:pen-new-square-linear" width="14" height="14" />
                <span>로스율 직접 입력 (0% ~ 40%)</span>
              </button>

              {isCustomLoss && (
                <div className="mt-2 p-3 bg-[#fdfbf7] rounded-xl border border-zinc-200 flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={lossRate}
                    onChange={(e) => setLossRate(Number(e.target.value))}
                    className="flex-1 accent-[#c55232] h-2 bg-zinc-200 rounded-lg cursor-pointer"
                  />
                  <div className="relative w-20">
                    <input
                      type="number"
                      min="0"
                      max="40"
                      value={lossRate}
                      onChange={(e) => setLossRate(Math.min(40, Math.max(0, Number(e.target.value))))}
                      className="editorial-input text-right pr-6 py-1.5 text-sm"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                      %
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Results Card */}
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

            {/* Big Roll Count */}
            <div className="mb-6 text-center bg-[#fdfbf7] p-6 rounded-2xl border border-zinc-200/80">
              <p className="text-xs font-semibold text-zinc-500 mb-1.5">
                실제 구매하셔야 할 벽지 수량
              </p>
              <p className="text-4xl sm:text-5xl font-black text-[#c55232] tracking-tight">
                {totalRollsWithLoss}
                <span className="text-2xl font-bold text-[#292520] ml-1.5">롤 (Roll)</span>
              </p>
              <p className="text-sm font-bold text-zinc-600 mt-2">
                선택: {currentPreset.name} <span className="text-xs font-normal text-zinc-400">(1롤={currentPreset.pyungPerRoll}평형)</span>
              </p>
            </div>

            {/* Breakdown Details */}
            <div className="space-y-3 text-sm sm:text-base text-zinc-600">
              <div className="flex justify-between items-center">
                <span>총 도배 실면적</span>
                <span className="font-bold text-[#292520]">
                  약 {netPyung}평 <span className="text-xs font-normal text-zinc-400">({netSqm.toFixed(2)}㎡)</span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>1롤당 커버 면적</span>
                <span className="font-semibold text-zinc-800">
                  {currentPreset.pyungPerRoll}평형 ({currentPreset.sqmPerRoll}㎡)
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>시공 방식 특징</span>
                <span className="font-semibold text-zinc-700 text-xs sm:text-sm">
                  {currentPreset.seamType}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-zinc-200 text-zinc-500 text-xs sm:text-sm">
                <span>순수 필요량 (로스 미포함)</span>
                <span>{netRolls}롤</span>
              </div>

              <div className="flex justify-between items-center text-[#c55232] text-xs sm:text-sm font-bold">
                <span>절단 손실 대비 추천 여유분</span>
                <span>+ {Math.max(0, totalRollsWithLoss - netRolls)}롤</span>
              </div>

              {/* Recommended Accessories */}
              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-100 text-xs space-y-1.5 mt-3">
                <p className="font-bold text-[#292520]">📦 함께 살 도배 부자재 추천:</p>
                <div className="flex justify-between text-zinc-600">
                  <span>친환경 도배 풀 (2kg/봉지)</span>
                  <span className="font-semibold text-[#292520]">약 {pasteBags}봉지</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>접착 보강 지물본드</span>
                  <span className="font-semibold text-[#292520]">약 {bondTubes}개</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>이음새 초배지 (네바리)</span>
                  <span className="font-semibold text-[#292520]">약 {nevariRolls}롤</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4">
            <button
              onClick={handleCopy}
              className="w-full py-3.5 bg-[#292520] text-white font-bold text-base rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Icon icon={copied ? 'solar:check-circle-bold' : 'solar:copy-linear'} width="20" height="20" />
              <span>{copied ? '견적 결과가 복사되었습니다!' : '도배 주문 견적 1초 복사하기'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Uncle's Pro Wallpaper Tips */}
      <section className="mt-16 space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-2">
            <Icon icon="solar:lightbulb-bold-duotone" width="20" height="20" />
            <span>삼촌의 시공 현장 꿀팁</span>
          </div>
          <h2 className="editorial-h2">
            벽지 살 때 삼촌이 알려주는 4가지 핵심 노하우
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              실크벽지와 합지벽지의 결정적 차이 (맞댐 vs 겹침)
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              <strong>합지벽지</strong>는 종이라서 벽지 가장자리를 5mm 정도 서로 포개어 붙이는 &apos;겹침 시공&apos;을 합니다. 그래서 초보자도 시공하기 쉽지만 빛을 비추면 겹친 선이 보입니다. 반면 <strong>실크벽지</strong>는 이음새를 틈 없이 딱 맞추는 &apos;맞댐 시공&apos;을 하므로 호텔처럼 매끄럽고 고급스럽지만, 밑작업(부직포 초배 작업)이 필수적입니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              도배 직후 창문을 활짝 열면 절대 안 되는 이유!
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              셀프 도배 후 풀 냄새를 뺀다고 창문을 열어 맞바람을 쐬거나 보일러를 세게 틀면 <strong>벽지가 급격하게 건조되면서 찢어지거나 터지는 대형 사고</strong>가 납니다. 도배지는 실온에서 서서히 2~3일 동안 자연 건조되어야 벽에 팽팽하게 달라붙습니다. 시공 후 이틀은 창문을 닫아 두세요.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              혼자 셀프 도배할 때는 &apos;소폭 합지&apos;가 최고
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              실크벽지나 광폭합지는 폭이 93~106cm로 넓어서 풀을 바른 상태에서 혼자 들면 찢어지거나 벽지끼리 달라붙어 감당하기 어렵습니다. 반면 <strong>소폭합지(53cm)</strong>는 양팔 폭에 쏙 들어오기 때문에 사다리 위에서 혼자 들고 붙이기 가장 좋습니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              4
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              기존 실크벽지 위에 덧방(바로 붙이기) 주의!
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              기존 벽지가 일반 종이(합지)라면 그 위에 바로 덧붙여도 잘 붙지만, <strong>기존 벽지가 실크(코팅)벽지라면 겉면의 비닐 코팅층을 칼로 벗겨내야</strong> 풀이 먹습니다. 비닐층을 벗기지 않고 그냥 붙이면 며칠 뒤 벽지 전체가 통째로 떨어집니다.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="mt-12 text-center flex items-center justify-center gap-4">
        <Link
          href="/tile-calculator"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#c55232] transition-colors"
        >
          <Icon icon="solar:ruler-pen-bold-duotone" width="18" height="18" />
          <span>타일 계산기 보러가기</span>
        </Link>
        <span className="text-zinc-300">|</span>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#c55232] transition-colors"
        >
          <Icon icon="solar:home-2-linear" width="18" height="18" />
          <span>삼촌노트 홈으로</span>
        </Link>
      </div>
    </div>
  );
}
