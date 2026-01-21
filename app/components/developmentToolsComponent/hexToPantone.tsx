"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";

type Pantone = { name: string; r: number; g: number; b: number };

// Minimal Pantone swatch subset for demo. Expand as needed.
const PANTONE_SWATCHES: Pantone[] = [
  { name: "Pantone 100 C", r: 244, g: 237, b: 124 },
  { name: "Pantone 101 C", r: 244, g: 237, b: 71 },
  { name: "Pantone 102 C", r: 245, g: 230, b: 0 },
  { name: "Pantone 107 C", r: 249, g: 224, b: 22 },
  { name: "Pantone 186 C", r: 200, g: 16, b: 46 },
  { name: "Pantone 300 C", r: 0, g: 94, b: 184 },
  { name: "Pantone 354 C", r: 0, g: 175, b: 91 },
  { name: "Pantone 424 C", r: 109, g: 110, b: 112 },
  { name: "Pantone Black C", r: 45, g: 41, b: 38 },
  { name: "Pantone Cool Gray 6 C", r: 190, g: 192, b: 194 },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const s = hex.trim().replace(/^#/, "");
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s)) return null;
  const full = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

const HexToPantone: React.FC = () => {
  const [hex, setHex] = useState<string>("#FF00FF");
  const [error, setError] = useState<string>("");
  const [distancePower, setDistancePower] = useState<number>(2); // 1: Manhattan, 2: Euclidean, 3+: stronger emphasis

  const rgb = useMemo(() => hexToRgb(hex), [hex]);

  useEffect(() => {
    setError(rgb ? "" : "Enter HEX like #RRGGBB or #RGB");
  }, [rgb]);

  const previewHex = useMemo(() => (rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "transparent"), [rgb]);

  const ranked = useMemo(() => {
    if (!rgb) return [] as Array<{ pantone: Pantone; metric: number }>;
    const items = PANTONE_SWATCHES.map((p) => {
      const dr = Math.abs(rgb.r - p.r);
      const dg = Math.abs(rgb.g - p.g);
      const db = Math.abs(rgb.b - p.b);
      const metric = Math.pow(dr, distancePower) + Math.pow(dg, distancePower) + Math.pow(db, distancePower);
      return { pantone: p, metric };
    });
    items.sort((a, b) => a.metric - b.metric);
    return items.slice(0, 24);
  }, [rgb, distancePower]);

  const onCopyHex = useCallback(async () => {
    try { await navigator.clipboard.writeText(hex.toUpperCase()); } catch (_) {}
  }, [hex]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            {/* Top controls */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              <div>
                <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                  <div className="space-y-3">
                    {/* Color picker + HEX input row */}
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={rgb ? `#${((rgb.r << 16) | (rgb.g << 8) | rgb.b).toString(16).padStart(6, "0")}` : "#000000"}
                        onChange={(e) => setHex(e.target.value)}
                        className="w-16 h-10 bg-transparent border border-white/20 rounded cursor-pointer"
                        aria-label="Color Picker"
                      />
                      <div className="flex-1 flex gap-2 items-center">
                        <input
                          value={hex}
                          onChange={(e) => setHex(e.target.value)}
                          placeholder="#RRGGBB or #RGB"
                          className="flex-1 h-10 bg-black rounded px-3 font-mono text-sm border border-white/20"
                        />
                        <button onClick={onCopyHex} className="border border-white/20 px-3 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                      </div>
                    </div>

                    {/* Distance selector */}
                    <div className="flex items-center gap-3 text-xs text-white/80">
                      <label htmlFor="dist" className="opacity-80">Distance</label>
                      <select id="dist" value={distancePower} onChange={(e) => setDistancePower(Number(e.target.value))} className="bg-black border border-white/20 rounded px-2 py-1 text-white text-xs">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </select>
                    </div>

                    {/* Preview color */}
                    <div>
                      <div className="text-sm text-white/80 mb-2">Preview Color</div>
                      <div className="w-40 h-40 rounded-lg border border-white/20" style={{ backgroundColor: previewHex }} />
                    </div>

                    {error && <div className="text-xs text-red-400">{error}</div>}
                  </div>
                </div>
              </div>

              {/* Keep right column empty to center top controls like reference */}
              <div></div>
            </div>

            {/* Suggestions grid */}
            <div className="mt-8">
              <div className="grid md:grid-cols-6 sm:grid-cols-4 grid-cols-3 gap-4">
                {ranked.map((it, idx) => (
                  <div key={`${it.pantone.name}-${idx}`} className="rounded-lg border border-white/20 bg-black/40">
                    <div className="w-full h-20 rounded-t-lg" style={{ backgroundColor: `rgb(${it.pantone.r}, ${it.pantone.g}, ${it.pantone.b})` }} />
                    <div className="flex items-center justify-between gap-2 px-3 py-2">
                      <span className="text-xs truncate" title={it.pantone.name}>{it.pantone.name}</span>
                      <button
                        onClick={async () => { try { await navigator.clipboard.writeText(it.pantone.name); } catch (_) {} }}
                        className="border border-white/20 px-2 py-0.5 rounded text-[11px] bg-primary text-black font-bold"
                      >Copy</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HexToPantone;


