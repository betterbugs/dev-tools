"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

// Punycode decoder (RFC 3492). Decode a single label (without xn-- prefix).
function ucs2encode(array: number[]): string {
  return array
    .map((value) => {
      if (value > 0xffff) {
        value -= 0x10000;
        return String.fromCharCode((value >>> 10) + 0xd800) + String.fromCharCode((value & 0x3ff) + 0xdc00);
      }
      return String.fromCharCode(value);
    })
    .join("");
}

function basicToDigit(codePoint: number): number {
  if (codePoint - 48 < 10) return codePoint - 22; // '0'..'9' -> 26..35
  if (codePoint - 65 < 26) return codePoint - 65; // 'A'..'Z' -> 0..25
  if (codePoint - 97 < 26) return codePoint - 97; // 'a'..'z' -> 0..25
  return 36;
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

function decodePunycode(input: string): string {
  const base = 36, tMin = 1, tMax = 26, initialN = 128, initialBias = 72, delimiter = 0x2d; // '-'

  const inputCodePoints = Array.from(input).map((c) => c.charCodeAt(0));
  let n = initialN;
  let bias = initialBias;
  let i = 0;
  let output: number[] = [];

  let b = inputCodePoints.lastIndexOf(delimiter);
  if (b < 0) b = 0;
  for (let j = 0; j < b; ++j) output.push(inputCodePoints[j]);

  let index = b > 0 ? b + 1 : 0;

  while (index < inputCodePoints.length) {
    let oldi = i;
    let w = 1;
    for (let k = base; ; k += base) {
      if (index >= inputCodePoints.length) return ""; // invalid input
      const digit = basicToDigit(inputCodePoints[index++]);
      if (digit >= base) return ""; // invalid
      i += digit * w;
      const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
      if (digit < t) break;
      w *= base - t;
    }
    const outLen = output.length + 1;
    bias = adapt(i - oldi, outLen, oldi === 0);
    n += Math.floor(i / outLen);
    i %= outLen;
    output.splice(i, 0, n);
    i++;
  }

  return ucs2encode(output);
}

function toUnicode(domain: string): string {
  if (!domain) return "";
  const dotRegex = /[\u002e\u3002\uff0e\uff61]/g; // dot variants
  const lines = domain.replace(/\r\n?/g, "\n").split("\n");
  const converted = lines.map((line) => {
    const labels = line
      .split(dotRegex)
      .map((label) => label.trim())
      .filter((label, idx, arr) => !(label === "" && idx === arr.length - 1));
    const mapped = labels.map((label) =>
      label.toLowerCase().startsWith("xn--") ? decodePunycode(label.slice(4)) : label
    );
    return mapped.join(".");
  });
  // Render all results inline, separated by a space
  return converted.filter(Boolean).join(" ");
}

const IdnDecode: React.FC = () => {
  const [input, setInput] = useState<string>("www.xn--e1afmkfd.xn--p1ai");
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [indentSize] = useState<IndentSize>(2);

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => setOutput(toUnicode(input)), [input]);
  useEffect(() => { if (autoUpdate) convert(); }, [input, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "idn-decoded.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
                <button onClick={convert} className="bg-primary text-black font-semibold border border-black/30 px-3 py-1 rounded text-xs sm:text-sm">Decode</button>
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
                  <span className="text-sm text-white/80">Input (ASCII/Punycode)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. xn--bcher-kva.example or www.xn--fsq.com"
                  className="w-full h-32 sm:h-40 bg-black rounded p-3 font-mono text-xs sm:text-sm border border-white/20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (Unicode Domain)</span>
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
                Converts ASCII/Punycode domain labels (starting with xn--) to Unicode domain labels. Dot variants are normalized.
              </div>
              <div className="text-xs text-white/50 mt-2">Indent display: {indentUnitLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdnDecode;


