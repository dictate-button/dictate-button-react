import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DictateInput } from '../src/DictateInput'

describe('DictateInput', () => {
  it('renders an input element', () => {
    render(<DictateInput placeholder="Test input" />)
    const input = screen.getByPlaceholderText('Test input')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('renders with custom className', () => {
    render(<DictateInput className="custom-class" data-testid="test-input" />)
    const input = screen.getByTestId('test-input')
    expect(input).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<DictateInput ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('renders dictate-button element', () => {
    const { container } = render(<DictateInput />)
    const button = container.querySelector('dictate-button')
    expect(button).toBeInTheDocument()
  })

  it('applies custom buttonSize', () => {
    const { container } = render(<DictateInput buttonSize={40} />)
    const button = container.querySelector('dictate-button')
    expect(button).toHaveAttribute('size', '40')
  })

  it('supports controlled input', () => {
    const handleChange = vi.fn()
    render(<DictateInput value="controlled value" onChange={handleChange} />)
    const input = screen.getByDisplayValue('controlled value')
    expect(input).toBeInTheDocument()
  })

  it('passes through standard input props', () => {
    render(
      <DictateInput type="email" disabled required data-testid="test-input" />
    )
    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toBeDisabled()
    expect(input).toBeRequired()
  })
})
