/**
 * Color conversion utilities
 */

export interface HexRGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export const parseHex = (hex: string): HexRGB | null => {
  let h = hex.trim();
  if (h.startsWith("#")) h = h.slice(1);
  if (![3, 4, 6, 8].includes(h.length)) return null;

  // Validate hex characters
  if (!/^[0-9A-Fa-f]+$/.test(h)) return null;

  const expand = (s: string) => s.split("").map((c) => c + c).join("");
  if (h.length === 3 || h.length === 4) h = expand(h);

  const hasAlpha = h.length === 8;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  if (hasAlpha) {
    const aHex = h.slice(6, 8);
    const a = Math.round((parseInt(aHex, 16) / 255) * 1000) / 1000; // 3 decimals
    if (Number.isNaN(a)) return null;
    return { r, g, b, a };
  }
  return { r, g, b };
};

export const hexToRgb = (hex: string, asCss: boolean = true): string | null => {
  const parsed = parseHex(hex);
  if (!parsed) return null;
  const { r, g, b, a } = parsed;
  if (asCss) {
    return a !== undefined ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
  }
  return a !== undefined ? `${r}, ${g}, ${b}, ${a}` : `${r}, ${g}, ${b}`;
};

export const rgbToHex = (r: number, g: number, b: number, a?: number): string => {
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  if (a !== undefined) {
    const alpha = Math.round(a * 255);
    hex += toHex(alpha).toUpperCase();
  }
  return hex;
};

export const validateHexColor = (hex: string): boolean => {
  return parseHex(hex) !== null;
};
