"use client";
import React, { useCallback, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type ConvertOptions = {
  showMapping: boolean; // show "input -> output" instead of raw numbers
};

function sanitizeGray(input: string): string {
  return input.replace(/[^01]/g, "");
}

function isValidGrayString(s: string): boolean {
  return /^[01]+$/.test(s);
}

function grayToDecimal(gray: string): number {
  // Convert Gray code string (e.g., "1011") to decimal
  // Algorithm: binary[0] = gray[0]; binary[i] = binary[i-1] XOR gray[i]
  if (!isValidGrayString(gray)) return NaN;
  let lastBit = Number(gray[0]);
  let binary = String(lastBit);
  for (let i = 1; i < gray.length; i++) {
    const g = Number(gray[i]);
    lastBit = lastBit ^ g;
    binary += String(lastBit);
  }
  return parseInt(binary, 2);
}

function convertInputToOutput(input: string, options: ConvertOptions): { text: string; hasInvalid: boolean } {
  if (!input.trim()) return { text: "", hasInvalid: false };

  // Tokenize by newlines and separators (spaces/commas). Keep contiguous gray strings intact.
  const tokens = input
    .split(/[\n\r]+/)
    .flatMap((line) =>
      line
        .split(/(?:\s*,\s*|\s+)/)
        .map((t) => t.trim())
        .filter(Boolean)
    );

  const lines: string[] = [];
  let hasInvalid = false;
  for (const token of tokens) {
    const clean = sanitizeGray(token);
    if (!clean || !isValidGrayString(clean)) {
      lines.push(`${token} -> Invalid`);
      hasInvalid = true;
      continue;
    }
    const dec = grayToDecimal(clean);
    if (Number.isNaN(dec)) {
      lines.push(`${token} -> Invalid`);
      hasInvalid = true;
      continue;
    }
    if (options.showMapping) {
      lines.push(`${token} -> ${dec}`);
    } else {
      lines.push(String(dec));
    }
  }

  return { text: lines.join("\n"), hasInvalid };
}

const GreyCodeToDecimal: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<ConvertOptions>({ showMapping: true });

  const handleConvert = useCallback(() => {
    setError("{}");
    try {
      const { text, hasInvalid } = convertInputToOutput(input, options);
      setOutput(text);
      if (hasInvalid) {
        setError("Some inputs were invalid Gray code. They are marked as Invalid.");
      } else {
        setError("");
      }
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={options.showMapping}
                      onChange={(e) => setOptions((o) => ({ ...o, showMapping: e.target.checked }))}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Show mapping (input ➜ decimal)</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Input Gray Code</h3>
                    <div className="relative">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., 101, 1111, 0101 — multiple allowed via space/comma/newline"
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Converted Decimal</h3>
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

export default GreyCodeToDecimal;
