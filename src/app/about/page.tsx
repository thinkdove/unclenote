import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export const metadata: Metadata = {
  title: '서비스 소개 (About)',
  description: '삼촌생각(Uncle Note)의 탄생 배경과 철학, 운영 가치 및 문의 채널을 소개합니다.',
  alternates: {
    canonical: 'https://unclenote.com/about',
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
          가장 자주 쓰지만 매번 헷갈리는 금융과 세무의 계산을 삼촌처럼 친절하고 정확하게 풀어드립니다.
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
              <strong>삼촌생각(Uncle Note)</strong>은 마치 세상 물정 밝은 친근한 삼촌이 종이와 펜을 꺼내 조목조목 짚어주듯, 누구나 1초 만에 가장 직관적이고 정확하게 계산 결과를 확인할 수 있도록 돕기 위해 시작되었습니다.
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
              <h3 className="font-bold text-[#292520] text-base mb-2">1. 정확성과 최신 세법</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                공개된 보험료율과 계산 기준을 확인하고 업데이트합니다. 계산 결과는 참고용이며 실제 원천징수액은 급여명세서와 국세청 자료로 확인해 주세요.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:shield-keyhole-bold-duotone" />
              </div>
              <h3 className="font-bold text-[#292520] text-base mb-2">2. 철저한 프라이버시</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                회원가입도, 개인정보 입력도 요구하지 않습니다. 입력하신 모든 수치는 브라우저 내에서만 안전하게 연산됩니다.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white/80 p-6 rounded-2xl border border-zinc-200/70 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#c55232]/10 text-[#c55232] flex items-center justify-center text-xl mb-4">
                <Icon icon="solar:book-bookmark-bold-duotone" />
              </div>
              <h3 className="font-bold text-[#292520] text-base mb-2">3. 에디토리얼 가이드</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                단순 수치 계산에 그치지 않고, 그 이면에 담긴 절세 팁과 경제 상식을 알기 쉬운 스토리로 함께 전달합니다.
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
            삼촌생각은 사용자 여러분의 피드백을 통해 매일 더 편리하게 발전하고 있습니다. 계산기 오류 제보, 새로운 기능 요청, 제휴 문의는 언제든 열려 있습니다:
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
              <span>삼촌생각 (Uncle Note) 에디토리얼 팀</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold w-20">답변 시간:</span>
              <span className="text-zinc-500">평일 기준 24시간 이내 성실히 답변드립니다.</span>
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
