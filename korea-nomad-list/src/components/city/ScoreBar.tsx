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
      <span className="w-14 text-xs text-slate-500 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-7 text-right text-xs font-semibold text-slate-700 tabular-nums">
        {score.toFixed(1)}
      </span>
    </div>
  )
}
