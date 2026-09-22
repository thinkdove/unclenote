# Supanova Design Standard Rule

앞으로 삼촌생각(Uncle Note) 및 기타 웹사이트 UI/UX 디자인을 수행할 때 **반드시** 이 기준(Supanova Premium Aesthetic)을 따릅니다.

## 1. 폰트 및 아이콘
- 폰트는 오직 **Pretendard** 만 사용합니다. (Inter, Noto Sans, Noto Serif 등 절대 금지)
- 아이콘은 **Iconify Solar** 세트만 사용합니다. (Lucide, FontAwesome 등 금지)
- 한글 타이포그래피는 `break-keep-all`과 `leading-snug` 또는 `leading-tight`를 적용하여 완벽한 줄바꿈과 자간/행간을 유지합니다.

## 2. 레이아웃 및 섀도우 (Double-Bezel Architecture)
- 단조로운 3단 그리드를 피하고 비대칭 구조나 넉넉한 여백(Whitespace, 최소 `py-24`)을 사용합니다.
- 단순한 `shadow-md`나 회색 1px border는 절대 금지합니다.
- 카드 디자인은 **'Double-Bezel'** 아키텍처를 사용합니다. 
  - 바깥쪽: `bg-black/5` (또는 `bg-white/5`), `ring-1 ring-black/5`, `p-1.5`, `rounded-[2rem]`
  - 안쪽(내용물): `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`, `rounded-[calc(2rem-0.375rem)]`

## 3. 애니메이션 및 모션 (Motion Choreography)
- 딱딱한 `linear`나 기본 `ease-in-out`은 절대 금지합니다.
- 모든 인터랙티브 요소는 스프링 물리 효과인 `transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);` 를 기본으로 사용합니다.
- 버튼 등 상호작용 요소는 hover 시 `hover:scale-[1.02]`, active 시 `active:scale-[0.98]` 효과를 필수 적용합니다.
- 화면 스크롤 시 정적인 등장은 피하고 `IntersectionObserver`나 키프레임 애니메이션(`transform: translateY(2rem)`, `filter: blur(4px)`)을 사용해 등장감을 부여합니다.

## 4. 네비게이션 및 CTA
- 상단 네비게이션은 플로팅 글래스 형태(`backdrop-blur-xl bg-white/10 border border-white/10`, `rounded-full`)를 지향합니다.
- CTA 버튼은 완전한 알약 형태(`rounded-full`, `px-8 py-4`)에 아이콘을 원형 배경(`w-8 h-8 rounded-full bg-black/5`) 안에 중첩시키는 고급스러운 구조를 사용합니다.

이 규칙은 Supanova Design Skill (taste-skill, soft-skill)을 바탕으로 구성되었으며, AI가 생성하는 모든 프론트엔드 코드에 강제 적용됩니다.
