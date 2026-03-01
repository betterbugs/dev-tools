import {
  isValidEmail,
  isValidURL,
  isValidDate,
  isValidIPAddress,
  isValidPhoneNumber,
  isValidPassword,
  isValidGUID,
} from '../../app/libs/validationUtils';

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('test+tag@example.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('notanemail')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test @example.com')).toBe(false);
    });

    it('should reject empty string', () => {
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidURL', () => {
    it('should validate correct URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://www.example.com')).toBe(true);
      expect(isValidURL('https://example.com/path')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidURL('not a url')).toBe(false);
      expect(isValidURL('http://')).toBe(false);
      expect(isValidURL('example.com')).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('should validate YYYY-MM-DD format', () => {
      expect(isValidDate('2024-03-15')).toBe(true);
      expect(isValidDate('2000-01-01')).toBe(true);
    });

    it('should validate DD/MM/YYYY format', () => {
      expect(isValidDate('15/03/2024', 'DD/MM/YYYY')).toBe(true);
      expect(isValidDate('01/01/2000', 'DD/MM/YYYY')).toBe(true);
    });

    it('should validate MM/DD/YYYY format', () => {
      expect(isValidDate('03/15/2024', 'MM/DD/YYYY')).toBe(true);
      expect(isValidDate('01/01/2000', 'MM/DD/YYYY')).toBe(true);
    });

    it('should reject invalid dates', () => {
      expect(isValidDate('2024-02-30')).toBe(false);
      expect(isValidDate('2024-13-01')).toBe(false);
      expect(isValidDate('2024-00-01')).toBe(false);
    });

    it('should reject invalid format', () => {
      expect(isValidDate('15-03-2024')).toBe(false);
      expect(isValidDate('2024/03/15')).toBe(false);
    });
  });

  describe('isValidIPAddress', () => {
    it('should validate correct IPv4 addresses', () => {
      expect(isValidIPAddress('192.168.1.1')).toBe(true);
      expect(isValidIPAddress('0.0.0.0')).toBe(true);
      expect(isValidIPAddress('255.255.255.255')).toBe(true);
    });

    it('should reject invalid IPv4 addresses', () => {
      expect(isValidIPAddress('256.256.256.256')).toBe(false);
      expect(isValidIPAddress('192.168.1')).toBe(false);
      expect(isValidIPAddress('192.168.1.1.1')).toBe(false);
    });

    it('should reject non-IP strings', () => {
      expect(isValidIPAddress('not.an.ip.address')).toBe(false);
      expect(isValidIPAddress('192.168.a.1')).toBe(false);
    });
  });

  describe('isValidPhoneNumber', () => {
    it('should validate various phone number formats', () => {
      expect(isValidPhoneNumber('1234567890')).toBe(true);
      expect(isValidPhoneNumber('123-456-7890')).toBe(true);
      expect(isValidPhoneNumber('(123) 456-7890')).toBe(true);
      expect(isValidPhoneNumber('+1 123 456 7890')).toBe(true);
    });

    it('should reject too short numbers', () => {
      expect(isValidPhoneNumber('123456')).toBe(false);
    });

    it('should reject invalid formats', () => {
      expect(isValidPhoneNumber('abc-def-ghij')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should validate strong passwords', () => {
      const result = isValidPassword('SecurePass123!');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject password with insufficient length', () => {
      const result = isValidPassword('Pass1!', { minLength: 8 });
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('characters'))).toBe(true);
    });

    it('should reject password missing uppercase', () => {
      const result = isValidPassword('password123!', { requireUppercase: true });
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('uppercase'))).toBe(true);
    });

    it('should reject password missing lowercase', () => {
      const result = isValidPassword('PASSWORD123!', { requireLowercase: true });
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('lowercase'))).toBe(true);
    });

    it('should reject password missing numbers', () => {
      const result = isValidPassword('Password!', { requireNumbers: true });
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('number'))).toBe(true);
    });

    it('should reject password missing special characters', () => {
      const result = isValidPassword('Password123', { requireSpecialChars: true });
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes('special'))).toBe(true);
    });

    it('should allow custom password requirements', () => {
      const result = isValidPassword('simple', {
        minLength: 3,
        requireUppercase: false,
        requireLowercase: false,
        requireNumbers: false,
        requireSpecialChars: false,
      });
      expect(result.valid).toBe(true);
    });
  });

  describe('isValidGUID', () => {
    it('should validate correct GUIDs', () => {
      expect(isValidGUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(isValidGUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(true);
    });

    it('should validate uppercase GUIDs', () => {
      expect(isValidGUID('550E8400-E29B-41D4-A716-446655440000')).toBe(true);
    });

    it('should reject invalid GUIDs', () => {
      expect(isValidGUID('not-a-guid')).toBe(false);
      expect(isValidGUID('550e8400-e29b-41d4-a716-44665544000')).toBe(false);
      expect(isValidGUID('550e8400e29b41d4a716446655440000')).toBe(false);
    });

    it('should reject GUIDs with invalid characters', () => {
      expect(isValidGUID('550e8400-e29b-41d4-a716-44665544000g')).toBe(false);
    });
  });
});
