import CityCard from './CityCard'
import type { City } from '@/types/city'

interface CityGridProps {
  cities: City[]
}

export default function CityGrid({ cities }: CityGridProps) {
  if (cities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-lg font-medium">조건에 맞는 도시가 없어요</p>
        <p className="text-sm mt-1">필터 조건을 조정해보세요</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {cities.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  )
}
