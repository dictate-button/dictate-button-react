import 'dictate-button'
import { useRef, useCallback } from 'react'

export interface UseDictateButtonEventHandlersReturn {
  onDictateStart: () => void
  onDictateText: (text: string) => void
  onDictateEnd: (finalText: string) => void
  onDictateError: (error: Error | string) => void
}

export function useDictateButtonEventHandlers(
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>
): UseDictateButtonEventHandlersReturn {
  const cursorPositionRef = useRef<number | null>(null)
  const interimLengthRef = useRef<number>(0)

  const shouldAddSpaceBefore = useCallback(
    (
      input: HTMLInputElement | HTMLTextAreaElement,
      position: number
    ): boolean => {
      const charBefore = position > 0 ? input.value.charAt(position - 1) : ''
      return charBefore !== '' && !/\s/.test(charBefore)
    },
    []
  )

  const insertInterimText = useCallback(
    (
      input: HTMLInputElement | HTMLTextAreaElement,
      text: string,
      startPos: number,
      prevLength: number
    ) => {
      const trimmed = text.trim()
      if (trimmed.length === 0 && prevLength === 0) return

      const textToInsert =
        (shouldAddSpaceBefore(input, startPos) ? ' ' : '') + trimmed
      const deleteStart = startPos
      const deleteEnd = startPos + prevLength

      if (typeof input.setRangeText === 'function') {
        input.setRangeText(textToInsert, deleteStart, deleteEnd, 'end')
      } else {
        input.value =
          input.value.substring(0, deleteStart) +
          textToInsert +
          input.value.substring(deleteEnd)
        const newPos = deleteStart + textToInsert.length
        input.selectionStart = newPos
        input.selectionEnd = newPos
      }
    },
    [shouldAddSpaceBefore]
  )

  const insertFinalText = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement, text: string) => {
      const trimmed = text.trim()
      if (trimmed.length === 0) return

      const selStart = input.selectionStart ?? 0
      const selEnd = input.selectionEnd ?? 0

      const charBefore = selStart > 0 ? input.value.charAt(selStart - 1) : ''
      const needsSpaceBefore = charBefore !== '' && !/\s/.test(charBefore)

      const charAfter =
        selEnd < input.value.length ? input.value.charAt(selEnd) : ''
      const needsSpaceAfter = charAfter !== '' && !/\s/.test(charAfter)

      const textToInsert =
        (needsSpaceBefore ? ' ' : '') + trimmed + (needsSpaceAfter ? ' ' : '')

      if (typeof input.setRangeText === 'function') {
        input.setRangeText(textToInsert, selStart, selEnd, 'end')
      } else {
        input.value =
          input.value.substring(0, selStart) +
          textToInsert +
          input.value.substring(selEnd)
        const newPos = selStart + textToInsert.length
        input.selectionStart = newPos
        input.selectionEnd = newPos
      }

      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.focus({ preventScroll: true })
    },
    []
  )

  const clearInterimText = useCallback(
    (
      input: HTMLInputElement | HTMLTextAreaElement,
      startPos: number,
      length: number
    ) => {
      if (length <= 0) return

      if (typeof input.setRangeText === 'function') {
        input.setRangeText('', startPos, startPos + length, 'end')
      } else {
        input.value =
          input.value.substring(0, startPos) +
          input.value.substring(startPos + length)
        input.selectionStart = startPos
        input.selectionEnd = startPos
      }
    },
    []
  )

  const onDictateStart = useCallback(() => {
    const input = inputRef.current
    if (!input) return

    cursorPositionRef.current = input.selectionStart ?? input.value.length
    interimLengthRef.current = 0
    input.focus({ preventScroll: true })
  }, [inputRef])

  const onDictateText = useCallback(
    (text: string) => {
      const input = inputRef.current
      if (!input) return

      if (typeof text === 'string' && cursorPositionRef.current !== null) {
        insertInterimText(
          input,
          text,
          cursorPositionRef.current,
          interimLengthRef.current
        )
        interimLengthRef.current =
          text.length +
          (shouldAddSpaceBefore(input, cursorPositionRef.current) ? 1 : 0)
      }
    },
    [inputRef, insertInterimText, shouldAddSpaceBefore]
  )

  const onDictateEnd = useCallback(
    (finalText: string) => {
      const input = inputRef.current
      if (!input) return

      if (cursorPositionRef.current !== null && interimLengthRef.current > 0) {
        clearInterimText(
          input,
          cursorPositionRef.current,
          interimLengthRef.current
        )
      }

      cursorPositionRef.current = null
      interimLengthRef.current = 0

      insertFinalText(input, finalText)
    },
    [inputRef, clearInterimText, insertFinalText]
  )

  const onDictateError = useCallback(
    (_error: Error | string) => {
      const input = inputRef.current
      if (!input) return

      cursorPositionRef.current = null
      interimLengthRef.current = 0
      input.focus({ preventScroll: true })
    },
    [inputRef]
  )

  return {
    onDictateStart,
    onDictateText,
    onDictateEnd,
    onDictateError,
  }
}
