# @dictate-button/react

[![Tests](https://github.com/dictate-button/dictate-button-react/actions/workflows/test.yml/badge.svg)](https://github.com/dictate-button/dictate-button-react/actions/workflows/test.yml)

React text field components with speech-to-text dictation powered by [Dictate Button](https://github.com/dictate-button/dictate-button).

Provides a thin integration layer that avoids DOM scanning and mutation, making it fully compatible with React and any CSS framework.

## Features

- **No DOM Scanning**: Declarative React components instead of inject scripts
- **No DOM Mutation**: Integrates naturally with React's virtual DOM
- **Framework Agnostic**: Works with any CSS framework (Tailwind, Bootstrap, etc.)
- **TypeScript First**: Full type safety and IntelliSense support
- **React 19 Ready**: Built for modern React
- **Controlled & Uncontrolled**: Supports both patterns
- **Customizable**: Full control over styling and behavior

## Installation

```bash
pnpm add @dictate-button/react
```

## Registration Required

**You need to register your app on [dictate-button.io](https://dictate-button.io) to use the `@dictate-button/react` components in your app.**

To do that, visit [dash.dictate-button.io](https://dash.dictate-button.io/auth/register), create a free account and register your site.
No API key configuration needed - the service works automatically once your site is registered and verified.

## Quick Start

```tsx
import { DictateInput, DictateTextarea, DictateButton } from '@dictate-button/react';

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

      <DictateButton
        onDictateEnd={(text) => console.log('Transcribed:', text)}
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
- ✅ Works with any CSS framework or styling approach
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

### `<DictateButton />`

A standalone dictate button for custom event-based implementations.

```tsx
<DictateButton
  size={30}
  onDictateStart={() => console.log('Started')}
  onDictateText={(text) => console.log('Interim:', text)}
  onDictateEnd={(text) => console.log('Final:', text)}
  onDictateError={(error) => console.error(error)}
/>
```

Use this when you want to handle dictation events yourself without automatic text field integration.

### `useDictateButtonEventHandlers` Hook

For building custom text field integrations, use the hook to get text insertion event handlers:

```tsx
import { useRef } from 'react';
import { DictateButton, useDictateButtonEventHandlers } from '@dictate-button/react';

function CustomInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handlers = useDictateButtonEventHandlers(inputRef);

  return (
    <div style={{ position: 'relative' }}>
      <input ref={inputRef} style={{ paddingRight: '40px' }} />
      <DictateButton
        {...handlers}
        style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)' }}
      />
    </div>
  );
}
```

## Props

### DictateInput & DictateTextarea Props

All standard HTML input/textarea props are supported, plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonSize` | `number` | `30` | Size of the dictate button in pixels |
| `buttonClassName` | `string` | - | CSS class for the button |
| `apiEndpoint` | `string` | - | Custom API endpoint for transcription |
| `language` | `string` | `'en'` | Language code (e.g., 'en', 'es', 'fr') |
| `theme` | `'light' \| 'dark'` | - | Button theme |
| `onDictateStart` | `() => void` | - | Called when dictation starts (overrides text insertion if provided) |
| `onDictateText` | `(text: string) => void` | - | Called with interim results (overrides text insertion if provided) |
| `onDictateEnd` | `(text: string) => void` | - | Called with final transcription (overrides text insertion if provided) |
| `onDictateError` | `(error: Error \| string) => void` | - | Called on errors (overrides text insertion if provided) |

### DictateButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `30` | Size of the button in pixels |
| `className` | `string` | - | CSS class for the button |
| `style` | `React.CSSProperties` | - | Inline styles for the button |
| `apiEndpoint` | `string` | - | Custom API endpoint for transcription |
| `language` | `string` | `'en'` | Language code (e.g., 'en', 'es', 'fr') |
| `theme` | `'light' \| 'dark'` | - | Button theme |
| `onDictateStart` | `() => void` | - | Called when dictation starts |
| `onDictateText` | `(text: string) => void` | - | Called with interim results |
| `onDictateEnd` | `(text: string) => void` | - | Called with final transcription |
| `onDictateError` | `(error: Error \| string) => void` | - | Called on errors |

## Styling with Tailwind CSS

These components accept standard `className` props and work with any CSS framework. Here's an example using Tailwind CSS with the popular `cn()` utility for conditional classes:

```tsx
import { DictateInput } from '@dictate-button/react';
import { cn } from '@/lib/utils'; // clsx + tailwind-merge utility

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

The `cn()` utility is commonly used in Tailwind projects to merge class names. It's not specific to any component library.

## Examples

See [EXAMPLES.md](./EXAMPLES.md) for comprehensive usage examples including:

- Basic usage
- Tailwind CSS styling
- Controlled components
- Custom event handlers
- React Hook Form integration
- Advanced hook usage

## TypeScript

All components and hooks are fully typed. Import types as needed:

```tsx
import type {
  DictateButtonComponentProps,
  DictateInputProps,
  DictateTextareaProps,
  UseDictateButtonEventHandlersReturn,
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
