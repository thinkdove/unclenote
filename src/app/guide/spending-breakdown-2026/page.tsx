import type { Metadata } from 'next';
import Link from 'next/link';
import MotionFigure from '../one-person-household-2025/motion-figure';
import CountUpNumber from '@/components/data-motion/count-up-number';

const pageUrl = 'https://unclenote.com/guide/spending-breakdown-2026';
const releaseUrl = 'https://mods.go.kr/board.es?mid=a10301040400&bid=214&act=view&list_no=446633';
const statTableUrl = 'https://mods.go.kr/boardDownload.es?bid=214&list_no=446633&seq=3';
const annualReleaseUrl = 'https://mods.go.kr/board.es?mid=a10301040400&bid=214&act=view&list_no=443727';
const sampleFaqUrl = 'https://kostat.go.kr/board.es?act=view&bid=3214&list_no=161843&mid=a10502040100';
const kosisUrl = 'https://kosis.kr/visual/nsportalStats/detailContents.do?statJipyoId=3695&listId=F&vStatJipyoId=5129';

export const metadata: Metadata = {
  title: '한 달 293만 원, 어디에 가장 많이 썼을까? 식비보다 커진 외식비',
  description: '2026년 2분기 가계동향조사 원표로 12대 소비지출 항목의 순위, 코로나19 전후 외식비·식료품비의 역전, 소득 5분위별 지출 구조 차이를 확인합니다.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'article',
    siteName: '삼촌노트',
    title: '한 달 293만 원, 어디에 가장 많이 썼을까?',
    description: '집세도 장보기도 아니다. 2026년 2분기 가계동향조사로 본 소비지출 1위 항목.',
    url: pageUrl,
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 읽을거리' }],
  },
};

const items = [
  { label: '음식·숙박', amount: 473, share: 16.1, yoy: 3.5 },
  { label: '식료품·비주류음료', amount: 434, share: 14.8, yoy: 2.8 },
  { label: '주거·수도·광열', amount: 357, share: 12.2, yoy: 3.0 },
  { label: '교통·운송', amount: 338, share: 11.5, yoy: -0.5 },
  { label: '기타 상품·서비스', amount: 257, share: 8.8, yoy: 2.8 },
  { label: '보건', amount: 229, share: 7.8, yoy: 4.2 },
  { label: '오락·문화', amount: 183, share: 6.3, yoy: 7.6 },
  { label: '교육', amount: 178, share: 6.1, yoy: 3.0 },
  { label: '정보통신', amount: 165, share: 5.6, yoy: 2.4 },
  { label: '의류·신발', amount: 147, share: 5.0, yoy: 1.5 },
  { label: '가정용품·가사서비스', amount: 135, share: 4.6, yoy: 17.9 },
  { label: '주류·담배', amount: 36, share: 1.2, yoy: -2.2 },
];

const history = [
  { year: 2012, food: 14.4, dining: 13.3 },
  { year: 2013, food: 14.3, dining: 13.3 },
  { year: 2014, food: 14.3, dining: 13.5 },
  { year: 2015, food: 14.5, dining: 13.5 },
  { year: 2016, food: 13.9, dining: 13.9 },
  { year: 2019, food: 14.0, dining: 14.6, note: '개편 후 통합조사(2019b)' },
  { year: 2020, food: 16.2, dining: 13.9, note: '코로나19, 외식 급감·장보기 급증' },
  { year: 2021, food: 16.1, dining: 13.9 },
  { year: 2022, food: 15.0, dining: 15.3, note: '위드코로나 이후 재역전' },
  { year: 2023, food: 14.8, dining: 15.8 },
  { year: 2024, food: 14.8, dining: 15.7 },
  { year: 2025, food: 14.9, dining: 16.1 },
  { year: 2026, food: 14.8, dining: 16.1 },
];

