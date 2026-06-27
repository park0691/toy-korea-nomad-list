import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LikeDislike from '../LikeDislike'

// ---------- mocks ----------

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

const mockCastVote = jest.fn()
jest.mock('@/app/actions/votes', () => ({
  castVote: (...args: unknown[]) => mockCastVote(...args),
}))

// 인증 사용자 기준 기본 렌더 헬퍼 (투표 토글 동작 검증용)
function renderAuthed(initialLikes: number, initialDislikes: number) {
  return render(
    <LikeDislike
      cityId="seoul"
      initialLikes={initialLikes}
      initialDislikes={initialDislikes}
      isAuthenticated
    />
  )
}

beforeEach(() => {
  mockPush.mockClear()
  mockCastVote.mockReset()
  mockCastVote.mockResolvedValue({ ok: true, vote: 'like' })
})

describe('LikeDislike', () => {
  describe('레이아웃', () => {
    it('컨테이너가 justify-between 클래스를 가져야 함', () => {
      const { container } = renderAuthed(10, 5)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass('justify-between')
    })

    it('컨테이너가 gap-2 클래스를 가지지 않아야 함', () => {
      const { container } = renderAuthed(10, 5)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).not.toHaveClass('gap-2')
    })

    it('싫어요 버튼 내부에서 숫자가 아이콘 앞에 렌더링되어야 함', () => {
      renderAuthed(10, 5)
      const buttons = screen.getAllByRole('button')
      const dislikeButton = buttons[1]
      const children = Array.from(dislikeButton.childNodes)
      const spanIndex = children.findIndex((node) => node.nodeName === 'SPAN')
      const svgIndex = children.findIndex((node) => node.nodeName === 'svg')
      expect(spanIndex).toBeLessThan(svgIndex)
    })

    it('좋아요 버튼 내부에서 아이콘이 숫자 앞에 렌더링되어야 함', () => {
      renderAuthed(10, 5)
      const buttons = screen.getAllByRole('button')
      const likeButton = buttons[0]
      const children = Array.from(likeButton.childNodes)
      const spanIndex = children.findIndex((node) => node.nodeName === 'SPAN')
      const svgIndex = children.findIndex((node) => node.nodeName === 'svg')
      expect(svgIndex).toBeLessThan(spanIndex)
    })
  })

  describe('초기 렌더링', () => {
    it('초기 좋아요 수를 표시해야 함', () => {
      renderAuthed(42, 7)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('초기 싫어요 수를 표시해야 함', () => {
      renderAuthed(42, 7)
      expect(screen.getByText('7')).toBeInTheDocument()
    })

    it('좋아요와 싫어요 버튼 두 개가 렌더링되어야 함', () => {
      renderAuthed(10, 5)
      expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('initialVote가 like면 좋아요 버튼이 활성 스타일을 가져야 함', () => {
      render(
        <LikeDislike
          cityId="seoul"
          initialLikes={10}
          initialDislikes={5}
          initialVote="like"
          isAuthenticated
        />
      )
      const likeButton = screen.getAllByRole('button')[0]
      expect(likeButton).toHaveClass('border-cyan-400')
    })
  })

  describe('좋아요 투표 로직 (낙관적 업데이트)', () => {
    it('좋아요 버튼 클릭 시 좋아요 수가 증가해야 함', async () => {
      const user = userEvent.setup()
      renderAuthed(10, 5)
      await user.click(screen.getAllByRole('button')[0])
      expect(screen.getByText('11')).toBeInTheDocument()
    })

    it('좋아요 클릭 시 castVote가 cityId, "like"로 호출되어야 함', async () => {
      const user = userEvent.setup()
      renderAuthed(10, 5)
      await user.click(screen.getAllByRole('button')[0])
      expect(mockCastVote).toHaveBeenCalledWith('seoul', 'like')
    })

    it('좋아요를 두 번 클릭하면 토글되어 원래 수로 돌아와야 함', async () => {
      const user = userEvent.setup()
      renderAuthed(10, 5)
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[0])
      await user.click(buttons[0])
      expect(screen.getByText('10')).toBeInTheDocument()
    })
  })

  describe('싫어요 투표 로직 (낙관적 업데이트)', () => {
    it('싫어요 버튼 클릭 시 싫어요 수가 증가해야 함', async () => {
      const user = userEvent.setup()
      renderAuthed(10, 5)
      await user.click(screen.getAllByRole('button')[1])
      expect(screen.getByText('6')).toBeInTheDocument()
    })

    it('싫어요를 두 번 클릭하면 토글되어 원래 수로 돌아와야 함', async () => {
      const user = userEvent.setup()
      renderAuthed(10, 5)
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[1])
      await user.click(buttons[1])
      expect(screen.getByText('5')).toBeInTheDocument()
    })
  })

  describe('상호 배타 로직', () => {
    it('좋아요 후 싫어요 클릭 시 좋아요가 취소되어야 함', async () => {
      const user = userEvent.setup()
      renderAuthed(10, 5)
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[0])
      expect(screen.getByText('11')).toBeInTheDocument()
      await user.click(buttons[1])
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('6')).toBeInTheDocument()
    })

    it('싫어요 후 좋아요 클릭 시 싫어요가 취소되어야 함', async () => {
      const user = userEvent.setup()
      renderAuthed(10, 5)
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[1])
      expect(screen.getByText('6')).toBeInTheDocument()
      await user.click(buttons[0])
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('11')).toBeInTheDocument()
    })

    it('동시에 좋아요와 싫어요 모두 활성화되지 않아야 함', async () => {
      const user = userEvent.setup()
      renderAuthed(10, 5)
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[0])
      await user.click(buttons[1])
      // 좋아요는 원복(10), 싫어요는 +1(6)
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('6')).toBeInTheDocument()
    })
  })

  describe('비인증 사용자', () => {
    it('비로그인 상태에서 좋아요 클릭 시 /login으로 이동해야 함', async () => {
      const user = userEvent.setup()
      render(<LikeDislike cityId="seoul" initialLikes={10} initialDislikes={5} />)
      await user.click(screen.getAllByRole('button')[0])
      expect(mockPush).toHaveBeenCalledWith('/login')
    })

    it('비로그인 상태에서는 castVote를 호출하지 않고 수가 변하지 않아야 함', async () => {
      const user = userEvent.setup()
      render(<LikeDislike cityId="seoul" initialLikes={10} initialDislikes={5} />)
      await user.click(screen.getAllByRole('button')[0])
      expect(mockCastVote).not.toHaveBeenCalled()
      expect(screen.getByText('10')).toBeInTheDocument()
    })
  })

  describe('엣지 케이스', () => {
    it('초기값이 0인 경우에도 정상 동작해야 함', async () => {
      const user = userEvent.setup()
      renderAuthed(0, 0)
      await user.click(screen.getAllByRole('button')[0])
      expect(screen.getByText('1')).toBeInTheDocument()
    })

    it('큰 숫자도 올바르게 표시되어야 함', () => {
      renderAuthed(99999, 88888)
      expect(screen.getByText('99999')).toBeInTheDocument()
      expect(screen.getByText('88888')).toBeInTheDocument()
    })

    it('연속 빠른 클릭에도 상태가 정확해야 함', async () => {
      const user = userEvent.setup()
      renderAuthed(10, 5)
      const buttons = screen.getAllByRole('button')
      // 좋아요 → 싫어요 → 좋아요
      await user.click(buttons[0])
      await user.click(buttons[1])
      await user.click(buttons[0])
      expect(screen.getByText('11')).toBeInTheDocument()
      expect(screen.getByText('5')).toBeInTheDocument()
    })
  })
})
