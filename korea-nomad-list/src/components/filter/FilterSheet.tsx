'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import type { FilterState, RegionType } from '@/types/city'

const REGIONS: RegionType[] = ['수도권', '강원', '충청', '영남', '호남', '제주']

interface FilterSheetProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onReset: () => void
}

export default function FilterSheet({ filters, onChange, onReset }: FilterSheetProps) {
  const [open, setOpen] = useState(false)

  function toggleRegion(region: RegionType) {
    onChange({
      ...filters,
      regions: filters.regions.includes(region)
        ? filters.regions.filter((r) => r !== region)
        : [...filters.regions, region],
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 lg:hidden">
          <SlidersHorizontal className="size-4" />
          필터
          {(filters.regions.length > 0 || filters.requireCoworking || filters.minInternet > 0) && (
            <span className="size-4 rounded-full bg-cyan-400 text-[#0a0a0f] text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.7)]">
              !
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>필터 설정</SheetTitle>
            <Button variant="ghost" size="sm" className="text-xs" onClick={onReset}>
              초기화
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">지역</p>
            <div className="space-y-2">
              {REGIONS.map((region) => (
                <div key={region} className="flex items-center gap-2">
                  <Checkbox
                    id={`sheet-region-${region}`}
                    checked={filters.regions.includes(region)}
                    onCheckedChange={() => toggleRegion(region)}
                  />
                  <Label htmlFor={`sheet-region-${region}`} className="text-sm cursor-pointer">
                    {region}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">월 생활비</p>
            <Slider
              min={0}
              max={500}
              step={10}
              value={[filters.costMin, filters.costMax]}
              onValueChange={([min, max]) =>
                onChange({ ...filters, costMin: min, costMax: max })
              }
            />
            <div className="flex justify-between text-xs text-slate-400 tabular-nums">
              <span>{filters.costMin}만원</span>
              <span>{filters.costMax}만원</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">최소 인터넷</p>
            <RadioGroup
              value={String(filters.minInternet)}
              onValueChange={(v) =>
                onChange({
                  ...filters,
                  minInternet: Number(v) as FilterState['minInternet'],
                })
              }
              className="space-y-2"
            >
              {([0, 100, 500, 1000] as const).map((speed) => (
                <div key={speed} className="flex items-center gap-2">
                  <RadioGroupItem value={String(speed)} id={`sheet-speed-${speed}`} />
                  <Label htmlFor={`sheet-speed-${speed}`} className="text-sm cursor-pointer">
                    {speed === 0 ? '상관없음' : `${speed}Mbps 이상`}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div className="flex items-center gap-2">
            <Checkbox
              id="sheet-coworking"
              checked={filters.requireCoworking}
              onCheckedChange={(checked) =>
                onChange({ ...filters, requireCoworking: !!checked })
              }
            />
            <Label htmlFor="sheet-coworking" className="text-sm cursor-pointer">
              코워킹스페이스 있음
            </Label>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">정렬</p>
            <RadioGroup
              value={filters.sortBy}
              onValueChange={(v) =>
                onChange({ ...filters, sortBy: v as FilterState['sortBy'] })
              }
              className="space-y-2"
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
                  <RadioGroupItem value={opt.value} id={`sheet-sort-${opt.value}`} />
                  <Label htmlFor={`sheet-sort-${opt.value}`} className="text-sm cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0a0a0f] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.45)]" onClick={() => setOpen(false)}>
            필터 적용
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
