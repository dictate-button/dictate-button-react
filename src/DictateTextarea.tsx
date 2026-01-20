import 'dictate-button';
import React, { forwardRef, useRef } from 'react';
import { DictateButton } from './DictateButton';
import { useDictateButtonEventHandlers } from './useDictateButtonEventHandlers';
import type { DictateButtonProps } from './types';

export interface DictateTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    Omit<DictateButtonProps, 'class'> {
  buttonSize?: number;
  buttonClassName?: string;
  onDictateStart?: () => void;
  onDictateText?: (text: string) => void;
  onDictateEnd?: (finalText: string) => void;
  onDictateError?: (error: Error | string) => void;
}

export const DictateTextarea = forwardRef<HTMLTextAreaElement, DictateTextareaProps>(
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
      ...textareaProps
    },
    forwardedRef
  ) => {
    const internalTextareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef =
      (forwardedRef as React.RefObject<HTMLTextAreaElement>) || internalTextareaRef;

    const textHandlers = useDictateButtonEventHandlers(textareaRef);

    const handleDictateStart = userOnDictateStart || textHandlers.onDictateStart;
    const handleDictateText = userOnDictateText || textHandlers.onDictateText;
    const handleDictateEnd = userOnDictateEnd || textHandlers.onDictateEnd;
    const handleDictateError = userOnDictateError || textHandlers.onDictateError;

    return (
      <div
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          ...style,
        }}
      >
        <textarea
          ref={textareaRef}
          className={className}
          style={{
            paddingRight: `${buttonSize + 8}px`,
            boxSizing: 'border-box',
            width: '100%',
          }}
          {...textareaProps}
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
            top: '8px',
            margin: 0,
          }}
        />
      </div>
    );
  }
);

DictateTextarea.displayName = 'DictateTextarea';
