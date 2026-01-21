"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

interface Options {
  percentInput: boolean; // input as 0–100%
}

const parseCmyk = (input: string, percentInput: boolean): { c: number; m: number; y: number; k: number } | null => {
  const s = input.trim();
  // Supports: "cmyk(c, m, y, k)" or "c, m, y, k"; each either 0–1 or 0–100%
  const m = s.match(/^cmyk\s*\(\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^\)]+)\s*\)$|^([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)$/i);
  if (!m) return null;
  const vals = [m[1] ?? m[5], m[2] ?? m[6], m[3] ?? m[7], m[4] ?? m[8]].map((v) => String(v).trim());

  const toNumber = (v: string): number | null => {
    // accept values like 0.5, 50, 50% depending on percentInput
    const percent = v.endsWith("%") ? Number(v.slice(0, -1)) : NaN;
    if (!isNaN(percent)) {
      if (percent < 0 || percent > 100) return null;
      return percent / 100;
    }
    const num = Number(v);
    if (isNaN(num)) return null;
    if (percentInput) {
      // treat 0–100 numbers as percent
      if (num < 0 || num > 100) return null;
      return num / 100;
    }
    // treat 0–1 numbers as fraction
    if (num < 0 || num > 1) return null;
    return num;
  };

  const c = toNumber(vals[0]);
  const m_ = toNumber(vals[1]);
  const y = toNumber(vals[2]);
  const k = toNumber(vals[3]);
  if ([c, m_, y, k].some((v) => v === null)) return null;
  return { c: c as number, m: m_ as number, y: y as number, k: k as number };
}

const cmykToRgb = (c: number, m: number, y: number, k: number): { r: number; g: number; b: number } => {
  // Standard CMYK -> RGB conversion
  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));
  return { r, g, b };
}

const CmykToRgbConverter: React.FC = () => {
  const [input, setInput] = useState<string>("cmyk(0%, 100%, 0%, 0%)");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<Options>({ percentInput: true });
  const [c, setC] = useState<number>(0);
  const [m, setM] = useState<number>(100);
  const [y, setY] = useState<number>(0);
  const [k, setK] = useState<number>(0);
  const [rOut, setROut] = useState<number>(0);
  const [gOut, setGOut] = useState<number>(0);
  const [bOut, setBOut] = useState<number>(0);

  useEffect(() => {
    // Recompute output directly from channel values
    const frac = (v: number) => (options.percentInput ? v / 100 : v);
    const rgb = cmykToRgb(frac(c), frac(m), frac(y), frac(k));
    setROut(rgb.r); setGOut(rgb.g); setBOut(rgb.b);
  }, [c, m, y, k, options.percentInput]);

  const hint = useMemo(
    () =>
      error ||
      (options.percentInput
        ? "Enter CMYK like '0,100,0,0' or cmyk(0%,100%,0%,0%)."
        : "Enter CMYK as fractions like '0,1,0,0' or cmyk(0,1,0,0)."),
    [error, options.percentInput]
  );
  const previewColor = useMemo(() => {
    const frac = (v: number) => (options.percentInput ? v / 100 : v);
    const rgb = cmykToRgb(frac(c), frac(m), frac(y), frac(k));
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }, [c, m, y, k, options.percentInput]);
  const copyCmyk = useCallback(async () => {
    try { await navigator.clipboard.writeText(options.percentInput ? `cmyk(${c}%, ${m}%, ${y}%, ${k}%)` : `cmyk(${c}, ${m}, ${y}, ${k})`); } catch (_) {}
  }, [c, m, y, k, options.percentInput]);
  const copyRgb = useCallback(async () => {
    try { await navigator.clipboard.writeText(`rgb(${rOut}, ${gOut}, ${bOut})`); } catch (_) {}
  }, [rOut, gOut, bOut]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Input (CMYK)</span>
                  <button onClick={copyCmyk} className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                </div>
                <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                  <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-xs text-white/70">Cyan</div>
                      <input type="number" min={0} max={options.percentInput ? 100 : 1} step={options.percentInput ? 1 : 0.01} value={c}
                        onChange={(e) => { const v = Math.max(0, Math.min(options.percentInput ? 100 : 1, Number(e.target.value))); setC(v); setInput(options.percentInput ? `${v}, ${m}, ${y}, ${k}` : `${v}, ${m}, ${y}, ${k}`); }}
                        className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-white/70">Magenta</div>
                      <input type="number" min={0} max={options.percentInput ? 100 : 1} step={options.percentInput ? 1 : 0.01} value={m}
                        onChange={(e) => { const v = Math.max(0, Math.min(options.percentInput ? 100 : 1, Number(e.target.value))); setM(v); setInput(options.percentInput ? `${c}, ${v}, ${y}, ${k}` : `${c}, ${v}, ${y}, ${k}`); }}
                        className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-white/70">Yellow</div>
                      <input type="number" min={0} max={options.percentInput ? 100 : 1} step={options.percentInput ? 1 : 0.01} value={y}
                        onChange={(e) => { const v = Math.max(0, Math.min(options.percentInput ? 100 : 1, Number(e.target.value))); setY(v); setInput(options.percentInput ? `${c}, ${m}, ${v}, ${k}` : `${c}, ${m}, ${v}, ${k}`); }}
                        className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-white/70">Black (Key)</div>
                      <input type="number" min={0} max={options.percentInput ? 100 : 1} step={options.percentInput ? 1 : 0.01} value={k}
                        onChange={(e) => { const v = Math.max(0, Math.min(options.percentInput ? 100 : 1, Number(e.target.value))); setK(v); setInput(options.percentInput ? `${c}, ${m}, ${y}, ${v}` : `${c}, ${m}, ${y}, ${v}`); }}
                        className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                  </div>
                </div>
                <div className={`text-xs mt-2 ${error ? "text-red-400" : "text-white/60"}`}>{hint}</div>

                {/* Derived RGB row */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Converted (RGB)</span>
                    <button onClick={copyRgb} className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                  </div>
                  <div className="grid md:grid-cols-3 grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-white/70 mb-1">Red</div>
                      <input readOnly value={rOut} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                    <div>
                      <div className="text-xs text-white/70 mb-1">Green</div>
                      <input readOnly value={gOut} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                    <div>
                      <div className="text-xs text-white/70 mb-1">Blue</div>
                      <input readOnly value={bOut} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="mt-2 flex justify-center items-center flex-col">
                  <div className="text-sm text-white/80 mb-2">Preview Color</div>
                  <div className="w-56 h-56 rounded-lg border border-white/20 shadow-inner" style={{ backgroundColor: previewColor }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmykToRgbConverter;


