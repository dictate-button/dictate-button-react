import 'dictate-button'
import type React from 'react'
import { forwardRef, useEffect, useRef } from 'react'
import type {
  DictateButtonElement,
  DictateButtonProps,
  DictateEndEvent,
  DictateErrorEvent,
  DictateTextEvent,
} from './types'

export interface DictateButtonComponentProps extends DictateButtonProps {
  className?: string
  style?: React.CSSProperties
  onDictateStart?: () => void
  onDictateText?: (text: string) => void
  onDictateEnd?: (finalText: string) => void
  onDictateError?: (error: string) => void
}

export const DictateButton = forwardRef<
  DictateButtonElement,
  DictateButtonComponentProps
>(
  (
    {
      size = 30,
      apiEndpoint,
      language = 'en',
      theme,
      className,
      style,
      onDictateStart,
      onDictateText,
      onDictateEnd,
      onDictateError,
    },
    forwardedRef
  ) => {
    const internalButtonRef = useRef<DictateButtonElement>(null)
    const buttonRef =
      (forwardedRef as React.RefObject<DictateButtonElement>) ||
      internalButtonRef

    useEffect(() => {
      const button = buttonRef.current
      if (!button) return

      const handleDictateStart = () => {
        onDictateStart?.()
      }

      const handleDictateText = (event: Event) => {
        const e = event as DictateTextEvent
        onDictateText?.(e.detail)
      }

      const handleDictateEnd = (event: Event) => {
        const e = event as DictateEndEvent
        onDictateEnd?.(e.detail)
      }

      const handleDictateError = (event: Event) => {
        const e = event as DictateErrorEvent
        onDictateError?.(e.detail)
      }

      button.addEventListener('dictate-start', handleDictateStart)
      button.addEventListener('dictate-text', handleDictateText)
      button.addEventListener('dictate-end', handleDictateEnd)
      button.addEventListener('dictate-error', handleDictateError)

      return () => {
        button.removeEventListener('dictate-start', handleDictateStart)
        button.removeEventListener('dictate-text', handleDictateText)
        button.removeEventListener('dictate-end', handleDictateEnd)
        button.removeEventListener('dictate-error', handleDictateError)
      }
    }, [buttonRef, onDictateStart, onDictateText, onDictateEnd, onDictateError])

    useEffect(() => {
      const button = buttonRef.current
      if (!button) return

      if (size !== undefined) button.size = size
      if (apiEndpoint !== undefined) button.apiEndpoint = apiEndpoint
      if (language !== undefined) button.language = language
      if (theme !== undefined) button.theme = theme
    }, [buttonRef, size, apiEndpoint, language, theme])

    return (
      <dictate-button
        ref={buttonRef as React.Ref<DictateButtonElement>}
        size={size}
        apiEndpoint={apiEndpoint}
        language={language}
        theme={theme}
        class={className}
        style={style}
      />
    )
  }
)

DictateButton.displayName = 'DictateButton'
