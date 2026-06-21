# Korea Nomad List 개선 실행 계획

> 각 Phase는 독립적으로 실행 가능하며, 순차적으로 진행 시 프로젝트가 점진적으로 개선됩니다.
> 데이터베이스는 사용하지 않으며 가짜(mock) 데이터로 진행합니다. (`src/data/cities.ts`)
> 좋아요/싫어요 상태는 컴포넌트 로컬 상태(`useState`)로 관리하며, DB 연동은 추후 단계로 미룹니다.

## 공통 컨텍스트 (모든 에이전트 필독)

- **프레임워크**: Next.js 16 (App Router), TypeScript, React 19
- **스타일**: Tailwind CSS 4, 네온 사이버 테마(시안 `#00e5ff` + 마젠타 `#ff2bd6`), Radix UI + Lucide 아이콘
- **경로 별칭**: `@/*` → `src/*`
- **주요 파일 위치**
  - 홈: `src/app/page.tsx`
  - 헤더: `src/components/layout/Header.tsx`
  - 도시 카드: `src/components/city/CityCard.tsx`, `CityCardBasic.tsx`, `CityCardExpanded.tsx`, `CityGrid.tsx`, `ScoreBar.tsx`
  - 필터: `src/components/filter/FilterPanel.tsx`, `FilterSheet.tsx`, `src/lib/filterCities.ts`
  - 타입: `src/types/city.ts`
  - 데이터: `src/data/cities.ts`
  - 리뷰: `src/components/review/ReviewDialog.tsx`
- **인증 페이지(보존 대상)**: `src/app/login`, `src/app/register`, `src/app/auth/confirm`, `src/app/actions/auth.ts`, `src/lib/supabase/*`
- **새 도메인 정의 (이 프로젝트의 기준값)**
  - **예산(budget)**: `100만원` · `100~200만원` · `200만원`
  - **지역(region)**: `수도권` · `경상도` · `전라도` · `강원도` · `제주도` · `충청도` (+ 필터 UI 전용 `전체`)
  - **환경(environment)**: `자연친화` · `도심선호` · `카페작업` · `코워킹 필수`
  - **최고 계절(bestSeason)**: `봄` · `여름` · `가을` · `겨울`

---

## Phase 1 — 네비게이션 및 불필요 페이지/링크 정리

### 개선 오버뷰
홈페이지와 인증 페이지만 남기고, 다른 페이지로 이동하는 네비게이션 요소를 제거한다. 인증/프로필 관련 버튼만 남긴다. 가장 위험도가 낮은 정리 작업으로 먼저 진행한다.

### 작업 항목
- [x] `Header.tsx`에서 네비게이션 링크(`도시 목록`, `커뮤니티`, `밋업`) 제거
- [x] `Header.tsx`의 인증 버튼(`로그인`, `회원가입`)은 그대로 유지
- [x] `Header.tsx`의 로고는 클릭 시 홈(`/`)으로만 이동하도록 유지 (기존 div → Link 변환)
- [x] 홈(`/`), 로그인, 회원가입, 인증 콜백 외 라우트가 `src/app` 하위에 있는지 확인하고 있으면 삭제 (현재는 없음 → 확인 완료)
- [x] 홈 `page.tsx`의 "빠른 정렬" 영역에 있는 `ReviewDialog`(별점 리뷰 작성 모달) 노출 제거 여부 결정 — 별점 제거 방향성과 충돌하므로 **숨김 처리**
- [x] 푸터/헤더 내 존재하지 않는 페이지로 향하는 링크가 없는지 점검 (푸터는 텍스트만, 확인 완료)

### 완료 후 검증
- [x] 헤더에 `로그인`, `회원가입` 버튼만 보이고 다른 메뉴 링크가 없다
- [x] 로고 클릭 시 홈으로 이동한다
- [x] `로그인`/`회원가입` 버튼이 각각 `/login`, `/register`로 정상 이동한다
- [x] 클릭 시 404가 발생하는 네비게이션 요소가 하나도 없다
- [x] 빌드/타입체크 통과 (`npm run lint` + `npx tsc --noEmit` 오류 없음)

---

## Phase 2 — 데이터 모델 및 가짜 데이터 재정의 (기반 작업)

