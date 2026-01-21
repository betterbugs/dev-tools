"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

interface PyFormatOptions {
  indentSize: IndentSize;
  trimTrailingSpaces: boolean;
  collapseBlankLines: boolean;
  spaceAroundOperators: boolean;
  spaceAfterComma: boolean;
  normalizeKeywordSpacing: boolean;
}

function formatPythonHeuristic(code: string, options: PyFormatOptions): string {
  if (!code) return "";

  let text = code.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");

  // Normalize tabs to spaces according to indent size (Python prefers spaces)
  const tabAsSpaces = " ".repeat(options.indentSize);
  text = text.replace(/\t/g, tabAsSpaces);

  // Split into lines
  const rawLines = text.split("\n");

  // Helpers
  const operatorPattern = /([+\-*/%=&|^<>!]=?|\|\||&&|:=)/g; // includes walrus :=
  const indentUnit = " ".repeat(options.indentSize);

  // Very light tokenizer state
  let indentLevel = 0;
  let inMultilineString: false | '"' | "'" = false;

  const dedentStarters = /^(elif\b|else\b|except\b|finally\b)/;
  const blockEnders = /^(return\b|break\b|continue\b|pass\b|raise\b)/; // no dedent, just for awareness
  const blockStarters = /:\s*(#.*)?$/; // line ends with ':' (ignoring trailing comment)

  function isTripleQuotedStart(s: string): false | '"' | "'" {
    const m = s.match(/(["']{3})/);
    if (!m) return false;
    return m[1][0] === '"' ? '"' : "'";
  }

  const lines: string[] = [];
  for (let i = 0; i < rawLines.length; i++) {
    let line = rawLines[i];

    // Trim trailing spaces early
    if (options.trimTrailingSpaces) line = line.replace(/\s+$/g, "");

    // Track multiline strings (""" or '''), very rough
    if (!inMultilineString) {
      const start = line.match(/\s*(?:[rubf]*)("""|''')/i);
      if (start) {
        const q = start[1][0];
        const closesHere = new RegExp(`${start[1]}`);
        if (!closesHere.test(line.replace(start[0], ""))) inMultilineString = q as '"' | "'";
      }
    } else {
      const closeToken = inMultilineString === '"' ? '"""' : "'''";
      if (line.includes(closeToken)) inMultilineString = false;
      lines.push(indentUnit.repeat(indentLevel) + line.trimEnd());
      continue;
    }

    const leadingWhitespace = line.match(/^\s*/)?.[0] ?? "";
    let trimmed = line.trim();

    if (!trimmed) {
      lines.push("");
      continue;
    }

    // Dedent for else/elif/except/finally
    if (dedentStarters.test(trimmed)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Normalize keyword spacing: def foo(x):, class X:, if (x): -> if (x):
    if (options.normalizeKeywordSpacing) {
      const kw = ["def", "class", "if", "elif", "else", "for", "while", "try", "except", "finally", "with"];
      for (const k of kw) {
        const re = new RegExp(`(^|\n)\s*${k}\\s+`, "i");
        if (re.test(trimmed)) {
          trimmed = trimmed.replace(new RegExp(`^${k}\\s+`, "i"), `${k} `);
        }
      }
    }

    // Space after comma
    if (options.spaceAfterComma) {
      // Avoid strings by a very rough split on quotes (does not handle escaped correctly but good heuristic)
      const parts = trimmed.split(/(["'])(?:(?=(\\?))\2.)*?\1/);
      for (let p = 0; p < parts.length; p += 2) {
        parts[p] = parts[p].replace(/,\s*/g, ", ");
      }
      trimmed = parts.join("");
    }

    // Space around operators
    if (options.spaceAroundOperators) {
      const parts = trimmed.split(/(["'])(?:(?=(\\?))\2.)*?\1/);
      for (let p = 0; p < parts.length; p += 2) {
        parts[p] = parts[p]
          .replace(/\s*([=])\s*/g, " $1 ")
          .replace(operatorPattern, m => ` ${m.trim()} `)
          .replace(/\s{2,}/g, " ");
      }
      trimmed = parts.join("");
    }

    // Compute current indent
    const indented = indentUnit.repeat(Math.max(0, indentLevel)) + trimmed;
    lines.push(indented);

    // Adjust indent after block starters
    if (blockStarters.test(trimmed) && !trimmed.startsWith("#")) {
      indentLevel += 1;
    }
  }

  let out = lines.join("\n");
  if (options.collapseBlankLines) out = out.replace(/\n{3,}/g, "\n\n");
  return out.trimEnd() + "\n";
}

const PythonFormatter: React.FC = () => {
  const [input, setInput] = useState<string>(
    "def greet(name):\n    print('Hi, '+name)\n\nif __name__=='__main__':\n    greet('World')\n"
  );
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<PyFormatOptions>({
    indentSize: 4,
    trimTrailingSpaces: true,
    collapseBlankLines: true,
    spaceAroundOperators: true,
    spaceAfterComma: true,
    normalizeKeywordSpacing: true,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => {
    setOutput(formatPythonHeuristic(input, options));
  }, [input, options]);

  useEffect(() => { if (autoUpdate) convert(); }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/x-python;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "formatted.py"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
                  <span className="text-sm text-white/80">Input (Python)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".py,.pyw" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                    <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your Python code here..."
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
                  <input type="checkbox" className="accent-primary" checked={options.normalizeKeywordSpacing} onChange={(e) => setOptions(v => ({ ...v, normalizeKeywordSpacing: e.target.checked }))} />
                  Normalize keyword spacing
                </label>
                <div className="flex items-center gap-3 text-sm">
                  <select
                    value={options.indentSize}
                    onChange={(e) => setOptions(v => ({ ...v, indentSize: Number(e.target.value) as IndentSize }))}
                    className="bg-black border border-white/20 rounded px-2 py-1 text-sm"
                  >
                    <option value={4}>4 spaces</option>
                    <option value={2}>2 spaces</option>
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

export default PythonFormatter;


