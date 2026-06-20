import { MapPin, Search, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Header() {
  return (
    <header className="bg-[#0a0a0f]/80 backdrop-blur-md text-slate-100 sticky top-0 z-50 border-b border-cyan-400/20 shadow-[0_0_25px_rgba(0,229,255,0.15)]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <MapPin className="size-6 text-cyan-400 fill-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
          <span className="text-xl font-mono font-bold tracking-widest drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            Korea<span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">Nomad</span>
          </span>
        </div>

        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-cyan-400/70" />
            <Input
              placeholder="도시 검색..."
              className="pl-9 bg-cyan-400/5 border-cyan-400/30 text-slate-100 placeholder:text-slate-500 focus-visible:ring-cyan-400 focus-visible:border-cyan-400/60"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 ml-2 text-sm">
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-cyan-300 hover:bg-cyan-400/10">
            도시 목록
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-cyan-300 hover:bg-cyan-400/10">
            커뮤니티
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-cyan-300 hover:bg-cyan-400/10">
            밋업
          </Button>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-cyan-400/40 text-cyan-200 bg-transparent hover:bg-cyan-400/10 hover:text-cyan-100 hover:border-cyan-400/70 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] gap-1.5"
          >
            <LogIn className="size-4" />
            <span className="hidden sm:inline">로그인</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
