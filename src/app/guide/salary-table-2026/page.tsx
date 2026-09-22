import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Icon } from "@iconify/react";

export const metadata: Metadata = {
  title: "2026년 연봉 실수령액 표 총정리: 3,000만~1억 구간별 월급 & 공제액 분석",
  description: "2026년 최신 4대 보험 요율과 소득세 간이세액표를 반영한 연봉 구간별(3,000만~1억 원) 실제 월 실수령액 비교표와 식대 20만 원 비과세 절세 팁을 삼촌생각(Uncle Note)에서 상세히 전해드립니다.",
  keywords: ["2026 연봉 실수령액 표", "연봉 3000 실수령액", "연봉 5000 실수령액", "연봉 1억 실수령액", "4대보험 요율", "식대 비과세", "삼촌생각", "Uncle Note"],
  openGraph: {
    title: "2026년 연봉 실수령액 표 총정리: 3,000만~1억 구간별 월급 & 공제액 분석",
    description: "내 연봉의 진짜 통장 입금액은 얼마일까? 4대 보험 및 세금 공제액과 비과세 혜택까지 완벽 분석.",
    url: "https://unclenote.com/guide/salary-table-2026",
    images: [
      {
        url: "/images/salary-guide-thumbnail.jpg",
        width: 1200,
        height: 675,
        alt: "2026년 연봉 실수령액 표 인포그래픽 썸네일",
      },
    ],
  },
};

