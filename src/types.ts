export interface DictateButtonProps {
  size?: number
  apiEndpoint?: string
  language?: string
  theme?: 'light' | 'dark'
  class?: string
}

export interface DictateButtonElement extends HTMLElement {
  size?: number
  apiEndpoint?: string
  language?: string
  theme?: 'light' | 'dark'
}

export interface DictateStartEvent extends CustomEvent<string> {
  detail: string
}

export interface DictateTextEvent extends CustomEvent<string> {
  detail: string
}

export interface DictateEndEvent extends CustomEvent<string> {
  detail: string
}

export interface DictateErrorEvent extends CustomEvent<string> {
  detail: string
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'dictate-button': React.DetailedHTMLProps<
        React.HTMLAttributes<DictateButtonElement>,
        DictateButtonElement
      > &
        DictateButtonProps
    }
  }
}
