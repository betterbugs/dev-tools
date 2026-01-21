"use client";

import React, { useRef, useState } from "react";

type VarMap = Record<string, string>;

// Extract $variables (simple: `$name: value;`) ignoring those inside braces as a best-effort heuristic
const extractScssVariables = (scss: string): VarMap => {
  const map: VarMap = {};
  const varRegex = /\$([A-Za-z0-9_-]+)\s*:\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = varRegex.exec(scss)) !== null) {
    const name = m[1];
    const value = m[2].trim();
    if (!(name in map)) map[name] = value;
  }
  return map;
};

const replaceVars = (scss: string, vars: VarMap): string => {
  let out = scss;
  // remove variable declarations themselves
  out = out.replace(/\$[A-Za-z0-9_-]+\s*:[^;]+;\s*/g, "");
  for (const key of Object.keys(vars)) {
    const re = new RegExp(`\\$${key}(?![A-Za-z0-9_-])`, "g");
    out = out.replace(re, vars[key]);
  }
  return out;
};

// Very small SCSS flattener: handles nested selectors and & parent reference
const flattenNesting = (scss: string): string => {
  type Node = { selector: string; decls: string[]; children: Node[] };

  const tokens: string[] = [];
  // Tokenize braces to help parsing
  let buf = "";
  for (let i = 0; i < scss.length; i++) {
    const ch = scss[i];
    if (ch === "{" || ch === "}") {
      if (buf.trim().length) tokens.push(buf);
      tokens.push(ch);
      buf = "";
    } else {
      buf += ch;
    }
  }
  if (buf.trim().length) tokens.push(buf);

  const root: Node = { selector: "", decls: [], children: [] };
  const stack: Node[] = [root];

  const trimSelector = (s: string) => s.replace(/\s+/g, " ").trim();

  let i = 0;
  while (i < tokens.length) {
    const tok = tokens[i++];
    if (tok === "}") { stack.pop(); continue; }
    if (tok === "{") { continue; }
    const next = tokens[i];
    if (next === "{") {
      // selector block
      const sel = trimSelector(tok);
      const node: Node = { selector: sel, decls: [], children: [] };
      stack[stack.length - 1].children.push(node);
      stack.push(node);
      i++; // consume '{'
    } else {
      // declarations string for current node; split into lines by ;
      const current = stack[stack.length - 1];
      const parts = tok.split(/;\s*/).map((p) => p.trim()).filter(Boolean);
      current.decls.push(...parts.map((p) => (p.endsWith(";") ? p.slice(0, -1) : p)));
    }
  }

  const lines: string[] = [];

  const emit = (node: Node, parents: string[]) => {
    for (const child of node.children) {
      const parentPath = parents.filter(Boolean).join(" ");
      const rawSel = child.selector;
      // handle & reference
      const fullSelector = rawSel.indexOf("&") >= 0
        ? rawSel.replace(/&/g, parentPath)
        : (parentPath ? `${parentPath} ${rawSel}` : rawSel);

      if (child.decls.length) {
        lines.push(`${fullSelector} {`);
        const declLines = child.decls.map((d) => `  ${d};`);
        lines.push(...declLines);
        lines.push("}");
        lines.push("");
      }
      emit(child, [...parents, rawSel.indexOf("&") >= 0 ? fullSelector : rawSel]);
    }
  };

  emit(root, []);
  return lines.join("\n").trim();
};

const transpileScssToCss = (scss: string): string => {
  const vars = extractScssVariables(scss);
  const replaced = replaceVars(scss, vars);
  const css = flattenNesting(replaced);
  return css;
};

const ScssToCssConverter: React.FC = () => {
  const [scss, setScss] = useState("");
  const [css, setCss] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const onConvert = () => setCss(transpileScssToCss(scss));
  const onCopy = async () => { try { await navigator.clipboard.writeText(css); } catch {} };
  const onDownload = () => {
    const blob = new Blob([css], { type: "text/css;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "styles.css"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const onClear = () => { setScss(""); setCss(""); };
  const onUploadClick = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setScss(String(ev.target?.result ?? ""));
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
                <label className="font-medium">SCSS Input</label>
                <div className="flex items-center gap-2">
                  <input type="file" accept=".scss,text/x-scss,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
                  <button onClick={onUploadClick} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Upload</button>
                  <button onClick={() => setScss("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                </div>
              </div>
              <textarea value={scss} onChange={(e) => setScss(e.target.value)} placeholder={"$primary: #0ea5e9;\nheader {\n  color: $primary;\n  nav { display: flex; }\n}\n.button {\n  &--primary { color: $primary; }\n}"} className="w-full h-48 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
            </div>

            {/* Convert */}
            <div className="flex justify-center">
              <button onClick={onConvert} className="px-5 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Convert</button>
            </div>

            {/* Output */}
            <div className="space-y-3">
              <label className="font-medium">CSS Output</label>
              <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-56">{css}</pre>
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

export default ScssToCssConverter;


