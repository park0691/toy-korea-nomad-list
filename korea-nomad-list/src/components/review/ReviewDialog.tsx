'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

const SCORE_ITEMS = [
  { key: 'internet', label: '인터넷 속도' },
  { key: 'cost', label: '생활비' },
  { key: 'cafe', label: '카페 / 코워킹' },
  { key: 'transport', label: '대중교통' },
  { key: 'safety', label: '안전' },
  { key: 'foreigner', label: '외국인 친화도' },
]

const PURPOSE_OPTIONS = [
  { value: 'remote', label: '원격근무' },
  { value: 'freelance', label: '프리랜서' },
  { value: 'travel', label: '여행' },
  { value: 'long_stay', label: '장기거주' },
]

interface ReviewDialogProps {
  cityName: string
}

export default function ReviewDialog({ cityName }: ReviewDialogProps) {
  const [open, setOpen] = useState(false)
  const [stayDuration, setStayDuration] = useState('')
  const [purposes, setPurposes] = useState<string[]>([])
  const [overallRating, setOverallRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [itemScores, setItemScores] = useState<Record<string, number>>({})
  const [comment, setComment] = useState('')

  function togglePurpose(value: string) {
    setPurposes((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    )
  }

  function setItemScore(key: string, score: number) {
    setItemScores((prev) => ({ ...prev, [key]: score }))
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-fuchsia-500 hover:bg-fuchsia-400 text-[#0a0a0f] font-semibold gap-1.5 shadow-[0_0_15px_rgba(255,43,214,0.5)] hover:shadow-[0_0_22px_rgba(255,43,214,0.7)]">
          <Star className="size-3.5 fill-current" />
          {cityName} 평가하기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg">{cityName} 평가하기</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-200">체류 기간</p>
            <RadioGroup value={stayDuration} onValueChange={setStayDuration} className="space-y-1.5">
              {[
                { value: 'lt1', label: '1개월 미만' },
                { value: '1to3', label: '1~3개월' },
                { value: 'gt3', label: '3개월 이상' },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <RadioGroupItem value={opt.value} id={`stay-${opt.value}`} />
                  <Label htmlFor={`stay-${opt.value}`} className="cursor-pointer text-sm">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-200">방문 목적</p>
            <div className="grid grid-cols-2 gap-2">
              {PURPOSE_OPTIONS.map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`purpose-${opt.value}`}
                    checked={purposes.includes(opt.value)}
                    onCheckedChange={() => togglePurpose(opt.value)}
                  />
                  <Label htmlFor={`purpose-${opt.value}`} className="cursor-pointer text-sm">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-200">종합 만족도</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setOverallRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    className={`size-7 transition-colors ${
                      star <= (hoverRating || overallRating)
                        ? 'fill-fuchsia-400 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(255,43,214,0.7)]'
                        : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-200">항목별 점수</p>
            <div className="space-y-2">
              {SCORE_ITEMS.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <span className="text-sm text-slate-300 w-28 shrink-0">{item.label}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setItemScore(item.key, score)}
                        className={`size-7 rounded-full text-xs font-semibold border transition-colors ${
                          itemScores[item.key] === score
                            ? 'bg-cyan-400 border-cyan-400 text-[#0a0a0f] shadow-[0_0_12px_rgba(0,229,255,0.6)]'
                            : 'border-white/15 text-slate-400 hover:border-cyan-400/60 hover:text-cyan-300'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-semibold text-slate-200">
              한 줄 후기 <span className="font-normal text-slate-400">(선택)</span>
            </Label>
            <Textarea
              id="comment"
              placeholder="노마드로서 이 도시를 간단히 소개해주세요"
              maxLength={100}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
              className="resize-none text-sm"
            />
            <p className="text-xs text-right text-slate-400 tabular-nums">
              {comment.length} / 100
            </p>
          </div>

          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1" onClick={handleClose}>
              취소
            </Button>
            <Button
              className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-[#0a0a0f] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.45)] disabled:shadow-none"
              disabled={!stayDuration || overallRating === 0}
              onClick={handleClose}
            >
              평가 등록
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
