import {
  countCharacters,
  countWords,
  countLines,
  countSentences,
  countParagraphs,
  reverseText,
  uppercaseText,
  lowercaseText,
  capitalizeWords,
  removeExtraSpaces,
  urlEncode,
  urlDecode,
} from '../../app/libs/textUtils';

describe('Text Utilities', () => {
  describe('countCharacters', () => {
    it('should count characters with spaces', () => {
      expect(countCharacters('Hello World')).toBe(11);
    });

    it('should count characters without spaces', () => {
      expect(countCharacters('Hello World', false)).toBe(10);
    });

    it('should return 0 for empty string', () => {
      expect(countCharacters('')).toBe(0);
    });

    it('should count special characters', () => {
      expect(countCharacters('!@#$%^&*()')).toBe(10);
    });

    it('should count newlines as characters', () => {
      expect(countCharacters('Hello\nWorld')).toBe(11);
      expect(countCharacters('Hello\nWorld', false)).toBe(10);
    });
  });

  describe('countWords', () => {
    it('should count words correctly', () => {
      expect(countWords('Hello World')).toBe(2);
    });

    it('should handle multiple spaces', () => {
      expect(countWords('Hello   World   Test')).toBe(3);
    });

    it('should return 0 for empty string', () => {
      expect(countWords('')).toBe(0);
    });

    it('should handle leading/trailing spaces', () => {
      expect(countWords('  Hello World  ')).toBe(2);
    });

    it('should count hyphenated words as one', () => {
      expect(countWords('mother-in-law')).toBe(1);
    });

    it('should count single word', () => {
      expect(countWords('Hello')).toBe(1);
    });
  });

  describe('countLines', () => {
    it('should count lines correctly', () => {
      expect(countLines('Line1\nLine2\nLine3')).toBe(3);
    });

    it('should return 1 for single line', () => {
      expect(countLines('Single line')).toBe(1);
    });

    it('should return 0 for empty string', () => {
      expect(countLines('')).toBe(0);
    });

    it('should handle multiple newlines', () => {
      expect(countLines('Line1\n\n\nLine2')).toBe(4);
    });
  });

  describe('countSentences', () => {
    it('should count sentences with periods', () => {
      expect(countSentences('Hello. World.')).toBe(2);
    });

    it('should count sentences with question marks', () => {
      expect(countSentences('How are you? I am fine.')).toBe(2);
    });

    it('should count sentences with exclamation marks', () => {
      expect(countSentences('Great! Amazing! Wonderful!')).toBe(3);
    });

    it('should return 0 for text without sentence endings', () => {
      expect(countSentences('No punctuation here')).toBe(0);
    });

    it('should handle mixed punctuation', () => {
      expect(countSentences('Question? Statement. Exclamation!')).toBe(3);
    });
  });

  describe('countParagraphs', () => {
    it('should count paragraphs separated by double newlines', () => {
      expect(countParagraphs('Para1\n\nPara2\n\nPara3')).toBe(3);
    });

    it('should return 1 for single paragraph', () => {
      expect(countParagraphs('Single paragraph')).toBe(1);
    });

    it('should return 0 for empty string', () => {
      expect(countParagraphs('')).toBe(0);
    });

    it('should handle multiple double newlines', () => {
      expect(countParagraphs('Para1\n\n\n\nPara2')).toBe(2);
    });
  });

  describe('reverseText', () => {
    it('should reverse simple text', () => {
      expect(reverseText('Hello')).toBe('olleH');
    });

    it('should reverse text with spaces', () => {
      expect(reverseText('Hello World')).toBe('dlroW olleH');
    });

    it('should reverse empty string', () => {
      expect(reverseText('')).toBe('');
    });

    it('should reverse special characters', () => {
      expect(reverseText('!@#$')).toBe('$#@!');
    });
  });

  describe('uppercaseText', () => {
    it('should convert to uppercase', () => {
      expect(uppercaseText('hello world')).toBe('HELLO WORLD');
    });

    it('should not affect already uppercase', () => {
      expect(uppercaseText('HELLO')).toBe('HELLO');
    });

    it('should handle special characters', () => {
      expect(uppercaseText('hello123!@#')).toBe('HELLO123!@#');
    });
  });

  describe('lowercaseText', () => {
    it('should convert to lowercase', () => {
      expect(lowercaseText('HELLO WORLD')).toBe('hello world');
    });

    it('should handle mixed case', () => {
      expect(lowercaseText('HeLLo WoRLd')).toBe('hello world');
    });
  });

  describe('capitalizeWords', () => {
    it('should capitalize first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    it('should work with single word', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
    });

    it('should handle multiple spaces', () => {
      expect(capitalizeWords('hello   world')).toBe('Hello   World');
    });
  });

  describe('removeExtraSpaces', () => {
    it('should remove extra spaces', () => {
      expect(removeExtraSpaces('Hello   World')).toBe('Hello World');
    });

    it('should trim leading/trailing spaces', () => {
      expect(removeExtraSpaces('  Hello World  ')).toBe('Hello World');
    });

    it('should handle tabs and newlines', () => {
      expect(removeExtraSpaces('Hello\t\t  World\n  Test')).toBe('Hello World Test');
    });
  });

  describe('urlEncode', () => {
    it('should encode special characters', () => {
      expect(urlEncode('hello world')).toBe('hello%20world');
    });

    it('should encode special symbols', () => {
      expect(urlEncode('name=John&age=30')).toBe('name%3DJohn%26age%3D30');
    });

    it('should handle already encoded text', () => {
      const encoded = urlEncode('hello');
      expect(encoded).toBe('hello');
    });
  });

  describe('urlDecode', () => {
    it('should decode URL-encoded text', () => {
      const result = urlDecode('hello%20world');
      expect(result.error).toBeNull();
      expect(result.decoded).toBe('hello world');
    });

    it('should decode special symbols', () => {
      const result = urlDecode('name%3DJohn%26age%3D30');
      expect(result.error).toBeNull();
      expect(result.decoded).toBe('name=John&age=30');
    });

    it('should handle invalid encoding gracefully', () => {
      const result = urlDecode('%ZZ%');
      expect(result.error).not.toBeNull();
    });
  });
});
