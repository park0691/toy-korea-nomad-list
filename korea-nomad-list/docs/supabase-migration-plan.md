# Supabase 백엔드 연동 마이그레이션 계획

> **작성일** 2026-06-27 | **대상** Korea Nomad List (Next.js 16 + Supabase) | **범위** 데이터 계층 연동 (읽기 전환 + 좋아요 영속화)

## 1. 배경 & 현재 상태

### 이미 완료된 부분 (인증 계층)
- `@supabase/ssr`, `@supabase/supabase-js` 설치 완료
- `src/lib/supabase/` — `client.ts`(브라우저) / `server.ts`(서버) / `proxy.ts`(세션 갱신·라우트 보호)
- `signIn` / `signUp` / `signOut` 서버 액션, `/login` · `/register` 페이지, `/auth/confirm` 라우트
- `.env.local` 환경변수 설정 완료 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL`)
- 실제 Auth 가입 유저 존재 → **인증 동작 확인됨**

### 남은 부분 (데이터 계층 — 이번 작업 대상)
- `public` 스키마 **테이블 0개**, 마이그레이션 0건
- 도시 데이터는 `src/data/cities.ts`의 정적 배열 9건 (홈 `FilterPanel`, 도시 상세 `cities/[id]/page.tsx`에서 import)
- `LikeDislike`는 `useState` 로컬 상태 → 새로고침 시 소실, DB 미저장

### 제약 / 선결 조건
- Supabase MCP가 `--read-only`로 설정되어 있어 쓰기 불가 → **`.mcp.json`에서 `--read-only` 제거 후 Claude Code 재시작** 필요
- `.mcp.json`에 `SUPABASE_ACCESS_TOKEN`이 평문 커밋됨 → 보안 정책상 환경변수 분리 권장 (별도 후속)

## 2. 목표

1. 도시 데이터를 정적 파일 → Supabase `cities` 테이블로 이전하고 읽기 경로 전환
2. 좋아요/싫어요를 `votes` 테이블에 로그인 사용자 기준으로 영속화
3. RLS로 데이터 접근 통제, DB 기준 TypeScript 타입 생성

## 3. 데이터 모델

### 3.1 `cities` 테이블
`src/types/city.ts`의 `City` 인터페이스 매핑.

| 컬럼 | 타입 | 비고 |
|---|---|---|
| `id` | `text` PK | 'seoul', 'jeju' 등 slug |
| `name` | `text` NOT NULL | 도시명 |
| `region` | `region_type` (enum) | 수도권/경상도/전라도/강원도/제주도/충청도 |
| `budget` | `budget_type` (enum) | 100만원 / 100~200만원 / 200만원 |
| `environments` | `environment_type[]` | 자연친화/도심선호/카페작업/코워킹 필수 |
| `best_season` | `season_type` (enum) | 봄/여름/가을/겨울 |
| `tags` | `text[]` | 해시태그 |
| `image_alt` | `text` | 이미지 대체 텍스트 |
| `likes` | `int` DEFAULT 0 | votes 집계 캐시 |
| `dislikes` | `int` DEFAULT 0 | votes 집계 캐시 |
| `created_at` | `timestamptz` DEFAULT now() | |

**enum 정의** (PRD 한글값 그대로):
- `region_type`: `수도권`, `경상도`, `전라도`, `강원도`, `제주도`, `충청도`
- `budget_type`: `100만원`, `100~200만원`, `200만원`
- `environment_type`: `자연친화`, `도심선호`, `카페작업`, `코워킹 필수`
- `season_type`: `봄`, `여름`, `가을`, `겨울`

### 3.2 `votes` 테이블

| 컬럼 | 타입 | 비고 |
|---|---|---|
| `id` | `uuid` PK DEFAULT gen_random_uuid() | |
| `user_id` | `uuid` → `auth.users(id)` ON DELETE CASCADE | |
| `city_id` | `text` → `cities(id)` ON DELETE CASCADE | |
| `vote_type` | `vote_kind` (enum: `like`/`dislike`) | |
| `created_at` | `timestamptz` DEFAULT now() | |

- **UNIQUE (`user_id`, `city_id`)** — 사용자당 도시별 1표 (좋아요↔싫어요 전환은 UPDATE)

### 3.3 카운트 동기화
`votes`의 INSERT/UPDATE/DELETE 시 트리거로 `cities.likes` / `cities.dislikes`를 재집계하여 캐시 컬럼 유지. (또는 조회 시 집계 — 트래픽 적으므로 트리거 캐시 방식 채택)

## 4. RLS 정책

| 테이블 | SELECT | INSERT / UPDATE / DELETE |
|---|---|---|
| `cities` | 전체 공개 (anon 포함) | 비허용 (시드/관리자만, 서비스 롤) |
| `votes` | 전체 공개 (집계 표시용) | `auth.uid() = user_id` 인 본인 행만 |

- 두 테이블 모두 `ENABLE ROW LEVEL SECURITY`
- `get_advisors(security)`로 RLS 누락·정책 점검

## 5. 마이그레이션 순서

1. **`0001_enums_and_cities`** — enum 4종 + `cities` 테이블 + RLS(공개 읽기)
2. **`0002_votes`** — `vote_kind` enum + `votes` 테이블 + UNIQUE + RLS(본인 쓰기)
3. **`0003_vote_count_trigger`** — 카운트 재집계 트리거 함수 & 트리거
4. **`0004_seed_cities`** — 도시 9건 INSERT (likes/dislikes 초기값 포함)

> 적용 방식: MCP 쓰기 모드 전환 후 `apply_migration`으로 순차 적용.

## 6. 애플리케이션 코드 변경

| 영역 | 변경 |
|---|---|
| 타입 | `generate_typescript_types`로 DB 타입 생성 → `src/types/city.ts` 정합 |
| 홈 (`FilterPanel` 경유) | `@/data/cities` 제거 → 서버 컴포넌트에서 `supabase.from('cities').select()` |
| 도시 상세 `cities/[id]/page.tsx` | `getCityById` → Supabase 단건 조회 + `generateStaticParams` 검토 |
| `LikeDislike.tsx` | 로컬 state → 서버 액션 + `votes` 연동, 초기 투표상태 복원, 비로그인 시 `/login` 유도 |
| 서버 액션 | `src/app/actions/votes.ts` 신설 (vote/unvote) |
| `src/data/cities.ts` | 시드 완료 후 제거 또는 시드 스크립트로만 보존 |

> ⚠️ 이 프로젝트의 Next.js 16은 breaking change 존재 (`AGENTS.md`). 코드 작성 전 `node_modules/next/dist/docs/` 해당 가이드 확인 필수. (예: 미들웨어 → `proxy.ts`)

## 7. 검증

- `@/data/cities`를 mock하던 Jest 테스트(`cities.test.ts`, `CityPage.test.tsx`) 새 데이터 소스 기준 수정
- `get_advisors(security)` RLS 점검
- 로컬 `npm run dev` 실행 — 목록/상세 로딩, 로그인 후 좋아요 영속 확인
- `npm test` 통과

## 8. 롤백

- 각 마이그레이션은 독립 파일 → 역순 `DROP`으로 롤백
- 코드는 git 브랜치(`issue-5`) 기준, 정적 `cities.ts`는 시드 검증 전까지 보존
