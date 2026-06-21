import { Card } from '@/components/ui/card'
import CityCardBasic from './CityCardBasic'
import type { City } from '@/types/city'

interface CityCardProps {
  city: City
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md p-0">
      <CityCardBasic city={city} />
    </Card>
  )
}
