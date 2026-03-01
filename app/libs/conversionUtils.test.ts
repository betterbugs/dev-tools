import {
  decimalToBinary,
  binaryToDecimal,
  decimalToHex,
  hexToDecimal,
  decimalToOctal,
  octalToDecimal,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  kmToMiles,
  milesToKm,
} from '../../app/libs/conversionUtils';

describe('Conversion Utilities', () => {
  describe('decimalToBinary', () => {
    it('should convert decimal to binary', () => {
      expect(decimalToBinary(5)).toEqual({ binary: '101', error: null });
    });

    it('should convert zero', () => {
      expect(decimalToBinary(0)).toEqual({ binary: '0', error: null });
    });

    it('should convert large numbers', () => {
      expect(decimalToBinary(255)).toEqual({ binary: '11111111', error: null });
    });

    it('should reject non-integers', () => {
      const result = decimalToBinary(5.5);
      expect(result.error).not.toBeNull();
    });
  });

  describe('binaryToDecimal', () => {
    it('should convert binary to decimal', () => {
      expect(binaryToDecimal('101')).toEqual({ decimal: 5, error: null });
    });

    it('should handle whitespace', () => {
      expect(binaryToDecimal('  101  ')).toEqual({ decimal: 5, error: null });
    });

    it('should convert zeros and ones', () => {
      expect(binaryToDecimal('11111111')).toEqual({ decimal: 255, error: null });
    });

    it('should reject invalid binary', () => {
      const result = binaryToDecimal('102');
      expect(result.error).not.toBeNull();
    });

    it('should reject non-binary characters', () => {
      const result = binaryToDecimal('abc');
      expect(result.error).not.toBeNull();
    });
  });

  describe('decimalToHex', () => {
    it('should convert decimal to hex', () => {
      expect(decimalToHex(255)).toEqual({ hex: 'FF', error: null });
    });

    it('should convert small numbers', () => {
      expect(decimalToHex(10)).toEqual({ hex: 'A', error: null });
      expect(decimalToHex(15)).toEqual({ hex: 'F', error: null });
    });

    it('should return uppercase', () => {
      const result = decimalToHex(255);
      expect(result.hex).toBe('FF');
    });

    it('should reject negative numbers', () => {
      const result = decimalToHex(-1);
      expect(result.error).not.toBeNull();
    });

    it('should reject non-integers', () => {
      const result = decimalToHex(5.5);
      expect(result.error).not.toBeNull();
    });
  });

  describe('hexToDecimal', () => {
    it('should convert hex to decimal', () => {
      expect(hexToDecimal('FF')).toEqual({ decimal: 255, error: null });
    });

    it('should handle lowercase', () => {
      expect(hexToDecimal('ff')).toEqual({ decimal: 255, error: null });
    });

    it('should handle 0x prefix', () => {
      expect(hexToDecimal('0xFF')).toEqual({ decimal: 255, error: null });
    });

    it('should handle whitespace', () => {
      expect(hexToDecimal('  FF  ')).toEqual({ decimal: 255, error: null });
    });

    it('should reject invalid hex', () => {
      const result = hexToDecimal('GG');
      expect(result.error).not.toBeNull();
    });
  });

  describe('decimalToOctal', () => {
    it('should convert decimal to octal', () => {
      expect(decimalToOctal(8)).toEqual({ octal: '10', error: null });
    });

    it('should convert zero', () => {
      expect(decimalToOctal(0)).toEqual({ octal: '0', error: null });
    });

    it('should reject negative numbers', () => {
      const result = decimalToOctal(-1);
      expect(result.error).not.toBeNull();
    });
  });

  describe('octalToDecimal', () => {
    it('should convert octal to decimal', () => {
      expect(octalToDecimal('10')).toEqual({ decimal: 8, error: null });
    });

    it('should handle whitespace', () => {
      expect(octalToDecimal('  10  ')).toEqual({ decimal: 8, error: null });
    });

    it('should reject invalid octal', () => {
      const result = octalToDecimal('89');
      expect(result.error).not.toBeNull();
    });
  });

  describe('celsiusToFahrenheit', () => {
    it('should convert 0°C to 32°F', () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
    });

    it('should convert 100°C to 212°F', () => {
      expect(celsiusToFahrenheit(100)).toBe(212);
    });

    it('should convert -40°C to -40°F', () => {
      expect(celsiusToFahrenheit(-40)).toBe(-40);
    });

    it('should handle decimal values', () => {
      const result = celsiusToFahrenheit(37);
      expect(result).toBeCloseTo(98.6, 1);
    });
  });

  describe('fahrenheitToCelsius', () => {
    it('should convert 32°F to 0°C', () => {
      expect(fahrenheitToCelsius(32)).toBe(0);
    });

    it('should convert 212°F to 100°C', () => {
      expect(fahrenheitToCelsius(212)).toBe(100);
    });

    it('should convert -40°F to -40°C', () => {
      expect(fahrenheitToCelsius(-40)).toBe(-40);
    });

    it('should handle decimal values', () => {
      const result = fahrenheitToCelsius(98.6);
      expect(result).toBeCloseTo(37, 0);
    });
  });

  describe('kmToMiles', () => {
    it('should convert 1 km to miles', () => {
      expect(kmToMiles(1)).toBeCloseTo(0.621371, 5);
    });

    it('should convert 10 km to miles', () => {
      expect(kmToMiles(10)).toBeCloseTo(6.21371, 5);
    });

    it('should handle zero', () => {
      expect(kmToMiles(0)).toBe(0);
    });
  });

  describe('milesToKm', () => {
    it('should convert 1 mile to km', () => {
      expect(milesToKm(1)).toBeCloseTo(1.609344, 5);
    });

    it('should convert 10 miles to km', () => {
      expect(milesToKm(10)).toBeCloseTo(16.09344, 5);
    });

    it('should handle zero', () => {
      expect(milesToKm(0)).toBe(0);
    });
  });
});
