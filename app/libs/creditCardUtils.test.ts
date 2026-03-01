import { luhnCheck, getCardType, validateCreditCard } from '../../app/libs/creditCardUtils';

describe('Credit Card Utilities', () => {
  describe('luhnCheck', () => {
    it('should validate a correct Visa card', () => {
      // Valid test card number
      expect(luhnCheck('4532015112830366')).toBe(true);
    });

    it('should validate a correct MasterCard', () => {
      // Valid test card number
      expect(luhnCheck('5105105105105100')).toBe(true);
    });

    it('should validate a correct American Express', () => {
      // Valid test AmEx number
      expect(luhnCheck('378282246310005')).toBe(true);
    });

    it('should reject an invalid card number', () => {
      expect(luhnCheck('1234567890123456')).toBe(false);
    });

    it('should handle card numbers with spaces', () => {
      expect(luhnCheck('4532 0151 1283 0366')).toBe(true);
    });

    it('should handle card numbers with dashes', () => {
      expect(luhnCheck('4532-0151-1283-0366')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(luhnCheck('')).toBe(false);
    });

    it('should return false for non-numeric characters only', () => {
      expect(luhnCheck('abcd-efgh-ijkl-mnop')).toBe(false);
    });
  });

  describe('getCardType', () => {
    it('should identify Visa card', () => {
      expect(getCardType('4532015112830366')).toBe('Visa');
    });

    it('should identify MasterCard', () => {
      expect(getCardType('5105105105105100')).toBe('MasterCard');
    });

    it('should identify American Express', () => {
      expect(getCardType('378282246310005')).toBe('AmericanExpress');
    });

    it('should identify Discover card', () => {
      expect(getCardType('6011111111111117')).toBe('Discover');
    });

    it('should identify JCB card', () => {
      expect(getCardType('3530111333300000')).toBe('JCB');
    });

    it('should return Unknown for unrecognized card', () => {
      expect(getCardType('9999999999999999')).toBe('Unknown');
    });

    it('should return Unknown for empty input', () => {
      expect(getCardType('')).toBe('Unknown');
    });
  });

  describe('validateCreditCard', () => {
    it('should validate a correct Visa card', () => {
      const result = validateCreditCard('4532015112830366');
      expect(result.isValid).toBe(true);
      expect(result.cardType).toBe('Visa');
      expect(result.errors).toHaveLength(0);
    });

    it('should validate a correct MasterCard', () => {
      const result = validateCreditCard('5105105105105100');
      expect(result.isValid).toBe(true);
      expect(result.cardType).toBe('MasterCard');
    });

    it('should reject an invalid card', () => {
      const result = validateCreditCard('1234567890123456');
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject empty card number', () => {
      const result = validateCreditCard('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Card number is required');
    });

    it('should handle card number with spaces', () => {
      const result = validateCreditCard('4532 0151 1283 0366');
      expect(result.isValid).toBe(true);
      expect(result.cardType).toBe('Visa');
    });

    it('should reject card number with incorrect length', () => {
      const result = validateCreditCard('453201511283');
      expect(result.isValid).toBe(false);
    });

    it('should reject card when Luhn check fails', () => {
      const result = validateCreditCard('4532015112830367'); // Last digit changed
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Card number failed Luhn validation');
    });
  });
});
