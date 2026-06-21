export type BudgetType = '100만원' | '100~200만원' | '200만원'

export type RegionType = '수도권' | '경상도' | '전라도' | '강원도' | '제주도' | '충청도'

export type EnvironmentType = '자연친화' | '도심선호' | '카페작업' | '코워킹 필수'

export type SeasonType = '봄' | '여름' | '가을' | '겨울'

export interface City {
  id: string
  name: string
  region: RegionType
  budget: BudgetType
  environments: EnvironmentType[]
  bestSeason: SeasonType
  likes: number
  dislikes: number
  tags: string[]
  imageAlt: string
}

export interface FilterState {
  budgets: BudgetType[]
  regions: RegionType[]
  environments: EnvironmentType[]
  seasons: SeasonType[]
}
