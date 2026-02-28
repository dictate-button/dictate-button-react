import '@testing-library/jest-dom/vitest'

// Mock the dictate-button custom element registration
if (
  typeof customElements !== 'undefined' &&
  !customElements.get('dictate-button')
) {
  class MockDictateButton extends HTMLElement {
    connectedCallback() {
      // Mock implementation
    }
  }
  customElements.define('dictate-button', MockDictateButton)
}
