import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MotionFigure from './motion-figure';

const pageUrl = 'https://unclenote.com/guide/one-person-household-2025';
const reportUrl = 'https://www.mods.go.kr/board.es?act=view&bid=10820&list_no=442130&mid=a10301010000';
const pdfUrl = 'https://mods.go.kr/boardDownload.es?bid=10820&list_no=442130&seq=7';

export const metadata: Metadata = {
  title: '혼자 사는 사람은 누구이고, 얼마를 쓰며, 얼마나 외로울까?',
  description: '공식 통계로 1인 가구의 2019~2024년 증가 추이, 2024년 연령·17개 시도·소비지출, 2025년 외로움과 관계 만족도를 살펴봅니다.',
  alternates: { canonical: pageUrl },
  openGraph: { type: 'article', siteName: '삼촌노트', url: pageUrl, title: '혼자 사는 삶을 숫자로 보면', description: '1인 가구의 연도별 변화, 나이, 지역, 지출과 사회적 관계', images: [{ url: '/images/one-person-household-cover-2025.png', width: 1536, height: 1024, alt: '작은 집 식탁에 앉은 한 사람' }] },
};

const households = [
  { year: 2019, count: 6148, rate: 30.2 }, { year: 2020, count: 6643, rate: 31.7 },
  { year: 2021, count: 7166, rate: 33.4 }, { year: 2022, count: 7502, rate: 34.5 },
  { year: 2023, count: 7829, rate: 35.5 }, { year: 2024, count: 8045, rate: 36.1 },
];
const ages = [
  { label: '29세 이하', count: 1430, rate: 17.8, past: 19.1 }, { label: '30~39세', count: 1404, rate: 17.4, past: 16.8 },
  { label: '40~49세', count: 989, rate: 12.3, past: 14.2 }, { label: '50~59세', count: 1218, rate: 15.1, past: 16.3 },
  { label: '60~69세', count: 1414, rate: 17.6, past: 15.2 }, { label: '70세 이상', count: 1590, rate: 19.8, past: 18.4 },
];
const regions = [
  { name: '서울', count: 1661, rate: 39.9 }, { name: '부산', count: 548, rate: 37.2 }, { name: '대구', count: 371, rate: 35.5 },
  { name: '인천', count: 412, rate: 32.5 }, { name: '광주', count: 232, rate: 36.9 }, { name: '대전', count: 262, rate: 39.8 },
  { name: '울산', count: 146, rate: 31.6 }, { name: '세종', count: 52, rate: 32.9 }, { name: '경기', count: 1775, rate: 31.7 },
  { name: '강원', count: 277, rate: 39.4 }, { name: '충북', count: 284, rate: 39.1 }, { name: '충남', count: 368, rate: 38.2 },
  { name: '전북', count: 301, rate: 38.2 }, { name: '전남', count: 301, rate: 37.7 }, { name: '경북', count: 457, rate: 38.9 },
  { name: '경남', count: 502, rate: 35.4 }, { name: '제주', count: 95, rate: 34.0 },
];
const spending = [
  { year: 2019, amount: 1426 }, { year: 2020, amount: 1320 }, { year: 2021, amount: 1409 },
  { year: 2022, amount: 1551 }, { year: 2023, amount: 1630 }, { year: 2024, amount: 1689 },
];
const expenses = [
  { name: '주거·수도·광열', amount: 311 }, { name: '음식·숙박', amount: 307 }, { name: '식료품·비주류음료', amount: 230 },
  { name: '교통·운송', amount: 180 }, { name: '기타 상품·서비스', amount: 129 }, { name: '보건', amount: 122 },
  { name: '오락·문화', amount: 106 }, { name: '정보·통신', amount: 100 }, { name: '의류·신발', amount: 80 },
  { name: '가정용품·가사서비스', amount: 66 }, { name: '주류·담배', amount: 35 }, { name: '교육', amount: 24 },
];
const satisfaction = [
  { year: 2019, solo: 48.7, all: 51.4 }, { year: 2021, solo: 46.7, all: 52.8 },
  { year: 2023, solo: 50.0, all: 54.3 }, { year: 2025, solo: 51.1, all: 55.5 },
];
const supports = [
  { label: '외로움을 자주·가끔 느낌', solo: 48.9, all: 38.2 },
  { label: '아플 때 집안일 부탁할 사람 있음', solo: 68.9, all: 75.1 },
  { label: '큰돈이 필요할 때 빌릴 사람 있음', solo: 45.6, all: 51.4 },
  { label: '낙심할 때 이야기할 사람 있음', solo: 73.5, all: 78.8 },
];

function Source({ page }: { page: string }) { return <a className="font-semibold text-[#a74126] underline underline-offset-4" href={pdfUrl} target="_blank" rel="noopener noreferrer">국가데이터처 「2025 통계로 보는 1인가구」 {page} ↗</a>; }
function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle: string }) { return <div className="mb-6 rounded-[1.65rem] bg-[#292520] px-6 py-7 text-white sm:px-8"><span className="text-xs font-bold tracking-[0.2em] text-[#f0a791]">DATA NOTE {number}</span><h2 className="mt-3 break-keep text-balance text-[1.5rem] font-extrabold leading-snug sm:text-[1.85rem]">{title}</h2><p className="mt-3 text-sm leading-relaxed text-[#e5dcd3] sm:text-base">{subtitle}</p></div>; }
function Bar({ value, max, accent = false }: { value: number; max: number; accent?: boolean }) { return <div className="h-2.5 overflow-hidden rounded-full bg-[#f0ece7]"><div className={`motion-bar h-full rounded-full ${accent ? 'bg-[#a75b45]' : 'bg-[#605b68]'}`} style={{ width: `${value / max * 100}%` }} /></div>; }
const readableThousands = (value: number, unit: '가구' | '원') => {
  const tenThousands = Math.floor(value / 10);
  const thousands = value % 10;
  return `${tenThousands.toLocaleString('ko-KR')}만${thousands ? ` ${thousands}천` : ''} ${unit}`;
};

