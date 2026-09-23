'use client';

import { useState, useId } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Icon } from '@iconify/react';

type PaintTarget = 'wall' | 'room' | 'door' | 'custom';

export default function PaintCalculatorPage() {
  const wallWidthId = useId();
  const wallHeightId = useId();
  const roomWidthId = useId();
  const roomLengthId = useId();
  const roomHeightId = useId();

  // 대상 선택: 'wall' (단일 벽면) | 'room' (방 전체 벽면) | 'door' (방문) | 'custom' (직접 면적)
  const [targetType, setTargetType] = useState<PaintTarget>('wall');

  // 단일 벽면 치수
  const [wallWidthM, setWallWidthM] = useState<number>(3.5);
  const [wallHeightM, setWallHeightM] = useState<number>(2.3);

  // 방 전체 치수
  const [roomWidthM, setRoomWidthM] = useState<number>(3.3);
  const [roomLengthM, setRoomLengthM] = useState<number>(3.0);
  const [roomHeightM, setRoomHeightM] = useState<number>(2.3);
  const [doorWindowDeductionSqm, setDoorWindowDeductionSqm] = useState<number>(3.5);

  // 방문 개수
  const [doorCount, setDoorCount] = useState<number>(2); // 문짝 2개
  const [includeDoorFrame, setIncludeDoorFrame] = useState<boolean>(true); // 문틀 포함

  // 직접 면적
  const [customSqm, setCustomSqm] = useState<number>(10);

  // 도장 횟수 (표준 2회)
  const [coats, setCoats] = useState<number>(2);

  // 젯소(프라이머) 시공 여부
  const [needGesso, setNeedGesso] = useState<boolean>(true);

  const [copied, setCopied] = useState<boolean>(false);

  // 1회 도장 기준 순수 면적 (㎡)
  let singleCoatAreaSqm = 0;
  if (targetType === 'wall') {
    singleCoatAreaSqm = Math.max(0, wallWidthM * wallHeightM);
  } else if (targetType === 'room') {
    const totalWallArea = 2 * (roomWidthM + roomLengthM) * roomHeightM;
    singleCoatAreaSqm = Math.max(0, totalWallArea - doorWindowDeductionSqm);
  } else if (targetType === 'door') {
    // 일반 방문 1개 (앞면+뒷면 = 약 3.8㎡, 문틀 포함 시 약 4.8㎡)
    const perDoorSqm = includeDoorFrame ? 4.8 : 3.8;
    singleCoatAreaSqm = doorCount * perDoorSqm;
  } else {
    singleCoatAreaSqm = Math.max(0, customSqm);
  }

  // 총 도장 면적 = 단일 면적 * 도장 횟수
  const totalPaintingAreaSqm = singleCoatAreaSqm * coats;

  // 페인트 소요량 계산
  // 국내 친환경 수성페인트 표준: 1L당 2회 도장 기준 약 5.5㎡ (1회 도장 시 약 11㎡)
  // 따라서 1L당 1회 면적 = 11㎡
  const paintLitersExact = totalPaintingAreaSqm / 11;
  // 여유분 10% 추가
  const recommendedPaintLiters = Math.ceil(paintLitersExact * 1.1 * 10) / 10;

  // 캔 추천 조합 (1L, 4L, 18L 말통)
  let canCombos = '';
  if (recommendedPaintLiters <= 1.0) {
    canCombos = '1L 1통';
  } else if (recommendedPaintLiters <= 2.0) {
    canCombos = '1L 2통';
  } else if (recommendedPaintLiters <= 3.0) {
    canCombos = '1L 3통 (또는 4L 1통 추천)';
  } else if (recommendedPaintLiters <= 4.0) {
    canCombos = '4L 1통';
  } else if (recommendedPaintLiters <= 8.0) {
    const fourL = Math.floor(recommendedPaintLiters / 4);
    const remainder = recommendedPaintLiters % 4;
    const oneL = Math.ceil(remainder);
    canCombos = `4L ${fourL}통 + 1L ${oneL}통`;
  } else if (recommendedPaintLiters <= 16.0) {
    const fourL = Math.ceil(recommendedPaintLiters / 4);
    canCombos = `4L ${fourL}통`;
  } else {
    canCombos = `18L 말통 1통 (대용량)`;
  }

  // 젯소(프라이머) 소요량: 1회 도포 기준 1L당 약 9㎡ 커버
  const gessoLitersExact = needGesso ? singleCoatAreaSqm / 9 : 0;
  const recommendedGessoLiters = needGesso ? Math.max(0.5, Math.ceil(gessoLitersExact * 1.1 * 10) / 10) : 0;
  const gessoCanCombo = needGesso
    ? recommendedGessoLiters <= 0.5
      ? '500ml 1통'
      : recommendedGessoLiters <= 1.0
      ? '1L 1통'
      : recommendedGessoLiters <= 2.0
      ? '1L 2통'
      : `${Math.ceil(recommendedGessoLiters / 4)}통 (4L 규격)`
    : '불필요';

  // 롤러 및 부자재 추천
  const rollerSize = targetType === 'door' ? '소형 4인치 롤러' : '중형 7~9인치 롤러';
  const maskingTapeRolls = Math.max(1, Math.ceil(singleCoatAreaSqm / 8));

  const handleCopy = () => {
    let targetLabel = '';
    if (targetType === 'wall') targetLabel = `단일 벽면 (${wallWidthM}m × ${wallHeightM}m)`;
    else if (targetType === 'room') targetLabel = `방 전체 벽면 (가로 ${roomWidthM}m × 세로 ${roomLengthM}m)`;
    else if (targetType === 'door') targetLabel = `방문 ${doorCount}개 (${includeDoorFrame ? '문틀 포함' : '문짝만'})`;
    else targetLabel = `직접 입력 (${customSqm}㎡)`;

    const text = `[삼촌노트 셀프 페인트 소요량 견적서]
• 시공 대상: ${targetLabel}
• 1회 면적: ${singleCoatAreaSqm.toFixed(2)}㎡ (총 도장 횟수: ${coats}회)
• 젯소(프라이머): ${needGesso ? '필요 (1회 도포)' : '생략'}
---------------------------------
⭐ 추천 페인트 구매량: 약 ${recommendedPaintLiters}L (${canCombos})
• 추천 젯소 구매량: ${needGesso ? `약 ${recommendedGessoLiters}L (${gessoCanCombo})` : '해당 없음'}
• 추천 도구 세트:
  - ${rollerSize} + 전용 트레이 1세트
  - 모서리용 수성 페인트 붓 (1.5~2인치) 1개
  - 커버링/마스킹 테이프 약 ${maskingTapeRolls}롤
  - 샌딩용 사포 (220~320방) 1~2장
계산기 바로가기: https://UncleNote.com/paint-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // AEO / SEO Structured Data (SoftwareApplication + FAQPage)
  const paintStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://unclenote.com/paint-calculator#webapp',
        'name': '셀프 페인트 소요량 계산기',
        'url': 'https://unclenote.com/paint-calculator',
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'All',
        'description': '벽면, 방 전체, 방문 페인트 2회 도장 기준 필요한 페인트 리터(L) 수와 캔 규격(1L, 4L, 18L), 젯소 및 부자재 자동 계산기',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'KRW',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://unclenote.com/paint-calculator#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': '페인트 1L로 벽면을 몇 ㎡(몇 평) 칠할 수 있나요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '국내 표준 친환경 수성 페인트 기준 1L로 2회 도장 시 약 5.5㎡(약 1.7평), 1회 도장 시 약 11㎡(약 3.3평)를 도포할 수 있습니다.',
            },
          },
          {
            '@type': 'Question',
            'name': '방문이나 시트지 위에 페인트칠할 때 젯소(프라이머)는 필수인가요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '인테리어 필름이나 시트지가 붙은 방문은 표면이 매끄러워 페인트가 겉돕니다. 가볍게 사포질 후 젯소를 1회 바르고 2시간 건조시킨 뒤 페인트를 칠해야 칠이 벗겨지지 않고 강력하게 밀착됩니다.',
            },
          },
          {
            '@type': 'Question',
            'name': '마스킹 테이프는 페인트가 완전히 마른 후 떼어야 하나요?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '아닙니다. 페인트가 완전히 건조된 후 테이프를 떼면 굳은 페인트 도막이 함께 뜯겨 나갑니다. 2차 도포 후 30분~1시간 내외로 손에 묻지 않을 정도로 살짝 굳었을 때 조심스럽게 대각선으로 떼어내야 경계선이 칼로 자른 듯 깔끔합니다.',
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
        id="paint-calc-aeo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paintStructuredData) }}
      />

      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-3">
          <Icon icon="solar:paint-roller-bold-duotone" width="20" height="20" />
          <span>삼촌의 셀프 인테리어 도구</span>
        </div>
        <h1 className="editorial-h1 mb-3 break-keep [text-wrap:balance]">
          셀프 페인트 소요량 계산기
        </h1>
        <p className="editorial-body text-zinc-600">
          벽면·방문·가구 칠할 때 <strong>1L를 사야 할지, 4L를 사야 할지</strong> 헷갈리시죠? 2회 도장 기준 실제 필요한 페인트 용량(L)과 <strong>젯소(프라이머) 및 롤러·테이프 부자재</strong>를 1초 만에 계산해 드립니다.
        </p>
      </div>

      {/* Target Selector */}
      <div className="mb-8">
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
          칠할 대상 선택
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-200/60 p-1.5 rounded-2xl">
          {[
            { id: 'wall', label: '단일 벽면 포인트', icon: 'solar:widget-2-bold-duotone' },
            { id: 'room', label: '방 1개 전체 벽면', icon: 'solar:home-smile-bold-duotone' },
            { id: 'door', label: '방문 / 문틀', icon: 'solar:door-bold-duotone' },
            { id: 'custom', label: '면적 직접 입력', icon: 'solar:calculator-minimalistic-bold-duotone' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTargetType(item.id as PaintTarget)}
              className={`py-3 px-2 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                targetType === item.id
                  ? 'bg-white text-[#292520] shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Icon icon={item.icon} className="text-[#c55232]" width="18" height="18" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
          
          {/* Target Dimension Form */}
          <div className="space-y-4">
            <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#292520]">
                1. 칠할 공간 치수 입력
              </h2>
              <span className="text-xs text-zinc-400">
                1회 면적: {singleCoatAreaSqm.toFixed(1)}㎡
              </span>
            </div>

            {targetType === 'wall' && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor={wallWidthId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                    벽 가로 폭 (m)
                  </label>
                  <div className="editorial-input-box">
                    <input
                      id={wallWidthId}
                      type="number"
                      step="0.1"
                      min="0.5"
                      value={wallWidthM}
                      onChange={(e) => setWallWidthM(Math.max(0, Number(e.target.value)))}
                    />
                    <span className="input-unit">m</span>
                  </div>
                </div>

                <div>
                  <label htmlFor={wallHeightId} className="block text-xs font-bold text-zinc-600 mb-1.5">
                    벽 세로 높이 (m)
                  </label>
                  <div className="editorial-input-box">
                    <input
                      id={wallHeightId}
                      type="number"
                      step="0.1"
                      min="0.5"
                      value={wallHeightM}
                      onChange={(e) => setWallHeightM(Math.max(0, Number(e.target.value)))}
                    />
                    <span className="input-unit">m</span>
                  </div>
                </div>
              </div>
            )}

            {targetType === 'room' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  <div>
                    <label htmlFor={roomWidthId} className="block text-xs font-bold text-zinc-600 mb-1">
                      방 가로 (m)
                    </label>
                    <div className="editorial-input-box">
                      <input
                        id={roomWidthId}
                        type="number"
                        step="0.1"
                        min="1"
                        value={roomWidthM}
                        onChange={(e) => setRoomWidthM(Math.max(0, Number(e.target.value)))}
                      />
                      <span className="input-unit">m</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={roomLengthId} className="block text-xs font-bold text-zinc-600 mb-1">
                      방 세로 (m)
                    </label>
                    <div className="editorial-input-box">
                      <input
                        id={roomLengthId}
                        type="number"
                        step="0.1"
                        min="1"
                        value={roomLengthM}
                        onChange={(e) => setRoomLengthM(Math.max(0, Number(e.target.value)))}
                      />
                      <span className="input-unit">m</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={roomHeightId} className="block text-xs font-bold text-zinc-600 mb-1">
                      천장 높이 (m)
                    </label>
                    <div className="editorial-input-box">
                      <input
                        id={roomHeightId}
                        type="number"
                        step="0.1"
                        min="1.5"
                        value={roomHeightM}
                        onChange={(e) => setRoomHeightM(Math.max(0, Number(e.target.value)))}
                      />
                      <span className="input-unit">m</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-zinc-600">
                      문/창문 제외 면적 (㎡)
                    </label>
                    <span className="text-[11px] text-zinc-400">페인트 안 칠하는 면적</span>
                  </div>
                  <div className="editorial-input-box">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={doorWindowDeductionSqm}
                      onChange={(e) => setDoorWindowDeductionSqm(Math.max(0, Number(e.target.value)))}
                    />
                    <span className="input-unit">㎡</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">※ 방문 1개(약 2㎡) + 창문(약 1.5㎡) 기준 보통 3.5㎡ 차감</p>
                </div>
              </div>
            )}

            {targetType === 'door' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1.5">
                    칠할 방문 개수
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {[1, 2, 3, 4].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setDoorCount(cnt)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          doorCount === cnt
                            ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232]'
                            : 'border-zinc-200 text-zinc-600'
                        }`}
                      >
                        {cnt}개
                      </button>
                    ))}
                  </div>
                  <div className="editorial-input-box">
                    <input
                      type="number"
                      min="1"
                      value={doorCount}
                      onChange={(e) => setDoorCount(Math.max(1, Number(e.target.value)))}
                      className="font-bold"
                    />
                    <span className="input-unit">개</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#fdfbf7] rounded-xl border border-zinc-200">
                  <span className="text-xs font-bold text-zinc-700">문틀(문 프레임)도 함께 칠하기</span>
                  <input
                    type="checkbox"
                    checked={includeDoorFrame}
                    onChange={(e) => setIncludeDoorFrame(e.target.checked)}
                    className="w-5 h-5 accent-[#c55232] rounded cursor-pointer"
                  />
                </div>
              </div>
            )}

            {targetType === 'custom' && (
              <div>
                <label className="block text-xs font-bold text-zinc-600 mb-1.5">
                  칠할 총 표면적 (㎡)
                </label>
                <div className="editorial-input-box">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={customSqm}
                    onChange={(e) => setCustomSqm(Math.max(0.5, Number(e.target.value)))}
                    className="font-bold"
                  />
                  <span className="input-unit">㎡</span>
                </div>
              </div>
            )}
          </div>

          {/* 2. Coat count & Gesso */}
          <div className="space-y-4 pt-2">
            <div className="border-b border-zinc-100 pb-2 flex items-center justify-between">
              <label className="text-base font-bold text-[#292520]">
                2. 도장 횟수 및 젯소(프라이머) 설정
              </label>
            </div>

            {/* Coats Selector */}
            <div>
              <label className="block text-xs font-bold text-zinc-600 mb-1.5">
                페인트 칠할 횟수
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { count: 1, label: '1회 칠', desc: '같은 색 단순 덧칠' },
                  { count: 2, label: '2회 칠', desc: '표준 권장 (95%)', isDefault: true },
                  { count: 3, label: '3회 칠', desc: '진한 색 → 흰색 변경' },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setCoats(item.count)}
                    className={`py-2.5 px-2 rounded-xl border text-center transition-all ${
                      coats === item.count
                        ? 'border-[#c55232] bg-[#c55232]/10 text-[#c55232] ring-1 ring-[#c55232]'
                        : 'border-zinc-200 bg-[#fdfbf7] text-zinc-600 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="font-extrabold text-sm flex items-center justify-center gap-1">
                      <span>{item.label}</span>
                      {item.isDefault && (
                        <span className="text-[10px] px-1 bg-[#c55232] text-white rounded font-normal">
                          표준
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gesso Toggle */}
            <div className="p-3.5 bg-[#fdfbf7] rounded-2xl border border-zinc-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#292520]">젯소(프라이머) 밑작업 포함</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    진한 색 바탕 차단 및 페인트 접착력 2배 상승
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={needGesso}
                  onChange={(e) => setNeedGesso(e.target.checked)}
                  className="w-5 h-5 accent-[#c55232] rounded cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed pt-1 border-t border-zinc-200/60">
                💡 <strong>삼촌의 조언:</strong> 방문(시트지·필름), 진한 무늬 벽지, 철재, 코팅된 가구는 젯소를 1회 먼저 칠해야 페인트가 껍질처럼 벗겨지지 않습니다.
              </p>
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
                {coats}회 도장 기준
              </span>
            </div>

            {/* Big Liters Display */}
            <div className="mb-6 text-center bg-[#fdfbf7] p-6 rounded-2xl border border-zinc-200/80">
              <p className="text-xs font-semibold text-zinc-500 mb-1.5">
                추천 구매 페인트 용량
              </p>
              <p className="text-4xl sm:text-5xl font-black text-[#c55232] tracking-tight">
                약 {recommendedPaintLiters}
                <span className="text-2xl font-bold text-[#292520] ml-1.5">리터 (L)</span>
              </p>
              <p className="text-sm font-bold text-zinc-700 mt-2">
                추천 구매 통: <strong className="text-[#c55232]">{canCombos}</strong>
              </p>
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-3 text-sm sm:text-base text-zinc-600">
              <div className="flex justify-between items-center">
                <span>1회 칠할 면적</span>
                <span className="font-bold text-[#292520]">
                  {singleCoatAreaSqm.toFixed(2)}㎡ <span className="text-xs font-normal text-zinc-400">(약 {(singleCoatAreaSqm / 3.3058).toFixed(1)}평)</span>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>총 도장 횟수</span>
                <span className="font-semibold text-zinc-800">{coats}회 칠</span>
              </div>

              <div className="flex justify-between items-center pt-2.5 border-t border-dashed border-zinc-200 text-xs sm:text-sm">
                <span>젯소(프라이머) 추천량</span>
                <span className="font-bold text-[#292520]">
                  {needGesso ? `약 ${recommendedGessoLiters}L (${gessoCanCombo})` : '선택 안 함'}
                </span>
              </div>

              {/* Recommended Tool Set */}
              <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-100 text-xs space-y-1.5 mt-3">
                <p className="font-bold text-[#292520]">📦 필수 페인트 부자재 체크리스트:</p>
                <div className="flex justify-between text-zinc-600">
                  <span>추천 롤러 규격</span>
                  <span className="font-semibold text-[#292520]">{rollerSize}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>모서리용 수성 페인트 붓</span>
                  <span className="font-semibold text-[#292520]">1.5~2인치 1개</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>커버링 / 마스킹 테이프</span>
                  <span className="font-semibold text-[#292520]">약 {maskingTapeRolls}롤</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>표면 정리용 사포(샌딩페이퍼)</span>
                  <span className="font-semibold text-[#292520]">220~320방 1~2장</span>
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
              <span>{copied ? '견적 결과가 복사되었습니다!' : '페인트 주문 견적 1초 복사하기'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Uncle's Pro Paint Tips */}
      <section className="mt-16 space-y-6">
        <div className="border-b border-zinc-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#c55232] uppercase mb-2">
            <Icon icon="solar:lightbulb-bold-duotone" width="20" height="20" />
            <span>삼촌의 시공 현장 꿀팁</span>
          </div>
          <h2 className="editorial-h2">
            페인트칠 시작 전 삼촌이 알려주는 4가지 핵심 원칙
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                1
              </span>
              <h3 className="text-base font-bold text-[#292520] break-keep">
                마스킹 테이프는 페인트가 완전히 마르기 전에 떼기!
              </h3>
            </div>
            <p className="editorial-body text-zinc-600 text-sm">
              초보자들이 가장 많이 하는 실수입니다. 페인트가 바짝 마른 다음 테이프를 떼어내면 <strong>페인트 도막이 테이프에 붙어서 경계선이 껍질처럼 함께 뜯겨 나갑니다.</strong> 마지막 2회 칠이 끝나고 30분~1시간 내외로 손에 묻지 않을 정도로만 살짝 굳었을 때 조심스럽게 대각선으로 떼어내야 칼로 자른 듯 깔끔합니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                2
              </span>
              <h3 className="text-base font-bold text-[#292520] break-keep">
                방문이나 시트지 위에 젯소(프라이머)는 필수
              </h3>
            </div>
            <p className="editorial-body text-zinc-600 text-sm">
              인테리어 필름이나 시트지가 붙은 방문은 표면이 미끄러워 페인트가 겉돕니다. 사포로 가볍게 스크래치를 내주고 <strong>젯소를 1회 얇게 펴 바른 뒤 2시간 건조</strong>시켜야 페인트가 강력하게 안착합니다. 젯소를 생략하면 나중에 손톱으로 긁어도 페인트가 벗겨집니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                3
              </span>
              <h3 className="text-base font-bold text-[#292520] break-keep">
                1회 칠과 2회 칠 사이 충분한 건조 시간 갖기
              </h3>
            </div>
            <p className="editorial-body text-zinc-600 text-sm">
              1차 도포 후 덜 말랐는데 급한 마음에 2차 칠을 덧바르면 롤러가 마르지 않은 페인트를 밀어내어 붓 자국과 뭉침 떡이 생깁니다. <strong>최소 2~3시간 동안 바짝 말린 후</strong> 2차 칠을 올려야 색상이 맑고 균일하게 발색됩니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#c55232]/10 text-[#c55232] flex items-center justify-center font-black text-sm shrink-0">
                4
              </span>
              <h3 className="text-base font-bold text-[#292520] break-keep">
                비 오는 날이나 습도 85% 이상일 땐 작업 금지
              </h3>
            </div>
            <p className="editorial-body text-zinc-600 text-sm">
              수성 페인트는 수분이 증발하면서 굳는 원리입니다. 장마철이나 습도가 높은 날에는 건조가 되지 않아 페인트가 흘러내리고 냄새가 오래 남으며 접착력이 급격히 떨어집니다. 맑고 건조한 날 창문을 환기하면서 작업하는 것이 성공의 지름길입니다.
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
          <span>도배지 계산기</span>
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
