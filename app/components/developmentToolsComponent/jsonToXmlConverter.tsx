"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

interface Options {
  indentSize: IndentSize;
  attributePrefix: string; // keys starting with this become attributes
  textKey: string; // key used for text node content
  arrayItemTag: string; // tag for array items when array items are primitives
  trimTrailingSpaces: boolean;
  collapseBlankLines: boolean;
  includeXmlDeclaration: boolean;
  rootTag: string; // root element name when input is object
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toXml(value: any, tagName: string | null, options: Options, indentLevel: number, indentUnit: string): string {
  const pad = indentUnit.repeat(indentLevel);

  if (value === null || value === undefined) {
    return tagName ? `${pad}<${tagName}/>` : "";
  }

  // Primitive types
  if (typeof value !== "object") {
    if (!tagName) tagName = options.arrayItemTag;
    return `${pad}<${tagName}>${escapeXml(String(value))}</${tagName}>`;
  }

  // Arrays
  if (Array.isArray(value)) {
    const items = value
      .map((item) => toXml(item, tagName, options, indentLevel, indentUnit))
      .join("\n");
    return items;
  }

  // Objects -> split attributes and children
  let attrs: string[] = [];
  const children: string[] = [];
  let textContent: string | null = null;

  for (const key of Object.keys(value)) {
    const v = value[key];
    if (key === options.textKey) {
      textContent = v == null ? "" : String(v);
    } else if (key.startsWith(options.attributePrefix)) {
      const attrName = key.slice(options.attributePrefix.length);
      if (attrName) attrs.push(`${attrName}="${escapeXml(String(v))}"`);
    } else {
      const child = toXml(v, key, options, indentLevel + 1, indentUnit);
      if (child) children.push(child);
    }
  }

  if (!tagName) tagName = options.rootTag || "root";

  if (!children.length && textContent !== null) {
    return `${pad}<${tagName}${attrs.length ? " " + attrs.join(" ") : ""}>${escapeXml(textContent)}</${tagName}>`;
  }

  if (!children.length && textContent === null) {
    return `${pad}<${tagName}${attrs.length ? " " + attrs.join(" ") : ""}/>`;
  }

  const inner = [
    textContent !== null ? `${indentUnit.repeat(indentLevel + 1)}${escapeXml(textContent)}` : null,
    ...children,
  ].filter(Boolean).join("\n");

  return `${pad}<${tagName}${attrs.length ? " " + attrs.join(" ") : ""}>\n${inner}\n${pad}</${tagName}>`;
}

function convertJsonToXml(input: string, options: Options): string {
  const indentUnit = " ".repeat(options.indentSize);
  let parsed: any;
  try {
    parsed = JSON.parse(input);
  } catch (_) {
    return "";
  }

  const xmlBody = toXml(parsed, null, options, 0, indentUnit);
  let out = options.includeXmlDeclaration ? `<?xml version="1.0" encoding="UTF-8"?>\n${xmlBody}` : xmlBody;
  if (options.collapseBlankLines) out = out.replace(/\n{3,}/g, "\n\n");
  if (options.trimTrailingSpaces) out = out.replace(/\s+$/gm, "");
  return out + "\n";
}

const JsonToXmlConverter: React.FC = () => {
  const [input, setInput] = useState<string>(
    '{"note":{"@to":"Tove","@from":"Jani","heading":"Reminder","body":"Don\'t forget me this weekend!","items":["a","b","c"]}}'
  );
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<Options>({
    indentSize: 2,
    attributePrefix: "@",
    textKey: "#text",
    arrayItemTag: "item",
    trimTrailingSpaces: true,
    collapseBlankLines: true,
    includeXmlDeclaration: true,
    rootTag: "root",
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => setOutput(convertJsonToXml(input, options)), [input, options]);
  useEffect(() => { if (autoUpdate) convert(); }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "converted.xml"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
                  <span className="text-sm text-white/80">Input (JSON)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".json,.txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='{"a":1,"b":[2,3]}'
                  className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (XML)</span>
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
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.includeXmlDeclaration} onChange={(e) => setOptions(v => ({ ...v, includeXmlDeclaration: e.target.checked }))} />
                  Include XML Declaration
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.trimTrailingSpaces} onChange={(e) => setOptions(v => ({ ...v, trimTrailingSpaces: e.target.checked }))} />
                  Trim trailing spaces
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.collapseBlankLines} onChange={(e) => setOptions(v => ({ ...v, collapseBlankLines: e.target.checked }))} />
                  Collapse multiple blank lines
                </label>
                <div className="flex items-center gap-3 text-sm">
                  <span>Indent:</span>
                  <select value={options.indentSize} onChange={(e) => setOptions(v => ({ ...v, indentSize: Number(e.target.value) as IndentSize }))} className="bg-black border border-white/20 rounded px-2 py-1">
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span>Attribute prefix:</span>
                  <input value={options.attributePrefix} onChange={(e) => setOptions(v => ({ ...v, attributePrefix: e.target.value }))} className="bg-black border border-white/20 rounded px-2 py-1 w-20" />
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span>Text key:</span>
                  <input value={options.textKey} onChange={(e) => setOptions(v => ({ ...v, textKey: e.target.value }))} className="bg-black border border-white/20 rounded px-2 py-1 w-28" />
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span>Array item tag:</span>
                  <input value={options.arrayItemTag} onChange={(e) => setOptions(v => ({ ...v, arrayItemTag: e.target.value }))} className="bg-black border border-white/20 rounded px-2 py-1 w-28" />
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span>Root tag:</span>
                  <input value={options.rootTag} onChange={(e) => setOptions(v => ({ ...v, rootTag: e.target.value }))} className="bg-black border border-white/20 rounded px-2 py-1 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonToXmlConverter;


