"use client";

import React, { useEffect, useRef, useState } from "react";
import CopyButton from "../ui/CopyButton";

type Mode = "json-lines" | "keys" | "values" | "key=value" | "path=value";

const flattenJson = (
  data: any,
  prefix = ""
): Array<{ path: string; value: any }> => {
  const rows: Array<{ path: string; value: any }> = [];
  const isObject = (v: any) => v && typeof v === "object" && !Array.isArray(v);
  if (Array.isArray(data)) {
    data.forEach((v, i) => {
      const p = prefix ? `${prefix}[${i}]` : `[${i}]`;
      if (isObject(v) || Array.isArray(v)) rows.push(...flattenJson(v, p));
      else rows.push({ path: p, value: v });
    });
  } else if (isObject(data)) {
    Object.keys(data).forEach((k) => {
      const p = prefix ? `${prefix}.${k}` : k;
      const v = (data as any)[k];
      if (isObject(v) || Array.isArray(v)) rows.push(...flattenJson(v, p));
      else rows.push({ path: p, value: v });
    });
  } else {
    rows.push({ path: prefix || "", value: data });
  }
  return rows;
};

const toText = (data: any, mode: Mode, pretty: boolean): string => {
  try {
    const parsed = typeof data === "string" ? JSON.parse(data) : data;
    switch (mode) {
      case "json-lines": {
        if (Array.isArray(parsed)) {
          return parsed.map((x) => JSON.stringify(x)).join("\n");
        }
        return JSON.stringify(parsed, null, pretty ? 2 : undefined);
      }
      case "keys": {
        const rows = flattenJson(parsed);
        return rows.map((r) => r.path).join("\n");
      }
      case "values": {
        const rows = flattenJson(parsed);
        return rows.map((r) => String(r.value)).join("\n");
      }
      case "key=value": {
        const rows = flattenJson(parsed);
        return rows.map((r) => `${r.path}=${r.value}`).join("\n");
      }
      case "path=value": {
        const rows = flattenJson(parsed);
        return rows
          .map((r) => `${r.path}: ${JSON.stringify(r.value)}`)
          .join("\n");
      }
      default:
        return "";
    }
  } catch (e: any) {
    return `Error: ${e?.message || "Invalid JSON"}`;
  }
};

const JsonToTxt: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [mode, setMode] = useState<Mode>("json-lines");
  const [pretty, setPretty] = useState(true);
  const [uniqueOnly, setUniqueOnly] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const convert = () => {
    let text = toText(input, mode, pretty);
    if (uniqueOnly && !text.startsWith("Error:")) {
      const lines = text.split(/\r?\n/);
      text = Array.from(new Set(lines)).join("\n");
    }
    setOutput(text);
  };

  useEffect(() => {
    if (autoUpdate) convert();
  }, [input, autoUpdate, mode, pretty, uniqueOnly]);

  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "json-to-txt.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const onClear = () => {
    setInput("");
    setOutput("");
  };
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
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={autoUpdate}
                  onChange={(e) => setAutoUpdate(e.target.checked)}
                />
                Auto Update
              </label>
              <div className="flex items-center gap-2">
                <span>Mode:</span>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as Mode)}
                  className="bg-black/90 border border-white/20 rounded px-2 py-1"
                >
                  <option value="json-lines">JSON Lines</option>
                  <option value="keys">Keys (paths)</option>
                  <option value="values">Values</option>
                  <option value="key=value">key=value</option>
                  <option value="path=value">path: value</option>
                </select>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={pretty}
                  onChange={(e) => setPretty(e.target.checked)}
                />
                Pretty JSON
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={uniqueOnly}
                  onChange={(e) => setUniqueOnly(e.target.checked)}
                />
                Unique lines
              </label>
              <div className="ml-auto flex items-center gap-2">
                <input
                  type="file"
                  accept=".json,application/json,.txt,text/plain"
                  ref={fileRef}
                  onChange={onFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input (JSON)</label>
                  <button
                    onClick={convert}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Convert
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='{"name":"Alice","age":30,"skills":["ts","react"]}'
                  className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Right: Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Output</label>
                  <div className="flex items-center gap-2">
                    <CopyButton 
                      text={output} 
                      variant="text" 
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold h-[28px] flex items-center justify-center flex-shrink-0"
                    />
                    <button onClick={onUploadClick} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Upload</button>
                    <button
                      onClick={onDownload}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Download
                    </button>
                    <button
                      onClick={onClear}
                      className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonToTxt;
