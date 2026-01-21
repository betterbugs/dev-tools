"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const cmykToRgb = (c: number, m: number, y: number, k: number): { r: number; g: number; b: number } => {
  const C = c / 100;
  const M = m / 100;
  const Y = y / 100;
  const K = k / 100;
  
  const r = Math.round(255 * (1 - C) * (1 - K));
  const g = Math.round(255 * (1 - M) * (1 - K));
  const b = Math.round(255 * (1 - Y) * (1 - K));
  
  return { r, g, b };
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

const CmykToHexConverter: React.FC = () => {
  const [cmyk, setCmyk] = useState<{ c: number; m: number; y: number; k: number }>({ c: 0, m: 37, y: 37, k: 10 });
  const [rgb, setRgb] = useState<{ r: number; g: number; b: number }>({ r: 229, g: 144, b: 144 });
  const [hsv, setHsv] = useState<{ h: number; s: number; v: number }>({ h: 0, s: 0, v: 0 });
  const [hex, setHex] = useState<string>("#e59090");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // Validate CMYK values
    const { c, m, y, k } = cmyk;
    if (c < 0 || c > 100 || m < 0 || m > 100 || y < 0 || y > 100 || k < 0 || k > 100) {
      setError("CMYK values must be between 0 and 100");
      return;
    }

    setError("");
    const rgbResult = cmykToRgb(c, m, y, k);
    const hsvResult = rgbToHsv(rgbResult.r, rgbResult.g, rgbResult.b);
    const hexResult = rgbToHex(rgbResult.r, rgbResult.g, rgbResult.b);
    
    setRgb(rgbResult);
    setHsv(hsvResult);
    setHex(hexResult);
  }, [cmyk]);

  const previewColor = useMemo(() => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, [rgb]);

  const copyCmyk = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`);
    } catch (_) {}
  }, [cmyk]);

  const copyRgb = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    } catch (_) {}
  }, [rgb]);

  const copyHex = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch (_) {}
  }, [hex]);

  const handleClear = useCallback(() => {
    setCmyk({ c: 0, m: 0, y: 0, k: 0 });
    setRgb({ r: 0, g: 0, b: 0 });
    setHsv({ h: 0, s: 0, v: 0 });
    setHex("#000000");
    setError("");
  }, []);

  const handleCmykChange = useCallback((field: 'c' | 'm' | 'y' | 'k', value: number) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    setCmyk(prev => ({ ...prev, [field]: clampedValue }));
  }, []);

  const handleColorPickerChange = useCallback((newHsv: { h: number; s: number; v: number }) => {
    const newRgb = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    
    // Convert RGB back to CMYK
    const R = newRgb.r / 255;
    const G = newRgb.g / 255;
    const B = newRgb.b / 255;
    const k = 1 - Math.max(R, G, B);
    
    let c = 0, m = 0, y = 0;
    if (k < 1) {
      c = ((1 - R - k) / (1 - k)) * 100;
      m = ((1 - G - k) / (1 - k)) * 100;
      y = ((1 - B - k) / (1 - k)) * 100;
    }
    
    setHsv(newHsv);
    setRgb(newRgb);
    setHex(newHex);
    setCmyk({ 
      c: Math.round(c), 
      m: Math.round(m), 
      y: Math.round(y), 
      k: Math.round(k * 100) 
    });
  }, []);

  const handleHueChange = useCallback((hue: number) => {
    const newHsv = { ...hsv, h: hue };
    handleColorPickerChange(newHsv);
  }, [hsv, handleColorPickerChange]);

  const handleSaturationValueChange = useCallback((saturation: number, value: number) => {
    const newHsv = { ...hsv, s: saturation, v: value };
    handleColorPickerChange(newHsv);
  }, [hsv, handleColorPickerChange]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              <div>
                {/* CMYK Input */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">CMYK Input</span>
                    <button 
                      onClick={copyCmyk} 
                      className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold hover:bg-primary/80"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-white/70 mb-1">Cyan</div>
                        <input 
                          type="number"
                          min="0"
                          max="100"
                          value={cmyk.c}
                          onChange={(e) => handleCmykChange('c', Number(e.target.value))}
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-white/70 mb-1">Magenta</div>
                        <input 
                          type="number"
                          min="0"
                          max="100"
                          value={cmyk.m}
                          onChange={(e) => handleCmykChange('m', Number(e.target.value))}
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-white/70 mb-1">Yellow</div>
                        <input 
                          type="number"
                          min="0"
                          max="100"
                          value={cmyk.y}
                          onChange={(e) => handleCmykChange('y', Number(e.target.value))}
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-white/70 mb-1">Black (Key)</div>
                        <input 
                          type="number"
                          min="0"
                          max="100"
                          value={cmyk.k}
                          onChange={(e) => handleCmykChange('k', Number(e.target.value))}
                          className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  {error && <div className="text-xs mt-2 text-red-400">{error}</div>}
                </div>

                {/* RGB Display */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">RGB Values</span>
                    <button 
                      onClick={copyRgb} 
                      className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold hover:bg-primary/80"
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

                {/* HEX Output */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">HEX Output</span>
                    <button 
                      onClick={copyHex} 
                      className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold hover:bg-primary/80"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-white/10">
                    <input
                      type="text"
                      readOnly
                      value={hex}
                      className="w-full h-10 bg-black rounded px-3 font-mono text-sm border border-white/20 text-white"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleClear}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm hover:bg-red/80`}
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
                  <div className="text-xs text-white/60">CMYK: {cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%</div>
                  <div className="text-xs text-white/60">RGB: {rgb.r}, {rgb.g}, {rgb.b}</div>
                  <div className="text-xs text-white/60">HEX: {hex}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmykToHexConverter;