const quintile = [
  { label: '음식·숙박', q1: 187, q1Share: 13.6, q5: 790, q5Share: 15.2 },
  { label: '식료품·비주류음료', q1: 289, q1Share: 21.1, q5: 623, q5Share: 12.0 },
  { label: '주거·수도·광열', q1: 270, q1Share: 19.7, q5: 492, q5Share: 9.5 },
  { label: '교통·운송', q1: 86, q1Share: 6.3, q5: 722, q5Share: 13.9 },
  { label: '기타 상품·서비스', q1: 94, q1Share: 6.9, q5: 489, q5Share: 9.4 },
  { label: '보건', q1: 167, q1Share: 12.2, q5: 363, q5Share: 7.0 },
  { label: '오락·문화', q1: 57, q1Share: 4.2, q5: 412, q5Share: 7.9 },
  { label: '교육', q1: 15, q1Share: 1.1, q5: 490, q5Share: 9.4 },
  { label: '정보통신', q1: 74, q1Share: 5.4, q5: 247, q5Share: 4.8 },
  { label: '의류·신발', q1: 56, q1Share: 4.1, q5: 276, q5Share: 5.3 },
  { label: '가정용품·가사서비스', q1: 52, q1Share: 3.8, q5: 252, q5Share: 4.8 },
  { label: '주류·담배', q1: 24, q1Share: 1.7, q5: 43, q5Share: 0.8 },
];

const formatWon = (thousands: number) => {
  const man = Math.floor(thousands / 10);
  const cheon = thousands % 10;
  return `${man.toLocaleString('ko-KR')}만${cheon ? ` ${cheon}천` : ''} 원`;
};

function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#a74126] underline decoration-[#c55232]/35 underline-offset-4 hover:decoration-current">
      {children} ↗
    </a>
  );
}

