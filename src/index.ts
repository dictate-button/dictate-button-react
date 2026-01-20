// Import types.ts to ensure module augmentation is processed
import './types';

export { DictateButton } from './DictateButton';
export { DictateInput } from './DictateInput';
export { DictateTextarea } from './DictateTextarea';
export { useDictateButtonEventHandlers } from './useDictateButtonEventHandlers';
export type {
  DictateButtonComponentProps,
} from './DictateButton';
export type {
  DictateInputProps,
} from './DictateInput';
export type {
  DictateTextareaProps,
} from './DictateTextarea';
export type {
  UseDictateButtonEventHandlersReturn,
} from './useDictateButtonEventHandlers';
export type {
  DictateButtonProps,
  DictateButtonElement,
  DictateStartEvent,
  DictateTextEvent,
  DictateEndEvent,
  DictateErrorEvent,
} from './types';
