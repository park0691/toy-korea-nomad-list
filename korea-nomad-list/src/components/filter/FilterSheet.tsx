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
import FilterControls from './FilterControls'
import type { FilterState } from '@/types/city'

interface FilterSheetProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onReset: () => void
}

function hasActiveFilter(filters: FilterState): boolean {
  return (
    filters.budgets.length > 0 ||
    filters.regions.length > 0 ||
    filters.environments.length > 0 ||
    filters.seasons.length > 0
  )
}

export default function FilterSheet({ filters, onChange, onReset }: FilterSheetProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 lg:hidden">
          <SlidersHorizontal className="size-4" />
          필터
          {hasActiveFilter(filters) && (
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

        <FilterControls filters={filters} onChange={onChange} idPrefix="sheet-" />

        <div className="mt-6">
          <Button
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0a0a0f] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.45)]"
            onClick={() => setOpen(false)}
          >
            필터 적용
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
