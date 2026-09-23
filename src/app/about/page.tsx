import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export const metadata: Metadata = {
  title: '소개 및 문의',
  description: '삼촌노트에서 제공하는 정보 글과 생활 도구, 콘텐츠 이용 안내 및 문의 방법을 소개합니다.',
  alternates: {
    canonical: 'https://unclenote.com/about',
  },
  openGraph: {
    siteName: '삼촌노트',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '삼촌노트 소개 및 문의',
    description: '정보 글과 생활 도구를 제공하는 삼촌노트의 소개 및 문의 방법입니다.',
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
          <span>삼촌노트 소개</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#292520] tracking-tight mb-4">
          일상에 필요한 정보와 도구를 한곳에.
        </h1>
        <p className="text-zinc-600 text-lg leading-relaxed font-medium">
          삼촌노트는 생활 속 궁금한 주제를 읽기 쉽게 정리하고, 필요한 값을 직접 살펴볼 수 있는 간단한 웹 도구를 제공합니다.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12 text-[15px] leading-relaxed text-[#292520]/90">
        
        {/* Site introduction */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-4 flex items-center gap-2">
            <span className="text-[#c55232]">•</span>
            어떤 곳인가요?
          </h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>
              정보를 찾다가 낯선 용어나 복잡한 설명 때문에 다시 검색해야 하는 순간이 있습니다. 삼촌노트는 그런 주제를 가능한 한 분명한 말로 풀어 쓰고, 실제로 써볼 수 있는 도구를 함께 모으는 사이트입니다.
            </p>
            <p>
              현재는 셀프 인테리어 자재 소요량과 급여·세금 관련 계산 도구, 관련 읽을거리를 제공하고 있습니다. 앞으로 다루는 글의 주제는 계산기나 금융·세무에 한정하지 않습니다.
            </p>
          </div>
        </section>

        {/* What to expect */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#292520] px-1">
            이렇게 이용해 주세요
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Value 1 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:book-bookmark-bold-duotone" />
              </div>
              <h3 className="font-bold text-[#292520] text-base mb-2">읽을거리</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                생활에 도움이 되는 주제를 정리한 글을 읽어보세요. 수치나 제도가 포함된 글은 작성 시점과 적용 조건을 함께 확인해 주세요.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:calculator-minimalistic-bold-duotone" />
              </div>
              <h3 className="font-bold text-[#292520] text-base mb-2">생활 도구</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                회원가입 없이 필요한 값을 입력해 참고 결과를 확인할 수 있습니다. 계산기 입력값은 브라우저에서 계산되며 회원 정보로 저장하지 않습니다.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:shield-keyhole-bold-duotone" />
              </div>
              <h3 className="font-bold text-[#292520] text-base mb-2">결과 확인</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                계산 결과는 입력 조건에 따른 추정치입니다. 실제 구매량·급여·세액 등 중요한 결정은 현장 조건이나 공식 자료와 대조해 주세요.
              </p>
            </div>
          </div>
        </section>

        {/* Contact & Feedback */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <Icon icon="solar:letter-bold-duotone" className="text-[#c55232]" />
            문의 및 의견
          </h2>
          <p className="text-zinc-600 mb-4 leading-relaxed">
            글의 내용 정정, 계산기 오류 제보, 기능 제안이나 제휴 문의는 아래 이메일로 보내주세요.
          </p>
          <div className="bg-[#fdfbf7] p-5 rounded-xl border border-zinc-200/60 text-sm space-y-2 text-zinc-700">
            <p className="flex items-center gap-2">
              <span className="font-semibold w-20 shrink-0">문의 이메일:</span>
              <a href="mailto:thinkdove@gmail.com" className="text-[#c55232] font-semibold hover:underline">
                thinkdove@gmail.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold w-20 shrink-0">사이트:</span>
              <span>삼촌노트 (Uncle Note)</span>
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
