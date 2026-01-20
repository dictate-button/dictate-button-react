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

## DictateButton Component

The standalone button for custom event handling:

```tsx
import { useState } from 'react';
import { DictateButton } from '@dictate-button/react';

function CustomDictation() {
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div>
      <DictateButton
        size={40}
        onDictateStart={() => {
          setIsRecording(true);
          console.log('Recording started');
        }}
        onDictateText={(interimText) => {
          console.log('Interim:', interimText);
          setTranscription(interimText);
        }}
        onDictateEnd={(finalText) => {
          setIsRecording(false);
          console.log('Final:', finalText);
          setTranscription(finalText);
        }}
        onDictateError={(error) => {
          setIsRecording(false);
          console.error('Error:', error);
        }}
      />

      {isRecording && <p>Recording...</p>}
      {transcription && <p>Result: {transcription}</p>}
    </div>
  );
}
```

## Event-Driven Custom Implementations

### Building a Custom Transcription UI

```tsx
import { useState } from 'react';
import { DictateButton } from '@dictate-button/react';

function TranscriptionLogger() {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <div>
      <DictateButton
        size={50}
        language="en"
        theme="dark"
        onDictateStart={() => {
          addLog('Dictation started');
          setCurrentText('');
        }}
        onDictateText={(text) => {
          setCurrentText(text);
          addLog(`Interim: "${text}"`);
        }}
        onDictateEnd={(text) => {
          addLog(`Final: "${text}"`);
          setCurrentText(text);
        }}
        onDictateError={(error) => {
          addLog(`Error: ${error}`);
        }}
      />

      <div>
        <h3>Current Transcription:</h3>
        <p>{currentText || 'Click the button to start'}</p>
      </div>

      <div>
        <h3>Event Log:</h3>
        <ul>
          {logs.map((log, i) => (
            <li key={i}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### Multi-Language Dictation Switcher

```tsx
import { useState } from 'react';
import { DictateButton } from '@dictate-button/react';

function MultiLanguageDictation() {
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const [results, setResults] = useState<Record<string, string>>({
    en: '',
    es: '',
    fr: '',
  });

  return (
    <div>
      <div>
        <label>
          Language:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'fr')}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </label>

        <DictateButton
          language={language}
          onDictateEnd={(text) => {
            setResults((prev) => ({
              ...prev,
              [language]: text,
            }));
          }}
        />
      </div>

      <div>
        <h3>Results:</h3>
        <p>English: {results.en}</p>
        <p>Spanish: {results.es}</p>
        <p>French: {results.fr}</p>
      </div>
    </div>
  );
}
```

### Storing Dictation History

```tsx
import { useState } from 'react';
import { DictateButton } from '@dictate-button/react';

interface DictationEntry {
  id: string;
  text: string;
  timestamp: Date;
}

function DictationHistory() {
  const [history, setHistory] = useState<DictationEntry[]>([]);

  const handleDictateEnd = (text: string) => {
    const entry: DictationEntry = {
      id: crypto.randomUUID(),
      text,
      timestamp: new Date(),
    };
    setHistory((prev) => [entry, ...prev]);
  };

  return (
    <div>
      <div>
        <h2>Dictate Something</h2>
        <DictateButton onDictateEnd={handleDictateEnd} />
      </div>

      <div>
        <h2>History</h2>
        {history.length === 0 ? (
          <p>No dictations yet</p>
        ) : (
          <ul>
            {history.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.timestamp.toLocaleString()}</strong>
                <p>{entry.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

## Advanced: Building Custom Text Field Integrations

For complete control over text field integrations, you can use the `useDictateButtonEventHandlers` hook with the `DictateButton` component:

```tsx
import { useRef } from 'react';
import { DictateButton, useDictateButtonEventHandlers } from '@dictate-button/react';

function CustomTextInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handlers = useDictateButtonEventHandlers(inputRef);

  return (
    <div style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type="text"
        style={{ paddingRight: '40px' }}
        placeholder="Custom text input with dictation"
      />
      <DictateButton
        {...handlers}
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

### Extending Event Handlers

You can combine the text insertion handlers with your own custom logic:

```tsx
import { useRef } from 'react';
import { DictateButton, useDictateButtonEventHandlers } from '@dictate-button/react';

function CustomTextInputWithLogging() {
  const inputRef = useRef<HTMLInputElement>(null);
  const textHandlers = useDictateButtonEventHandlers(inputRef);

  const handleDictateStart = () => {
    textHandlers.onDictateStart();
    console.log('User started dictating');
  };

  const handleDictateEnd = (text: string) => {
    textHandlers.onDictateEnd(text);
    console.log('Transcription complete:', text);
    // Send analytics, save to backend, etc.
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type="text"
        style={{ paddingRight: '40px' }}
      />
      <DictateButton
        onDictateStart={handleDictateStart}
        onDictateText={textHandlers.onDictateText}
        onDictateEnd={handleDictateEnd}
        onDictateError={textHandlers.onDictateError}
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

All components and hooks are fully typed:

```tsx
import type {
  DictateButtonComponentProps,
  DictateInputProps,
  DictateTextareaProps,
  UseDictateButtonEventHandlersReturn,
  DictateButtonElement,
} from '@dictate-button/react';

const buttonProps: DictateButtonComponentProps = {
  size: 30,
  apiEndpoint: 'https://api.example.com',
  language: 'en',
  theme: 'light',
  onDictateEnd: (text: string) => console.log(text),
};

const inputProps: DictateInputProps = {
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
