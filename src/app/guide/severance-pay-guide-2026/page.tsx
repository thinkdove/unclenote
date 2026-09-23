import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: '퇴직금, 얼마를 받을 수 있을까? | 2026년 계산법과 IRP 세금',
  description: '법정 퇴직금 계산 공식, 1일 평균임금 산출법, 퇴직소득세의 연금 수령 시 과세 차이와 미지급 시 대처법을 정리했습니다.',
  keywords: ['2026 퇴직금 계산법', '퇴직금 계산기', '1일 평균임금', '퇴직소득세 계산', 'IRP 퇴직금 절세', '삼촌노트'],
  alternates: {
    canonical: 'https://unclenote.com/guide/severance-pay-guide-2026',
  },
  openGraph: {
    siteName: '삼촌노트',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '퇴직금, 얼마를 받을 수 있을까? | 2026년 계산법과 IRP 세금',
    description: '1일 평균임금 계산식과 IRP 연금 수령 시 적용되는 퇴직소득세 차이를 정리했습니다.',
    url: 'https://unclenote.com/guide/severance-pay-guide-2026',
    type: 'article',
  },
};

export default function SeverancePayGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '퇴직금, 얼마를 받을 수 있을까? 2026년 계산법과 IRP 세금',
    description: metadata.description,
    mainEntityOfPage: 'https://unclenote.com/guide/severance-pay-guide-2026',
    datePublished: '2026-09-22',
    dateModified: '2026-09-23',
    author: { '@type': 'Organization', name: '삼촌노트', url: 'https://unclenote.com/about' },
    publisher: { '@type': 'Organization', name: '삼촌노트', url: 'https://unclenote.com' },
  };

  return (
    <article className="reading-article essay-article">
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
        <p className="essay-kicker">일과 돈 · 퇴직금 가이드</p>
        <h1 className="editorial-h1 mb-5">
          퇴직금, 얼마를<br className="hidden sm:block" /> 받을 수 있을까?
        </h1>
        <p className="reading-lead">
          2026년 기준 퇴직금의 지급 요건부터 평균임금 계산법, IRP 계좌로 받을 때 달라지는 세금까지 차례로 살펴봅니다.
        </p>
        <div className="essay-byline">
          <span>삼촌노트</span>
          <span aria-hidden="true">·</span>
          <time dateTime="2026-09-23">2026. 09. 23.</time>
          <span aria-hidden="true">·</span>
          <span>읽는 시간 약 4분</span>
        </div>
      </header>

      <nav className="essay-toc" aria-label="이 글의 목차">
        <span>이 글의 순서</span>
        <a href="#eligibility">받을 수 있는 조건</a>
        <a href="#calculation">계산하는 법</a>
        <a href="#irp">IRP와 세금</a>
        <a href="#questions">자주 묻는 질문</a>
      </nav>

      <section className="reading-summary" aria-labelledby="severance-summary-title">
        <h2 id="severance-summary-title" className="editorial-h3 mb-4">
          먼저, 핵심만 읽는다면
        </h2>
        <ul className="essay-summary-list">
          <li className="flex items-start gap-2">
            <span><strong>받을 수 있는 조건</strong> 4주 평균 주 소정근로시간 15시간 이상, 계속근로기간 1년 이상</span>
          </li>
          <li className="flex items-start gap-2">
            <span><strong>기본 계산식</strong> 1일 평균임금 × 30일 × (재직일수 ÷ 365)</span>
          </li>
          <li className="flex items-start gap-2">
            <span><strong>지급 기한</strong> 특별한 합의가 없다면 퇴사 후 14일 이내</span>
          </li>
          <li className="flex items-start gap-2">
            <span><strong>IRP와 세금</strong> 이전 시 과세가 이연되고, 이후 수령 방식에 따라 세액이 달라짐</span>
          </li>
        </ul>
      </section>

      {/* Main Content Sections */}
      <div className="reading-body">
        
        {/* Section 1 */}
        <section id="eligibility" className="reading-section">
          <div className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#292520]">
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
        <section id="calculation" className="reading-section">
          <div className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#292520]">
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
        <section id="irp" className="reading-section">
          <div className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#292520]">
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
        <section id="questions" className="reading-section">
          <div className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#292520]">
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

      <div className="reading-footer-cta">
        <p className="essay-cta-kicker">읽었다면, 이제 내 금액으로</p>
        <h2>내 퇴직금은 얼마일까?</h2>
        <p className="essay-cta-description">
          입사일과 퇴사일, 최근 3개월 임금을 입력하면 예상 퇴직금과 세후 참고 금액을 바로 확인할 수 있습니다.
        </p>
        <Link
          href="/severance-pay-calculator"
          className="essay-calculator-link"
        >
          <span>내 퇴직금 계산하기</span>
          <Icon icon="solar:arrow-right-linear" width="20" height="20" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
