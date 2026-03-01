"use client";

import React, { useRef, useState } from "react";

// Flatten nested objects: {user: {name: "Alice"}} => {"user.name": "Alice"}
const flattenObject = (obj: any, prefix = ""): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, fullKey));
    } else {
      result[fullKey] = value;
    }
  }
  return result;
};

// Escape CSV field if needed
const escapeCsvField = (value: any, delimiter: string): string => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  // Escape if contains delimiter, quotes, or newlines
  if (str.includes(delimiter) || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

// Convert JSON array to CSV
const jsonToCsv = (
  data: any[],
  opts: { delimiter: string; includeHeader: boolean; flatten: boolean }
): string => {
  if (!Array.isArray(data) || data.length === 0) return "";

  // Flatten if needed
  const rows = opts.flatten ? data.map((item) => flattenObject(item)) : data;

  // Extract all unique keys
  const allKeys = new Set<string>();
  rows.forEach((row) => {
    if (typeof row === "object" && row !== null) {
      Object.keys(row).forEach((k) => allKeys.add(k));
    }
  });
  const headers = Array.from(allKeys);

  const lines: string[] = [];

  // Add header row
  if (opts.includeHeader) {
    lines.push(headers.map((h) => escapeCsvField(h, opts.delimiter)).join(opts.delimiter));
  }

  // Add data rows
  rows.forEach((row) => {
    if (typeof row !== "object" || row === null) {
      lines.push(escapeCsvField(row, opts.delimiter));
    } else {
      const values = headers.map((h) => escapeCsvField(row[h], opts.delimiter));
      lines.push(values.join(opts.delimiter));
    }
  });

  return lines.join("\n");
};

const JsonToCsvConverter: React.FC = () => {
  const [json, setJson] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [includeHeader, setIncludeHeader] = useState(true);
  const [flatten, setFlatten] = useState(true);
  const [csvOut, setCsvOut] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const onConvert = () => {
    setError("");
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) {
        setError("JSON must be an array of objects");
        setCsvOut("");
        return;
      }
      const csv = jsonToCsv(parsed, { delimiter, includeHeader, flatten });
      setCsvOut(csv);
    } catch (err) {
      setError("Invalid JSON format");
      setCsvOut("");
    }
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(csvOut);
    } catch {}
  };

  const onDownload = () => {
    const blob = new Blob([csvOut], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onClear = () => {
    setJson("");
    setCsvOut("");
    setError("");
  };

  const onUploadClick = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    
    // Check file size (5MB limit)
    if (f.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit");
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setJson(String(ev.target?.result ?? ""));
      setError("");
    };
    reader.readAsText(f);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            {/* Options */}
            <div className="grid sm:grid-cols-[220px_minmax(0,1fr)] gap-3 items-start">
              <div className="space-y-2">
                <label className="text-sm font-medium">Delimiter</label>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="w-full sm:w-44 px-3 py-1.5 bg-black/20 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value=",">Comma (,)</option>
                  <option value=";">Semicolon (;)</option>
                </select>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:mt-7">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={includeHeader}
                    onChange={(e) => setIncludeHeader(e.target.checked)}
                  />
                  Include Header
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={flatten}
                    onChange={(e) => setFlatten(e.target.checked)}
                  />
                  Flatten Nested Objects
                </label>
              </div>
            </div>

            {/* Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">JSON Input</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept=".json,application/json,text/plain"
                    ref={fileRef}
                    onChange={onFileChange}
                    className="hidden"
                  />
                  <button
                    onClick={onUploadClick}
                    className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors"
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setJson("")}
                    className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <textarea
                value={json}
                onChange={(e) => setJson(e.target.value)}
                placeholder='[{"name":"Alice","age":30},{"name":"Bob","age":25}]'
                className="w-full h-48 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
              />
              {error && <p className="text-red text-sm">{error}</p>}
            </div>

            {/* Convert */}
            <div className="flex justify-center">
              <button
                onClick={onConvert}
                className="px-5 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold"
              >
                Convert
              </button>
            </div>

            {/* Output */}
            <div className="space-y-3">
              <label className="font-medium">CSV Output</label>
              <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-56 whitespace-pre">
                {csvOut}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={onCopy}
                disabled={!csvOut}
                className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Copy
              </button>
              <button
                onClick={onDownload}
                disabled={!csvOut}
                className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download
              </button>
              <button
                onClick={onClear}
                className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonToCsvConverter;
