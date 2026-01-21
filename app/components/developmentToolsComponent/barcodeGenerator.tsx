"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Symbology =
  | "CODE128"
  | "EAN13"
  | "UPCA"
  | "EAN8"
  | "CODE39"
  | "ITF"
  | "ITF14"
  | "MSI"
  | "MSI10"
  | "MSI11"
  | "MSI1010"
  | "MSI1110"
  | "PHARMACODE";

// ---------- EAN-13 encoding ----------
// Left A/B and Right C patterns for digits 0-9
const EAN_L_PATTERNS: Record<string, string> = {
  "0": "0001101",
  "1": "0011001",
  "2": "0010011",
  "3": "0111101",
  "4": "0100011",
  "5": "0110001",
  "6": "0101111",
  "7": "0111011",
  "8": "0110111",
  "9": "0001011",
};
const EAN_G_PATTERNS: Record<string, string> = {
  "0": "0100111",
  "1": "0110011",
  "2": "0011011",
  "3": "0100001",
  "4": "0011101",
  "5": "0111001",
  "6": "0000101",
  "7": "0010001",
  "8": "0001001",
  "9": "0010111",
};
const EAN_R_PATTERNS: Record<string, string> = {
  "0": "1110010",
  "1": "1100110",
  "2": "1101100",
  "3": "1000010",
  "4": "1011100",
  "5": "1001110",
  "6": "1010000",
  "7": "1000100",
  "8": "1001000",
  "9": "1110100",
};
// Parity pattern for first digit controlling left 6 digits (A/B encoding)
const EAN_PARITY: Record<string, string> = {
  "0": "AAAAAA",
  "1": "AABABB",
  "2": "AABBAB",
  "3": "AABBBA",
  "4": "ABAABB",
  "5": "ABBAAB",
  "6": "ABBBAA",
  "7": "ABABAB",
  "8": "ABABBA",
  "9": "ABBABA",
};
const EAN_START = "101"; // guard
const EAN_MIDDLE = "01010"; // center guard
const EAN_END = "101"; // end guard

function ean13Checksum(number12: string): number {
  // 12-digit string, compute checksum digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const n = number12.charCodeAt(i) - 48;
    sum += i % 2 === 0 ? n : n * 3;
  }
  const mod = sum % 10;
  return mod === 0 ? 0 : 10 - mod;
}

function encodeEAN13(data: string): { bits: string; text: string } | null {
  const digits = data.replace(/\D/g, "");
  if (digits.length !== 12 && digits.length !== 13) return null;
  const first = digits[0];
  const left6 = digits.slice(1, 7);
  // For 12 digits (no checksum): take 5 digits (positions 8-12), append computed checksum
  // For 13 digits (with checksum): take first 5 (positions 8-12), append provided checksum
  const right6Base = digits.slice(7, 12);
  const calcCheck = ean13Checksum(digits.slice(0, 12));
  const checkDigit = digits.length === 13 ? Number(digits[12]) : calcCheck;
  if (digits.length === 13 && calcCheck !== checkDigit) return null;

  const parity = EAN_PARITY[first];
  if (!parity) return null;

  let bits = EAN_START;
  for (let i = 0; i < 6; i++) {
    const d = left6[i];
    const p = parity[i];
    bits += p === "A" ? EAN_L_PATTERNS[d] : EAN_G_PATTERNS[d];
  }
  bits += EAN_MIDDLE;
  const right6 = right6Base + String(checkDigit);
  for (let i = 0; i < 6; i++) {
    const d = right6[i];
    bits += EAN_R_PATTERNS[d];
  }
  bits += EAN_END;
  return { bits, text: first + left6 + right6 };
}

// ---------- Code128 (subset B) encoding ----------
// Code set B covers ASCII 32–127. We'll implement subset B and checksum.
// Patterns from ISO/IEC 15417 (values mapped to bar/space sequences length 11)
type Code128Symbol = { value: number; pattern: string };

