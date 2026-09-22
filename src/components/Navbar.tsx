'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-5 pointer-events-none flex flex-col items-center">
      <header className="pointer-events-auto bg-[#fdfbf7]/85 backdrop-blur-xl border border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl transition-all duration-300">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 group shrink-0"
        >
          <span className="text-xl group-hover:scale-110 transition-transform duration-300 origin-bottom">
            <Icon icon="solar:lightbulb-bold-duotone" style={{ color: '#c55232' }} />
          </span>
          <span className="font-extrabold text-lg tracking-tight text-[#292520] group-hover:text-[#c55232] transition-colors duration-300">
            삼촌생각
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[14px] font-semibold text-zinc-600">
          <Link href="/" className="hover:text-[#c55232] transition-colors duration-200">
            홈
          </Link>
          <Link href="/tile-calculator" className="text-[#c55232] font-bold hover:text-[#a74126] transition-colors duration-200 flex items-center gap-1">
            <Icon icon="solar:ruler-pen-bold-duotone" width="16" height="16" />
            <span>타일계산기</span>
          </Link>
          <Link href="/salary-calculator" className="hover:text-[#c55232] transition-colors duration-200">
            연봉계산기
          </Link>
          <Link href="/severance-pay-calculator" className="hover:text-[#c55232] transition-colors duration-200">
            퇴직금
          </Link>
          <Link href="/wage-calculator" className="hover:text-[#c55232] transition-colors duration-200">
            최저임금·주휴
          </Link>
          <Link href="/vat-calculator" className="hover:text-[#c55232] transition-colors duration-200">
            부가세
          </Link>
          <Link href="/guide" className="hover:text-[#c55232] transition-colors duration-200">
            가이드
          </Link>
          <Link href="/about" className="hover:text-[#c55232] transition-colors duration-200">
            소개
          </Link>
        </nav>

        {/* Medium Screen Quick Access (when lg is not hit) */}
        <div className="hidden md:flex lg:hidden items-center gap-3 text-xs font-bold">
          <Link href="/tile-calculator" className="px-3 py-1.5 bg-[#c55232]/10 text-[#c55232] rounded-full hover:bg-[#c55232]/20 transition-colors">
            타일계산기
          </Link>
          <Link href="/salary-calculator" className="px-3 py-1.5 bg-zinc-100 text-zinc-700 rounded-full hover:bg-zinc-200 transition-colors">
            연봉계산기
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="메뉴 열기"
          className="lg:hidden p-1.5 text-zinc-700 hover:text-[#c55232] rounded-full hover:bg-zinc-100 transition-colors flex items-center justify-center"
        >
          <Icon icon={isOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'} width="22" height="22" />
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="pointer-events-auto lg:hidden w-full max-w-sm mt-2 p-5 bg-[#fdfbf7]/95 backdrop-blur-2xl border border-zinc-200/80 shadow-[0_16px_40px_rgba(0,0,0,0.08)] rounded-3xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="space-y-1 text-[15px] font-bold text-[#292520]">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Icon icon="solar:home-2-bold-duotone" className="text-[#c55232]" width="20" height="20" />
              <span>홈으로</span>
            </Link>
            
            <Link
              href="/tile-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#c55232]/10 text-[#c55232] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon icon="solar:ruler-pen-bold-duotone" width="20" height="20" />
                <span>화장실·바닥 타일 계산기</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#c55232] text-white rounded font-bold">HOT</span>
            </Link>

            <Link
              href="/salary-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Icon icon="solar:wallet-money-bold-duotone" className="text-[#c55232]" width="20" height="20" />
              <span>연봉 실수령액 계산기</span>
            </Link>
            <Link
              href="/severance-pay-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Icon icon="solar:calculator-minimalistic-bold-duotone" className="text-[#c55232]" width="20" height="20" />
              <span>퇴직금 실수령액 계산기</span>
            </Link>
            <Link
              href="/wage-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Icon icon="solar:clock-circle-bold-duotone" className="text-[#c55232]" width="20" height="20" />
              <span>최저임금 & 주휴수당 계산기</span>
            </Link>
            <Link
              href="/vat-calculator"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/80 transition-colors"
            >
              <Icon icon="solar:bill-check-bold-duotone" className="text-[#c55232]" width="20" height="20" />
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
