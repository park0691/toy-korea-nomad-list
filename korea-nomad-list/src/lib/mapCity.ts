import type { Database } from '@/types/database'
import type { City } from '@/types/city'

type CityRow = Database['public']['Tables']['cities']['Row']

// DB의 snake_case row를 앱 도메인 모델(camelCase City)로 변환
export function mapCity(row: CityRow): City {
  return {
    id: row.id,
    name: row.name,
    region: row.region,
    budget: row.budget,
    environments: row.environments,
    bestSeason: row.best_season,
    likes: row.likes,
    dislikes: row.dislikes,
    tags: row.tags,
    imageAlt: row.image_alt,
  }
}