const CODE128_PATTERNS: string[] = [
  "11011001100","11001101100","11001100110","10010011000","10010001100","10001001100",
  "10011001000","10011000100","10001100100","11001001000","11001000100","11000100100",
  "10110011100","10011011100","10011001110","10111001100","10011101100","10011100110",
  "11001110010","11001011100","11001001110","11011100100","11001110100","11101101110",
  "11101001100","11100101100","11100100110","11101100100","11100110100","11100110010",
  "11011011000","11011000110","11000110110","10100011000","10001011000","10001000110",
  "10110001000","10001101000","10001100010","11010001000","11000101000","11000100010",
  "10110111000","10110001110","10001101110","10111011000","10111000110","10001110110",
  "11101110110","11010001110","11000101110","11011101000","11011100010","11011101110",
  "11101011000","11101000110","11100010110","11101101000","11101100010","11100011010",
  "11101111010","11001000010","11110001010","10100110000","10100001100","10010110000",
  "10010000110","10000101100","10000100110","10110010000","10110000100","10011010000",
  "10011000010","10000110100","10000110010","11000010010","11001010000","11110111010",
  "11000010100","10001111010","10100111100","10010111100","10010011110","10111100100",
  "10011110100","10011110010","11110100100","11110010100","11110010010","11011011110",
  "11011110110","11110110110","10101111000","10100011110","10001011110","10111101000",
  "10111100010","11110101000","11110100010","10111011110","10111101110","11101011110",
  "11110101110","11010000100","11010010000","11010011100","1100011101011" // 106 stop pattern with termination bar
];

const START_B = 104; // value for Start B
const STOP = 106;

function code128EncodeB(data: string): { bits: string; text: string } | null {
  // Validate ASCII 32..126
  for (let i = 0; i < data.length; i++) {
    const c = data.charCodeAt(i);
    if (c < 32 || c > 126) return null;
  }
  const codes: number[] = [START_B];
  for (let i = 0; i < data.length; i++) {
    codes.push(data.charCodeAt(i) - 32);
  }
  // checksum
  let checksum = codes[0];
  for (let i = 1; i < codes.length; i++) {
    checksum += codes[i] * i;
  }
  checksum = checksum % 103;
  codes.push(checksum);
  codes.push(STOP);

  // Build bit string
  let bits = "";
  for (let i = 0; i < codes.length; i++) {
    const val = codes[i];
    const pattern = CODE128_PATTERNS[val];
    if (!pattern) return null;
    bits += pattern;
  }
  return { bits, text: data };
}

// ---------- EAN-8 encoding ----------
function ean8Checksum(d7: string): number {
  let sumOdd = 0;
  let sumEven = 0;
  for (let i = 0; i < 7; i++) {
    const n = d7.charCodeAt(i) - 48;
    if ((i % 2) === 0) sumOdd += n; else sumEven += n;
  }
  const total = sumOdd * 3 + sumEven;
  return (10 - (total % 10)) % 10;
}

function encodeEAN8(data: string): { bits: string; text: string } | null {
  const digits = data.replace(/\D/g, "");
  if (digits.length !== 7 && digits.length !== 8) return null;
  const left4 = digits.slice(0, 4);
  const right3 = digits.slice(4, 7);
  const check = digits.length === 8 ? Number(digits[7]) : ean8Checksum(digits.slice(0, 7));
  if (digits.length === 8 && ean8Checksum(digits.slice(0, 7)) !== check) return null;

  let bits = EAN_START;
  for (let i = 0; i < 4; i++) bits += EAN_L_PATTERNS[left4[i]];
  bits += EAN_MIDDLE;
  const right4 = right3 + String(check);
  for (let i = 0; i < 4; i++) bits += EAN_R_PATTERNS[right4[i]];
  bits += EAN_END;
  return { bits, text: left4 + right4 };
}

