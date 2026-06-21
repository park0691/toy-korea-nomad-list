'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

type VoteState = 'like' | 'dislike' | null

interface LikeDislikeProps {
  initialLikes: number
  initialDislikes: number
}

export default function LikeDislike({ initialLikes, initialDislikes }: LikeDislikeProps) {
  const [vote, setVote] = useState<VoteState>(null)
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)

  function handleLike() {
    if (vote === 'like') {
      setVote(null)
      setLikes((n) => n - 1)
    } else {
      if (vote === 'dislike') setDislikes((n) => n - 1)
      setVote('like')
      setLikes((n) => n + 1)
    }
  }

  function handleDislike() {
    if (vote === 'dislike') {
      setVote(null)
      setDislikes((n) => n - 1)
    } else {
      if (vote === 'like') setLikes((n) => n - 1)
      setVote('dislike')
      setDislikes((n) => n + 1)
    }
  }

  return (
    <div className="flex justify-between">
      <button
        onClick={handleLike}
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
        onClick={handleDislike}
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
