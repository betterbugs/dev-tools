"use client";

import React, { useEffect, useRef, useState } from "react";

type Options = {
  trimTrailingSpaces: boolean;
  ensureSemicolons: boolean;
  collapseBlankLines: boolean;
  indentWithTabs: boolean;
  indentSize: number;
};

// Very lightweight TypeScript formatter (regex-based). Not a parser; aims for consistent spacing.
const formatTypescript = (src: string, opts: Options): string => {
  let code = src.replace(/\r\n/g, "\n");

  if (opts.trimTrailingSpaces) {
    code = code.split("\n").map((l) => l.replace(/[ \t]+$/g, "")).join("\n");
  }

  // Basic token-level spacing normalizations (best-effort; may touch strings)
  code = code
    // Ensure a space after commas
    .replace(/,([^\s\n\r])/g, ", $1")
    // Ensure a single space around colon in type annotations and object literals
    .replace(/:\s*/g, ": ")
    // Ensure space before opening brace after ) or identifier
    .replace(/\)\s*\{/g, ") {")
    .replace(/(class\s+[A-Za-z0-9_]+)\s*\{/g, "$1 {")
    // Arrow function spacing
    .replace(/\)\s*=>/g, ") =>")
    .replace(/=>\s*\{/g, "=> {");

  // Normalize indentation heuristically based on braces
  const lines = code.split("\n");
  const indentUnit = opts.indentWithTabs ? "\t" : " ".repeat(Math.max(1, opts.indentSize));
  let depth = 0;
  const formatted: string[] = [];
  for (let raw of lines) {
    let line = raw.replace(/^\s+/, (m) => m.replace(/\t/g, indentUnit));
    const trimmed = line.trim();
    if (trimmed.startsWith("}") || trimmed.startsWith(");}")) {
      depth = Math.max(0, depth - 1);
    }
    const prefix = indentUnit.repeat(depth);
    line = trimmed.length ? prefix + trimmed : "";
    formatted.push(line);
    const open = (trimmed.match(/\{/g) || []).length;
    const close = (trimmed.match(/\}/g) || []).length;
    depth += open - close;
    if (depth < 0) depth = 0;
  }
  code = formatted.join("\n");

  if (opts.ensureSemicolons) {
    // Append semicolons to simple statements that likely need them
    code = code.replace(/(^|\n)([^\n{};]+)(\n)/g, (m, a, mid, c) => {
      const t = mid.trim();
      if (!t) return m;
      if (/^(if|for|while|switch|try|catch|finally|else|do)\b/.test(t)) return m; // control blocks
      if (/[;{}}]$/.test(t)) return m; // already closed
      if (/=>\s*\{?$/.test(t)) return m; // arrow fn
      return `${a}${mid};${c}`;
    });
  }

  if (opts.collapseBlankLines) {
    code = code.replace(/\n{3,}/g, "\n\n");
  }

  return code;
};

const TypescriptFormatter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [trimTrailingSpaces, setTrimTrailingSpaces] = useState(true);
  const [ensureSemicolons, setEnsureSemicolons] = useState(true);
  const [collapseBlankLines, setCollapseBlankLines] = useState(true);
  const [indentWithTabs, setIndentWithTabs] = useState(false);
  const [indentSize, setIndentSize] = useState(2);
  const fileRef = useRef<HTMLInputElement>(null);

  const convert = () => {
    setOutput(
      formatTypescript(input, {
        trimTrailingSpaces,
        ensureSemicolons,
        collapseBlankLines,
        indentWithTabs,
        indentSize,
      })
    );
  };

  useEffect(() => {
    if (autoUpdate) convert();
  }, [
    input,
    autoUpdate,
    trimTrailingSpaces,
    ensureSemicolons,
    collapseBlankLines,
    indentWithTabs,
    indentSize,
  ]);

  const onCopy = async () => { try { await navigator.clipboard.writeText(output); } catch {} };
  const onDownload = () => {
    const blob = new Blob([output], { type: "application/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "formatted.ts"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={trimTrailingSpaces} onChange={(e) => setTrimTrailingSpaces(e.target.checked)} />
                Trim trailing spaces
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={ensureSemicolons} onChange={(e) => setEnsureSemicolons(e.target.checked)} />
                Ensure semicolons
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={collapseBlankLines} onChange={(e) => setCollapseBlankLines(e.target.checked)} />
                Collapse blank lines
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={indentWithTabs} onChange={(e) => setIndentWithTabs(e.target.checked)} />
                Indent with tabs
              </label>
              <div className="flex items-center gap-2">
                <span>Indent size:</span>
                <select value={indentSize} onChange={(e) => setIndentSize(Number(e.target.value))} className="bg-black/90 border border-white/20 rounded px-2 py-1">
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={8}>8</option>
                </select>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <input type="file" accept=".ts,.tsx,application/typescript,.txt,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input (TypeScript)</label>
                  <button onClick={convert} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Format</button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={`export interface User{\nname:string\nage:number\n}`} className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Right: Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Output</label>
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

export default TypescriptFormatter;


