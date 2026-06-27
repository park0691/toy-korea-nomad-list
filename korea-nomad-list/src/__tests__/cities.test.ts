import { cities, getCityById } from '@/data/cities'

const ALL_CITY_IDS = [
  'seoul',
  'jeju',
  'busan',
  'gangneung',
  'incheon',
  'daejeon',
  'daegu',
  'gwangju',
]

describe('cities array', () => {
  it('has exactly 8 items', () => {
    expect(cities).toHaveLength(8)
  })

  it('contains all expected city IDs', () => {
    const ids = cities.map((c) => c.id)
    expect(ids).toEqual(expect.arrayContaining(ALL_CITY_IDS))
  })

  it('all cities have required fields with no undefined properties', () => {
    for (const city of cities) {
      expect(city.id).toBeDefined()
      expect(city.name).toBeDefined()
      expect(city.region).toBeDefined()
      expect(city.budget).toBeDefined()
      expect(city.environments).toBeDefined()
      expect(city.bestSeason).toBeDefined()
      expect(city.likes).toBeDefined()
      expect(city.dislikes).toBeDefined()
      expect(city.tags).toBeDefined()
      expect(city.imageAlt).toBeDefined()
    }
  })
})

describe('getCityById', () => {
  it('returns the correct city for valid id "seoul"', () => {
    const city = getCityById('seoul')
    expect(city).toBeDefined()
    expect(city?.id).toBe('seoul')
    expect(city?.name).toBe('서울')
  })

  it('returns the correct city for valid id "jeju"', () => {
    const city = getCityById('jeju')
    expect(city).toBeDefined()
    expect(city?.id).toBe('jeju')
    expect(city?.name).toBe('제주')
  })

  it('returns undefined for non-existent id "invalid"', () => {
    const city = getCityById('invalid')
    expect(city).toBeUndefined()
  })

  it('returns undefined for empty string ""', () => {
    const city = getCityById('')
    expect(city).toBeUndefined()
  })

  it('returns a city with the correct structure', () => {
    const city = getCityById('seoul')
    expect(city).toBeDefined()
    expect(city).toMatchObject({
      id: 'seoul',
      name: '서울',
      region: '수도권',
      budget: '200만원',
      environments: expect.arrayContaining(['도심선호', '카페작업', '코워킹 필수']),
      bestSeason: '봄',
      likes: expect.any(Number),
      dislikes: expect.any(Number),
      tags: expect.any(Array),
      imageAlt: expect.any(String),
    })
  })

  it('returns valid city objects for all 8 city IDs', () => {
    for (const id of ALL_CITY_IDS) {
      const city = getCityById(id)
      expect(city).toBeDefined()
      expect(city?.id).toBe(id)
    }
  })

  it('is case-sensitive: "Seoul" (capitalized) returns undefined', () => {
    const city = getCityById('Seoul')
    expect(city).toBeUndefined()
  })

  it('does not mutate the cities array', () => {
    const lengthBefore = cities.length
    const idsBefore = cities.map((c) => c.id)

    getCityById('seoul')
    getCityById('invalid')
    getCityById('')

    expect(cities).toHaveLength(lengthBefore)
    expect(cities.map((c) => c.id)).toEqual(idsBefore)
  })
})
