import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import MotionFigure from '../one-person-household-2025/motion-figure';
import CountUpNumber from '@/components/data-motion/count-up-number';

const pageUrl = 'https://unclenote.com/guide/divorce-duration-2025';
const releaseUrl = 'https://mods.go.kr/board.es?act=view&bid=204&list_no=444103&mid=a10301020300';
const definitionUrl = 'https://mods.go.kr/boardDownload.es?bid=204&list_no=444103&seq=6';
const briefingUrl = 'https://www.korea.kr/briefing/policyBriefingView.do?newsId=156749798';
const durationUrl = 'https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1B85006';
const ageUrl = 'https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1B85008';
const childrenUrl = 'https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=DT_1B85007';
const regionMethodUrl = 'https://kosis.kr/civilComplaint/qnaDetail.do?boardIdx=22441';

export const metadata: Metadata = {
  title: '2025년 이혼, 결혼 몇 년 만에 많았을까? 지속 기간·지역·나이로 보기',
  description: '국가데이터처와 KOSIS의 2025년 이혼 통계로 동거 기간별 이혼 88,130건, 17개 시도별 차이, 남편·아내의 연령대와 미성년 자녀 수를 비교합니다.',
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'article',
    siteName: '삼촌노트',
    title: '2025년 이혼, 결혼 몇 년 만에 많았을까? 지속 기간·지역·나이로 보기',
    description: '30년 이상 17.7%, 5~9년 17.3%. 지역과 나이에 따라 보이는 차이까지 원표로 확인합니다.',
    url: pageUrl,
    images: [{ url: '/images/share-samchon-note-v2.png', width: 1672, height: 941, alt: '삼촌노트 읽을거리' }],
  },
};

const durationGroups = [
  { label: '4년 이하', count: 14392 },
  { label: '5~9년', count: 15231 },
  { label: '10~14년', count: 14016 },
  { label: '15~19년', count: 12194 },
  { label: '20~24년', count: 8994 },
  { label: '25~29년', count: 7675 },
  { label: '30년 이상', count: 15628 },
];

const firstTenYears = [
  { label: '1년 미만', count: 2406 },
  { label: '1년', count: 3155 },
  { label: '2년', count: 3155 },
  { label: '3년', count: 2875 },
  { label: '4년', count: 2801 },
  { label: '5년', count: 3359 },
  { label: '6년', count: 3017 },
  { label: '7년', count: 3033 },
  { label: '8년', count: 2890 },
  { label: '9년', count: 2932 },
];

const regions = [
  { name: '서울', total: 11685, underFive: 1758, thirtyPlus: 2565 },
  { name: '부산', total: 5053, underFive: 720, thirtyPlus: 1119 },
  { name: '대구', total: 3549, underFive: 501, thirtyPlus: 703 },
  { name: '인천', total: 5902, underFive: 1029, thirtyPlus: 1006 },
  { name: '광주', total: 2150, underFive: 345, thirtyPlus: 321 },
  { name: '대전', total: 2402, underFive: 422, thirtyPlus: 417 },
  { name: '울산', total: 1924, underFive: 295, thirtyPlus: 310 },
  { name: '세종', total: 538, underFive: 88, thirtyPlus: 52 },
  { name: '경기', total: 24382, underFive: 3997, thirtyPlus: 4153 },
  { name: '강원', total: 2783, underFive: 492, thirtyPlus: 501 },
  { name: '충북', total: 3080, underFive: 549, thirtyPlus: 484 },
  { name: '충남', total: 4356, underFive: 793, thirtyPlus: 688 },
  { name: '전북', total: 3114, underFive: 503, thirtyPlus: 555 },
  { name: '전남', total: 3369, underFive: 564, thirtyPlus: 578 },
  { name: '경북', total: 4708, underFive: 736, thirtyPlus: 897 },
  { name: '경남', total: 6124, underFive: 933, thirtyPlus: 1005 },
  { name: '제주', total: 1504, underFive: 262, thirtyPlus: 185 },
];

