/**
 * Text processing and conversion utilities
 */

export const countCharacters = (text: string, includeSpaces: boolean = true): number => {
  if (!includeSpaces) {
    return text.replace(/\s/g, '').length;
  }
  return text.length;
};

export const countWords = (text: string): number => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
};

export const countLines = (text: string): number => {
  if (!text) return 0;
  return text.split('\n').length;
};

export const countSentences = (text: string): number => {
  const sentences = text.match(/[.!?]+/g);
  return sentences ? sentences.length : 0;
};

export const countParagraphs = (text: string): number => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\n\n+/).length;
};

export const reverseText = (text: string): string => {
  return text.split('').reverse().join('');
};

export const uppercaseText = (text: string): string => {
  return text.toUpperCase();
};

export const lowercaseText = (text: string): string => {
  return text.toLowerCase();
};

export const capitalizeWords = (text: string): string => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const removeExtraSpaces = (text: string): string => {
  return text.replace(/\s+/g, ' ').trim();
};

export const stripHTML = (html: string): string => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

export const urlEncode = (text: string): string => {
  return encodeURIComponent(text);
};

export const urlDecode = (encoded: string): { decoded: string; error: string | null } => {
  try {
    return { decoded: decodeURIComponent(encoded), error: null };
  } catch (error: any) {
    return { decoded: '', error: error.message };
  }
};
