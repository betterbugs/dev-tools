"use client";

import React, { useState } from "react";

// Decode basic named entities and numeric (decimal/hex) references
const decodeEntities = (input: string) => {
  // Handle numeric entities
  const numericDecoded = input.replace(/&#(x?[0-9A-Fa-f]+);/g, (_, hexOrDec: string) => {
    try {
      const codePoint = hexOrDec.startsWith("x") || hexOrDec.startsWith("X")
        ? parseInt(hexOrDec.slice(1), 16)
        : parseInt(hexOrDec, 10);
      if (!Number.isFinite(codePoint)) return _;
      return String.fromCodePoint(codePoint);
    } catch {
      return _;
    }
  });

  // Map of common named entities
  const map: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
  };

  return numericDecoded.replace(/&(amp|lt|gt|quot|nbsp);|&#39;/g, (m) => map[m] ?? m);
};

const HtmlEntitiesToTextConverter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const onConvert = () => setOutput(decodeEntities(input));
  const onCopy = async () => { try { await navigator.clipboard.writeText(output); } catch {} };
  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "decoded-text.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const onClear = () => { setInput(""); setOutput(""); };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-6">
            {/* Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">Input (HTML Entities)</label>
                <button onClick={() => setInput("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
              </div>
              <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text with HTML entities..." className="w-full h-48 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
            </div>

            {/* Convert button */}
            <div className="flex justify-center">
              <button onClick={onConvert} className="px-5 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Convert</button>
            </div>

            {/* Output */}
            <div className="space-y-3">
              <label className="font-medium">Output (Plain Text)</label>
              <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-48">{output}</pre>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={onCopy} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Copy</button>
              <button onClick={onDownload} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Download</button>
              <button onClick={onClear} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlEntitiesToTextConverter