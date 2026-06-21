import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { cities, getCityById } from '@/data/cities'
import CityDetail from '@/components/city/CityDetail'

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
  const city = getCityById(id)
  if (!city) notFound()
  return <CityDetail city={city} />
}
