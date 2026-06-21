'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { signIn } from '@/app/actions/auth'

export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, undefined)

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,255,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,43,214,0.10),transparent_50%)]"
      />

      <div className="relative w-full max-w-sm">
        {/* 로고 */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <MapPin className="size-7 text-cyan-400 fill-cyan-400 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)] group-hover:drop-shadow-[0_0_16px_rgba(0,229,255,1)] transition-all" />
            <span className="text-2xl font-mono font-bold tracking-widest">
              Korea<span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">Nomad</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm mt-2">노마드 여정을 계속하세요</p>
        </div>

        {/* 카드 */}
        <div className="bg-[#12121a] border border-cyan-400/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,229,255,0.08)]">
          <h1 className="text-lg font-bold text-slate-100 mb-1">로그인</h1>
          <p className="text-slate-500 text-sm mb-6">이메일과 비밀번호로 로그인하세요</p>

          {/* 에러 메시지 */}
          {state?.error && (
            <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {state.error}
            </div>
          )}

          {/* 이메일 로그인 폼 */}
          <form action={action} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-400 text-sm">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nomad@example.com"
                required
                className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:border-cyan-400/60 focus-visible:ring-cyan-400/30 h-11"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-400 text-sm">비밀번호</Label>
                <button type="button" className="text-xs text-cyan-400/70 hover:text-cyan-300 transition-colors">
                  비밀번호 찾기
                </button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:border-cyan-400/60 focus-visible:ring-cyan-400/30 h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-11 bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-white font-semibold shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all border-0 disabled:opacity-60"
            >
              {pending ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-sm mt-5">
          아직 계정이 없으신가요?{' '}
          <Link
            href="/register"
            className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            회원가입
          </Link>
        </p>

        <p className="text-center mt-4">
          <Link
            href="/"
            className="text-slate-600 hover:text-slate-400 text-xs transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  )
}