export default function OnePersonHouseholdPage() {
  const jsonLd = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: '혼자 사는 사람은 누구이고, 얼마를 쓰며, 얼마나 외로울까?', datePublished: '2026-09-25', dateModified: '2026-09-25', author: { '@type': 'Organization', name: '삼촌노트' }, publisher: { '@type': 'Organization', name: '삼촌노트' }, mainEntityOfPage: pageUrl, isBasedOn: [reportUrl, pdfUrl] };
  return <article className="mx-auto max-w-[860px] pb-20 text-[#292520]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <nav aria-label="위치" className="mb-7 text-sm text-zinc-500"><Link href="/guide" className="hover:text-[#c55232]">읽을거리</Link><span className="px-2">/</span>생활 통계</nav>
    <header><div className="relative overflow-hidden rounded-[1.7rem] bg-[#292520] px-6 py-8 text-white sm:px-10 sm:py-11">
      <div className="pointer-events-none absolute bottom-[5.5rem] right-3 top-[6.8rem] hidden w-[45%] overflow-hidden rounded-2xl [mask-image:linear-gradient(to_right,transparent,black_16%)] md:block" aria-hidden="true"><Image src="/images/one-person-household-cover-2025.png" alt="" fill priority sizes="380px" className="object-cover object-center" /></div>
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-5 text-xs font-bold"><span className="rounded-full border border-[#e7ae9a]/45 px-3 py-1.5 text-[#f2b9a5]">삼촌노트 생활 통계</span><span className="text-[#d3c6bb]">2024·2025년 자료 · 2026.09.25</span></div>
      <div className="relative z-10 py-10 sm:py-14 md:max-w-[62%]"><p className="mb-4 text-xs font-bold tracking-[0.23em] text-[#f0a791]">DATA STORY / 03</p><h1 className="break-keep text-balance text-[2rem] font-extrabold leading-[1.25] tracking-tight sm:text-[3.1rem]">혼자 사는 삶,<br /><span className="text-[#f0a791]">숫자로 보면</span><br />어떨까?</h1><p className="mt-5 break-keep text-base font-medium leading-relaxed text-[#e9ddd2] sm:text-lg">1인 가구의 나이·지역·지출·사회적 관계</p></div>
      <div className="relative z-10 grid gap-3 border-t border-white/20 pt-5 text-sm sm:grid-cols-[1fr_auto]"><p className="text-[#d3c6bb]">연도별 변화를 따라가며 804만 5천 가구의 서로 다른 모습을 읽습니다.</p><span className="font-bold text-[#f0a791]">자료: 국가데이터처</span></div>
    </div><p className="editorial-body mt-7 break-keep text-[#5c544d]">혼자 사는 사람을 한 가지 모습으로 떠올리기 쉽습니다. 그런데 1인 가구 통계에서 가장 큰 나이 구간은 70세 이상이고, 한 달 소비지출의 가장 큰 항목은 주거·수도·광열입니다. 외롭다는 응답도 전체보다 높지만, 그 숫자만으로 모든 1인 가구의 일상을 설명할 수는 없습니다. 가구 수의 연도별 변화부터 차례로 살펴보겠습니다.</p></header>
    <div className="mt-8 grid gap-3 sm:grid-cols-3">{[{ label: '2024년 1인 가구', value: '804.5만', note: '전체 일반가구의 36.1%' }, { label: '2024년 월평균 소비지출', value: '168.9만 원', note: '가구당 명목 지출' }, { label: '2025년 외로움 응답', value: '48.9%', note: '1인 가구 응답자' }].map(item => <div key={item.label} className="rounded-2xl border border-[#e9ded4] bg-white p-5"><span className="text-sm font-semibold text-[#6b625b]">{item.label}</span><strong className="mt-2 block text-2xl font-extrabold tabular-nums text-[#a74126]">{item.value}</strong><span className="mt-1 block text-xs text-[#736a62]">{item.note}</span></div>)}</div>

    <section className="mt-16"><SectionTitle number="01" title="혼자 사는 가구, 해마다 얼마나 늘었을까?" subtitle="2019년부터 2024년까지 가구 수와 전체 가구 중 비율을 함께 봅니다." /><p className="editorial-body mb-6 break-keep">2024년 1인 가구는 <strong>804만 5천 가구</strong>로, 전체 일반가구의 <strong>36.1%</strong>입니다. 2019년의 614만 8천 가구·30.2%와 비교하면 189만 7천 가구, 5.9%포인트 늘었습니다. 여섯 해의 수치를 나란히 놓으면 증가가 한 해에 집중된 현상은 아니었습니다.</p>
      <MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">1인 가구 수와 전체 가구 중 비율</h3><p className="editorial-desc mt-1">전국 · 가구 수·비율 · 막대는 비율을 0~40% 눈금으로 표시</p></figcaption><div className="space-y-3">{households.map(row => <div key={row.year} className="grid grid-cols-[3.2rem_minmax(0,1fr)_7.7rem] items-center gap-3 text-sm"><strong>{row.year}</strong><Bar value={row.rate} max={40} accent={row.year === 2024} /><span className="text-right tabular-nums"><strong>{row.rate.toFixed(1)}%</strong><span className="block text-xs text-[#827870]">{readableThousands(row.count, '가구')}</span></span></div>)}</div><p className="mt-5 text-xs text-[#756b63]">가구 수는 천 가구 단위 반올림값입니다. 자료: <Source page="부록 표 1, 44쪽" /></p></MotionFigure>
    </section>

    <section className="mt-16"><SectionTitle number="02" title="20대가 가장 많을까? 나이별 분포는 다르다" subtitle="2024년의 여섯 연령 구간을 모두 표시하고 2019년과 비교합니다." /><p className="editorial-body mb-6 break-keep">2024년 1인 가구 중 가장 큰 공개 구간은 <strong>70세 이상 159만 가구(19.8%)</strong>입니다. 그다음은 <strong>29세 이하 143만 가구(17.8%)</strong>, 60~69세 141만 4천 가구(17.6%)입니다. 2019년과 비교하면 70세 이상 비중은 18.4%에서 19.8%로, 29세 이하는 19.1%에서 17.8%로 바뀌었습니다.</p>
      <MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">1인 가구의 연령 구성</h3><p className="editorial-desc mt-1">전체 1인 가구 중 각 구간의 비율 · 2019년과 2024년, 공통 0~25% 눈금</p><div className="mt-3 flex gap-4 text-xs"><span>● 2019년</span><span className="text-[#a74126]">● 2024년</span></div></figcaption><div className="space-y-4">{ages.map(row => <div key={row.label} className="border-b border-[#f0ece8] pb-3 last:border-0"><div className="mb-2 flex items-center justify-between gap-2 text-sm"><strong>{row.label}</strong><span className="text-xs text-[#827870]">2024년 {readableThousands(row.count, '가구')}</span></div><div className="grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-2"><Bar value={row.past} max={25} /><span className="text-right text-xs tabular-nums">{row.past.toFixed(1)}%</span></div><div className="mt-1 grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-2"><Bar value={row.rate} max={25} accent /><strong className="text-right text-xs tabular-nums">{row.rate.toFixed(1)}%</strong></div></div>)}</div><p className="mt-5 text-xs leading-relaxed text-[#756b63]">29세 이하는 20대만이 아니라 그보다 어린 사람도 포함합니다. 70세 이상은 끝이 열린 구간이므로 다른 10년 폭 구간과 같은 길이로 해석할 수 없습니다. 자료: <Source page="부록 표 2, 45쪽" /></p></MotionFigure><p className="editorial-body mt-5 break-keep">이 비율은 <strong>1인 가구 안에서 해당 연령이 차지하는 몫</strong>입니다. 같은 나이의 전체 인구 중 몇 %가 혼자 사는지를 보여주는 연령별 독거율과는 분모가 다릅니다.</p>
    </section>

    <section className="mt-16"><SectionTitle number="03" title="우리 지역 가구 열 곳 중 몇 곳이 혼자 살까?" subtitle="17개 시도의 가구 수와 각 지역 내부의 1인 가구 비율을 함께 놓습니다." /><p className="editorial-body mb-6 break-keep">1인 가구 <strong>수</strong>는 경기 177만 5천 가구, 서울 166만 1천 가구가 많습니다. 그러나 <strong>해당 지역 전체 가구 중 비율</strong>은 서울 39.9%, 대전 39.8%, 강원 39.4% 순입니다. 전국 36.1%와 비교할 때도 가구 수가 아니라 같은 분모로 계산한 지역 비율을 봐야 합니다.</p><MotionFigure className="overflow-hidden rounded-[1.7rem] border border-[#e9ded4] bg-white"><figcaption className="border-b border-[#eee8e1] p-5 sm:p-7"><h3 className="editorial-h3">2024년 시도별 1인 가구</h3><p className="editorial-desc mt-1">막대: 해당 시도 전체 가구 중 1인 가구 비율 · 공통 0~45% 눈금</p></figcaption><div className="grid gap-x-6 p-5 sm:grid-cols-2 sm:p-7">{regions.map(row => <div key={row.name} className="grid grid-cols-[2.4rem_minmax(0,1fr)_7rem] items-center gap-2 border-b border-[#f0ece8] py-2.5 text-sm"><strong>{row.name}</strong><Bar value={row.rate} max={45} accent={row.rate >= 39.4} /><span className="text-right tabular-nums"><strong>{row.rate.toFixed(1)}%</strong><span className="block text-[11px] text-[#827870]">{readableThousands(row.count, '가구')}</span></span></div>)}</div><p className="border-t border-[#eee8e1] px-5 py-4 text-xs text-[#756b63] sm:px-7">전국 36.1%. 가구 수는 천 가구 단위 반올림값입니다. 자료: <Source page="부록 표 3-2, 48쪽" /></p></MotionFigure><p className="editorial-body mt-5 break-keep">이 차이만으로 특정 지역의 집값, 일자리 또는 가족관계를 원인으로 지목할 수는 없습니다. 지역마다 연령 구성과 전체 가구 수가 다릅니다.</p></section>

    <section className="mt-16"><SectionTitle number="04" title="한 달에 얼마를 쓰고, 어디에 쓸까?" subtitle="월평균 소비지출의 연도별 변화와 2024년의 12개 지출 항목입니다." /><p className="editorial-body mb-6 break-keep">2024년 1인 가구의 월평균 소비지출은 <strong>168만 9천 원</strong>입니다. 2019년 142만 6천 원보다 26만 3천 원 높지만, 2020년에는 전년보다 낮았습니다. 아래 수치는 물가를 조정하지 않은 <strong>명목 금액</strong>이므로 실제 구매력이 그만큼 늘었다는 뜻은 아닙니다.</p><MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">1인 가구 월평균 소비지출 추이</h3><p className="editorial-desc mt-1">가구당 월평균 · 명목 금액 · 막대는 0~180만 원 눈금</p></figcaption><div className="space-y-3">{spending.map(row => <div key={row.year} className="grid grid-cols-[3.2rem_minmax(0,1fr)_7.7rem] items-center gap-3 text-sm"><strong>{row.year}</strong><Bar value={row.amount} max={1800} accent={row.year === 2024} /><strong className="text-right tabular-nums">{readableThousands(row.amount, '원')}</strong></div>)}</div><p className="mt-5 text-xs text-[#756b63]">자료: <Source page="부록 표 15, 63쪽" /></p></MotionFigure><p className="editorial-body my-6 break-keep">2024년에는 <strong>주거·수도·광열 31만 1천 원</strong>, <strong>음식·숙박 30만 7천 원</strong>, <strong>식료품·비주류음료 23만 원</strong> 순입니다. 음식·숙박은 식료품 구매와 별도 항목입니다. 전체 지출 항목을 아래에 빠짐없이 보여줍니다.</p><MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">2024년 월평균 소비지출 구성</h3><p className="editorial-desc mt-1">1인 가구당 월평균 · 막대는 0~35만 원 눈금</p></figcaption><div className="grid gap-x-6 sm:grid-cols-2">{expenses.map(row => <div key={row.name} className="border-b border-[#f0ece8] py-2.5"><div className="mb-1.5 flex justify-between gap-2 text-sm"><strong>{row.name}</strong><span className="shrink-0 tabular-nums">{readableThousands(row.amount, '원')}</span></div><Bar value={row.amount} max={350} accent={row.amount >= 307} /></div>)}</div><p className="mt-5 text-xs leading-relaxed text-[#756b63]">항목을 천 원 단위로 반올림해 합하면 169만 원으로 발표 총액 168만 9천 원과 1천 원 차이가 납니다. 전체 가구 평균 289만 원은 여러 명이 사는 가구까지 포함한 가구당 지출이어서 1인당 생활비와 직접 비교할 수 없습니다. 자료: <Source page="부록 표 15, 63쪽" /></p></MotionFigure></section>

    <section className="mt-16"><SectionTitle number="05" title="혼자 살면 더 외로울까? 조사 응답으로 보면" subtitle="외로움 응답과 도움을 청할 관계가 있는지를 나눠 살핍니다." /><p className="editorial-body mb-6 break-keep">2025년 사회조사에서 외로움을 <strong>자주 또는 가끔 느꼈다</strong>는 1인 가구 응답은 <strong>48.9%</strong>, 전체 응답은 <strong>38.2%</strong>였습니다. 10.7%포인트 차이입니다. 이 수치는 개인의 응답 비율이며, 1인 가구 전체가 늘 외롭다는 뜻은 아닙니다. 도움이 필요한 상황에 연락할 사람이 있는지에 관한 질문도 함께 봐야 합니다.</p><MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">2025년 외로움·사회적 관계망 응답</h3><p className="editorial-desc mt-1">응답자 비율 · 같은 질문의 전체 응답과 비교 · 공통 0~100% 눈금</p><div className="mt-3 flex gap-4 text-xs"><span className="text-[#a74126]">● 1인 가구</span><span>● 전체</span></div></figcaption><div className="space-y-5">{supports.map(row => <div key={row.label} className="border-b border-[#f0ece8] pb-4 last:border-0"><strong className="mb-2 block text-sm">{row.label}</strong><div className="grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-2"><Bar value={row.solo} max={100} accent /><strong className="text-right text-xs tabular-nums">{row.solo.toFixed(1)}%</strong></div><div className="mt-1 grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-2"><Bar value={row.all} max={100} /><span className="text-right text-xs tabular-nums">{row.all.toFixed(1)}%</span></div></div>)}</div><p className="mt-5 text-xs leading-relaxed text-[#756b63]">외로움은 2025년 신규 문항으로 ‘자주 그렇다’와 ‘가끔 그렇다’를 합산했습니다. 사회적 관계망 문항의 대상 연령은 조사 항목에 따라 다릅니다. 자료: <Source page="부록 표 24, 68쪽" /></p></MotionFigure><p className="editorial-body my-6 break-keep">외로움을 느끼는 비율의 <strong>연도별 추이</strong>는 이 자료로 만들 수 없습니다. 문항이 2025년에 처음 들어갔기 때문입니다. 대신 이전 조사와 비교할 수 있는 별도 지표인 <strong>인간관계 만족도</strong>를 보면, 1인 가구의 만족 응답은 2019년 48.7%에서 2025년 51.1%로 바뀌었습니다. 이것은 외로움의 변화율이 아닙니다.</p><MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">인간관계에 만족한다는 응답의 변화</h3><p className="editorial-desc mt-1">사회조사 2년 간격 · 13세 이상 · 공통 0~60% 눈금</p></figcaption><div className="space-y-4">{satisfaction.map(row => <div key={row.year} className="grid grid-cols-[3.2rem_minmax(0,1fr)] gap-3"><strong className="text-sm">{row.year}</strong><div><div className="grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-2"><Bar value={row.solo} max={60} accent /><strong className="text-right text-xs tabular-nums">{row.solo.toFixed(1)}%</strong></div><div className="mt-1 grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-2"><Bar value={row.all} max={60} /><span className="text-right text-xs tabular-nums">{row.all.toFixed(1)}%</span></div></div></div>)}</div><p className="mt-5 text-xs leading-relaxed text-[#756b63]">위쪽 색 막대는 1인 가구, 아래쪽은 전체 응답자입니다. 가족·친척·친구·이웃·직장 동료 등 개인적 인간관계에 관한 만족도이며 외로움 문항과 다릅니다. 자료: <Source page="부록 표 23, 67쪽" /></p></MotionFigure></section>

    <section className="mt-16"><SectionTitle number="06" title="숫자들을 함께 읽을 때 기억할 것" subtitle="한 가구의 생활을 통계의 평균과 비율 하나로 단정하지 않습니다." /><div className="editorial-body space-y-4 break-keep"><p>1인 가구는 2019년 이후 꾸준히 늘었지만, 연령·지역·소비·관계는 각각 다른 조사와 기준 연도로 측정됐습니다. 연령과 지역의 분포는 2024년 <strong>인구주택총조사</strong>, 지출은 2024년 <strong>가계동향조사</strong>, 관계와 외로움은 2025년 <strong>사회조사</strong>의 결과입니다.</p><p>따라서 이 자료만으로 “고령 1인 가구라서 지출이 얼마다” 또는 “혼자 살아서 외롭다”처럼 변수 사이의 원인을 정할 수 없습니다. 가구별 소득, 건강, 가족관계 등도 이 글의 표와 직접 연결되어 있지 않습니다. 숫자는 서로 다른 생활을 더 정확히 질문하는 출발점입니다.</p></div></section>
    <aside className="mt-14 rounded-[1.7rem] bg-[#f3eee8] p-6 sm:p-8"><h2 className="editorial-h3">자료와 표기 기준</h2><ul className="editorial-desc mt-4 list-disc space-y-2 pl-5"><li><a className="font-semibold text-[#a74126] underline" href={reportUrl} target="_blank" rel="noopener noreferrer">국가데이터처 「2025 통계로 보는 1인가구」 발표 페이지 ↗</a></li><li><a className="font-semibold text-[#a74126] underline" href={pdfUrl} target="_blank" rel="noopener noreferrer">공식 보고서 PDF와 부록 원표 ↗</a></li></ul><p className="editorial-desc mt-4">그래프는 보고서 부록의 수치를 삼촌노트가 재구성했습니다. 각 그래프 아래에 원표 번호와 인쇄 쪽수를 적었습니다. 가구 수는 천 가구, 지출은 천 원 단위의 발표값이어서 합계에 반올림 차이가 있을 수 있습니다.</p></aside>
    <div className="mt-10 border-t border-[#e8ded4] pt-6"><Link href="/guide" className="inline-flex min-h-11 items-center font-bold text-[#a74126] hover:underline">← 읽을거리 목록으로</Link></div>
  </article>;
}