const divorceAges = [
  { label: '15~19세', husbands: 8, wives: 88 },
  { label: '20~24세', husbands: 309, wives: 1097 },
  { label: '25~29세', husbands: 1892, wives: 3820 },
  { label: '30~34세', husbands: 5555, wives: 8333 },
  { label: '35~39세', husbands: 8281, wives: 10745 },
  { label: '40~44세', husbands: 13065, wives: 14235 },
  { label: '45~49세', husbands: 13571, wives: 13735 },
  { label: '50~54세', husbands: 14021, wives: 12270 },
  { label: '55~59세', husbands: 11033, wives: 9172 },
  { label: '60~64세', husbands: 8581, wives: 7322 },
  { label: '65~69세', husbands: 6500, wives: 4608 },
  { label: '70~74세', husbands: 3142, wives: 1796 },
  { label: '75세 이상', husbands: 2168, wives: 909 },
  { label: '연령 미상', husbands: 4, wives: 0 },
];

const childrenGroups = [
  { label: '없음', count: 49404 },
  { label: '1명', count: 19771 },
  { label: '2명', count: 14650 },
  { label: '3명 이상', count: 3020 },
  { label: '미상', count: 1285 },
];

const format = (value: number) => value.toLocaleString('ko-KR');
const share = (count: number, total = 88130) => (count / total * 100).toFixed(1);

function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#a74126] underline decoration-[#c55232]/35 underline-offset-4 hover:decoration-current">{children} ↗</a>;
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

