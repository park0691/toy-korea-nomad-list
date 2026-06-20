import type { City, FilterState } from '@/types/city'

export function filterCities(cities: City[], filters: FilterState): City[] {
  let result = cities.slice()

  if (filters.regions.length > 0) {
    result = result.filter((c) => filters.regions.includes(c.region))
  }

  result = result.filter(
    (c) =>
      c.monthlyCostMin >= filters.costMin &&
      c.monthlyCostMax <= filters.costMax
  )

  if (filters.minInternet > 0) {
    const mbpsThreshold = filters.minInternet
    result = result.filter((c) => c.actualMbps >= mbpsThreshold)
  }

  if (filters.requireCoworking) {
    result = result.filter((c) => c.coworkingCount > 0)
  }

  switch (filters.sortBy) {
    case 'overall':
      result.sort((a, b) => b.scores.overall - a.scores.overall)
      break
    case 'cost':
      result.sort((a, b) => a.monthlyCostMin - b.monthlyCostMin)
      break
    case 'internet':
      result.sort((a, b) => b.actualMbps - a.actualMbps)
      break
    case 'latest':
      result.sort((a, b) => b.reviewCount - a.reviewCount)
      break
  }

  return result
}
