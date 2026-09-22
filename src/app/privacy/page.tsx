import { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '삼촌생각(Uncle Note)의 개인정보처리방침입니다. 이용자의 소중한 개인정보 보호와 권익을 위해 최선을 다하고 있습니다.',
  alternates: {
    canonical: 'https://unclenote.com/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto py-8">
      {/* Header */}
      <header className="mb-12 border-b border-zinc-200/80 pb-8">
        <div className="flex items-center gap-2 text-sm font-bold text-[#c55232] mb-3">
          <Icon icon="solar:shield-check-bold" width="18" height="18" />
          <span>보안 및 정책</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#292520] tracking-tight mb-4">
          개인정보처리방침
        </h1>
        <p className="text-zinc-600 text-base leading-relaxed">
          삼촌생각(Uncle Note, 이하 &apos;서비스&apos;)은 이용자의 개인정보를 매우 소중하게 생각하며, 관련 법령을 준수하여 이용자의 권익을 보호합니다.
        </p>
        <p className="text-xs text-zinc-400 mt-4">
          시행일자: 2026년 9월 22일 (최종 개정)
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-10 text-[15px] leading-relaxed text-[#292520]/90">
        
        {/* Section 1 */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">1</span>
            수집하는 개인정보 항목 및 수집 방법
          </h2>
          <p className="text-zinc-600 mb-3">
            본 서비스는 별도의 회원가입 절차 없이 모든 금융·세무 계산기와 콘텐츠를 자유롭게 이용하실 수 있습니다. 따라서 회사는 이용자의 주민등록번호, 연락처, 실명 등의 민감한 개인 식별 정보를 일절 수집하거나 저장하지 않습니다.
          </p>
          <div className="bg-[#fdfbf7] p-4 rounded-xl border border-zinc-200/50 text-sm text-zinc-600 space-y-1">
            <p className="font-semibold text-zinc-800">• 자동 수집 항목:</p>
            <p>서비스 이용 과정에서 브라우저 종류, 운영체제, 방문 일시, IP 주소, 쿠키(Cookie), 서비스 이용 기록 등의 로그 정보가 통계 및 서비스 개선 목적으로 자동 생성되어 수집될 수 있습니다.</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">2</span>
            개인정보의 이용 목적
          </h2>
          <p className="text-zinc-600 mb-2">수집된 정보는 오직 다음의 목적을 위해서만 활용됩니다:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-600 pl-1">
            <li>각종 금융 및 세무 계산기의 연산 기능 제공 및 이용 환경 최적화</li>
            <li>서비스 접속 빈도 분석 및 통계 산출을 통한 사용자 경험(UX) 개선</li>
            <li>불법 트래픽, 비정상적 크롤링 및 악의적 공격 방지를 위한 보안 조치</li>
          </ul>
        </section>

        {/* Section 3: Google AdSense & Third-party cookies (Essential for AdSense Approval) */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-[#c55232]/30 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232] text-white text-xs flex items-center justify-center font-bold">3</span>
            쿠키(Cookie) 운용 및 구글(Google) 광고 서비스 고지
          </h2>
          <p className="text-zinc-600 mb-3 leading-relaxed">
            서비스는 사용자 편의 증진과 맞춤형 서비스 제공을 위해 &apos;쿠키(Cookie)&apos;를 사용합니다. 쿠키는 웹사이트가 이용자의 웹 브라우저로 전송하는 아주 작은 텍스트 파일입니다.
          </p>
          
          <div className="space-y-3 bg-[#fdfbf7] p-5 rounded-xl border border-zinc-200/70 text-sm">
            <h3 className="font-bold text-zinc-800 flex items-center gap-1.5">
              <Icon icon="solar:info-circle-bold" className="text-[#c55232]" />
              구글 애드센스(Google AdSense) 관련 필수 안내
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-zinc-600">
              <li>본 사이트는 향후 구글(Google LLC) 등 제3자 광고 사업자가 제공하는 온라인 광고(Google AdSense)를 게재할 수 있습니다.</li>
              <li>구글을 포함한 제3자 공급업체는 사용자가 본 사이트 또는 다른 웹사이트를 이전에 방문한 내역을 기반으로 광고를 게재하기 위해 쿠키를 사용합니다.</li>
              <li>구글의 광고 쿠키 사용으로 인해 구글과 그 파트너사는 인터넷상의 여러 사이트 방문 기록을 바탕으로 귀하에게 관련도 높은 맞춤형 광고를 제공할 수 있습니다.</li>
              <li>
                사용자는{' '}
                <a 
                  href="https://adssettings.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#c55232] font-semibold underline underline-offset-2 hover:opacity-80"
                >
                  Google 광고 설정(Google Ads Settings)
                </a>
                을 방문하여 맞춤형 광고 게재 설정을 해제(Opt-out)하실 수 있습니다.
              </li>
              <li>
                또한{' '}
                <a 
                  href="https://www.aboutads.info" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#c55232] font-semibold underline underline-offset-2 hover:opacity-80"
                >
                  www.aboutads.info
                </a>
                를 방문하여 제3자 공급업체의 맞춤 광고용 쿠키 수집을 일괄 거부하실 수 있습니다.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">4</span>
            쿠키 설치·운영 및 거부 방법
          </h2>
          <p className="text-zinc-600 mb-2">
            이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹 브라우저의 옵션을 조정하여 모든 쿠키를 허용하거나, 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-zinc-500 pl-1">
            <li>Chrome: [설정] &gt; [개인정보 및 보안] &gt; [서드 파티 쿠키] 설정</li>
            <li>Edge: [설정] &gt; [쿠키 및 사이트 권한] &gt; [쿠키 및 사이트 데이터 관리] 설정</li>
            <li>Safari: [환경설정] &gt; [개인정보 보호] &gt; [모든 쿠키 차단] 설정</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-zinc-200/70 shadow-xs">
          <h2 className="text-xl font-bold text-[#292520] mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#c55232]/10 text-[#c55232] text-xs flex items-center justify-center font-bold">5</span>
            개인정보 보호책임자 및 문의처
          </h2>
          <p className="text-zinc-600 mb-4">
            서비스 이용 중 발생하는 개인정보 보호 관련 민원, 건의사항, 제휴 문의는 아래 담당 부서로 연락해 주시면 성실히 답변해 드리겠습니다:
          </p>
          <div className="bg-[#fdfbf7] p-4 rounded-xl border border-zinc-200/60 text-sm space-y-1.5 text-zinc-700">
            <p><span className="font-semibold">서비스명:</span> 삼촌생각 (Uncle Note)</p>
            <p><span className="font-semibold">운영자:</span> 삼촌생각 운영팀</p>
            <p><span className="font-semibold">이메일:</span> thinkdove@gmail.com</p>
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
