import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useRef } from 'react'
import { useDictateButtonEventHandlers } from '../src/useDictateButtonEventHandlers'

describe('useDictateButtonEventHandlers', () => {
  it('returns event handler functions', () => {
    const { result } = renderHook(() => {
      const inputRef = useRef<HTMLInputElement>(null)
      return useDictateButtonEventHandlers(inputRef)
    })

    expect(result.current).toHaveProperty('onDictateStart')
    expect(result.current).toHaveProperty('onDictateText')
    expect(result.current).toHaveProperty('onDictateEnd')
    expect(result.current).toHaveProperty('onDictateError')
    expect(typeof result.current.onDictateStart).toBe('function')
    expect(typeof result.current.onDictateText).toBe('function')
    expect(typeof result.current.onDictateEnd).toBe('function')
    expect(typeof result.current.onDictateError).toBe('function')
  })

  it('works with input ref', () => {
    const { result } = renderHook(() => {
      const inputRef = useRef<HTMLInputElement>(null)
      return useDictateButtonEventHandlers(inputRef)
    })

    expect(result.current).toBeDefined()
    expect(result.current.onDictateStart).toBeInstanceOf(Function)
  })

  it('works with textarea ref', () => {
    const { result } = renderHook(() => {
      const textareaRef = useRef<HTMLTextAreaElement>(null)
      return useDictateButtonEventHandlers(textareaRef)
    })

    expect(result.current).toBeDefined()
    expect(result.current.onDictateEnd).toBeInstanceOf(Function)
  })
})
