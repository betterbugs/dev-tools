"use client";

import React, { useRef, useState } from "react";

type VarMap = Record<string, string>;

const extractCssVariables = (css: string): VarMap => {
  const map: VarMap = {};
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootMatch) return map;
  const body = rootMatch[1];
  const varRegex = /--([A-Za-z0-9_-]+)\s*:\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = varRegex.exec(body)) !== null) {
    map[m[1]] = m[2].trim();
  }
  return map;
};

const replaceVarUsages = (css: string, vars: VarMap): string => {
  return css
    .replace(/:root\s*\{[\s\S]*?\}/, "")
    .replace(/var\(\s*--([A-Za-z0-9_-]+)\s*\)/g, (_, name: string) => `$${name}`)
    .trim();
};

const buildScssVariables = (vars: VarMap): string => {
  const lines = Object.entries(vars).map(([k, v]) => `$${k}: ${v};`);
  return lines.join("\n");
};

const convertCssToScss = (css: string): string => {
  const vars = extractCssVariables(css);
  const varBlock = buildScssVariables(vars);
  const body = replaceVarUsages(css, vars);

  // Naive rule parser: extracts selector and declarations
  type Rule = { selector: string; decls: string };
  const rules: Rule[] = [];
  const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = ruleRegex.exec(body)) !== null) {
    const selector = m[1].trim();
    const decls = m[2].trim();
    if (!selector || !decls) continue;
    rules.push({ selector, decls });
  }

  // Build simple nesting: only for single descendant like "A B" (no commas, no combinators)
  type Node = { name: string; decls: string; children: Node[] };
  const nodesByName = new Map<string, Node>();
  const childrenAttached = new Set<string>();

  const getNode = (name: string): Node => {
    let n = nodesByName.get(name);
    if (!n) { n = { name, decls: "", children: [] }; nodesByName.set(name, n); }
    return n;
  };

  // First pass: create nodes and assign decls for exact selectors
  for (const r of rules) {
    const node = getNode(r.selector);
    node.decls = r.decls;
  }

  // Second pass: attempt to attach simple descendant children
  for (const r of rules) {
    if (/,|>|\+|~/.test(r.selector)) continue; // skip complex selectors
    const parts = r.selector.split(/\s+/).filter(Boolean);
    if (parts.length === 2) {
      const [parentSel, childSel] = parts;
      const parent = nodesByName.get(parentSel);
      const child = nodesByName.get(r.selector); // child node keeps full selector decls
      if (parent && child && parentSel !== r.selector) {
        // Create child node with childSel as nested name
        const nestedChild: Node = { name: childSel, decls: child.decls, children: [] };
        parent.children.push(nestedChild);
        childrenAttached.add(r.selector);
      }
    }
  }

  // Emit SCSS: top-level nodes excluding those that were attached as children via simple descendant
  const lines: string[] = [];
  const isAttached = (selector: string) => childrenAttached.has(selector);
  for (const [selector, node] of Array.from(nodesByName.entries())) {
    if (isAttached(selector)) { continue; }
    // Skip empty decls without children
    if (!node.decls && node.children.length === 0) { continue; }
    lines.push(`${selector} {`);
    if (node.decls) {
      const declLines = node.decls.split(/;\s*/).filter(Boolean).map((d: string) => `  ${d.trim()};`);
      lines.push(...declLines);
    }
    for (const child of node.children) {
      lines.push("");
      lines.push(`  ${child.name} {`);
      if (child.decls) {
        const cDeclLines = child.decls.split(/;\s*/).filter(Boolean).map((d: string) => `    ${d.trim()};`);
        lines.push(...cDeclLines);
      }
      lines.push("  }");
    }
    lines.push("}");
    lines.push("");
  }

  const nestedScss = lines.join("\n").trim();
  return [varBlock, nestedScss].filter(Boolean).join("\n\n");
};

const CSSToSCSSConverter = () => {
  const [css, setCss] = useState("");
  const [scss, setScss] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const onConvert = () => setScss(convertCssToScss(css));
  const onCopy = async () => { try { await navigator.clipboard.writeText(scss); } catch {} };
  const onDownload = () => {
    const blob = new Blob([scss], { type: "text/x-scss;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "styles.scss"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const onClear = () => { setCss(""); setScss(""); };
  const onUploadClick = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCss(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            {/* Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-medium">CSS Input</label>
                <div className="flex items-center gap-2">
                  <input type="file" accept=".css,text/css,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
                  <button onClick={onUploadClick} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Upload</button>
                  <button onClick={() => setCss("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                </div>
              </div>
              <textarea value={css} onChange={(e) => setCss(e.target.value)} placeholder=":root { --primary: #0ea5e9; }\n.button { color: var(--primary); }" className="w-full h-48 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
            </div>

            {/* Convert */}
            <div className="flex justify-center">
              <button onClick={onConvert} className="px-5 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Convert</button>
            </div>

            {/* Output */}
            <div className="space-y-3">
              <label className="font-medium">SCSS Output</label>
              <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-56">{scss}</pre>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={onCopy} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Copy</button>
              <button onClick={onDownload} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Download</button>
              <button onClick={onClear} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold">Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSToSCSSConverter