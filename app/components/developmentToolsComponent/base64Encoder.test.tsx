import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Base64Encoder from './base64Encoder';
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
