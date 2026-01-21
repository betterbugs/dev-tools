"use client";

import React, { useEffect, useRef, useState } from "react";

type Mode = "lines" | "words" | "regex";

const csvEscape = (v: string): string => {
  if (/[",\n\r]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
  return v;
};

const toCsv = (
  text: string,
  mode: Mode,
  columnDelimiter: string,
  regexPattern: string,
  columnsPerRow: number,
  trimFields: boolean
): string => {
  const fields: string[] = [];
  if (mode === "lines") {
    const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
    lines.forEach((l) => fields.push(l));
  } else if (mode === "words") {
    const words = text.match(/[^\s]+/g) || [];
    words.forEach((w) => fields.push(w));
  } else if (mode === "regex") {
    try {
      const re = new RegExp(regexPattern, "g");
      const matches = text.match(re) || [];
      matches.forEach((m) => fields.push(m));
    } catch {
      return `Error: Invalid regex pattern`;
    }
  }

  const rows: string[] = [];
  for (let i = 0; i < fields.length; i += columnsPerRow) {
    const row = fields.slice(i, i + columnsPerRow).map((f) => {
      const value = trimFields ? f.trim() : f;
      return csvEscape(value);
    });
    rows.push(row.join(columnDelimiter));
  }
  return rows.join("\n");
};

const TextToCsv: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [mode, setMode] = useState<Mode>("lines");
  const [columnDelimiter, setColumnDelimiter] = useState(",");
  const [regexPattern, setRegexPattern] = useState("\\S+");
  const [columnsPerRow, setColumnsPerRow] = useState(3);
  const [trimFields, setTrimFields] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const convert = () => {
    const csv = toCsv(
      input,
      mode,
      columnDelimiter,
      regexPattern,
      Math.max(1, columnsPerRow),
      trimFields
    );
    setOutput(csv);
  };

  useEffect(() => {
    if (autoUpdate) convert();
  }, [input, autoUpdate, mode, columnDelimiter, regexPattern, columnsPerRow, trimFields]);

  const onCopy = async () => { try { await navigator.clipboard.writeText(output); } catch {} };
  const onDownload = () => {
    const blob = new Blob([output], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "converted.csv"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
          <div className="md:w-[950px] mx-auto space-y-6">
            {/* Options */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                Auto Update
              </label>
              <div className="flex items-center gap-2">
                <span>Mode:</span>
                <select value={mode} onChange={(e) => setMode(e.target.value as Mode)} className="bg-black/40 border border-white/20 rounded px-2 py-1">
                  <option value="lines">Split by lines</option>
                  <option value="words">Split by words</option>
                  <option value="regex">Regex capture</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span>Columns per row:</span>
                <input type="number" value={columnsPerRow} onChange={(e) => setColumnsPerRow(Number(e.target.value))} className="w-24 bg-black/20 border border-white/20 rounded px-2 py-1" />
              </div>
              <div className="flex items-center gap-2">
                <span>Column delimiter:</span>
                <input value={columnDelimiter} onChange={(e) => setColumnDelimiter(e.target.value)} className="w-24 bg-black/20 border border-white/20 rounded px-2 py-1" />
              </div>
              {mode === "regex" && (
                <div className="flex items-center gap-2">
                  <span>Regex:</span>
                  <input value={regexPattern} onChange={(e) => setRegexPattern(e.target.value)} className="w-40 bg-black/20 border border-white/20 rounded px-2 py-1" />
                </div>
              )}
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={trimFields} onChange={(e) => setTrimFields(e.target.checked)} />
                Trim fields
              </label>
              <div className="ml-auto flex items-center gap-2">
                <input type="file" accept=".txt,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input (Text)</label>
                  <button onClick={convert} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Convert</button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={`apple\nbanana\ncherry`} className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Right: Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Output (CSV)</label>
                  <div className="flex items-center gap-2">
                    <button onClick={onCopy} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Copy</button>
                    <button onClick={onUploadClick} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Upload</button>
                    <button onClick={onDownload} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Download</button>
                    <button onClick={onClear} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">{output}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToCsv;


