'use client'

import Link from 'next/link'
import { MapPin, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { useActionState } from 'react'
import { signUp } from '@/app/actions/auth'

const NOMAD_TYPES = [
  { value: 'remote', label: '원격근무자' },
  { value: 'freelance', label: '프리랜서' },
  { value: 'travel', label: '디지털 여행자' },
  { value: 'long_stay', label: '장기 이주 탐색' },
]

export default function RegisterPage() {
  const [state, action, pending] = useActionState(signUp, undefined)

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,43,214,0.10),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(0,229,255,0.10),transparent_50%)]"
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
          <p className="text-slate-500 text-sm mt-2">한국 노마드 커뮤니티에 합류하세요</p>
        </div>

        {/* 카드 */}
        <div className="bg-[#12121a] border border-fuchsia-500/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,43,214,0.07)]">
          <h1 className="text-lg font-bold text-slate-100 mb-1">회원가입</h1>
          <p className="text-slate-500 text-sm mb-6">이메일로 계정을 만드세요</p>

          {/* 에러 메시지 */}
          {state?.error && (
            <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {state.error}
            </div>
          )}

          {/* 가입 완료 메시지 */}
          {state?.success && (
            <div className="mb-4 px-3 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm">
              가입 인증 메일을 발송했습니다. 메일함을 확인하세요.
            </div>
          )}

          {/* 이메일 회원가입 폼 */}
          <form action={action} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="nickname" className="text-slate-400 text-sm">닉네임</Label>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="노마드 닉네임"
                required
                className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:border-fuchsia-400/60 focus-visible:ring-fuchsia-400/30 h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-400 text-sm">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nomad@example.com"
                required
                className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:border-fuchsia-400/60 focus-visible:ring-fuchsia-400/30 h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-slate-400 text-sm">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="8자 이상"
                minLength={8}
                required
                className="bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-600 focus-visible:border-fuchsia-400/60 focus-visible:ring-fuchsia-400/30 h-11"
              />
            </div>

            {/* 노마드 유형 선택 */}
            <div className="space-y-2">
              <Label className="text-slate-400 text-sm">노마드 유형 (선택)</Label>
              <div className="grid grid-cols-2 gap-2">
                {NOMAD_TYPES.map((type) => (
                  <label
                    key={type.value}
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-white/10 bg-white/5 cursor-pointer hover:border-fuchsia-500/40 hover:bg-fuchsia-500/5 transition-colors group"
                  >
                    <Checkbox
                      id={`type-${type.value}`}
                      name="nomad_type"
                      value={type.value}
                      className="border-white/20 data-[state=checked]:border-fuchsia-500 data-[state=checked]:bg-fuchsia-500"
                    />
                    <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="terms-all"
                  className="mt-0.5 border-white/20 data-[state=checked]:border-cyan-400 data-[state=checked]:bg-cyan-400"
                />
                <Label htmlFor="terms-all" className="text-sm text-slate-300 cursor-pointer leading-snug">
                  전체 동의
                </Label>
              </div>
              <Separator className="bg-white/5" />
              <div className="space-y-2 pl-1">
                {[
                  { id: 'terms', label: '[필수] 이용약관 동의', link: true },
                  { id: 'privacy', label: '[필수] 개인정보 처리방침 동의', link: true },
                  { id: 'marketing', label: '[선택] 마케팅 정보 수신 동의', link: false },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={item.id}
                        className="border-white/20 data-[state=checked]:border-cyan-400 data-[state=checked]:bg-cyan-400 size-3.5"
                      />
                      <Label htmlFor={item.id} className="text-xs text-slate-500 cursor-pointer">
                        {item.label}
                      </Label>
                    </div>
                    {item.link && (
                      <button type="button" className="text-[10px] text-slate-600 hover:text-slate-400 underline transition-colors">
                        보기
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={pending}
              className="w-full h-11 bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 text-white font-semibold shadow-[0_0_20px_rgba(255,43,214,0.25)] hover:shadow-[0_0_30px_rgba(255,43,214,0.4)] transition-all border-0 disabled:opacity-60"
            >
              <Check className="size-4 mr-1.5" />
              {pending ? '처리 중...' : '가입 완료'}
            </Button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-sm mt-5">
          이미 계정이 있으신가요?{' '}
          <Link
            href="/login"
            className="text-fuchsia-400 hover:text-fuchsia-300 hover:underline transition-colors"
          >
            로그인
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
