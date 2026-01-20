# Claude Development Notes

## Type Checking

Always run type checking before committing changes:

```bash
pnpm typecheck
```

This runs `tsc --noEmit` to verify TypeScript types without generating output files.

## Project Commands

- `pnpm build` - Build the library for distribution
- `pnpm dev` - Watch mode for development
- `pnpm typecheck` - Check TypeScript types
- `pnpm test` - Run tests once
- `pnpm test:watch` - Run tests in watch mode

## Architecture Notes

### No DOM Scanning
This package provides a thin integration layer over `dictate-button` that avoids the inject scripts which scan/mutate the DOM. Instead, we use:
- React components that declaratively render the web component
- The `useDictateButton` hook to manage event listeners
- Static imports of 'dictate-button' to register the custom element

### Key Files
- `src/types.ts` - TypeScript definitions for the web component
- `src/useDictateButton.ts` - Core hook that manages the dictate-button element
- `src/DictateInput.tsx` - Input component wrapper
- `src/DictateTextarea.tsx` - Textarea component wrapper
- `test/*.test.tsx` - Component and hook tests
- `test/setup.ts` - Test environment setup

### React 19 Only
This package is configured for React 19 only (not React 18). See `peerDependencies` in package.json.
