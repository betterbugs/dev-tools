"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type ColorFormat = "hex" | "rgb" | "hsl" | "all";
type ColorType = "any" | "bright" | "pastel" | "dark" | "monochrome";
type Separator = "newline" | "comma" | "space" | "tab";

const RandomColorGenerator = () => {
  const [count, setCount] = useState<number>(10);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
  const [colorType, setColorType] = useState<ColorType>("any");
  const [separator, setSeparator] = useState<Separator>("newline");
  const [includeNames, setIncludeNames] = useState<boolean>(false);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Color name mapping for common colors
  const colorNames: { [key: string]: string } = {
    "#FF0000": "Red",
    "#00FF00": "Green",
    "#0000FF": "Blue",
    "#FFFF00": "Yellow",
    "#FF00FF": "Magenta",
    "#00FFFF": "Cyan",
    "#FFA500": "Orange",
    "#800080": "Purple",
    "#FFC0CB": "Pink",
    "#A52A2A": "Brown",
    "#000000": "Black",
    "#FFFFFF": "White",
    "#808080": "Gray",
    "#FFD700": "Gold",
    "#C0C0C0": "Silver",
  };

  const getColorName = (hex: string): string => {
    return colorNames[hex.toUpperCase()] || "";
  };

  // When names are requested, pick from the known named palette to guarantee visibility
  const getRandomNamedHex = (): string => {
    const keys = Object.keys(colorNames);
    if (!keys.length) return generateRandomColor("any");
    return keys[Math.floor(Math.random() * keys.length)];
  };

  const generateRandomColor = (type: ColorType): string => {
    let r: number, g: number, b: number;

    switch (type) {
      case "bright":
        // Bright colors - high saturation and value
        r = Math.floor(Math.random() * 128) + 128;
        g = Math.floor(Math.random() * 128) + 128;
        b = Math.floor(Math.random() * 128) + 128;
        break;
      case "pastel":
        // Pastel colors - high value, medium saturation
        r = Math.floor(Math.random() * 128) + 128;
        g = Math.floor(Math.random() * 128) + 128;
        b = Math.floor(Math.random() * 128) + 128;
        // Mix with white for pastel effect
        r = Math.floor((r + 255) / 2);
        g = Math.floor((g + 255) / 2);
        b = Math.floor((b + 255) / 2);
        break;
      case "dark":
        // Dark colors - low value
        r = Math.floor(Math.random() * 128);
        g = Math.floor(Math.random() * 128);
        b = Math.floor(Math.random() * 128);
        break;
      case "monochrome":
        // Monochrome - same value for all channels
        const value = Math.floor(Math.random() * 256);
        r = g = b = value;
        break;
      default:
        // Any color
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    }

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const formatColor = (hex: string, format: ColorFormat): string => {
    const name = includeNames ? getColorName(hex) : "";
    const nameSuffix = name ? ` (${name})` : "";

    switch (format) {
      case "hex":
        return `${hex}${nameSuffix}`;
      case "rgb":
        return `${hexToRgb(hex)}${nameSuffix}`;
      case "hsl":
        return `${hexToHsl(hex)}${nameSuffix}`;
      case "all":
        const rgb = hexToRgb(hex);
        const hsl = hexToHsl(hex);
        return `${hex} | ${rgb} | ${hsl}${nameSuffix}`;
      default:
        return hex;
    }
  };

  const getSeparatorChar = (sep: Separator): string => {
    switch (sep) {
      case "newline":
        return "\n";
      case "comma":
        return ", ";
      case "space":
        return " ";
      case "tab":
        return "\t";
      default:
        return "\n";
    }
  };

  const generate = () => {
    setError("");
    
    if (count <= 0 || count > 1000) {
      setError("Count must be between 1 and 1,000");
      return;
    }

    const colors: string[] = [];
    const separatorChar = getSeparatorChar(separator);

    if (allowDuplicates) {
      // Generate with duplicates allowed
      for (let i = 0; i < count; i++) {
        const hex = includeNames ? getRandomNamedHex() : generateRandomColor(colorType);
        colors.push(formatColor(hex, colorFormat));
      }
    } else {
      // Generate without duplicates
      const used = new Set<string>();
      let attempts = 0;
      const maxAttempts = count * 100; // Prevent infinite loops

      while (colors.length < count && attempts < maxAttempts) {
        const hex = includeNames ? getRandomNamedHex() : generateRandomColor(colorType);
        const formatted = formatColor(hex, colorFormat);

        if (!used.has(formatted)) {
          used.add(formatted);
          colors.push(formatted);
        }
        attempts++;
      }

      if (colors.length < count) {
        setError(`Could not generate ${count} unique colors. Try allowing duplicates.`);
        return;
      }
    }

    const result = colors.join(separatorChar);
    setOutput(result);
  };

  const clearAll = () => {
    setOutput("");
    setError("");
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Color Count
                    </label>
                    <input
                      type="number"
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      min="1"
                      max="1000"
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Color Format
                    </label>
                    <select
                      value={colorFormat}
                      onChange={(e) => setColorFormat(e.target.value as ColorFormat)}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    >
                      <option value="hex">HEX (#FF0000)</option>
                      <option value="rgb">RGB (255, 0, 0)</option>
                      <option value="hsl">HSL (0°, 100%, 50%)</option>
                      <option value="all">All Formats</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Color Type
                    </label>
                    <select
                      value={colorType}
                      onChange={(e) => setColorType(e.target.value as ColorType)}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    >
                      <option value="any">Any Color</option>
                      <option value="bright">Bright Colors</option>
                      <option value="pastel">Pastel Colors</option>
                      <option value="dark">Dark Colors</option>
                      <option value="monochrome">Monochrome</option>
                    </select>
                  </div>

    <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Separator
                    </label>
                    <select
                      value={separator}
                      onChange={(e) => setSeparator(e.target.value as Separator)}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    >
                      <option value="newline">New line</option>
                      <option value="comma">Comma</option>
                      <option value="space">Space</option>
                      <option value="tab">Tab</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={allowDuplicates}
                      onChange={(e) => setAllowDuplicates(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Allow duplicates</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={includeNames}
                      onChange={(e) => setIncludeNames(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Include color names (for common colors)</span>
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={generate}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                  >
                    Generate Colors
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                  >
                    Clear
                  </button>
                </div>

                <div className="w-full">
                  <h3 className="text-lg font-medium mb-2">Generated Colors</h3>
                  {error && (
                    <div className="mb-2 text-sm text-red-400">{error}</div>
                  )}
                  <div className="relative">
                    <textarea
                      readOnly
                      value={output}
                      placeholder="Generated colors will appear here..."
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[180px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                    ></textarea>
                    {output && (
                      <button
                        type="button"
                        onClick={copyAll}
                        title="Copy"
                        className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-white"
                        >
                          <path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z" />
                          <path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z" />
                        </svg>
                      </button>
                    )}
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

export default RandomColorGenerator;
