import { useEffect, useRef, useCallback } from 'react';
import type {
  DictateButtonElement,
  DictateButtonProps,
  DictateTextEvent,
  DictateEndEvent,
  DictateErrorEvent,
} from './types';

export interface UseDictateButtonOptions extends Omit<DictateButtonProps, 'class'> {
  onDictateStart?: () => void;
  onDictateText?: (text: string) => void;
  onDictateEnd?: (finalText: string) => void;
  onDictateError?: (error: Error | string) => void;
}

export interface UseDictateButtonReturn {
  buttonRef: React.RefObject<DictateButtonElement | null>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export function useDictateButton(
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>,
  options: UseDictateButtonOptions = {}
): UseDictateButtonReturn {
  const buttonRef = useRef<DictateButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {
    size = 30,
    apiEndpoint,
    language,
    theme,
    onDictateStart,
    onDictateText,
    onDictateEnd,
    onDictateError,
  } = options;

  const cursorPositionRef = useRef<number | null>(null);
  const interimLengthRef = useRef<number>(0);

  const shouldAddSpaceBefore = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement, position: number): boolean => {
      const charBefore = position > 0 ? input.value.charAt(position - 1) : '';
      return charBefore !== '' && !/\s/.test(charBefore);
    },
    []
  );

  const insertInterimText = useCallback(
    (
      input: HTMLInputElement | HTMLTextAreaElement,
      text: string,
      startPos: number,
      prevLength: number
    ) => {
      const trimmed = text.trim();
      if (trimmed.length === 0 && prevLength === 0) return;

      const textToInsert = (shouldAddSpaceBefore(input, startPos) ? ' ' : '') + trimmed;
      const deleteStart = startPos;
      const deleteEnd = startPos + prevLength;

      if (typeof input.setRangeText === 'function') {
        input.setRangeText(textToInsert, deleteStart, deleteEnd, 'end');
      } else {
        input.value =
          input.value.substring(0, deleteStart) +
          textToInsert +
          input.value.substring(deleteEnd);
        const newPos = deleteStart + textToInsert.length;
        input.selectionStart = newPos;
        input.selectionEnd = newPos;
      }
    },
    [shouldAddSpaceBefore]
  );

  const insertFinalText = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement, text: string) => {
      const trimmed = text.trim();
      if (trimmed.length === 0) return;

      const selStart = input.selectionStart ?? 0;
      const selEnd = input.selectionEnd ?? 0;

      const charBefore = selStart > 0 ? input.value.charAt(selStart - 1) : '';
      const needsSpaceBefore = charBefore !== '' && !/\s/.test(charBefore);

      const charAfter = selEnd < input.value.length ? input.value.charAt(selEnd) : '';
      const needsSpaceAfter = charAfter !== '' && !/\s/.test(charAfter);

      const textToInsert =
        (needsSpaceBefore ? ' ' : '') + trimmed + (needsSpaceAfter ? ' ' : '');

      if (typeof input.setRangeText === 'function') {
        input.setRangeText(textToInsert, selStart, selEnd, 'end');
      } else {
        input.value =
          input.value.substring(0, selStart) + textToInsert + input.value.substring(selEnd);
        const newPos = selStart + textToInsert.length;
        input.selectionStart = newPos;
        input.selectionEnd = newPos;
      }

      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus({ preventScroll: true });
    },
    []
  );

  const clearInterimText = useCallback(
    (input: HTMLInputElement | HTMLTextAreaElement, startPos: number, length: number) => {
      if (length <= 0) return;

      if (typeof input.setRangeText === 'function') {
        input.setRangeText('', startPos, startPos + length, 'end');
      } else {
        input.value =
          input.value.substring(0, startPos) + input.value.substring(startPos + length);
        input.selectionStart = startPos;
        input.selectionEnd = startPos;
      }
    },
    []
  );

  useEffect(() => {
    const button = buttonRef.current;
    const input = inputRef.current;

    if (!button || !input) return;

    const handleDictateStart = () => {
      cursorPositionRef.current = input.selectionStart ?? input.value.length;
      interimLengthRef.current = 0;
      input.focus({ preventScroll: true });
      onDictateStart?.();
    };

    const handleDictateText = (event: Event) => {
      const e = event as DictateTextEvent;
      const text = e.detail;

      if (typeof text === 'string' && cursorPositionRef.current !== null) {
        insertInterimText(
          input,
          text,
          cursorPositionRef.current,
          interimLengthRef.current
        );
        interimLengthRef.current =
          text.length + (shouldAddSpaceBefore(input, cursorPositionRef.current) ? 1 : 0);
      }

      onDictateText?.(text);
    };

    const handleDictateEnd = (event: Event) => {
      const e = event as DictateEndEvent;
      const finalText = e.detail;

      if (cursorPositionRef.current !== null && interimLengthRef.current > 0) {
        clearInterimText(input, cursorPositionRef.current, interimLengthRef.current);
      }

      cursorPositionRef.current = null;
      interimLengthRef.current = 0;

      insertFinalText(input, finalText);
      onDictateEnd?.(finalText);
    };

    const handleDictateError = (event: Event) => {
      const e = event as DictateErrorEvent;
      cursorPositionRef.current = null;
      interimLengthRef.current = 0;
      input.focus({ preventScroll: true });
      onDictateError?.(e.detail);
    };

    button.addEventListener('dictate-start', handleDictateStart);
    button.addEventListener('dictate-text', handleDictateText);
    button.addEventListener('dictate-end', handleDictateEnd);
    button.addEventListener('dictate-error', handleDictateError);

    return () => {
      button.removeEventListener('dictate-start', handleDictateStart);
      button.removeEventListener('dictate-text', handleDictateText);
      button.removeEventListener('dictate-end', handleDictateEnd);
      button.removeEventListener('dictate-error', handleDictateError);
    };
  }, [
    inputRef,
    onDictateStart,
    onDictateText,
    onDictateEnd,
    onDictateError,
    insertInterimText,
    insertFinalText,
    clearInterimText,
    shouldAddSpaceBefore,
  ]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    if (size !== undefined) button.size = size;
    if (apiEndpoint !== undefined) button.apiEndpoint = apiEndpoint;
    if (language !== undefined) button.language = language;
    if (theme !== undefined) button.theme = theme;
  }, [size, apiEndpoint, language, theme]);

  return { buttonRef, wrapperRef };
}
