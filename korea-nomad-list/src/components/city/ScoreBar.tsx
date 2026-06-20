import { cn } from '@/lib/utils'

interface ScoreBarProps {
  label: string
  icon: string
  score: number
  className?: string
}

export default function ScoreBar({ label, icon, score, className }: ScoreBarProps) {
  const pct = Math.round((score / 5) * 100)

  return (
    <div className={cn('flex items-center gap-2 text-sm', className)}>
      <span className="w-4 text-center text-base leading-none">{icon}</span>
      <span className="w-14 text-xs text-slate-400 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full transition-all shadow-[0_0_10px_rgba(0,229,255,0.6)]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-7 text-right text-xs font-semibold text-cyan-300 tabular-nums">
        {score.toFixed(1)}
      </span>
    </div>
  )
}
