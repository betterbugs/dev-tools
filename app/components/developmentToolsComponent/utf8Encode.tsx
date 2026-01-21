"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type OutputMode = "percent" | "hex" | "base64" | "unicode";

interface Options {
  mode: OutputMode;
  hexUppercase: boolean;
  hexSeparator: string; // e.g. space
}

function encodeUtf8(input: string, mode: OutputMode, hexUpper: boolean, hexSep: string): string {
  const encoder = new TextEncoder();
  const bytes:any = encoder.encode(input);

  switch (mode) {
    case "percent": {
      let out = "";
      for (const b of bytes) out += `%${b.toString(16).toUpperCase().padStart(2, "0")}`;
      return out;
    }
    case "hex": {
      const parts: string[] = [];
      for (const b of bytes) parts.push((hexUpper ? b.toString(16).toUpperCase() : b.toString(16)).padStart(2, "0"));
      return parts.join(hexSep);
    }
    case "base64": {
      let bin = "";
      for (const b of bytes) bin += String.fromCharCode(b);
      return btoa(bin);
    }
    case "unicode": {
      // \uXXXX escapes (BMP only)
      let out = "";
      for (const ch of input) {
        const code = ch.codePointAt(0)!;
        if (code <= 0xFFFF) out += `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
        else {
          const cp = code - 0x10000;
          const hi = 0xD800 + (cp >> 10);
          const lo = 0xDC00 + (cp & 0x3FF);
          out += `\\u${hi.toString(16).toUpperCase().padStart(4, "0")}\\u${lo.toString(16).toUpperCase().padStart(4, "0")}`;
        }
      }
      return out;
    }
  }
}

const Utf8Encode: React.FC = () => {
  const [input, setInput] = useState<string>("Hello ✓ ☃");
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<Options>({ mode: "percent", hexUppercase: true, hexSeparator: " " });

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => setOutput(encodeUtf8(input, options.mode, options.hexUppercase, options.hexSeparator)), [input, options]);
  useEffect(() => { if (autoUpdate) convert(); }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "utf8-encoded.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  }, [output]);
  const onClear = useCallback(() => { setInput(""); setOutput(""); }, []);
  const onUploadClick = useCallback(() => fileRef.current?.click(), []);
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
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                  Auto-update
                </label>
                <button onClick={convert} className="bg-primary text-black font-semibold border border-black/30 px-3 py-1 rounded text-xs sm:text-sm">Encode</button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onCopy} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Copy</button>
                <button onClick={onDownload} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Download</button>
                <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:mt-2">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Input (UTF-8 text)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type text here..." className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output</span>
                </div>
                <textarea value={output} readOnly className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20" />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <span>Mode:</span>
                  <select value={options.mode} onChange={(e) => setOptions(v => ({ ...v, mode: e.target.value as OutputMode }))} className="bg-black border border-white/20 rounded px-2 py-1 text-sm">
                    <option value="percent">Percent-encoded</option>
                    <option value="hex">Hex bytes</option>
                    <option value="base64">Base64</option>
                    <option value="unicode">Unicode escapes (\\uXXXX)</option>
                  </select>
                </div>
                {options.mode === "hex" && (
                  <>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="accent-primary" checked={options.hexUppercase} onChange={(e) => setOptions(v => ({ ...v, hexUppercase: e.target.checked }))} />
                      Uppercase
                    </label>
                    <div className="flex items-center gap-2 text-sm">
                      <span>Separator:</span>
                      <input value={options.hexSeparator} onChange={(e) => setOptions(v => ({ ...v, hexSeparator: e.target.value }))} className="bg-black border border-white/20 rounded px-2 py-1 w-16 text-sm" />
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Utf8Encode;


