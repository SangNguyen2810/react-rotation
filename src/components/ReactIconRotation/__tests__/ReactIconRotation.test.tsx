import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { beforeEach, describe, expect, it } from 'vitest'
import '@testing-library/jest-dom'

vi.mock('../../assets/react.svg', () => ({
  default: 'mocked-react-logo.svg'
}))

const mockToggleDirection = vi.fn()
const mockElementRef = { current: null }

vi.mock('../../hooks/useRotation', () => ({
  useRotation: vi.fn(() => ({
    elementRef: mockElementRef,
    rotationDirection: 1,
    toggleDirection: mockToggleDirection,
    setDirection: vi.fn(),
    isAnimating: true,
    startAnimation: vi.fn(),
    stopAnimation: vi.fn(),
    currentRotation: 0
  }))
}))

import ReactIconRotation from '..'

describe('ReactIconRotation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the rotating React logo', () => {
    render(<ReactIconRotation />)
    
    const logo = screen.getByTestId('react-icon-rotation')
    expect(logo).toBeInTheDocument()

  })
})