// ---------- Code 39 encoding ----------
// Maps characters to patterns of narrow (n) and wide (w) for 9 elements (bar/space alternating)
const CODE39_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+% ";
const CODE39_PATTERNS: Record<string, string> = {
  "0":"nnnwwnwnn","1":"wnnwnnnnw","2":"nnwwnnnnw","3":"wnwwnnnnn","4":"nnnwwnnnw","5":"wnnwwnnnn","6":"nnwwwnnnn","7":"nnnwnnwnw","8":"wnnwnnwnn","9":"nnwwnnwnn",
  "A":"wnnnnwnnw","B":"nnwnnwnnw","C":"wnwnnwnnn","D":"nnnnwwnnw","E":"wnnnwwnnn","F":"nnwnwwnnn","G":"nnnnnwwnw","H":"wnnnnwwnn","I":"nnwnnwwnn","J":"nnnnwwwnn",
  "K":"wnnnnnnww","L":"nnwnnnnww","M":"wnwnnnnwn","N":"nnnnwnnww","O":"wnnnwnnwn","P":"nnwnwnnwn","Q":"nnnnnnwww","R":"wnnnnnwwn","S":"nnwnnnwwn","T":"nnnnwnwwn",
  "U":"wwnnnnnnw","V":"nwwnnnnnw","W":"wwwnnnnnn","X":"nwnnwnnnw","Y":"wwnnwnnnn","Z":"nwwnwnnnn","-":"nwnnnnwnw",".":"wwnnnnwnn"," ":"nwwnnnwnn","$":"nwnwnwnnn",
  "/":"nwnwnnnwn","+":"nwnnnwnwn","%":"nnnwnwnwn","*":"nwnnwnwnn"
};

function repeatRun(ch: '1' | '0', count: number): string { let s = ""; for (let i=0;i<count;i++) s += ch; return s; }

function code39Encode(data: string): { bits: string; text: string } | null {
  const upper = data.toUpperCase();
  for (let i=0;i<upper.length;i++) if (!CODE39_CHARS.includes(upper[i])) return null;
  const withStartStop = `*${upper}*`;
  const narrow = 1, wide = 3;
  let bits = "";
  for (let idx=0; idx<withStartStop.length; idx++) {
    const pat = CODE39_PATTERNS[withStartStop[idx]];
    if (!pat) return null;
    for (let j=0;j<pat.length;j++) {
      const isBar = j % 2 === 0;
      const width = pat[j] === 'w' ? wide : narrow;
      bits += repeatRun(isBar ? '1':'0', width);
    }
    // inter-character narrow space
    if (idx < withStartStop.length - 1) bits += repeatRun('0', narrow);
  }
  return { bits, text: upper };
}

// ---------- ITF (Interleaved 2 of 5) & ITF-14 ----------
// Digit patterns: five elements, w=wide, n=narrow (bars and spaces separate)
const ITF_PATTERNS: Record<string, string> = {
  "0":"nnwwn","1":"wnnnw","2":"nwnnw","3":"wwnnn","4":"nnwnw",
  "5":"wnwnn","6":"nwwnn","7":"nnnww","8":"wnnwn","9":"nwnwn"
};

function itfEncode(digitsRaw: string): { bits: string; text: string } | null {
  let digits = digitsRaw.replace(/\D/g, "");
  if (digits.length === 0) return null;
  if (digits.length % 2 === 1) digits = "0" + digits;
  const narrow = 1, wide = 3;
  // start pattern: n n (bar space) -> 1010 with narrow units
  let bits = repeatRun('1', narrow) + repeatRun('0', narrow) + repeatRun('1', narrow) + repeatRun('0', narrow);
  for (let i=0;i<digits.length;i+=2) {
    const a = ITF_PATTERNS[digits[i]];
    const b = ITF_PATTERNS[digits[i+1]];
    if (!a || !b) return null;
    for (let k=0;k<5;k++) {
      // bar from a, space from b
      const barW = a[k] === 'w' ? wide : narrow;
      const spW = b[k] === 'w' ? wide : narrow;
      bits += repeatRun('1', barW) + repeatRun('0', spW);
    }
  }
  // stop pattern: w n n (bar space bar)
  bits += repeatRun('1', wide) + repeatRun('0', narrow) + repeatRun('1', narrow);
  return { bits, text: digits };
}

