/**
 * Validation utility functions
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidDate = (date: string, format: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY' = 'YYYY-MM-DD'): boolean => {
  let regex;
  let dateObj;
  let year, month, day;

  switch (format) {
    case 'DD/MM/YYYY':
      regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d{4}$/;
      if (!regex.test(date)) return false;
      const [dayDMY, monthDMY, yearDMY] = date.split('/');
      day = parseInt(dayDMY, 10);
      month = parseInt(monthDMY, 10);
      year = parseInt(yearDMY, 10);
      dateObj = new Date(`${yearDMY}-${monthDMY}-${dayDMY}`);
      break;
    case 'MM/DD/YYYY':
      regex = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      if (!regex.test(date)) return false;
      const [monthMDY, dayMDY, yearMDY] = date.split('/');
      day = parseInt(dayMDY, 10);
      month = parseInt(monthMDY, 10);
      year = parseInt(yearMDY, 10);
      dateObj = new Date(`${yearMDY}-${monthMDY}-${dayMDY}`);
      break;
    case 'YYYY-MM-DD':
    default:
      regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
      if (!regex.test(date)) return false;
      const [yearYMD, monthYMD, dayYMD] = date.split('-');
      day = parseInt(dayYMD, 10);
      month = parseInt(monthYMD, 10);
      year = parseInt(yearYMD, 10);
      dateObj = new Date(`${date}`);
      break;
  }

  // Verify the date is valid by checking if the parsed components match
  // This catches invalid dates like Feb 30
  if (!(dateObj instanceof Date && !Number.isNaN(dateObj.getTime()))) {
    return false;
  }

  // Additional check: ensure the date didn't roll over to next month
  if (dateObj.getDate() !== day || dateObj.getMonth() !== month - 1 || dateObj.getFullYear() !== year) {
    return false;
  }

  return true;
};

export const isValidIPAddress = (ip: string): boolean => {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(ip)) {
    return false;
  }

  const parts = ip.split('.');
  return parts.every((part) => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255;
  });
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length >= 10;
};

export const isValidPassword = (password: string, options: {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
} = {}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return { valid: errors.length === 0, errors };
};

export const isValidGUID = (guid: string): boolean => {
  const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return guidRegex.test(guid);
};
