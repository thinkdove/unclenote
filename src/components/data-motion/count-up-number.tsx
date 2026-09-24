'use client';

import { useEffect, useRef, useState } from 'react';

export default function CountUpNumber({ value, decimals = 0, suffix = '', prefix = '' }: { value: number; decimals?: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let inView = false;
    setProgress(0);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView) {
        inView = true;
        cancelAnimationFrame(frame);
        setProgress(0);
        const start = performance.now();
        const tick = (now: number) => {
          const next = Math.min((now - start) / 2200, 1);
          setProgress(next);
          if (next < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && inView) {
        inView = false;
        cancelAnimationFrame(frame);
        setProgress(0);
      }
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  const format = (number: number) => number.toLocaleString('ko-KR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref} className="tabular-nums"><span className="sr-only">{prefix}{format(value)}{suffix}</span><span aria-hidden="true">{prefix}{format(value * progress)}{suffix}</span></span>;
}
