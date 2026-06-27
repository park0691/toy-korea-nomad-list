import Link from 'next/link'
import LikeDislike from './LikeDislike'
import type { City } from '@/types/city'

interface CityDetailProps {
  city: City
  userVote?: 'like' | 'dislike' | null
  isAuthenticated?: boolean
}

export default function CityDetail({ city, userVote = null, isAuthenticated = false }: CityDetailProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm mb-6 transition-colors"
        >
          ← 목록으로
        </Link>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-100">{city.name}</h1>
            <span className="bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 rounded-full px-3 py-1 text-sm">
              {city.region}
            </span>
          </div>
        </div>

        <div className="h-48 bg-[#0a0a0f] border border-cyan-400/25 bg-[linear-gradient(rgba(0,229,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.07)_1px,transparent_1px)] bg-[size:18px_18px] rounded-xl flex items-center justify-center text-cyan-400/60 text-sm mb-6">
          {city.imageAlt}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="w-20 shrink-0 text-slate-500">월 예산</span>
            <span className="text-slate-100 font-medium">{city.budget}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="w-20 shrink-0 text-slate-500">최고 계절</span>
            <span className="text-slate-100 font-medium">{city.bestSeason}</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <span className="w-20 shrink-0 text-slate-500 pt-0.5">환경</span>
            <div className="flex flex-wrap gap-2">
              {city.environments.map((env) => (
                <span
                  key={env}
                  className="bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 rounded-full px-3 py-1 text-xs"
                >
                  {env}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xs text-slate-500 uppercase tracking-wider mb-3">태그</h2>
          <div className="flex flex-wrap gap-2">
            {city.tags.map((tag) => (
              <span
                key={tag}
                className="bg-fuchsia-400/10 text-fuchsia-300 border border-fuchsia-400/30 rounded-full px-3 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <LikeDislike
            cityId={city.id}
            initialLikes={city.likes}
            initialDislikes={city.dislikes}
            initialVote={userVote}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </main>
  )
}
