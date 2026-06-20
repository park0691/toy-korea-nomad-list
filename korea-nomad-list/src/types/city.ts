export type BadgeType = '인기' | '자연' | '가성비' | '문화' | '교통'

export type RegionType = '수도권' | '강원' | '충청' | '영남' | '호남' | '제주'

export interface CityScores {
  overall: number
  internet: number
  cost: number
  safety: number
  cafe: number
  transport: number
  worklife: number
}

export interface City {
  id: string
  name: string
  region: RegionType
  rank: number
  badges: BadgeType[]
  scores: CityScores
  monthlyCostMin: number
  monthlyCostMax: number
  coworkingCount: number
  cafeCount: number
  actualMbps: number
  reviewCount: number
  tags: string[]
  imageAlt: string
}

export interface FilterState {
  regions: RegionType[]
  costMin: number
  costMax: number
  minInternet: 0 | 100 | 500 | 1000
  requireCoworking: boolean
  sortBy: 'overall' | 'cost' | 'internet' | 'latest'
}
