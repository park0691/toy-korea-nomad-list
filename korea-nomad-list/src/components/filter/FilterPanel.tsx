'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { filterCities } from '@/lib/filterCities'
import CityGrid from '@/components/city/CityGrid'
import FilterControls from './FilterControls'
import FilterSheet from './FilterSheet'
import type { City, FilterState } from '@/types/city'

const DEFAULT_FILTERS: FilterState = {
  budgets: [],
  regions: [],
  environments: [],
  seasons: [],
}

interface FilterPanelProps {
  cities: City[]
}

export default function FilterPanel({ cities }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const filteredCities = filterCities(cities, filters)

  function reset() {
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <div className="flex gap-6">
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="bg-[#12121a] rounded-xl border border-cyan-400/20 shadow-[0_0_20px_rgba(0,229,255,0.08)] p-4 space-y-5 sticky top-20">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-cyan-300 text-sm">필터</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7 px-2 text-slate-400 hover:text-cyan-300 hover:bg-cyan-400/10"
              onClick={reset}
            >
              초기화
            </Button>
          </div>

          <FilterControls filters={filters} onChange={setFilters} idPrefix="panel-" />
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-bold text-slate-100 mb-3">도시 리스트</h2>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-400">
            <span className="font-semibold text-cyan-300">{filteredCities.length}개</span> 도시
          </p>
          <FilterSheet filters={filters} onChange={setFilters} onReset={reset} />
        </div>
        <CityGrid cities={filteredCities} />
      </div>
    </div>
  )
}
