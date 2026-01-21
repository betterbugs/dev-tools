"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

// Minimal punycode encoder (RFC 3492). Encode a single label; ASCII-only returns input.
function ucs2decode(str: string): number[] {
  const output: number[] = [];
  let counter = 0;
  while (counter < str.length) {
    const value = str.charCodeAt(counter++);
    if (value >= 0xd800 && value <= 0xdbff && counter < str.length) {
      const extra = str.charCodeAt(counter++);
      if ((extra & 0xfc00) === 0xdc00) {
        output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
      } else {
        output.push(value, extra);
      }
    } else {
      output.push(value);
    }
  }
  return output;
}

function basicToDigit(codePoint: number): number {
  if (codePoint - 48 < 10) return codePoint - 22; // '0'..'9' -> 26..35
  if (codePoint - 65 < 26) return codePoint - 65; // 'A'..'Z' -> 0..25
  if (codePoint - 97 < 26) return codePoint - 97; // 'a'..'z' -> 0..25
  return 36;
}

function digitToBasic(digit: number): number {
  // 0..25 -> 'a'..'z'; 26..35 -> '0'..'9'
  return digit + 22 + 75 * Number(digit < 26);
}

function adapt(delta: number, numPoints: number, firstTime: boolean): number {
  const base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700;
  delta = firstTime ? Math.floor(delta / damp) : delta >> 1;
  delta += Math.floor(delta / numPoints);
  let k = 0;
  while (delta > (((base - tMin) * tMax) >> 1)) {
    delta = Math.floor(delta / (base - tMin));
    k += base;
  }
  return k + Math.floor(((base - tMin + 1) * delta) / (delta + skew));
}

function encodePunycode(input: string): string {
  // ASCII fast-path
  if (/^[\x00-\x7F]+$/.test(input)) return input;

  const base = 36, tMin = 1, tMax = 26, initialN = 128, initialBias = 72, delimiter = 0x2d; // '-'
  const codePoints = ucs2decode(input);

  let n = initialN;
  let delta = 0;
  let bias = initialBias;
  let output: number[] = [];

  for (const cp of codePoints) {
    if (cp < 0x80) output.push(cp);
  }

  let basicLength = output.length;
  if (basicLength) output.push(delimiter);

  let handledCPCount = basicLength;
  while (handledCPCount < codePoints.length) {
    let m = Number.MAX_SAFE_INTEGER;
    for (const cp of codePoints) if (cp >= n && cp < m) m = cp;

    delta += (m - n) * (handledCPCount + 1);
    n = m;

    for (const cp of codePoints) {
      if (cp < n) {
        delta++;
      }
      if (cp === n) {
        let q = delta;
        for (let k = base; ; k += base) {
          const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          const code = t + ((q - t) % (base - t));
          output.push(digitToBasic(code));
          q = Math.floor((q - t) / (base - t));
        }
        output.push(digitToBasic(q));
        bias = adapt(delta, handledCPCount + 1, handledCPCount === basicLength);
        delta = 0;
        handledCPCount++;
      }
    }
    delta++;
    n++;
  }

  return String.fromCharCode(...output);
}

function toASCII(domain: string): string {
  if (!domain) return "";
  // Split by dot variants per IDNA (., fullwidth, etc.)
  const dotRegex = /[\u002e\u3002\uff0e\uff61]/g; // . 、
  return domain
    .trim()
    .split(dotRegex)
    .map((label) => (label && /[^\x00-\x7F]/.test(label) ? "xn--" + encodePunycode(label) : label))
    .join(".");
}

const IdnEncode: React.FC = () => {
  const [input, setInput] = useState<string>("www.пример.рф");
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [indentSize] = useState<IndentSize>(2); // UI consistency only

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => setOutput(toASCII(input)), [input]);

  useEffect(() => { if (autoUpdate) convert(); }, [input, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "idn-encoded.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  }, [output]);
  const onClear = useCallback(() => { setInput(""); setOutput(""); }, []);
  const onUploadClick = useCallback(() => fileRef.current?.click(), []);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  const indentUnitLabel = useMemo(() => `${indentSize} spaces`, [indentSize]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[850px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                  Auto-update
                </label>
                <button onClick={convert} className="bg-primary text-black font-semibold border border-black/30 px-3 py-1 rounded text-xs sm:text-sm">Encode</button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={onCopy} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Copy</button>
                <button onClick={onDownload} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Download</button>
                <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <span className="text-sm text-white/80">Input (Unicode Domain)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. bücher.example or مثال.إختبار"
                  className="w-full h-32 sm:h-40 bg-black rounded p-3 font-mono text-xs sm:text-sm border border-white/20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (ASCII/Punycode)</span>
                </div>
                <textarea
                  value={output}
                  readOnly
                  className="w-full h-32 sm:h-40 bg-black rounded p-3 font-mono text-xs sm:text-sm border border-white/20 resize-none"
                />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Notes</h3>
              <div className="text-sm text-white/80">
                Converts Unicode domain labels to ASCII using Punycode (prefix xn--). Dot variants are normalized and ASCII-only labels are preserved.
              </div>
              <div className="text-xs text-white/50 mt-2">Indent display: {indentUnitLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdnEncode;


