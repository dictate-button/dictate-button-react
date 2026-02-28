// Import types.ts to ensure module augmentation is processed
import './types'

export type { DictateButtonComponentProps } from './DictateButton'
export { DictateButton } from './DictateButton'
export type { DictateInputProps } from './DictateInput'
export { DictateInput } from './DictateInput'
export type { DictateTextareaProps } from './DictateTextarea'
export { DictateTextarea } from './DictateTextarea'
export type {
  DictateButtonElement,
  DictateButtonProps,
  DictateEndEvent,
  DictateErrorEvent,
  DictateStartEvent,
  DictateTextEvent,
} from './types'
export type { UseDictateButtonEventHandlersReturn } from './useDictateButtonEventHandlers'
export { useDictateButtonEventHandlers } from './useDictateButtonEventHandlers'
