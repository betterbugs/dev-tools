"use client";

import React, { useMemo, useState } from "react";

const encodeSafe = (value: string, spaceAsPlus: boolean) => {
  const encoded = encodeURIComponent(value);
  return spaceAsPlus ? encoded.replace(/%20/g, "+") : encoded;
};

const URLEncode = () => {
  const [input, setInput] = useState("");
  const [spaceAsPlus, setSpaceAsPlus] = useState(false);

  const output = useMemo(() => encodeSafe(input, spaceAsPlus), [input, spaceAsPlus]);

  const copy = () => navigator.clipboard.writeText(output);
  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "encoded.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const clearAll = () => { setInput(""); setSpaceAsPlus(false); };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            {/* Options */}
            <div className="">
              <div className="flex items-center gap-2">
                <input id="spacePlus" type="checkbox" className="accent-primary" checked={spaceAsPlus} onChange={(e) => setSpaceAsPlus(e.target.checked)} />
                <label htmlFor="spacePlus" className="text-sm">Use + for spaces</label>
              </div>
            </div>

            {/* Side-by-side panels */}
            <div className="border-t border-white/10 pt-6 grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Plain Text</h2>
                  <button onClick={() => setInput("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text here..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">URL Encoded Output</h2>
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

export default URLEncode