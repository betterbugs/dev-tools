import { validateJSON, analyzeJSON, formatJSON, minifyJSON } from '../../app/libs/jsonUtils';

describe('JSON Utilities', () => {
  describe('validateJSON', () => {
    it('should validate correct JSON', () => {
      const result = validateJSON('{"name": "John", "age": 30}');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate JSON array', () => {
      const result = validateJSON('[1, 2, 3, 4, 5]');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate empty object', () => {
      const result = validateJSON('{}');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate empty array', () => {
      const result = validateJSON('[]');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid JSON', () => {
      const result = validateJSON('{invalid json}');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject empty string', () => {
      const result = validateJSON('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('JSON string is empty');
    });

    it('should reject trailing commas', () => {
      const result = validateJSON('{"name": "John",}');
      expect(result.isValid).toBe(false);
    });

    it('should handle nested objects', () => {
      const result = validateJSON('{"user": {"name": "John", "address": {"city": "NYC"}}}');
      expect(result.isValid).toBe(true);
      expect(result.stats).toBeDefined();
      expect(result.stats?.maxDepth).toBeGreaterThan(2);
    });

    it('should handle mixed types', () => {
      const result = validateJSON('[1, "string", true, null, {"key": "value"}]');
      expect(result.isValid).toBe(true);
    });
  });

  describe('analyzeJSON', () => {
    it('should count keys in object', () => {
      const obj = { name: 'John', age: 30, email: 'john@example.com' };
      const result = analyzeJSON(obj);
      expect(result.totalKeys).toBe(3);
    });

    it('should calculate max depth', () => {
      const obj = { user: { profile: { name: 'John' } } };
      const result = analyzeJSON(obj);
      expect(result.maxDepth).toBeGreaterThanOrEqual(3);
    });

    it('should count data types', () => {
      const obj = { string_val: 'hello', number_val: 42, bool_val: true, null_val: null };
      const result = analyzeJSON(obj);
      expect(result.dataTypes.string).toBeGreaterThan(0);
      expect(result.dataTypes.number).toBeGreaterThan(0);
      expect(result.dataTypes.boolean).toBeGreaterThan(0);
      expect(result.dataTypes.null).toBeGreaterThan(0);
    });

    it('should handle arrays', () => {
      const obj = [1, 2, 3, { key: 'value' }];
      const result = analyzeJSON(obj);
      expect(result.dataTypes.array).toBeGreaterThan(0);
    });
  });

  describe('formatJSON', () => {
    it('should format minified JSON', () => {
      const minified = '{"name":"John","age":30}';
      const result = formatJSON(minified, 2);
      expect(result.error).toBeNull();
      expect(result.formatted).toContain('\n');
      expect(result.formatted).toContain('  ');
    });

    it('should handle custom indentation', () => {
      const json = '{"name":"John"}';
      const result = formatJSON(json, 4);
      expect(result.error).toBeNull();
      expect(result.formatted).toContain('    ');
    });

    it('should handle arrays', () => {
      const json = '[1,2,3,4,5]';
      const result = formatJSON(json, 2);
      expect(result.error).toBeNull();
      expect(result.formatted).toContain('\n');
    });

    it('should return error for invalid JSON', () => {
      const result = formatJSON('{invalid}', 2);
      expect(result.error).not.toBeNull();
      expect(result.formatted).toBe('');
    });
  });

  describe('minifyJSON', () => {
    it('should minify formatted JSON', () => {
      const formatted = '{\n  "name": "John",\n  "age": 30\n}';
      const result = minifyJSON(formatted);
      expect(result.error).toBeNull();
      expect(result.minified).not.toContain('\n');
    });

    it('should remove spaces after colons', () => {
      const json = '{ "name" : "John" }';
      const result = minifyJSON(json);
      expect(result.error).toBeNull();
      expect(result.minified).toBe('{"name":"John"}');
    });

    it('should return error for invalid JSON', () => {
      const result = minifyJSON('{invalid}');
      expect(result.error).not.toBeNull();
      expect(result.minified).toBe('');
    });

    it('should preserve data integrity', () => {
      const original = { name: 'John', age: 30, items: [1, 2, 3] };
      const json = JSON.stringify(original);
      const result = minifyJSON(json);
      expect(JSON.parse(result.minified)).toEqual(original);
    });
  });
});
