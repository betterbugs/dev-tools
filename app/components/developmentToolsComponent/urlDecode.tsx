"use client";

import React, { useMemo, useState } from "react";

const safeDecode = (value: string, plusAsSpace: boolean) => {
  try {
    const replaced = plusAsSpace ? value.replace(/\+/g, " ") : value;
    return decodeURIComponent(replaced);
  } catch {
    return "";
  }
};

const URLDecode = () => {
  const [input, setInput] = useState("");
  const [plusAsSpace, setPlusAsSpace] = useState(true);
  const [decodeRepeatedly, setDecodeRepeatedly] = useState(false);

  const output = useMemo(() => {
    if (!decodeRepeatedly) return safeDecode(input, plusAsSpace);
    let current = input;
    for (let i = 0; i < 5; i++) {
      const next = safeDecode(current, plusAsSpace);
      if (!next || next === current) break;
      current = next;
    }
    return current;
  }, [input, plusAsSpace, decodeRepeatedly]);

  const copy = () => navigator.clipboard.writeText(output);
  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "decoded.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const clearAll = () => { setInput(""); setPlusAsSpace(true); setDecodeRepeatedly(false); };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            {/* Options */}
            <div className="">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <input id="plusSpace" type="checkbox" className="accent-primary" checked={plusAsSpace} onChange={(e) => setPlusAsSpace(e.target.checked)} />
                  <label htmlFor="plusSpace" className="text-sm">Treat + as space</label>
                </div>
                <div className="flex items-center gap-2">
                  <input id="multi" type="checkbox" className="accent-primary" checked={decodeRepeatedly} onChange={(e) => setDecodeRepeatedly(e.target.checked)} />
                  <label htmlFor="multi" className="text-sm">Decode repeatedly</label>
                </div>
              </div>
            </div>

            {/* Side-by-side panels */}
            <div className="border-t border-white/10 pt-6 grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">URL Encoded Text</h2>
                  <button onClick={() => setInput("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste URL-encoded text here..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Decoded Output</h2>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">{output}</pre>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-center gap-3">
                <button onClick={copy} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Copy</button>
                <button onClick={download} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Download</button>
                <button onClick={clearAll} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold">Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLDecode