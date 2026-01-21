"use client";

import React, { useEffect, useRef, useState } from "react";

type Direction = "CtoF" | "FtoC";

function formatNumber(n: number, decimals: number, thousands: boolean): string {
  const fixed = n.toFixed(Math.max(0, Math.min(10, decimals)));
  if (!thousands) return fixed;
  const [intPart, fracPart] = fixed.split(".");
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fracPart !== undefined ? `${withSep}.${fracPart}` : withSep;
}

function convertOne(value: number, dir: Direction): number {
  return dir === "CtoF" ? value * 9 / 5 + 32 : (value - 32) * 5 / 9;
}

function convertNumbersInText(
  text: string,
  dir: Direction,
  decimals: number,
  thousands: boolean
): string {
  // Match integers or floats, optional sign, optional thousands commas
  const re = /[-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?|[-+]?\d+(?:\.\d+)?/g;
  return text.replace(re, (m) => {
    const num = Number(m.replace(/,/g, ""));
    if (!isFinite(num)) return m;
    const converted = convertOne(num, dir);
    return formatNumber(converted, decimals, thousands);
  });
}

const CelsiusFahrenheitConverter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoConvert, setAutoConvert] = useState(false);
  const [direction, setDirection] = useState<Direction>("CtoF");
  const [decimals, setDecimals] = useState(2);
  const [thousandsSep, setThousandsSep] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoConvert) return;
    const converted = convertNumbersInText(input, direction, decimals, thousandsSep);
    setOutput(converted);
  }, [input, autoConvert, direction, decimals, thousandsSep]);

  const onConvert = () => {
    const converted = convertNumbersInText(input, direction, decimals, thousandsSep);
    setOutput(converted);
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {}
  };

  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = direction === "CtoF" ? "celsius-to-fahrenheit.txt" : "fahrenheit-to-celsius.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onClear = () => {
    setInput("");
    setOutput("");
  };

  const onUploadClick = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[950px] mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={autoConvert}
                  onChange={(e) => setAutoConvert(e.target.checked)}
                />
                Auto Update
              </label>

              <div className="flex items-center gap-2">
                <span>Direction:</span>
                <select
                  className="bg-black/90 border border-white/20 rounded px-2 py-1"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as Direction)}
                >
                  <option value="CtoF">Celsius → Fahrenheit</option>
                  <option value="FtoC">Fahrenheit → Celsius</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span>Decimals:</span>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={decimals}
                  onChange={(e) => setDecimals(Math.max(0, Math.min(10, Number(e.target.value) || 0)))}
                  className="w-20 bg-black/20 border border-white/20 rounded px-2 py-1"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={thousandsSep}
                  onChange={(e) => setThousandsSep(e.target.checked)}
                />
                Thousands Separator
              </label>

              <div className="ml-auto flex items-center gap-2">
                <input
                  type="file"
                  accept=".txt,text/plain"
                  ref={fileRef}
                  onChange={onFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input</label>
                  <button
                    onClick={onConvert}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Convert
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    direction === "CtoF"
                      ? "Type numbers in °C (e.g., 0, 37, -10.5). All numbers will be converted to °F."
                      : "Type numbers in °F (e.g., 32, 98.6, 14). All numbers will be converted to °C."
                  }
                  className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-start justify-between md:gap-0 gap-4">
                  <label className="font-medium">Output</label>
                  <div className="flex flex-wrap items-center gap-2 md:justify-end justify-start">
                    <button
                      onClick={onCopy}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Copy
                    </button>
                    <button
                      onClick={onUploadClick}
                      className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors"
                    >
                      Upload
                    </button>
                    <button
                      onClick={onDownload}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Download
                    </button>
                    <button
                      onClick={onClear}
                      className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelsiusFahrenheitConverter;


