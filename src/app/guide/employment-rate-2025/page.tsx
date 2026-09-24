import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MotionFigure from '../one-person-household-2025/motion-figure';
import CountUpNumber from '@/components/data-motion/count-up-number';

const pageUrl = 'https://unclenote.com/guide/employment-rate-2025';
const reportUrl = 'https://mods.go.kr/board.es?act=view&bid=204&list_no=444103&mid=a10301020300';
const kosisUrl = 'https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1DA7001S';

export const metadata: Metadata = {
  title: '실업률 2.8%의 착시: 취준생이 많아질수록 실업률이 떨어진다? | 삼촌노트',
  description: '2025년 연간 고용동향 공식 통계로 고용률·취업률 산정 방식의 맹점, 16%대 청년 체감실업률(고용보조지표3), 연도별 추이와 연령·지역별 격차를 낱낱이 파헤칩니다.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'article',
    siteName: '삼촌노트',
    url: pageUrl,
    title: '실업률 2.8%의 착시와 16% 체감실업률의 비밀',
    description: '구직을 포기하면 실업자가 아니다? 고용 통계 산정 기준과 2025년 연령·지역별 현실',
    images: [{ url: '/images/employment-rate-cover-youth-2025.jpg', width: 1536, height: 864, alt: '책상에서 이력서를 작성하는 청년 구직자' }],
  },
};

// 1. 연도별 추이 (2020~2025)
const yearlyTrends = [
  { year: 2020, empRate: 60.1, oecdEmpRate: 65.9, unempRate: 3.9, youthUnemp: 9.0, youthExpanded: 25.1, employed: 26904, change: -218 },
  { year: 2021, empRate: 60.5, oecdEmpRate: 66.5, unempRate: 3.7, youthUnemp: 7.8, youthExpanded: 23.0, employed: 27273, change: 369 },
  { year: 2022, empRate: 62.1, oecdEmpRate: 68.5, unempRate: 2.9, youthUnemp: 6.4, youthExpanded: 19.0, employed: 28089, change: 816 },
  { year: 2023, empRate: 62.6, oecdEmpRate: 69.2, unempRate: 2.7, youthUnemp: 5.9, youthExpanded: 16.5, employed: 28417, change: 327 },
  { year: 2024, empRate: 62.7, oecdEmpRate: 69.5, unempRate: 2.8, youthUnemp: 5.9, youthExpanded: 16.0, employed: 28576, change: 159 },
  { year: 2025, empRate: 62.8, oecdEmpRate: 69.8, unempRate: 2.8, youthUnemp: 6.1, youthExpanded: 15.6, employed: 28769, change: 193 },
];

// 2. 연령별 분석 (2025년)
const ageGroups = [
  { label: '청년층 (15~29세)', unempRate: 6.1, expandedRate: 15.6, change: -170, note: '공채 축소·경력직 선호로 신규 진입 장벽 심화' },
  { label: '30대 (30~39세)', unempRate: 2.6, expandedRate: 8.4, change: 102, note: '여성 경력단절 완화 및 전문·기술직 고용 증가' },
  { label: '40대 (40~49세)', unempRate: 2.1, expandedRate: 6.5, change: -50, note: '제조업·건설업 침체로 경제 허리 계층 감소세' },
  { label: '50대 (50~59세)', unempRate: 2.2, expandedRate: 6.8, change: -26, note: '조기 퇴직 및 도소매·자영업 불황 영향' },
  { label: '60세 이상', unempRate: 3.0, expandedRate: 8.9, change: 345, note: '보건·복지·돌봄 등 공공·사회서비스 일자리 폭증' },
];

// 3. 17개 시도별 고용률 및 실업률 (2025년)
const regionalStats = [
  { name: '서울', empRate: 60.5, unempRate: 3.4, note: '전국 청년 구직자 집중, 실업률 전국 1위' },
  { name: '부산', empRate: 58.1, unempRate: 3.1, note: '고령화 급진전, 청년 유출로 고용률 최하위' },
  { name: '대구', empRate: 58.9, unempRate: 3.0, note: '전통 제조업 둔화 및 양질의 일자리 부족' },
  { name: '인천', empRate: 63.3, unempRate: 3.2, note: '물류·공항 산업 성장 vs 구도심 청년 실업' },
  { name: '광주', empRate: 60.2, unempRate: 2.7, note: '서비스업 비중 높고 청년 고용 다소 정체' },
  { name: '대전', empRate: 62.4, unempRate: 2.6, note: '연구개발·교육 특화로 안정적 고용 유지' },
  { name: '울산', empRate: 60.0, unempRate: 3.1, note: '중화학·자동차 대기업 중심, 청년 일자리 정체' },
  { name: '세종', empRate: 64.9, unempRate: 2.1, note: '공공기관 및 3040 젊은 공무원 인구 중심' },
  { name: '경기', empRate: 63.1, unempRate: 2.8, note: 'IT·반도체 판교 라인 등 최대 취업자 집중' },
  { name: '강원', empRate: 63.8, unempRate: 2.3, note: '관광·서비스업 및 농림어업 기반 안정세' },
  { name: '충북', empRate: 65.1, unempRate: 2.2, note: '바이오·이차전지 산단 배후 고용 견조' },
  { name: '충남', empRate: 65.4, unempRate: 2.2, note: '디스플레이·자동차 제조업 산단 활성화' },
  { name: '전북', empRate: 63.5, unempRate: 2.3, note: '농생명·식품 산업 및 고령층 농가 취업 비중' },
  { name: '전남', empRate: 66.2, unempRate: 1.8, note: '농어업 및 조선·철강 산단, 고령 취업자 다수' },
  { name: '경북', empRate: 64.3, unempRate: 2.3, note: '전자·철강 제조 산단 및 농업 종사자 구성' },
  { name: '경남', empRate: 62.9, unempRate: 2.7, note: '조선·방산 수주 회복세로 완만한 반등' },
  { name: '제주', empRate: 68.7, unempRate: 1.9, note: '관광 서비스업 및 1차 산업 자영업 비중 최고' },
];

function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="mb-6 rounded-[1.65rem] bg-[#292520] px-6 py-7 text-white sm:px-8">
      <span className="text-xs font-bold tracking-[0.2em] text-[#f0a791]">DATA NOTE {number}</span>
      <h2 className="mt-3 break-keep text-balance text-[1.45rem] font-extrabold leading-snug sm:text-[1.85rem]">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#e5dcd3] sm:text-base">{subtitle}</p>
    </div>
  );
}

function SourceLink({ href, title }: { href: string; title: string }) {
  return (
    <a className="font-semibold text-[#a74126] underline underline-offset-4 hover:text-[#88321a]" href={href} target="_blank" rel="noopener noreferrer">
      {title} ↗
    </a>
  );
}

function Bar({ value, max, accent = false, color }: { value: number; max: number; accent?: boolean; color?: string }) {
  const barColor = color ? color : accent ? 'bg-[#a74126]' : 'bg-[#605b68]';
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-[#f0ece7]">
      <div className={`motion-bar h-full rounded-full ${barColor}`} style={{ width: `${Math.min(100, Math.max(0, (value / max) * 100))}%` }} />
    </div>
  );
}

