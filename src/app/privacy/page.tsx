import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '삼촌노트의 문의 이메일, 접속·이용 정보 및 광고 관련 정보 처리 방식을 안내합니다.',
  alternates: { canonical: 'https://unclenote.com/privacy' },
  openGraph: {
    siteName: '삼촌노트',
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 — 읽을거리와 생활 도구' }],
    title: '개인정보처리방침 | 삼촌노트',
    description: '삼촌노트의 문의 이메일, 접속·이용 정보 및 광고 관련 정보 처리 방식입니다.',
    url: 'https://unclenote.com/privacy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="reading-article">
      <nav aria-label="현재 위치" className="page-breadcrumb">
        <Link href="/">홈</Link><span>/</span><span>개인정보처리방침</span>
      </nav>

      <header className="reading-header">
        <span className="editorial-badge">PRIVACY</span>
        <h1 className="editorial-h1 mt-3 mb-4">개인정보처리방침</h1>
        <p className="reading-lead">삼촌노트에서 어떤 정보가 처리될 수 있는지, 문의는 어디로 보낼 수 있는지 안내합니다.</p>
        <p className="mt-4 text-sm text-zinc-500">시행일: 2026년 9월 23일</p>
      </header>

      <div className="reading-body mt-10">
        <section className="reading-section">
          <h2 className="editorial-h2 mb-4">1. 처리하는 정보와 목적</h2>
          <p>회원가입 없이 계산기와 글을 이용할 수 있습니다. 계산기에 입력한 금액과 조건은 브라우저에서 계산되며, 사이트의 회원 정보로 저장하지 않습니다.</p>
          <p className="mt-4">이메일로 문의하면 발신 이메일 주소와 문의 내용이 전달되며, 문의 확인과 답변에 이용됩니다. 서비스 접속 과정에서는 호스팅 제공자의 보안·운영 로그가 생성될 수 있습니다. Vercel Analytics를 통해 페이지 이용 통계를 확인합니다.</p>
        </section>

        <section className="reading-section">
          <h2 className="editorial-h2 mb-4">2. 보관과 삭제</h2>
          <p>문의 이메일은 답변과 관련 후속 처리에 필요한 동안 보관하고, 목적을 마치거나 삭제 요청을 확인하면 관련 법령상 보관이 필요한 경우를 제외하고 삭제합니다. 호스팅·분석 서비스의 기술적 로그 보관은 각 서비스의 운영 정책에 따릅니다.</p>
        </section>

        <section className="reading-section">
          <h2 className="editorial-h2 mb-4">3. 외부 서비스와 광고</h2>
          <p>사이트는 Vercel을 통해 제공되며 Vercel Analytics를 사용합니다. 쿠팡 파트너스 배너를 표시하는 페이지에서는 쿠팡의 광고 스크립트가 로드될 수 있습니다. 광고 링크를 통해 구매가 발생하면 사이트가 수수료를 받을 수 있으며, 해당 화면에 이를 표시합니다.</p>
          <p className="mt-4">Google AdSense는 향후 도입할 수 있습니다. 도입 시 Google과 제3자 광고 사업자가 이전 방문 기록을 바탕으로 광고를 게재하기 위해 쿠키를 사용할 수 있습니다. 맞춤형 광고는 <a className="text-[#a74126] underline" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google 광고 설정</a>에서 조정할 수 있습니다. 광고 적용 상태에 맞춰 이 방침을 갱신합니다.</p>
        </section>

        <section className="reading-section">
          <h2 className="editorial-h2 mb-4">4. 이용자의 선택과 문의</h2>
          <p>브라우저 설정에서 쿠키를 차단하거나 삭제할 수 있습니다. 문의 이메일의 열람·정정·삭제 요청과 개인정보 관련 문의는 <a className="text-[#a74126] underline" href="mailto:thinkdove@gmail.com">thinkdove@gmail.com</a>으로 보내주세요.</p>
        </section>

        <section className="reading-section">
          <h2 className="editorial-h2 mb-4">5. 방침 변경</h2>
          <p>서비스에 새로운 분석·광고 기능이 도입되거나 정보 처리 방식이 바뀌면 이 페이지의 내용과 시행일을 갱신합니다.</p>
        </section>
      </div>
    </article>
  );
}
