/**
 * Utility functions for encoding and decoding operations
 */

export const encodeToBase64 = (text: string, makeUrlSafe: boolean = true): string => {
  if (!text) return "";
  // Proper UTF-8 handling
  const utf8Bytes = encodeURIComponent(text).replace(
    /%([0-9A-F]{2})/g,
    (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }
  );
  const base64 = btoa(utf8Bytes);
  if (!makeUrlSafe) return base64;
  // URL-safe variant: replace +/ with -_ and strip padding
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

export const decodeBase64 = (encodedText: string, isUrlSafe: boolean = true): { decoded: string; error: string | null } => {
  let text = encodedText.trim();
  if (!text) return { decoded: "", error: null };

  if (isUrlSafe) {
    text = text.replace(/-/g, "+").replace(/_/g, "/");
    const paddingNeeded = (4 - (text.length % 4)) % 4;
    text = text + "=".repeat(paddingNeeded);
  }

  try {
    const binaryString = atob(text);
    const percentEncoded = Array.prototype.map
      .call(binaryString, (char: string) => {
        const code = char.charCodeAt(0).toString(16).padStart(2, "0");
        return `%${code}`;
      })
      .join("");
    return { decoded: decodeURIComponent(percentEncoded), error: null };
  } catch (e: any) {
    return { decoded: "", error: "Invalid Base64 input. Please check your text and try again." };
  }
};
