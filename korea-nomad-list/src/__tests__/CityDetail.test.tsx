import { render, screen } from '@testing-library/react'
import CityDetail from '@/components/city/CityDetail'
import type { City } from '@/types/city'

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

jest.mock('@/components/city/LikeDislike', () => {
  return function MockLikeDislike({
    initialLikes,
    initialDislikes,
  }: {
    initialLikes: number
    initialDislikes: number
  }) {
    return (
      <div
        data-testid="likedislike"
        data-likes={initialLikes}
        data-dislikes={initialDislikes}
      />
    )
  }
})

const mockCity = {
  id: 'test-city-01',
  name: '테스트시티',
  region: '테스트지역',
  budget: '50~100만원',
  environments: ['카페작업', '조용한환경'],
  bestSeason: '봄',
  likes: 100,
  dislikes: 10,
  tags: ['#테스트태그1', '#테스트태그2'],
  imageAlt: '테스트시티 전경 이미지',
  // 렌더링 검증용 fixture — enum이 아닌 임의 표시 문자열을 의도적으로 사용
} as unknown as City

describe('CityDetail', () => {
  it('renders city name', () => {
    render(<CityDetail city={mockCity} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('테스트시티')
  })

  it('renders region badge', () => {
    render(<CityDetail city={mockCity} />)
    expect(screen.getByText('테스트지역')).toBeInTheDocument()
  })

  it('renders image alt text', () => {
    render(<CityDetail city={mockCity} />)
    expect(screen.getByText('테스트시티 전경 이미지')).toBeInTheDocument()
  })

  it('renders budget', () => {
    render(<CityDetail city={mockCity} />)
    expect(screen.getByText('50~100만원')).toBeInTheDocument()
  })

  it('renders best season', () => {
    render(<CityDetail city={mockCity} />)
    expect(screen.getByText('봄')).toBeInTheDocument()
  })

  it('renders all environment badges', () => {
    render(<CityDetail city={mockCity} />)
    mockCity.environments.forEach((env) => {
      expect(screen.getByText(env)).toBeInTheDocument()
    })
  })

  it('renders all tags', () => {
    render(<CityDetail city={mockCity} />)
    mockCity.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
  })

  it('back link points to "/"', () => {
    render(<CityDetail city={mockCity} />)
    const backLink = screen.getByRole('link', { name: /목록으로/ })
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('back link text is "← 목록으로"', () => {
    render(<CityDetail city={mockCity} />)
    const backLink = screen.getByRole('link', { name: /목록으로/ })
    expect(backLink).toHaveTextContent('← 목록으로')
  })

  it('LikeDislike receives correct initialLikes and initialDislikes', () => {
    render(<CityDetail city={mockCity} />)
    const likeDislike = screen.getByTestId('likedislike')
    expect(likeDislike).toHaveAttribute('data-likes', '100')
    expect(likeDislike).toHaveAttribute('data-dislikes', '10')
  })
})
