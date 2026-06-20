import { MapPin, Search, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Header() {
  return (
    <header className="bg-[#1E2A5E] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <MapPin className="size-6 text-amber-400 fill-amber-400" />
          <span className="text-xl font-bold tracking-tight">
            Korea<span className="text-amber-400">Nomad</span>
          </span>
        </div>

        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="도시 검색..."
              className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus-visible:ring-amber-400 focus-visible:border-amber-400"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 ml-2 text-sm">
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            도시 목록
          </Button>
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            커뮤니티
          </Button>
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
            밋업
          </Button>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white gap-1.5"
          >
            <LogIn className="size-4" />
            <span className="hidden sm:inline">로그인</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
