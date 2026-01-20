import 'dictate-button';
import React, { forwardRef, useRef } from 'react';
import { useDictateButton, type UseDictateButtonOptions } from './useDictateButton';
import type { DictateButtonElement } from './types';

export interface DictateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    UseDictateButtonOptions {
  buttonSize?: number;
  buttonClassName?: string;
}

export const DictateInput = forwardRef<HTMLInputElement, DictateInputProps>(
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
      ...inputProps
    },
    forwardedRef
  ) => {
    const internalInputRef = useRef<HTMLInputElement>(null);
    const inputRef = (forwardedRef as React.RefObject<HTMLInputElement>) || internalInputRef;

    const { buttonRef, wrapperRef } = useDictateButton(inputRef, {
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
        <dictate-button
          ref={buttonRef as React.Ref<DictateButtonElement>}
          size={buttonSize}
          class={buttonClassName}
          style={{
            position: 'absolute',
            right: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            margin: 0,
          }}
        />
      </div>
    );
  }
);

DictateInput.displayName = 'DictateInput';
