'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { castVote } from '@/app/actions/votes'

type VoteState = 'like' | 'dislike' | null

interface LikeDislikeProps {
  cityId: string
  initialLikes: number
  initialDislikes: number
  initialVote?: VoteState
  isAuthenticated?: boolean
}

// 현재 상태에서 type 투표 클릭 시의 다음 상태를 계산 (서버 delta 로직과 동일)
function reduceVote(
  vote: VoteState,
  likes: number,
  dislikes: number,
  type: 'like' | 'dislike'
): { vote: VoteState; likes: number; dislikes: number } {
  if (vote === type) {
    // 같은 표 재클릭 → 취소
    return {
      vote: null,
      likes: likes - (type === 'like' ? 1 : 0),
      dislikes: dislikes - (type === 'dislike' ? 1 : 0),
    }
  }
  let nextLikes = likes
  let nextDislikes = dislikes
  if (vote === 'like') nextLikes -= 1
  if (vote === 'dislike') nextDislikes -= 1
  if (type === 'like') nextLikes += 1
  if (type === 'dislike') nextDislikes += 1
  return { vote: type, likes: nextLikes, dislikes: nextDislikes }
}

export default function LikeDislike({
  cityId,
  initialLikes,
  initialDislikes,
  initialVote = null,
  isAuthenticated = false,
}: LikeDislikeProps) {
  const router = useRouter()
  const [vote, setVote] = useState<VoteState>(initialVote)
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)
  const [, startTransition] = useTransition()

  function handleVote(type: 'like' | 'dislike') {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    const prev = { vote, likes, dislikes }
    const next = reduceVote(vote, likes, dislikes, type)

    // 낙관적 업데이트
    setVote(next.vote)
    setLikes(next.likes)
    setDislikes(next.dislikes)

    startTransition(async () => {
      const res = await castVote(cityId, type)
      if (!res.ok) {
        // 실패 시 롤백
        setVote(prev.vote)
        setLikes(prev.likes)
        setDislikes(prev.dislikes)
        if (res.error === 'unauthorized') router.push('/login')
      }
    })
  }

  return (
    <div className="flex justify-between">
      <button
        onClick={() => handleVote('like')}
        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
          vote === 'like'
            ? 'border-cyan-400 bg-cyan-400/15 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.35)]'
            : 'border-white/15 bg-white/5 text-slate-400 hover:border-cyan-400/50 hover:text-cyan-400'
        }`}
      >
        <ThumbsUp className={`size-3.5 ${vote === 'like' ? 'fill-cyan-400' : ''}`} />
        <span className="tabular-nums">{likes}</span>
      </button>
      <button
        onClick={() => handleVote('dislike')}
        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
          vote === 'dislike'
            ? 'border-fuchsia-400 bg-fuchsia-400/15 text-fuchsia-300 shadow-[0_0_12px_rgba(255,43,214,0.35)]'
            : 'border-white/15 bg-white/5 text-slate-400 hover:border-fuchsia-400/50 hover:text-fuchsia-400'
        }`}
      >
        <span className="tabular-nums">{dislikes}</span>
        <ThumbsDown className={`size-3.5 ${vote === 'dislike' ? 'fill-fuchsia-400' : ''}`} />
      </button>
    </div>
  )
}