### 개선 오버뷰
별점 기반 점수 모델을 제거하고, 새 도메인(예산/지역/환경/최고 계절/좋아요·싫어요)에 맞춰 `City` 타입과 mock 데이터를 재설계한다. 이후 모든 Phase(카드·필터·정렬)가 이 모델에 의존하므로 가장 먼저 정확히 구축한다.

### 작업 항목
- [x] `src/types/city.ts`의 `City` 타입 재정의
  - [x] `scores`(별점 7종), `actualMbps`, `coworkingCount`, `cafeCount`, `monthlyCostMin/Max`, `rank`, `reviewCount` 등 별점/상세 전용 필드 제거
  - [x] 신규 필드 추가:
    - `budget: '100만원' | '100~200만원' | '200만원'`
    - `region: '수도권' | '경상도' | '전라도' | '강원도' | '제주도' | '충청도'`
    - `environments: EnvironmentType[]` (`'자연친화' | '도심선호' | '카페작업' | '코워킹 필수'`, 복수 가능)
    - `bestSeason: SeasonType` (`'봄' | '여름' | '가을' | '겨울'`)
    - `likes: number`, `dislikes: number` (초기 좋아요/싫어요 수)
- [x] `src/data/cities.ts`의 모든 도시 데이터를 신규 타입에 맞게 수정 (강릉 추가로 8개 도시)
  - [x] 기존 region 값 매핑 완료 (영남→경상도, 호남→전라도, 강원→강원도, 충청→충청도, 제주→제주도, 수도권 유지)
  - [x] 강릉(강원도) 신규 추가로 6개 지역 전부 커버
  - [x] 각 도시에 예산/지역/환경/최고 계절 값 부여 완료
  - [x] 도시별 `likes`/`dislikes` 초기값 상이하게 설정
- [x] 제거된 필드를 참조하던 타입/유틸 컴파일 오류 임시 정리
  - [x] `FilterState` → `{ regions: RegionType[] }` 로 단순화
  - [x] `filterCities.ts` → 지역 필터 + likes 정렬로 단순화
  - [x] `FilterPanel.tsx` / `FilterSheet.tsx` → 지역 필터만 유지
  - [x] `CityCardBasic.tsx` / `CityCardExpanded.tsx` → 임시 스텁 (Phase 3/4에서 완성)
  - [x] `ScoreBar.tsx` 삭제

### 완료 후 검증
- [x] `src/types/city.ts`와 `src/data/cities.ts`가 타입 오류 없이 컴파일된다
- [x] 모든 도시가 `budget`, `region`, `environments`(1개 이상), `bestSeason`, `likes`, `dislikes` 값을 갖는다
- [x] 6개 지역이 데이터에 모두 한 번 이상 등장한다 (강릉=강원도)
- [x] 4개 환경 값이 데이터 전체에 골고루 분포한다
- [x] `likes` 값이 도시마다 달라 정렬 결과가 유의미하다
- [x] `npm run lint` + `npx tsc --noEmit` 오류 없음

---

## Phase 3 — 별점 제거 및 좋아요/싫어요 시스템 도입

### 개선 오버뷰
카드의 별점/점수 막대(ScoreBar)를 제거하고 `[좋아요]` `[싫어요]` 버튼만 남긴다. 버튼 클릭 시 상태에 따라 아이콘 색상과 카운트가 변경된다.

### 동작 규격
- 기본 상태: 좋아요/싫어요 모두 비활성(중립 색)
- 좋아요 클릭 → 좋아요 활성(예: 시안 강조), `likes +1`. 이미 활성 시 다시 클릭하면 해제(`likes -1`, 중립)
- 싫어요 클릭 → 싫어요 활성(예: 마젠타/레드 강조), `dislikes +1`. 재클릭 시 해제
- 좋아요/싫어요는 **상호 배타적**: 좋아요 활성 상태에서 싫어요 클릭 시 좋아요 해제 후 싫어요 활성(카운트 동시 반영)

