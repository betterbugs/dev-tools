"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

interface Options {
  indentSize: IndentSize;
  includeRootWrapper: boolean; // if input has multiple top nodes, wrap into a root object key
  rootKey: string; // key to use when wrapping
  trimWhitespaceTextNodes: boolean;
  collapseWhitespace: boolean;
  keepAttributesPrefix: string; // prefix for attributes in JSON (e.g., @)
  textKey: string; // key used for text node content (e.g., #text)
}

function parseXml(input: string): Document | null {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "application/xml");
    const parsererror = doc.getElementsByTagName("parsererror")[0];
    if (parsererror) return null;
    return doc;
  } catch (_) {
    return null;
  }
}

function normalizeWhitespace(value: string, trim: boolean, collapse: boolean): string {
  let v = value;
  if (trim) v = v.trim();
  if (collapse) v = v.replace(/\s+/g, " ");
  return v;
}

function xmlNodeToJson(node: Node, options: Options): any {
  // Text node
  if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
    const text = normalizeWhitespace(node.nodeValue || "", options.trimWhitespaceTextNodes, options.collapseWhitespace);
    return text.length ? text : undefined;
  }

  // Element node
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as Element;
    const obj: Record<string, any> = {};

    // attributes
    if (el.attributes && el.attributes.length > 0) {
      for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i];
        obj[`${options.keepAttributesPrefix}${attr.name}`] = attr.value;
      }
    }

    // children
    const childMap: Record<string, any[]> = {};
    let textContent: string | undefined;
    for (let i = 0; i < el.childNodes.length; i++) {
      const child = el.childNodes[i];
      if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE) {
        const t = xmlNodeToJson(child, options);
        if (typeof t === "string" && t.length) {
          // capture as textKey; may be alongside attributes/children
          textContent = t;
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const childEl = child as Element;
        const key = childEl.tagName;
        const val = xmlNodeToJson(childEl, options);
        if (!childMap[key]) childMap[key] = [];
        childMap[key].push(val);
      }
    }

    // assign children (array if multiple, single if one)
    Object.keys(childMap).forEach((k) => {
      const arr = childMap[k];
      obj[k] = arr.length === 1 ? arr[0] : arr;
    });

    if (textContent !== undefined) {
      // if there are no other keys, return the text directly; else place at textKey
      const hasOtherKeys = Object.keys(obj).length > 0;
      if (hasOtherKeys) {
        obj[options.textKey] = textContent;
      } else {
        return textContent;
      }
    }

    return obj;
  }

  return undefined;
}

function convertXmlToJson(input: string, options: Options): string {
  const doc = parseXml(input);
  if (!doc) return "";

  // If the document has exactly one element child, convert that as root
  const elements = Array.from(doc.childNodes).filter((n) => n.nodeType === Node.ELEMENT_NODE) as Element[];
  if (elements.length === 1) {
    const root = elements[0];
    const result: Record<string, any> = {};
    result[root.tagName] = xmlNodeToJson(root, options);
    return JSON.stringify(result, null, options.indentSize) + "\n";
  }

  // Multiple top-level nodes → wrap if requested
  const jsonNodes = elements.map((el) => ({ [el.tagName]: xmlNodeToJson(el, options) }));
  const output = options.includeRootWrapper ? { [options.rootKey]: jsonNodes } : jsonNodes;
  return JSON.stringify(output, null, options.indentSize) + "\n";
}

const XmlToJsonConverter: React.FC = () => {
  const [input, setInput] = useState<string>(
    `<?xml version="1.0" encoding="UTF-8"?>\n<note to="Tove" from="Jani">\n  <heading>Reminder</heading>\n  <body>Don't forget me this weekend!</body>\n  <items>\n    <item>a</item>\n    <item>b</item>\n    <item>c</item>\n  </items>\n</note>`
  );
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<Options>({
    indentSize: 2,
    includeRootWrapper: false,
    rootKey: "root",
    trimWhitespaceTextNodes: true,
    collapseWhitespace: false,
    keepAttributesPrefix: "@",
    textKey: "#text",
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => setOutput(convertXmlToJson(input, options)), [input, options]);
  useEffect(() => { if (autoUpdate) convert(); }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "converted.json"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
                  <span className="text-sm text-white/80">Input (XML)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".xml,.txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="<root><a>1</a><b>2</b></root>"
                  className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (JSON)</span>
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
                  <input type="checkbox" className="accent-primary" checked={options.trimWhitespaceTextNodes} onChange={(e) => setOptions(v => ({ ...v, trimWhitespaceTextNodes: e.target.checked }))} />
                  Trim text whitespace
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.collapseWhitespace} onChange={(e) => setOptions(v => ({ ...v, collapseWhitespace: e.target.checked }))} />
                  Collapse whitespace
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.includeRootWrapper} onChange={(e) => setOptions(v => ({ ...v, includeRootWrapper: e.target.checked }))} />
                  Wrap multiple roots
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
                  <input value={options.keepAttributesPrefix} onChange={(e) => setOptions(v => ({ ...v, keepAttributesPrefix: e.target.value }))} className="bg-black border border-white/20 rounded px-2 py-1 w-20" />
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span>Text key:</span>
                  <input value={options.textKey} onChange={(e) => setOptions(v => ({ ...v, textKey: e.target.value }))} className="bg-black border border-white/20 rounded px-2 py-1 w-28" />
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span>Root key:</span>
                  <input value={options.rootKey} onChange={(e) => setOptions(v => ({ ...v, rootKey: e.target.value }))} className="bg-black border border-white/20 rounded px-2 py-1 w-28" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XmlToJsonConverter;