export default function EmploymentRatePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '실업률 2.8%의 착시: 취준생이 많아질수록 실업률이 떨어진다?',
    description: '2025년 고용 통계로 고용률·취업률 산정 방식과 16%대 청년 체감실업률(고용보조지표3)의 실체를 밝힙니다.',
    datePublished: '2026-09-25',
    dateModified: '2026-09-25',
    author: { '@type': 'Organization', name: '삼촌노트' },
    publisher: { '@type': 'Organization', name: '삼촌노트' },
    mainEntityOfPage: pageUrl,
    isBasedOn: [reportUrl, kosisUrl],
  };

  return (
    <article className="mx-auto max-w-[860px] pb-20 text-[#292520]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      
      {/* Breadcrumb */}
      <nav aria-label="위치" className="mb-7 text-sm text-zinc-500">
        <Link href="/guide" className="hover:text-[#c55232]">읽을거리</Link>
        <span className="px-2">/</span>생활 통계
      </nav>

      {/* Hero Header */}
      <header>
        <div className="relative overflow-hidden rounded-[1.7rem] bg-[#292520] px-6 py-8 text-white sm:px-10 sm:py-11">
          <div className="pointer-events-none absolute bottom-[5.5rem] right-3 top-[6.8rem] hidden w-[45%] overflow-hidden rounded-2xl [mask-image:linear-gradient(to_right,transparent,black_16%)] md:block" aria-hidden="true">
            <Image src="/images/employment-rate-cover-youth-2025.jpg" alt="이력서를 작성하는 20대 청년" fill priority sizes="380px" className="object-cover object-center" />
          </div>
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-5 text-xs font-bold">
            <span className="rounded-full border border-[#e7ae9a]/45 px-3 py-1.5 text-[#f2b9a5]">삼촌노트 생활 통계</span>
            <span className="text-[#d3c6bb]">2025년 연간 확정치 · 2026.09.25</span>
          </div>
          <div className="relative z-10 py-10 sm:py-14 md:max-w-[62%]">
            <p className="mb-4 text-xs font-bold tracking-[0.23em] text-[#f0a791]">DATA STORY / 04</p>
            <h1 className="break-keep text-balance text-[2rem] font-extrabold leading-[1.25] tracking-tight sm:text-[3.1rem]">
              실업률 2.8%의 착시:<br />
              <span className="text-[#f0a791]">취준생이 많아지면</span><br />
              실업률이 떨어진다?
            </h1>
            <p className="mt-5 break-keep text-base font-medium leading-relaxed text-[#e9ddd2] sm:text-lg">
              고용률·취업률 산정 방식과 16%대 청년 체감실업률의 비밀
            </p>
          </div>
          <div className="relative z-10 grid gap-3 border-t border-white/20 pt-5 text-sm sm:grid-cols-[1fr_auto]">
            <p className="text-[#d3c6bb] break-keep">
              일하는 사람 2,876만 명, 고용률 69.8% 역대 최고. 그런데 왜 현장의 청년들은 취업 한파를 느낄까요?
            </p>
            <span className="font-bold text-[#f0a791] tabular-nums">자료: 국가데이터처 · KOSIS</span>
          </div>
        </div>

        <p className="editorial-body mt-7 break-keep text-[#5c544d]">
          뉴스에서는 매번 “고용률 역대 최고, 실업률 2.8%로 안정적”이라고 발표합니다. 하지만 취업 커뮤니티나 대학가에서는 “사상 최악의 취업 빙하기”라며 아우성입니다. 정부 발표가 거짓말일까요? 아닙니다. 통계 숫자 자체는 사실이지만, <strong>통계 산출 공식의 분모와 ‘실업자’를 정의하는 기준</strong> 속에 거대한 착시가 숨어 있기 때문입니다. 2025년 공식 통계로 그 진실을 짚어봅니다.
        </p>
      </header>

      {/* 3-Column Summary Cards */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5">
          <span className="text-sm font-semibold text-[#6b625b]">공식 전체 실업률</span>
          <div className="mt-2 text-3xl font-extrabold tabular-nums text-[#605b68]">
            <CountUpNumber value={2.8} decimals={1} /><span className="ml-1 text-base">선</span>
          </div>
          <p className="mt-1 text-xs text-[#736a62]">전년과 동일 · 완전고용 수준 착시</p>
        </div>
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5">
          <span className="text-sm font-semibold text-[#6b625b]">청년층(15~29세) 공식 실업률</span>
          <div className="mt-2 text-3xl font-extrabold tabular-nums text-[#a74126]">
            <CountUpNumber value={6.1} decimals={1} /><span className="ml-1 text-base">선</span>
          </div>
          <p className="mt-1 text-xs text-[#736a62]">전체 평균의 2.2배 수준</p>
        </div>
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5">
          <span className="text-sm font-semibold text-[#6b625b]">청년 체감실업률 (확장실업률)</span>
          <div className="mt-2 text-3xl font-extrabold tabular-nums text-[#c55232]">
            <CountUpNumber value={15.6} decimals={1} /><span className="ml-1 text-base">선</span>
          </div>
          <p className="mt-1 text-xs text-[#736a62]">고용보조지표3 · 청년 6명 중 1명</p>
        </div>
      </div>

      {/* SECTION 1: 산정 방식 */}
      <section className="mt-16">
        <SectionTitle
          number="01"
          title="고용률 vs 취업률 vs 실업률: 분모의 결정적 차이"
          subtitle="“취업률 = 100% - 실업률”이 아닌 이유를 통계 공식으로 증명합니다."
        />
        <div className="editorial-body space-y-4 break-keep">
          <p>
            많은 사람이 취업률과 실업률을 동전의 양면처럼 생각합니다. 실업률이 2.8%면 취업률은 97.2%여야 할 것 같습니다. 하지만 통계청에는 대중이 흔히 쓰는 ‘취업률’이라는 단일 지표가 없습니다. 대신 <strong>‘고용률’</strong>과 <strong>‘실업률’</strong>을 쓰고, 이 둘은 <strong>분모가 완전히 다릅니다.</strong>
          </p>
        </div>

        {/* 3-Tier Population Diagram Card */}
        <div className="my-8 rounded-[1.7rem] border border-[#e9ded4] bg-white p-6 sm:p-8">
          <h3 className="editorial-h3 mb-4 text-[#292520]">대한민국 15세 이상 인구의 3단계 분류 구조</h3>
          <div className="space-y-4 text-sm">
            <div className="rounded-xl bg-[#f8f5f0] p-4 border border-[#eee7de]">
              <div className="font-bold text-[#292520] mb-1">1단계: 15세 이상 인구 (약 4,550만 명)</div>
              <p className="text-xs text-zinc-600">대한민국에 거주하는 만 15세 이상의 모든 국민 (고용률의 기준 분모)</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#d6e3d8] bg-[#f4f8f5] p-4">
                <div className="font-bold text-[#2e5e3a] mb-1">A. 경제활동인구 (약 2,960만 명)</div>
                <p className="text-xs text-zinc-600 mb-2">일할 능력과 일할 의사를 모두 가진 사람 (실업률의 기준 분모)</p>
                <div className="pl-3 border-l-2 border-[#2e5e3a]/40 space-y-1 text-xs">
                  <div>• <strong>취업자</strong> (2,876.9만 명): 1주 1시간 이상 유급 근로자</div>
                  <div>• <strong>실업자</strong> (83.0만 명): 4주간 적극 구직활동을 한 사람</div>
                </div>
              </div>
              <div className="rounded-xl border border-[#e8d5ce] bg-[#fcf6f4] p-4">
                <div className="font-bold text-[#a74126] mb-1">B. 비경제활동인구 (약 1,590만 명)</div>
                <p className="text-xs text-zinc-600 mb-2">일할 능력이 없거나, 일할 의사(구직활동)가 없는 사람</p>
                <div className="pl-3 border-l-2 border-[#a74126]/40 space-y-1 text-xs text-zinc-700">
                  <div>• 정규 학생 및 학원 수강생</div>
                  <div>• 육아 및 가사 전담 주부</div>
                  <div>• 연로 및 심신장애인</div>
                  <div>• <strong>취업 준비생 (공시생·자격증)</strong></div>
                  <div>• <strong>구직단념자 & 그냥 ‘쉬었음’ (255만 명)</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 공식 비교 테이블 */}
        <div className="overflow-x-auto rounded-[1.7rem] border border-[#e9ded4] bg-white">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#eee8e1] bg-[#fcfaf7]">
                <th className="p-4 font-bold text-[#292520]">지표명</th>
                <th className="p-4 font-bold text-[#292520]">산출 공식</th>
                <th className="p-4 font-bold text-[#292520]">분모 (기준 집단)</th>
                <th className="p-4 font-bold text-[#292520]">통계적 의미와 한계</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee8e1] text-zinc-700">
              <tr>
                <td className="p-4 font-bold text-[#292520]">전체 고용률</td>
                <td className="p-4 font-mono text-xs">(취업자 ÷ 15세 이상 인구) × 100</td>
                <td className="p-4">15세 이상 전체 인구</td>
                <td className="p-4 text-xs">인구 전체를 분모로 써서 왜곡이 가장 적음 (정부 핵심 지표)</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#292520]">OECD 고용률</td>
                <td className="p-4 font-mono text-xs">(15~64세 취업자 ÷ 15~64세 인구) × 100</td>
                <td className="p-4">15~64세 생산연령인구</td>
                <td className="p-4 text-xs">은퇴 고령층을 제외해 국가 간 비교에 최적화 (2025년 69.8%)</td>
              </tr>
              <tr className="bg-[#fff9f7]">
                <td className="p-4 font-bold text-[#a74126]">공식 실업률</td>
                <td className="p-4 font-mono text-xs">(실업자 ÷ 경제활동인구) × 100</td>
                <td className="p-4 font-semibold text-[#a74126]">취업자 + 실업자</td>
                <td className="p-4 text-xs">구직을 포기하면 분모에서 빠져 <strong>실업률이 낮아지는 착시</strong> 발생</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#292520]">대학 취업률 (교육부)</td>
                <td className="p-4 font-mono text-xs">취업자 ÷ (졸업자 - 진학·입대자) × 100</td>
                <td className="p-4">고등교육기관 졸업자</td>
                <td className="p-4 text-xs">국가 고용동향이 아닌 교육부/한국교육개발원(KEDI) 고유 지표</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: 체감과의 괴리 (구직활동 4주 기준과 꼼수) */}
      <section className="mt-16">
        <SectionTitle
          number="02"
          title="“구직활동 안 하면 실업자가 아니다?” 통계의 맹점"
          subtitle="취업을 포기하는 청년이 늘어날수록 공식 실업률이 하락하는 역설"
        />
        <div className="editorial-body space-y-4 break-keep">
          <p>
            “아무리 백수라도 이력서를 안 넣으면 실업자가 아니다.” 이 말은 소문이 아니라 <strong>국제노동기구(ILO)가 규정한 실제 공식 기준</strong>입니다.
          </p>
          <p>
            통계청 경제활동인구조사에서 ‘실업자’로 인정받으려면 다음 3가지 조건을 동시에 충족해야 합니다:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[#403a35]">
            <li><strong>지난 1주일 동안</strong> 1시간 이상 일하지 않았을 것.</li>
            <li><strong>지난 4주일 동안</strong> 입사원서 제출, 면접 등 <strong>적극적인 구직활동</strong>을 펼쳤을 것.</li>
            <li>일이 주어지면 <strong>즉시 취업이 가능</strong>할 것.</li>
          </ul>
        </div>

        {/* 심층 분석 박스 */}
        <div className="my-8 rounded-[1.7rem] bg-[#f8f5f0] p-6 border border-[#e8ded4] sm:p-8">
          <h3 className="editorial-h3 text-[#a74126] mb-3">왜 실업률이 2.8%로 비현실적으로 낮게 나올까?</h3>
          <div className="space-y-4 text-sm text-[#403a35] leading-relaxed">
            <div>
              <strong className="block text-[#292520] mb-1">1. 취준생·공시생은 실업자에서 전원 제외됩니다.</strong>
              노량진이나 신림동 스터디카페에서 1~2년째 공무원 시험이나 공기업 자격증을 준비하는 사람은 지난 4주간 일반 기업에 입사원서를 넣지 않았기 때문에 ‘실업자’가 아니라 학생과 같은 **‘비경제활동인구’**로 분류됩니다.
            </div>
            <div>
              <strong className="block text-[#292520] mb-1">2. 취업을 포기할수록 실업률이 떨어지는 수학적 착시</strong>
              취업 문턱이 너무 높아 좌절한 청년이 구직을 포기하면(구직단념자), 분자(실업자)와 분모(경제활동인구)에서 동시에 빠져나갑니다. 즉, 취업 한파로 구직을 단념하는 청년이 10만 명 늘어나면 <strong>통계상 실업률은 오히려 하락</strong>하게 됩니다.
            </div>
            <div>
              <strong className="block text-[#292520] mb-1">3. 주 1시간만 일해도 ‘완벽한 취업자’로 둔갑</strong>
              ILO 규정에 따라 지난주에 편의점 대타나 배달 알바로 **단 1시간(수입 1만 원)**만 일했어도 통계적으로는 4대 보험 정규직 대기업 회사원과 똑같은 ‘취업자’ 1명으로 잡힙니다.
            </div>
            <div>
              <strong className="block text-[#292520] mb-1">4. 2025년 그냥 ‘쉬었음’ 인구만 255만 5천 명</strong>
              질병이나 육아 등 뚜렷한 이유 없이 그냥 쉬었다고 답한 인구가 2025년 255만 5천 명에 달합니다. 특히 <strong>30대 쉬었음 인구(30만 9천 명)</strong>는 관련 통계 작성 이래 역대 최대치를 기록했습니다. 이들은 단 한 명도 실업률 통계에 들어가지 않습니다.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 고용보조지표 3 (체감 실업률) */}
      <section className="mt-16">
        <SectionTitle
          number="03"
          title="정부도 인정한 진짜 체감 실업률: 16%대의 진실"
          subtitle="통계청이 공식 발표하는 ‘고용보조지표 3(확장실업률)’로 피부에 닿는 현실을 봅니다."
        />
        <div className="editorial-body space-y-4 break-keep">
          <p>
            통계청도 이러한 ‘공식 실업률 2.8%’의 비현실성과 국민 체감의 괴리를 잘 알고 있습니다. 그래서 2014년 11월부터 국제 노동 기준에 맞춰 <strong>‘고용보조지표 1, 2, 3’</strong>을 별도로 산출해 매달 공개하고 있습니다.
          </p>
          <p>
            그중 가장 포괄적인 <strong>‘고용보조지표 3(확장실업률)’</strong>은 다음과 같은 잠재 실업자를 모두 합산합니다:
          </p>
          <div className="rounded-2xl border border-[#eee0d5] bg-white p-5 text-sm font-mono text-zinc-700 leading-relaxed">
            확장실업률 = (실업자 + 시간관련 추가취업가능자 + 잠재경제활동인구) ÷ (경제활동인구 + 잠재경제활동인구) × 100
          </div>
          <p className="text-sm text-zinc-600">
            * <strong>시간관련 추가취업가능자</strong>: 주 36시간 미만 일하면서 더 많은 시간 일하고 싶어 하는 알바생·불완전 취업자<br />
            * <strong>잠재경제활동인구</strong>: 원서는 안 넣었지만 취업을 희망하고 취업이 가능한 구직단념자·취준생
          </p>
        </div>

        {/* 공식 vs 체감실업률 모션 바 비교 */}
        <MotionFigure className="mt-8 rounded-[1.7rem] border border-[#e9ded4] bg-white p-6 sm:p-8">
          <figcaption className="mb-5 border-b border-[#eee8e1] pb-4">
            <h3 className="editorial-h3">2025년 공식 실업률 vs 체감 실업률(확장실업률) 비교</h3>
            <p className="editorial-desc mt-1">공통 0~20% 눈금 · 국가데이터처 2025년 연간 고용동향 원표 기준</p>
          </figcaption>
          
          <div className="space-y-5">
            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-semibold text-zinc-700">전체 공식 실업률</span>
                <strong className="tabular-nums text-zinc-700">2.8%</strong>
              </div>
              <Bar value={2.8} max={20} />
            </div>

            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-semibold text-zinc-800">전체 체감실업률 (확장실업률)</span>
                <strong className="tabular-nums text-[#a74126]">9.6%</strong>
              </div>
              <Bar value={9.6} max={20} color="bg-[#a74126]" />
              <span className="text-xs text-zinc-500">공식 실업률의 약 3.4배</span>
            </div>

            <div className="pt-2 border-t border-[#f0ece8]">
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-semibold text-zinc-700">청년층(15~29세) 공식 실업률</span>
                <strong className="tabular-nums text-zinc-700">6.1%</strong>
              </div>
              <Bar value={6.1} max={20} />
            </div>

            <div>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-bold text-[#c55232]">청년층 체감실업률 (확장실업률)</span>
                <strong className="tabular-nums text-[#c55232] text-base">15.6% ~ 17.1%</strong>
              </div>
              <Bar value={15.6} max={20} accent />
              <span className="text-xs font-semibold text-[#c55232]">청년 구직자 6명 중 1명이 사실상 무직·실업 상태</span>
            </div>
          </div>
          <p className="mt-6 text-xs text-[#756b63]">자료: <SourceLink href={kosisUrl} title="KOSIS 고용보조지표3 연간 시계열 통계표" /></p>
        </MotionFigure>
      </section>

      {/* SECTION 4: 연도별 추이 */}
      <section className="mt-16">
        <SectionTitle
          number="04"
          title="연도별 변화 추이: 2020년부터 2025년까지의 궤적"
          subtitle="팬데믹 충격 이후 취업자 수 회복과 실업률 안정화의 시계열 데이터"
        />
        <div className="editorial-body space-y-4 break-keep">
          <p>
            2020년 코로나19 충격으로 취업자 수가 21만 8천 명 급감한 이후, 2022년 일상 회복과 함께 81만 6천 명이 늘어나는 대반등이 있었습니다. 2025년 취업자 수는 <strong>2,876만 9천 명</strong>으로 전년보다 19만 3천 명 증가했고, 15~64세 OECD 고용률은 <strong>69.8%</strong>로 사상 최고치를 달성했습니다.
          </p>
        </div>

        <MotionFigure className="mt-8 overflow-hidden rounded-[1.7rem] border border-[#e9ded4] bg-white">
          <figcaption className="border-b border-[#eee8e1] p-5 sm:p-7">
            <h3 className="editorial-h3">2020~2025 연간 주요 고용 지표 추이</h3>
            <p className="editorial-desc mt-1">취업자 수는 만 명 단위, 고용률·실업률은 % 단위</p>
          </figcaption>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#eee8e1] bg-[#fcfaf7] text-xs font-bold text-[#6b625b]">
                  <th className="p-3.5 sm:p-4">연도</th>
                  <th className="p-3.5 sm:p-4">취업자 수</th>
                  <th className="p-3.5 sm:p-4">전년 대비 증감</th>
                  <th className="p-3.5 sm:p-4">15세+ 고용률</th>
                  <th className="p-3.5 sm:p-4">OECD 고용률</th>
                  <th className="p-3.5 sm:p-4">공식 실업률</th>
                  <th className="p-3.5 sm:p-4">청년 확장실업률</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee8e1] text-zinc-700 tabular-nums">
                {yearlyTrends.map((row) => (
                  <tr key={row.year} className={row.year === 2025 ? 'bg-[#fff8f5] font-semibold' : 'hover:bg-zinc-50'}>
                    <td className="p-3.5 sm:p-4 font-bold text-[#292520]">{row.year}년</td>
                    <td className="p-3.5 sm:p-4">{row.employed.toLocaleString()}만</td>
                    <td className={`p-3.5 sm:p-4 ${row.change > 0 ? 'text-[#a74126]' : 'text-[#365e8a]'}`}>
                      {row.change > 0 ? `+${row.change}만` : `${row.change}만`}
                    </td>
                    <td className="p-3.5 sm:p-4">{row.empRate.toFixed(1)}%</td>
                    <td className="p-3.5 sm:p-4 text-[#a74126] font-semibold">{row.oecdEmpRate.toFixed(1)}%</td>
                    <td className="p-3.5 sm:p-4">{row.unempRate.toFixed(1)}%</td>
                    <td className="p-3.5 sm:p-4 text-[#c55232] font-semibold">{row.youthExpanded.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-[#eee8e1] p-4 text-xs text-[#756b63] sm:px-7">
            취업자 수 및 증감은 연간 평균 인원 기준. 자료: <SourceLink href={reportUrl} title="국가데이터처 연간 고용동향" />
          </p>
        </MotionFigure>
      </section>

      {/* SECTION 5: 연령별 양극화 */}
      <section className="mt-16">
        <SectionTitle
          number="05"
          title="연령별 고용 양극화: 노인 일자리가 떠받친 숫자의 민낯"
          subtitle="취업자 +19만 3천 명의 내막: 60세 이상은 34만 명 늘고, 청년은 17만 명 줄었다."
        />
        <div className="editorial-body space-y-4 break-keep">
          <p>
            전체 취업자가 19만 명 늘었다는 발표 뒤편에는 심각한 세대 간 불균형이 자리 잡고 있습니다. 2025년 한 해 동안 <strong>60세 이상 취업자는 34만 5천 명 폭증</strong>했지만, <strong>청년층(15~29세)은 17만 명 급감</strong>했습니다.
          </p>
          <p>
            우리 경제의 중심축인 40대(-5만 명)와 50대(-2만 6천 명) 역시 제조업과 건설업 불황으로 일자리가 줄었습니다. 사실상 정부의 고령층 재정 지원 일자리와 보건·돌봄 서비스 일자리가 전체 고용률 지표를 견인하고 있는 셈입니다.
          </p>
        </div>

        <MotionFigure className="mt-8 rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7">
          <figcaption className="mb-4 border-b border-[#eee8e1] pb-4">
            <h3 className="editorial-h3">2025년 연령별 취업자 증감 및 실업률 비교</h3>
            <p className="editorial-desc mt-1">국가데이터처 2025년 연간 확정치</p>
          </figcaption>

          <div className="space-y-5">
            {ageGroups.map((age) => (
              <div key={age.label} className="border-b border-[#f0ece8] pb-4 last:border-0">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <strong className="text-base text-[#292520]">{age.label}</strong>
                  <div className="flex items-center gap-3 text-sm tabular-nums">
                    <span className="text-zinc-600">공식 실업률: <strong>{age.unempRate.toFixed(1)}%</strong></span>
                    <span className="font-bold text-[#c55232]">체감: {age.expandedRate.toFixed(1)}%</span>
                    <span className={`font-extrabold ${age.change > 0 ? 'text-[#a74126]' : 'text-[#365e8a]'}`}>
                      {age.change > 0 ? `+${age.change}만 명` : `${age.change}만 명`}
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <Bar value={age.expandedRate} max={20} accent={age.label.includes('청년')} />
                </div>
                <p className="text-xs text-[#736a62]">{age.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-[#756b63]">
            자료: <SourceLink href={kosisUrl} title="KOSIS 연령계층별 경제활동인구 통계표" />
          </p>
        </MotionFigure>
      </section>

      {/* SECTION 6: 지역별 고용 격차 */}
      <section className="mt-16">
        <SectionTitle
          number="06"
          title="17개 시도별 고용 격차: 일자리의 지역 불균형"
          subtitle="청년 구직자가 몰린 서울(실업률 3.4%)과 농어업 비중 높은 제주(고용률 68.7%)"
        />
        <div className="editorial-body space-y-4 break-keep">
          <p>
            지역별로도 고용의 지형도는 극명하게 갈립니다. <strong>제주(68.7%)</strong>와 <strong>충남(65.4%)</strong>, <strong>세종(64.9%)</strong>은 높은 고용률을 기록한 반면, 고령화가 심각하고 청년 유출이 지속된 <strong>부산(58.1%)</strong>과 <strong>대구(58.9%)</strong>는 고용률 60%를 밑돌았습니다.
          </p>
          <p>
            반면 <strong>서울은 실업률이 3.4%</strong>로 전국에서 가장 높았습니다. 전국의 20~30대 청년 구직자들이 대기업과 IT 일자리를 찾아 수도권에 밀집하면서 치열한 구직 경쟁이 벌어지고 있기 때문입니다.
          </p>
        </div>

        <MotionFigure className="mt-8 overflow-hidden rounded-[1.7rem] border border-[#e9ded4] bg-white">
          <figcaption className="border-b border-[#eee8e1] p-5 sm:p-7">
            <h3 className="editorial-h3">2025년 17개 시도별 고용률 및 실업률</h3>
            <p className="editorial-desc mt-1">15세 이상 인구 기준 · 공통 0~75% 눈금</p>
          </figcaption>

          <div className="grid gap-x-6 p-5 sm:grid-cols-2 sm:p-7">
            {regionalStats.map((reg) => (
              <div key={reg.name} className="border-b border-[#f0ece8] py-3 text-sm last:border-0">
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <strong className="text-base text-[#292520]">{reg.name}</strong>
                    <span className="text-xs text-zinc-500 tabular-nums">실업률 {reg.unempRate.toFixed(1)}%</span>
                  </div>
                  <strong className="tabular-nums text-[#a74126]">{reg.empRate.toFixed(1)}%</strong>
                </div>
                <Bar value={reg.empRate} max={75} accent={reg.empRate >= 65.0} />
                <p className="mt-1 text-[11px] text-[#827870]">{reg.note}</p>
              </div>
            ))}
          </div>

          <p className="border-t border-[#eee8e1] px-5 py-4 text-xs text-[#756b63] sm:px-7">
            전국 평균 고용률 62.8%, 평균 실업률 2.8%. 자료: <SourceLink href={kosisUrl} title="KOSIS 시도별 경제활동인구조사 원표" />
          </p>
        </MotionFigure>
      </section>

      {/* SECTION 7: 마무리 및 요약 */}
      <section className="mt-16">
        <SectionTitle
          number="07"
          title="숫자를 제대로 읽는 세 가지 안경"
          subtitle="고용 통계를 마주할 때 반드시 기억해야 할 핵심 원칙"
        />
        <div className="editorial-body space-y-4 break-keep">
          <p>
            앞으로 뉴스에서 “실업률이 몇 퍼센트로 떨어졌다”는 소식을 들으실 때는 다음 세 가지를 꼭 점검해 보시기 바랍니다:
          </p>
          <div className="grid gap-4 sm:grid-cols-3 my-6">
            <div className="rounded-2xl border border-[#e8ded4] bg-white p-5">
              <span className="text-xs font-bold text-[#c55232] tracking-wider">CHECK 1</span>
              <h4 className="editorial-h3 mt-2 mb-1">고용률을 먼저 보라</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                실업률은 구직자가 포기하면 왜곡되지만, 고용률은 인구수 전체를 분모로 하므로 훨씬 정직합니다.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e8ded4] bg-white p-5">
              <span className="text-xs font-bold text-[#c55232] tracking-wider">CHECK 2</span>
              <h4 className="editorial-h3 mt-2 mb-1">고용보조지표 3을 찾아라</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                단기 알바와 취준생까지 포함한 ‘확장실업률’을 봐야 진짜 청년들의 체감 경기를 알 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e8ded4] bg-white p-5">
              <span className="text-xs font-bold text-[#c55232] tracking-wider">CHECK 3</span>
              <h4 className="editorial-h3 mt-2 mb-1">연령별 증감을 쪼개보라</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                취업자가 늘어났다면, 양질의 청년·중장년 일자리인지 60세 이상 재정 지원 일자리인지 반드시 분리해서 봐야 합니다.
              </p>
            </div>
          </div>
          <p>
            통계는 거짓말을 하지 않지만, 통계의 산출 방식을 모르면 숫자가 주는 착시에 빠지기 쉽습니다. 삼촌노트는 독자 여러분이 숫자의 이면을 입체적으로 읽을 수 있도록 돕겠습니다.
          </p>
        </div>
      </section>

      {/* Reference Footer Box */}
      <aside className="mt-14 rounded-[1.7rem] bg-[#f3eee8] p-6 sm:p-8">
        <h2 className="editorial-h3 text-[#292520]">공식 출처와 작성 기준</h2>
        <ul className="editorial-desc mt-4 list-disc space-y-2 pl-5 text-zinc-700">
          <li>
            <SourceLink href={reportUrl} title="국가데이터처, 2025년 12월 및 연간 고용동향 보도자료" /> (2026년 1월 14일 공식 발표)
          </li>
          <li>
            <SourceLink href={kosisUrl} title="KOSIS 국가통계포털, 경제활동인구조사(연령별/시도별/성별 취업자·실업률 원표)" />
          </li>
          <li>
            <SourceLink href="https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1DA7001S" title="통계청 고용보조지표(체감실업률) 해설 및 시계열 통계" />
          </li>
          <li>
            <SourceLink href="https://kedi.re.kr" title="한국교육개발원(KEDI) 고등교육기관 졸업자 취업통계조사" /> (대학 취업률 산출식)
          </li>
        </ul>
        <p className="editorial-desc mt-4 text-xs text-zinc-500">
          본 글의 모든 수치는 국가데이터처 및 통계청 KOSIS의 2025년 연간 확정치 원표를 기준으로 가공 및 정리되었습니다.
        </p>
      </aside>

      {/* Back to Guides */}
      <div className="mt-10 border-t border-[#e8ded4] pt-6">
        <Link href="/guide" className="inline-flex min-h-11 items-center font-bold text-[#a74126] hover:underline">
          ← 읽을거리 목록으로
        </Link>
      </div>
    </article>
  );
}
