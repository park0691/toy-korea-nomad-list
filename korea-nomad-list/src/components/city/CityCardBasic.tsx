import { Bookmark, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import ScoreBar from './ScoreBar'
import type { City } from '@/types/city'

const BADGE_STYLES: Record<string, string> = {
  인기: 'bg-rose-100 text-rose-700 border-rose-200',
  자연: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  가성비: 'bg-blue-100 text-blue-700 border-blue-200',
  문화: 'bg-purple-100 text-purple-700 border-purple-200',
  교통: 'bg-orange-100 text-orange-700 border-orange-200',
}

interface CityCardBasicProps {
  city: City
  onExpand: () => void
}

export default function CityCardBasic({ city, onExpand }: CityCardBasicProps) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-bold text-slate-400 tabular-nums">
            #{city.rank}
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-lg leading-tight">{city.name}</h3>
            <p className="text-xs text-slate-500">{city.region}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 justify-end shrink-0">
          {city.badges.map((badge) => (
            <Badge
              key={badge}
              variant="outline"
              className={`text-xs px-1.5 py-0.5 ${BADGE_STYLES[badge] ?? ''}`}
            >
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      <div className="h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-xs">
        {city.imageAlt}
      </div>

      <div className="space-y-1.5">
        <ScoreBar label="종합" icon="★" score={city.scores.overall} />
        <ScoreBar label="인터넷" icon="◎" score={city.scores.internet} />
        <ScoreBar label="생활비" icon="₩" score={city.scores.cost} />
        <ScoreBar label="안전" icon="◈" score={city.scores.safety} />
        <ScoreBar label="카페" icon="♨" score={city.scores.cafe} />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
        <span className="font-medium text-slate-700">
          월 {city.monthlyCostMin}만원~
        </span>
        <span>코워킹 {city.coworkingCount}곳</span>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onExpand}
          variant="default"
          size="sm"
          className="flex-1 bg-[#1E2A5E] hover:bg-[#162048] text-white gap-1"
        >
          상세보기
          <ChevronDown className="size-3.5" />
        </Button>
        <Button variant="outline" size="sm" className="px-3">
          <Bookmark className="size-4" />
        </Button>
      </div>
    </div>
  )
}
