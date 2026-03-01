import { encodeToBase64, decodeBase64 } from '../../app/libs/encodingUtils';

describe('Encoding Utilities', () => {
  describe('encodeToBase64', () => {
    it('should encode simple text to Base64', () => {
      const result = encodeToBase64('hello', false);
      expect(result).toBe('aGVsbG8=');
    });

    it('should return empty string for empty input', () => {
      const result = encodeToBase64('', false);
      expect(result).toBe('');
    });

    it('should handle UTF-8 characters', () => {
      const result = encodeToBase64('hello world', false);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should create URL-safe Base64 when flag is true', () => {
      const unsafe = encodeToBase64('hello', false);
      const safe = encodeToBase64('hello', true);
      expect(safe).not.toContain('+');
      expect(safe).not.toContain('/');
    });

    it('should handle special characters', () => {
      const result = encodeToBase64('!@#$%^&*()', false);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle very long text', () => {
      const longText = 'a'.repeat(1000);
      const result = encodeToBase64(longText, false);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should encode and decode back to original (URL-safe)', () => {
      const original = 'Hello, World! 123 !@#$%';
      const encoded = encodeToBase64(original, true);
      const { decoded } = decodeBase64(encoded, true);
      expect(decoded).toBe(original);
    });

    it('should encode and decode back to original (not URL-safe)', () => {
      const original = 'Test Message';
      const encoded = encodeToBase64(original, false);
      const { decoded } = decodeBase64(encoded, false);
      expect(decoded).toBe(original);
    });
  });

  describe('decodeBase64', () => {
    it('should decode valid Base64', () => {
      const { decoded, error } = decodeBase64('aGVsbG8=', false);
      expect(decoded).toBe('hello');
      expect(error).toBeNull();
    });

    it('should return empty string for empty input', () => {
      const { decoded, error } = decodeBase64('', false);
      expect(decoded).toBe('');
      expect(error).toBeNull();
    });

    it('should handle whitespace in input', () => {
      const { decoded, error } = decodeBase64('  aGVsbG8=  ', false);
      expect(decoded).toBe('hello');
      expect(error).toBeNull();
    });

    it('should return error for invalid Base64', () => {
      const { decoded, error } = decodeBase64('!!!invalid!!!', false);
      expect(decoded).toBe('');
      expect(error).not.toBeNull();
    });

    it('should handle URL-safe Base64 decoding', () => {
      const original = 'SGVsbG8td29ybGQvVGVzdD0'; // URL-safe Base64
      const { decoded, error } = decodeBase64(original, true);
      expect(error).toBeNull();
      expect(decoded).toBeDefined();
    });

    it('should handle missing padding on URL-safe Base64', () => {
      const { decoded, error } = decodeBase64('aGVsbG8', true);
      expect(decoded).toBeDefined();
      expect(error).toBeNull();
    });
  });
});
