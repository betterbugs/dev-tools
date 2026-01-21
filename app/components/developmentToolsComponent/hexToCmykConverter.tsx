"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  let h = hex.trim();
  if (h.startsWith("#")) h = h.slice(1);
  if (![3, 6].includes(h.length)) return null;

  const expand = (s: string) => s.split("").map((c) => c + c).join("");
  if (h.length === 3) h = expand(h);

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
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
};

const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;
  
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const diff = max - min;
  
  let h = 0;
  if (diff !== 0) {
    if (max === R) h = ((G - B) / diff) % 6;
    else if (max === G) h = (B - R) / diff + 2;
    else h = (R - G) / diff + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  
  const s = max === 0 ? 0 : diff / max;
  const v = max;
  
  return { h, s, v };
};

const hsvToRgb = (h: number, s: number, v: number): { r: number; g: number; b: number } => {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const HexToCmykConverter: React.FC = () => {
  const [input, setInput] = useState<string>("#FF5733");
  const [error, setError] = useState<string>("");
  const [cmyk, setCmyk] = useState<{ c: number; m: number; y: number; k: number }>({ c: 0, m: 0, y: 0, k: 0 });
  const [rgb, setRgb] = useState<{ r: number; g: number; b: number }>({ r: 255, g: 87, b: 51 });
  const [hsv, setHsv] = useState<{ h: number; s: number; v: number }>({ h: 0, s: 0, v: 0 });

  useEffect(() => {
    if (!input.trim()) {
      setError("");
      return;
    }

    const parsed = parseHex(input);
    if (!parsed) {
      setError("Invalid HEX format. Please use #RRGGBB or #RGB format.");
      return;
    }

    setError("");
    setRgb(parsed);
    const cmykResult = rgbToCmyk(parsed.r, parsed.g, parsed.b);
    const hsvResult = rgbToHsv(parsed.r, parsed.g, parsed.b);
    setCmyk(cmykResult);
    setHsv(hsvResult);
  }, [input]);

  const previewColor = useMemo(() => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, [rgb]);

  const copyHex = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(input);
    } catch (_) {}
  }, [input]);

  const copyRgb = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    } catch (_) {}
  }, [rgb]);

  const copyCmyk = useCallback(async () => {
    try {
      const c = Math.round(cmyk.c * 100);
      const m = Math.round(cmyk.m * 100);
      const y = Math.round(cmyk.y * 100);
      const k = Math.round(cmyk.k * 100);
      await navigator.clipboard.writeText(`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`);
    } catch (_) {}
  }, [cmyk]);

  const handleClear = useCallback(() => {
    setInput("");
    setError("");
    setCmyk({ c: 0, m: 0, y: 0, k: 0 });
    setRgb({ r: 0, g: 0, b: 0 });
    setHsv({ h: 0, s: 0, v: 0 });
  }, []);

  const handleColorPickerChange = useCallback((newHsv: { h: number; s: number; v: number }) => {
    const newRgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHsv(newHsv);
    setRgb(newRgb);
    setInput(newHex);
  }, []);

  const handleHueChange = useCallback((hue: number) => {
    const newHsv = { ...hsv, h: hue };
    handleColorPickerChange(newHsv);
  }, [hsv, handleColorPickerChange]);

  const handleSaturationValueChange = useCallback((saturation: number, value: number) => {
    const newHsv = { ...hsv, s: saturation, v: value };
    handleColorPickerChange(newHsv);
  }, [hsv, handleColorPickerChange]);

  const handleHexInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove any non-hex characters (only allow 0-9, A-F, a-f, and #)
    value = value.replace(/[^#0-9A-Fa-f]/g, '');
    
    // Ensure # is at the beginning if present
    if (value.includes('#') && !value.startsWith('#')) {
      value = '#' + value.replace(/#/g, '');
    }
    
    // Limit length based on format
    if (value.startsWith('#')) {
      // For #RGB or #RRGGBB format, limit to 7 characters max
      if (value.length > 7) {
        value = value.substring(0, 7);
      }
    } else {
      // For RGB format without #, limit to 6 characters max
      if (value.length > 6) {
        value = value.substring(0, 6);
      }
    }
    
    setInput(value);
  }, []);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              <div>
                {/* HEX Input */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">HEX Input</span>
                    <button 
                      onClick={copyHex} 
                      className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                    <input
                      type="text"
                      value={input}
                      onChange={handleHexInputChange}
                      placeholder="#FF5733 or FF5733"
                      maxLength={7}
                      pattern="[#]?[0-9A-Fa-f]{3,6}"
                      className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white"
                    />
                  </div>
                  {error && <div className="text-xs mt-2 text-red-400">{error}</div>}
                </div>

                {/* RGB Display */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">RGB Values</span>
                    <button 
                      onClick={copyRgb} 
                      className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                      <div>
                        <div className="text-xs text-white/70 mb-1">Red</div>
                        <input 
                          readOnly 
                          value={rgb.r} 
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" 
                        />
                      </div>
                      <div>
                        <div className="text-xs text-white/70 mb-1">Green</div>
                        <input 
                          readOnly 
                          value={rgb.g} 
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" 
                        />
                      </div>
                      <div>
                        <div className="text-xs text-white/70 mb-1">Blue</div>
                        <input 
                          readOnly 
                          value={rgb.b} 
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CMYK Output */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">CMYK Values</span>
                    <button 
                      onClick={copyCmyk} 
                      className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-white/70 mb-1">Cyan</div>
                        <input 
                          readOnly 
                          value={Math.round(cmyk.c * 100)} 
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" 
                        />
                      </div>
                      <div>
                        <div className="text-xs text-white/70 mb-1">Magenta</div>
                        <input 
                          readOnly 
                          value={Math.round(cmyk.m * 100)} 
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" 
                        />
                      </div>
                      <div>
                        <div className="text-xs text-white/70 mb-1">Yellow</div>
                        <input 
                          readOnly 
                          value={Math.round(cmyk.y * 100)} 
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" 
                        />
                      </div>
                      <div>
                        <div className="text-xs text-white/70 mb-1">Black (Key)</div>
                        <input 
                          readOnly 
                          value={Math.round(cmyk.k * 100)} 
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleClear}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Color Preview and Picker */}
              <div className="space-y-4">
                <div className="text-sm text-white/80 mb-4">Color Selection</div>
                
                {/* Preview and Picker Side by Side */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Color Preview */}
                  <div className="space-y-2">
                    <div className="text-xs text-white/70 text-center">Preview Color</div>
                    <div 
                      className="w-32 h-32 rounded-lg border border-white/20 shadow-inner mx-auto" 
                      style={{ backgroundColor: previewColor }} 
                    />
                  </div>

                  {/* Color Picker */}
                  <div className="space-y-2">
                    <div className="text-xs text-white/70 text-center">Color Picker</div>
                    <div className="relative">
                      <div 
                        className="w-32 h-32 rounded-lg border border-white/20 cursor-crosshair relative overflow-hidden mx-auto"
                        style={{
                          background: `linear-gradient(to right, white, hsl(${hsv.h}, 100%, 50%)), linear-gradient(to top, black, transparent)`
                        }}
                        onMouseDown={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          const saturation = Math.max(0, Math.min(1, x / rect.width));
                          const value = Math.max(0, Math.min(1, 1 - (y / rect.height)));
                          handleSaturationValueChange(saturation, value);
                        }}
                        onMouseMove={(e) => {
                          if (e.buttons === 1) {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            const saturation = Math.max(0, Math.min(1, x / rect.width));
                            const value = Math.max(0, Math.min(1, 1 - (y / rect.height)));
                            handleSaturationValueChange(saturation, value);
                          }
                        }}
                      >
                        {/* Color picker cursor */}
                        <div
                          className="absolute w-3 h-3 border-2 border-white rounded-full shadow-lg pointer-events-none"
                          style={{
                            left: `${hsv.s * 100}%`,
                            top: `${(1 - hsv.v) * 100}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hue Slider */}
                <div className="space-y-2">
                  <div className="text-xs text-white/70 text-center">Hue</div>
                  <div className="relative">
                    <div 
                      className="w-full h-6 rounded-lg border border-white/20 cursor-pointer relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                      }}
                      onMouseDown={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const hue = Math.max(0, Math.min(360, (x / rect.width) * 360));
                        handleHueChange(hue);
                      }}
                      onMouseMove={(e) => {
                        if (e.buttons === 1) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const hue = Math.max(0, Math.min(360, (x / rect.width) * 360));
                          handleHueChange(hue);
                        }
                      }}
                    >
                      {/* Hue slider cursor */}
                      <div
                        className="absolute w-3 h-3 border-2 border-white rounded-full shadow-lg pointer-events-none"
                        style={{
                          left: `${(hsv.h / 360) * 100}%`,
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Color Values Display */}
                <div className="text-center space-y-1">
                  <div className="text-xs text-white/60">HEX: {input}</div>
                  <div className="text-xs text-white/60">RGB: {rgb.r}, {rgb.g}, {rgb.b}</div>
                  <div className="text-xs text-white/60">
                    CMYK: {Math.round(cmyk.c * 100)}%, {Math.round(cmyk.m * 100)}%, {Math.round(cmyk.y * 100)}%, {Math.round(cmyk.k * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HexToCmykConverter;
