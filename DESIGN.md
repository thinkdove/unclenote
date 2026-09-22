# Uncle Note (삼촌생각) Design & Typography System

## 1. Brand Identity & Visual Language
- **Style**: Warm Minimalist Editorial (Supanova Style)
- **Palette**:
  - Background Canvas: Warm Ivory (`#fdfbf7`, `#f4efe8`)
  - Typography Main: Deep Espresso (`#292520`, `#181512`)
  - Accent Point: Terracotta (`#c55232`, `#a74126`)
  - Borders & Dividers: Subtle Zinc (`border-zinc-200/80`)
  - Cards: Pure White (`#ffffff`) with subtle inset shadow (`inset_0_1px_1px_rgba(255,255,255,1)`)
- **Font**: Pretendard (`font-['Pretendard']`), fallbacks: system-ui, sans-serif

---

## 2. Standard Typography Tokens (Mobile-First Golden Scale)
모든 페이지는 인라인 폰트 크기 대신 반드시 아래의 표준 토큰 또는 동등한 rem 규격을 따릅니다:

| 토큰 클래스 | 모바일 크기 | 데스크톱 크기 | 적용 대상 | 세부 속성 |
|---|---|---|---|---|
| `.editorial-h1` | `28px ~ 32px` | `40px ~ 48px` | 페이지 메인 제목 | `font-extrabold text-[#292520] tracking-tight leading-[1.2]` |
| `.editorial-h2` | `22px ~ 24px` | `28px ~ 32px` | 섹션 대제목 | `font-extrabold text-[#292520] tracking-tight leading-snug` |
| `.editorial-h3` | `18px ~ 20px` | `20px ~ 22px` | 카드 제목, 질문 타이틀 | `font-bold text-[#292520] tracking-tight leading-snug` |
| `.editorial-body` | `16px (1rem)` | `16px ~ 17px` | 본문, 답변, 설명문단 | `text-zinc-700 leading-relaxed font-normal` (최소 16px) |
| `.editorial-desc` | `14px (0.875rem)` | `14px ~ 15px` | 팁 박스, 보조 안내문 | `text-zinc-600 leading-relaxed` (절대 12px 사용 금지) |
| `.editorial-badge`| `12px (0.75rem)` | `12px` | 태그, 연도 뱃지 | `font-bold tracking-wider text-[#c55232] uppercase` |

---

## 3. Form Input Standards (iOS Safari Zoom Prevention)
- **모든 input 및 select 태그**:
  - 폰트 크기는 **반드시 16px (`text-base`) 이상** 유지 (16px 미만 시 iOS Safari가 화면을 강제 줌인하여 레이아웃이 깨짐).
  - 터치 높이: 최소 44px ~ 48px (`py-3 px-4`).
- **클래스 토큰**: `.editorial-input`

---

## 4. Card & Layout Standards
- **Outer Shell**: `bg-black/[0.03] ring-1 ring-black/5 p-1.5 rounded-[1.8rem]`
- **Inner Card**: `bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,1)] rounded-[calc(1.8rem-0.375rem)] p-6 sm:p-8`
- **Button Standards**: 터치 타깃 최소 44px 이상, `rounded-xl` 또는 `rounded-full`

---

## 5. Zero-Mistake UI & Editorial Rules (실수 방지 절대 지침)
1. **모바일 가로 스크롤 금지**: 탭/버튼 3~5개는 `grid grid-cols-2` 또는 `flex flex-wrap`으로 한눈에 표시. 스크롤 필요 시 반드시 `.no-scrollbar`로 회색 막대 숨김.
2. **입력창 숫자와 단위 겹침 차단**: 절대 위치(`absolute`) 단위 금지. 반드시 `.editorial-input-box` Flex 컨테이너 내 형제 요소로 분리하고 `min-width: 0;` 고수.
3. **SVG 텍스트 뭉개짐 금지**: `preserveAspectRatio="none"` SVG 내부에 한글 `<text>` 금지. 텍스트 라벨은 항상 HTML/CSS 오버레이로 선명한 웹폰트 렌더링.
4. **난해한 추상 일러스트 금지**: 모호한 AI 일러스트 대신, 수치와 커트라인이 명확히 보이는 실제 데이터 기반 인포그래픽 카드(표, 뱃지, 계층 피라미드) 배치.
5. **한국어 제목 줄바꿈(외톨이 단어 방지)**: 모든 제목에 `break-keep`, `[text-wrap:balance]` 기본 탑재. 의미 단위는 `inline-block` 또는 `whitespace-nowrap`으로 처리.
6. **Next.js `'use client'` 페이지 SEO 메타데이터 필수**: 클라이언트 컴포넌트 페이지는 반드시 동일 폴더에 `layout.tsx`를 생성해 페이지 전용 Title/Description 주입.
