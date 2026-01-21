"use client";

import React, { useMemo, useState } from "react";

type DiffOp = "equal" | "insert" | "delete";
interface DiffChunk { op: DiffOp; text: string }

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

// Word-level diff for inline highlighting of added text only (relative to left)
interface WordPart { text: string; op: "equal" | "add" | "remove" }
const diffWords = (a: string, b: string): WordPart[] => {
  const aTokens = a.split(/(\s+)/); // keep spaces
  const bTokens = b.split(/(\s+)/);
  const n = aTokens.length, m = bTokens.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = n - 2; i >= 0; i -= 1) {
    for (let j = m - 2; j >= 0; j -= 1) {
      if (aTokens[i] === bTokens[j]) dp[i][j] = 1 + dp[i + 1][j + 1];
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const parts: WordPart[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (aTokens[i] === bTokens[j]) { parts.push({ text: aTokens[i], op: "equal" }); i++; j++; }
    else if (dp[i + 1]?.[j] >= dp[i]?.[j + 1]) { parts.push({ text: aTokens[i], op: "remove" }); i++; }
    else { parts.push({ text: bTokens[j], op: "add" }); j++; }
  }
  while (j < m) { parts.push({ text: bTokens[j], op: "add" }); j++; }
  while (i < n) { parts.push({ text: aTokens[i], op: "remove" }); i++; }
  return parts;
};

const renderUnified = (leftText: string, rightText: string) => {
  const lLines = leftText.split(/\r?\n/);
  const rLines = rightText.split(/\r?\n/);
  const rows = Math.max(lLines.length, rLines.length);
  return (
    <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-80">
      {Array.from({ length: rows }).map((_, idx) => {
        const a = lLines[idx] ?? "";
        const b = rLines[idx] ?? "";
        if (a === b) return <div key={idx} className="whitespace-pre-wrap text-white">{b || "\u00A0"}</div>;
        const parts = diffWords(a, b);
        return (
          <div key={idx} className="whitespace-pre-wrap">
            {parts.map((p, i) => (
              <span key={i} className={p.op === "add" ? "bg-primary/30 text-primary" : p.op === "remove" ? "opacity-50" : "text-white"}>{p.text}</span>
            ))}
          </div>
        );
      })}
    </pre>
  );
};

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

const TextCompare = () => {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [view, setView] = useState<"side" | "unified">("unified");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [compared, setCompared] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalize = (s: string) => {
    let out = s;
    if (ignoreWhitespace) out = out.replace(/[\t ]+/g, " ").replace(/\s*\n\s*/g, "\n");
    if (ignoreCase) out = out.toLowerCase();
    return out;
  };

  const chunks = useMemo(() => computeDiff(normalize(left), normalize(right)), [left, right, ignoreCase, ignoreWhitespace]);

  const onCompare = () => {
    if (!left.trim() || !right.trim()) { setError("Please provide both inputs."); setCompared(false); return; }
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
                    <input id="left-upload-txt" type="file" accept=".txt,.md,.log" className="hidden" onChange={handleUpload("left")} />
                    <label htmlFor="left-upload-txt" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setLeft("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={left} onChange={(e) => setLeft(e.target.value)} placeholder="Paste left text..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Right */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Right</h2>
                  <div className="flex gap-2">
                    <input id="right-upload-txt" type="file" accept=".txt,.md,.log" className="hidden" onChange={handleUpload("right")} />
                    <label htmlFor="right-upload-txt" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setRight("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={right} onChange={(e) => setRight(e.target.value)} placeholder="Paste right text..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <label className="text-sm">View:</label>
                <select value={view} onChange={(e) => setView(e.target.value as any)} className="px-2 py-1 bg-black/90 border border-white/20 rounded text-white text-sm">
                  <option value="side">Side by side</option>
                  <option value="unified">Unified</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input id="ignoreCaseTxt" type="checkbox" className="accent-primary" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} />
                <label htmlFor="ignoreCaseTxt" className="text-sm">Ignore case</label>
              </div>
              <div className="flex items-center gap-2">
                <input id="ignoreWsTxt" type="checkbox" className="accent-primary" checked={ignoreWhitespace} onChange={(e) => setIgnoreWhitespace(e.target.checked)} />
                <label htmlFor="ignoreWsTxt" className="text-sm">Ignore whitespace</label>
              </div>
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setLeft(""); setRight(""); setCompared(false); }} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                <button onClick={onCompare} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Compare</button>
              </div>
            </div>

            {/* Diff */}
            {error && <div className="mt-3 p-3 rounded-lg bg-red/30 border border-red/50 text-red text-sm">{error}</div>}
            {compared && !error && (
              <div className="border-t border-white/10 pt-6">
                {view === "unified" ? renderUnified(normalize(left), normalize(right)) : renderSideBySide(chunks)}
              </div>
            )}

            {/* Actions */}
            {compared && !error && (
              <div className="border-t border-white/10 pt-6">
                <div className="flex justify-center gap-3">
                  <button onClick={() => copy(`${left}\n\n---\n\n${right}`)} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Copy</button>
                  <button onClick={() => download(`${left}\n\n---\n\n${right}`, "text-comparison.txt")} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Download</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCompare