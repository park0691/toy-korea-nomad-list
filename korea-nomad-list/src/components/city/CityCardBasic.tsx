import LikeDislike from './LikeDislike'
import type { City } from '@/types/city'

interface CityCardBasicProps {
  city: City
}

export default function CityCardBasic({ city }: CityCardBasicProps) {
  return (
    <div className="p-4 space-y-3">
      <div>
        <h3 className="font-bold text-slate-100 text-lg leading-tight">{city.name}</h3>
      </div>

      <div className="h-32 bg-[#0a0a0f] border border-cyan-400/25 bg-[linear-gradient(rgba(0,229,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.07)_1px,transparent_1px)] bg-[size:18px_18px] rounded-lg flex items-center justify-center text-cyan-400/60 text-xs">
        {city.imageAlt}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-16 shrink-0 text-slate-500">예산</span>
          <span className="text-slate-100 font-medium">{city.budget}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-16 shrink-0 text-slate-500">지역</span>
          <span className="text-slate-100 font-medium">{city.region}</span>
        </div>
        <div className="flex items-start gap-2 text-xs">
          <span className="w-16 shrink-0 text-slate-500 pt-0.5">환경</span>
          <div className="flex flex-wrap gap-1">
            {city.environments.map((env) => (
              <span
                key={env}
                className="bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 rounded-full px-2 py-0.5"
              >
                {env}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-16 shrink-0 text-slate-500">최고 계절</span>
          <span className="text-slate-100 font-medium">{city.bestSeason}</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-3">
        <LikeDislike initialLikes={city.likes} initialDislikes={city.dislikes} />
      </div>
    </div>
  )
}
