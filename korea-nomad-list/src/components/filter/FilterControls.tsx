import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import type {
  FilterState,
  BudgetType,
  RegionType,
  EnvironmentType,
  SeasonType,
} from '@/types/city'

const BUDGETS: BudgetType[] = ['100만원', '100~200만원', '200만원']
const REGIONS: RegionType[] = ['수도권', '경상도', '전라도', '강원도', '제주도', '충청도']
const ENVIRONMENTS: EnvironmentType[] = ['자연친화', '도심선호', '카페작업', '코워킹 필수']
const SEASONS: SeasonType[] = ['봄', '여름', '가을', '겨울']

interface FilterControlsProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  idPrefix?: string
}

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]
}

export default function FilterControls({ filters, onChange, idPrefix = '' }: FilterControlsProps) {
  const allRegionsSelected = filters.regions.length === REGIONS.length

  function toggleAllRegions() {
    onChange({ ...filters, regions: allRegionsSelected ? [] : [...REGIONS] })
  }

  return (
    <div className="space-y-5">
      {/* 예산 */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">예산</p>
        <div className="space-y-1.5">
          {BUDGETS.map((budget) => (
            <div key={budget} className="flex items-center gap-2">
              <Checkbox
                id={`${idPrefix}budget-${budget}`}
                checked={filters.budgets.includes(budget)}
                onCheckedChange={() =>
                  onChange({ ...filters, budgets: toggle(filters.budgets, budget) })
                }
              />
              <Label htmlFor={`${idPrefix}budget-${budget}`} className="text-sm cursor-pointer">
                {budget}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* 지역 */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">지역</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Checkbox
              id={`${idPrefix}region-all`}
              checked={allRegionsSelected}
              onCheckedChange={toggleAllRegions}
            />
            <Label htmlFor={`${idPrefix}region-all`} className="text-sm cursor-pointer font-medium text-cyan-300">
              전체
            </Label>
          </div>
          {REGIONS.map((region) => (
            <div key={region} className="flex items-center gap-2">
              <Checkbox
                id={`${idPrefix}region-${region}`}
                checked={filters.regions.includes(region)}
                onCheckedChange={() =>
                  onChange({ ...filters, regions: toggle(filters.regions, region) })
                }
              />
              <Label htmlFor={`${idPrefix}region-${region}`} className="text-sm cursor-pointer">
                {region}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* 환경 */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">환경</p>
        <div className="space-y-1.5">
          {ENVIRONMENTS.map((env) => (
            <div key={env} className="flex items-center gap-2">
              <Checkbox
                id={`${idPrefix}env-${env}`}
                checked={filters.environments.includes(env)}
                onCheckedChange={() =>
                  onChange({ ...filters, environments: toggle(filters.environments, env) })
                }
              />
              <Label htmlFor={`${idPrefix}env-${env}`} className="text-sm cursor-pointer">
                {env}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* 최고 계절 */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">최고 계절</p>
        <div className="space-y-1.5">
          {SEASONS.map((season) => (
            <div key={season} className="flex items-center gap-2">
              <Checkbox
                id={`${idPrefix}season-${season}`}
                checked={filters.seasons.includes(season)}
                onCheckedChange={() =>
                  onChange({ ...filters, seasons: toggle(filters.seasons, season) })
                }
              />
              <Label htmlFor={`${idPrefix}season-${season}`} className="text-sm cursor-pointer">
                {season}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
