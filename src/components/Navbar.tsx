'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

const toolGroups = [
  {
    title: '집과 생활',
    tools: [
      { label: '타일 소요량', href: '/tile-calculator' },
      { label: '도배지 소요량', href: '/wallpaper-calculator' },
      { label: '장판 소요량', href: '/flooring-calculator' },
      { label: '페인트 소요량', href: '/paint-calculator' },
      { label: '커튼·블라인드 치수', href: '/curtain-calculator' },
    ],
  },
  {
    title: '일과 돈',
    tools: [
      { label: '연봉 실수령액', href: '/salary-calculator' },
      { label: '퇴직금', href: '/severance-pay-calculator' },
      { label: '최저임금·주휴수당', href: '/wage-calculator' },
      { label: '부가세', href: '/vat-calculator' },
    ],
  },
] as const;

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const pathname = usePathname();
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsButtonRef = useRef<HTMLButtonElement>(null);
  const isReadingPage = pathname.startsWith('/guide');
  const isToolPage = toolGroups.some((group) => group.tools.some((tool) => tool.href === pathname));

  useEffect(() => {
    if (!isToolsOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!toolsRef.current?.contains(event.target as Node)) setIsToolsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsToolsOpen(false);
        toolsButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isToolsOpen]);

  const closeMenus = () => {
    setIsMobileOpen(false);
    setIsMobileToolsOpen(false);
    setIsToolsOpen(false);
  };

  const topLinkClass = (active: boolean) => `site-nav-link${active ? ' is-active' : ''}`;

  return (
    <div className="site-nav-shell">
      <header className="site-nav-header">
        <Link href="/" onClick={closeMenus} className="site-nav-logo" aria-label="삼촌노트 홈">
          <Image src="/images/logo.png" alt="" width={28} height={28} priority />
          <span>삼촌노트</span>
        </Link>

        <nav className="site-nav-desktop" aria-label="주 메뉴">
          <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className={topLinkClass(pathname === '/')}>
            홈
          </Link>
          <Link href="/guide" aria-current={isReadingPage ? 'page' : undefined} className={topLinkClass(isReadingPage)}>
            읽을거리
          </Link>
          <div ref={toolsRef} className="site-nav-tools">
            <button
              ref={toolsButtonRef}
              type="button"
              className={topLinkClass(isToolPage)}
              aria-expanded={isToolsOpen}
              aria-controls="desktop-tool-menu"
              onClick={() => setIsToolsOpen((open) => !open)}
            >
              계산 도구
              <Icon icon="solar:alt-arrow-down-linear" width="14" height="14" aria-hidden="true" />
            </button>
            {isToolsOpen && (
              <div id="desktop-tool-menu" className="site-nav-tool-panel">
                <div className="site-nav-tool-panel-intro">
                  <strong>필요한 계산을 찾아보세요</strong>
                  <span>생활과 일에 쓰는 도구를 모았습니다.</span>
                </div>
                <div className="site-nav-tool-groups">
                  {toolGroups.map((group) => (
                    <div key={group.title} className="site-nav-tool-group">
                      <p>{group.title}</p>
                      {group.tools.map((tool) => (
                        <Link key={tool.href} href={tool.href} onClick={closeMenus} aria-current={pathname === tool.href ? 'page' : undefined}>
                          {tool.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined} className={topLinkClass(pathname === '/about')}>
            소개
          </Link>
        </nav>

        <button
          type="button"
          className="site-nav-mobile-toggle"
          onClick={() => setIsMobileOpen((open) => !open)}
          aria-label={isMobileOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
        >
          <Icon icon={isMobileOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'} width="22" height="22" aria-hidden="true" />
        </button>
      </header>

      {isMobileOpen && (
        <nav id="mobile-navigation" className="site-nav-mobile" aria-label="모바일 주 메뉴">
          <Link href="/" onClick={closeMenus} aria-current={pathname === '/' ? 'page' : undefined} className={topLinkClass(pathname === '/')}>
            홈
          </Link>
          <Link href="/guide" onClick={closeMenus} aria-current={isReadingPage ? 'page' : undefined} className={topLinkClass(isReadingPage)}>
            읽을거리
          </Link>
          <button
            type="button"
            className={topLinkClass(isToolPage)}
            aria-expanded={isMobileToolsOpen}
            aria-controls="mobile-tool-list"
            onClick={() => setIsMobileToolsOpen((open) => !open)}
          >
            계산 도구
            <Icon icon="solar:alt-arrow-down-linear" width="16" height="16" aria-hidden="true" />
          </button>
          {isMobileToolsOpen && (
            <div id="mobile-tool-list" className="site-nav-mobile-tools">
              {toolGroups.map((group) => (
                <div key={group.title} className="site-nav-tool-group">
                  <p>{group.title}</p>
                  {group.tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} onClick={closeMenus} aria-current={pathname === tool.href ? 'page' : undefined}>
                      {tool.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
          <Link href="/about" onClick={closeMenus} aria-current={pathname === '/about' ? 'page' : undefined} className={topLinkClass(pathname === '/about')}>
            소개
          </Link>
        </nav>
      )}
    </div>
  );
}
