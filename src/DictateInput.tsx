import 'dictate-button'
import type React from 'react'
import { forwardRef, useRef } from 'react'
import { DictateButton } from './DictateButton'
import type { DictateButtonProps } from './types'
import { useDictateButtonEventHandlers } from './useDictateButtonEventHandlers'

export interface DictateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<DictateButtonProps, 'class'> {
  buttonSize?: number
  buttonClassName?: string
  onDictateStart?: () => void
  onDictateText?: (text: string) => void
  onDictateEnd?: (finalText: string) => void
  onDictateError?: (error: string) => void
}

export const DictateInput = forwardRef<HTMLInputElement, DictateInputProps>(
  (
    {
      buttonSize = 30,
      buttonClassName,
      apiEndpoint,
      language,
      theme,
      onDictateStart: userOnDictateStart,
      onDictateText: userOnDictateText,
      onDictateEnd: userOnDictateEnd,
      onDictateError: userOnDictateError,
      className,
      style,
      ...inputProps
    },
    forwardedRef
  ) => {
    const internalInputRef = useRef<HTMLInputElement>(null)
    const inputRef =
      (forwardedRef as React.RefObject<HTMLInputElement>) || internalInputRef

    const textHandlers = useDictateButtonEventHandlers(inputRef)

    const handleDictateStart = userOnDictateStart || textHandlers.onDictateStart
    const handleDictateText = userOnDictateText || textHandlers.onDictateText
    const handleDictateEnd = userOnDictateEnd || textHandlers.onDictateEnd
    const handleDictateError = userOnDictateError || textHandlers.onDictateError

    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '100%',
          ...style,
        }}
      >
        <input
          ref={inputRef}
          className={className}
          style={{
            paddingRight: `${buttonSize + 8}px`,
            boxSizing: 'border-box',
            width: '100%',
          }}
          {...inputProps}
        />
        <DictateButton
          size={buttonSize}
          className={buttonClassName}
          apiEndpoint={apiEndpoint}
          language={language}
          theme={theme}
          onDictateStart={handleDictateStart}
          onDictateText={handleDictateText}
          onDictateEnd={handleDictateEnd}
          onDictateError={handleDictateError}
          style={{
            position: 'absolute',
            right: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            margin: 0,
          }}
        />
      </div>
    )
  }
)

DictateInput.displayName = 'DictateInput'
