import Header from '@/components/layout/Header'
import FilterPanel from '@/components/filter/FilterPanel'
import ReviewDialog from '@/components/review/ReviewDialog'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="relative bg-[#0a0a0f] border-b border-cyan-400/20 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.18),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(255,43,214,0.14),transparent_55%)]"
        />
        <div className="relative max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,229,255,0.45)]">
            한국 어느 도시에서 노마드 할까?
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
            서울·부산·제주 등 주요 도시의 인터넷 속도, 생활비, 카페 밀도를 한 눈에 비교하세요.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            {['서울', '부산', '제주', '인천', '대전', '대구', '광주'].map((city) => (
              <span
                key={city}
                className="bg-cyan-400/5 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/15 hover:border-cyan-400/70 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer px-3 py-1 rounded-full transition-all"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#12121a] border-b border-fuchsia-500/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-fuchsia-400 uppercase tracking-widest">빠른 정렬</span>
          {[
            { label: '📶 인터넷 빠른순', value: 'internet' },
            { label: '💰 생활비 낮은순', value: 'cost' },
            { label: '⭐ 종합 점수순', value: 'overall' },
            { label: '🕒 최신 평가순', value: 'latest' },
          ].map((opt) => (
            <button
              key={opt.value}
              className="text-xs px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-slate-300 hover:bg-cyan-400/15 hover:border-cyan-400/70 hover:text-cyan-200 hover:shadow-[0_0_15px_rgba(0,229,255,0.35)] transition-all"
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

      <footer className="bg-[#0a0a0f] border-t border-cyan-400/20 text-slate-500 text-xs py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-1">
          <p className="font-mono font-semibold tracking-widest bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">Korea Nomad List</p>
          <p>한국 디지털 노마드를 위한 도시 비교 플랫폼</p>
          <p className="mt-2">© 2026 Korea Nomad List. Phase 1 MVP</p>
        </div>
      </footer>
    </div>
  )
}
