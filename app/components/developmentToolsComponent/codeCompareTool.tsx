"use client";

import React, { useMemo, useState } from "react";

type DiffOp = "equal" | "insert" | "delete";

interface DiffChunk { op: DiffOp; text: string; }

const computeDiff = (a: string, b: string): DiffChunk[] => {
  const aLines = a.split(/\r?\n/);
  const bLines = b.split(/\r?\n/);
  const n = aLines.length, m = bLines.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = aLines[i] === bLines[j] ? 1 + dp[i + 1][j + 1] : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const chunks: DiffChunk[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (aLines[i] === bLines[j]) { chunks.push({ op: "equal", text: aLines[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { chunks.push({ op: "delete", text: aLines[i++] }); }
    else { chunks.push({ op: "insert", text: bLines[j++] }); }
  }
  while (i < n) chunks.push({ op: "delete", text: aLines[i++] });
  while (j < m) chunks.push({ op: "insert", text: bLines[j++] });
  return chunks;
};

const renderUnified = (chunks: DiffChunk[]) => (
  <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-80">
    {chunks.map((c, idx) => {
      const prefix = c.op === "equal" ? "  " : c.op === "insert" ? "+ " : "- ";
      const color = c.op === "equal" ? "text-white" : c.op === "insert" ? "text-primary" : "text-white/60";
      const bg = c.op === "equal" ? "" : c.op === "insert" ? "bg-primary/20" : "bg-red/20";
      return <div key={idx} className={`${bg} whitespace-pre-wrap`}><span className={`${color}`}>{prefix}{c.text}</span></div>;
    })}
  </pre>
);

const renderSideBySide = (chunks: DiffChunk[]) => {
  const left: string[] = [], right: string[] = [];
  chunks.forEach((c) => {
    if (c.op === "equal") { left.push(c.text); right.push(c.text); }
    else if (c.op === "delete") { left.push(c.text); right.push(""); }
    else { left.push(""); right.push(c.text); }
  });
  const maxLen = Math.max(left.length, right.length);
  while (left.length < maxLen) left.push("");
  while (right.length < maxLen) right.push("");
  return (
    <div className="grid grid-cols-2 gap-4 h-80">
      <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20">
        {left.map((line, idx) => (<div key={idx} className={`${line === "" ? "bg-red/20" : ""} whitespace-pre-wrap`}>{line || "\u00A0"}</div>))}
      </pre>
      <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20">
        {right.map((line, idx) => (<div key={idx} className={`${line === "" ? "bg-primary/20" : ""} whitespace-pre-wrap`}>{line || "\u00A0"}</div>))}
      </pre>
    </div>
  );
};

const CodeCompareTool = () => {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [view, setView] = useState<"side" | "unified">("side");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [lang, setLang] = useState("auto");
  const [compared, setCompared] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalize = (s: string) => {
    let out = s;
    if (ignoreWhitespace) out = out.replace(/[\t ]+/g, " ").replace(/\s*\n\s*/g, "\n");
    if (ignoreCase) out = out.toLowerCase();
    return out;
  };

  const chunks = useMemo(() => computeDiff(normalize(left), normalize(right)), [left, right, ignoreCase, ignoreWhitespace]);
  const stats = useMemo(() => {
    let added = 0, removed = 0, equal = 0; chunks.forEach(c => { if (c.op === "insert") added++; else if (c.op === "delete") removed++; else equal++; });
    return { added, removed, equal };
  }, [chunks]);

  const onCompare = () => {
    if (!left.trim() || !right.trim()) { setError("Please provide both code inputs."); setCompared(false); return; }
    setError(null); setCompared(true);
  };

  const handleUpload = (side: "left" | "right") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader();
    reader.onload = (ev) => { const content = String(ev.target?.result || ""); side === "left" ? setLeft(content) : setRight(content); };
    reader.readAsText(file);
  };

  const copy = (text: string) => navigator.clipboard.writeText(text);
  const download = (content: string, name: string) => { const blob = new Blob([content], { type: "text/plain" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Left</h2>
                  <div className="flex gap-2">
                    <input id="upload-left" type="file" className="hidden" onChange={handleUpload("left")} />
                    <label htmlFor="upload-left" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setLeft("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={left} onChange={(e) => setLeft(e.target.value)} placeholder="Paste left code..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Right */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Right</h2>
                  <div className="flex gap-2">
                    <input id="upload-right" type="file" className="hidden" onChange={handleUpload("right")} />
                    <label htmlFor="upload-right" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setRight("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={right} onChange={(e) => setRight(e.target.value)} placeholder="Paste right code..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <label className="text-sm">Language:</label>
                <select value={lang} onChange={(e) => setLang(e.target.value)} className="px-2 py-1 bg-black/90 border border-white/20 rounded text-white text-sm">
                  <option value="auto">Auto</option>
                  <option value="js">JavaScript</option>
                  <option value="ts">TypeScript</option>
                  <option value="json">JSON</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="py">Python</option>
                  <option value="java">Java</option>
                  <option value="go">Go</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input id="ignoreCase" type="checkbox" className="accent-primary" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} />
                <label htmlFor="ignoreCase" className="text-sm">Ignore case</label>
              </div>
              <div className="flex items-center gap-2">
                <input id="ignoreWs" type="checkbox" className="accent-primary" checked={ignoreWhitespace} onChange={(e) => setIgnoreWhitespace(e.target.checked)} />
                <label htmlFor="ignoreWs" className="text-sm">Ignore whitespace</label>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm">View:</label>
                <select value={view} onChange={(e) => setView(e.target.value as any)} className="px-2 py-1 bg-black/90 border border-white/20 rounded text-white text-sm">
                  <option value="side">Side by side</option>
                  <option value="unified">Unified</option>
                </select>
              </div>
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setLeft(""); setRight(""); setCompared(false); }} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                <button onClick={onCompare} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Compare</button>
              </div>
            </div>

            {/* Status */}
            {error && <div className="mt-3 p-3 rounded-lg bg-red/30 border border-red/50 text-red text-sm">{error}</div>}
            {compared && !error && (
              <div className="mt-3 p-3 rounded-lg bg-white/10 border border-white/20 text-white/90 text-sm">
                Summary: <span className="text-primary/40 font-semibold">{stats.added} added</span>, <span className="text-red/40 font-semibold">{stats.removed} removed</span>, <span className="text-blue-400 font-semibold">{stats.equal} unchanged</span>
              </div>
            )}

            {/* Diff */}
            <div className="border-t border-white/10 pt-6">
              {view === "unified" ? renderUnified(chunks) : renderSideBySide(chunks)}
            </div>

            {/* Actions */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-center gap-3">
                <button onClick={() => copy(`${left}\n\n---\n\n${right}`)} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Copy</button>
                <button onClick={() => { const combined = `${left}\n\n---\n\n${right}`; download(combined, "comparison.txt"); }} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeCompareTool