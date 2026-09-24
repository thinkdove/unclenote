'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './motion-figure.module.css';

export default function MotionFigure({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    setReady(true);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <figure ref={ref} data-motion-ready={ready} data-motion-visible={visible} className={`${className} ${styles.figure}`}>{children}</figure>;
}
