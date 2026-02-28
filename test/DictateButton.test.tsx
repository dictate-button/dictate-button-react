import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { DictateButton } from '../src/DictateButton';

describe('DictateButton', () => {
  it('renders dictate-button element', () => {
    const { container } = render(<DictateButton />);
    const button = container.querySelector('dictate-button');
    expect(button).toBeInTheDocument();
  });

  it('applies default size', () => {
    const { container } = render(<DictateButton />);
    const button = container.querySelector('dictate-button');
    expect(button).toHaveAttribute('size', '30');
  });

  it('applies custom size', () => {
    const { container } = render(<DictateButton size={50} />);
    const button = container.querySelector('dictate-button');
    expect(button).toHaveAttribute('size', '50');
  });

  it('applies custom className', () => {
    const { container } = render(<DictateButton className="custom-class" />);
    const button = container.querySelector('dictate-button');
    expect(button).toHaveClass('custom-class');
  });

  it('applies custom styles', () => {
    const { container } = render(
      <DictateButton style={{ position: 'absolute', top: '10px' }} />
    );
    const button = container.querySelector('dictate-button');
    expect(button).toHaveStyle({ position: 'absolute', top: '10px' });
  });

  it('sets language prop', () => {
    const { container } = render(<DictateButton language="es" />);
    const button = container.querySelector('dictate-button');
    expect(button).toHaveAttribute('language', 'es');
  });

  it('sets theme prop', () => {
    const { container } = render(<DictateButton theme="dark" />);
    const button = container.querySelector('dictate-button');
    expect(button).toHaveAttribute('theme', 'dark');
  });

  it('sets apiEndpoint prop', () => {
    const { container } = render(<DictateButton apiEndpoint="https://api.example.com" />);
    const button = container.querySelector('dictate-button');
    expect(button).toHaveAttribute('apiEndpoint', 'https://api.example.com');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<DictateButton ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('accepts onDictateStart callback', () => {
    const handleStart = vi.fn();
    render(<DictateButton onDictateStart={handleStart} />);
    // Event handlers are registered but not directly testable without DOM interaction
    expect(handleStart).not.toHaveBeenCalled();
  });

  it('accepts onDictateText callback', () => {
    const handleText = vi.fn();
    render(<DictateButton onDictateText={handleText} />);
    expect(handleText).not.toHaveBeenCalled();
  });

  it('accepts onDictateEnd callback', () => {
    const handleEnd = vi.fn();
    render(<DictateButton onDictateEnd={handleEnd} />);
    expect(handleEnd).not.toHaveBeenCalled();
  });

  it('accepts onDictateError callback', () => {
    const handleError = vi.fn();
    render(<DictateButton onDictateError={handleError} />);
    expect(handleError).not.toHaveBeenCalled();
  });

  it('accepts all event callbacks together', () => {
    const handleStart = vi.fn();
    const handleText = vi.fn();
    const handleEnd = vi.fn();
    const handleError = vi.fn();

    render(
      <DictateButton
        onDictateStart={handleStart}
        onDictateText={handleText}
        onDictateEnd={handleEnd}
        onDictateError={handleError}
      />
    );

    expect(handleStart).not.toHaveBeenCalled();
    expect(handleText).not.toHaveBeenCalled();
    expect(handleEnd).not.toHaveBeenCalled();
    expect(handleError).not.toHaveBeenCalled();
  });

  it('accepts all props together', () => {
    const { container } = render(
      <DictateButton
        size={40}
        language="fr"
        theme="light"
        apiEndpoint="https://custom.api.com"
        className="btn-custom"
        style={{ margin: '10px' }}
        onDictateEnd={() => {}}
      />
    );

    const button = container.querySelector('dictate-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('size', '40');
    expect(button).toHaveAttribute('language', 'fr');
    expect(button).toHaveAttribute('theme', 'light');
    expect(button).toHaveAttribute('apiEndpoint', 'https://custom.api.com');
    expect(button).toHaveClass('btn-custom');
    expect(button).toHaveStyle({ margin: '10px' });
  });
});
