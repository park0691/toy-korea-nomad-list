import React from 'react'
import { render, screen } from '@testing-library/react'
import { generateStaticParams, generateMetadata, default as CityPage } from '@/app/cities/[id]/page'
import type { City } from '@/types/city'

// ---------- mocks ----------

const mockNotFound = jest.fn()
jest.mock('next/navigation', () => ({
  notFound: () => mockNotFound(),
}))

jest.mock('@/components/city/CityDetail', () => {
  return function MockCityDetail({ city }: { city: City }) {
    return <div data-testid="city-detail" data-id={city.id} data-name={city.name} />
  }
})

const ALL_CITY_IDS = ['seoul', 'jeju', 'busan', 'gangneung', 'incheon', 'daejeon', 'daegu', 'gwangju']

jest.mock('@/data/cities', () => {
  const inlineCities = [
    { id: 'seoul', name: '서울', region: '수도권', budget: '200만원', environments: ['카페작업'], bestSeason: '봄', likes: 100, dislikes: 10, tags: ['#태그'], imageAlt: 'seoul image' },
    { id: 'jeju', name: '제주', region: '제주도', budget: '100~200만원', environments: ['자연친화'], bestSeason: '여름', likes: 101, dislikes: 11, tags: ['#태그'], imageAlt: 'jeju image' },
    { id: 'busan', name: '부산', region: '경상도', budget: '100~200만원', environments: ['자연친화'], bestSeason: '봄', likes: 102, dislikes: 12, tags: ['#태그'], imageAlt: 'busan image' },
    { id: 'gangneung', name: '강릉', region: '강원도', budget: '100~200만원', environments: ['자연친화'], bestSeason: '여름', likes: 103, dislikes: 13, tags: ['#태그'], imageAlt: 'gangneung image' },
    { id: 'incheon', name: '인천', region: '수도권', budget: '100~200만원', environments: ['도심선호'], bestSeason: '가을', likes: 104, dislikes: 14, tags: ['#태그'], imageAlt: 'incheon image' },
    { id: 'daejeon', name: '대전', region: '충청도', budget: '100만원', environments: ['카페작업'], bestSeason: '가을', likes: 105, dislikes: 15, tags: ['#태그'], imageAlt: 'daejeon image' },
    { id: 'daegu', name: '대구', region: '경상도', budget: '100만원', environments: ['도심선호'], bestSeason: '겨울', likes: 106, dislikes: 16, tags: ['#태그'], imageAlt: 'daegu image' },
    { id: 'gwangju', name: '광주', region: '전라도', budget: '100만원', environments: ['자연친화'], bestSeason: '봄', likes: 107, dislikes: 17, tags: ['#태그'], imageAlt: 'gwangju image' },
  ]
  return {
    cities: inlineCities,
    getCityById: (id: string) => inlineCities.find((c) => c.id === id),
  }
})

// ---------- helpers ----------

function makeParams(id: string): Promise<{ id: string }> {
  return Promise.resolve({ id })
}

// ---------- tests ----------

describe('generateStaticParams', () => {
  it('returns an array of 8 objects', async () => {
    const params = await generateStaticParams()
    expect(params).toHaveLength(8)
  })

  it('returns all 8 city IDs', async () => {
    const params = await generateStaticParams()
    const ids = params.map((p) => p.id)
    expect(ids).toEqual(expect.arrayContaining(ALL_CITY_IDS))
    expect(ids).toHaveLength(ALL_CITY_IDS.length)
  })

  it('every item is an object with an id string field', async () => {
    const params = await generateStaticParams()
    for (const p of params) {
      expect(p).toHaveProperty('id')
      expect(typeof p.id).toBe('string')
    }
  })
})

describe('generateMetadata', () => {
  it('returns correct title for valid city id "jeju"', async () => {
    const metadata = await generateMetadata({ params: makeParams('jeju') })
    expect(metadata.title).toBe('제주 | Korea Nomad List')
  })

  it('returns fallback title for invalid id "invalid"', async () => {
    const metadata = await generateMetadata({ params: makeParams('invalid') })
    expect(metadata.title).toBe('Korea Nomad List')
  })

  it('returns correct title for valid city id "seoul"', async () => {
    const metadata = await generateMetadata({ params: makeParams('seoul') })
    expect(metadata.title).toBe('서울 | Korea Nomad List')
  })

  it('returns fallback title for empty string id', async () => {
    const metadata = await generateMetadata({ params: makeParams('') })
    expect(metadata.title).toBe('Korea Nomad List')
  })
})

describe('CityPage', () => {
  beforeEach(() => {
    mockNotFound.mockClear()
  })

  it('renders CityDetail for a valid city id', async () => {
    const jsx = await CityPage({ params: makeParams('jeju') })
    render(jsx as React.ReactElement)
    expect(screen.getByTestId('city-detail')).toBeInTheDocument()
  })

  it('passes correct city data to CityDetail', async () => {
    const jsx = await CityPage({ params: makeParams('jeju') })
    render(jsx as React.ReactElement)
    const el = screen.getByTestId('city-detail')
    expect(el).toHaveAttribute('data-id', 'jeju')
    expect(el).toHaveAttribute('data-name', '제주')
  })

  it('calls notFound() for an invalid city id', async () => {
    await CityPage({ params: makeParams('invalid') })
    expect(mockNotFound).toHaveBeenCalledTimes(1)
  })

  it('does not call notFound() for a valid city id', async () => {
    const jsx = await CityPage({ params: makeParams('seoul') })
    render(jsx as React.ReactElement)
    expect(mockNotFound).not.toHaveBeenCalled()
  })

  it('renders CityDetail with correct id for "busan"', async () => {
    const jsx = await CityPage({ params: makeParams('busan') })
    render(jsx as React.ReactElement)
    expect(screen.getByTestId('city-detail')).toHaveAttribute('data-id', 'busan')
  })
})
