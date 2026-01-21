"use client";
import React, { useMemo, useState } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">{children}</code>
);

// Convert CSS to LESS
// Since LESS syntax is very close to CSS, we mainly preserve structure and
// support simple nesting by keeping braces and indentation as-is, while
// stripping CSS block comments (LESS commonly uses // too).
const convertCssToLess = (css: string): string => {
  let less = css;
  // Remove CSS block comments
  less = less.replace(/\/\*[\s\S]*?\*\//g, "");

  const lines = less.split("\n");
  const result: string[] = [];
  let indentLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmed = line.trim();

    if (trimmed.length === 0) {
      result.push("");
      continue;
    }

    if (trimmed.startsWith("}")) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const currentIndent = "  ".repeat(indentLevel);

    // Normalize property lines to ensure single semicolon
    if (/^[^@}].*?:/.test(trimmed)) {
      const [prop, rest] = trimmed.split(":", 2);
      const value = (rest || "").trim().replace(/;\s*$/g, "");
      result.push(`${currentIndent}${prop.trim()}: ${value};`);
    } else {
      result.push(currentIndent + trimmed);
    }

    if (trimmed.endsWith("{")) {
      indentLevel++;
    }
  }

  return result.join("\n");
};

const CssToLess = () => {
  const [css, setCss] = useState(`/* Sample CSS */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}

.button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.button:hover {
  background-color: #0056b3;
}`);

  const less = useMemo(() => convertCssToLess(css), [css]);

  const copyToClipboard = async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };
  const clearAll = () => setCss("");

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[900px] mx-auto space-y-6">
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-2">
                <button onClick={() => copyToClipboard(less)} className="px-4 py-2 bg-primary text-black rounded text-sm font-bold hover:bg-primary/80">Copy LESS</button>
                <button onClick={clearAll} className="px-4 py-2 bg-red border border-white/10 text-black font-semibold rounded text-sm hover:bg-red/80 hover:border-black/20">Clear</button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold">CSS Input</h3>
                <textarea value={css} onChange={(e) => setCss(e.target.value)} className="w-full h-96 p-4 bg-black/40 border border-white/10 rounded font-mono text-sm resize-none" placeholder="Paste your CSS here..." spellCheck={false} />
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold">LESS Output</h3>
                <textarea value={less} readOnly className="w-full h-96 p-4 bg-black/40 border border-white/10 rounded font-mono text-sm resize-none" placeholder="LESS output will appear here..." />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-3">
                <h3 className="font-semibold">Features</h3>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                  <li>Keeps CSS structure valid for LESS</li>
                  <li>Normalizes declarations and semicolons</li>
                  <li>Preserves nested blocks and @media rules</li>
                  <li>Removes CSS block comments</li>
                </ul>
              </div>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-3">
                <h3 className="font-semibold">Tips</h3>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                  <li>Use <Cmd>{"/* */"}</Cmd> comments in LESS for single lines</li>
                  <li>Extract repeated values into variables: <Cmd>@primary: #007bff;</Cmd></li>
                  <li>Leverage nesting for components and states</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssToLess;


