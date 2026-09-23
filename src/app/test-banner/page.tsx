'use client';

import CoupangDynamicBanner from '@/components/CoupangDynamicBanner';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function TestBannerPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
          <Icon icon="solar:shield-check-bold" width="16" height="16" />
          비공개 로컬 테스트 페이지
        </span>
        <h1 className="text-2xl font-black text-[#292520]">
          쿠팡파트너스 다이내믹 배너 테스트
        </h1>
        <p className="text-sm text-zinc-600">
          본 페이지는 메뉴나 검색엔진에 노출되지 않는 테스트용 독립 공간입니다.
        </p>
      </div>

      {/* Test Card */}
      <div className="bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-xs space-y-4">
        <h2 className="font-bold text-base text-[#292520] border-b border-zinc-100 pb-2">
          1. 배너 렌더링 확인
        </h2>
        <p className="text-xs text-zinc-500">
          아래 상자 안에 쿠팡 AI 맞춤 롤링 배너가 뜨는지 확인합니다:
        </p>

        {/* The Banner Component */}
        <CoupangDynamicBanner />
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 font-bold"
        >
          <Icon icon="solar:arrow-left-linear" width="16" height="16" />
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
