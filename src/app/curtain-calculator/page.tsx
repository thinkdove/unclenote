'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Icon } from '@iconify/react';

type ProductType = 'curtain' | 'blind';

interface PleatOption {
  id: string;
  name: string;
  multiplier: number;
  desc: string;
}

const PLEAT_OPTIONS: PleatOption[] = [
  {
    id: 'butterfly',
    name: '나비주름 (2.0배)',
    multiplier: 2.0,
    desc: '상단 주름이 고정되어 제작되는 호텔식 풍성한 볼륨 (추천)',
  },
  {
    id: 'flat',
    name: '민자 / 평주름 (1.5배)',
    multiplier: 1.5,
    desc: '심플하고 내추럴한 자연스러운 물결 주름',
  },
  {
    id: 'blackout',
    name: '암막 / 방한용 (1.8배)',
    multiplier: 1.8,
    desc: '빛샘을 막고 외풍을 차단하기 위한 도톰한 실속 주름',
  },
];

interface HardwareOption {
  id: string;
  name: string;
  deductionCm: number;
  desc: string;
}

const HARDWARE_OPTIONS: HardwareOption[] = [
  {
    id: 'rail',
    name: '커튼 레일 시공',
    deductionCm: 3,
    desc: '천장 높이에서 -3cm 공제 (레일 두께 및 바닥 1cm 띄움)',
  },
  {
    id: 'rod-ring',
    name: '커튼봉 + 링 고리 시공',
    deductionCm: 8,
    desc: '천장 높이에서 -8cm 공제 (봉 지름 및 링 고리 길이)',
  },
  {
    id: 'rod-eyelet',
    name: '커튼봉 아일렛(펀칭) 시공',
    deductionCm: 4,
    desc: '천장 높이에서 -4cm 공제 (원단 상단 링에 봉 직접 관통)',
  },
];

export default function CurtainCalculatorPage() {
  const windowWidthId = useId();
  const windowHeightId = useId();

  // 탭: 'curtain' (커튼) | 'blind' (블라인드)
  const [productType, setProductType] = useState<ProductType>('curtain');

  // 치수 입력 (cm 단위가 인테리어 커튼 업계 표준)
  const [windowWidthCm, setWindowWidthCm] = useState<number>(300); // 창문 가로 300cm (3m)
  const [ceilingHeightCm, setCeilingHeightCm] = useState<number>(230); // 천장부터 바닥까지 230cm (2.3m)

  // 커튼 전용 옵션
  const [pleatType, setPleatType] = useState<string>('butterfly');
  const [hardwareType, setHardwareType] = useState<string>('rail');
  const [splitType, setSplitType] = useState<'double' | 'single'>('double'); // 양개(2장 분할) vs 편개(1장)

  // 블라인드 전용 옵션: 'inside' (창틀 안쪽 매립) | 'outside' (창틀 바깥 덮기)
  const [blindInstallType, setBlindInstallType] = useState<'inside' | 'outside'>('outside');

  const [copied, setCopied] = useState<boolean>(false);

  // 국내 대폭 커튼 원단 1폭 기준: 140cm
  const FABRIC_WIDTH_CM = 140;

  const currentPleat = PLEAT_OPTIONS.find((p) => p.id === pleatType) || PLEAT_OPTIONS[0];
  const currentHardware = HARDWARE_OPTIONS.find((h) => h.id === hardwareType) || HARDWARE_OPTIONS[0];

  // 1. 커튼 계산
  // 완성 가로 폭 = 창문 가로 * 주름 배수
  const curtainFinishedWidthCm = Math.round(windowWidthCm * currentPleat.multiplier);
  // 필요한 원단 폭 수 = 완성 가로 폭 / 140cm (올림)
  const totalFabricWidths = Math.ceil(curtainFinishedWidthCm / FABRIC_WIDTH_CM);
  // 양개형일 경우 좌/우 각 폭 수
  const widthsPerSide = splitType === 'double' ? Math.ceil(totalFabricWidths / 2) : totalFabricWidths;

  // 커튼 세로(높이) 제작 치수 = 천장 높이 - 부속 공제
  const curtainFinishedHeightCm = Math.max(100, ceilingHeightCm - currentHardware.deductionCm);

  // 레일/봉 길이 호수 계산 (자(尺) 단위: 1자 = 약 30cm)
  const railJa = Math.ceil(windowWidthCm / 30);

  // 2. 블라인드 계산
  // 바깥 덮기 시 좌우 +10cm (한쪽 5cm), 세로 +15cm (아래 여유)
  const blindOrderWidthCm = blindInstallType === 'outside' ? windowWidthCm + 10 : windowWidthCm - 1;
  const blindOrderHeightCm = blindInstallType === 'outside' ? ceilingHeightCm + 10 : ceilingHeightCm;
  // 헤베(㎡) 계산 = 가로(m) * 세로(m)
  const blindSqm = (blindOrderWidthCm / 100) * (blindOrderHeightCm / 100);
  // 업계 기본 최소 과금 1.5헤베 기준
  const blindBillableSqm = Math.max(1.5, Math.ceil(blindSqm * 10) / 10);

  const handleCopy = () => {
    let text = '';
    if (productType === 'curtain') {
      text = `[삼촌노트 커튼 제작 치수 견적서]
• 실측 치수: 창문 가로 ${windowWidthCm}cm × 천장 높이 ${ceilingHeightCm}cm
• 주름 스타일: ${currentPleat.name} (${currentPleat.desc})
• 시공 방식: ${currentHardware.name} (-${currentHardware.deductionCm}cm 공제)
• 분할 방식: ${splitType === 'double' ? '양개형 (좌/우 2장 분할)' : '편개형 (1장 통원단)'}
---------------------------------
⭐ 커튼 맞춤 주문 치수:
• 주문 가로 폭: 총 ${curtainFinishedWidthCm}cm (${totalFabricWidths}폭)
  ${splitType === 'double' ? `→ 좌/우 각각 ${Math.round(curtainFinishedWidthCm / 2)}cm (${widthsPerSide}폭씩 2장)` : `→ 1장 통원단 ${curtainFinishedWidthCm}cm (${totalFabricWidths}폭)`}
• 주문 세로 길이: ${curtainFinishedHeightCm}cm (바닥 1cm 띄움 황금비율)
• 추천 레일/봉 규격: ${windowWidthCm}cm용 슬라이딩 레일 (${railJa}자 규격)
계산기 바로가기: https://UncleNote.com/curtain-calculator`;
    } else {
      text = `[삼촌노트 블라인드 견적서]
• 창문 실측: 가로 ${windowWidthCm}cm × 세로 ${ceilingHeightCm}cm
• 설치 방식: ${blindInstallType === 'outside' ? '창틀 바깥 덮기 (빛샘 방지 여유 포함)' : '창틀 안쪽 매립'}
---------------------------------
⭐ 블라인드 주문 치수:
• 주문 가로: ${blindOrderWidthCm}cm
• 주문 세로: ${blindOrderHeightCm}cm
• 면적: ${blindSqm.toFixed(2)}㎡ (기본 과금 규격: 약 ${blindBillableSqm}헤베)
계산기 바로가기: https://UncleNote.com/curtain-calculator`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const curtainStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://unclenote.com/curtain-calculator#app',
        'name': '창문 커튼·블라인드 치수 계산기',
        'url': 'https://unclenote.com/curtain-calculator',
        'applicationCategory': 'UtilitiesApplication',
        'operatingSystem': 'All',
        'description':
          '창문 치수를 바탕으로 나비주름(2배)·민자주름(1.5배)에 필요한 원단 폭 수와 레일·커튼봉 부속 공제 세로 길이, 블라인드 헤베(㎡) 규격을 자동 계산합니다.',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'KRW',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://unclenote.com/curtain-calculator#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': '커튼 가로 폭은 왜 창문 치수의 1.5배~2배로 주문해야 하나요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '커튼을 창문 가로 폭 그대로 1:1로 맞추면 커튼을 쳤을 때 주름 없이 팽팽하게 펴집니다. 호텔처럼 풍성하고 우아한 물결 주름을 유지하려면 민자주름은 1.5배, 나비주름은 2.0배 폭으로 여유 있게 주문해야 합니다.',
            },
          },
          {
            '@type': 'Question',
            'name': '커튼 세로 길이를 잴 때 왜 천장 높이에서 3cm를 빼나요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '일반 슬라이딩 레일 시공 시 레일 자체 두께(약 2cm)와 바닥 먼지 쓸림 방지 여유(약 1cm)를 반영해 천장 높이에서 정확히 -3cm를 공제하는 것이 바닥에 닿을 듯 말 듯 가장 이상적인 핏이 됩니다.',
            },
          },
          {
            '@type': 'Question',
            'name': '블라인드 주문 시 1헤베(hebe)는 무슨 뜻인가요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '헤베는 인테리어 현장에서 제곱미터(㎡)를 부르는 용어로 가로 1m × 세로 1m = 1㎡를 의미합니다. 블라인드 공장은 대부분 창문이 작아도 기본 최소 1.5헤베(1.5㎡)를 기준으로 기본 금액을 과금합니다.',
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
        id="curtain-calc-aeo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(curtainStructuredData) }}
      />

      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-3">
          <Icon icon="solar:hanger-2-bold-duotone" width="20" height="20" />
          <span>삼촌의 셀프 인테리어 도구</span>
        </div>
        <h1 className="editorial-h1 mb-3 break-keep [text-wrap:balance]">
          창문 커튼·블라인드 치수 계산기
        </h1>
        <p className="editorial-body text-zinc-600">
          창문 치수 그대로 커튼을 샀다가 주름이 펴져 낭패 보신 적 있으시죠? <strong>나비주름(2배)·평주름(1.5배)</strong>에 따른 실제 주문 가로 폭(폭 수)과 레일·봉 부속을 감안한 <strong>세로 황금 길이</strong>를 1초 만에 계산해 드립니다.
        </p>
      </div>

      {/* Product Type Tabs */}
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-3 bg-zinc-200/60 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setProductType('curtain')}
            className={`py-3 text-sm sm:text-base font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              productType === 'curtain'
                ? 'bg-white text-[#292520] shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Icon icon="solar:hanger-2-bold-duotone" className="text-[#c55232]" width="20" height="20" />
            <span>커튼 (원단 폭수 & 세로길이)</span>
          </button>

          <button
            type="button"
            onClick={() => setProductType('blind')}
            className={`py-3 text-sm sm:text-base font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
              productType === 'blind'
                ? 'bg-white text-[#292520] shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Icon icon="solar:slider-vertical-bold-duotone" className="text-[#c55232]" width="20" height="20" />
            <span>블라인드 (콤비/우드/헤베)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
          
          {/* Dimension Form */}
          <div className="space-y-4">
            <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#292520]">
                1. 창문 실측 치수 입력
              </h2>
              <span className="text-xs text-zinc-400">단위: 센티미터(cm)</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={windowWidthId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                  창문 가로 폭 (cm)
                </label>
                <div className="editorial-input-box">
                  <input
                    id={windowWidthId}
                    type="number"
                    step="5"
                    min="50"
                    value={windowWidthCm}
                    onChange={(e) => setWindowWidthCm(Math.max(10, Number(e.target.value)))}
                  />
                  <span className="input-unit">cm</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">예: 300cm (3m)</p>
              </div>

              <div>
                <label htmlFor={windowHeightId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                  {productType === 'curtain' ? '천장~바닥 높이 (cm)' : '창문 세로 높이 (cm)'}
                </label>
                <div className="editorial-input-box">
                  <input
                    id={windowHeightId}
                    type="number"
                    step="5"
                    min="50"
                    value={ceilingHeightCm}
                    onChange={(e) => setCeilingHeightCm(Math.max(10, Number(e.target.value)))}
                  />
                  <span className="input-unit">cm</span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  {productType === 'curtain' ? '커튼박스 천장부터 바닥까지' : '창틀 상단부터 하단까지'}
                </p>
              </div>
            </div>
          </div>

          {/* Curtain Specific Options */}
          {productType === 'curtain' && (
            <>
              {/* Pleat Style */}
              <div className="space-y-3 pt-2">
                <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
                  <label className="text-base font-bold text-[#292520]">
                    2. 주름 스타일 선택 (주름 배수)
                  </label>
                </div>

                <div className="space-y-2">
                  {PLEAT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPleatType(opt.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                        pleatType === opt.id
                          ? 'border-[#c55232] bg-[#c55232]/5 ring-1.5 ring-[#c55232]'
                          : 'border-zinc-200 bg-[#fdfbf7] hover:border-zinc-300'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-sm sm:text-base text-[#292520]">
                          {opt.name}
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">{opt.desc}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 bg-zinc-200/60 rounded text-zinc-700 shrink-0 ml-2">
                        {opt.multiplier}배수
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hardware Type */}
              <div className="space-y-3 pt-2">
                <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
                  <label className="text-base font-bold text-[#292520]">
                    3. 설치 부속 및 세로 공제 방식
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {HARDWARE_OPTIONS.map((hw) => (
                    <button
                      key={hw.id}
                      type="button"
                      onClick={() => setHardwareType(hw.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        hardwareType === hw.id
                          ? 'border-[#c55232] bg-[#c55232]/10 ring-1 ring-[#c55232]'
                          : 'border-zinc-200 bg-[#fdfbf7] hover:bg-zinc-50'
                      }`}
                    >
                      <p className="font-bold text-xs sm:text-sm text-[#292520]">{hw.name}</p>
                      <p className="text-[11px] text-[#c55232] font-semibold mt-1">-{hw.deductionCm}cm 공제</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Split Mode */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-zinc-600">
                  열림 방식 (분할 선택)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSplitType('double')}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                      splitType === 'double'
                        ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                        : 'border-zinc-200 text-zinc-600'
                    }`}
                  >
                    양개형 (좌/우 2장으로 분할)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSplitType('single')}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                      splitType === 'single'
                        ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                        : 'border-zinc-200 text-zinc-600'
                    }`}
                  >
                    편개형 (1장 통원단)
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Blind Specific Options */}
          {productType === 'blind' && (
            <div className="space-y-4 pt-2">
              <div className="border-b border-zinc-100 pb-2">
                <label className="text-base font-bold text-[#292520]">
                  2. 블라인드 설치 방식
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBlindInstallType('outside')}
                  className={`p-3.5 text-left rounded-2xl border transition-all ${
                    blindInstallType === 'outside'
                      ? 'border-[#c55232] bg-[#c55232]/10 ring-1 ring-[#c55232]'
                      : 'border-zinc-200 bg-[#fdfbf7] hover:bg-zinc-50'
                  }`}
                >
                  <p className="font-bold text-sm text-[#292520]">창틀 바깥 덮기 (추천)</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    좌우 +10cm 넓혀 빛샘 차단 (거실/침실 표준)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setBlindInstallType('inside')}
                  className={`p-3.5 text-left rounded-2xl border transition-all ${
                    blindInstallType === 'inside'
                      ? 'border-[#c55232] bg-[#c55232]/10 ring-1 ring-[#c55232]'
                      : 'border-zinc-200 bg-[#fdfbf7] hover:bg-zinc-50'
                  }`}
                >
                  <p className="font-bold text-sm text-[#292520]">창틀 안쪽 매립</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    창틀 안쪽에 쏙 들어가도록 가로 -1cm 컷팅
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Results Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between space-y-6">
          {productType === 'curtain' ? (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
                <span className="text-xs uppercase tracking-wider font-bold text-zinc-400">
                  커튼 맞춤 제작 견적
                </span>
                <span className="px-2.5 py-1 bg-[#c55232]/10 text-[#c55232] text-xs font-bold rounded-md">
                  {currentPleat.name}
                </span>
              </div>

              {/* Big Width Display */}
              <div className="mb-6 text-center bg-[#fdfbf7] p-6 rounded-2xl border border-zinc-200/80">
                <p className="text-xs font-semibold text-zinc-500 mb-1.5">
                  추천 맞춤 제작 가로 폭
                </p>
                <p className="text-4xl sm:text-5xl font-black text-[#c55232] tracking-tight">
                  {curtainFinishedWidthCm}
                  <span className="text-2xl font-bold text-[#292520] ml-1.5">cm</span>
                </p>
                <p className="text-sm font-bold text-zinc-700 mt-2">
                  대폭 원단(140cm) 기준 <strong>총 {totalFabricWidths}폭</strong>
                </p>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3 text-sm sm:text-base text-zinc-600">
                <div className="flex justify-between items-center">
                  <span>제작 세로(높이) 길이</span>
                  <span className="font-extrabold text-[#c55232] text-base sm:text-lg">
                    {curtainFinishedHeightCm}cm
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span>천장 높이 대비 공제치</span>
                  <span>-{currentHardware.deductionCm}cm ({currentHardware.name})</span>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-zinc-200">
                  <span>분할 주문 규격</span>
                  <span className="font-semibold text-zinc-800 text-xs sm:text-sm">
                    {splitType === 'double'
                      ? `가로 ${Math.round(curtainFinishedWidthCm / 2)}cm × 2장 (${widthsPerSide}폭씩)`
                      : `가로 ${curtainFinishedWidthCm}cm × 1장`}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>추천 레일/봉 규격</span>
                  <span className="font-semibold text-zinc-800">
                    약 {railJa}자용 슬라이딩 레일
                  </span>
                </div>

                {/* Checklist */}
                <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-100 text-xs space-y-1.5 mt-3">
                  <p className="font-bold text-[#292520]">📦 함께 살 커튼 부속 추천:</p>
                  <div className="flex justify-between text-zinc-600">
                    <span>커튼 핀 (1폭당 약 7~8개)</span>
                    <span className="font-semibold text-[#292520]">약 {totalFabricWidths * 8}개</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>커튼 끈 및 후사고리(벽걸이)</span>
                    <span className="font-semibold text-[#292520]">1세트 (2개)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
                <span className="text-xs uppercase tracking-wider font-bold text-zinc-400">
                  블라인드 주문 견적
                </span>
                <span className="px-2.5 py-1 bg-[#c55232]/10 text-[#c55232] text-xs font-bold rounded-md">
                  {blindInstallType === 'outside' ? '창틀 바깥형' : '창틀 매립형'}
                </span>
              </div>

              {/* Big Area Display */}
              <div className="mb-6 text-center bg-[#fdfbf7] p-6 rounded-2xl border border-zinc-200/80">
                <p className="text-xs font-semibold text-zinc-500 mb-1.5">
                  주문 면적 규격
                </p>
                <p className="text-4xl sm:text-5xl font-black text-[#c55232] tracking-tight">
                  {blindSqm.toFixed(2)}
                  <span className="text-2xl font-bold text-[#292520] ml-1.5">㎡</span>
                </p>
                <p className="text-sm font-bold text-zinc-700 mt-2">
                  업계 과금 단위: <strong>약 {blindBillableSqm}헤베</strong>
                </p>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm sm:text-base text-zinc-600">
                <div className="flex justify-between items-center">
                  <span>주문 가로 폭</span>
                  <span className="font-bold text-[#292520]">{blindOrderWidthCm}cm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>주문 세로 길이</span>
                  <span className="font-bold text-[#292520]">{blindOrderHeightCm}cm</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-100 text-xs text-zinc-400">
                  <span>손잡이 줄 방향</span>
                  <span>창문 손잡이 반대편 추천</span>
                </div>
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="pt-4">
            <button
              onClick={handleCopy}
              className="w-full py-3.5 bg-[#292520] text-white font-bold text-base rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Icon icon={copied ? 'solar:check-circle-bold' : 'solar:copy-linear'} width="20" height="20" />
              <span>{copied ? '견적 결과가 복사되었습니다!' : '커튼·블라인드 견적 1초 복사하기'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Uncle's Pro Tips */}
      <section className="mt-16 space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-2">
            <Icon icon="solar:lightbulb-bold-duotone" width="20" height="20" />
            <span>삼촌의 시공 현장 꿀팁</span>
          </div>
          <h2 className="editorial-h2">
            커튼 주문할 때 삼촌이 알려주는 4가지 핵심 원칙
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                1
              </span>
              <h3 className="text-base font-bold text-[#292520] break-keep">
                커튼 가로 폭은 왜 최소 1.5~2배를 사야 할까요?
              </h3>
            </div>
            <p className="editorial-body text-zinc-600 text-sm">
              커튼을 창문 가로 폭 그대로 1:1로 맞추면, 커튼을 쳤을 때 <strong>빨랫줄에 걸린 천막처럼 팽팽하게 펴져 볼품이 없습니다.</strong> 호텔처럼 풍성한 물결 주름이 접혀 있으려면 반드시 <strong>창문 가로의 1.5배(민자)~2배(나비주름)</strong>로 넉넉하게 제작해야 커튼을 닫아도 우아한 주름이 살아납니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                2
              </span>
              <h3 className="text-base font-bold text-[#292520] break-keep">
                세로 길이는 &apos;바닥에서 1cm 띄우기&apos;가 황금비율
              </h3>
            </div>
            <p className="editorial-body text-zinc-600 text-sm">
              커튼이 바닥에 끌리면 먼지를 쓸고 다니고 밑단이 금방 시커멓게 때를 탑니다. 반대로 너무 짧으면 껑충해서 보기가 흉합니다. 커튼 레일 부속 두께(약 2cm)와 바닥 여유(1cm)를 고려해 <strong>천장 높이에서 정확히 -3cm를 뺀 치수</strong>로 제작하면 바닥에 닿을 듯 말 듯 가장 아름다운 핏이 나옵니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                3
              </span>
              <h3 className="text-base font-bold text-[#292520] break-keep">
                이중 커튼(암막+쉬폰) 시 커튼박스 폭 15cm 확인!
              </h3>
            </div>
            <p className="editorial-body text-zinc-600 text-sm">
              속지(차르르 쉬폰)와 겉지(암막)를 둘 다 달려면 레일을 2줄 나란히 설치해야 합니다. 그러려면 창문 위쪽 <strong>커튼박스 깊이(폭)가 최소 15~18cm 이상</strong> 확보되어야 두 커튼이 서로 간섭하지 않고 부드럽게 열립니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                4
              </span>
              <h3 className="text-base font-bold text-[#292520] break-keep">
                암막 커튼은 창틀보다 좌우 10~15cm 넓게 제작
              </h3>
            </div>
            <p className="editorial-body text-zinc-600 text-sm">
              아무리 100% 암막 원단을 써도 커튼 양옆 틈새로 빛이 새어 들어오면 방이 환해집니다. 창틀 크기보다 <strong>좌우로 최소 10~15cm 이상 넓게 벽면까지 덮도록 주문</strong>해야 호텔 암실처럼 완벽한 숙면 공간을 만들 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="mt-12 text-center flex items-center justify-center gap-4">
        <Link
          href="/paint-calculator"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#c55232] transition-colors"
        >
          <Icon icon="solar:paint-roller-bold-duotone" width="18" height="18" />
          <span>페인트 계산기</span>
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
