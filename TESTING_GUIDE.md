# Testing Guide for Contributors

This guide will help you write tests for new tool components in the dev-tools repository.

## Quick Start: Writing Tests for a New Tool

### Step 1: Extract Business Logic

Before writing component tests, extract the core logic into utility functions that are easier to test in isolation.

**Before (all logic in component):**
```typescript
const MyEncoder = () => {
  const [input, setInput] = useState("");
  
  const encode = (text: string) => {
    // Complex encoding logic
    return encoded;
  };
};
```

**After (logic in util file):**
```typescript
// myEncoderUtils.ts
export const encodeText = (text: string) => {
  // Complex encoding logic
  return encoded;
};

// Component stays simple and focused on UI
const MyEncoder = () => {
  const [input, setInput] = useState("");
  const encoded = useMemo(() => encodeText(input), [input]);
  // ... rest of component
};
```

### Step 2: Create Utility Tests

Create a test file for your utility functions:

```typescript
// app/libs/myEncoderUtils.test.ts
import { encodeText, decodeText, validateInput } from './myEncoderUtils';

describe('MyEncoder Utilities', () => {
  describe('encodeText', () => {
    it('should encode simple text', () => {
      expect(encodeText('hello')).toBe('expected_output');
    });

    it('should handle empty input', () => {
      expect(encodeText('')).toBe('');
    });

    it('should handle special characters', () => {
      expect(encodeText('!@#$')).toBe('expected_output');
    });
  });

  describe('decodeText', () => {
    // Add tests for decode function
  });

  describe('validateInput', () => {
    // Add tests for validation
  });
});
```

### Step 3: Create Component Tests

```typescript
// app/components/developmentToolsComponent/myEncoder.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyEncoder from './myEncoder';

describe('MyEncoder Component', () => {
  it('should render input and output fields', () => {
    render(<MyEncoder />);
    
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('output')).toBeInTheDocument();
  });

  it('should update output when input changes', async () => {
    render(<MyEncoder />);
    const input = screen.getByTestId('input');
    
    await userEvent.type(input, 'test');
    
    expect(screen.getByTestId('output')).toHaveValue('expected');
  });

  it('should show copy button when output is not empty', async () => {
    render(<MyEncoder />);
    
    await userEvent.type(screen.getByTestId('input'), 'test');
    
    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
  });

  it('should copy output to clipboard', async () => {
    render(<MyEncoder />);
    
    await userEvent.type(screen.getByTestId('input'), 'test');
    await userEvent.click(screen.getByTestId('copy-button'));
    
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
```

## Testing Different Tool Types

### 1. Encoder/Decoder Tools

```typescript
describe('Base64Decoder', () => {
  it('should decode valid Base64', () => {
    const { decoded } = decodeBase64('aGVsbG8=', false);
    expect(decoded).toBe('hello');
  });

  it('should return error for invalid Base64', () => {
    const { error } = decodeBase64('!!!invalid!!!', false);
    expect(error).not.toBeNull();
  });

  it('should handle URL-safe variants', () => {
    const { decoded, error } = decodeBase64('aGVs-bG8=', true);
    expect(error).toBeNull();
  });
});
```

### 2. Converter Tools

```typescript
describe('Unit Converter', () => {
  it('should convert between units accurately', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  it('should handle negative values', () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  it('should handle decimal values', () => {
    const result = celsiusToFahrenheit(37);
    expect(result).toBeCloseTo(98.6, 1);
  });
});
```

### 3. Validator Tools

```typescript
describe('JSONValidator', () => {
  it('should validate correct JSON', () => {
    const result = validateJSON('{"name":"John"}');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject invalid JSON', () => {
    const result = validateJSON('{invalid}');
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should provide helpful error messages', () => {
    const result = validateJSON('{incomplete');
    expect(result.errors[0]).toContain('Syntax Error');
  });
});
```

### 4. Generator Tools

```typescript
describe('RandomGenerator', () => {
  it('should generate unique values', () => {
    const set = new Set();
    for (let i = 0; i < 100; i++) {
      set.add(generateRandom());
    }
    expect(set.size).toBeGreaterThan(95); // Allow some duplicates
  });

  it('should generate values within specified range', () => {
    const value = generateRandom(1, 10);
    expect(value).toBeGreaterThanOrEqual(1);
    expect(value).toBeLessThanOrEqual(10);
  });
});
```

