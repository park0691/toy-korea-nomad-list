'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import CityCardBasic from './CityCardBasic'
import CityCardExpanded from './CityCardExpanded'
import type { City } from '@/types/city'

interface CityCardProps {
  city: City
}

export default function CityCard({ city }: CityCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md p-0">
      {expanded ? (
        <CityCardExpanded city={city} onCollapse={() => setExpanded(false)} />
      ) : (
        <CityCardBasic city={city} onExpand={() => setExpanded(true)} />
      )}
    </Card>
  )
}
