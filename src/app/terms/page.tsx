import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export const metadata: Metadata = {
  title: '서비스 이용약관',
  description: '삼촌생각(Uncle Note) 서비스 이용약관입니다. 서비스 이용 조건 및 절차, 권리와 의무, 계산 결과에 대한 면책 조항을 규정합니다.',
  alternates: {
    canonical: 'https://unclenote.com/terms',
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
          삼촌생각(Uncle Note) 웹사이트를 이용해 주셔서 감사합니다. 본 약관은 서비스 이용에 관한 권리와 의무, 책임사항을 규정합니다.
        </p>
        <p className="text-xs text-zinc-400 mt-4">
          시행일자: 2026년 9월 22일
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
            본 약관은 삼촌생각(이하 &apos;사이트&apos;)이 제공하는 온라인 금융·세무 계산기, 생활 가이드 및 제반 정보 콘텐츠(이하 &apos;서비스&apos;)의 이용 조건과 절차에 관한 기본 사항을 정함을 목적으로 합니다.
          </p>
        </section>

        {/* Section 2: Critical Financial/Tax Disclaimer */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-[#c55232]/40 shadow-xs bg-[#fdfbf7]/50">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232] text-white text-xs flex items-center justify-center font-bold">2</span>
            계산 결과 및 정보 제공에 관한 법적 면책 조항 (중요)
          </h2>
          <div className="space-y-3 text-zinc-700">
            <p className="font-semibold text-[#a74126]">
              삼촌생각에서 제공하는 모든 계산기 및 가이드 콘텐츠는 이용자의 편의와 일반적인 이해를 돕기 위한 &apos;모의 참고용 자료&apos;입니다.
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 text-sm">
              <li>
                <strong>세무·법률 자문 대체 불가:</strong> 본 사이트의 연봉 실수령액, 4대 보험료, 근로소득세, 부가가치세 등의 연산 결과는 최신 공표 법령 및 간이세액표를 기준으로 설계되었으나, 개인별 비과세 항목, 부양가족 공제 요건, 회사별 취업규칙, 사업장 특수성에 따라 실제 수령액 및 납부 세액과 차이가 발생할 수 있습니다.
              </li>
              <li>
                <strong>공식 증빙 효력 없음:</strong> 계산 결과는 어떠한 법적 분쟁, 금융 대출 심사, 세무 신고 증빙 자료로도 공식적 법적 효력을 갖지 않습니다.
              </li>
              <li>
                <strong>최종 판단 책임:</strong> 이용자가 본 사이트의 정보를 신뢰하여 행한 금전적 거래, 세무 신고, 계약 등의 결과에 대하여 삼촌생각은 직·간접적인 법적 책임을 지지 않습니다. 중대한 의사결정 시 반드시 공인회계사, 세무사, 공인노무사 등 전문가의 자문을 받으시기 바랍니다.
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
            삼촌생각이 직접 작성한 텍스트, 디자인, 로고, 소프트웨어 코드, UI/UX 구조에 대한 저작권 및 지적재산권은 삼촌생각에 귀속됩니다.
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-600 text-sm">
            <li>이용자는 사이트의 사전 서면 승낙 없이 콘텐츠를 영리 목적으로 복제, 출판, 방송, 배포할 수 없습니다.</li>
            <li>비영리 목적의 단순 인용 및 출처를 명시한 하이퍼링크 공유는 자유롭게 허용됩니다.</li>
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
