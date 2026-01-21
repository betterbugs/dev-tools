"use client";

import React, { useEffect, useRef, useState } from "react";

type Mode = "nth" | "sequence";

// Fast doubling algorithm for Fibonacci numbers using BigInt
// Returns [F(n), F(n+1)]
function fibFastDoubling(n: bigint): [bigint, bigint] {
  if (n === BigInt(0)) return [BigInt(0), BigInt(1)];
  const [a, b] = fibFastDoubling(n >> BigInt(1));
  const c = a * (BigInt(2) * b - a);
  const d = a * a + b * b;
  if ((n & BigInt(1)) === BigInt(0)) return [c, d];
  return [d, c + d];
}

function formatBigInt(value: bigint, withSeparators: boolean): string {
  const s = value.toString();
  if (!withSeparators) return s;
  const sign = s.startsWith("-") ? "-" : "";
  const body = sign ? s.slice(1) : s;
  return (
    sign + body.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}

const FibonacciCalculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoConvert, setAutoConvert] = useState(false);
  const [mode, setMode] = useState<Mode>("nth");
  const [includeZero, setIncludeZero] = useState(true); // for sequence mode
  const [thousandsSep, setThousandsSep] = useState(false);
  const [separator, setSeparator] = useState<"comma" | "space" | "newline">(
    "newline"
  );
  const [zeroIndexed, setZeroIndexed] = useState(true); // for nth meaning: F(0)=0
  const fileRef = useRef<HTMLInputElement>(null);

  const parseNonNegativeInt = (s: string): number | null => {
    const trimmed = s.trim();
    if (!/^\d+$/.test(trimmed)) return null;
    try {
      const n = Number(trimmed);
      if (!Number.isSafeInteger(n) || n < 0) return null;
      return n;
    } catch {
      return null;
    }
  };

  const computeNth = (n: number): string => {
    // Interpret n according to zeroIndexed toggle: if one-indexed, compute F(n) where input 1 -> F(1)=1
    const effective = zeroIndexed ? BigInt(n) : BigInt(Math.max(n, 1) - 1);
    const [fn] = fibFastDoubling(effective);
    return formatBigInt(fn, thousandsSep);
  };

  const computeSequence = (count: number): string => {
    // Build sequence up to count terms. If includeZero is true, start from F(0)=0, else start from F(1)=1.
    if (count === 0) return "";
    const result: string[] = [];
    let a = includeZero ? BigInt(0) : BigInt(1); // F(0) or F(1)
    let b = includeZero ? BigInt(1) : BigInt(1); // F(1)
    let terms = count;
    while (terms > 0) {
      result.push(formatBigInt(a, thousandsSep));
      [a, b] = [b, a + b];
      terms--;
    }
    const sep = separator === "comma" ? ", " : separator === "space" ? " " : "\n";
    return result.join(sep);
  };

  useEffect(() => {
    if (!autoConvert) return;
    const n = parseNonNegativeInt(input);
    if (n === null) {
      setOutput("");
      return;
    }
    if (mode === "nth") {
      setOutput(computeNth(n));
    } else {
      setOutput(computeSequence(n));
    }
  }, [input, autoConvert, mode, includeZero, thousandsSep, separator, zeroIndexed]);

  const onConvert = () => {
    const n = parseNonNegativeInt(input);
    if (n === null) {
      setOutput("");
      return;
    }
    if (mode === "nth") {
      setOutput(computeNth(n));
    } else {
      setOutput(computeSequence(n));
    }
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {}
  };

  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "nth" ? "fibonacci-n.txt" : "fibonacci-sequence.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                  checked={autoConvert}
                  onChange={(e) => setAutoConvert(e.target.checked)}
                />
                Auto Update
              </label>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mode"
                    value="nth"
                    checked={mode === "nth"}
                    onChange={() => setMode("nth")}
                  />
                  Nth Value
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mode"
                    value="sequence"
                    checked={mode === "sequence"}
                    onChange={() => setMode("sequence")}
                  />
                  Sequence
                </label>
              </div>

              {mode === "sequence" ? (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={includeZero}
                    onChange={(e) => setIncludeZero(e.target.checked)}
                  />
                  Include F(0)=0
                </label>
              ) : (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={zeroIndexed}
                    onChange={(e) => setZeroIndexed(e.target.checked)}
                  />
                  Zero-indexed (F(0)=0)
                </label>
              )}

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={thousandsSep}
                  onChange={(e) => setThousandsSep(e.target.checked)}
                />
                Thousands Separator
              </label>

              {mode === "sequence" && (
                <div className="flex items-center gap-2">
                  <span>Separator:</span>
                  <select
                    className="bg-black/90 border border-white/20 rounded px-2 py-1"
                    value={separator}
                    onChange={(e) =>
                      setSeparator(e.target.value as typeof separator)
                    }
                  >
                    <option value="newline">New line</option>
                    <option value="comma">Comma</option>
                    <option value="space">Space</option>
                  </select>
                </div>
              )}

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
                    onClick={onConvert}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Convert
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    mode === "nth"
                      ? "Enter N (e.g., 1000 to compute F(N))"
                      : "Enter count (e.g., 10 to list first 10 terms)"
                  }
                  className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-start justify-between md:gap-0 gap-4">
                  <label className="font-medium">Output</label>
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
                      onClick={onClear}
                      className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FibonacciCalculator;


