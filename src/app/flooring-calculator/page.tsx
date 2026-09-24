'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Icon } from '@iconify/react';

interface FlooringThickness {
  id: string;
  name: string;
  desc: string;
  recommendFor: string;
  tag: string;
}

const THICKNESS_PRESETS: FlooringThickness[] = [
  {
    id: '1.8T',
    name: '1.8T (두께 1.8mm)',
    desc: '가장 얇고 가벼움, 가성비 중심',
    recommendFor: '원룸, 오피스텔, 전월세 임대용, 베란다',
    tag: '가성비/원룸용',
  },
  {
    id: '2.2T',
    name: '2.2T (두께 2.2mm)',
    desc: '국내 가정집 점유율 1위 국민 장판',
    recommendFor: '일반 아파트, 빌라, 신혼집 주거용 표준',
    tag: '국민 표준',
  },
  {
    id: '3.2T',
    name: '3.2T (두께 3.2mm)',
    desc: '푹신한 보행감, 생활 스크래치 방지',
    recommendFor: '자녀 방, 무릎 보호, 거실 메인',
    tag: '고급 주거용',
  },
  {
    id: '4.5T',
    name: '4.5T / 5.0T (두께 4.5~5.0mm)',
    desc: '두툼한 고탄성 쿠션, 층간소음 저감',
    recommendFor: '반려동물 가정, 층간소음 예방, 최고급 인테리어',
    tag: '층간소음 저감',
  },
];