function SectionTitle({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-[1.65rem] bg-[#292520] px-6 py-7 text-white sm:px-8 sm:py-8">
      <span className="mb-3 block text-xs font-bold tracking-[0.2em] text-[#f0a791]">DATA NOTE {number}</span>
      <h2 className="break-keep text-balance text-[1.45rem] font-extrabold leading-snug tracking-tight text-white sm:text-[1.85rem]">{title}</h2>
      <p className="mt-3 break-keep text-sm leading-relaxed text-[#e5dcd3] sm:text-base">{children}</p>
    </div>
  );
}

function Bar({ value, max, accent = false }: { value: number; max: number; accent?: boolean }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-[#f0ece7]">
      <div className={`motion-bar h-full rounded-full ${accent ? 'bg-[#a75b45]' : 'bg-[#605b68]'}`} style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}

export default function SpendingBreakdownPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '한 달 293만 원, 어디에 가장 많이 썼을까? 식비보다 커진 외식비',
    description: '2026년 2분기 가계동향조사 원표로 본 12대 소비지출 항목 순위와 소득 5분위별 차이.',
    datePublished: '2026-09-25',
    dateModified: '2026-09-25',
    author: { '@type': 'Organization', name: '삼촌노트' },
    publisher: { '@type': 'Organization', name: '삼촌노트' },
    mainEntityOfPage: pageUrl,
    isBasedOn: [releaseUrl, statTableUrl, annualReleaseUrl],
  };

  return (
    <article className="mx-auto max-w-[860px] pb-20 text-[#292520]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="위치" className="mb-7 text-sm text-zinc-500">
        <Link href="/guide" className="hover:text-[#c55232]">읽을거리</Link><span className="px-2">/</span>경제·소비 통계
      </nav>

      <header>
        <div className="relative overflow-hidden rounded-[1.7rem] bg-[#292520] px-6 py-8 text-white sm:px-10 sm:py-11">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[42px] border-[#a75b45]/15 sm:h-80 sm:w-80" />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-5 text-xs font-bold tracking-wide">
            <span className="rounded-full border border-[#e7ae9a]/45 px-3 py-1.5 text-[#f2b9a5]">삼촌노트 생활 통계</span>
            <span className="text-[#d3c6bb]">2026년 2분기 가계동향조사 · 2026.09.25</span>
          </div>
          <div className="relative z-10 py-10 sm:py-14 md:max-w-[68%]">
            <p className="mb-4 text-xs font-bold tracking-[0.23em] text-[#f0a791]">DATA STORY / 05</p>
            <h1 className="max-w-[720px] break-keep text-balance text-[2rem] font-extrabold leading-[1.25] tracking-tight text-white sm:text-[3.1rem]">
              한 달 293만 원,<br /><span className="text-[#f0a791]">어디에 가장</span><br />많이 썼을까?
            </h1>
            <p className="mt-5 break-keep text-base font-medium leading-relaxed text-[#e9ddd2] sm:text-lg">집세도 장보기도 아니었다</p>
          </div>
          <div className="relative z-10 grid gap-3 border-t border-white/20 pt-5 text-sm sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-[480px] break-keep leading-relaxed text-[#d3c6bb]">2026년 2분기 가구당 월평균 소비지출 293만 2천 원의 12대 항목을 원표로 확인했습니다.</p>
            <span className="font-bold tabular-nums text-[#f0a791]">자료: 국가데이터처</span>
          </div>
        </div>
        <p className="editorial-body mt-7 max-w-[720px] break-keep text-[#5c544d]">
          한 달에 번 돈에서 가장 큰 몫이 빠져나가는 곳은 어디일까요? 대부분 집세(주거비)나 장보기(식료품)를 먼저 떠올립니다. 그런데 2026년 2분기 가계동향조사 통계표를 직접 열어 보면 1위는 따로 있었습니다. 12개 항목의 순위부터, 그 순위가 지난 14년 동안 두 번 뒤집힌 이유, 소득에 따라 달라지는 우선순위까지 공식 원표로 확인합니다.
        </p>
      </header>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5">
          <span className="text-sm font-semibold text-[#6b625b]">2026년 2분기 월평균 소비지출</span>
          <div className="mt-2 text-2xl font-extrabold tabular-nums text-[#a74126] sm:text-3xl"><CountUpNumber value={293.2} decimals={1} />만 원</div>
          <p className="mt-1 text-xs text-[#736a62]">전년동분기대비 +3.4%(실질 +0.4%)</p>
        </div>
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5">
          <span className="text-sm font-semibold text-[#6b625b]">지출 1위 항목</span>
          <div className="mt-2 text-2xl font-extrabold text-[#605b68] sm:text-3xl">음식·숙박</div>
          <p className="mt-1 text-xs text-[#736a62]">47만 3천 원 · 비중 16.1%</p>
        </div>
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5">
          <span className="text-sm font-semibold text-[#6b625b]">평균소비성향</span>
          <div className="mt-2 text-2xl font-extrabold tabular-nums text-[#605b68] sm:text-3xl"><CountUpNumber value={69.2} decimals={1} />%</div>
          <p className="mt-1 text-xs text-[#736a62]">처분가능소득 대비, 전년동분기대비 -1.2%p</p>
        </div>
      </div>

      <section id="ranking" className="mt-16 scroll-mt-24">
        <SectionTitle number="01" title="12대 항목 중 1위는 무엇이었을까?">2026년 2분기 가구당 월평균 소비지출 293만 2천 원을 지출액이 큰 순서로 나열합니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">1위는 <strong>음식·숙박 47만 3천 원(16.1%)</strong>입니다. 이어 <strong>식료품·비주류음료 43만 4천 원(14.8%)</strong>, <strong>주거·수도·광열 35만 7천 원(12.2%)</strong>, <strong>교통·운송 33만 8천 원(11.5%)</strong> 순입니다. 식료품(장보기)과 음식·숙박(외식·숙박)은 통계상 서로 다른 항목이며, 이번 분기에는 외식·숙박비가 장보기 비용보다 더 컸습니다.</p>
        <MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7">
          <figcaption className="mb-4 border-b border-[#eee8e1] pb-4">
            <h3 className="editorial-h3">2026년 2분기 소비지출 12대 항목</h3>
            <p className="editorial-desc mt-1">가구당 월평균 · 지출액이 큰 순 · 막대는 47만 3천 원을 기준으로 비교</p>
          </figcaption>
          <div>
            {items.map((item, index) => (
              <div key={item.label} className="border-b border-[#f0ece8] py-2.5 last:border-0">
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-[#403a35]">{index + 1}. {item.label}</span>
                  <span className="shrink-0 tabular-nums text-[#5d554e]"><strong>{formatWon(item.amount)}</strong><span className="ml-2 text-[#827870]">{item.share}%</span></span>
                </div>
                <Bar value={item.amount} max={473} accent={index === 0} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#756b63]">비중은 소비지출 총액 293만 2천 원을 분모로 계산했습니다. 항목을 반올림해 합하면 293만 2천 원과 1천 원 안팎의 차이가 날 수 있습니다. 자료: <Source href={statTableUrl}>국가데이터처 「2026년 2/4분기 가계동향조사 결과 통계표」</Source> 원표 1.1.</p>
        </MotionFigure>
      </section>

      <section id="twist" className="mt-16 scroll-mt-24">
        <SectionTitle number="02" title="의식주 중에서도, 예상과 다른 1위">식료품과 음식·숙박을 나란히 놓고, 전년보다 얼마나 늘었는지도 함께 봅니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">식료품과 음식·숙박을 더하면 <strong>90만 7천 원(30.9%)</strong>으로 전체 소비지출의 3분의 1에 가깝습니다. 두 항목의 증가율도 다릅니다. 식료품은 전년동분기대비 <strong>2.8%</strong> 늘었지만, 음식·숙박은 <strong>3.5%</strong> 늘었습니다. 전년 대비 증가율이 가장 높았던 항목은 따로 있습니다. <strong>가정용품·가사서비스가 17.9%</strong>로 12개 항목 중 가장 많이 늘었고, <strong>오락·문화도 7.6%</strong> 늘었습니다. 반대로 <strong>교통·운송(-0.5%)</strong>과 <strong>주류·담배(-2.2%)</strong>는 줄었습니다.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#edd5c8] bg-[#fff9f4] p-5">
            <span className="editorial-desc">음식·숙박(외식·숙박)</span>
            <strong className="mt-1 block text-2xl tabular-nums text-[#a74126]">47만 3천 원</strong>
            <p className="mt-1 text-xs text-[#736a62]">비중 16.1% · 전년동분기대비 +3.5%</p>
          </div>
          <div className="rounded-2xl border border-[#dddbe3] bg-[#f8f7fa] p-5">
            <span className="editorial-desc">식료품·비주류음료(장보기)</span>
            <strong className="mt-1 block text-2xl tabular-nums text-[#514c5c]">43만 4천 원</strong>
            <p className="mt-1 text-xs text-[#736a62]">비중 14.8% · 전년동분기대비 +2.8%</p>
          </div>
        </div>
        <p className="editorial-body mt-5 break-keep">가장 흔한 예상인 <strong>주거·수도·광열(35만 7천 원, 12.2%)</strong>은 3위였습니다. 전기·가스요금과 월세·관리비를 포함하는 항목인데도, 외식·숙박이나 장보기보다는 작았습니다.</p>
      </section>

      <section id="history" className="mt-16 scroll-mt-24">
        <SectionTitle number="03" title="이 순위는 코로나19를 사이에 두고 두 번 뒤집혔다">계절 요인을 없애기 위해 2012년부터 2026년까지 같은 2분기만 골라 비교합니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">외식·숙박비가 장보기 비용을 앞선 것은 이번이 처음이 아닙니다. 2019년 통합조사 기준으로 이미 <strong>음식·숙박 14.6%가 식료품 14.0%를 앞섰습니다.</strong> 그러나 코로나19로 외식이 급감하고 집밥 수요가 늘면서 2020~2021년에는 식료품 비중이 다시 16%대로 치솟아 역전했습니다. 위드코로나가 시작된 2022년부터 음식·숙박 비중이 다시 식료품을 앞섰고, 격차는 2026년 현재 1.3%포인트로 가장 크게 벌어져 있습니다.</p>
        <MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7">
          <figcaption className="mb-4 border-b border-[#eee8e1] pb-4">
            <h3 className="editorial-h3">식료품비·외식비 비중의 역전, 2012~2026년 2분기</h3>
            <p className="editorial-desc mt-1">전국가구 소비지출 구성비 · 공통 0~18% 눈금</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#605b68]" />식료품·비주류음료</span>
              <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#a75b45]" />음식·숙박</span>
            </div>
          </figcaption>
          <div className="space-y-4">
            {history.map((row) => (
              <div key={row.year} className="border-b border-[#f0ece8] pb-3 last:border-0">
                <div className="mb-1.5 flex items-baseline justify-between gap-2 text-sm">
                  <strong>{row.year}년 2분기</strong>
                  {row.note && <span className="text-right text-[11px] text-[#a74126]">{row.note}</span>}
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_3.6rem] items-center gap-2">
                  <Bar value={row.food} max={18} />
                  <span className="text-right text-xs tabular-nums">{row.food.toFixed(1)}%</span>
                </div>
                <div className="mt-1 grid grid-cols-[minmax(0,1fr)_3.6rem] items-center gap-2">
                  <Bar value={row.dining} max={18} accent />
                  <span className="text-right text-xs tabular-nums">{row.dining.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#756b63]">2017~2019년 상반기는 조사 체계 개편으로 공식 통계표에도 결측 표시가 있어 제외했습니다. 2019년은 통합 개편 이후(2019b) 수치입니다. 자료: <Source href={statTableUrl}>국가데이터처 통계표</Source> 원표 1.4 「전국가구 소비지출 구성비 추이」.</p>
        </MotionFigure>
      </section>

      <section id="quintile" className="mt-16 scroll-mt-24">
        <SectionTitle number="04" title="소득에 따라 우선순위가 다르다">소득 하위 20%(1분위)와 상위 20%(5분위)의 지출 구성을 같은 12개 항목으로 비교합니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">소득 하위 20%인 1분위 가구는 <strong>식료품(21.1%)·주거(19.7%)·음식숙박(13.6%)·보건(12.2%)</strong> 네 항목에 소비지출의 <strong>66.5%(91만 3천 원)</strong>를 씁니다. 반면 상위 20%인 5분위는 같은 네 항목 비중이 43.9%로 낮고, 대신 <strong>교육(9.4%)</strong>과 <strong>오락·문화(7.9%)</strong>, <strong>교통(13.9%)</strong>에 훨씬 더 많이 씁니다. 1분위는 교육비(-21.2%)와 오락·문화비(-8.7%)를 전년보다 줄인 반면, 음식숙박(+15.0%)·보건(+13.5%)·주거비(+6.5%) 같은 필수 지출은 오히려 늘었습니다.</p>
        <MotionFigure className="overflow-hidden rounded-[1.7rem] border border-[#e9ded4] bg-white">
          <figcaption className="border-b border-[#eee8e1] p-5 sm:p-7">
            <h3 className="editorial-h3">소득 5분위별 소비지출 구성비</h3>
            <p className="editorial-desc mt-1">2026년 2분기 · 각 분위 소비지출 총액 대비 비중 · 공통 0~22% 눈금</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#605b68]" />1분위(하위 20%)</span>
              <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#a75b45]" />5분위(상위 20%)</span>
            </div>
          </figcaption>
          <div className="divide-y divide-[#f0ece8]">
            {quintile.map((row) => (
              <div key={row.label} className="px-4 py-3 sm:px-7">
                <strong className="text-sm">{row.label}</strong>
                <div className="mt-1.5 grid grid-cols-[minmax(0,1fr)_7.2rem] items-center gap-2">
                  <Bar value={row.q1Share} max={22} />
                  <span className="text-right text-xs tabular-nums text-[#5d554e]">{formatWon(row.q1)} ({row.q1Share}%)</span>
                </div>
                <div className="mt-1 grid grid-cols-[minmax(0,1fr)_7.2rem] items-center gap-2">
                  <Bar value={row.q5Share} max={22} accent />
                  <span className="text-right text-xs tabular-nums text-[#5d554e]">{formatWon(row.q5)} ({row.q5Share}%)</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#eee8e1] px-5 py-4 text-xs leading-relaxed text-[#756b63] sm:px-7">
            1분위 흑자액 -27만 7천 원(적자), 평균소비성향 125.3%. 5분위 흑자액 342만 2천 원, 평균소비성향 60.3%. 자료: <Source href={statTableUrl}>국가데이터처 통계표</Source> 원표 1.5 「전국가구 소득 5분위별 가계수지」.
          </div>
        </MotionFigure>
        <p className="editorial-body mt-5 break-keep">이 비교는 <strong>같은 분기에 소득 순으로 나눈 다섯 집단의 구성</strong>입니다. 분위는 가구를 매번 새로 나누는 기준이어서, 특정 가구가 계속 1분위나 5분위에 머무른다는 뜻은 아닙니다.</p>
      </section>

      <section id="method" className="mt-16 scroll-mt-24">
        <SectionTitle number="05" title="이 숫자는 어떻게 만들어질까?">평균과 명목, 소비지출과 가계지출의 차이를 구분합니다.</SectionTitle>
        <div className="space-y-4 rounded-[1.7rem] border border-[#e9ded4] bg-white p-6 sm:p-8">
          <p className="editorial-body">가계동향조사는 전국 <strong>약 7,200여 표본가구</strong>가 가계부를 기장하는 방식으로 이뤄지며, 매달 표본 일부가 순환 교체되는 연동표본으로 설계돼 있습니다. <Source href={sampleFaqUrl}>국가데이터처 설명</Source></p>
          <p className="editorial-body"><strong>소비지출</strong>은 이 글에서 다룬 12대 항목의 합입니다. 여기에 세금·사회보험료·이자 등 <strong>비소비지출</strong>을 더한 값이 <strong>가계지출(399만 3천 원)</strong>입니다. 두 용어는 다른 금액을 가리킵니다.</p>
          <p className="editorial-body">표의 금액은 물가를 반영하지 않은 <strong>명목 금액</strong>입니다. 소비지출은 전년동분기대비 명목 3.4% 늘었지만, 물가상승분을 뺀 <strong>실질 증가율은 0.4%</strong>에 그쳤습니다. 명목 증가율만 보면 소비가 크게 늘어난 듯 보이지만, 실제 구매력 기준 체감 소비는 거의 제자리걸음이었다는 뜻입니다.</p>
          <p className="editorial-body">모든 금액은 <strong>가구당 평균</strong>입니다. 가구원 수가 다른 가구를 함께 평균한 값이므로 1인당 생활비로 바로 나눌 수 없습니다. 1인 가구만의 지출은 조사 시점과 가구 범위가 달라 이 글의 수치와 직접 합산·비교할 수 없습니다. <Link href="/guide/one-person-household-2025" className="font-semibold text-[#a74126] underline underline-offset-4">1인 가구 지출 읽을거리 →</Link></p>
        </div>
      </section>

      <section id="reading" className="mt-16 scroll-mt-24">
        <SectionTitle number="06" title="한 줄로 정리하면">순위·추이·계층 차이를 하나의 문장으로 묶습니다.</SectionTitle>
        <p className="editorial-body break-keep">2026년 2분기 가구가 가장 많이 쓴 곳은 장보기가 아니라 <strong>음식·숙박(47만 3천 원, 16.1%)</strong>이었습니다. 이 순위는 2019년 처음 뒤집혔다가 코로나19로 되돌아갔고, 2022년 이후 다시 뒤집혀 격차가 가장 크게 벌어져 있습니다. 다만 이 이야기는 평균의 이야기입니다. 소득 하위 20%에게는 여전히 <strong>장보기와 주거비가 가장 큰 부담</strong>이며, 소비지출의 3분의 2가 식료품·주거·음식숙박·보건 네 항목에 묶여 있습니다.</p>
      </section>

      <aside className="mt-14 rounded-[1.7rem] bg-[#f3eee8] p-6 sm:p-8">
        <h2 className="editorial-h3">자료와 계산 기준</h2>
        <ul className="editorial-desc mt-4 list-disc space-y-2 pl-5">
          <li><Source href={releaseUrl}>국가데이터처 「2026년 2/4분기 가계동향조사 결과 보도자료」</Source>(2026.08.27. 발표)와 첨부 통계표.</li>
          <li><Source href={statTableUrl}>통계표(xlsx) 원표 1.1·1.2·1.4·1.5</Source>: 항목별 지출액·증감률·구성비 추이·소득 5분위별 가계수지.</li>
          <li><Source href={annualReleaseUrl}>국가데이터처 「2025년 4분기 및 연간(지출) 가계동향조사 결과 보도자료」</Source>: 2025년 연간 소비지출(293만 9천 원) 참고치.</li>
          <li><Source href={sampleFaqUrl}>국가데이터처 FAQ, 가계동향조사의 조사대상 및 표본규모</Source>.</li>
          <li><Source href={kosisUrl}>KOSIS 100대 지표, 가구소비지출</Source>: 최신 확정치 교차 확인용.</li>
        </ul>
        <p className="editorial-desc mt-4">모든 그래프는 공식 통계표의 수치를 삼촌노트가 재구성했습니다. 비중은 각 표의 총액을 분모로 소수 첫째 자리까지 반올림했으며, 항목을 합산하면 총액과 1천 원 안팎의 반올림 차이가 있을 수 있습니다.</p>
      </aside>
      <div className="mt-10 border-t border-[#e8ded4] pt-6"><Link href="/guide" className="inline-flex min-h-11 items-center font-bold text-[#a74126] hover:underline">← 읽을거리 목록으로</Link></div>
    </article>
  );
}
