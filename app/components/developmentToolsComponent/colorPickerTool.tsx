"use client";
import React, { useEffect, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const hexToRgb = (hex: string): RGB | null => {
  const cleaned = hex.replace(/#/g, "").trim();
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(cleaned)) return null;
  const full = cleaned.length === 3 ? cleaned.split("").map((c) => c + c).join("") : cleaned;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return { r, g, b };
};

const rgbToHex = ({ r, g, b }: RGB): string => {
  const to = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
};

const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case rn: h = ((gn - bn) / d) % 6; break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
    }
  }
  h = Math.round((h * 60 + 360) % 360);
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
};

const hslToRgb = ({ h, s, l }: HSL): RGB => {
  const ss = s / 100, ll = l / 100;
  const c = (1 - Math.abs(2 * ll - 1)) * ss;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ll - c / 2;
  let r1 = 0, g1 = 0, b1 = 0;
  if (h >= 0 && h < 60) { r1 = c; g1 = x; }
  else if (h < 120) { r1 = x; g1 = c; }
  else if (h < 180) { g1 = c; b1 = x; }
  else if (h < 240) { g1 = x; b1 = c; }
  else if (h < 300) { r1 = x; b1 = c; }
  else { r1 = c; b1 = x; }
  return { r: Math.round((r1 + m) * 255), g: Math.round((g1 + m) * 255), b: Math.round((b1 + m) * 255) };
};

const makeShades = (base: HSL): string[] => {
  const steps = [90, 80, 70, 60, 50, 40, 30];
  return steps.map((l) => `hsl(${base.h} ${base.s}% ${l}%)`);
};

const ColorPickerTool = () => {
  const [hex, setHex] = useState<string>("#4F46E5");
  const [alpha, setAlpha] = useState<number>(100);
  const [rgb, setRgb] = useState<RGB>({ r: 79, g: 70, b: 229 });
  const [hsl, setHsl] = useState<HSL>(() => rgbToHsl({ r: 79, g: 70, b: 229 }));

  // keep all in sync when hex changes
  useEffect(() => {
    const parsed = hexToRgb(hex);
    if (parsed) {
      setRgb(parsed);
      setHsl(rgbToHsl(parsed));
    }
  }, [hex]);

  const rgbaCss = useMemo(() => {
    const a = clamp(alpha / 100, 0, 1);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
  }, [rgb, alpha]);

  const shades = useMemo(() => makeShades(hsl), [hsl]);

  const onRgbChange = (key: keyof RGB, value: number) => {
    const next = { ...rgb, [key]: clamp(value, 0, 255) } as RGB;
    setRgb(next);
    setHex(rgbToHex(next));
    setHsl(rgbToHsl(next));
  };

  const onHslChange = (key: keyof HSL, value: number) => {
    const ranges: Record<keyof HSL, [number, number]> = { h: [0, 360], s: [0, 100], l: [0, 100] };
    const clamped = clamp(value, ranges[key][0], ranges[key][1]);
    const next = { ...hsl, [key]: clamped } as HSL;
    setHsl(next);
    const rgbNew = hslToRgb(next);
    setRgb(rgbNew);
    setHex(rgbToHex(rgbNew));
  };

  const copy = async (text: string) => navigator.clipboard.writeText(text);

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Color</label>
                    <input
                      type="color"
                      value={hex}
                      onChange={(e) => setHex(e.target.value)}
                      className="w-full h-12 rounded-lg cursor-pointer"
                    />
                  </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">HEX</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={hex}
                          onChange={(e) => setHex(e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`)}
                          className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                          placeholder="#000000"
                        />
                        <button
                          type="button"
                          onClick={() => copy(hex)}
                          className="absolute right-2 top-2 px-3 py-1 bg-primary text-black text-sm rounded hover:bg-opacity-80"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">RGB</label>
                      <div className="grid grid-cols-3 gap-2">
                        <input type="number" value={rgb.r} min={0} max={255} onChange={(e) => onRgbChange("r", Number(e.target.value))} className="w-full bg-black border border-[#222222] rounded-lg px-3 py-3 text-white" />
                        <input type="number" value={rgb.g} min={0} max={255} onChange={(e) => onRgbChange("g", Number(e.target.value))} className="w-full bg-black border border-[#222222] rounded-lg px-3 py-3 text-white" />
                        <input type="number" value={rgb.b} min={0} max={255} onChange={(e) => onRgbChange("b", Number(e.target.value))} className="w-full bg-black border border-[#222222] rounded-lg px-3 py-3 text-white" />
                      </div>
                    </div>

    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">HSL</label>
                      <div className="grid grid-cols-3 gap-2">
                        <input type="number" value={hsl.h} min={0} max={360} onChange={(e) => onHslChange("h", Number(e.target.value))} className="w-full bg-black border border-[#222222] rounded-lg px-3 py-3 text-white" />
                        <input type="number" value={hsl.s} min={0} max={100} onChange={(e) => onHslChange("s", Number(e.target.value))} className="w-full bg-black border border-[#222222] rounded-lg px-3 py-3 text-white" />
                        <input type="number" value={hsl.l} min={0} max={100} onChange={(e) => onHslChange("l", Number(e.target.value))} className="w-full bg-black border border-[#222222] rounded-lg px-3 py-3 text-white" />
                      </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-2 text-white/80">Alpha</label>
                    <input type="range" min={0} max={100} value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} className="w-full" style={{ accentColor: '#00DA92' }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(rgbaCss)}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Copy RGBA
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-white/80 mb-2">Preview</div>
                    <div className="h-32 rounded-lg border border-[#222222]" style={{ background: rgbaCss }} />
                    <div className="mt-3 text-xs text-white/60">{rgbaCss}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm text-white/80 mb-2">Shades</div>
                    <div className="grid grid-cols-7 gap-2">
                      {shades.map((c) => (
                        <button key={c} type="button" className="h-12 rounded border border-[#222222]" style={{ background: c }} onClick={() => setHex(rgbToHex(hslToRgb(hsl)))} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </section>
  );
};

export default ColorPickerTool;
