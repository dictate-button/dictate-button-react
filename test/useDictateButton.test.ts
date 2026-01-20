import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useDictateButton } from '../src/useDictateButton';

describe('useDictateButton', () => {
  it('returns buttonRef and wrapperRef', () => {
    const { result } = renderHook(() => {
      const inputRef = useRef<HTMLInputElement>(null);
      return useDictateButton(inputRef);
    });

    expect(result.current).toHaveProperty('buttonRef');
    expect(result.current).toHaveProperty('wrapperRef');
    expect(result.current.buttonRef.current).toBeNull();
    expect(result.current.wrapperRef.current).toBeNull();
  });

  it('accepts options', () => {
    const { result } = renderHook(() => {
      const inputRef = useRef<HTMLInputElement>(null);
      return useDictateButton(inputRef, {
        size: 40,
        language: 'es',
        theme: 'dark',
      });
    });

    expect(result.current).toBeDefined();
  });

  it('accepts event handler callbacks', () => {
    const { result } = renderHook(() => {
      const inputRef = useRef<HTMLInputElement>(null);
      return useDictateButton(inputRef, {
        onDictateStart: () => {},
        onDictateText: () => {},
        onDictateEnd: () => {},
        onDictateError: () => {},
      });
    });

    expect(result.current).toBeDefined();
  });
});