export default function SalaryGuidePage() {
  // AEO & Rich Results를 위한 Article 및 FAQ 구조화 데이터
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "2026년 연봉 실수령액 표 총정리: 3,000만~1억 구간별 월급 & 공제액 분석",
    "description": "2026년 최신 세법과 4대 보험료를 반영한 연봉 구간별 실제 수령액과 절세 가이드",
    "image": "https://unclenote.com/images/salary-guide-thumbnail.jpg",
    "author": {
      "@type": "Person",
      "name": "삼촌생각 에디터 (Uncle Note Editor)"
    },
    "publisher": {
      "@type": "Organization",
      "name": "삼촌생각 (Uncle Note)",
      "logo": {
        "@type": "ImageObject",
        "url": "https://unclenote.com/favicon.ico"
      }
    },
    "datePublished": "2026-09-22",
    "dateModified": "2026-09-22"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "2026년 연봉 5,000만 원의 실제 월 실수령액은 얼마인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "부양가족 1인(본인), 비과세 식대 월 20만 원 기준 세전 월급은 약 416.7만 원이며, 4대 보험과 소득세로 약 62만 원이 공제되어 실제 월 실수령액은 약 354만 원입니다."
        }
      },
      {
        "@type": "Question",
        "name": "연봉 1억 원의 월 실수령액이 600만 원대인 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "연봉 1억 원은 세전 월급이 약 833.3만 원이지만, 누진 소득세율(24~35% 구간 적용)과 4대 보험료 합산으로 매월 약 169만 원 가량이 공제되므로 실제 입금액은 약 664만 원 수준이 됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "식대 비과세 월 20만 원은 어떻게 절세 효과를 만드나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "식대 비과세는 소득세뿐 아니라 4대 보험(국민연금, 건강보험, 고용보험) 부과 기준 금액에서도 제외되므로 매월 약 4~5만 원, 연간 50~60만 원 이상의 실질적인 세금 및 보험료 절감 혜택이 발생합니다."
        }
      }
    ]
  };

  return (
    <article className="max-w-3xl mx-auto flex flex-col gap-12 pb-16">
      {/* 구조화 데이터 스키마 삽입 */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 빵부스러기 (Breadcrumb) */}
      <nav className="w-full text-sm font-medium text-zinc-500 mb-[-1.5rem]">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          홈
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-400">생활 가이드</span>
        <span className="mx-2">/</span>
        <span className="text-zinc-800 font-semibold">연봉 실수령액</span>
      </nav>

      {/* 헤더 섹션 (E-E-A-T 명시) */}
      <header className="flex flex-col gap-4 border-b border-zinc-100 pb-8">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-extrabold rounded-full tracking-wide">
            세무·노무 알짜 정보
          </span>
          <span className="text-xs text-zinc-400">2026.09.22 발행</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-zinc-900 leading-[1.2] tracking-tight [text-wrap:balance]">
          2026년 연봉 실수령액 표 총정리: <br className="hidden sm:inline" />
          3,000만~1억 구간별 월급 & 공제액 분석
        </h1>

        <div className="flex items-center gap-3 pt-2 text-xs text-zinc-500 font-medium">
          <span className="flex items-center gap-1 text-zinc-700 font-semibold">
            <Icon icon="solar:user-circle-bold-duotone" className="text-base text-blue-600" />
            삼촌생각 에디터
          </span>
          <span>•</span>
          <span>읽는 시간 약 3분</span>
        </div>
      </header>

      {/* 대표 이미지 (Next.js Image 최적화) */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-sm border border-zinc-200/60 bg-zinc-50">
        <Image
          src="/images/salary-guide-thumbnail.jpg"
          alt="2026년 연봉 구간별 실수령액 및 공제액 비교 분석 인포그래픽"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* AEO 최적화: 3초 핵심 요약 (TL;DR Box) */}
      <section className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 sm:p-7">
        <h2 className="text-sm font-extrabold text-blue-700 uppercase tracking-wide flex items-center gap-2 mb-3">
          <Icon icon="solar:star-fall-bold-duotone" className="text-lg" />
          3초 핵심 요약 (TL;DR)
        </h2>
        <ul className="text-[15px] text-zinc-700 space-y-2 font-medium leading-relaxed">
          <li>• <strong>연봉 3,000만 원:</strong> 월 세전 250만 원 ➔ <strong>월 실수령액 약 223만 원</strong> (공제 약 26만 원)</li>
          <li>• <strong>연봉 5,000만 원:</strong> 월 세전 416.7만 원 ➔ <strong>월 실수령액 약 354만 원</strong> (공제 약 62만 원)</li>
          <li>• <strong>연봉 7,000만 원:</strong> 월 세전 583.3만 원 ➔ <strong>월 실수령액 약 481만 원</strong> (공제 약 102만 원)</li>
          <li>• <strong>연봉 1억 원:</strong> 월 세전 833.3만 원 ➔ <strong>월 실수령액 약 664만 원</strong> (공제 약 169만 원)</li>
        </ul>
      </section>

      {/* 체류시간 확보 & 내부 링크 CTA 위젯 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <h3 className="text-lg font-bold mb-1">내 정확한 연봉으로 1초 계산해 보기</h3>
          <p className="text-sm text-blue-100">부양가족 수와 비과세액을 적용해 실제 통장 입금액을 확인하세요.</p>
        </div>
        <Link
          href="/salary-calculator"
          className="bg-white text-blue-600 font-extrabold text-sm px-6 py-3.5 rounded-full hover:bg-blue-50 transition-all duration-300 shadow-sm whitespace-nowrap flex items-center gap-2 group"
        >
          <span>계산기 바로가기</span>
          <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 본문 섹션 1: 연봉 구간별 실수령액 종합 비교표 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
          <span>📊</span>
          <span>2026년 연봉 구간별 실수령액 종합 비교표</span>
        </h2>
        <p className="text-[15px] text-zinc-600 leading-relaxed">
          본 표는 <strong>부양가족 1인(본인 기준), 비과세 식대 월 20만 원, 퇴직금 별도</strong> 조건으로 계산된 표준 수치입니다. (개인의 비과세 수당 및 세액공제 항목에 따라 약간의 오차가 있을 수 있습니다.)
        </p>

        {/* 반응형 테이블 컨테이너 */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 shadow-xs mt-2">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-700 font-bold">
              <tr>
                <th className="py-3.5 px-4">세전 연봉</th>
                <th className="py-3.5 px-4">월 세전 급여</th>
                <th className="py-3.5 px-4">4대 보험 합계</th>
                <th className="py-3.5 px-4">소득세·지방세</th>
                <th className="py-3.5 px-4">총 공제액</th>
                <th className="py-3.5 px-4 text-blue-600 font-extrabold">예상 월 실수령액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-600 font-medium">
              {[
                { annual: "3,000만 원", gross: "250.0만", insurance: "21.6만", tax: "4.8만", deduction: "26.4만", net: "223.6만 원" },
                { annual: "3,500만 원", gross: "291.6만", insurance: "25.5만", tax: "8.5만", deduction: "34.0만", net: "257.6만 원" },
                { annual: "4,000만 원", gross: "333.3만", insurance: "29.4만", tax: "12.8만", deduction: "42.2만", net: "291.1만 원" },
                { annual: "4,500만 원", gross: "375.0만", insurance: "33.3만", tax: "17.6만", deduction: "50.9만", net: "324.1만 원" },
                { annual: "5,000만 원", gross: "416.7만", insurance: "37.2만", tax: "24.9만", deduction: "62.1만", net: "354.6만 원" },
                { annual: "6,000만 원", gross: "500.0만", insurance: "45.0만", tax: "36.8만", deduction: "81.8만", net: "418.2만 원" },
                { annual: "7,000만 원", gross: "583.3만", insurance: "52.8만", tax: "49.4만", deduction: "102.2만", net: "481.1만 원" },
                { annual: "8,000만 원", gross: "666.7만", insurance: "58.1만", tax: "64.8만", deduction: "122.9만", net: "543.8만 원" },
                { annual: "9,000만 원", gross: "750.0만", insurance: "65.9만", tax: "80.4만", deduction: "146.3만", net: "603.7만 원" },
                { annual: "1억 원", gross: "833.3만", insurance: "73.7만", tax: "95.5만", deduction: "169.2만", net: "664.1만 원" },
              ].map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-zinc-50/50"}>
                  <td className="py-3 px-4 font-bold text-zinc-900">{row.annual}</td>
                  <td className="py-3 px-4">{row.gross}</td>
                  <td className="py-3 px-4">{row.insurance}</td>
                  <td className="py-3 px-4">{row.tax}</td>
                  <td className="py-3 px-4 text-red-500 font-semibold">-{row.deduction}</td>
                  <td className="py-3 px-4 font-extrabold text-blue-600">{row.net}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 본문 섹션 2: 4대 보험과 소득세 상세 분석 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
          <span>🔍</span>
          <span>내 월급에서 빠져나가는 공제 항목 완벽 분석</span>
        </h2>
        <p className="text-[15px] text-zinc-600 leading-relaxed">
          월급 명세서를 받으면 생각보다 공제액이 커서 놀라시는 분들이 많습니다. 매월 급여에서 차감되는 4대 보험과 세금은 다음과 같은 기준으로 산정됩니다:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 shadow-xs">
            <h3 className="font-bold text-zinc-900 text-base mb-2 flex items-center gap-1.5">
              <Icon icon="solar:shield-check-bold-duotone" className="text-blue-600" />
              국민연금 (4.5%)
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              근로자와 사업주가 각각 4.5%씩 총 9%를 부담합니다. 기준소득월액 상한액(617만 원)이 적용되어, 고소득자라도 월 최대 약 27만 7천 원까지만 공제됩니다.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 shadow-xs">
            <h3 className="font-bold text-zinc-900 text-base mb-2 flex items-center gap-1.5">
              <Icon icon="solar:heart-bold-duotone" className="text-blue-600" />
              건강보험 & 장기요양보험
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              건강보험료율은 <strong>3.545%</strong>이며, 장기요양보험료는 건강보험료의 <strong>12.95%</strong>가 부과됩니다. 국민연금과 달리 상한선이 매우 높아 연봉에 비례해 증가합니다.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 shadow-xs">
            <h3 className="font-bold text-zinc-900 text-base mb-2 flex items-center gap-1.5">
              <Icon icon="solar:case-round-bold-duotone" className="text-blue-600" />
              고용보험 (0.9%)
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              실직 시 실업급여 및 고용안정 사업의 재원이 됩니다. 근로자 부담 요율은 비과세를 제외한 월 급여의 <strong>0.9%</strong>입니다.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 shadow-xs">
            <h3 className="font-bold text-zinc-900 text-base mb-2 flex items-center gap-1.5">
              <Icon icon="solar:bill-list-bold-duotone" className="text-blue-600" />
              근로소득세 & 지방소득세
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              국세청 간이세액표에 따라 부양가족 수와 소득 구간별로 차등 부과되며, 지방소득세는 소득세의 <strong>10%</strong>가 추가로 부과됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* 본문 섹션 3: 식대 비과세 꿀팁 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
          <span>💡</span>
          <span>식대 비과세 한도 월 20만 원의 실질적인 절세 효과</span>
        </h2>
        <p className="text-[15px] text-zinc-600 leading-relaxed">
          과거 월 10만 원이었던 식대 비과세 한도가 <strong>월 20만 원</strong>으로 확대 적용되고 있습니다. 이 비과세 항목은 연간으로 환산하면 무려 <strong>240만 원의 소득</strong>에 대해 세금과 4대 보험료를 일절 부과하지 않는다는 뜻입니다.
        </p>
        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200/60 text-sm text-zinc-700 leading-relaxed">
          <p className="font-bold text-zinc-900 mb-1">식대 비과세 처리가 누락되면?</p>
          <p>
            만약 근로계약서상 비과세 식대 분리가 되어 있지 않고 전액 기본급으로 처리된다면, 매월 약 <strong>4~5만 원</strong> 이상의 세금과 4대 보험료를 불필요하게 더 납부하게 됩니다. 따라서 연봉 협상이나 계약서 작성 시 식대 20만 원이 비과세 항목으로 올바르게 기재되어 있는지 반드시 확인하시기 바랍니다.
          </p>
        </div>
      </section>

      {/* AEO 최적화: FAQ Section */}
      <section className="flex flex-col gap-4 pt-4">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
          <span>❓</span>
          <span>자주 묻는 질문 (FAQ)</span>
        </h2>

        <div className="flex flex-col gap-3 mt-2">
          <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 shadow-xs">
            <h3 className="font-bold text-zinc-900 text-base mb-2">
              Q. 연봉 협상 시 퇴직금 별도와 포함의 차이는 얼마나 큰가요?
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              연봉 5,000만 원 기준, <strong>퇴직금 별도</strong>는 12개월로 나누어 월 세전 416.7만 원을 받지만, <strong>퇴직금 포함</strong>은 연봉을 13으로 나누어 월 세전 약 384.6만 원만 받게 됩니다. 따라서 같은 연봉 숫자라도 실수령액에서 매월 20~30만 원 이상의 큰 차이가 발생합니다.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200/80 shadow-xs">
            <h3 className="font-bold text-zinc-900 text-base mb-2">
              Q. 부양가족이나 미성년 자녀가 있으면 실수령액이 얼마나 늘어나나요?
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">
              부양가족 1인당 연간 150만 원의 인적공제가 적용되고, 20세 이하 자녀의 경우 1명당 연간 15만 원(2명 35만 원)의 자녀세액공제가 추가되어 매월 떼이는 근로소득세가 줄어들게 됩니다. 그 결과 실제 통장에 입금되는 월 실수령액이 약 2만~5만 원 가량 늘어납니다.
            </p>
          </div>
        </div>
      </section>

      {/* E-E-A-T 확보: 공식 출처 및 면책 안내 */}
      <footer className="mt-8 pt-6 border-t border-zinc-200 text-xs text-zinc-400 flex flex-col gap-2">
        <div className="flex flex-wrap gap-4 font-semibold text-zinc-500">
          <span>참고 출처:</span>
          <a href="https://www.hometax.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">국세청 홈택스 간이세액표</a>
          <a href="https://www.nhis.or.kr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">국민건강보험공단</a>
          <a href="https://www.nps.or.kr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">국민연금공단</a>
        </div>
        <p className="leading-relaxed">
          ※ 본 안내 가이드 및 표의 계산 결과는 국세청 간이세액표와 2026년 기준 4대 보험 요율에 기반한 표준 시뮬레이션이며, 개인별 공제 현황 및 비과세 항목에 따라 실제 수령액과 다소 차이가 있을 수 있습니다.
        </p>
      </footer>
    </article>
  );
}
