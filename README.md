# 삼촌생각 (Uncle Note)

생활·인테리어 자재, 급여, 세무의 참고 계산기와 가이드를 제공하는 Next.js App Router 사이트입니다. 공식 도메인은 `https://unclenote.com`이며 GitHub `thinkdove/unclenote`의 `main` 브랜치가 Vercel에 자동 배포됩니다.

## 로컬 확인

```bash
npm ci
npm run lint
npm run build
npm run dev
```

`.env.local`의 토큰과 프로젝트 자격증명은 저장소에 올리지 않습니다.

## 기준 자료 갱신

- 연도별 최저임금: [최저임금위원회 결정 현황](https://www.minimumwage.go.kr/minWage/policy/decisionMain.do).
- 국민연금 보험료율과 기준소득월액: [국민연금공단](https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0097M0.do).
- 건강·장기요양보험료율: [국민건강보험공단](https://edi.nhis.or.kr/portal/images/popup/20251204_pop01longdesc.html).
- 근로소득 원천징수: [국세청 근로소득 간이세액표 안내](https://nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7862&mi=6583).
- 간이과세 부가가치세: [국세청 세액계산 안내](https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7693&mi=2310).
- 퇴직금: [고용노동부 계산 안내](https://www.moel.go.kr/retirementpayCal.do).

기준을 바꿀 때에는 계산 컴포넌트뿐 아니라 홈·가이드의 숫자, 페이지 설명, 구조화 데이터도 함께 확인합니다. 현재 급여 소득세와 최저임금 계산기의 보험료는 참고용 추정치이며 국세청 월별 간이세액표 또는 개별 가입 조건을 대체하지 않습니다.

## 주요 경로

- `src/app/page.tsx`: 홈
- `src/components/SalaryCalculator.tsx`, `VatCalculator.tsx`: 급여·부가세 계산
- `src/app/severance-pay-calculator/page.tsx`, `wage-calculator/page.tsx`: 퇴직금·최저임금 계산
- `src/app/guide`: 읽기 콘텐츠
- `src/app/layout.tsx`, `globals.css`, `src/components/Navbar.tsx`: 공통 디자인과 탐색

`/test-banner`는 사용자가 유지하기로 한 시험 페이지입니다.
