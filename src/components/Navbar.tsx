'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navLinkClass = (href: string) => {
    const isActive = href === '/guide' ? pathname.startsWith('/guide') : pathname === href;
    return `rounded-lg px-1.5 py-1 transition-colors duration-200 ${isActive ? 'bg-[#c55232]/[0.07] text-[#a74126]' : 'text-zinc-600 hover:text-[#c55232]'}`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-5 pointer-events-none flex flex-col items-center">
      <header className="pointer-events-auto bg-[#fbf8f3]/95 supports-[backdrop-filter]:bg-[#fbf8f3]/85 backdrop-blur-xl border border-[#e8e1d8] shadow-[0_8px_30px_rgba(54,39,28,0.06)] rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 flex items-center justify-between w-full max-w-6xl transition-all duration-300">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="relative w-7 h-7 rounded-lg overflow-hidden shadow-xs group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.png"
              alt="삼촌생각 로고"
              width={28}
              height={28}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-[#292520] group-hover:text-[#c55232] transition-colors duration-300">
            삼촌생각
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-2 2xl:gap-3 text-[13px] 2xl:text-[14px] font-semibold">
          <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} className={navLinkClass('/')}>
            홈
          </Link>
          
          <div className="h-3.5 w-px bg-zinc-300 mx-0.5" />

          {/* Interior Tools */}
          <Link href="/tile-calculator" aria-current={pathname === '/tile-calculator' ? 'page' : undefined} className={navLinkClass('/tile-calculator')}>
            <span>타일</span>
          </Link>
          <Link href="/wallpaper-calculator" aria-current={pathname === '/wallpaper-calculator' ? 'page' : undefined} className={navLinkClass('/wallpaper-calculator')}>
            <span>도배지</span>
          </Link>
          <Link href="/flooring-calculator" aria-current={pathname === '/flooring-calculator' ? 'page' : undefined} className={navLinkClass('/flooring-calculator')}>
            <span>장판</span>
          </Link>
          <Link href="/paint-calculator" aria-current={pathname === '/paint-calculator' ? 'page' : undefined} className={navLinkClass('/paint-calculator')}>
            <span>페인트</span>
          </Link>
          <Link href="/curtain-calculator" aria-current={pathname === '/curtain-calculator' ? 'page' : undefined} className={navLinkClass('/curtain-calculator')}>
            <span>커튼</span>
          </Link>

          <div className="h-3.5 w-px bg-zinc-300 mx-0.5" />

          {/* Finance Tools */}
          <Link href="/salary-calculator" aria-current={pathname === '/salary-calculator' ? 'page' : undefined} className={navLinkClass('/salary-calculator')}>
            연봉
          </Link>
          <Link href="/severance-pay-calculator" aria-current={pathname === '/severance-pay-calculator' ? 'page' : undefined} className={navLinkClass('/severance-pay-calculator')}>
            퇴직금
          </Link>
          <Link href="/wage-calculator" aria-current={pathname === '/wage-calculator' ? 'page' : undefined} className={navLinkClass('/wage-calculator')}>
            최저임금
          </Link>
          <Link href="/guide" aria-current={pathname.startsWith('/guide') ? 'page' : undefined} className={navLinkClass('/guide')}>
            가이드
          </Link>
          <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined} className={navLinkClass('/about')}>
            소개
          </Link>
        </nav>

        {/* Medium Screen Quick Access (when lg is not hit) */}
        <div className="hidden md:flex xl:hidden items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold">
          <Link href="/tile-calculator" className={`px-2 sm:px-2.5 py-1 rounded-full transition-colors ${pathname === '/tile-calculator' ? 'bg-[#c55232]/10 text-[#c55232]' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
            타일
          </Link>
          <Link href="/wallpaper-calculator" className={`px-2 sm:px-2.5 py-1 rounded-full transition-colors ${pathname === '/wallpaper-calculator' ? 'bg-[#c55232]/10 text-[#c55232]' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
            도배
          </Link>
          <Link href="/flooring-calculator" className={`px-2 sm:px-2.5 py-1 rounded-full transition-colors ${pathname === '/flooring-calculator' ? 'bg-[#c55232]/10 text-[#c55232]' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
            장판
          </Link>
          <Link href="/paint-calculator" className={`px-2 sm:px-2.5 py-1 rounded-full transition-colors ${pathname === '/paint-calculator' ? 'bg-[#c55232]/10 text-[#c55232]' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
            페인트
          </Link>
          <Link href="/curtain-calculator" className={`px-2 sm:px-2.5 py-1 rounded-full transition-colors ${pathname === '/curtain-calculator' ? 'bg-[#c55232]/10 text-[#c55232]' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
            커튼
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="xl:hidden min-h-10 min-w-10 p-1.5 text-zinc-700 hover:text-[#c55232] rounded-full hover:bg-zinc-100 transition-colors flex items-center justify-center"
        >
          <Icon icon={isOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'} width="22" height="22" />
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div id="mobile-navigation" className="pointer-events-auto xl:hidden w-full max-w-sm mt-2 p-5 bg-[#fbf8f3]/95 backdrop-blur-2xl border border-[#e8e1d8] shadow-[0_16px_40px_rgba(54,39,28,0.1)] rounded-3xl animate-in fade-in slide-in-from-top-3 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1 text-[15px] font-bold text-[#292520]">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Icon icon="solar:home-2-bold-duotone" className="text-[#c55232]" width="20" height="20" />
              <span>홈으로</span>
            </Link>
            
            {/* Interior Category in Drawer */}
            <div className="pt-2 pb-1 px-4 text-xs font-bold text-[#c55232] uppercase tracking-wider">
              생활 & 셀프 인테리어 도구
            </div>
            <Link
              href="/tile-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon icon="solar:ruler-pen-bold-duotone" className="text-[#c55232]" width="18" height="18" />
                <span>타일 소요량 계산기</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#c55232] text-white rounded font-bold">300/600각</span>
            </Link>

            <Link
              href="/wallpaper-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon icon="solar:brush-bold-duotone" className="text-[#c55232]" width="18" height="18" />
                <span>도배지 소요량 계산기</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#c55232]/10 text-[#c55232] rounded font-bold">실크/합지</span>
            </Link>

            <Link
              href="/flooring-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon icon="solar:floor-lamp-bold-duotone" className="text-[#c55232]" width="18" height="18" />
                <span>장판(모노륨) 계산기</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#c55232]/10 text-[#c55232] rounded font-bold">1.8m 폭</span>
            </Link>

            <Link
              href="/paint-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon icon="solar:paint-roller-bold-duotone" className="text-[#c55232]" width="18" height="18" />
                <span>페인트 소요량 계산기</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#c55232]/10 text-[#c55232] rounded font-bold">리터(L)·젯소</span>
            </Link>

            <Link
              href="/curtain-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon icon="solar:hanger-2-bold-duotone" className="text-[#c55232]" width="18" height="18" />
                <span>커튼·블라인드 치수 계산기</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#c55232]/10 text-[#c55232] rounded font-bold">폭수·헤베</span>
            </Link>

            {/* Finance Category in Drawer */}
            <div className="pt-3 pb-1 px-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">
              월급 & 세무 도구
            </div>
            <Link
              href="/salary-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Icon icon="solar:wallet-money-bold-duotone" className="text-[#c55232]" width="18" height="18" />
              <span>연봉 실수령액 계산기</span>
            </Link>
            <Link
              href="/severance-pay-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Icon icon="solar:calculator-minimalistic-bold-duotone" className="text-[#c55232]" width="18" height="18" />
              <span>퇴직금 실수령액 계산기</span>
            </Link>
            <Link
              href="/wage-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Icon icon="solar:clock-circle-bold-duotone" className="text-[#c55232]" width="18" height="18" />
              <span>최저임금 & 주휴수당 계산기</span>
            </Link>
            <Link
              href="/vat-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Icon icon="solar:bill-check-bold-duotone" className="text-[#c55232]" width="18" height="18" />
              <span>부가세(VAT) 계산기</span>
            </Link>

            <div className="border-t border-zinc-200/60 my-2 pt-2">
              <Link
                href="/guide"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/80 transition-colors"
              >
                <Icon icon="solar:book-bookmark-bold-duotone" className="text-[#c55232]" width="20" height="20" />
                <span>알짜 생활 가이드</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/80 transition-colors"
              >
                <Icon icon="solar:info-circle-bold-duotone" className="text-[#c55232]" width="20" height="20" />
                <span>서비스 소개 & 문의</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
