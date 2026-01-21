"use client";
import React, { useMemo, useState } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">{children}</code>
);

const escapeForJavaScript = (input: string): string => {
  return input
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(/\f/g, "\\f")
    .replace(/\v/g, "\\v")
    .replace(/\"/g, "\\\"")
    .replace(/\'/g, "\\'");
};

const unescapeFromJavaScript = (input: string): string => {
  try {
    // Safely interpret escape sequences using JSON parsing
    return JSON.parse(`"${input.replace(/"/g, '\\"')}"`);
  } catch {
    // Fallback manual unescape
    return input
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\f/g, "\f")
      .replace(/\\v/g, "\v")
      .replace(/\\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  }
};

const JavaScriptEscape = () => {
  const [raw, setRaw] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  const output = useMemo(() => {
    return mode === "escape" ? escapeForJavaScript(raw) : unescapeFromJavaScript(raw);
  }, [raw, mode]);

  const exampleLiteral = useMemo(() => {
    const inner = mode === "escape" ? '{\\"quote\\"}' : '{\\\\\\"quote\\\\\\"}';
    return `const s = "${inner}";`;
  }, [mode]);

  const copy = async (text: string) => { try { await navigator.clipboard.writeText(text); } catch {} };
  const clear = () => setRaw("");

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[900px] mx-auto space-y-6">
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-2 text-sm">
                <button onClick={() => setMode("escape")} className={`px-3 py-1 rounded ${mode === "escape" ? "bg-primary text-black" : "bg-black/30 border border-white/10"}`}>Escape</button>
                <button onClick={() => setMode("unescape")} className={`px-3 py-1 rounded ${mode === "unescape" ? "bg-primary text-black" : "bg-black/30 border border-white/10"}`}>Unescape</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Input</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={clear} className="px-3 py-1 bg-red text-black rounded text-xs font-semibold">Clear</button>
                  </div>
                </div>
                <textarea value={raw} onChange={(e) => setRaw(e.target.value)} className="w-full h-48 p-3 bg-black/40 border border-white/10 rounded font-mono text-sm" placeholder={mode === "escape" ? "Paste raw text to escape for JavaScript string..." : "Paste escaped JavaScript string to unescape..."} />
              </div>

              <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Output</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => copy(output)} className="px-3 py-1 bg-primary text-black rounded text-xs font-semibold">Copy</button>
                  </div>
                </div>
                <textarea readOnly value={output} className="w-full h-48 p-3 bg-black/40 border border-white/10 rounded font-mono text-sm" placeholder="Output will appear here..." />
              </div>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h3 className="font-semibold">Examples</h3>
              <div className="space-y-1">
                <div>
                  <span className="text-white/70">String literal: </span>
                  <Cmd>{exampleLiteral}</Cmd>
                </div>
                <div>
                  <span className="text-white/70">Newlines and tabs: </span>
                  <Cmd>{"Hello\\nWorld\\t!"}</Cmd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaScriptEscape;


