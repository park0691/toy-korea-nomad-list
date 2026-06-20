import { Bookmark, ChevronUp, MapPin, MessageSquare } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import ScoreBar from './ScoreBar'
import type { City } from '@/types/city'

const BADGE_STYLES: Record<string, string> = {
  인기: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/50',
  자연: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/50',
  가성비: 'bg-sky-400/10 text-sky-300 border-sky-400/50',
  문화: 'bg-violet-500/10 text-violet-300 border-violet-500/50',
  교통: 'bg-amber-400/10 text-amber-300 border-amber-400/50',
}

interface CityCardExpandedProps {
  city: City
  onCollapse: () => void
}

export default function CityCardExpanded({ city, onCollapse }: CityCardExpandedProps) {
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

      <div className="h-44 bg-[#0a0a0f] border border-cyan-400/25 bg-[linear-gradient(rgba(0,229,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.07)_1px,transparent_1px)] bg-[size:18px_18px] rounded-lg flex items-center justify-center text-cyan-400/60 text-xs">
        {city.imageAlt}
      </div>

      <div className="space-y-1.5">
        <ScoreBar label="종합" icon="★" score={city.scores.overall} />
        <ScoreBar label="인터넷" icon="◎" score={city.scores.internet} />
        <ScoreBar label="생활비" icon="₩" score={city.scores.cost} />
        <ScoreBar label="안전" icon="◈" score={city.scores.safety} />
        <ScoreBar label="카페" icon="♨" score={city.scores.cafe} />
        <ScoreBar label="교통" icon="✈" score={city.scores.transport} />
        <ScoreBar label="워라밸" icon="☀" score={city.scores.worklife} />
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/5 border border-cyan-400/15 rounded-lg p-2.5">
          <p className="text-slate-400 mb-0.5">실측 인터넷</p>
          <p className="font-bold text-cyan-300 text-sm tabular-nums">
            {city.actualMbps.toLocaleString()} Mbps
          </p>
          <p className="text-slate-500 mt-0.5">최근 {city.reviewCount}건</p>
        </div>
        <div className="bg-white/5 border border-cyan-400/15 rounded-lg p-2.5">
          <p className="text-slate-400 mb-0.5">월 생활비</p>
          <p className="font-bold text-cyan-300 text-sm tabular-nums">
            {city.monthlyCostMin}~{city.monthlyCostMax}만원
          </p>
          <p className="text-slate-500 mt-0.5">예상 범위</p>
        </div>
        <div className="bg-white/5 border border-cyan-400/15 rounded-lg p-2.5">
          <p className="text-slate-400 mb-0.5">코워킹</p>
          <p className="font-bold text-cyan-300 text-sm tabular-nums">
            {city.coworkingCount}곳
          </p>
        </div>
        <div className="bg-white/5 border border-cyan-400/15 rounded-lg p-2.5">
          <p className="text-slate-400 mb-0.5">카페</p>
          <p className="font-bold text-cyan-300 text-sm tabular-nums">
            {city.cafeCount.toLocaleString()}+
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
          <MessageSquare className="size-3.5" />
          리뷰 {city.reviewCount}개
        </Button>
        <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
          <MapPin className="size-3.5" />
          지도보기
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {city.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/40 rounded-full px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-2 border-t border-white/10 pt-2">
        <Button
          onClick={onCollapse}
          variant="ghost"
          size="sm"
          className="flex-1 gap-1 text-slate-400 hover:text-cyan-300 hover:bg-cyan-400/10"
        >
          <ChevronUp className="size-3.5" />
          접기
        </Button>
        <Button variant="outline" size="sm" className="px-3">
          <Bookmark className="size-4" />
        </Button>
      </div>
    </div>
  )
}
