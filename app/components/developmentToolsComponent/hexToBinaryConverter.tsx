"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

function parseHex(input: string): string | null {
  const clean = input.replace(/\s+/g, "").replace(/^0x/i, "");
  if (!clean) return "";
  if (!/^[0-9a-fA-F]+$/.test(clean)) return null;
  return clean.toLowerCase();
}

function hexToBinaryString(hex: string): string {
  let out = "";
  for (const ch of hex) {
    const n = parseInt(ch, 16);
    out += n.toString(2).padStart(4, "0");
  }
  return out;
}

const HexToBinaryConverter: React.FC = () => {
  const [input, setInput] = useState<string>("AF 12");
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [groupSize, setGroupSize] = useState<4 | 8>(4);

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => {
    const clean = parseHex(input);
    if (clean === null) { setError("Invalid hex (0-9, A-F)"); setOutput(""); return; }
    setError("");
    const bin = hexToBinaryString(clean);
    const grouped = bin.replace(new RegExp(`(.{${groupSize}})`, "g"), "$1 ").trim();
    setOutput(grouped);
  }, [input, groupSize]);

  useEffect(() => { if (autoUpdate) convert(); }, [input, groupSize, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "hex-to-binary.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  }, [output]);
  const onClear = useCallback(() => { setInput(""); setOutput(""); setError(""); }, []);
  const onUploadClick = useCallback(() => fileRef.current?.click(), []);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  const hint = useMemo(() => (error ? error : "Enter hex, spaces allowed. 0x prefix optional."), [error]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                  Auto-update
                </label>
                <button onClick={convert} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Convert</button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onCopy} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Copy</button>
                <button onClick={onDownload} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Download</button>
                <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Input (Hexadecimal)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. AF12 or AF 12" className="w-full h-44 bg-black rounded p-3 font-mono text-sm border border-white/20" />
                <div className={`text-xs mt-2 ${error ? "text-red-400" : "text-white/60"}`}>{hint}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (Binary)</span>
                </div>
                <textarea value={output} readOnly className="w-full h-44 bg-black rounded p-3 font-mono text-sm border border-white/20" />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="flex items-center gap-2 text-sm md:mt-2">
                <span>Group:</span>
                <select value={groupSize} onChange={(e) => setGroupSize(Number(e.target.value) as 4 | 8)} className="bg-black border border-white/20 rounded px-2 py-1">
                  <option value={4}>4</option>
                  <option value={8}>8</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HexToBinaryConverter;


