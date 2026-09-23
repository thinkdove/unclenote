'use client';

import { useEffect, useRef, useState } from 'react';

interface CoupangDynamicBannerProps {
  className?: string;
}

declare global {
  interface Window {
    PartnersCoupang?: {
      G: new (config: {
        id: number;
        template: string;
        trackingCode: string;
        width: string;
        height: string;
        tsource?: string;
        container?: HTMLElement | string;
      }) => void;
    };
  }
}

export default function CoupangDynamicBanner({ className = '' }: CoupangDynamicBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isRendered || !containerRef.current) return;

    const initBanner = () => {
      if (window.PartnersCoupang && containerRef.current) {
        try {
          new window.PartnersCoupang.G({
            id: 1032272,
            template: 'carousel',
            trackingCode: 'AF5694661',
            width: '100%',
            height: '140',
            tsource: '',
            container: containerRef.current,
          });
          setIsRendered(true);
        } catch (err) {
          console.error('Failed to init Coupang banner', err);
        }
      }
    };

    if (window.PartnersCoupang) {
      initBanner();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://ads-partners.coupang.com/g.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', initBanner);
    } else {
      const script = document.createElement('script');
      script.src = 'https://ads-partners.coupang.com/g.js';
      script.async = true;
      script.onload = initBanner;
      document.body.appendChild(script);
    }
  }, [isRendered]);

  return (
    <div className={`my-6 p-4 rounded-2xl bg-[#fdfbf7] border border-zinc-200/80 shadow-xs ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#c55232] inline-block animate-pulse" />
          삼촌이 추천하는 오늘의 특가 핫딜
        </span>
        <span className="text-[10px] text-zinc-400 font-medium">
          쿠팡 파트너스
        </span>
      </div>

      {/* Coupang Banner Mount Point */}
      <div
        ref={containerRef}
        className="w-full min-h-[140px] flex items-center justify-center overflow-hidden rounded-xl bg-white border border-zinc-100"
      />

      {/* Mandatory Legal Disclosure */}
      <p className="text-[10px] text-zinc-400 mt-2 text-center break-keep">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  );
}
