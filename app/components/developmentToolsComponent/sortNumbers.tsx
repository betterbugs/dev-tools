"use client";

import React, { useMemo, useRef, useState } from "react";

type Order = "asc" | "desc";

const extractNumbers = (text: string, allowFloat: boolean, allowNegative: boolean): number[] => {
  const sign = allowNegative ? "-?" : "";
  const floatPart = allowFloat ? "(?:\\.\\d+)?" : "";
  const re = new RegExp(`${sign}\\d+${floatPart}`, "g");
  const matches = text.match(re) ?? [];
  return matches.map((m) => Number(m)).filter((n) => Number.isFinite(n));
};

const SortNumbers: React.FC = () => {
  const [input, setInput] = useState("");
  const [order, setOrder] = useState<Order>("asc");
  const [uniqueOnly, setUniqueOnly] = useState(true);
  const [allowFloat, setAllowFloat] = useState(true);
  const [allowNegative, setAllowNegative] = useState(true);
  const [delimiter, setDelimiter] = useState("\n");
  const [output, setOutput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const stats = useMemo(() => ({
    detected: extractNumbers(input, allowFloat, allowNegative).length,
  }), [input, allowFloat, allowNegative]);

  const sortNow = () => {
    let nums = extractNumbers(input, allowFloat, allowNegative);
    if (uniqueOnly) nums = Array.from(new Set(nums));
    nums.sort((a, b) => (order === "asc" ? a - b : b - a));
    setOutput(nums.join(delimiter === "\\n" ? "\n" : delimiter));
  };

  const onCopy = async () => { try { await navigator.clipboard.writeText(output); } catch {} };
  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "sorted-numbers.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const onClear = () => { setInput(""); setOutput(""); };
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
          <div className="md:w-[850px] mx-auto space-y-8">
            {/* Options */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span>Order:</span>
                <select value={order} onChange={(e) => setOrder(e.target.value as Order)} className="bg-black/90 border border-white/20 rounded px-2 py-1">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-primary" checked={uniqueOnly} onChange={(e) => setUniqueOnly(e.target.checked)} />
                Unique only
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-primary" checked={allowFloat} onChange={(e) => setAllowFloat(e.target.checked)} />
                Allow decimals
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-primary" checked={allowNegative} onChange={(e) => setAllowNegative(e.target.checked)} />
                Allow negative
              </label>
              <div className="flex items-center gap-2 text-sm">
                <span>Join with:</span>
                <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)} className="bg-black/90 border border-white/20 rounded px-2 py-1">
                  <option value="\n">New line</option>
                  <option value=", ">Comma</option>
                  <option value=" ">Space</option>
                  <option value="; ">Semicolon</option>
                </select>
              </div>
              <div className="text-sm">Detected: <span className="font-semibold">{stats.detected}</span></div>
            </div>

            {/* Input and Output Side by Side */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Text Input</label>
                  <div className="flex items-center gap-2">
                    <input type="file" accept=".txt,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
                    <button onClick={onUploadClick} className="px-4 py-2 bg-primary hover:bg-primary/70 text-black font-bold rounded-lg text-sm transition-colors">Upload</button>
                    <button onClick={() => setInput("")} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={"Paste or type numbers anywhere in text..."} className="w-full h-48 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Output */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Sorted Numbers</label>
                  <div className="flex items-center gap-2">
                    <button onClick={onCopy} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold text-sm">Copy</button>
                    <button onClick={onDownload} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold text-sm">Download</button>
                    <button onClick={onClear} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold text-sm">Clear</button>
                  </div>
                </div>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-48">{output}</pre>
              </div>
            </div>

            {/* Sort */}
            <div className="flex justify-center">
              <button onClick={sortNow} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold text-sm">Sort</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortNumbers;


