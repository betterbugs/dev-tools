"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

interface Options {
  indentSize: IndentSize;
  collapseWhitespace: boolean;
  keepAttributesOnSameLine: boolean;
}

function attrsToJade(attrs: NamedNodeMap, options: Options): string {
  if (!attrs || attrs.length === 0) return "";
  const parts: string[] = [];
  for (let i = 0; i < attrs.length; i++) {
    const a = attrs[i];
    const k = a.name;
    const v = a.value;
    if (v === "") parts.push(k);
    else parts.push(`${k}="${v.replace(/"/g, '\\"')}"`);
  }
  const joined = parts.join(", ");
  return joined ? `(${joined})` : "";
}

function isVoid(tag: string): boolean {
  return [
    "area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr",
  ].includes(tag.toLowerCase());
}

function htmlToJade(html: string, options: Options): string {
  if (!html.trim()) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const root = doc.body;
  const indentUnit = " ".repeat(options.indentSize);

  function walk(node: Node, depth: number, lines: string[]) {
    if (node.nodeType === Node.TEXT_NODE) {
      const raw = (node.nodeValue || "");
      const text = options.collapseWhitespace ? raw.replace(/\s+/g, " ").trim() : raw;
      if (!text) return;
      // Use '| ' for text lines in Jade
      lines.push(`${indentUnit.repeat(depth)}| ${text}`);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as Element;
    const tag = el.tagName.toLowerCase();

    const id = el.getAttribute("id");
    const classAttr = el.getAttribute("class");
    let head = tag;
    if (id) head += `#${id}`;
    if (classAttr) {
      const classes = classAttr.split(/\s+/).filter(Boolean);
      head += classes.map((c) => `.${c}`).join("");
    }

    // Build attributes excluding id/class which are represented above
    const filteredEl = el.cloneNode(false) as Element;
    filteredEl.removeAttribute("id");
    filteredEl.removeAttribute("class");
    for (let i = el.attributes.length - 1; i >= 0; i--) {
      const a = el.attributes[i];
      if (a.name === "id" || a.name === "class") continue;
    }
    const attrStr = attrsToJade(el.attributes, options)
      .replace(/\(\)/, "");
    const attrsRendered = attrStr
      .replace(/\(id="[^"]*"\)/, "")
      .replace(/\(class="[^"]*"\)/, "");

    const open = `${indentUnit.repeat(depth)}${head}${attrsRendered ? attrsRendered : ""}`;
    const childElements = Array.from(el.childNodes).filter((n) => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && (n.nodeValue || "").trim().length));

    if (childElements.length === 0 && isVoid(tag)) {
      lines.push(open);
      return;
    }

    if (childElements.length === 0) {
      // If there is only whitespace text, omit
      lines.push(open);
      return;
    }

    lines.push(open);
    childElements.forEach((child) => walk(child, depth + 1, lines));
  }

  const out: string[] = [];
  Array.from(root.childNodes).forEach((n) => walk(n, 0, out));
  return out.join("\n") + "\n";
}

const HtmlToJade: React.FC = () => {
  const [input, setInput] = useState<string>(
    `<div id="app" class="container"><h1>Hello</h1><p>Welcome <strong>friend</strong>.</p></div>`
  );
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<Options>({
    indentSize: 2,
    collapseWhitespace: true,
    keepAttributesOnSameLine: true,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => setOutput(htmlToJade(input, options)), [input, options]);
  useEffect(() => { if (autoUpdate) convert(); }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "converted.jade"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
                  <span className="text-sm text-white/80">Input (HTML)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".html,.txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={'<div id="app"><h1>Title</h1><p>Text</p></div>'}
                  className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20"
                ></textarea>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (Jade/Pug)</span>
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
                  <input type="checkbox" className="accent-primary" checked={options.collapseWhitespace} onChange={(e) => setOptions(v => ({ ...v, collapseWhitespace: e.target.checked }))} />
                  Collapse whitespace
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.keepAttributesOnSameLine} onChange={(e) => setOptions(v => ({ ...v, keepAttributesOnSameLine: e.target.checked }))} />
                  Keep attributes inline
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlToJade;


