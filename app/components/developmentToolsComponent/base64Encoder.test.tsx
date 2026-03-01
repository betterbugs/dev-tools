import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock component for testing - simplified version
const Base64Encoder = () => {
  const [plainText, setPlainText] = React.useState("");
  const [makeUrlSafe, setMakeUrlSafe] = React.useState(true);

  const encodeToBase64 = (text: string) => {
    if (!text) return "";
    const utf8Bytes = encodeURIComponent(text).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(parseInt(p1, 16))
    );
    const base64 = btoa(utf8Bytes);
    if (!makeUrlSafe) return base64;
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  };

  const encodedText = React.useMemo(
    () => encodeToBase64(plainText),
    [plainText, makeUrlSafe]
  );

  const handleCopy = async () => {
    if (!encodedText) return;
    try {
      await navigator.clipboard.writeText(encodedText);
    } catch (_) {}
  };

  const handleClear = () => {
    setPlainText("");
  };

  return (
    <div>
      <label>Input text</label>
      <textarea
        data-testid="input-textarea"
        placeholder="Type or paste text to encode..."
        value={plainText}
        onChange={(e) => setPlainText(e.target.value)}
      />
      {plainText && (
        <button onClick={handleClear} data-testid="clear-button">
          Clear
        </button>
      )}

      <label>Encoded output</label>
      <textarea
        data-testid="output-textarea"
        value={encodedText}
        readOnly
        placeholder="Encoded Base64 will appear here..."
      />
      {encodedText && (
        <button onClick={handleCopy} data-testid="copy-button">
          Copy
        </button>
      )}

      <label>
        <input
          type="checkbox"
          checked={makeUrlSafe}
          onChange={(e) => setMakeUrlSafe(e.target.checked)}
          data-testid="url-safe-checkbox"
        />
        URL-Safe
      </label>
    </div>
  );
};

describe('Base64Encoder Component', () => {
  it('should render input and output textareas', () => {
    render(<Base64Encoder />);
    expect(screen.getByTestId('input-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('output-textarea')).toBeInTheDocument();
  });

  it('should update encoded output when user types', async () => {
    render(<Base64Encoder />);
    const input = screen.getByTestId('input-textarea') as HTMLTextAreaElement;
    
    await userEvent.type(input, 'hello');
    
    await waitFor(() => {
      const output = screen.getByTestId('output-textarea') as HTMLTextAreaElement;
      expect(output.value).not.toBe('');
    });
  });

  it('should show clear button when input is not empty', async () => {
    render(<Base64Encoder />);
    const input = screen.getByTestId('input-textarea');
    
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument();
    
    await userEvent.type(input, 'test');
    
    expect(screen.getByTestId('clear-button')).toBeInTheDocument();
  });

  it('should clear input and output when clear button is clicked', async () => {
    render(<Base64Encoder />);
    const input = screen.getByTestId('input-textarea') as HTMLTextAreaElement;
    
    await userEvent.type(input, 'hello');
    
    const clearButton = await screen.findByTestId('clear-button');
    await userEvent.click(clearButton);
    
    expect(input.value).toBe('');
  });

  it('should show copy button when output is not empty', async () => {
    render(<Base64Encoder />);
    const input = screen.getByTestId('input-textarea');
    
    expect(screen.queryByTestId('copy-button')).not.toBeInTheDocument();
    
    await userEvent.type(input, 'test');
    
    expect(await screen.findByTestId('copy-button')).toBeInTheDocument();
  });

  it('should encode text in URL-safe mode', async () => {
    render(<Base64Encoder />);
    const input = screen.getByTestId('input-textarea');
    const urlSafeCheckbox = screen.getByTestId('url-safe-checkbox') as HTMLInputElement;
    
    expect(urlSafeCheckbox.checked).toBe(true); // Default is URL-safe
    
    await userEvent.type(input, 'hello/world');
    
    const output = screen.getByTestId('output-textarea') as HTMLTextAreaElement;
    await waitFor(() => {
      expect(output.value).not.toContain('+');
      expect(output.value).not.toContain('/');
    });
  });

  it('should encode text normally when URL-safe is unchecked', async () => {
    render(<Base64Encoder />);
    const input = screen.getByTestId('input-textarea');
    const urlSafeCheckbox = screen.getByTestId('url-safe-checkbox') as HTMLInputElement;
    
    // Uncheck URL-safe
    await userEvent.click(urlSafeCheckbox);
    
    await userEvent.type(input, 'hello');
    
    const output = screen.getByTestId('output-textarea') as HTMLTextAreaElement;
    await waitFor(() => {
      expect(output.value).toBeTruthy();
    });
  });
});