### 작업 항목
- [x] `ScoreBar.tsx` 사용 제거 (Phase 2에서 삭제 완료)
- [x] 카드에서 별점 관련 표기(종합 ★ 등) 전부 제거 (Phase 2 스텁에서 완료)
- [x] 좋아요/싫어요 버튼 컴포넌트 추가 (`src/components/city/LikeDislike.tsx`)
  - [x] Lucide `ThumbsUp` / `ThumbsDown` 아이콘 사용
  - [x] `likes`/`dislikes` 초기값을 props로 받아 `useState`로 관리
  - [x] 활성 상태에 따라 아이콘/텍스트 색상 토글 (좋아요=시안, 싫어요=마젠타)
  - [x] 카운트 숫자 실시간 변경
  - [x] 상호 배타 로직 적용
- [x] `ReviewDialog` 완전 삭제 (`src/components/review/` 디렉터리 제거)

### 완료 후 검증
- [x] 카드 어디에도 별점/점수 막대가 표시되지 않는다
- [x] 좋아요 클릭 시 아이콘 색상이 강조되고 숫자가 +1 된다
- [x] 좋아요 재클릭 시 해제되고 숫자가 -1 된다
- [x] 싫어요도 동일하게 토글/카운트 동작한다
- [x] 좋아요 활성 → 싫어요 클릭 시 좋아요가 해제되고 싫어요가 활성화된다(카운트 양쪽 반영)
- [x] 페이지 새로고침 전까지 각 카드 상태가 독립적으로 유지된다
- [x] `npm run lint` + `npx tsc --noEmit` 오류 없음

---

## Phase 4 — 카드 구조 변경 (Key-Value 표시 + 상세보기 제거)

### 개선 오버뷰
펼치기/접기 구조와 `상세보기`(자세히 보기) 버튼을 제거하고, 단일 카드에 **예산·지역·환경·최고 계절**을 Key-Value 형태로 보여준다. 하단에는 Phase 3의 좋아요/싫어요 버튼을 배치한다.

### 작업 항목
- [x] `CityCard.tsx`의 펼치기/접기(`expanded` 상태) 로직 제거 → 단일 카드 렌더링
- [x] `상세보기` 버튼 및 `ChevronDown`/`접기` 토글 제거
- [x] `CityCardExpanded.tsx` 삭제
- [x] `CityCardBasic.tsx`를 Key-Value 레이아웃으로 재구성
  - [x] `예산`: {budget} 값 표시
  - [x] `지역`: {region} 값 표시
  - [x] `환경`: {environments} 시안 칩 나열
  - [x] `최고 계절`: {bestSeason} 값 표시
- [x] 도시명 + 이미지 플레이스홀더 유지
- [x] 카드 하단에 좋아요/싫어요 버튼 배치 (구분선 위)
- [x] 기존 코워킹/카페/인터넷 등 구 필드 표기 제거
- [x] 네온 테마 일관성 유지 (시안 칩, 마젠타 싫어요)

### 완료 후 검증
- [x] 카드에 `상세보기`/`자세히 보기`/`접기` 버튼이 없다
- [x] 모든 카드가 예산·지역·환경·최고 계절을 Key-Value로 표시한다
- [x] Key-Value 값이 해당 도시의 데이터와 정확히 일치한다
- [x] 환경이 여러 개인 도시는 모두 표시된다
- [x] 좋아요/싫어요 버튼이 카드 내에서 정상 동작한다
- [x] `npm run lint` + `npx tsc --noEmit` 오류 없음

---

## Phase 5 — 필터 재정의

### 개선 오버뷰
기존 필터(생활비 슬라이더·인터넷·코워킹·지역 6종·정렬)를 새 도메인 기준으로 교체한다: 예산, 지역(전체 포함), 환경, 최고 계절.

### 작업 항목
- [x] `src/types/city.ts`의 `FilterState` 재정의
  - [x] `budgets: BudgetType[]` (선택된 예산 다중 선택)
  - [x] `regions: RegionType[]` (`전체` 선택 시 전 지역)
  - [x] `environments: EnvironmentType[]`
  - [x] `seasons: SeasonType[]`
  - [x] 구 필드(`costMin/Max`, `minInternet`, `requireCoworking`) Phase 2에서 이미 제거됨
