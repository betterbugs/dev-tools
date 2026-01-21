"use client";
import React, { useMemo, useState } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">{children}</code>
);

const xmlEscapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

const escapeXML = (input: string): string =>
  input.replace(/[&<>"']/g, (ch) => xmlEscapeMap[ch]);

const unescapeXML = (input: string): string =>
  input
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");

const XMLEscape = () => {
  const [raw, setRaw] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");

  const output = useMemo(() => (mode === "escape" ? escapeXML(raw) : unescapeXML(raw)), [raw, mode]);
  const copy = async (text: string) => { try { await navigator.clipboard.writeText(text); } catch {} };
  const clear = () => setRaw("");

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[900px] mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">XML Escape</h1>
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
                <textarea value={raw} onChange={(e) => setRaw(e.target.value)} className="w-full h-48 p-3 bg-black/40 border border-white/10 rounded font-mono text-sm" placeholder={mode === "escape" ? "Paste raw text to escape for XML..." : "Paste escaped XML to unescape..."} />
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
                  <span className="text-white/70">Escaped: </span>
                  <Cmd>&amp;lt;node attr=&quot;value&quot;&amp;gt;content&amp;lt;/node&amp;gt;</Cmd>
                </div>
                <div>
                  <span className="text-white/70">Unescaped: </span>
                  <Cmd>{"<node attr=\"value\">content</node>"}</Cmd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XMLEscape;


