# Usage Examples

## Basic Usage

### DictateInput Component

```tsx
import { DictateInput } from '@dictate-button/react';

function MyForm() {
  return (
    <div>
      <label htmlFor="name">Name:</label>
      <DictateInput
        id="name"
        type="text"
        placeholder="Enter your name..."
        className="my-input-class"
      />
    </div>
  );
}
```

### DictateTextarea Component

```tsx
import { DictateTextarea } from '@dictate-button/react';

function MyTextArea() {
  return (
    <div>
      <label htmlFor="bio">Biography:</label>
      <DictateTextarea
        id="bio"
        rows={5}
        placeholder="Tell us about yourself..."
        className="my-textarea-class"
      />
    </div>
  );
}
```

## ShadCN Integration

These components work seamlessly with ShadCN components by using the same patterns:

```tsx
import { DictateInput, DictateTextarea } from '@dictate-button/react';
import { cn } from '@/lib/utils';

function ShadCNForm() {
  return (
    <div className="space-y-4">
      <DictateInput
        type="text"
        placeholder="Email"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />

      <DictateTextarea
        placeholder="Message"
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
    </div>
  );
}
```

## Controlled Components

```tsx
import { useState } from 'react';
import { DictateInput } from '@dictate-button/react';

function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <DictateInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Controlled input"
    />
  );
}
```

## Custom Event Handlers

```tsx
import { DictateInput } from '@dictate-button/react';

function EventHandlingExample() {
  return (
    <DictateInput
      placeholder="Start speaking..."
      onDictateStart={() => console.log('Dictation started')}
      onDictateText={(text) => console.log('Interim text:', text)}
      onDictateEnd={(finalText) => console.log('Final text:', finalText)}
      onDictateError={(error) => console.error('Dictation error:', error)}
    />
  );
}
```

## Custom Button Size and API Endpoint

```tsx
import { DictateTextarea } from '@dictate-button/react';

function CustomConfig() {
  return (
    <DictateTextarea
      buttonSize={40}
      apiEndpoint="https://your-api.com/transcribe"
      language="es"
      theme="dark"
      placeholder="Habla ahora..."
    />
  );
}
```

## Using with React Hook Form

```tsx
import { useForm } from 'react-hook-form';
import { DictateInput, DictateTextarea } from '@dictate-button/react';

interface FormData {
  name: string;
  message: string;
}

function ReactHookFormExample() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DictateInput
        {...register('name')}
        placeholder="Your name"
      />

      <DictateTextarea
        {...register('message')}
        placeholder="Your message"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Advanced: Using the Hook Directly

For complete control, you can use the `useDictateButton` hook directly:

```tsx
import { useRef } from 'react';
import { useDictateButton } from '@dictate-button/react';

function CustomComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { buttonRef, wrapperRef } = useDictateButton(inputRef, {
    size: 30,
    onDictateEnd: (text) => console.log('Dictated:', text),
  });

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type="text"
        style={{ paddingRight: '40px' }}
      />
      <dictate-button
        ref={buttonRef}
        size={30}
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
    </div>
  );
}
```

## TypeScript Support

All components are fully typed:

```tsx
import type {
  DictateInputProps,
  DictateTextareaProps,
  UseDictateButtonOptions,
  DictateButtonElement,
} from '@dictate-button/react';

const props: DictateInputProps = {
  buttonSize: 30,
  apiEndpoint: 'https://api.example.com',
  language: 'en',
  theme: 'light',
  onDictateEnd: (text: string) => console.log(text),
};
```

## Key Differences from dictate-button Inject Scripts

**Traditional inject approach (NOT used here):**
```javascript
// ❌ Scans and mutates DOM - not React friendly
import { injectDictateButton } from 'dictate-button/libs/injectDictateButton';
injectDictateButton('input, textarea'); // Scans all inputs
```

**This React integration (✅ Recommended):**
```tsx
// ✅ Declarative, no DOM scanning, React-friendly
import { DictateInput } from '@dictate-button/react';

<DictateInput />
```

The React integration:
- No DOM scanning with `querySelectorAll`
- No direct DOM mutation
- Fully declarative and React-friendly
- Works with ShadCN and other component libraries
- Supports refs, controlled components, and React patterns
- Full TypeScript support
