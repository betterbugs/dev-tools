"use client";

import React, { useRef, useState } from "react";

const detectDelimiter = (text: string): string => {
  const candidates = [",", ";", "\t", "|", ":"]; // common delimiters
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0).slice(0, 5);
  let best: { delim: string; score: number } = { delim: ",", score: -1 };
  for (const d of candidates) {
    let variance = 0;
    const counts = lines.map((l) => l.split(d).length);
    if (counts.length === 0) continue;
    const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
    variance = counts.reduce((a, b) => a + Math.abs(b - mean), 0);
    const score = -variance; // lower variance better
    if (score > best.score) best = { delim: d, score };
  }
  return best.delim;
};

const parseCSV = (
  text: string,
  opts: { delimiter: string; hasHeader: boolean; trim: boolean; ignoreEmpty: boolean }
) => {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i++; continue; }
      if (ch === '"') { inQuotes = false; continue; }
      field += ch;
      continue;
    }
    if (ch === '"') { inQuotes = true; continue; }
    if (ch === opts.delimiter) { current.push(opts.trim ? field.trim() : field); field = ""; continue; }
    if (ch === "\n") {
      current.push(opts.trim ? field.trim() : field);
      if (!(opts.ignoreEmpty && current.every((c) => c === ""))) rows.push(current);
      current = []; field = "";
      continue;
    }
    if (ch === "\r") continue;
    field += ch;
  }
  if (field.length > 0 || current.length > 0) {
    current.push(opts.trim ? field.trim() : field);
    if (!(opts.ignoreEmpty && current.every((c) => c === ""))) rows.push(current);
  }

  if (rows.length === 0) return [] as any[];
  if (opts.hasHeader) {
    const header = rows[0];
    return rows.slice(1).map((r) => {
      const obj: Record<string, any> = {};
      for (let i = 0; i < header.length; i++) obj[header[i] ?? `col_${i + 1}`] = r[i] ?? "";
      return obj;
    });
  }
  return rows;
};

const CSVToJSON = () => {
  const [csv, setCsv] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  const [trim, setTrim] = useState(true);
  const [ignoreEmpty, setIgnoreEmpty] = useState(true);
  const [jsonOut, setJsonOut] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const onConvert = () => {
    const delimiter = detectDelimiter(csv);
    const data = parseCSV(csv, { delimiter, hasHeader, trim, ignoreEmpty });
    try {
      setJsonOut(JSON.stringify(data, null, 2));
    } catch {
      setJsonOut("[]");
    }
  };

  const onCopy = async () => { try { await navigator.clipboard.writeText(jsonOut); } catch {} };
  const onDownload = () => {
    const blob = new Blob([jsonOut], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "data.json"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const onClear = () => { setCsv(""); setJsonOut(""); };
  const onUploadClick = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCsv(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            {/* Options */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-primary" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
                First row as header
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-primary" checked={trim} onChange={(e) => setTrim(e.target.checked)} />
                Trim fields
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-primary" checked={ignoreEmpty} onChange={(e) => setIgnoreEmpty(e.target.checked)} />
                Ignore empty lines
              </label>
            </div>

            {/* Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">CSV Input</label>
                <div className="flex items-center gap-2">
                  <input type="file" accept=".csv,text/csv,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
                  <button onClick={onUploadClick} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Upload</button>
                  <button onClick={() => setCsv("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                </div>
              </div>
              <textarea value={csv} onChange={(e) => setCsv(e.target.value)} placeholder="name,age\nAlice,30\nBob,25" className="w-full h-48 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
            </div>

            {/* Convert */}
            <div className="flex justify-center">
              <button onClick={onConvert} className="px-5 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Convert</button>
            </div>

            {/* Output */}
            <div className="space-y-3">
              <label className="font-medium">JSON Output</label>
              <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-56">{jsonOut}</pre>
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

export default CSVToJSON