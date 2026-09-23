import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export const metadata: Metadata = {
  title: '서비스 이용약관',
  description: '삼촌노트(Uncle Note) 서비스 이용약관입니다. 서비스 이용 조건 및 절차, 권리와 의무, 계산 결과에 대한 면책 조항을 규정합니다.',
  alternates: {
    canonical: 'https://unclenote.com/terms',
  },
  openGraph: {
    siteName: '삼촌노트',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '서비스 이용약관 | 삼촌노트',
    description: '삼촌노트의 계산기와 정보성 글 이용 시 알아둘 사항입니다.',
    url: 'https://unclenote.com/terms',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto py-8">
      {/* Header */}
      <header className="mb-12 border-b border-zinc-200/80 pb-8">
        <div className="flex items-center gap-2 text-sm font-bold text-[#c55232] mb-3">
          <Icon icon="solar:document-text-bold" width="18" height="18" />
          <span>이용 규정</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#292520] tracking-tight mb-4">
          서비스 이용약관
        </h1>
        <p className="text-zinc-600 text-base leading-relaxed">
          삼촌노트(Uncle Note) 웹사이트를 이용해 주셔서 감사합니다. 본 약관은 서비스 이용에 관한 권리와 의무, 책임사항을 규정합니다.
        </p>
        <p className="text-xs text-zinc-400 mt-4">
          시행일자: 2026년 9월 23일
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-10 text-[15px] leading-relaxed text-[#292520]/90">
        
        {/* Section 1 */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">1</span>
            목적 및 정의
          </h2>
          <p className="text-zinc-600">
            본 약관은 삼촌노트(이하 &apos;사이트&apos;)이 제공하는 생활·셀프 인테리어 계산기, 급여·세무 계산기 및 정보성 글(이하 &apos;서비스&apos;)의 이용에 관한 기본 사항을 정합니다.
          </p>
        </section>

        {/* Section 2: Critical Financial/Tax Disclaimer */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-[#c55232]/40 shadow-xs bg-[#fdfbf7]/50">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232] text-white text-xs flex items-center justify-center font-bold">2</span>
            계산 결과와 정보의 이용 범위
          </h2>
          <div className="space-y-3 text-zinc-700">
            <p className="font-semibold text-[#a74126]">
              삼촌노트에서 제공하는 모든 계산기 및 가이드 콘텐츠는 이용자의 편의와 일반적인 이해를 돕기 위한 &apos;모의 참고용 자료&apos;입니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 text-sm">
              <li>
                <strong>세무·법률 자문 대체 불가:</strong> 본 사이트의 연봉 실수령액, 보험료, 세액 등은 입력 조건에 따른 참고용 추정치입니다. 근로소득세는 국세청 월별 간이세액표를 직접 조회하지 않으며, 개인별 조건과 회사의 원천징수 방식에 따라 실제 수령액과 납부 세액이 달라질 수 있습니다.
              </li>
              <li>
                <strong>공식 자료 확인:</strong> 계산 결과는 공식 증빙이나 신고 자료로 제공되지 않습니다. 신고·계약·금융 심사 등에 활용하기 전 해당 기관의 기준과 원자료를 확인해 주세요.
              </li>
              <li>
                <strong>중요한 결정:</strong> 세무 신고나 근로계약 등 중요한 결정에는 국세청·고용노동부 등 공식 자료를 확인하고 필요하면 전문가에게 상담해 주세요. 사이트는 발견한 오류를 제보받아 검토합니다.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">3</span>
            지적재산권 및 저작권
          </h2>
          <p className="text-zinc-600 mb-2">
            사이트가 직접 작성한 글, 디자인, 로고 및 코드의 권리는 해당 권리자에게 귀속됩니다. 외부 자료·이미지·라이브러리의 권리는 각각의 원권리자에게 있습니다.
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-600 text-sm">
            <li>이용자는 사이트의 사전 서면 승낙 없이 콘텐츠를 영리 목적으로 복제, 출판, 방송, 배포할 수 없습니다.</li>
            <li>관련 법령상 허용되는 인용과 출처를 표시한 링크 공유는 가능합니다.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">4</span>
            서비스의 중단 및 변경
          </h2>
          <p className="text-zinc-600">
            운영자는 시스템 점검, 교체, 네트워크 장애 등 부득이한 사유가 발생한 경우 서비스의 제공을 일시적으로 중단할 수 있으며, 서비스의 품질 개선이나 세법 개정에 따라 계산 알고리즘을 수시로 업데이트할 수 있습니다.
          </p>
        </section>

        {/* Section 5 */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">5</span>
            약관의 개정 및 분쟁 해결
          </h2>
          <p className="text-zinc-600">
            본 약관은 관계 법령을 위배하지 않는 범위 내에서 개정될 수 있으며, 개정된 약관은 웹사이트 공지를 통해 효력이 발생합니다. 서비스 이용과 관련하여 분쟁이 발생할 경우 대한민국 법률을 준거법으로 합니다.
          </p>
        </section>

      </div>

      {/* Back to Home Button */}
      <div className="mt-12 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#292520] text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors shadow-xs"
        >
          <Icon icon="solar:arrow-left-linear" width="18" height="18" />
          <span>홈으로 돌아가기</span>
        </Link>
      </div>
    </article>
  );
}