function CountBar({ label, count, max, color = 'bg-[#a75b45]', showShare = true }: { label: string; count: number; max: number; color?: string; showShare?: boolean }) {
  return (
    <div className="border-b border-[#f0ece8] py-2.5 last:border-0">
      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm"><span className="font-semibold text-[#403a35]">{label}</span><span className="shrink-0 tabular-nums text-[#5d554e]"><strong>{format(count)}</strong>건{showShare && <span className="ml-2 text-[#827870]">{share(count)}%</span>}</span></div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[#f0ece7]"><div className={`motion-bar h-full rounded-full ${color}`} style={{ width: `${count / max * 100}%` }} /></div>
    </div>
  );
}

export default function DivorceDurationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: '2025년 이혼, 결혼 몇 년 만에 많았을까? 지속 기간·지역·나이로 보기',
    description: '국가데이터처와 KOSIS의 2025년 이혼 통계로 혼인 지속 기간, 지역, 이혼 연령과 미성년 자녀 수를 살펴봅니다.',
    datePublished: '2026-09-24',
    dateModified: '2026-09-24',
    author: { '@type': 'Organization', name: '삼촌노트' },
    publisher: { '@type': 'Organization', name: '삼촌노트' },
    mainEntityOfPage: pageUrl,
    isBasedOn: [releaseUrl, durationUrl, ageUrl, childrenUrl],
  };

  return (
    <article className="mx-auto max-w-[860px] pb-20 text-[#292520]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <nav aria-label="위치" className="mb-7 text-sm text-zinc-500"><Link href="/guide" className="hover:text-[#c55232]">읽을거리</Link><span className="px-2">/</span>생활 통계</nav>

      <header>
        <div className="relative overflow-hidden rounded-[1.7rem] bg-[#292520] px-6 py-8 text-white sm:px-10 sm:py-11">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[42px] border-[#a75b45]/15 sm:h-80 sm:w-80" />
          <div className="pointer-events-none absolute bottom-[5.5rem] right-6 top-[7.5rem] hidden w-[43%] overflow-hidden rounded-2xl [mask-image:linear-gradient(to_right,transparent,black_18%)] md:block" aria-hidden="true">
            <Image src="/images/divorce-duration-cover-2025-v4.png" alt="" fill sizes="360px" className="object-contain object-center" priority />
          </div>
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-5 text-xs font-bold tracking-wide">
            <span className="rounded-full border border-[#e7ae9a]/45 px-3 py-1.5 text-[#f2b9a5]">삼촌노트 생활 통계</span>
            <span className="text-[#d3c6bb]">2025년 이혼 통계 · 2026.09.24</span>
          </div>
          <div className="relative z-10 py-10 sm:py-14 md:max-w-[62%]">
            <p className="mb-4 text-xs font-bold tracking-[0.23em] text-[#f0a791]">DATA STORY / 02</p>
            <h1 className="max-w-[720px] break-keep text-balance text-[2rem] font-extrabold leading-[1.25] tracking-tight text-white sm:text-[3.25rem]">2025년 이혼,<br /><span className="text-[#f0a791]">결혼 몇 년 만에</span><br />많았을까?</h1>
            <p className="mt-5 break-keep text-base font-medium leading-relaxed text-[#e9ddd2] sm:text-lg">지속 기간·지역·나이로 읽는 88,130건의 기록</p>
          </div>
          <div className="relative z-10 grid gap-3 border-t border-white/20 pt-5 text-sm sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-[480px] break-keep leading-relaxed text-[#d3c6bb]">30년 이상이 가장 큰 공개 구간. 첫 10년을 한 해씩 보면 5년 구간이 가장 큽니다.</p>
            <span className="font-bold tabular-nums text-[#f0a791]">자료: KOSIS · 국가데이터처</span>
          </div>
        </div>
        <p className="editorial-body mt-7 max-w-[720px] break-keep text-[#5c544d]">“몇 년쯤 함께 살다가 이혼하는 부부가 가장 많을까?” 2025년 이혼 통계의 답은 예상보다 복잡합니다. 30년 이상이 가장 큰 구간이지만, 그 구간은 끝이 열려 있습니다. 지속 기간과 지역, 이혼 당시 나이를 공식 원표의 숫자와 함께 펼쳐 보겠습니다.</p>
      </header>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5"><span className="text-sm font-semibold text-[#6b625b]">2025년 이혼 신고</span><div className="mt-2 text-3xl font-extrabold tabular-nums text-[#a74126]"><CountUpNumber value={88130} /><span className="ml-1 text-base">건</span></div></div>
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5"><span className="text-sm font-semibold text-[#6b625b]">평균 혼인 지속 기간</span><div className="mt-2 text-3xl font-extrabold tabular-nums text-[#605b68]"><CountUpNumber value={17.6} decimals={1} /><span className="ml-1 text-base">년</span></div></div>
        <div className="rounded-2xl border border-[#e9ded4] bg-white p-5"><span className="text-sm font-semibold text-[#6b625b]">가장 큰 공개 구간</span><div className="mt-2 text-2xl font-extrabold tabular-nums">30년 이상</div><p className="mt-1 text-xs text-[#736a62]">이혼 신고 중 17.7%</p></div>
      </div>

      <div className="editorial-body mt-10 space-y-5 break-keep"><p>2025년 신고된 이혼은 <strong>88,130건</strong>입니다. 이혼한 부부의 평균 혼인 지속 기간은 <strong>17.6년</strong>으로 발표됐습니다. 평균 하나만 보면 그 무렵 이혼이 몰린 듯하지만, 실제 분포에는 짧게 함께 산 부부와 30년 넘게 함께 산 부부가 모두 들어 있습니다.</p><p>여기서 ‘혼인 지속 기간’은 혼인신고일과 이혼신고일의 단순한 차이가 아닙니다. 국가데이터처는 <strong>실제 결혼생활을 시작한 때부터 사실상 이혼하거나 별거한 때까지의 동거 기간</strong>으로 정의합니다. 이혼 건수 자체는 2025년에 <strong>신고된</strong> 건수를 셉니다.</p></div>

      <section id="duration" className="mt-16 scroll-mt-24">
        <SectionTitle number="01" title="30년 이상이 가장 많지만, 구간의 폭을 보자">7개 구간의 건수와 비중을 같은 분모로 비교합니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">2025년 이혼 중 <strong>30년 이상 15,628건(17.7%)</strong>이 가장 큰 구간입니다. 이어 <strong>5~9년 15,231건(17.3%)</strong>, <strong>4년 이하 14,392건(16.3%)</strong> 순입니다. 그러나 앞의 여섯 구간은 각각 약 5년 폭인 반면, ‘30년 이상’에는 30년과 그보다 긴 모든 기간이 포함됩니다. “결혼 30년째 이혼이 가장 많다”는 뜻으로 바꿔 말할 수 없습니다.</p>
        <MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">2025년 혼인 지속 기간별 이혼</h3><p className="editorial-desc mt-1">전국 · 이혼 신고 88,130건 중 · 막대는 15,628건을 기준으로 비교</p></figcaption><div>{durationGroups.map(group => <CountBar key={group.label} {...group} max={15628} color={group.label === '30년 이상' ? 'bg-[#a75b45]' : 'bg-[#605b68]'} />)}</div><p className="mt-4 text-xs leading-relaxed text-[#756b63]">‘30년 이상’은 상한이 없는 구간입니다. 각 비율의 분모는 2025년 전체 이혼 신고 88,130건입니다. 20년 이상 소계는 중복 집계라 별도 막대로 넣지 않았습니다. 자료: <Source href={durationUrl}>KOSIS 「시도/혼인지속기간(동거기간)별 이혼」</Source></p></MotionFigure>
        <p className="editorial-body mt-5 break-keep">따라서 이 그래프는 <strong>2025년에 이혼한 부부가 얼마나 함께 살았는지</strong>를 보여줍니다. 지금 결혼한 부부가 앞으로 각 시점에 이혼할 확률을 보여주는 그래프는 아닙니다. 그 확률을 알려면 결혼한 시기가 같은 부부들을 장기간 추적하고, 각 시점에 여전히 혼인 중인 부부 수를 분모로 삼아야 합니다.</p>
      </section>

      <section id="first-ten-years" className="mt-16 scroll-mt-24">
        <SectionTitle number="02" title="첫 10년만 잘게 보면, 5년 구간이 가장 크다">넓은 묶음 안에서 한 해 단위로 공개된 값도 살펴봅니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">KOSIS의 연령·동거기간 교차표는 첫 10년을 ‘1년 미만’, ‘1년’부터 ‘9년’까지 따로 보여줍니다. 이 가운데 <strong>5년 3,359건</strong>이 가장 많습니다. 다만 이것도 2025년에 신고된 이혼만을 세어 비교한 값입니다. “결혼 5년 차가 가장 위험하다”는 결론은 아닙니다.</p>
        <MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">동거 기간 10년 미만의 세부 분포</h3><p className="editorial-desc mt-1">전국 · 건 · 막대는 3,359건을 기준으로 비교</p></figcaption><div className="grid gap-x-6 sm:grid-cols-2">{firstTenYears.map(group => <CountBar key={group.label} {...group} max={3359} color={group.label === '5년' ? 'bg-[#a75b45]' : 'bg-[#605b68]'} showShare={false} />)}</div><p className="mt-4 text-xs leading-relaxed text-[#756b63]">1년 미만~4년의 합은 14,392건, 5~9년의 합은 15,231건으로 앞 그래프와 일치합니다. 자료: <Source href={ageUrl}>KOSIS 「연령(5세)/혼인지속기간(동거기간)별 이혼」</Source></p></MotionFigure>
      </section>

      <section id="regions" className="mt-16 scroll-mt-24">
        <SectionTitle number="03" title="지역을 바꾸면 ‘30년 이상’의 비중도 달라진다">17개 시도를 전부 보여주되, 건수와 구성비를 함께 읽습니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">2025년 각 지역의 이혼 신고 중 30년 이상 함께 산 부부가 차지하는 비중은 <strong>부산 22.1%</strong>, <strong>서울 22.0%</strong>로 높고, <strong>세종 9.7%</strong>로 낮았습니다. 부산은 1,119건, 서울은 2,565건, 세종은 52건입니다. 건수만 보면 지역 인구 규모가 크게 작용하므로, 아래에는 지역별 전체 이혼 건수를 분모로 계산한 비중도 나란히 표시했습니다.</p>
        <MotionFigure className="overflow-hidden rounded-[1.7rem] border border-[#e9ded4] bg-white"><figcaption className="border-b border-[#eee8e1] p-5 sm:p-7"><h3 className="editorial-h3">시도별 이혼 중 30년 이상·4년 이하의 비중</h3><p className="editorial-desc mt-1">2025년 · 괄호 안은 해당 지역 전체 이혼 중 비중 · 두 색 막대는 0~25% 공통 눈금</p><div className="mt-3 flex flex-wrap gap-4 text-sm"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#a75b45]" />30년 이상</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#605b68]" />4년 이하</span></div></figcaption><div className="divide-y divide-[#f0ece8]">{regions.map(region => {const longShare = Number(share(region.thirtyPlus, region.total)); const shortShare = Number(share(region.underFive, region.total)); return <div key={region.name} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3 px-4 py-3 sm:grid-cols-[5rem_minmax(0,1fr)] sm:px-7"><div><strong className="text-sm">{region.name}</strong><span className="mt-0.5 block text-[11px] tabular-nums text-[#827870]">전체 {format(region.total)}건</span></div><div className="space-y-1.5"><div className="grid grid-cols-[minmax(0,1fr)_6.9rem] items-center gap-2"><div className="h-2.5 overflow-hidden rounded-full bg-[#f0ece7]"><div className="motion-bar h-full rounded-full bg-[#a75b45]" style={{ width: `${longShare / 25 * 100}%` }} /></div><span className="text-right text-xs tabular-nums text-[#5d554e]">{format(region.thirtyPlus)}건 ({longShare.toFixed(1)}%)</span></div><div className="grid grid-cols-[minmax(0,1fr)_6.9rem] items-center gap-2"><div className="h-2.5 overflow-hidden rounded-full bg-[#f0ece7]"><div className="motion-bar h-full rounded-full bg-[#605b68]" style={{ width: `${shortShare / 25 * 100}%` }} /></div><span className="text-right text-xs tabular-nums text-[#5d554e]">{format(region.underFive)}건 ({shortShare.toFixed(1)}%)</span></div></div></div>})}</div><div className="border-t border-[#eee8e1] px-5 py-4 text-xs leading-relaxed text-[#756b63] sm:px-7">자료: <Source href={durationUrl}>KOSIS 「시도/혼인지속기간(동거기간)별 이혼」</Source> · 시도 외 ‘국외’ 항목은 비교에서 제외했습니다. <Source href={regionMethodUrl}>KOSIS 설명</Source>에 따르면 혼인·이혼의 지역 집계는 남편 주소지를 기준으로 합니다.</div></MotionFigure>
        <p className="editorial-body mt-5 break-keep">이 비중은 <strong>해당 지역에서 2025년에 이혼한 부부들의 구성</strong>입니다. 부산에서 오래 결혼한 부부가 이혼할 확률이 더 높다는 뜻은 아닙니다. 지역별 연령 구조와 과거 혼인 규모 등이 다르므로 원인을 이 표만으로 정할 수도 없습니다.</p>
      </section>

      <section id="ages" className="mt-16 scroll-mt-24">
        <SectionTitle number="04" title="이혼 당시 나이는 남편·아내가 다르게 보인다">부부의 동거 기간과 각 당사자의 나이는 별도의 질문입니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">2025년 이혼 신고를 한 당사자의 평균 나이는 남편 <strong>51.0세</strong>, 아내 <strong>47.7세</strong>입니다. KOSIS의 5세 구간별 건수에서는 남편은 <strong>50~54세 14,021건</strong>, 아내는 <strong>40~44세 14,235건</strong>이 각각 가장 많습니다. 아래 두 열은 같은 이혼 88,130건을 남편의 나이와 아내의 나이로 각각 분류한 것이므로 더해서 이혼 건수로 세지 않습니다.</p>
        <MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">2025년 이혼 당사자 연령별 건수</h3><p className="editorial-desc mt-1">전국 · 건 · 남편·아내 공통 기준으로 14,235건이 막대 100%</p><div className="mt-3 flex flex-wrap gap-4 text-sm"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#a75b45]" />남편</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#605b68]" />아내</span></div></figcaption><div>{divorceAges.map(row => <div key={row.label} className="grid grid-cols-[4.7rem_minmax(0,1fr)] items-center gap-2 border-b border-[#f0ece8] py-2.5 last:border-0 sm:grid-cols-[5.5rem_minmax(0,1fr)]"><span className="text-sm font-semibold text-[#403a35]">{row.label}</span><div className="space-y-1.5"><div className="grid grid-cols-[minmax(0,1fr)_4.5rem] items-center gap-2"><div className="h-2.5 rounded-full bg-[#f0ece7]"><div className="motion-bar h-full rounded-full bg-[#a75b45]" style={{ width: `${row.husbands / 14235 * 100}%` }} /></div><span className="text-right text-xs tabular-nums text-[#6b625b] sm:text-sm">{format(row.husbands)}</span></div><div className="grid grid-cols-[minmax(0,1fr)_4.5rem] items-center gap-2"><div className="h-2.5 rounded-full bg-[#f0ece7]"><div className="motion-bar h-full rounded-full bg-[#605b68]" style={{ width: `${row.wives / 14235 * 100}%` }} /></div><span className="text-right text-xs tabular-nums text-[#6b625b] sm:text-sm">{format(row.wives)}</span></div></div></div>)}</div><p className="mt-4 text-xs leading-relaxed text-[#756b63]">15세 미만은 남편·아내 모두 0건이어서 생략했습니다. 연령 미상은 남편 4건, 아내 0건입니다. 자료: <Source href={ageUrl}>KOSIS 「연령(5세)/혼인지속기간(동거기간)별 이혼」</Source></p></MotionFigure>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-[#fff4ec] p-5"><span className="editorial-desc">남편 평균 이혼 연령</span><strong className="mt-1 block text-2xl tabular-nums text-[#a74126]"><CountUpNumber value={51} decimals={1} suffix="세" /></strong></div><div className="rounded-2xl bg-[#f0eef3] p-5"><span className="editorial-desc">아내 평균 이혼 연령</span><strong className="mt-1 block text-2xl tabular-nums text-[#514c5c]"><CountUpNumber value={47.7} decimals={1} suffix="세" /></strong></div></div>
        <p className="editorial-body mt-5 break-keep">인구 규모를 고려한 <strong>연령별 이혼율</strong>은 조금 다른 질문에 답합니다. 공식 발표에서 해당 나이 인구 1천 명당 이혼은 남편 45~49세, 아내 40~44세에서 가장 높았습니다.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-[#edd5c8] bg-[#fff9f4] p-5"><span className="editorial-desc">남편 연령별 이혼율 최고 · 45~49세</span><strong className="mt-1 block text-2xl tabular-nums text-[#a74126]">인구 1천 명당 <CountUpNumber value={7} decimals={1} suffix="건" /></strong></div><div className="rounded-2xl border border-[#dddbe3] bg-[#f8f7fa] p-5"><span className="editorial-desc">아내 연령별 이혼율 최고 · 40~44세</span><strong className="mt-1 block text-2xl tabular-nums text-[#514c5c]">인구 1천 명당 <CountUpNumber value={7.7} decimals={1} suffix="건" /></strong></div></div>
        <p className="editorial-desc mt-3">앞 그래프는 건수이고, 이 숫자는 각 연령대 인구를 분모로 나눈 비율이므로 순위가 다를 수 있습니다. 자료: <Source href={briefingUrl}>국가데이터처 브리핑</Source></p>
      </section>

      <section id="children" className="mt-16 scroll-mt-24">
        <SectionTitle number="05" title="미성년 자녀가 있는 이혼은 얼마나 될까?">같은 이혼 신고를 자녀 수라는 다른 기준으로 다시 나눠 봅니다.</SectionTitle>
        <p className="editorial-body mb-6 break-keep">2025년 이혼 신고 중 미성년 자녀가 <strong>없는 경우는 49,404건(56.1%)</strong>입니다. 1명은 19,771건, 2명은 14,650건, 3명 이상은 3,020건이며, 자녀 수 미상도 1,285건 있습니다. ‘미성년 자녀 없음’은 성인 자녀도 없다는 뜻이 아닙니다.</p>
        <MotionFigure className="rounded-[1.7rem] border border-[#e9ded4] bg-white p-5 sm:p-7"><figcaption className="mb-4 border-b border-[#eee8e1] pb-4"><h3 className="editorial-h3">이혼 신고의 미성년 자녀 수</h3><p className="editorial-desc mt-1">2025년 전국 · 건 · 88,130건 중 비중</p></figcaption><div>{childrenGroups.map(group => <CountBar key={group.label} {...group} max={49404} color={group.label === '없음' ? 'bg-[#a75b45]' : 'bg-[#605b68]'} />)}</div><p className="mt-4 text-xs leading-relaxed text-[#756b63]">자녀 수 미상도 전체 분모에 포함했습니다. 자료: <Source href={childrenUrl}>KOSIS 「시도/미성년자녀수별 이혼」</Source></p></MotionFigure>
      </section>

      <section id="reading" className="mt-16 scroll-mt-24"><SectionTitle number="06" title="이 숫자로 알 수 있는 것과 없는 것">이혼 ‘건수의 구성’과 결혼 생활의 ‘이혼 위험’을 구별합니다.</SectionTitle><div className="space-y-4 rounded-[1.7rem] border border-[#e9ded4] bg-white p-6 sm:p-8"><p className="editorial-body"><strong>17.7%</strong>는 2025년에 이혼한 88,130쌍 중 30년 이상 함께 산 부부의 비중입니다. 모든 30년 차 부부 중 이혼한 비율이 아닙니다.</p><p className="editorial-body"><strong>17.6년</strong>은 그해 이혼한 부부의 평균 동거 기간입니다. 전체 결혼의 평균 지속 기간이나 앞으로 결혼할 부부의 예상 수명이 아닙니다.</p><p className="editorial-body"><strong>지역별 비중</strong>은 지역의 이혼 신고 구성입니다. 지역의 결혼 생활이 더 안정적인지 판단하려면 과거 혼인 규모와 인구 구조 등도 살펴야 합니다.</p><p className="editorial-body"><strong>당사자 나이</strong>는 이혼 신고 당시 남편과 아내의 나이를 각각 센 값입니다. 혼인 지속 기간의 30년 이상 구간과 이혼 당시 60세 이상은 서로 같은 집단이 아닙니다.</p></div><p className="editorial-body mt-6 break-keep">정리하면, 2025년 이혼에서는 30년 이상 함께 산 부부가 가장 큰 <em>공개 구간</em>을 차지했고, 폭이 같은 5년 구간 중에서는 5~9년이 가장 컸습니다. 첫 10년을 한 해씩 보면 5년 구간이 가장 많았습니다. 세 답은 서로 다른 구간과 분모를 읽은 결과입니다.</p></section>

      <aside className="mt-14 rounded-[1.7rem] bg-[#f3eee8] p-6 sm:p-8"><h2 className="editorial-h3">자료와 계산 기준</h2><ul className="editorial-desc mt-4 list-disc space-y-2 pl-5"><li><Source href={releaseUrl}>국가데이터처 「2025년 혼인·이혼 통계」(2026.03.19.)</Source>: 공식 발표와 평균 연령·동거 기간.</li><li><Source href={durationUrl}>KOSIS 「시도/혼인지속기간(동거기간)별 이혼」</Source>: 전국 및 17개 시도별 건수.</li><li><Source href={ageUrl}>KOSIS 「연령(5세)/혼인지속기간(동거기간)별 이혼」</Source>: 첫 10년 세부 구간과 이혼 당사자의 연령.</li><li><Source href={childrenUrl}>KOSIS 「시도/미성년자녀수별 이혼」</Source>: 미성년 자녀 수별 건수.</li><li><Source href={briefingUrl}>국가데이터처 브리핑</Source>: 평균 혼인 지속 기간, 평균 이혼 연령과 연령별 이혼율 설명.</li></ul><p className="editorial-desc mt-4">모든 그래프는 2025년 연간 신고 통계의 원표를 삼촌노트가 재구성했습니다. 비중은 해당 구간 건수를 각 표의 전체 이혼 건수로 나누어 소수 첫째 자리로 반올림했습니다. 혼인 지속 기간의 정의는 <Source href={definitionUrl}>2025년 공식 자료 첨부파일</Source>의 주석을 따릅니다.</p></aside>
      <div className="mt-10 border-t border-[#e8ded4] pt-6"><Link href="/guide" className="inline-flex min-h-11 items-center font-bold text-[#a74126] hover:underline">← 읽을거리 목록으로</Link></div>
    </article>
  );
}
