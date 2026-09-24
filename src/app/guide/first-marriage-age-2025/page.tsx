import type { Metadata } from 'next';
import Link from 'next/link';

const url = 'https://unclenote.com/guide/first-marriage-age-2025';
const regionSource = 'https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1B83A05';
const ageSource = 'https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1B83A06';
const gapSource = 'https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1B83A08';
const reportSource = 'https://mods.go.kr/board.es?act=view&bid=204&list_no=444103&mid=a10301020300';

export const metadata: Metadata = {
  title: '2025년 첫 결혼은 몇 살에 할까? 평균부터 지역·나이 차이까지',
  description: '2025년 국가데이터처·KOSIS 통계로 평균 초혼 연령, 연령대별 인원, 17개 시도별 수치와 10세 이상 차이 나는 초혼 부부를 비교합니다.',
  alternates: { canonical: url },
  openGraph: {
    type: 'article',
    siteName: '삼촌노트',
    title: '2025년 첫 결혼은 몇 살에 할까? 평균부터 지역·나이 차이까지',
    description: '평균은 33.9세와 31.6세. 그런데 가장 어린 초혼과 가장 늦은 초혼은 통계에서 어디까지 알 수 있을까요?',
    url,
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 읽을거리' }],
  },
};

const ageGroups = [
  { label: '15세 미만', men: 0, women: 1 },
  { label: '15~19세', men: 149, women: 1391 },
  { label: '20~24세', men: 3534, women: 8842 },
  { label: '25~29세', men: 41956, women: 67671 },
  { label: '30~34세', men: 96898, women: 91322 },
  { label: '35~39세', men: 43987, women: 26839 },
  { label: '40~44세', men: 14989, women: 7229 },
  { label: '45~49세', men: 5119, women: 1928 },
  { label: '50~54세', men: 2273, women: 672 },
  { label: '55~59세', men: 854, women: 276 },
  { label: '60~64세', men: 323, women: 123 },
  { label: '65~69세', men: 133, women: 78 },
  { label: '70~74세', men: 43, women: 43 },
  { label: '75세 이상', men: 34, women: 28 },
];

const regions = [
  { name: '서울', men: 34.18, women: 32.40 },
  { name: '부산', men: 34.00, women: 31.99 },
  { name: '대구', men: 33.77, women: 31.61 },
  { name: '인천', men: 33.93, women: 31.82 },
  { name: '광주', men: 33.94, women: 31.70 },
  { name: '대전', men: 33.18, women: 31.24 },
  { name: '울산', men: 33.23, women: 31.19 },
  { name: '세종', men: 34.13, women: 32.01 },
  { name: '경기', men: 33.78, women: 31.73 },
  { name: '강원', men: 33.65, women: 31.32 },
  { name: '충북', men: 33.35, women: 30.99 },
  { name: '충남', men: 33.77, women: 31.07 },
  { name: '전북', men: 33.98, women: 31.27 },
  { name: '전남', men: 33.71, women: 31.00 },
  { name: '경북', men: 33.79, women: 31.24 },
  { name: '경남', men: 33.85, women: 31.59 },
  { name: '제주', men: 34.03, women: 31.67 },
];

function SectionTitle({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-[1.65rem] bg-[#292520] px-6 py-7 text-white sm:px-8 sm:py-8">
      <span className="mb-3 block text-xs font-bold tracking-[0.2em] text-[#f0a791]">DATA NOTE {number}</span>
      <h2 className="break-keep text-balance text-[1.45rem] font-extrabold leading-snug tracking-tight text-white sm:text-[1.85rem]">{title}</h2>
      <p className="mt-3 break-keep text-sm leading-relaxed text-[#e5dcd3] sm:text-base">{children}</p>
    </div>
  );
}

function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#a74126] underline decoration-[#c55232]/35 underline-offset-4 hover:decoration-current">{children} ↗</a>;
}

function AgeRow({ label, men, women }: { label: string; men: number; women: number }) {
  const format = (value: number) => value.toLocaleString('ko-KR');
  return (
    <div className="grid grid-cols-[4.6rem_minmax(0,1fr)] items-center gap-3 border-b border-[#eee8e1] py-2.5 last:border-0 sm:grid-cols-[5.5rem_minmax(0,1fr)]">
      <span className="text-sm font-semibold text-[#403a35]">{label}</span>
      <div className="space-y-1.5">
        <div className="grid grid-cols-[minmax(0,1fr)_4.5rem] items-center gap-2">
          <div className="h-2.5 rounded-full bg-[#f0ece7]"><div className="h-2.5 rounded-full bg-[#a75b45]" style={{ width: `${men / 96898 * 100}%` }} /></div>
          <span className="text-right text-xs tabular-nums text-[#6b625b] sm:text-sm">{format(men)}</span>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_4.5rem] items-center gap-2">
          <div className="h-2.5 rounded-full bg-[#f0ece7]"><div className="h-2.5 rounded-full bg-[#605b68]" style={{ width: `${women / 96898 * 100}%` }} /></div>
          <span className="text-right text-xs tabular-nums text-[#6b625b] sm:text-sm">{format(women)}</span>
        </div>
      </div>
    </div>
  );
}

export default function FirstMarriageAgePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '2025년 첫 결혼은 몇 살에 할까? 평균부터 지역·나이 차이까지',
    description: '2025년 국가데이터처·KOSIS 혼인 통계로 초혼 평균, 연령 분포, 시도별 차이를 읽습니다.',
    datePublished: '2026-09-24',
    dateModified: '2026-09-24',
    author: { '@type': 'Organization', name: '삼촌노트' },
    publisher: { '@type': 'Organization', name: '삼촌노트' },
    mainEntityOfPage: url,
    isBasedOn: [reportSource, regionSource, ageSource, gapSource],
  };

  return (
    <article className="mx-auto max-w-[860px] pb-20 text-[#292520]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="위치" className="mb-7 text-sm text-zinc-500"><Link href="/guide" className="hover:text-[#c55232]">읽을거리</Link><span className="px-2">/</span>생활 통계</nav>

      <header className="border-b border-[#e8ded4] pb-9">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-bold tracking-wide"><span className="rounded-full bg-[#f7e8df] px-3 py-1.5 text-[#a74126]">생활 통계 · 결혼</span><span className="text-zinc-500">2026.09.24 · 2025년 자료</span></div>
        <h1 className="editorial-h1 max-w-[770px] break-keep text-balance">2025년 첫 결혼은 몇 살에 할까? <span className="text-[#ad4c2f]">평균부터 지역·나이 차이까지</span></h1>
        <p className="editorial-body mt-6 max-w-[720px] break-keep text-[#5c544d]">“요즘은 다들 몇 살에 결혼해?”라는 질문은 간단하지만 답은 하나가 아닙니다. 평균 나이, 가장 많이 결혼하는 나이, 가장 어린·많은 나이는 서로 다른 숫자입니다. 2025년 국가데이터처 혼인 통계와 국가통계포털(KOSIS) 원표를 본문 안에서 함께 펼쳐 보겠습니다.</p>
      </header>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5"><span className="text-sm font-semibold text-[#6b625b]">남성 평균 초혼 연령</span><div className="mt-2 text-3xl font-extrabold tabular-nums text-[#a74126]">33.9<span className="ml-1 text-base">세</span></div></div>
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5"><span className="text-sm font-semibold text-[#6b625b]">여성 평균 초혼 연령</span><div className="mt-2 text-3xl font-extrabold tabular-nums text-[#605b68]">31.6<span className="ml-1 text-base">세</span></div></div>
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5"><span className="text-sm font-semibold text-[#6b625b]">가장 많은 초혼 연령대</span><div className="mt-2 text-2xl font-extrabold tabular-nums">30~34세</div><p className="mt-1 text-xs text-[#736a62]">남녀 각각의 초혼 인원 기준</p></div>
      </div>

      <div className="editorial-body mt-10 space-y-5 break-keep">
        <p>남성 33.9세, 여성 31.6세는 2025년에 신고된 초혼자의 평균 연령입니다. KOSIS 원표의 소수 둘째 자리 수치는 각각 <strong>33.85세, 31.62세</strong>이고, 보도자료에서는 소수 첫째 자리로 제시합니다. 평균은 모든 초혼자의 나이를 모아 계산한 값입니다. ‘가장 흔한 나이’나 ‘그 나이에 꼭 결혼해야 한다’는 뜻은 아닙니다.</p>
        <p>또 하나, 이 통계의 기준은 <strong>혼인신고</strong>입니다. 결혼식 날짜와 신고 날짜가 다를 수 있고, 신고하지 않은 관계는 여기에 잡히지 않습니다. 숫자를 읽을 때 이 범위를 먼저 기억하면 오해가 줄어듭니다.</p>
      </div>

      <section id="age-distribution" className="mt-16 scroll-mt-24">
        <SectionTitle number="01" title="가장 많이 첫 결혼하는 때는 30대 초반">평균 하나보다 연령대별 인원을 나란히 보면 실제 분포가 보입니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">2025년 초혼자 중 <strong>30~34세</strong>가 남성 <strong>96,898명</strong>, 여성 <strong>91,322명</strong>으로 각각 가장 많았습니다. 그다음은 남성은 35~39세(43,987명), 여성은 25~29세(67,671명)입니다. 한 부부 안에서도 한쪽이 초혼이고 다른 쪽은 재혼일 수 있으므로, 아래 남녀 인원을 더해 ‘초혼 부부 수’로 읽으면 안 됩니다.</p>
        <figure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7">
          <figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">2025년 초혼 연령대별 인원</h3><p className="editorial-desc mt-1">전국 · 명 · 막대는 96,898명을 100%로 표시</p><div className="mt-3 flex gap-5 text-sm"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#a75b45]" />남성</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#605b68]" />여성</span></div></figcaption>
          <div>{ageGroups.map((group) => <AgeRow key={group.label} {...group} />)}</div>
          <p className="mt-4 text-xs leading-relaxed text-[#756b63]">막대의 기준은 남녀 공통입니다. 15세 미만 여성 1명은 원표의 값 그대로 표기했으며, 이 표만으로 실제 혼인일이나 개인의 정확한 나이를 알 수 없습니다. 연령 미상은 남녀 모두 0명이라 그래프에서 제외했습니다.</p>
          <p className="mt-2 text-xs text-[#756b63]">자료: <Source href={ageSource}>KOSIS 「시도/초혼연령별 혼인」, 2025년</Source></p>
        </figure>
      </section>

      <section id="youngest-oldest" className="mt-16 scroll-mt-24">
        <SectionTitle number="02" title="최연소·최고령, 정확히 몇 살인지는 알 수 있을까?">공개된 표의 ‘연령 구간’과 개인의 ‘실제 나이’를 구별해야 합니다.</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-[#edd5c8] bg-[#fff9f4] p-6"><span className="text-xs font-bold tracking-wider text-[#a74126]">가장 어린 공개 구간</span><p className="mt-2 text-2xl font-extrabold">15세 미만</p><p className="editorial-desc mt-3">여성 1명, 남성 0명으로 집계됐습니다. 단, 구간값만 공개되어 있어 그 1명의 정확한 나이나 혼인 경위는 이 통계로 알 수 없습니다.</p></div>
          <div className="rounded-[1.5rem] border border-[#dddbe3] bg-[#f8f7fa] p-6"><span className="text-xs font-bold tracking-wider text-[#605b68]">가장 많은 나이를 포함한 공개 구간</span><p className="mt-2 text-2xl font-extrabold">75세 이상</p><p className="editorial-desc mt-3">남성 34명, 여성 28명이 처음 혼인신고를 했습니다. 상한이 없는 구간이므로 최고령이 75세인지, 80대인지 등은 알 수 없습니다.</p></div>
        </div>
        <p className="editorial-body mt-5 break-keep">그래서 “2025년 최연소 신랑·신부는 몇 살, 최고령은 몇 살”이라는 질문에 공개된 연령대 표만으로 개인의 정확한 나이를 답할 수는 없습니다. 특히 15세 미만 1명이라는 신고 통계의 값만으로 <strong>2025년에 국내에서 해당 나이로 결혼식이나 법적 혼인이 이루어졌다</strong>고 해석해서도 안 됩니다. 통계의 기준과 개인 사건의 맥락은 다릅니다.</p>
      </section>

      <section id="regions" className="mt-16 scroll-mt-24">
        <SectionTitle number="03" title="서울이 가장 늦다? 17개 시도를 모두 놓고 보면">지역을 비교할 때는 ‘서울 1위’라는 문장 옆에 나머지 수치도 있어야 합니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">2025년 서울의 평균 초혼 연령은 남성 <strong>34.18세</strong>, 여성 <strong>32.40세</strong>로 17개 시도 중 남녀 모두 가장 높았습니다. 소수 첫째 자리로는 34.2세와 32.4세입니다. 전국 33.85세·31.62세와 비교하면 남성은 0.33세, 여성은 0.78세 높습니다. 다만 이 차이만으로 집값이나 직장 문화가 원인이라고 단정할 수는 없습니다.</p>
        <figure className="overflow-hidden rounded-[1.7rem] border border-[#e9ded4] bg-white">
          <figcaption className="border-b border-[#eee8e1] p-5 sm:p-7"><h3 className="editorial-h3">2025년 시도별 평균 초혼 연령</h3><p className="editorial-desc mt-1">단위: 세 · 원표의 소수 둘째 자리 · 진한 배경은 해당 열에서 높은 값</p></figcaption>
          <div className="grid grid-cols-[minmax(4.5rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)] bg-[#f8f4ef] px-4 py-3 text-sm font-bold sm:px-7"><span>지역</span><span className="text-right">남성</span><span className="text-right">여성</span></div>
          <div className="grid grid-cols-[minmax(4.5rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)] border-y border-[#e8ded4] bg-[#fff7f1] px-4 py-3 text-sm font-bold tabular-nums sm:px-7"><span>전국</span><span className="text-right">33.85</span><span className="text-right">31.62</span></div>
          <div className="divide-y divide-[#f0ece8]">{regions.map((region) => <div key={region.name} className="grid grid-cols-[minmax(4.5rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)] items-center px-4 py-2.5 text-sm sm:px-7"><span className="font-medium">{region.name}</span><span className={`justify-self-end rounded-md px-2 py-1 text-right tabular-nums ${region.men >= 34 ? 'bg-[#f3d9cb] font-bold text-[#783a28]' : region.men <= 33.35 ? 'bg-[#f4f0ed]' : 'bg-[#faede5]'}`}>{region.men.toFixed(2)}</span><span className={`justify-self-end rounded-md px-2 py-1 text-right tabular-nums ${region.women >= 32 ? 'bg-[#dcd9e6] font-bold text-[#403a51]' : region.women <= 31.07 ? 'bg-[#f4f0ed]' : 'bg-[#eeecf3]'}`}>{region.women.toFixed(2)}</span></div>)}</div>
          <div className="border-t border-[#eee8e1] px-5 py-4 text-xs leading-relaxed text-[#756b63] sm:px-7">자료: <Source href={regionSource}>KOSIS 「시도별 평균초혼연령」, 2025년</Source> · 지역은 행정구역 순서. 표의 ‘국외’ 항목은 17개 시도 비교에서 제외했습니다.</div>
        </figure>
        <p className="editorial-body mt-5 break-keep">남성은 서울 다음으로 세종(34.13세), 제주(34.03세), 부산(34.00세) 순입니다. 여성은 서울 다음이 세종(32.01세), 부산(31.99세)입니다. 가장 낮은 곳은 남성 대전(33.18세), 여성 충북(30.99세)으로, 남녀의 지역 순위도 완전히 같지는 않습니다. 이 표는 각 지역 초혼자의 평균이지, 그 지역에 사는 모든 미혼자의 결혼 시기를 예측하는 수치는 아닙니다.</p>
      </section>

      <section id="age-gap" className="mt-16 scroll-mt-24">
        <SectionTitle number="04" title="초혼 부부의 나이 차이는 어떨까?">두 사람 모두 초혼인 부부만 따로 보면, 남성이 연상인 경우가 가장 많습니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">2025년 두 사람 모두 초혼인 부부의 연령 관계는 <strong>남성 연상 63.0%</strong>, <strong>여성 연상 20.2%</strong>, <strong>동갑 16.7%</strong>입니다. 평균 초혼 연령의 남녀 차이인 약 2.2세를 “모든 부부의 평균 나이 차이”로 받아들이면 안 되는 이유입니다. 평균 초혼 연령은 남성과 여성을 각각 집계한 값이고, 여기의 비율은 같은 부부를 묶어 계산한 값입니다.</p>
        <figure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="editorial-h3 mb-5">2025년 초혼 부부의 연령 관계</figcaption><div className="flex h-8 overflow-hidden rounded-full" role="img" aria-label="남성 연상 63.0%, 여성 연상 20.2%, 동갑 16.7%"><div className="bg-[#a75b45]" style={{ width: '63%' }} /><div className="bg-[#605b68]" style={{ width: '20.2%' }} /><div className="bg-[#d8cfc5]" style={{ width: '16.8%' }} /></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><div><span className="inline-block h-2.5 w-2.5 rounded-full bg-[#a75b45]" /> <span className="text-sm">남성 연상</span><strong className="ml-2 tabular-nums">63.0%</strong></div><div><span className="inline-block h-2.5 w-2.5 rounded-full bg-[#605b68]" /> <span className="text-sm">여성 연상</span><strong className="ml-2 tabular-nums">20.2%</strong></div><div><span className="inline-block h-2.5 w-2.5 rounded-full bg-[#d8cfc5]" /> <span className="text-sm">동갑</span><strong className="ml-2 tabular-nums">16.7%</strong></div></div><p className="mt-4 text-xs leading-relaxed text-[#756b63]">발표 수치는 반올림으로 합계가 99.9%입니다. 막대의 마지막 칸은 시각적으로 100%를 채우도록 표시했습니다. 자료: <Source href={reportSource}>국가데이터처 「2025년 혼인·이혼 통계」</Source>, <Source href={gapSource}>KOSIS 초혼 부부 연령차 표</Source></p></figure>
        <div className="editorial-body mt-8 space-y-4 break-keep">
          <h3 className="editorial-h3">10세 이상 차이 나는 초혼 부부는 얼마나 될까?</h3>
          <p>공개 통계에서 나이 차이를 가장 크게 묶은 구간은 <strong>‘10세 이상’</strong>입니다. 2025년 두 사람 모두 초혼인 부부 중 남성이 10세 이상 연상인 혼인은 <strong>7,019건</strong>, 여성이 10세 이상 연상인 혼인은 <strong>409건</strong>입니다. 합치면 <strong>7,428건</strong>입니다.</p>
        </div>
        <figure className="mt-5 rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7">
          <figcaption className="editorial-h3 mb-1">2025년, 10세 이상 차이 나는 초혼 부부</figcaption>
          <p className="editorial-desc mb-6">전국 · 혼인 신고 건수 · 막대는 7,019건을 기준으로 비교</p>
          <div className="space-y-5">
            <div><div className="mb-2 flex items-baseline justify-between gap-3 text-sm"><span className="font-semibold">남성 10세 이상 연상</span><strong className="tabular-nums text-[#a74126]">7,019건</strong></div><div className="h-4 overflow-hidden rounded-full bg-[#f0ece7]"><div className="h-full w-full rounded-full bg-[#a75b45]" /></div></div>
            <div><div className="mb-2 flex items-baseline justify-between gap-3 text-sm"><span className="font-semibold">여성 10세 이상 연상</span><strong className="tabular-nums text-[#605b68]">409건</strong></div><div className="h-4 overflow-hidden rounded-full bg-[#f0ece7]"><div className="h-full rounded-full bg-[#605b68]" style={{ width: `${409 / 7019 * 100}%` }} /></div></div>
          </div>
          <div className="mt-6 flex items-baseline justify-between border-t border-[#eee8e1] pt-4"><span className="text-sm font-semibold">두 경우 합계</span><strong className="text-xl font-extrabold tabular-nums">7,428건</strong></div>
          <p className="mt-4 text-xs leading-relaxed text-[#756b63]">자료: <Source href={gapSource}>KOSIS 「시도/초혼부부의 연령차별 혼인」, 2025년</Source> · 두 사람 모두 초혼인 부부만 포함합니다.</p>
        </figure>
        <p className="editorial-body mt-5 break-keep">이 표의 마지막 칸에는 10세 차이와 그보다 큰 차이가 함께 들어갑니다. 따라서 <strong>2025년에 나이 차이가 가장 큰 부부가 정확히 몇 살 차이였는지</strong>는 공개 표로 알 수 없습니다. 재혼이 포함된 전체 혼인 건수와도 구별해야 합니다.</p>
      </section>

      <section id="method" className="mt-16 scroll-mt-24">
        <SectionTitle number="05" title="이 통계는 어떻게 읽어야 할까?">평균, 최빈 연령대, 최솟값·최댓값은 서로 다른 질문에 답합니다.</SectionTitle>
        <div className="space-y-4 rounded-[1.7rem] border border-[#e9ded4] bg-white p-6 sm:p-8"><p className="editorial-body"><strong>평균 초혼 연령</strong>은 처음 혼인한 사람의 연령을 합쳐 인원으로 나눈 평균입니다. 남녀를 따로 집계하며, KOSIS는 만 나이 기준 연령을 씁니다.</p><p className="editorial-body"><strong>가장 많은 연령대</strong>는 그 구간의 초혼자가 가장 많다는 뜻입니다. 여기서는 남녀 모두 30~34세입니다. 한 살 단위의 최빈 나이가 30세인지 31세인지는 이 5세 간격 표만으로 알 수 없습니다.</p><p className="editorial-body"><strong>최연소·최고령</strong>은 개인의 실제 최소·최대 나이를 뜻합니다. 공개 표는 15세 미만, 75세 이상처럼 구간으로 묶어 제공하므로 개인의 정확한 나이는 제시하지 않습니다.</p><p className="editorial-body"><strong>지역 평균</strong>은 해당 지역에 신고된 초혼자 집계입니다. KOSIS 주석에 따르면 시도별 자료는 남편은 남편 주소, 아내는 아내 주소를 각각 기준으로 합니다. 따라서 한 부부가 남녀 열에서 같은 지역에 반드시 속하는 것은 아닙니다.</p></div>
        <p className="editorial-body mt-6 break-keep">결국 “결혼 적령기는 몇 살?”이라는 질문에 통계가 규범적인 답을 주지는 않습니다. 2025년 신고 통계에서는 30대 초반에 첫 결혼을 한 사람이 가장 많았고, 첫 결혼은 훨씬 이른 연령대와 75세 이상에서도 집계됐습니다. 평균은 전체의 중심을 보는 도구이지, 개인의 일정표가 아닙니다.</p>
      </section>

      <aside className="mt-14 rounded-[1.7rem] bg-[#f3eee8] p-6 sm:p-8"><h2 className="editorial-h3">자료와 표기 기준</h2><ul className="editorial-desc mt-4 list-disc space-y-2 pl-5"><li><Source href={reportSource}>국가데이터처, 「2025년 혼인·이혼 통계」(2026.03.19.)</Source>: 발표 수치와 초혼 부부 연령 관계.</li><li><Source href={ageSource}>KOSIS, 「시도/초혼연령별 혼인」</Source>: 전국 초혼자의 성별·연령대별 인원.</li><li><Source href={regionSource}>KOSIS, 「시도별 평균초혼연령」</Source>: 전국 및 17개 시도 평균(소수 둘째 자리).</li><li><Source href={gapSource}>KOSIS, 「시도/초혼부부의 연령차별 혼인」</Source>: 연령 관계 비교용 원표.</li></ul><p className="editorial-desc mt-4">모든 표와 그래프는 2025년 연간 자료를 바탕으로 삼촌노트가 재구성했습니다. 평균의 소수 첫째 자리 값은 공식 발표 방식에 맞춰 표기했습니다.</p></aside>
      <div className="mt-10 border-t border-[#e8ded4] pt-6"><Link href="/guide" className="inline-flex min-h-11 items-center font-bold text-[#a74126] hover:underline">← 읽을거리 목록으로</Link></div>
    </article>
  );
}
