"use client";
import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type Separator = "newline" | "comma" | "space";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = LOWER.toUpperCase();
const NUMS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?/";
const AMBIGUOUS = new Set(["0", "O", "o", "1", "l", "I"]);

const RandomPasswardGenerator = () => {
  const [length, setLength] = useState<number>(12);
  const [count, setCount] = useState<number>(10);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState<boolean>(true);
  const [separator, setSeparator] = useState<Separator>("newline");
  const [output, setOutput] = useState<string>("");

  const pools = useMemo(() => {
    const used: string[] = [];
    if (useLower) used.push(LOWER);
    if (useUpper) used.push(UPPER);
    if (useNumbers) used.push(NUMS);
    if (useSymbols) used.push(SYMBOLS);
    let combined = used.join("");
    if (avoidAmbiguous) {
      combined = combined
        .split("")
        .filter((c) => !AMBIGUOUS.has(c))
        .join("");
    }
    return { used, combined: combined || LOWER };
  }, [useLower, useUpper, useNumbers, useSymbols, avoidAmbiguous]);

  const pick = (s: string) => s[Math.floor(Math.random() * s.length)];

  const buildOne = () => {
    const mustSets = pools.used
      .map((s) => (avoidAmbiguous ? s.split("").filter((c) => !AMBIGUOUS.has(c)).join("") : s))
      .filter((s) => s.length > 0);
    const result: string[] = [];
    // ensure at least one from each selected category
    for (const set of mustSets) {
      if (result.length < length) result.push(pick(set));
    }
    // fill rest
    while (result.length < length) result.push(pick(pools.combined));
    // shuffle
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result.join("");
  };

  const generate = () => {
    const n = Math.min(1000, Math.max(1, count));
    const items: string[] = [];
    for (let i = 0; i < n; i++) items.push(buildOne());
    setOutput(items.join("\n"));
  };

  const clearAll = () => setOutput("");

  const copyAll = async () => {
    if (!output) return;
    const items = output.split(/\r?\n/).filter(Boolean);
    const sep = separator === "comma" ? ", " : separator === "space" ? " " : "\n";
    const text = items.join(sep);
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {}
  };

  return (
    <section className="md:py-[30px] py-[50px]">
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Length</label>
                    <input
                      type="number"
                      min={4}
                      max={256}
                      value={length}
                      onChange={(e) => setLength(Math.min(256, Math.max(4, Number(e.target.value))))}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Count</label>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={count}
                      onChange={(e) => setCount(Math.min(1000, Math.max(1, Number(e.target.value))))}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Copy separator</label>
                    <select
                      value={separator}
                      onChange={(e) => setSeparator(e.target.value as Separator)}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    >
                      <option value="newline">New line</option>
                      <option value="comma">Comma</option>
                      <option value="space">Space</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="peer hidden" />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative"><span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span></div>
                    <span className="ml-2">Lowercase</span>
                  </label>
                  <label className="inline-flex items-center text-white/80">
                    <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="peer hidden" />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative"><span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span></div>
                    <span className="ml-2">Uppercase</span>
                  </label>
                  <label className="inline-flex items-center text-white/80">
                    <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="peer hidden" />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative"><span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span></div>
                    <span className="ml-2">Numbers</span>
                  </label>
                  <label className="inline-flex items-center text-white/80">
                    <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="peer hidden" />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative"><span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span></div>
                    <span className="ml-2">Symbols</span>
                  </label>
                </div>

                <label className="inline-flex items-center text-white/80">
                  <input type="checkbox" checked={avoidAmbiguous} onChange={(e) => setAvoidAmbiguous(e.target.checked)} className="peer hidden" />
                  <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative"><span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span></div>
                  <span className="ml-2">Avoid ambiguous characters (0/O, 1/l/I)</span>
                </label>

                <div className="flex items-center gap-4">
                  <button type="button" onClick={generate} className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}>
                    Generate
                  </button>
                  <button type="button" onClick={clearAll} className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}>
                    Clear
                  </button>
                </div>

                <div className="w-full">
                  <h3 className="text-lg font-medium mb-2">Passwords</h3>
                  <div className="relative">
                    <textarea
                      readOnly
                      value={output}
                      placeholder="Generated passwords will appear here..."
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[180px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                    ></textarea>
                    {output && (
                      <button type="button" onClick={copyAll} title="Copy" className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white"><path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z"/><path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z"/></svg>
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

export default RandomPasswardGenerator
