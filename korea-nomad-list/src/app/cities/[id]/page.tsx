import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { cities, getCityById } from '@/data/cities'
import { getCityWithUserVote } from '@/lib/cities'
import CityDetail from '@/components/city/CityDetail'

// 빌드 시 사전 생성할 경로 — 도시 id 집합은 안정적이므로 정적 목록 사용
export async function generateStaticParams() {
  return cities.map((city) => ({ id: city.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const city = getCityById(id)
  if (!city) return { title: 'Korea Nomad List' }
  return { title: `${city.name} | Korea Nomad List` }
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // 좋아요/투표 상태는 DB 기준 라이브 데이터로 조회
  const { city, userVote, isAuthenticated } = await getCityWithUserVote(id)
  if (!city) notFound()
  return <CityDetail city={city} userVote={userVote} isAuthenticated={isAuthenticated} />
}
