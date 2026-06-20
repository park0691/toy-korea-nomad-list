'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cities as allCities } from '@/data/cities'
import { filterCities } from '@/lib/filterCities'
import CityGrid from '@/components/city/CityGrid'
import FilterSheet from './FilterSheet'
import type { FilterState, RegionType } from '@/types/city'

const REGIONS: RegionType[] = ['수도권', '강원', '충청', '영남', '호남', '제주']

const DEFAULT_FILTERS: FilterState = {
  regions: [],
  costMin: 0,
  costMax: 500,
  minInternet: 0,
  requireCoworking: false,
  sortBy: 'overall',
}

export default function FilterPanel() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const filteredCities = filterCities(allCities, filters)

  function toggleRegion(region: RegionType) {
    setFilters((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }))
  }

  function reset() {
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <div className="flex gap-6">
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-5 sticky top-20">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 text-sm">필터</h2>
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2 text-slate-500" onClick={reset}>
              초기화
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">지역</p>
            <div className="space-y-1.5">
              {REGIONS.map((region) => (
                <div key={region} className="flex items-center gap-2">
                  <Checkbox
                    id={`region-${region}`}
                    checked={filters.regions.includes(region)}
                    onCheckedChange={() => toggleRegion(region)}
                  />
                  <Label htmlFor={`region-${region}`} className="text-sm cursor-pointer">
                    {region}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">월 생활비</p>
            <Slider
              min={0}
              max={500}
              step={10}
              value={[filters.costMin, filters.costMax]}
              onValueChange={([min, max]) =>
                setFilters((prev) => ({ ...prev, costMin: min, costMax: max }))
              }
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-slate-500 tabular-nums">
              <span>{filters.costMin}만원</span>
              <span>{filters.costMax}만원</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">최소 인터넷</p>
            <RadioGroup
              value={String(filters.minInternet)}
              onValueChange={(v) =>
                setFilters((prev) => ({
                  ...prev,
                  minInternet: Number(v) as FilterState['minInternet'],
                }))
              }
              className="space-y-1.5"
            >
              {([0, 100, 500, 1000] as const).map((speed) => (
                <div key={speed} className="flex items-center gap-2">
                  <RadioGroupItem value={String(speed)} id={`speed-${speed}`} />
                  <Label htmlFor={`speed-${speed}`} className="text-sm cursor-pointer">
                    {speed === 0 ? '상관없음' : `${speed}Mbps 이상`}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div className="flex items-center gap-2">
            <Checkbox
              id="coworking"
              checked={filters.requireCoworking}
              onCheckedChange={(checked) =>
                setFilters((prev) => ({ ...prev, requireCoworking: !!checked }))
              }
            />
            <Label htmlFor="coworking" className="text-sm cursor-pointer">
              코워킹스페이스 있음
            </Label>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">정렬</p>
            <RadioGroup
              value={filters.sortBy}
              onValueChange={(v) =>
                setFilters((prev) => ({ ...prev, sortBy: v as FilterState['sortBy'] }))
              }
              className="space-y-1.5"
            >
              {(
                [
                  { value: 'overall', label: '종합점수순' },
                  { value: 'cost', label: '생활비 낮은순' },
                  { value: 'internet', label: '인터넷 빠른순' },
                  { value: 'latest', label: '최신 평가순' },
                ] as const
              ).map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <RadioGroupItem value={opt.value} id={`sort-${opt.value}`} />
                  <Label htmlFor={`sort-${opt.value}`} className="text-sm cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-slate-800">{filteredCities.length}개</span> 도시
          </p>
          <FilterSheet
            filters={filters}
            onChange={setFilters}
            onReset={reset}
          />
        </div>
        <CityGrid cities={filteredCities} />
      </div>
    </div>
  )
}
