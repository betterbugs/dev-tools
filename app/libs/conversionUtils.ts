/**
 * Number conversion utilities
 */

export const decimalToBinary = (decimal: number): { binary: string; error: string | null } => {
  try {
    if (!Number.isInteger(decimal)) {
      return { binary: '', error: 'Input must be an integer' };
    }
    return { binary: decimal.toString(2), error: null };
  } catch (error: any) {
    return { binary: '', error: error.message };
  }
};

export const binaryToDecimal = (binary: string): { decimal: number; error: string | null } => {
  try {
    const cleaned = binary.replace(/\s/g, '');
    if (!/^[01]+$/.test(cleaned)) {
      return { decimal: 0, error: 'Binary string must contain only 0s and 1s' };
    }
    return { decimal: parseInt(cleaned, 2), error: null };
  } catch (error: any) {
    return { decimal: 0, error: error.message };
  }
};

export const decimalToHex = (decimal: number): { hex: string; error: string | null } => {
  try {
    if (!Number.isInteger(decimal) || decimal < 0) {
      return { hex: '', error: 'Input must be a non-negative integer' };
    }
    return { hex: decimal.toString(16).toUpperCase(), error: null };
  } catch (error: any) {
    return { hex: '', error: error.message };
  }
};

export const hexToDecimal = (hex: string): { decimal: number; error: string | null } => {
  try {
    const cleaned = hex.replace(/^0x/i, '').trim();
    if (!/^[0-9A-Fa-f]+$/.test(cleaned)) {
      return { decimal: 0, error: 'Invalid hexadecimal format' };
    }
    return { decimal: parseInt(cleaned, 16), error: null };
  } catch (error: any) {
    return { decimal: 0, error: error.message };
  }
};

export const decimalToOctal = (decimal: number): { octal: string; error: string | null } => {
  try {
    if (!Number.isInteger(decimal) || decimal < 0) {
      return { octal: '', error: 'Input must be a non-negative integer' };
    }
    return { octal: decimal.toString(8), error: null };
  } catch (error: any) {
    return { octal: '', error: error.message };
  }
};

export const octalToDecimal = (octal: string): { decimal: number; error: string | null } => {
  try {
    const cleaned = octal.replace(/\s/g, '');
    if (!/^[0-7]+$/.test(cleaned)) {
      return { decimal: 0, error: 'Octal string must contain only digits 0-7' };
    }
    return { decimal: parseInt(cleaned, 8), error: null };
  } catch (error: any) {
    return { decimal: 0, error: error.message };
  }
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const kmToMiles = (km: number): number => {
  return km * 0.621371;
};

export const milesToKm = (miles: number): number => {
  return miles / 0.621371;
};
