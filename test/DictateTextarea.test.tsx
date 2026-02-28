import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DictateTextarea } from '../src/DictateTextarea'

describe('DictateTextarea', () => {
  it('renders a textarea element', () => {
    render(<DictateTextarea placeholder="Test textarea" />)
    const textarea = screen.getByPlaceholderText('Test textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('renders with custom className', () => {
    render(
      <DictateTextarea className="custom-class" data-testid="test-textarea" />
    )
    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<DictateTextarea ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('renders dictate-button element', () => {
    const { container } = render(<DictateTextarea />)
    const button = container.querySelector('dictate-button')
    expect(button).toBeInTheDocument()
  })

  it('applies custom buttonSize', () => {
    const { container } = render(<DictateTextarea buttonSize={35} />)
    const button = container.querySelector('dictate-button')
    expect(button).toHaveAttribute('size', '35')
  })

  it('supports controlled textarea', () => {
    const handleChange = vi.fn()
    render(<DictateTextarea value="controlled value" onChange={handleChange} />)
    const textarea = screen.getByDisplayValue('controlled value')
    expect(textarea).toBeInTheDocument()
  })

  it('passes through standard textarea props', () => {
    render(
      <DictateTextarea
        rows={10}
        disabled
        required
        data-testid="test-textarea"
      />
    )
    const textarea = screen.getByTestId('test-textarea')
    expect(textarea).toHaveAttribute('rows', '10')
    expect(textarea).toBeDisabled()
    expect(textarea).toBeRequired()
  })
})
