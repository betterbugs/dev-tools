"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Mode =
  | "round-half-up"
  | "round-half-down"
  | "round-half-even"
  | "ceil"
  | "floor"
  | "truncate";

const parseNumbers = (text: string): number[] => {
  const matches =
    text.match(/-?\d{1,3}(?:,\d{3})*(?:\.\d+)?|-?\d+(?:\.\d+)?/g) || [];
  return matches
    .map((m) => Number(m.replace(/,/g, "")))
    .filter((n) => Number.isFinite(n));
};

const roundNumber = (
  value: number,
  decimals: number,
  mode: Mode,
  step: number
): number => {
  const stepValue = step > 0 ? step : 0;
  let v = value;
  if (stepValue > 0) v = v / stepValue; // scale for step rounding first

  const factor = Math.pow(10, Math.max(0, decimals));
  const x = v * factor;
  let r = 0;
  switch (mode) {
    case "ceil":
      r = Math.ceil(x);
      break;
    case "floor":
      r = Math.floor(x);
      break;
    case "truncate":
      r = x < 0 ? Math.ceil(x) : Math.trunc(x);
      break;
    case "round-half-down": {
      const frac = x - Math.trunc(x);
      if (Math.abs(frac - 0.5) < 1e-12) r = Math.floor(x);
      else r = Math.round(x);
      break;
    }
    case "round-half-even": {
      const n = Math.floor(x);
      const frac = x - n;
      if (Math.abs(frac - 0.5) < 1e-12) r = n % 2 === 0 ? n : n + 1;
      else r = Math.round(x);
      break;
    }
    default: {
      // round-half-up
      r = Math.round(x);
    }
  }

  let result = r / factor;
  if (stepValue > 0) result = result * stepValue; // rescale back
  // Fix tiny FP errors
  return Number(result.toFixed(Math.max(0, decimals)));
};

const RoundingCalculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [mode, setMode] = useState<Mode>("round-half-up");
  const [decimals, setDecimals] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [thousandsSep, setThousandsSep] = useState(false);
  const [uniqueOnly, setUniqueOnly] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const stats = useMemo(() => ({ count: parseNumbers(input).length }), [input]);

  const formatOut = (nums: number[]): string => {
    const list = thousandsSep
      ? nums.map((n) =>
          Number.isInteger(n)
            ? Math.trunc(n).toLocaleString("en-US")
            : n.toLocaleString("en-US")
        )
      : nums.map((n) => String(n));
    return list.join("\n");
  };

  const calculate = () => {
    let nums = parseNumbers(input).map((n) =>
      roundNumber(n, decimals, mode, step)
    );
    if (uniqueOnly) nums = Array.from(new Set(nums));
    setOutput(formatOut(nums));
  };

  useEffect(() => {
    if (autoUpdate) calculate();
  }, [input, autoUpdate, mode, decimals, step, thousandsSep, uniqueOnly]);

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
    a.download = "rounded-numbers.txt";
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
            {/* Options */}
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
                <span>Mode:</span>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as Mode)}
                  className="bg-black/90 border border-white/20 rounded px-2 py-1"
                >
                  <option value="round-half-up">Round (Half Up)</option>
                  <option value="round-half-down">Round (Half Down)</option>
                  <option value="round-half-even">Round (Bankers)</option>
                  <option value="ceil">Ceil</option>
                  <option value="floor">Floor</option>
                  <option value="truncate">Truncate</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span>Decimals:</span>
                <input
                  type="number"
                  value={decimals}
                  onChange={(e) => setDecimals(Number(e.target.value))}
                  className="w-20 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <span>Step:</span>
                <input
                  type="number"
                  value={step}
                  step="0.0001"
                  onChange={(e) => setStep(Number(e.target.value))}
                  className="w-24 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={thousandsSep}
                  onChange={(e) => setThousandsSep(e.target.checked)}
                />
                Add Thousands Separator
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={uniqueOnly}
                  onChange={(e) => setUniqueOnly(e.target.checked)}
                />
                Unique only
              </label>
              <div className="ml-auto flex items-center gap-2">
                <input
                  type="file"
                  accept=".txt,text/plain"
                  ref={fileRef}
                  onChange={onFileChange}
                  className="hidden"
                />
                <button
                  onClick={onUploadClick}
                  className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors"
                >
                  Upload
                </button>
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">
                    Input
                  </label>
                  <button
                    onClick={calculate}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Calculate
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste text or numbers; we’ll extract numbers and round them."
                  className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Right: Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Output</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(output);
                        } catch {}
                      }}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Copy
                    </button>
                    <button onClick={onUploadClick} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Upload</button>
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

export default RoundingCalculator;
