"use client";

import React, { useMemo, useRef, useState } from "react";

type Format = "raw" | "digits" | "+intl";
type Mode = "phone" | "number";

const extractPhones = (text: string): string[] => {
  // Matches common phone patterns with optional country code, separators, extensions
  const regex = /(?:\+\d{1,3}[\s-.]?)?(?:\(\d{2,4}\)|\d{2,4})[\s-.]?\d{2,4}[\s-.]?\d{2,4}(?:[\s-.]?\d{2,4})?(?:\s*(?:x|ext)\.?\s*\d{1,5})?/gi;
  const matches = text.match(regex) || [];
  return matches.map((m) => m.trim());
};

const normalize = (value: string, format: Format): string => {
  const digits = value.replace(/[^\d+]/g, "");
  if (format === "raw") return value.trim();
  if (format === "digits") return digits.replace(/\D/g, "");
  // intl: ensure leading + if present in original, else return digits as-is
  if (digits.startsWith("+")) return digits;
  return digits;
};

const extractNumbersOnly = (text: string): string[] => {
  const matches = text.match(/\d{2,}/g) || [];
  return matches.map((m) => m.trim());
};

const PhoneNumberExtractor: React.FC = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("phone");
  const [format, setFormat] = useState<Format>("raw");
  const [uniqueOnly, setUniqueOnly] = useState(true);
  const [output, setOutput] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const count = useMemo(() => output.length, [output]);

  const onExtract = () => {
    const base = mode === "phone" ? extractPhones(input) : extractNumbersOnly(input);
    const found = mode === "phone" ? base.map((p) => normalize(p, format)) : base;
    const list = uniqueOnly ? Array.from(new Set(found)) : found;
    setOutput(list.filter((v) => v.length > 0));
  };

  const onCopy = async () => { try { await navigator.clipboard.writeText(output.join("\n")); } catch {} };
  const onDownload = () => {
    const blob = new Blob([output.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "phone-numbers.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const onClear = () => { setInput(""); setOutput([]); };
  const onUploadClick = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  const onSample = () => {
    setInput("Contact us at (415) 555-2671, +1-212-555-0198 or 020 7946 0958 ext.123. Backup: 91-98765-43210.");
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            {/* Enter Any String */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">Enter Any String</label>
                <div className="flex items-center gap-2">
                  <input type="file" accept=".txt,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
                  <button onClick={onUploadClick} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Upload</button>
                  <button onClick={onSample} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Add Sample</button>
                  <button onClick={() => setInput("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                </div>
              </div>
              <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={"Paste text containing phone numbers..."} className="w-full h-48 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
            </div>

            {/* Filter */}
            <div className="space-y-3">
              <div className="font-medium">Filter</div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <label className="flex items-center gap-2"><input type="radio" name="mode" checked={mode === "number"} onChange={() => setMode("number")} /> Number</label>
                  <label className="flex items-center gap-2"><input type="radio" name="mode" checked={mode === "phone"} onChange={() => setMode("phone")} /> Phone Number</label>
                </div>
                {mode === "phone" && (
                  <div className="flex items-center gap-2 text-sm">
                    <span>Format:</span>
                    <select value={format} onChange={(e) => setFormat(e.target.value as Format)} className="bg-black/90 border border-white/20 rounded px-2 py-1">
                      <option value="raw">Raw</option>
                      <option value="digits">Digits only</option>
                      <option value="+intl">International (+...)</option>
                    </select>
                  </div>
                )}
                <label className="flex items-center gap-2 text-sm md:ml-2">
                  <input type="checkbox" className="accent-primary" checked={uniqueOnly} onChange={(e) => setUniqueOnly(e.target.checked)} />
                  Unique only
                </label>
                <div className="text-sm">Count: <span className="font-semibold">{count}</span></div>
                <div className="flex items-center gap-2 text-sm md:col-span-4">
                  <button onClick={onExtract} className="px-5 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Extract</button>
                  <button onClick={onDownload} className="px-5 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Download</button>
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="space-y-3">
              <label className="font-medium">Output</label>
              <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-56">{output.join("\n")}</pre>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={onCopy} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold text-sm">Copy</button>
              <button onClick={onDownload} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold text-sm">Download</button>
              <button onClick={onClear} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold text-sm">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberExtractor;


