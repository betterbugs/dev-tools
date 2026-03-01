import { parseHex, hexToRgb, rgbToHex, validateHexColor } from '../../app/libs/colorUtils';

describe('Color Utilities', () => {
  describe('parseHex', () => {
    it('should parse 6-digit hex color', () => {
      const result = parseHex('#FF5733');
      expect(result).toEqual({ r: 255, g: 87, b: 51 });
    });

    it('should parse hex color without #', () => {
      const result = parseHex('FF5733');
      expect(result).toEqual({ r: 255, g: 87, b: 51 });
    });

    it('should parse 3-digit hex color', () => {
      const result = parseHex('#FFF');
      expect(result).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('should parse 8-digit hex with alpha', () => {
      const result = parseHex('#FF5733FF');
      expect(result).toEqual({ r: 255, g: 87, b: 51, a: 1 });
    });

    it('should parse 4-digit hex with alpha', () => {
      const result = parseHex('#FFF0');
      expect(result).toEqual({ r: 255, g: 255, b: 255, a: 0 });
    });

    it('should handle lowercase hex', () => {
      const result = parseHex('#abc');
      expect(result).toEqual({ r: 170, g: 187, b: 204 });
    });

    it('should return null for invalid hex length', () => {
      expect(parseHex('#FF')).toBeNull();
      expect(parseHex('#FFFFF')).toBeNull();
    });

    it('should return null for invalid hex characters', () => {
      expect(parseHex('#GGGGGG')).toBeNull();
      expect(parseHex('#12345G')).toBeNull();
    });

    it('should trim whitespace', () => {
      const result = parseHex('  #FF5733  ');
      expect(result).toEqual({ r: 255, g: 87, b: 51 });
    });
  });

  describe('hexToRgb', () => {
    it('should convert hex to rgb string', () => {
      const result = hexToRgb('#FF5733', true);
      expect(result).toBe('rgb(255, 87, 51)');
    });

    it('should return raw RGB values', () => {
      const result = hexToRgb('#FF5733', false);
      expect(result).toBe('255, 87, 51');
    });

    it('should handle hex with alpha as CSS rgba', () => {
      const result = hexToRgb('#FF5733FF', true);
      expect(result).toContain('rgba');
      expect(result).toContain('1)');
    });

    it('should return null for invalid hex', () => {
      expect(hexToRgb('#GGGGGG', true)).toBeNull();
      expect(hexToRgb('#123', false)).not.toBeNull();
    });

    it('should work without # symbol', () => {
      const result = hexToRgb('FF5733', true);
      expect(result).toBe('rgb(255, 87, 51)');
    });
  });

  describe('rgbToHex', () => {
    it('should convert RGB to hex', () => {
      const result = rgbToHex(255, 87, 51);
      expect(result).toBe('#FF5733');
    });

    it('should convert RGB to hex with alpha', () => {
      const result = rgbToHex(255, 87, 51, 1);
      expect(result).toBe('#FF5733FF');
    });

    it('should convert RGB to hex with partial alpha', () => {
      const result = rgbToHex(255, 255, 255, 0.5);
      expect(result).toBe('#FFFFFF80'); // 0.5 * 255 = 127.5, rounds to 128 (0x80)
    });

    it('should pad single digit values', () => {
      const result = rgbToHex(1, 2, 3);
      expect(result).toBe('#010203');
    });

    it('should handle zero values', () => {
      const result = rgbToHex(0, 0, 0);
      expect(result).toBe('#000000');
    });
  });

  describe('validateHexColor', () => {
    it('should validate correct hex colors', () => {
      expect(validateHexColor('#FF5733')).toBe(true);
      expect(validateHexColor('#FFF')).toBe(true);
      expect(validateHexColor('#FF5733FF')).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      expect(validateHexColor('#GGGGGG')).toBe(false);
      expect(validateHexColor('#FF')).toBe(false);
      expect(validateHexColor('notahex')).toBe(false);
    });

    it('should validate hex without #', () => {
      expect(validateHexColor('FF5733')).toBe(true);
    });
  });
});
