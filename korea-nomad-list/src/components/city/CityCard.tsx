import Link from 'next/link'
import { Card } from '@/components/ui/card'
import CityCardBasic from './CityCardBasic'
import type { City } from '@/types/city'

interface CityCardProps {
  city: City
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <Link href={`/cities/${city.id}`} className="block">
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-cyan-400/20 hover:border-cyan-400/50 cursor-pointer p-0">
        <CityCardBasic city={city} />
      </Card>
    </Link>
  )
}
