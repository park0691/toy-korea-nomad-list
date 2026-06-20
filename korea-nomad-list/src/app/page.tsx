import Header from '@/components/layout/Header'
import FilterPanel from '@/components/filter/FilterPanel'
import ReviewDialog from '@/components/review/ReviewDialog'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-[#1E2A5E] text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            한국 어느 도시에서 노마드 할까?
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
            서울·부산·제주 등 주요 도시의 인터넷 속도, 생활비, 카페 밀도를 한 눈에 비교하세요.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-white/60">
            {['서울', '부산', '제주', '인천', '대전', '대구', '광주'].map((city) => (
              <span
                key={city}
                className="bg-white/10 hover:bg-white/20 cursor-pointer px-3 py-1 rounded-full transition-colors"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">빠른 정렬</span>
          {[
            { label: '📶 인터넷 빠른순', value: 'internet' },
            { label: '💰 생활비 낮은순', value: 'cost' },
            { label: '⭐ 종합 점수순', value: 'overall' },
            { label: '🕒 최신 평가순', value: 'latest' },
          ].map((opt) => (
            <button
              key={opt.value}
              className="text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-colors"
            >
              {opt.label}
            </button>
          ))}

          <div className="ml-auto">
            <ReviewDialog cityName="도시" />
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        <FilterPanel />
      </main>

      <footer className="bg-[#1E2A5E] text-white/50 text-xs py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="font-semibold text-white/70">Korea Nomad List</p>
          <p>한국 디지털 노마드를 위한 도시 비교 플랫폼</p>
          <p className="mt-2">© 2026 Korea Nomad List. Phase 1 MVP</p>
        </div>
      </footer>
    </div>
  )
}
