import { createClient } from '@/lib/supabase/server'
import { mapCity } from '@/lib/mapCity'
import type { City } from '@/types/city'
import type { Database } from '@/types/database'

export type VoteKind = Database['public']['Enums']['vote_kind']

// 전체 도시 목록 (좋아요 많은 순)
export async function getCities(): Promise<City[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('likes', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapCity)
}

// 단건 도시 + 현재 로그인 사용자의 투표 상태 + 인증 여부
export async function getCityWithUserVote(
  id: string
): Promise<{ city: City | null; userVote: VoteKind | null; isAuthenticated: boolean }> {
  const supabase = await createClient()

  const { data: cityRow, error } = await supabase
    .from('cities')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isAuthenticated = !!user

  if (!cityRow) return { city: null, userVote: null, isAuthenticated }

  let userVote: VoteKind | null = null
  if (user) {
    const { data: voteRow } = await supabase
      .from('votes')
      .select('vote_type')
      .eq('city_id', id)
      .eq('user_id', user.id)
      .maybeSingle()
    userVote = voteRow?.vote_type ?? null
  }

  return { city: mapCity(cityRow), userVote, isAuthenticated }
}
