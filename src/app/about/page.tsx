import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export const metadata: Metadata = {
  title: '서비스 소개 (About)',
  description: '삼촌생각의 생활 계산기와 정보성 가이드, 운영 원칙 및 문의 방법을 소개합니다.',
  alternates: {
    canonical: 'https://unclenote.com/about',
  },
  openGraph: {
    title: '삼촌생각 소개 및 문의',
    description: '생활 계산기와 정보성 가이드를 제공하는 삼촌생각의 운영 취지와 문의 방법입니다.',
    url: 'https://unclenote.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto py-8">
      {/* Header */}
      <header className="mb-12 border-b border-zinc-200/80 pb-8">
        <div className="flex items-center gap-2 text-sm font-bold text-[#c55232] mb-3">
          <Icon icon="solar:lightbulb-bold-duotone" width="20" height="20" />
          <span>삼촌생각 이야기</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#292520] tracking-tight mb-4">
          복잡한 세상, 셈이라도 편하게.
        </h1>
        <p className="text-zinc-600 text-lg leading-relaxed font-medium">
          셀프 인테리어 자재, 급여·세금 등 일상에서 필요한 계산과 정보를 이해하기 쉽게 제공합니다.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12 text-[15px] leading-relaxed text-[#292520]/90">
        
        {/* Story Section */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-4 flex items-center gap-2">
            <span className="text-[#c55232]">•</span>
            왜 &apos;삼촌생각&apos;인가요?
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              사회생활을 시작하고 연봉 협상을 할 때, 작은 사업을 시작하며 부가세를 계산할 때, 누구나 한 번쯤 포털 검색창을 헤매며 복잡한 세법 계산식 앞에서 머뭇거리게 됩니다.
            </p>
            <p>
              &apos;연봉 4,000만 원이면 내 통장에 실제로 얼마가 찍히지?&apos;<br />
              &apos;이번 달 매출에서 부가세로 떼어둬야 할 돈은 정확히 얼마일까?&apos;
            </p>
            <p>
              <strong>삼촌생각(Uncle Note)</strong>은 필요한 값을 쉽게 입력하고 참고용 계산 결과와 관련 설명을 함께 확인할 수 있도록 돕기 위해 시작되었습니다.
            </p>
          </div>
        </section>

        {/* 3 Core Values */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#292520] px-1">
            삼촌생각이 지키는 3가지 원칙
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Value 1 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:calculator-minimalistic-bold-duotone" />
              </div>
              <h3 className="font-bold text-[#292520] text-base mb-2">1. 기준과 한계 표시</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                계산에 사용한 기준을 설명하고 변경 사항을 확인해 갱신합니다. 결과는 참고용이며 실제 금액은 급여명세서와 공식 자료로 확인해 주세요.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:shield-keyhole-bold-duotone" />
              </div>
              <h3 className="font-bold text-[#292520] text-base mb-2">2. 간편한 이용</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                회원가입 없이 계산기를 이용할 수 있습니다. 계산기에 입력한 수치는 브라우저에서 연산하며, 문의 이메일과 접속·이용 정보의 처리는 개인정보처리방침에 안내합니다.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:book-bookmark-bold-duotone" />
              </div>
              <h3 className="font-bold text-[#292520] text-base mb-2">3. 에디토리얼 가이드</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                계산 결과와 함께 급여·세무·생활 정보를 알기 쉬운 글로 제공하고, 확인 가능한 자료를 바탕으로 내용을 보완합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Contact & Feedback */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <Icon icon="solar:letter-bold-duotone" className="text-[#c55232]" />
            문의 및 제휴 안내
          </h2>
          <p className="text-zinc-600 mb-4 leading-relaxed">
            계산기 오류 제보, 내용 정정 요청, 기능 제안 및 제휴 문의는 아래 이메일로 보내주세요.
          </p>
          <div className="bg-[#fdfbf7] p-5 rounded-xl border border-zinc-200/60 text-sm space-y-2 text-zinc-700">
            <p className="flex items-center gap-2">
              <span className="font-semibold w-20">공식 이메일:</span>
              <a href="mailto:thinkdove@gmail.com" className="text-[#c55232] font-semibold hover:underline">
                thinkdove@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold w-20">운영 주체:</span>
              <span>삼촌생각 (Uncle Note)</span>
            </p>
          </div>
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