function itf14Checksum(d13: string): number {
  let sum = 0;
  for (let i=0;i<13;i++) {
    const n = d13.charCodeAt(i) - 48;
    sum += (i % 2 === 0) ? n * 3 : n; // from left
  }
  return (10 - (sum % 10)) % 10;
}

function itf14Encode(data: string): { bits: string; text: string } | null {
  const digits = data.replace(/\D/g, "");
  if (digits.length !== 13 && digits.length !== 14) return null;
  const check = digits.length === 14 ? Number(digits[13]) : itf14Checksum(digits.slice(0,13));
  if (digits.length === 14 && itf14Checksum(digits.slice(0,13)) !== check) return null;
  return itfEncode(digits.slice(0,13) + String(check));
}

// ---------- Rendering ----------

// ---------- Pharmacode (one-track) ----------
// Input: integer 3..131070
// Algorithm encodes value into sequence of narrow(1) / wide(2) bars from right to left
function encodePharmacode(data: string): { bits: string; text: string } | null {
  const num = Number(data.trim());
  if (!Number.isInteger(num) || num < 3 || num > 131070) return null;
  let n = num;
  const widths: number[] = [];
  while (n > 0) {
    if (n % 2 === 0) {
      widths.push(2); // wide bar
      n = (n - 2) / 2;
    } else {
      widths.push(1); // narrow bar
      n = (n - 1) / 2;
    }
  }
  // Bars were built from right to left; reverse to left-to-right
  widths.reverse();
  // Build bits with 1-unit gap between bars
  let bits = "";
  for (let i = 0; i < widths.length; i++) {
    for (let k = 0; k < widths[i]; k++) bits += "1";
    if (i < widths.length - 1) bits += "0"; // 1-unit gap
  }
  return { bits, text: String(num) };
}

// ---------- MSI (Modified Plessey) and check variants ----------
// Digit encodings (narrow=1, wide=2 units), bar/space alternate, with start/end patterns
const MSI_PATTERNS: Record<string, string> = {
  "0":"100100100100",
  "1":"100100100110",
  "2":"100100110100",
  "3":"100100110110",
  "4":"100110100100",
  "5":"100110100110",
  "6":"100110110100",
  "7":"100110110110",
  "8":"110100100100",
  "9":"110100100110",
};

function msiChecksumMod10(num: string): number {
  // Luhn mod 10 on reversed digits with weight 2 on odd positions
  const digits = num.replace(/\D/g, "").split("").reverse().map((d) => Number(d));
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let n = digits[i];
    if (i % 2 === 0) {
      n *= 2;
      if (n > 9) n = Math.floor(n / 10) + (n % 10);
    }
    sum += n;
  }
  return (10 - (sum % 10)) % 10;
}

function msiChecksumMod11(num: string): number {
  const digits = num.replace(/\D/g, "").split("").reverse().map(Number);
  let weight = 2;
  let sum = 0;
  for (const d of digits) {
    sum += d * weight;
    weight++;
    if (weight > 7) weight = 2;
  }
  const r = sum % 11;
  return r <= 1 ? 0 : 11 - r;
}

function msiEncodeCore(num: string): { bits: string; text: string } | null {
  if (!/^\d+$/.test(num)) return null;
  // Start (110) and End (1001) patterns used by common MSI implementations
  let bits = "110";
  for (const ch of num) {
    const pat = MSI_PATTERNS[ch];
    if (!pat) return null;
    bits += pat;
  }
  bits += "1001";
  return { bits, text: num };
}

function msiEncode(num: string): { bits: string; text: string } | null {
  return msiEncodeCore(num);
}

function msiEncodeMod10(num: string): { bits: string; text: string } | null {
  const d = num.replace(/\D/g, "");
  if (!/^\d+$/.test(d)) return null;
  const c = msiChecksumMod10(d);
  return msiEncodeCore(d + String(c));
}

