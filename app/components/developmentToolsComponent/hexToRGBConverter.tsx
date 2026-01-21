"use client";
import React, { useCallback, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type ConvertOptions = {
  outputCssFunction: boolean; // rgb()/rgba() vs raw numbers
  uppercaseHex: boolean;
};

function parseHex(hex: string): { r: number; g: number; b: number; a?: number } | null {
  let h = hex.trim();
  if (h.startsWith("#")) h = h.slice(1);
  if (![3, 4, 6, 8].includes(h.length)) return null;

  const expand = (s: string) => s.split("").map((c) => c + c).join("");
  if (h.length === 3 || h.length === 4) h = expand(h);

  const hasAlpha = h.length === 8;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
  if (hasAlpha) {
    const aHex = h.slice(6, 8);
    const a = Math.round((parseInt(aHex, 16) / 255) * 1000) / 1000; // 3 decimals
    if (Number.isNaN(a)) return null;
    return { r, g, b, a };
  }
  return { r, g, b };
}

function convertInputToOutput(input: string, options: ConvertOptions): string {
  if (!input.trim()) return "";
  const tokens = input
    .split(/[,\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const lines: string[] = [];
  for (const token of tokens) {
    const parsed = parseHex(token);
    if (!parsed) {
      lines.push(`${token} -> Invalid`);
      continue;
    }
    const { r, g, b, a } = parsed;
    const css = a !== undefined ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
    const raw = a !== undefined ? `${r}, ${g}, ${b}, ${a}` : `${r}, ${g}, ${b}`;
    const normHex = options.uppercaseHex ? token.toUpperCase() : token.toLowerCase();
    lines.push(`${normHex} -> ${options.outputCssFunction ? css : raw}`);
  }
  return lines.join("\n");
}

const HexToRGBConverter: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<ConvertOptions>({
    outputCssFunction: true,
    uppercaseHex: true,
  });

  const handleConvert = useCallback(() => {
    try {
      setError("");
      setOutput(convertInputToOutput(input, options));
    } catch (e: unknown) {
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.outputCssFunction}
                      onChange={(e) => setOptions((o) => ({ ...o, outputCssFunction: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Use css rgb()/rgba() output</span>
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
                    <span className="ml-2">Uppercase HEX in mapping</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Input HEX</h3>
                    <div className="relative">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="#FFAA00 or #FA0, multiple separated by space/comma/newline"
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Converted RGB</h3>
                    {error && <div className="mb-2 text-sm text-red-400">{error}</div>}
                    <div className="relative">
                      <textarea
                        readOnly
                        value={output}
                        placeholder="Output will appear here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                      {output && (
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

export default HexToRGBConverter;