export default function FlooringCalculatorPage() {
  const widthInputId = useId();
  const lengthInputId = useId();

  // 방 치수 (m)
  const [widthM, setWidthM] = useState<number>(3.3); // 가로 3.3m
  const [lengthM, setLengthM] = useState<number>(2.7); // 세로 2.7m

  // 마감 방식: 'fold' (벽으로 5~10cm 꺾어올림) | 'cut' (딱 맞게 자르고 굽도리/걸레받이 시공)
  const [finishType, setFinishType] = useState<'fold' | 'cut'>('fold');

  // 두께 선택
  const [selectedThickness, setSelectedThickness] = useState<string>('2.2T');

  const [copied, setCopied] = useState<boolean>(false);

  // 장판 고정 폭: 1.8m
  const ROLL_WIDTH = 1.8;

  // 마감 여유 길이 (폭당 길이 추가치)
  // 꺾어올림: 양쪽 벽 10cm씩 총 +20cm (0.2m)
  // 굽도리 마감: 재단 오차 대비 양쪽 +10cm (0.1m)
  const marginLengthM = finishType === 'fold' ? 0.2 : 0.1;

  // 방향 1: 가로 폭을 1.8m로 나눌 때 (길이 방향: 세로)
  const hasFloorArea = widthM > 0 && lengthM > 0;
  const lanesDir1 = hasFloorArea ? Math.ceil(widthM / ROLL_WIDTH) : 0;
  const laneLengthDir1 = hasFloorArea ? lengthM + marginLengthM : 0;
  const totalLengthDir1 = lanesDir1 * laneLengthDir1;

  // 방향 2: 세로 길이를 1.8m로 나눌 때 (길이 방향: 가로)
  const lanesDir2 = hasFloorArea ? Math.ceil(lengthM / ROLL_WIDTH) : 0;
  const laneLengthDir2 = hasFloorArea ? widthM + marginLengthM : 0;
  const totalLengthDir2 = lanesDir2 * laneLengthDir2;

  // 더 자재 소모가 적은(로스가 적은) 추천 방향 자동 판별
  const isDir1Better = totalLengthDir1 <= totalLengthDir2;
  const recommendedLanes = isDir1Better ? lanesDir1 : lanesDir2;
  const recommendedLaneLength = isDir1Better ? laneLengthDir1 : laneLengthDir2;
  const recommendedTotalLength = isDir1Better ? totalLengthDir1 : totalLengthDir2;
  const recommendedDirectionLabel = isDir1Better
    ? `세로 방향 깔기 (${lanesDir1}줄)`
    : `가로 방향 깔기 (${lanesDir2}줄)`;

  // 순 바닥 면적 (㎡ 및 평)
  const floorAreaSqm = widthM * lengthM;
  const floorAreaPyung = (floorAreaSqm / 3.3058).toFixed(1);

  // 주문 미터 수 (0.1m 단위 올림)
  const orderLengthM = Math.ceil(recommendedTotalLength * 10) / 10;

  // 1롤(보통 25m) 기준 롤 수 환산
  const rollsCount = (orderLengthM / 25).toFixed(2);

  // 부자재 계산
  // 이음매 접착제(용착제): 2줄 이상일 때 이음매(줄수 - 1)개 발생. 1병으로 약 20m 시공 가능
  const seamCount = Math.max(0, recommendedLanes - 1);
  const totalSeamLengthM = seamCount * (isDir1Better ? lengthM : widthM);
  const solventBottles = seamCount > 0 ? Math.max(1, Math.ceil(totalSeamLengthM / 20)) : 0;

  // 걸레받이 굽도리(스티커): 방 둘레 = 2 * (가로 + 세로)
  const roomPerimeterM = 2 * (widthM + lengthM);
  // 굽도리 1롤 = 보통 25m
  const gubdoriRolls = finishType === 'cut' && hasFloorArea ? Math.ceil(roomPerimeterM / 25) : 0;

  const currentThickness = THICKNESS_PRESETS.find((t) => t.id === selectedThickness) || THICKNESS_PRESETS[1];

  const handleCopy = () => {
    const text = `[삼촌노트 장판(모노륨) 소요량 견적서]
• 방 치수: 가로 ${widthM}m × 세로 ${lengthM}m (바닥 약 ${floorAreaPyung}평 / ${floorAreaSqm.toFixed(2)}㎡)
• 마감 방식: ${finishType === 'fold' ? '벽면 꺾어올림 마감 (여유치수 +20cm)' : '굽도리/걸레받이 직각 컷팅'}
• 선택 두께: ${currentThickness.name} (${currentThickness.tag})
---------------------------------
⭐ 추천 주문 장판: 1.8m 폭 × 총 ${orderLengthM}m (약 ${rollsCount}롤)
• 시공 폭(줄) 수: 총 ${recommendedLanes}줄 (${recommendedDirectionLabel})
• 1줄당 재단 길이: 약 ${recommendedLaneLength.toFixed(2)}m
• 필수 부자재:
  - 용착제(이음매 접착제): ${seamCount > 0 ? `${solventBottles}개 (이음매 ${totalSeamLengthM.toFixed(1)}m)` : '필요 없음 (1줄로 시공 완료)'}
  ${finishType === 'cut' ? `- 걸레받이 굽도리(25m): 약 ${gubdoriRolls}롤 (둘레 ${roomPerimeterM.toFixed(1)}m)` : ''}
계산기 바로가기: https://UncleNote.com/flooring-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // AEO & Google Rich Snippet Structured Data (SoftwareApplication + FAQPage)
  const flooringStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://unclenote.com/flooring-calculator#webapp',
        'name': '장판(모노륨) 소요량 및 미터(m) 수 계산기',
        'url': 'https://unclenote.com/flooring-calculator',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'All',
        'description': '국내 표준 1.8m 폭 모노륨 장판 기준, 방 치수에 따른 최적 시공 방향(줄 수), 구매 미터(m) 수, 꺾어올림 여유분 및 용착제 부자재 자동 계산기',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'KRW',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://unclenote.com/flooring-calculator#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': '장판 두께(1.8T, 2.2T, 3.2T, 4.5T)는 어떤 기준으로 선택해야 하나요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '1.8T는 원룸/전월세 임대용 가성비 장판으로 적합하며, 2.2T는 일반 가정집에서 가장 많이 쓰는 국민 표준 두께입니다. 3.2T 이상은 보행감이 푹신하여 무릎 보호에 좋고, 4.5T~5.0T는 층간소음 저감 효과와 반려동물 슬개골 보호에 특화되어 있습니다.',
            },
          },
          {
            '@type': 'Question',
            'name': '장판 시공 시 재단 여유분과 이음매 용착제는 얼마나 필요한가요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '장판은 줄당 벽면 꺾어올림 및 양 끝 절단 여유분으로 최소 10~20cm를 더해 재단해야 합니다. 두 줄 이상 이어붙일 때는 이음매 틈새를 녹여 붙이는 장판 전용 용착제가 필수이며, 보통 방 1~2개당 용착제 1세트(약 30ml)가 소요됩니다.',
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
        id="flooring-calc-aeo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(flooringStructuredData) }}
      />

      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-3">
          <Icon icon="solar:floor-lamp-bold-duotone" width="20" height="20" />
          <span>삼촌의 셀프 인테리어 도구</span>
        </div>
        <h1 className="editorial-h1 mb-3">
          장판(모노륨) 소요량 계산기
        </h1>
        <p className="editorial-body text-zinc-600">
          국내 표준 <strong>1.8m(180cm) 폭</strong> 기준으로 방 가로·세로 치수만 넣으면 <strong>몇 줄을 깔아야 로스가 적은지</strong> 최적 방향을 비교하여 <strong className="text-[#292520]">실제 구매할 장판 미터(m) 수</strong>와 부자재를 1초 만에 계산해 드립니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
          
          {/* 1. Dimension Section */}
          <div className="space-y-4">
            <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#292520]">
                1. 방 치수 입력
              </h2>
              <span className="text-xs text-zinc-400">단위: 미터(m)</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor={widthInputId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                  가로 폭 (m)
                </label>
                <div className="relative">
                  <input
                    id={widthInputId}
                    type="number"
                    step="0.1"
                    min="0.5"
                    value={widthM}
                    onChange={(e) => setWidthM(Math.max(0, Number(e.target.value)))}
                    className="editorial-input text-right pr-9"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-bold">
                    m
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">예: 3.3m (330cm)</p>
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
                    min="0.5"
                    value={lengthM}
                    onChange={(e) => setLengthM(Math.max(0, Number(e.target.value)))}
                    className="editorial-input text-right pr-9"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400 font-bold">
                    m
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 mt-1">예: 2.7m (270cm)</p>
              </div>
            </div>

            <div className="p-3 bg-[#fdfbf7] rounded-xl border border-zinc-200 text-xs flex items-center justify-between">
              <span>바닥 순 면적:</span>
              <span className="font-bold text-[#292520]">
                {floorAreaSqm.toFixed(2)}㎡ (약 {floorAreaPyung}평)
              </span>
            </div>
          </div>

          {/* 2. Finish Method Selection */}
          <div className="space-y-3 pt-2">
            <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
              <label className="text-base font-bold text-[#292520]">
                2. 벽면 마감 방식 선택
              </label>
              <span className="text-xs text-zinc-400">재단 여유 치수</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFinishType('fold')}
                className={`p-3.5 text-left rounded-2xl border transition-all ${
                  finishType === 'fold'
                    ? 'border-[#c55232] bg-[#c55232]/10 ring-1 ring-[#c55232]'
                    : 'border-zinc-200 bg-[#fdfbf7] hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#292520]">
                  <Icon icon="solar:round-transfer-vertical-bold" className="text-[#c55232]" width="16" height="16" />
                  <span>벽면 꺾어올림 마감</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  벽 쪽으로 5~10cm 올려서 마감 (여유 +20cm 반영, 전월세 가장 대중적)
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFinishType('cut')}
                className={`p-3.5 text-left rounded-2xl border transition-all ${
                  finishType === 'cut'
                    ? 'border-[#c55232] bg-[#c55232]/10 ring-1 ring-[#c55232]'
                    : 'border-zinc-200 bg-[#fdfbf7] hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-sm text-[#292520]">
                  <Icon icon="solar:scissors-square-bold-duotone" className="text-[#c55232]" width="16" height="16" />
                  <span>굽도리 / 걸레받이 마감</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  모서리에 딱 맞춰 자르고 걸레받이 스티커(굽도리) 부착
                </p>
              </button>
            </div>
          </div>

          {/* 3. Thickness Preset Selector */}
          <div className="space-y-3 pt-2">
            <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
              <label className="text-base font-bold text-[#292520]">
                3. 장판 두께(T) 선택
              </label>
              <span className="text-xs text-zinc-400">용도별 규격</span>
            </div>

            <div className="space-y-2">
              {THICKNESS_PRESETS.map((item) => {
                const isSelected = selectedThickness === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedThickness(item.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#c55232] bg-[#c55232]/5 ring-1.5 ring-[#c55232]'
                        : 'border-zinc-200 bg-[#fdfbf7] hover:border-zinc-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm sm:text-base text-[#292520]">
                          {item.name}
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-200/70 rounded text-[11px] font-bold text-zinc-800">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">{item.recommendFor}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direction Comparison Widget */}
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 space-y-2">
            <p className="text-xs font-bold text-[#292520] flex items-center gap-1.5">
              <Icon icon="solar:compass-bold-duotone" className="text-[#c55232]" width="16" height="16" />
              <span>장판 시공 방향별 자재 소모량 비교 (1.8m 폭 기준):</span>
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border ${isDir1Better ? 'bg-white border-[#c55232] font-bold' : 'bg-zinc-100 text-zinc-500 border-zinc-200'}`}>
                <p>세로 방향 깔기 {isDir1Better && '⭐ 추천 (로스 최소)'}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">{lanesDir1}줄 필요 / 총 {totalLengthDir1.toFixed(1)}m</p>
              </div>
              <div className={`p-2.5 rounded-xl border ${!isDir1Better ? 'bg-white border-[#c55232] font-bold' : 'bg-zinc-100 text-zinc-500 border-zinc-200'}`}>
                <p>가로 방향 깔기 {!isDir1Better && '⭐ 추천 (로스 최소)'}</p>
                <p className="text-[11px] text-zinc-400 mt-0.5">{lanesDir2}줄 필요 / 총 {totalLengthDir2.toFixed(1)}m</p>
              </div>
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
                폭 1.8m 고정 규격
              </span>
            </div>

            {/* Big Meter Count */}
            <div className="mb-6 text-center bg-[#fdfbf7] p-6 rounded-2xl border border-zinc-200/80">
              <p className="text-xs font-semibold text-zinc-500 mb-1.5">
                실제 구매하셔야 할 장판 길이
              </p>
              <p className="text-4xl sm:text-5xl font-black text-[#c55232] tracking-tight">
                {orderLengthM}
                <span className="text-2xl font-bold text-[#292520] ml-1.5">미터 (m)</span>
              </p>
              <p className="text-sm font-bold text-zinc-600 mt-2">
                1.8m 폭 × 총 {recommendedLanes}줄 (약 {rollsCount}롤 분량)
              </p>
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-3 text-sm sm:text-base text-zinc-600">
              <div className="flex justify-between items-center">
                <span>방 바닥 면적</span>
                <span className="font-bold text-[#292520]">
                  {floorAreaSqm.toFixed(2)}㎡ <span className="text-xs font-normal text-zinc-400">(약 {floorAreaPyung}평)</span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>선택 두께</span>
                <span className="font-bold text-[#292520]">
                  {currentThickness.name}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>추천 깔기 방향</span>
                <span className="font-semibold text-zinc-800">
                  {recommendedDirectionLabel}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-zinc-200 text-xs sm:text-sm">
                <span>1줄당 재단 필요 길이</span>
                <span className="font-semibold text-[#292520]">약 {recommendedLaneLength.toFixed(2)}m (마감 여유 포함)</span>
              </div>

              <div className="flex justify-between items-center text-xs text-zinc-500">
                <span>이음매(겹침) 발생 횟수</span>
                <span>{seamCount > 0 ? `${seamCount}개소 (길이 ${totalSeamLengthM.toFixed(1)}m)` : '없음 (단일 폭 시공)'}</span>
              </div>

              {/* Recommended Accessories */}
              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-100 text-xs space-y-1.5 mt-3">
                <p className="font-bold text-[#292520]">📦 함께 살 장판 부자재 추천:</p>
                <div className="flex justify-between text-zinc-600">
                  <span>용착제(이음매 접착제+시공구)</span>
                  <span className="font-semibold text-[#292520]">
                    {seamCount > 0 ? `${solventBottles}개` : '불필요 (1줄 시공)'}
                  </span>
                </div>
                {finishType === 'cut' && (
                  <div className="flex justify-between text-zinc-600">
                    <span>걸레받이 굽도리 스티커 (25m)</span>
                    <span className="font-semibold text-[#292520]">{gubdoriRolls}롤 (둘레 {roomPerimeterM.toFixed(1)}m)</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>친환경 바닥용 친환경 본드</span>
                  <span className="font-semibold text-[#292520]">약 1통 (1kg)</span>
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
              <span>{copied ? '견적 결과가 복사되었습니다!' : '장판 주문 견적 1초 복사하기'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Uncle's Pro Flooring Tips */}
      <section className="mt-16 space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-2">
            <Icon icon="solar:lightbulb-bold-duotone" width="20" height="20" />
            <span>삼촌의 시공 현장 꿀팁</span>
          </div>
          <h2 className="editorial-h2">
            장판 시공할 때 삼촌이 알려주는 4가지 핵심 원칙
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              장판 깔기 방향은 &apos;빛(창문)이 들어오는 방향&apos;과 평행하게!
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              장판 2줄이 맞닿는 이음매는 빛을 정면으로 받으면 그림자가 져서 이음선이 도드라져 보입니다. 가능하면 <strong>베란다 창문이나 현관에서 들어오는 채광 방향과 나란한 방향</strong>으로 길게 깔아야 이음매가 눈에 띄지 않고 방이 훨씬 넓어 보입니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              용착제(이음매 접착제) 사용 후 3초 안에 닦아내기
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              용착제는 장판 표면의 PVC를 순간적으로 녹여서 붙이는 강력한 화학 약품입니다. 이음매 틈새에 주입한 직후 <strong>마른 수건으로 즉시 닦아내지 않으면</strong> 흘러넘친 약품이 장판 표면을 녹여 허옇게 얼룩이 남습니다. 반드시 한 손엔 용착제, 다른 손엔 마른 걸레를 쥐고 작업하세요.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              겨울철에 장판을 바로 펴면 뚝 부러집니다
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              추운 날씨에 배송받은 차가운 장판을 억지로 펴면 딱딱하게 굳어 있어 갈라지거나 찢어집니다. 시공 전 <strong>보일러를 25도 정도로 틀어 방바닥을 따뜻하게 데워두고</strong>, 장판 롤을 방 안에 몇 시간 두어 부드러워진 다음 펴야 말끔하게 밀착됩니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-lg">
              4
            </div>
            <h3 className="text-base font-bold text-[#292520]">
              기존 장판 위에 덧방 시 곰팡이 점검 필수
            </h3>
            <p className="editorial-body text-zinc-600 text-sm">
              장판 위에 새 장판을 덧깔면 철거비와 폐기물 비용을 아낄 수 있지만, 기존 장판 밑에 습기나 곰팡이가 피어 있다면 새 장판 밑에서 썩어 냄새가 올라옵니다. 가장자리 모서리를 살짝 들춰보고 <strong>바닥이 뽀송뽀송한지 꼭 확인</strong>한 뒤 덧방을 결정하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="mt-12 text-center flex items-center justify-center gap-4">
        <Link
          href="/wallpaper-calculator"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#c55232] transition-colors"
        >
          <Icon icon="solar:brush-bold-duotone" width="18" height="18" />
          <span>도배지 계산기 보러가기</span>
        </Link>
        <span className="text-zinc-300">|</span>
        <Link
          href="/tile-calculator"
          className="inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-[#c55232] transition-colors"
        >
          <Icon icon="solar:ruler-pen-bold-duotone" width="18" height="18" />
          <span>타일 계산기</span>
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