function msiEncodeMod11(num: string): { bits: string; text: string } | null {
  const d = num.replace(/\D/g, "");
  if (!/^\d+$/.test(d)) return null;
  const c = msiChecksumMod11(d);
  return msiEncodeCore(d + String(c));
}

function msiEncodeMod1010(num: string): { bits: string; text: string } | null {
  const d = num.replace(/\D/g, "");
  if (!/^\d+$/.test(d)) return null;
  const c1 = msiChecksumMod10(d);
  const c2 = msiChecksumMod10(d + String(c1));
  return msiEncodeCore(d + String(c1) + String(c2));
}

function msiEncodeMod1110(num: string): { bits: string; text: string } | null {
  const d = num.replace(/\D/g, "");
  if (!/^\d+$/.test(d)) return null;
  const c1 = msiChecksumMod11(d);
  const c2 = msiChecksumMod10(d + String(c1));
  return msiEncodeCore(d + String(c1) + String(c2));
}
function renderBitsToSVG(
  bits: string,
  opts: {
    barWidth: number;
    barHeight: number;
    margin: number;
    showText?: string | null;
    fgColor: string;
    bgColor: string;
    textSize: number;
  }
): string {
  const { barWidth, barHeight, margin, showText, fgColor, bgColor, textSize } = opts;
  const width = bits.length * barWidth + margin * 2;
  const height = barHeight + (showText ? textSize + 6 : 0) + margin * 2;
  let x = margin;
  let rects: string[] = [];
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === "1") {
      rects.push(`<rect x="${x}" y="${margin}" width="${barWidth}" height="${barHeight}" fill="${escapeXml(fgColor)}"/>`);
    }
    x += barWidth;
  }
  let text = "";
  if (showText) {
    text = `<text x="${width / 2}" y="${barHeight + margin + textSize}" text-anchor="middle" font-family="monospace" font-size="${textSize}" fill="${escapeXml(fgColor)}">${escapeXml(showText)}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">` +
    `<rect width="100%" height="100%" fill="${escapeXml(bgColor)}"/>` +
    rects.join("") +
    text +
    `</svg>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

const BarcodeGenerator: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [symbology, setSymbology] = useState<Symbology>("CODE128");
  const [barWidth, setBarWidth] = useState(2);
  const [barHeight, setBarHeight] = useState(80);
  const [margin, setMargin] = useState(10);
  const [showText, setShowText] = useState(true);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [textSize, setTextSize] = useState(12);
  const fileRef = useRef<HTMLInputElement>(null);

  const result = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return { svg: "", error: "" };
    let encoded: { bits: string; text: string } | null = null;
    if (symbology === "CODE128") {
      encoded = code128EncodeB(trimmed);
    } else if (symbology === "EAN13") {
      encoded = encodeEAN13(trimmed);
      if (!encoded) {
        return { svg: "", error: "EAN-13 requires 12 or 13 digits (checksum auto-computed)." };
      }
    } else if (symbology === "UPCA") {
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length === 11 || digits.length === 12) {
        encoded = encodeEAN13("0" + digits);
      } else {
        return { svg: "", error: "UPC-A requires 11 or 12 digits (12th is checksum)." };
      }
    } else if (symbology === "EAN8") {
      encoded = encodeEAN8(trimmed);
      if (!encoded) return { svg: "", error: "EAN-8 requires 7 or 8 digits (checksum auto-computed)." };
    } else if (symbology === "CODE39") {
      encoded = code39Encode(trimmed);
      if (!encoded) return { svg: "", error: "Code 39 supports 0-9, A-Z, space and - . $ / + %" };
    } else if (symbology === "ITF") {
      encoded = itfEncode(trimmed);
      if (!encoded) return { svg: "", error: "ITF requires numeric input (even number of digits; odd will be zero-padded)." };
    } else if (symbology === "ITF14") {
      encoded = itf14Encode(trimmed);
      if (!encoded) return { svg: "", error: "ITF-14 requires 13 or 14 digits (checksum auto-computed)." };
    } else if (symbology === "PHARMACODE") {
      encoded = encodePharmacode(trimmed);
      if (!encoded) return { svg: "", error: "Pharmacode requires an integer between 3 and 131070." };
    } else if (symbology === "MSI") {
      encoded = msiEncode(trimmed);
      if (!encoded) return { svg: "", error: "MSI requires numeric input." };
    } else if (symbology === "MSI10") {
      encoded = msiEncodeMod10(trimmed);
      if (!encoded) return { svg: "", error: "MSI-10 requires numeric input." };
    } else if (symbology === "MSI11") {
      encoded = msiEncodeMod11(trimmed);
      if (!encoded) return { svg: "", error: "MSI-11 requires numeric input." };
    } else if (symbology === "MSI1010") {
      encoded = msiEncodeMod1010(trimmed);
      if (!encoded) return { svg: "", error: "MSI-1010 requires numeric input." };
    } else if (symbology === "MSI1110") {
      encoded = msiEncodeMod1110(trimmed);
      if (!encoded) return { svg: "", error: "MSI-1110 requires numeric input." };
    } else {
      return { svg: "", error: "Symbology not implemented yet." };
    }
    if (!encoded) return { svg: "", error: "Invalid input for the selected symbology." };
    const svg = renderBitsToSVG(encoded.bits, {
      barWidth: Math.max(1, Math.min(10, barWidth)),
      barHeight: Math.max(20, Math.min(300, barHeight)),
      margin: Math.max(0, Math.min(50, margin)),
      showText: showText ? encoded.text : null,
      fgColor,
      bgColor,
      textSize: Math.max(8, Math.min(32, textSize)),
    });
    return { svg, error: "" };
  }, [input, symbology, barWidth, barHeight, margin, showText, fgColor, bgColor, textSize]);

  useEffect(() => {
    if (!autoUpdate) return;
    setOutput(result.svg);
  }, [result, autoUpdate]);

  const onGenerate = () => {
    setOutput(result.svg);
  };

  const onCopy = async () => {
    try {
      if (!output) return;
      await navigator.clipboard.writeText(output);
    } catch {}
  };

  const onDownload = () => {
    const blob = new Blob([output], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = symbology === "CODE128" ? "barcode-code128.svg" : symbology === "EAN13" ? "barcode-ean13.svg" : "barcode-upca.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onDownloadPng = async () => {
    if (!output) return;
    const svgBlob = new Blob([output], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const match = output.match(/viewBox=\"0 0 (\d+) (\d+)\"/);
        const w = match ? Number(match[1]) : img.width;
        const h = match ? Number(match[2]) : img.height;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob((blob) => {
            if (!blob) return;
            const dl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = dl;
            a.download = symbology === "CODE128" ? "barcode-code128.png" : symbology === "EAN13" ? "barcode-ean13.png" : "barcode-upca.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(dl);
          }, "image/png");
        }
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  const onClear = () => {
    setInput("");
    setOutput("");
  };

  const onUploadClick = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[950px] mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={autoUpdate}
                  onChange={(e) => setAutoUpdate(e.target.checked)}
                />
                Auto Update
              </label>

              <div className="flex items-center gap-2">
                <span>Symbology:</span>
                <select
                  className="bg-black/90 border border-white/20 rounded px-2 py-1"
                  value={symbology}
                  onChange={(e) => setSymbology(e.target.value as Symbology)}
                >
                  <optgroup label="Linear (1D)">
                    <option value="CODE128">Code 128 (subset B)</option>
                    <option value="EAN13">EAN-13</option>
                    <option value="UPCA">UPC-A</option>
                    <option value="EAN8">EAN-8</option>
                    <option value="CODE39">Code 39</option>
                    <option value="ITF">ITF</option>
                    <option value="ITF14">ITF-14</option>
                    <option value="MSI">MSI</option>
                    <option value="MSI10">MSI-10</option>
                    <option value="MSI11">MSI-11</option>
                    <option value="MSI1010">MSI-1010</option>
                    <option value="MSI1110">MSI-1110</option>
                    <option value="PHARMACODE">Pharmacode</option>
                  </optgroup>
                  <optgroup label="Matrix (2D)" disabled>
                    <option>QR Code</option>
                    <option>Data Matrix</option>
                    <option>PDF417</option>
                  </optgroup>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span>Bar width:</span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={barWidth}
                  onChange={(e) => setBarWidth(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                  className="w-20 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <span>Height:</span>
                <input
                  type="number"
                  min={20}
                  max={300}
                  value={barHeight}
                  onChange={(e) => setBarHeight(Math.max(20, Math.min(300, Number(e.target.value) || 20)))}
                  className="w-24 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <span>Margin:</span>
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={margin}
                  onChange={(e) => setMargin(Math.max(0, Math.min(50, Number(e.target.value) || 0)))}
                  className="w-20 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={showText}
                  onChange={(e) => setShowText(e.target.checked)}
                />
                Show text
              </label>

              <div className="flex items-center gap-2">
                <span>Text size:</span>
                <input
                  type="number"
                  min={8}
                  max={32}
                  value={textSize}
                  onChange={(e) => setTextSize(Math.max(8, Math.min(32, Number(e.target.value) || 12)))}
                  className="w-20 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <span>FG:</span>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-10 h-8 p-0 bg-transparent border border-white/20 rounded"
                />
              </div>
              <div className="flex items-center gap-2">
                <span>BG:</span>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-8 p-0 bg-transparent border border-white/20 rounded"
                />
              </div>

              <div className="ml-auto flex items-center gap-2">
                <input
                  type="file"
                  accept=".txt,text/plain"
                  ref={fileRef}
                  onChange={onFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input</label>
                  <button
                    onClick={onGenerate}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Generate
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    symbology === "CODE128" ? "Enter ASCII 32-126. Example: CODE128-123"
                    : symbology === "EAN13" ? "Enter 12 or 13 digits (13th is optional checksum). Example: 590123412345"
                    : symbology === "UPCA" ? "Enter 11 or 12 digits (12th is checksum). Example: 03600029145"
                    : symbology === "EAN8" ? "Enter 7 or 8 digits (8th is checksum). Example: 5512345"
                    : symbology === "CODE39" ? "0-9 A-Z space - . $ / + %"
                    : symbology === "ITF" ? "Numeric only; even digits (odd will be zero-padded)"
                    : symbology === "ITF14" ? "Enter 13 or 14 digits (checksum auto-computed)"
                    : symbology === "PHARMACODE" ? "Integer 3..131070"
                    : symbology === "MSI" ? "Numeric only"
                    : symbology === "MSI10" ? "Numeric only (mod 10 check appended)"
                    : symbology === "MSI11" ? "Numeric only (mod 11 check appended)"
                    : symbology === "MSI1010" ? "Numeric only (mod 10-10 checks appended)"
                    : symbology === "MSI1110" ? "Numeric only (mod 11 then mod 10 checks)"
                    : "Enter value"
                  }
                  className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-start justify-between md:gap-0 gap-4">
                  <label className="font-medium">Output (SVG)</label>
                  <div className="flex flex-wrap items-center gap-2 md:justify-end justify-start">
                    <button
                      onClick={onCopy}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Copy
                    </button>
                    <button
                      onClick={onUploadClick}
                      className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors"
                    >
                      Upload
                    </button>
                    <button
                      onClick={onDownload}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Download
                    </button>
                    <button
                      onClick={onDownloadPng}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Download PNG
                    </button>
                    <button
                      onClick={onClear}
                      className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-white/20 h-64 overflow-auto p-2">
                  {output ? (
                    <div
                      className="bg-white"
                      dangerouslySetInnerHTML={{ __html: output }}
                    />
                  ) : (
                    <div className="text-black/60 italic p-4">
                      {input.trim() ? (result.error || "Generated SVG barcode will appear here.") : "Generated SVG barcode will appear here."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;


