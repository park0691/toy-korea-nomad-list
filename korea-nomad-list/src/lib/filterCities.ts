import type { City, FilterState } from '@/types/city'

export function filterCities(cities: City[], filters: FilterState): City[] {
  let result = cities.slice()

  if (filters.budgets.length > 0) {
    result = result.filter((c) => filters.budgets.includes(c.budget))
  }
  if (filters.regions.length > 0) {
    result = result.filter((c) => filters.regions.includes(c.region))
  }
  if (filters.environments.length > 0) {
    result = result.filter((c) =>
      c.environments.some((e) => filters.environments.includes(e))
    )
  }
  if (filters.seasons.length > 0) {
    result = result.filter((c) => filters.seasons.includes(c.bestSeason))
  }

  result.sort((a, b) => b.likes - a.likes || a.name.localeCompare(b.name))

  return result
}
