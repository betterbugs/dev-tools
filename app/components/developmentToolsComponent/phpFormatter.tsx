"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

interface PhpFormatOptions {
  indentSize: IndentSize;
  trimTrailingSpaces: boolean;
  collapseBlankLines: boolean;
  spaceAroundOperators: boolean;
  spaceAfterComma: boolean;
  normalizeControlKeywordSpacing: boolean;
}

function formatPhpHeuristic(code: string, options: PhpFormatOptions): string {
  if (!code) return "";

  // Normalize line endings and strip BOM
  let text = code.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");

  // Ensure the opening tag is on its own line
  text = text.replace(/<\?(php)?/i, match => `${match}`);

  // Lightweight token-style normalizations (not a full parser)
  // 1) Newline after semicolons when followed by non-newline content
  text = text.replace(/;\s*(?!\n)/g, ";\n");

  // 2) Newline around braces
  text = text
    .replace(/\{\s*(?!\n)/g, "{\n")
    .replace(/\}\s*(?![;\}\)]?\s*\n)/g, "}\n");

  // 3) Collapse multiple newlines
  text = text.replace(/\n{3,}/g, "\n\n");

  // Split into lines for indentation pass
  const rawLines = text.split("\n").map(l => l.replace(/\s+$/g, ""));

  const indentUnit = " ".repeat(options.indentSize);
  let indentLevel = 0;
  let inBlockComment = false;

  const controlKeywords = ["if", "else", "elseif", "for", "foreach", "while", "switch", "catch"]; 
  const operatorPattern = /([+\-*/%=&|^<>!]=?|\|\||&&|\?\:)/g;

  const lines: string[] = [];
  for (let i = 0; i < rawLines.length; i++) {
    let line = rawLines[i];

    // Track block comments
    if (!inBlockComment && /\/\*/.test(line) && !/\*\//.test(line)) inBlockComment = true;
    if (inBlockComment && /\*\//.test(line)) inBlockComment = false;

    const trimmed = line.trim();
    if (!trimmed) {
      lines.push("");
      continue;
    }

    // Heuristic: dedent lines starting with closing brace
    if (/^\}/.test(trimmed)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Handle case/default alignment inside switch
    let temporaryOutdent = 0;
    if (/^(case\b|default\s*:)/.test(trimmed)) {
      temporaryOutdent = 1;
    }

    // Normalize control keyword spacing: if(x) => if (x)
    if (options.normalizeControlKeywordSpacing) {
      for (const kw of controlKeywords) {
        const re = new RegExp(`\\b${kw}\\s*\\(`, "i");
        if (re.test(trimmed)) {
          line = line.replace(new RegExp(`\\b${kw}\\s*\\(`, "i"), `${kw} (`);
        }
      }
      // function foo( -> ensure space before paren for function declarations? keep as-is typically
    }

    // Space after commas
    if (options.spaceAfterComma) {
      line = line.replace(/,\s*/g, ", ");
    }

    // Space around operators (very heuristic, skip inside strings by rough rule)
    if (options.spaceAroundOperators) {
      // Avoid modifying within quotes by splitting on quotes and only changing even segments
      const parts = line.split(/(["'])(?:(?=(\\?))\2.)*?\1/);
      for (let p = 0; p < parts.length; p++) {
        if (p % 2 === 0) {
          parts[p] = parts[p]
            .replace(/\s*([=])\s*/g, " $1 ")
            .replace(operatorPattern, m => ` ${m.trim()} `)
            .replace(/\s{2,}/g, " ");
        }
      }
      line = parts.join("");
    }

    // Trim trailing spaces
    if (options.trimTrailingSpaces) line = line.replace(/\s+$/g, "");

    const indent = indentUnit.repeat(Math.max(0, indentLevel - temporaryOutdent));
    lines.push(indent + line.trim());

    // Adjust indent after lines ending with opening brace
    if (/{\s*$/.test(trimmed) && !inBlockComment) {
      indentLevel += 1;
    }

    // Reduce indent after line with closing brace already handled at top of next line
  }

  let out = lines.join("\n");
  if (options.collapseBlankLines) {
    out = out.replace(/\n{3,}/g, "\n\n");
  }
  return out.trimEnd() + "\n";
}

const PHPFormatter: React.FC = () => {
  const [input, setInput] = useState<string>("<?php\n\nfunction hello($name){echo 'Hi '.$name; }\nhello('World');\n");
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<PhpFormatOptions>({
    indentSize: 2,
    trimTrailingSpaces: true,
    collapseBlankLines: true,
    spaceAroundOperators: true,
    spaceAfterComma: true,
    normalizeControlKeywordSpacing: true,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => {
    setOutput(formatPhpHeuristic(input, options));
  }, [input, options]);

  useEffect(() => {
    if (autoUpdate) convert();
  }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(output); } catch (_) {}
  }, [output]);

  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "application/x-httpd-php;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "formatted.php"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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

  const indentUnitLabel = useMemo(() => `${options.indentSize} spaces`, [options.indentSize]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[850px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                  Auto-update
                </label>
                <button onClick={convert} className="bg-primary text-black font-semibold border border-black/30 px-3 py-1 rounded text-xs sm:text-sm">Beautify</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Input (PHP)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".php,.phpt,.phtml,.inc,.module,.theme,.install,.engine,.profile,.class" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                    <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your PHP code here..."
                  className="w-full h-80 bg-black rounded p-3 font-mono text-sm border border-white/20"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output</span>
                  <div className="flex gap-2">
                    <button onClick={onCopy} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Copy</button>
                    <button onClick={onDownload} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Download</button>
                  </div>
                </div>
                <textarea
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  readOnly
                  className="w-full h-80 bg-black rounded p-3 font-mono text-sm border border-white/20"
                />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 md:mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.trimTrailingSpaces} onChange={(e) => setOptions(v => ({ ...v, trimTrailingSpaces: e.target.checked }))} />
                  Trim trailing spaces
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.collapseBlankLines} onChange={(e) => setOptions(v => ({ ...v, collapseBlankLines: e.target.checked }))} />
                  Collapse multiple blank lines
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.spaceAfterComma} onChange={(e) => setOptions(v => ({ ...v, spaceAfterComma: e.target.checked }))} />
                  Space after comma
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.spaceAroundOperators} onChange={(e) => setOptions(v => ({ ...v, spaceAroundOperators: e.target.checked }))} />
                  Space around operators
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.normalizeControlKeywordSpacing} onChange={(e) => setOptions(v => ({ ...v, normalizeControlKeywordSpacing: e.target.checked }))} />
                  Normalize control keyword spacing
                </label>
                <div className="flex items-center gap-3 text-sm">
                  <select
                    value={options.indentSize}
                    onChange={(e) => setOptions(v => ({ ...v, indentSize: Number(e.target.value) as IndentSize }))}
                    className="bg-black border border-white/20 rounded px-2 py-1"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                  </select>
                  <span className="text-white/60">Current: {indentUnitLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHPFormatter;
