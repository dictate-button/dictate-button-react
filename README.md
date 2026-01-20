# @dictate-button/react

[![Tests](https://github.com/dictate-button/dictate-button-react/actions/workflows/test.yml/badge.svg)](https://github.com/dictate-button/dictate-button-react/actions/workflows/test.yml)

React text field components with speech-to-text dictation powered by [Dictate Button](https://github.com/dictate-button/dictate-button).

Provides a thin integration layer that avoids DOM scanning and mutation, making it fully compatible with React, ShadCN, and other modern component libraries.

## Features

- **No DOM Scanning**: Declarative React components instead of inject scripts
- **No DOM Mutation**: Integrates naturally with React's virtual DOM
- **ShadCN Compatible**: Works seamlessly with ShadCN's component patterns
- **TypeScript First**: Full type safety and IntelliSense support
- **React 19 Ready**: Built for modern React
- **Controlled & Uncontrolled**: Supports both patterns
- **Customizable**: Full control over styling and behavior

## Installation

```bash
pnpm add @dictate-button/react
```

## Quick Start

```tsx
import { DictateInput, DictateTextarea } from '@dictate-button/react';

function MyForm() {
  return (
    <div>
      <DictateInput
        type="text"
        placeholder="Start typing or click the mic..."
        className="your-input-class"
      />

      <DictateTextarea
        rows={5}
        placeholder="Or speak here..."
        className="your-textarea-class"
      />
    </div>
  );
}
```

## Why This Integration Layer?

The [dictate-button](https://github.com/dictate-button/dictate-button) package includes inject scripts that scan the DOM using `querySelectorAll` and mutate it by wrapping elements.

This integration layer provides:

- ✅ Declarative React components
- ✅ No DOM scanning or mutation
- ✅ Works with ShadCN and other UI libraries
- ✅ Full TypeScript support
- ✅ React refs, controlled components, and hooks

## Components

### `<DictateInput />`

A text input with integrated speech-to-text button.

```tsx
<DictateInput
  type="text"
  placeholder="Type or speak..."
  buttonSize={30}
  onDictateEnd={(text) => console.log(text)}
/>
```

### `<DictateTextarea />`

A textarea with integrated speech-to-text button.

```tsx
<DictateTextarea
  rows={5}
  placeholder="Type or speak..."
  buttonSize={30}
  onDictateEnd={(text) => console.log(text)}
/>
```

### `useDictateButton` Hook

For advanced usage, use the hook directly:

```tsx
import { useRef } from 'react';
import { useDictateButton } from '@dictate-button/react';

function CustomInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { buttonRef, wrapperRef } = useDictateButton(inputRef);

  return (
    <div ref={wrapperRef}>
      <input ref={inputRef} />
      <dictate-button ref={buttonRef} />
    </div>
  );
}
```

## Props

All standard HTML input/textarea props are supported, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonSize` | `number` | `30` | Size of the dictate button in pixels |
| `buttonClassName` | `string` | - | CSS class for the button |
| `apiEndpoint` | `string` | - | Custom API endpoint for transcription |
| `language` | `string` | `'en'` | Language code (e.g., 'en', 'es', 'fr') |
| `theme` | `'light' \| 'dark'` | - | Button theme |
| `onDictateStart` | `() => void` | - | Called when dictation starts |
| `onDictateText` | `(text: string) => void` | - | Called with interim results |
| `onDictateEnd` | `(text: string) => void` | - | Called with final transcription |
| `onDictateError` | `(error: Error \| string) => void` | - | Called on errors |

## ShadCN Integration

These components work perfectly with ShadCN:

```tsx
import { DictateInput } from '@dictate-button/react';
import { cn } from '@/lib/utils';

<DictateInput
  className={cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
    "text-sm ring-offset-background",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:cursor-not-allowed disabled:opacity-50"
  )}
/>
```

## Examples

See [EXAMPLES.md](./EXAMPLES.md) for comprehensive usage examples including:

- Basic usage
- ShadCN integration
- Controlled components
- Custom event handlers
- React Hook Form integration
- Advanced hook usage

## TypeScript

All components and hooks are fully typed. Import types as needed:

```tsx
import type {
  DictateInputProps,
  DictateTextareaProps,
  UseDictateButtonOptions,
} from '@dictate-button/react';
```

## Development

```bash
# Build the library
pnpm build

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Watch mode for development
pnpm dev
```

## License

Apache-2.0

## Credits

Built on top of [dictate-button](https://github.com/dictate-button/dictate-button) by the Dictate Button team.
