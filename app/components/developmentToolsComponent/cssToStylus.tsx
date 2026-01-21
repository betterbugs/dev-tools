"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

interface Options {
  indentSize: IndentSize;
  keepBraces: boolean; // debug option: keep braces/comments
  keepSemicolons: boolean;
}

// Very lightweight CSS → Stylus conversion (best‑effort for common patterns)
function cssToStylus(css: string, options: Options): string {
  if (!css.trim()) return "";
  let src = css.replace(/\r\n?/g, "\n");

  // Remove comments
  if (!options.keepBraces) {
    src = src.replace(/\/\*[\s\S]*?\*\//g, "");
  }

  // Handle nested rules by tracking braces and converting to indentation
  const lines = src.split(/\n/);
  const out: string[] = [];
  const indentUnit = " ".repeat(options.indentSize);
  let indent = 0;
  let buffer = "";

  function flushBuffer() {
    const trimmed = buffer.trim();
    if (!trimmed) { buffer = ""; return; }
    // Declaration line: prop: value;
    const decl = trimmed.match(/^([^:{}]+):\s*(.+);?$/);
    if (decl) {
      const prop = decl[1].trim();
      const val = decl[2].trim().replace(/;$/, "");
      out.push(`${indentUnit.repeat(indent)}${prop} ${val}`);
      buffer = "";
      return;
    }
    // Selector start handled by brace detection; otherwise output as is
    out.push(`${indentUnit.repeat(indent)}${trimmed}`);
    buffer = "";
  }

  for (let raw of lines) {
    let line = raw;
    if (!options.keepBraces) {
      line = line.replace(/;\s*$/g, ""); // drop semicolons at EOL
    } else if (!options.keepSemicolons) {
      line = line.replace(/;\s*$/g, "");
    }
    // Opening brace increases indent after selector line
    const openIdx = line.indexOf("{");
    const closeIdx = line.indexOf("}");

    if (openIdx !== -1) {
      const before = line.slice(0, openIdx).trim();
      if (before) {
        out.push(`${indentUnit.repeat(indent)}${before}`);
      }
      indent += 1;
      line = line.slice(openIdx + 1);
    }

    if (closeIdx !== -1) {
      // Flush pending buffer before closing
      if (buffer.trim()) flushBuffer();
      indent = Math.max(0, indent - 1);
      line = line.slice(0, closeIdx);
    }

    const trimmed = line.trim();
    if (!trimmed) continue;

    // Accumulate property lines possibly split across multiple lines
    if (/^[^:{}]+:\s*.+;?$/.test(trimmed)) {
      buffer = trimmed;
      flushBuffer();
    } else {
      out.push(`${indentUnit.repeat(indent)}${trimmed}`);
    }
  }

  if (buffer.trim()) flushBuffer();

  // Cleanup multiple blank lines
  return out.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
}

const CssToStylus: React.FC = () => {
  const [input, setInput] = useState<string>(
    `.container {\n  display: flex;\n  justify-content: center;\n}\n.container .title {\n  color: #333;\n  font-weight: bold;\n}`
  );
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<Options>({
    indentSize: 2,
    keepBraces: false,
    keepSemicolons: false,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => setOutput(cssToStylus(input, options)), [input, options]);
  useEffect(() => { if (autoUpdate) convert(); }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "converted.styl"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
          <div className="md:w-[900px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                  Auto-update
                </label>
                <button onClick={convert} className="bg-primary text-black font-semibold border border-black/30 px-3 py-1 rounded text-xs sm:text-sm">Convert</button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={onCopy} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Copy</button>
                <button onClick={onDownload} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Download</button>
                <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <span className="text-sm text-white/80">Input (CSS)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".css,.txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={'.box {\n  padding: 8px;\n  color: #222;\n}'}
                  className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (Stylus)</span>
                </div>
                <textarea
                  value={output}
                  readOnly
                  className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20"
                />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 md:mt-2">
                <div className="flex items-center gap-3 text-sm">
                  <span>Indent:</span>
                  <select value={options.indentSize} onChange={(e) => setOptions(v => ({ ...v, indentSize: Number(e.target.value) as IndentSize }))} className="bg-black border border-white/20 rounded px-2 py-1">
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.keepBraces} onChange={(e) => setOptions(v => ({ ...v, keepBraces: e.target.checked }))} />
                  Keep comments/braces
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.keepSemicolons} onChange={(e) => setOptions(v => ({ ...v, keepSemicolons: e.target.checked }))} />
                  Keep semicolons
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssToStylus;


