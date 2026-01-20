import 'dictate-button';
import React, { forwardRef, useRef } from 'react';
import { useDictateButton, type UseDictateButtonOptions } from './useDictateButton';
import type { DictateButtonElement } from './types';

export interface DictateTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    UseDictateButtonOptions {
  buttonSize?: number;
  buttonClassName?: string;
}

export const DictateTextarea = forwardRef<HTMLTextAreaElement, DictateTextareaProps>(
  (
    {
      buttonSize = 30,
      buttonClassName,
      apiEndpoint,
      language,
      theme,
      onDictateStart,
      onDictateText,
      onDictateEnd,
      onDictateError,
      className,
      style,
      ...textareaProps
    },
    forwardedRef
  ) => {
    const internalTextareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef =
      (forwardedRef as React.RefObject<HTMLTextAreaElement>) || internalTextareaRef;

    const { buttonRef, wrapperRef } = useDictateButton(textareaRef, {
      size: buttonSize,
      apiEndpoint,
      language,
      theme,
      onDictateStart,
      onDictateText,
      onDictateEnd,
      onDictateError,
    });

    return (
      <div
        ref={wrapperRef}
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
        <dictate-button
          ref={buttonRef as React.Ref<DictateButtonElement>}
          size={buttonSize}
          class={buttonClassName}
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
