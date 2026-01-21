"use client";
import React, { useCallback, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type ConvertOptions = {
  includeHash: boolean;
  uppercaseHex: boolean;
  preferShortHex: boolean;
};

function clampToByte(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(255, Math.round(n)));
}

function parseRgbToken(token: string): { r: number; g: number; b: number; a?: number } | null {
  const t = token.trim();
  if (!t) return null;

  // rgb(...) or rgba(...)
  const funcMatch = t.match(/^(rgba?|RGBA?)\s*\(([^)]*)\)$/);
  if (funcMatch) {
    const args = funcMatch[2]
      .split(/[,\s]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (args.length < 3) return null;
    const [rs, gs, bs, as] = args;
    const r = clampToByte(Number(rs));
    const g = clampToByte(Number(gs));
    const b = clampToByte(Number(bs));
    if ([r, g, b].some((v) => Number.isNaN(v))) return null;
    if (as !== undefined) {
      const alpha = Math.max(0, Math.min(1, Number(as)));
      if (Number.isNaN(alpha)) return null;
      return { r, g, b, a: Math.round(alpha * 1000) / 1000 };
    }
    return { r, g, b };
  }

  // raw numbers: "r,g,b" or "r g b" or with alpha
  const raw = t.split(/[,\s]+/).map((p) => p.trim()).filter(Boolean);
  if (raw.length === 3 || raw.length === 4) {
    const r = clampToByte(Number(raw[0]));
    const g = clampToByte(Number(raw[1]));
    const b = clampToByte(Number(raw[2]));
    if ([r, g, b].some((v) => Number.isNaN(v))) return null;
    if (raw.length === 4) {
      const alpha = Math.max(0, Math.min(1, Number(raw[3])));
      if (Number.isNaN(alpha)) return null;
      return { r, g, b, a: Math.round(alpha * 1000) / 1000 };
    }
    return { r, g, b };
  }

  return null;
}

function toHexByte(n: number): string {
  return clampToByte(n).toString(16).padStart(2, "0");
}

function maybeShortHex(hex: string): string {
  // Expect #RRGGBB or #RRGGBBAA (with # optional)
  const h = hex.startsWith("#") ? hex.slice(1) : hex;
  if (h.length !== 6) return hex; // only short for RRGGBB
  const r1 = h[0], r2 = h[1], g1 = h[2], g2 = h[3], b1 = h[4], b2 = h[5];
  if (r1 === r2 && g1 === g2 && b1 === b2) {
    return "#" + r1 + g1 + b1;
  }
  return hex;
}

function convertRgbToHex(
  input: string,
  options: ConvertOptions
): string {
  if (!input.trim()) return "";

  // Tokenize while preserving parentheses groups, so rgb(255, 0, 0) stays whole
  const tokens: string[] = [];
  let current = "";
  let depth = 0;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "(") {
      depth += 1;
      current += ch;
      continue;
    }
    if (ch === ")") {
      depth = Math.max(0, depth - 1);
      current += ch;
      continue;
    }
    const isSeparator = (ch === "\n" || ch === "\r" || ch === "\t" || ch === " " || ch === ",");
    if (isSeparator && depth === 0) {
      if (current.trim()) tokens.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) tokens.push(current.trim());

  const lines: string[] = [];
  for (const token of tokens) {
    const parsed = parseRgbToken(token);
    if (!parsed) {
      lines.push(`${token} -> Invalid`);
      continue;
    }
    const { r, g, b, a } = parsed;
    const rr = toHexByte(r);
    const gg = toHexByte(g);
    const bb = toHexByte(b);
    const aa = a !== undefined ? toHexByte(Math.round(a * 255)) : null;

    let hex = `#${rr}${gg}${bb}${aa ? aa : ""}`;
    if (!options.includeHash) hex = hex.slice(1);
    if (options.preferShortHex && aa === null) {
      hex = maybeShortHex(hex);
      if (!options.includeHash && hex.startsWith("#")) hex = hex.slice(1);
    }
    if (options.uppercaseHex) hex = hex.toUpperCase();

    // Pretty input echo
    const inputEcho = a !== undefined ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
    lines.push(`${inputEcho} -> ${hex}`);
  }

  return lines.join("\n");
}

const RgbToHexConverter: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<ConvertOptions>({
    includeHash: true,
    uppercaseHex: true,
    preferShortHex: true,
  });

  const handleConvert = useCallback(() => {
    try {
      setError("");
      setOutput(convertRgbToHex(input, options));
    } catch (_e: unknown) {
      setError("Failed to convert. Please check your input.");
    }
  }, [input, options]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const canCopy = useMemo(() => Boolean(output?.length), [output]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (_) {}
  }, [output]);

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.includeHash}
                      onChange={(e) => setOptions((o) => ({ ...o, includeHash: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Prefix with #</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.uppercaseHex}
                      onChange={(e) => setOptions((o) => ({ ...o, uppercaseHex: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Uppercase HEX</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.preferShortHex}
                      onChange={(e) => setOptions((o) => ({ ...o, preferShortHex: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Prefer short HEX (#RGB)</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Input RGB/RGBA</h3>
                    <div className="relative">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="rgb(255,0,0) or 255, 0, 0 — multiple allowed via space/comma/newline"
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Converted HEX</h3>
                    {error && <div className="mb-2 text-sm text-red-400">{error}</div>}
                    <div className="relative">
                      <textarea
                        readOnly
                        value={output}
                        placeholder="Output will appear here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                      {canCopy && (
                        <button
                          type="button"
                          onClick={handleCopy}
                          title="Copy"
                          className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                            <path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z" />
                            <path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleConvert}
                    disabled={!input}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg disabled:opacity-60`}
                  >
                    Convert
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RgbToHexConverter;