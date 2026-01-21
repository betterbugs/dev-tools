"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

interface Options {
  indentSize: IndentSize;
  trimTrailingSpaces: boolean;
  collapseBlankLines: boolean;
  sortKeys: boolean;
}

function stringifyYaml(value: any, indent: string, level: number, sortKeys: boolean): string {
  const pad = indent.repeat(level);

  if (value === null) return `${pad}null`;
  if (value === undefined) return `${pad}`;
  if (typeof value === "number" || typeof value === "boolean") return `${pad}${String(value)}`;
  if (typeof value === "string") {
    if (/[:\-\n#{}\[\],]|^\s|\s$/.test(value)) {
      // Quote if contains special chars or leading/trailing space
      return `${pad}"${value.replace(/"/g, '\\"')}"`;
    }
    return `${pad}${value}`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return `${pad}[]`;
    return value
      .map((item) => {
        const head = `${pad}- `;
        const rendered = stringifyYaml(item, indent, level + 1, sortKeys);
        // Remove one indent level from rendered and place after dash
        return head + rendered.slice((indent.repeat(level + 1)).length);
      })
      .join("\n");
  }

  // Object
  const keys = Object.keys(value);
  if (sortKeys) keys.sort();
  if (keys.length === 0) return `${pad}{}`;
  const lines: string[] = [];
  for (const k of keys) {
    const v = value[k];
    const keySafe = /[:\-\n#{}\[\],]|^\s|\s$/.test(k) ? `"${k.replace(/"/g, '\\"')}"` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      lines.push(`${pad}${keySafe}:`);
      lines.push(stringifyYaml(v, indent, level + 1, sortKeys));
    } else {
      const rendered = stringifyYaml(v, indent, level + 1, sortKeys);
      lines.push(`${pad}${keySafe}: ${rendered.slice((indent.repeat(level + 1)).length)}`);
    }
  }
  return lines.join("\n");
}

function convertJsonToYaml(input: string, options: Options): string {
  const indent = " ".repeat(options.indentSize);
  let parsed: any;
  try {
    parsed = JSON.parse(input);
  } catch (_) {
    return "";
  }
  let out = stringifyYaml(parsed, indent, 0, options.sortKeys);
  if (options.collapseBlankLines) out = out.replace(/\n{3,}/g, "\n\n");
  if (options.trimTrailingSpaces) out = out.replace(/\s+$/gm, "");
  return out + "\n";
}

const JsonToYamlConverter: React.FC = () => {
  const [input, setInput] = useState<string>(
    '{"name":"John","age":30,"skills":["js","ts"],"address":{"city":"NY","zip":"10001"}}'
  );
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<Options>({
    indentSize: 2,
    trimTrailingSpaces: true,
    collapseBlankLines: true,
    sortKeys: false,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => setOutput(convertJsonToYaml(input, options)), [input, options]);
  useEffect(() => { if (autoUpdate) convert(); }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "converted.yaml"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                  Auto-update
                </label>
                <button onClick={convert} className="bg-primary text-black font-semibold border border-black/30 px-3 py-1 rounded text-xs sm:text-sm">Convert</button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onCopy} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Copy</button>
                <button onClick={onDownload} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Download</button>
                <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Input (JSON)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".json,.txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"a":1,"b":[2,3]}' className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (YAML)</span>
                </div>
                <textarea value={output} readOnly className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20" />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.trimTrailingSpaces} onChange={(e) => setOptions(v => ({ ...v, trimTrailingSpaces: e.target.checked }))} />
                  Trim trailing spaces
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.collapseBlankLines} onChange={(e) => setOptions(v => ({ ...v, collapseBlankLines: e.target.checked }))} />
                  Collapse multiple blank lines
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.sortKeys} onChange={(e) => setOptions(v => ({ ...v, sortKeys: e.target.checked }))} />
                  Sort keys
                </label>
                <div className="flex items-center gap-3 text-sm">
                  <span>Indent:</span>
                  <select value={options.indentSize} onChange={(e) => setOptions(v => ({ ...v, indentSize: Number(e.target.value) as IndentSize }))} className="bg-black border border-white/20 rounded px-2 py-1">
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonToYamlConverter;


