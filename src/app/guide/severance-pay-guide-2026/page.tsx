import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '2026년 퇴직금 계산법 총정리: 평균임금 산정부터 세금 절세까지',
  description: '법정 퇴직금 계산 공식, 1일 평균임금 산출법, 퇴직소득세의 연금 수령 시 과세 차이와 미지급 시 대처법을 정리했습니다.',
  keywords: ['2026 퇴직금 계산법', '퇴직금 계산기', '1일 평균임금', '퇴직소득세 계산', 'IRP 퇴직금 절세', '삼촌생각'],
  alternates: {
    canonical: 'https://unclenote.com/guide/severance-pay-guide-2026',
  },
  openGraph: {
    title: '2026년 퇴직금 계산법 총정리: 평균임금 산정부터 세금 절세까지 | 삼촌생각',
    description: '1일 평균임금 계산식과 IRP 연금 수령 시 적용되는 퇴직소득세 차이를 정리했습니다.',
    url: 'https://unclenote.com/guide/severance-pay-guide-2026',
    type: 'article',
  },
};

export default function SeverancePayGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '2026년 퇴직금 계산법 총정리: 평균임금 계산식부터 퇴직세 절세 팁까지',
    description: metadata.description,
    mainEntityOfPage: 'https://unclenote.com/guide/severance-pay-guide-2026',
    datePublished: '2026-09-22',
    dateModified: '2026-09-23',
    author: { '@type': 'Organization', name: '삼촌생각', url: 'https://unclenote.com/about' },
    publisher: { '@type': 'Organization', name: '삼촌생각', url: 'https://unclenote.com' },
  };

  return (
    <article className="reading-article">
      <Script id="severance-article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {/* Breadcrumb & Header */}
      <nav aria-label="현재 위치" className="page-breadcrumb">
        <Link href="/" className="hover:text-zinc-600 transition-colors">홈</Link>
        <span>/</span>
        <Link href="/guide" className="hover:text-zinc-600 transition-colors">가이드</Link>
        <span>/</span>
        <span className="text-[#c55232]">노무·세무 가이드</span>
      </nav>

      <header className="reading-header">
        <div className="flex items-center gap-2.5 text-xs font-bold text-[#c55232] uppercase tracking-wider mb-4">
          <span className="px-2.5 py-1 bg-[#c55232]/10 rounded-md">2026 근로기준법 가이드</span>
          <span className="text-zinc-400 font-normal">2026.09.23 업데이트</span>
        </div>
        <h1 className="editorial-h1 mb-5">
          2026년 퇴직금 계산법 총정리: {' '}
          평균임금 계산식부터 퇴직세 절세 팁까지
        </h1>
        <p className="reading-lead">
          퇴사를 앞두고 내 통장에 실제로 들어올 퇴직금이 얼마인지 궁금하신가요? 1일 평균임금 계산 방법, 법정 지급 요건, IRP 계좌에서 연금으로 수령할 때의 세금 차이를 정리했습니다.
        </p>
      </header>

      {/* Quick Summary Callout (AEO Optimized) */}
      <section className="reading-summary" aria-labelledby="severance-summary-title">
        <h2 id="severance-summary-title" className="editorial-h3 mb-4 flex items-center gap-2">
          <Icon icon="solar:star-bold" className="text-[#c55232]" />
          <span>삼촌이 10초 만에 요약해 주는 퇴직금 핵심</span>
        </h2>
        <ul className="space-y-2.5 text-sm text-zinc-700 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-[#c55232] font-bold">1.</span>
            <span><strong>지급 요건:</strong> 주 15시간 이상, 계속근로기간 1년(365일) 이상 근무 시 알바·계약직 상관없이 무조건 발생</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c55232] font-bold">2.</span>
            <span><strong>법정 계산 공식:</strong> <code>1일 평균임금 × 30일 × (재직일수 ÷ 365)</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c55232] font-bold">3.</span>
            <span><strong>지급 기한:</strong> 퇴사일로부터 14일 이내 지급 필수 (미지급 시 연 20% 지연이자 발생)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#c55232] font-bold">4.</span>
            <span><strong>세금:</strong> IRP로 이전하면 과세가 이연되고, 요건에 맞게 연금으로 수령할 때 세액 차이가 발생</span>
          </li>
        </ul>

        <div className="mt-6 pt-5 border-t border-[#e8d6cb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs text-zinc-500 font-medium">복잡한 계산식 없이 바로 금액을 확인하고 싶다면?</span>
          <Link
            href="/severance-pay-calculator"
            className="px-5 py-2.5 bg-[#c55232] text-white text-xs font-bold rounded-full hover:bg-[#a74126] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>퇴직금 계산기로 1초 계산하기</span>
            <Icon icon="solar:arrow-right-linear" />
          </Link>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="reading-body">
        
        {/* Section 1 */}
        <section className="reading-section">
          <div className="mb-4">
            <p className="text-xs font-bold tracking-[.18em] text-[#c55232] uppercase">
              SECTION 01
            </p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#292520]">
              퇴직금 받을 수 있는 자격 조건 2가지
            </h2>
          </div>
          <p className="text-zinc-700 text-base sm:text-lg leading-relaxed mb-5 font-normal">
            근로기준법 및 근로자퇴직급여 보장법에 따라 아래 <strong>두 가지 조건</strong>을 모두 만족하면 사업장의 규모(5인 미만 포함)나 직종과 무관하게 법정 퇴직금을 전액 보장받습니다.
          </p>
          <div className="reading-paired-list">
            <div>
              <h3 className="font-bold text-[#292520] text-base sm:text-lg mb-2.5">① 주 소정근로시간 15시간 이상</h3>
              <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                4주간을 평균하여 1주 동안의 소정근로시간이 15시간 이상이어야 합니다. 주말 아르바이트라도 1주 15시간 이상 일했다면 대상입니다.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#292520] text-base sm:text-lg mb-2.5">② 계속근로기간 1년 이상</h3>
              <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                입사일부터 마지막 근무일까지의 일수가 365일 이상이어야 합니다. 수습기간, 인턴기간, 육아휴직 기간도 모두 근속기간에 포함됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="reading-section">
          <div className="mb-4">
            <p className="text-xs font-bold tracking-[.18em] text-[#c55232] uppercase">
              SECTION 02
            </p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#292520]">
              퇴직금 계산 공식과 1일 평균임금 구하는 법
            </h2>
          </div>
          <p className="text-zinc-700 text-base sm:text-lg leading-relaxed mb-5 font-normal">
            퇴직금 산정의 가장 핵심은 바로 <strong>&apos;1일 평균임금&apos;</strong>입니다. 1일 평균임금은 퇴사 직전 3개월 동안 지급받은 임금 총액을 그 기간의 총 일수로 나누어 산출합니다.
          </p>

          <div className="reading-formula">
            <p className="text-xs font-bold tracking-wider text-[#c55232] uppercase">공식 산출식</p>
            <div className="font-medium text-[#292520] leading-relaxed">
              <strong>1일 평균임금</strong> = (이전 3개월 기본급 + 수당 + 상여금 3/12 + 연차수당 3/12) ÷ 이전 3개월 총 일수
            </div>
            <div className="font-bold text-[#a74126] leading-relaxed">
              <strong>법정 퇴직금</strong> = 1일 평균임금 × 30일 × (총 재직일수 ÷ 365)
            </div>
          </div>

          <div className="reading-note">
            💡 <strong>평균임금이 통상임금보다 적다면?</strong><br />
            무급휴직이나 결근 등으로 최근 3개월 평균임금이 평소 통상임금보다 낮게 산출된 경우, 법적으로 <strong>통상임금을 평균임금으로 간주</strong>하여 퇴직금을 계산해야 근로자의 손실을 막을 수 있습니다.
          </div>
        </section>

        {/* Section 3: Tax Deduction & IRP tips */}
        <section className="reading-section">
          <div className="mb-4">
            <p className="text-xs font-bold tracking-[.18em] text-[#c55232] uppercase">
              SECTION 03
            </p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#292520]">
              퇴직소득세: IRP 이전과 연금 수령의 차이
            </h2>
          </div>
          <p className="text-zinc-700 text-base sm:text-lg leading-relaxed mb-5 font-normal">
            퇴직금은 종합소득세와 별도로 <strong>&apos;분류과세&apos;</strong>되어 상대적으로 세부담이 적지만, 근속연수와 금액에 따라 수십~수백만 원의 퇴직소득세가 발생합니다.
          </p>

          <div className="reading-detail">
            <h3 className="font-bold text-[#292520] text-lg sm:text-xl flex items-center gap-2">
              <Icon icon="solar:wallet-money-bold-duotone" className="text-[#c55232]" width="24" height="24" />
              <span>IRP(개인형 퇴직연금) 계좌 이전 혜택</span>
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              퇴직금을 <strong>IRP 계좌</strong>로 이전하면 퇴직소득세 과세가 이연됩니다. 계좌에 입금되는 것만으로 세금이 감면되는 것은 아니며, 이후 수령 방식에 따라 적용 세액이 달라집니다.
            </p>
            <ul className="list-disc list-inside space-y-2.5 text-sm sm:text-base text-zinc-600 pl-1 leading-relaxed">
              <li><strong>연금 수령:</strong> 요건에 맞게 연금으로 수령하면 이연퇴직소득세의 70%가 적용됩니다. 실제 연금수령연차 10년 초과~20년 이하에는 60%, 20년 초과에는 50%가 적용됩니다.</li>
              <li><strong>자금 운용:</strong> 세금으로 떼일 돈까지 원금으로 남아 복리 이자 및 ETF 운용 수익을 누릴 수 있습니다.</li>
            </ul>
          </div>
        </section>

        {/* Section 4: FAQ */}
        <section className="reading-section">
          <div className="mb-4">
            <p className="text-xs font-bold tracking-[.18em] text-[#c55232] uppercase">
              SECTION 04
            </p>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#292520]">
              자주 묻는 질문 (FAQ)
            </h2>
          </div>
          <div className="reading-faq">
            <div>
              <h3 className="font-bold text-[#292520] text-base sm:text-lg leading-snug">Q. 회사 사정으로 퇴직금이 안 들어오는데 어떻게 해야 하나요?</h3>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                퇴사일로부터 14일 이내에 특별한 당사자 간 지급 연기 합의 없이 미지급된다면 관할 고용노동청에 임금체불 진정을 제기할 수 있습니다. 14일 경과 시점부터는 연 20%의 법정 지연이자가 청구됩니다.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#292520] text-base sm:text-lg leading-snug">Q. 프리랜서나 3.3% 사업소득자도 퇴직금을 받을 수 있나요?</h3>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                계약서 형태가 프리랜서 계약이더라도, 회사의 출퇴근 지시와 업무 감독을 받는 등 &apos;실질적 근로자&apos;로 인정된다면 고용노동부 진정을 통해 법정 퇴직금을 전액 수령할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

      </div>

      <section className="reading-section mt-12 pt-8 border-t border-[#e8e1d8]">
        <h2 className="editorial-h3 mb-3">기준 확인</h2>
        <p className="editorial-desc">퇴직소득세의 연금 수령 기준은 <a className="text-[#a74126] underline" href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7888&mi=2312" target="_blank" rel="noopener noreferrer">국세청 세율 안내</a>에서 확인할 수 있습니다. 개인별 과세액과 지급 요건은 상황에 따라 달라질 수 있습니다.</p>
      </section>

      {/* Footer CTA Banner */}
      <div className="reading-footer-cta">
        <h3 className="text-xl font-bold text-[#292520]">
          내 퇴직금 실수령액, 지금 바로 확인해보세요
        </h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
          근무 기간과 최근 3개월 임금 등을 입력하면 1일 평균임금, 예상 퇴직금과 세금 참고값을 확인할 수 있습니다.
        </p>
        <Link
          href="/severance-pay-calculator"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#c55232] text-white font-bold text-sm rounded-full hover:bg-[#a74126] transition-colors shadow-xs"
        >
          <Icon icon="solar:calculator-minimalistic-bold" width="18" height="18" />
          <span>퇴직금 계산기 열기</span>
        </Link>
      </div>
    </article>
  );
}
