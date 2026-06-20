import { Bookmark, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import ScoreBar from './ScoreBar'
import type { City } from '@/types/city'

const BADGE_STYLES: Record<string, string> = {
  인기: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/50',
  자연: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/50',
  가성비: 'bg-sky-400/10 text-sky-300 border-sky-400/50',
  문화: 'bg-violet-500/10 text-violet-300 border-violet-500/50',
  교통: 'bg-amber-400/10 text-amber-300 border-amber-400/50',
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
          <span className="text-xs font-bold text-cyan-400 tabular-nums">
            #{city.rank}
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-100 text-lg leading-tight">{city.name}</h3>
            <p className="text-xs text-slate-400">{city.region}</p>
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

      <div className="h-32 bg-[#0a0a0f] border border-cyan-400/25 bg-[linear-gradient(rgba(0,229,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.07)_1px,transparent_1px)] bg-[size:18px_18px] rounded-lg flex items-center justify-center text-cyan-400/60 text-xs">
        {city.imageAlt}
      </div>

      <div className="space-y-1.5">
        <ScoreBar label="종합" icon="★" score={city.scores.overall} />
        <ScoreBar label="인터넷" icon="◎" score={city.scores.internet} />
        <ScoreBar label="생활비" icon="₩" score={city.scores.cost} />
        <ScoreBar label="안전" icon="◈" score={city.scores.safety} />
        <ScoreBar label="카페" icon="♨" score={city.scores.cafe} />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-2">
        <span className="font-medium text-slate-200">
          월 {city.monthlyCostMin}만원~
        </span>
        <span>코워킹 {city.coworkingCount}곳</span>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onExpand}
          variant="default"
          size="sm"
          className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-[#0a0a0f] font-semibold gap-1 shadow-[0_0_15px_rgba(0,229,255,0.45)] hover:shadow-[0_0_22px_rgba(0,229,255,0.65)]"
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
