/**
 * Credit Card validation utilities
 */

const cardConfigs = {
  Visa: { bin: /^4/, length: [16] },
  AmericanExpress: { bin: /^(34|37)/, length: [15] },
  ChinaUnionPay: { bin: /^62/, length: [16] },
  "DinersClub International": { bin: /^36/, length: [14] },
  Discover: { bin: /^(6011|65|64[4-9])/, length: [16] },
  JCB: { bin: /^35[2-8]/, length: [16] },
  MasterCard: { bin: /^(5[1-5]|22[2-9][1-9]|2[3-7]\d{2})/, length: [16] },
};

export const luhnCheck = (number: string): boolean => {
  const digits = number.replace(/\D/g, "").split("").reverse().map(Number);
  
  // Return false if no digits
  if (digits.length === 0) return false;

  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

export const getCardType = (number: string): string => {
  for (const [type, { bin, length }] of Object.entries(cardConfigs)) {
    if (bin.test(number) && length.includes(number.length)) {
      return type;
    }
  }
  return "Unknown";
};

export const validateCreditCard = (cardNumber: string): { isValid: boolean; cardType: string; errors: string[] } => {
  const errors: string[] = [];
  const sanitizedNumber = cardNumber.replace(/\D/g, "");

  if (!sanitizedNumber) {
    return { isValid: false, cardType: "Unknown", errors: ["Card number is required"] };
  }

  if (sanitizedNumber.length < 13 || sanitizedNumber.length > 19) {
    errors.push("Card number must be between 13 and 19 digits");
  }

  const cardType = getCardType(sanitizedNumber);
  if (cardType === "Unknown") {
    errors.push("Card type is not recognized");
  }

  if (!luhnCheck(sanitizedNumber)) {
    errors.push("Card number failed Luhn validation");
  }

  return {
    isValid: errors.length === 0,
    cardType,
    errors,
  };
};