- [x] `FilterControls.tsx` 신규 생성 (FilterPanel·FilterSheet 공유 UI, SOLID DRY)
- [x] `FilterPanel.tsx` 재구성
  - [x] **예산**: `100만원` / `100~200만원` / `200만원` 체크박스
  - [x] **지역**: `전체` + 6개 지역 체크박스 (`전체` 토글 시 전체 선택/해제)
  - [x] **환경**: 4개 환경 체크박스
  - [x] **최고 계절**: 봄/여름/가을/겨울 체크박스
  - [x] `초기화` 버튼 유지
- [x] `FilterSheet.tsx`(모바일) 동일 항목으로 동기화 (FilterControls 재사용)
- [x] `src/lib/filterCities.ts` 로직 교체
  - [x] 카테고리 내 OR, 카테고리 간 AND
  - [x] 아무것도 선택 안 하면 전체 노출
  - [x] 환경은 교집합 존재 시 통과

### 완료 후 검증
- [x] 4개 필터 카테고리(예산/지역/환경/최고 계절)가 모두 표시된다
- [x] 예산 필터 선택 시 해당 예산 도시만 노출된다
- [x] 지역 `전체` 체크 시 모든 지역이 선택/해제된다
- [x] 환경 필터가 복수 환경 도시에 대해 올바르게 매칭된다
- [x] 계절 필터가 정상 동작한다
- [x] 여러 카테고리 동시 선택 시 AND 조건으로 좁혀진다
- [x] `초기화` 클릭 시 전체 목록으로 복원된다
- [x] 모바일 필터 시트가 데스크톱과 동일하게 동작한다
- [x] 필터 결과 개수(`N개 도시`) 표기가 실제와 일치한다
- [x] `npm run lint` + `npx tsc --noEmit` 오류 없음

---

## Phase 6 — '도시 리스트' 섹션 및 좋아요 순 정렬

### 개선 오버뷰
'TOP 추천 도시' 제목을 '도시 리스트'로 변경하고, 모든 도시를 좋아요 수 내림차순으로 나열한다. (현재 명시적 'TOP 추천 도시' 제목은 없으므로, 도시 그리드 상단에 '도시 리스트' 섹션 제목을 신설/정정한다.)

### 작업 항목
- [x] 도시 그리드 상단에 섹션 제목 `도시 리스트` 추가 (`FilterPanel.tsx` 결과 영역 상단)
- [x] 기존 유사 제목 없음 확인. 'TOP 추천 도시' 문구 코드베이스 전체에 없음
- [x] 도시 정렬 **좋아요(likes) 내림차순** 기본 적용 (Phase 2/3에서 구현, 유지)
  - [x] 좋아요 동점 시 이름 가나다순 보조 정렬 (`localeCompare`)
- [x] 구 정렬 잔재 정리
  - [x] '빠른 정렬' 바 (인터넷/생활비/종합/최신 평가순 버튼) 제거 — 새 데이터 모델과 무관한 dead UI
  - [x] 히어로 도시 칩 목록에 강릉 추가 (8개 도시와 동기화)

### 완료 후 검증
- [x] 그리드 상단 제목이 `도시 리스트`로 표시된다
- [x] 도시가 좋아요 수가 많은 순서대로 나열된다
- [x] 필터 적용 후에도 좋아요 순 정렬이 유지된다
- [x] 좋아요 동점 도시의 순서가 일관적이다 (이름 보조 정렬)
- [x] 'TOP 추천 도시' 등 기존 문구가 어디에도 남아있지 않다
- [x] `npm run lint` + `npx tsc --noEmit` 오류 없음

---

## 전체 완료 기준 (최종 점검)

- [ ] 페이지는 홈 + 인증(로그인/회원가입/콜백)만 존재한다
- [ ] 네비게이션에 인증 버튼 외 페이지 이동 링크가 없다
- [ ] 별점이 완전히 제거되고 좋아요/싫어요만 존재하며 토글·카운트가 동작한다
- [ ] 카드가 예산·지역·환경·최고 계절을 Key-Value로 표시한다
- [ ] `자세히 보기`/`상세보기` 버튼이 없다
- [ ] 필터가 예산·지역·환경·최고 계절 기준으로 동작한다
- [ ] 가짜 데이터의 모든 도시가 4개 도메인 값을 보유한다
- [ ] `도시 리스트` 제목 아래 좋아요 순으로 도시가 나열된다
- [ ] `npm run build` 및 타입체크가 통과한다
