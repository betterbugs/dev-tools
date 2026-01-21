"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

type IndentSize = 2 | 4;
// Options removed with simplified UI

const parseRgb = (input: string): { r: number; g: number; b: number } | null => {
  const s = input.trim();
  // Supports: "255, 0, 128" or "rgb(255, 0, 128)"
  const m = s.match(/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$|^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/i);
  if (!m) return null;
  const r = Number(m[1] ?? m[4]);
  const g = Number(m[2] ?? m[5]);
  const b = Number(m[3] ?? m[6]);
  if ([r, g, b].some((v) => isNaN(v) || v < 0 || v > 255)) return null;
  return { r, g, b };
}

const rgbToCmyk = (r: number, g: number, b: number): { c: number; m: number; y: number; k: number } => {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;
  const k = 1 - Math.max(R, G, B);
  if (k >= 1) return { c: 0, m: 0, y: 0, k: 1 };
  const c = (1 - R - k) / (1 - k);
  const m = (1 - G - k) / (1 - k);
  const y = (1 - B - k) / (1 - k);
  return { c, m, y, k };
}

// Formatting removed with simplified UI (not displayed)

const RgbToCmykConverter: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [r, setR] = useState<number>(255);
  const [g, setG] = useState<number>(0);
  const [b, setB] = useState<number>(128);
  const [cOut, setCOut] = useState<number>(0);
  const [mOut, setMOut] = useState<number>(0);
  const [yOut, setYOut] = useState<number>(0);
  const [kOut, setKOut] = useState<number>(0);
  useEffect(() => {
    if ([r, g, b].some((v) => isNaN(Number(v)) || v < 0 || v > 255)) {
      setError("Invalid RGB. Components must be 0–255.");
      return;
    }
    setError("");
    const cmyk = rgbToCmyk(r, g, b);
    setCOut(Math.round(cmyk.c * 100));
    setMOut(Math.round(cmyk.m * 100));
    setYOut(Math.round(cmyk.y * 100));
    setKOut(Math.round(cmyk.k * 100));
  }, [r, g, b]);

  const hint = useMemo(() => error || "", [error]);
  const previewColor = useMemo(() => `rgb(${r}, ${g}, ${b})`, [r, g, b]);
  const copyRgb = useCallback(async () => {
    try { await navigator.clipboard.writeText(`rgb(${r}, ${g}, ${b})`); } catch (_) {}
  }, [r, g, b]);
  const copyCmyk = useCallback(async () => {
    try { await navigator.clipboard.writeText(`cmyk(${cOut}%, ${mOut}%, ${yOut}%, ${kOut}%)`); } catch (_) {}
  }, [cOut, mOut, yOut, kOut]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Input (RGB)</span>
                  <button onClick={copyRgb} className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                </div>
                <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <div className="text-xs text-white/70">Red</div>
                      <input type="number" min={0} max={255} value={r} onChange={(e) => { const v = Math.max(0, Math.min(255, Number(e.target.value))); setR(v); }} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-white/70">Green</div>
                      <input type="number" min={0} max={255} value={g} onChange={(e) => { const v = Math.max(0, Math.min(255, Number(e.target.value))); setG(v); }} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-white/70">Blue</div>
                      <input type="number" min={0} max={255} value={b} onChange={(e) => { const v = Math.max(0, Math.min(255, Number(e.target.value))); setB(v); }} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                  </div>
                </div>
                <div className={`text-xs mt-2 ${error ? "text-red-400" : "text-white/60"}`}>{hint}</div>

                {/* Derived CMYK row */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Converted (CMYK)</span>
                    <button onClick={copyCmyk} className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                  </div>
                  <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-white/70 mb-1">Cyan</div>
                      <input readOnly value={cOut} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                    <div>
                      <div className="text-xs text-white/70 mb-1">Magenta</div>
                      <input readOnly value={mOut} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                    <div>
                      <div className="text-xs text-white/70 mb-1">Yellow</div>
                      <input readOnly value={yOut} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                    <div>
                      <div className="text-xs text-white/70 mb-1">Black (Key)</div>
                      <input readOnly value={kOut} className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
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

export default RgbToCmykConverter;


