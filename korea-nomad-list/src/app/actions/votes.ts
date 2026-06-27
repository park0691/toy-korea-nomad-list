'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type VoteKind = Database['public']['Enums']['vote_kind']

export type VoteResult =
  | { ok: true; vote: VoteKind | null }
  | { ok: false; error: 'unauthorized' | 'failed' }

// 도시 투표: 미투표→등록, 같은 표 재클릭→취소, 다른 표→전환
// cities의 likes/dislikes 카운트는 DB 트리거(handle_vote_change)가 동기화한다.
export async function castVote(cityId: string, voteType: VoteKind): Promise<VoteResult> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'unauthorized' }

  const { data: existing } = await supabase
    .from('votes')
    .select('vote_type')
    .eq('city_id', cityId)
    .eq('user_id', user.id)
    .maybeSingle()

  let result: VoteResult

  if (!existing) {
    const { error } = await supabase
      .from('votes')
      .insert({ user_id: user.id, city_id: cityId, vote_type: voteType })
    result = error ? { ok: false, error: 'failed' } : { ok: true, vote: voteType }
  } else if (existing.vote_type === voteType) {
    // 같은 표 재클릭 → 취소
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('user_id', user.id)
      .eq('city_id', cityId)
    result = error ? { ok: false, error: 'failed' } : { ok: true, vote: null }
  } else {
    // like ↔ dislike 전환
    const { error } = await supabase
      .from('votes')
      .update({ vote_type: voteType })
      .eq('user_id', user.id)
      .eq('city_id', cityId)
    result = error ? { ok: false, error: 'failed' } : { ok: true, vote: voteType }
  }

  if (result.ok) {
    revalidatePath('/')
    revalidatePath(`/cities/${cityId}`)
  }
  return result
}