### 5. Formatter Tools

```typescript
describe('JSONFormatter', () => {
  it('should format minified JSON', () => {
    const result = formatJSON('{"name":"John"}', 2);
    expect(result.error).toBeNull();
    expect(result.formatted).toContain('\n');
  });

  it('should respect indentation options', () => {
    const result2 = formatJSON('{"name":"John"}', 2);
    const result4 = formatJSON('{"name":"John"}', 4);
    
    expect(result4.formatted.length).toBeGreaterThan(result2.formatted.length);
  });
});
```

## Testing Checklist

For each new tool component, ensure you test:

- ✅ **Happy Path**: Normal usage with valid input
- ✅ **Edge Cases**: Empty input, single character, maximum length
- ✅ **Error Handling**: Invalid input, malformed data
- ✅ **UI Interactions**: Button clicks, text input, copy/paste
- ✅ **Output Accuracy**: Correct transformation/validation results
- ✅ **Error Messages**: Clear, helpful error messages
- ✅ **Accessibility**: Proper labels, ARIA attributes (if applicable)
- ✅ **Performance**: Handles large inputs efficiently

## Common Test Utilities

### Render Component with Props

```typescript
render(<MyEncoder defaultInput="test" maxLength={100} />);
```

### Query Elements

```typescript
// Best practice: use data-testid
screen.getByTestId('my-element')

// By text content
screen.getByText('Copy')
screen.getByText(/copy/i) // case-insensitive

// By role (most accessible)
screen.getByRole('button', { name: /copy/i })
screen.getByRole('textbox', { name: /input/i })
```

### User Interactions

```typescript
// Type into input
await userEvent.type(inputElement, 'hello');

// Click button
await userEvent.click(buttonElement);

// Select option
await userEvent.selectOptions(selectElement, 'option-value');

// Copy to clipboard
await userEvent.click(copyButton);
expect(navigator.clipboard.writeText).toHaveBeenCalled();
```

### Assertions

```typescript
// Visibility
expect(element).toBeVisible();
expect(element).toBeInTheDocument();
expect(element).toBeDisabled();

// Text content
expect(element).toHaveTextContent('expected text');
expect(element).toHaveValue('input value');

// Attributes
expect(element).toHaveAttribute('placeholder', 'Enter text');
expect(element).toHaveClass('btn-primary');

// Functions
expect(mockFunction).toHaveBeenCalled();
expect(mockFunction).toHaveBeenCalledWith('arg1', 'arg2');
```

## Mocking Guide

### Mock Clipboard API

```typescript
// Already set up in jest.setup.ts
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});
```

### Mock File Operations

```typescript
const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });
const input = screen.getByTestId('file-input');

await userEvent.upload(input, mockFile);
```

### Mock fetch (if needed)

```typescript
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mock' }),
  })
);

// In test
expect(fetch).toHaveBeenCalledWith('/api/endpoint');
```

## Running Tests During Development

### Watch Mode for Single File

```bash
npm test -- encodingUtils.test.ts --watch
```

### Debug Mode

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
# Then open chrome://inspect in Chrome DevTools
```

### Coverage for Specific File

```bash
npm run test:coverage -- encodingUtils.test.ts
```

## PR Checklist for Tests

Before submitting a PR with new features:

```
- [ ] All tests pass: npm test
- [ ] Coverage maintained: npm run test:coverage
- [ ] New edge cases covered
- [ ] Error handling tested
- [ ] Component UI interactions verified
- [ ] Test names are descriptive
- [ ] No hardcoded values in tests
- [ ] Mocked external dependencies
- [ ] Tests are isolated and independent
```

## Getting Help

- **Test Failures**: Run `npm test -- --verbose` for detailed output
- **Coverage Gaps**: Check `coverage/index.html` for untested code paths
- **Best Practices**: Review existing tests in `app/libs/` directory
- **Questions**: Check [TESTING.md](./TESTING.md) or open an issue

---

Happy testing! 🧪
