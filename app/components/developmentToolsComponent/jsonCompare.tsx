"use client";

import React, { useMemo, useState } from "react";

type ChangeType = "added" | "removed" | "modified";
interface ChangeItem { path: string; type: ChangeType; left?: any; right?: any }

const isObject = (v: any) => v && typeof v === "object" && !Array.isArray(v);

const diffJson = (left: any, right: any, basePath = ""): ChangeItem[] => {
  const changes: ChangeItem[] = [];
  if (left === right) return changes;
  if (!isObject(left) || !isObject(right)) {
    changes.push({ path: basePath || "$", type: "modified", left, right });
    return changes;
  }
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
  keys.forEach((key) => {
    const path = basePath ? `${basePath}.${key}` : key;
    if (!(key in right)) changes.push({ path, type: "removed", left: left[key] });
    else if (!(key in left)) changes.push({ path, type: "added", right: right[key] });
    else changes.push(...diffJson(left[key], right[key], path));
  });
  return changes;
};

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

const JSONCompare = () => {
  const [left, setLeft] = useState("{\n  \"name\": \"Alice\",\n  \"age\": 30\n}");
  const [right, setRight] = useState("{\n  \"name\": \"Alice\",\n  \"age\": 31,\n  \"city\": \"NYC\"\n}");
  const [error, setError] = useState<string | null>(null);
  const [compared, setCompared] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreOrder, setIgnoreOrder] = useState(false);

  const parseJson = (text: string) => {
    const normalized = ignoreCase ? text.replace(/"([^"]+)"\s*:/g, (_m, k) => `"${String(k).toLowerCase()}":`) : text;
    const obj = JSON.parse(normalized);
    if (ignoreOrder && Array.isArray(obj)) return [...obj].sort();
    return obj;
  };

  const result = useMemo(() => {
    try {
      const l = parseJson(left);
      const r = parseJson(right);
      const changes = diffJson(l, r);
      const summary = {
        added: changes.filter(c => c.type === "added").length,
        removed: changes.filter(c => c.type === "removed").length,
        modified: changes.filter(c => c.type === "modified").length,
      };
      setError(null); return { changes, summary };
    } catch (e: any) {
      return { changes: [], summary: { added: 0, removed: 0, modified: 0 }, error: e?.message || "Invalid JSON" };
    }
  }, [left, right, ignoreCase, ignoreOrder]);

  const prettyLeft = useMemo(() => {
    try { return JSON.stringify(parseJson(left), null, 2); } catch { return left; }
  }, [left, ignoreCase, ignoreOrder]);
  const prettyRight = useMemo(() => {
    try { return JSON.stringify(parseJson(right), null, 2); } catch { return right; }
    }, [right, ignoreCase, ignoreOrder]);
  const chunks = useMemo(() => computeDiff(prettyLeft, prettyRight), [prettyLeft, prettyRight]);
  const [view, setView] = useState<"side" | "unified">("side");

  const onCompare = () => {
    try {
      parseJson(left); parseJson(right); setCompared(true); setError(null);
    } catch (e: any) { setError(e?.message || "Invalid JSON"); setCompared(false); }
  };

  const handleUpload = (side: "left" | "right") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader();
    reader.onload = (ev) => { const content = String(ev.target?.result || ""); side === "left" ? setLeft(content) : setRight(content); };
    reader.readAsText(file);
  };

  const copy = (text: string) => navigator.clipboard.writeText(text);
  const download = (content: string, name: string) => { const blob = new Blob([content], { type: "text/plain" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = name; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url); };

  const reportText = useMemo(() => {
    const lines = result.changes.map(c => `${c.type.toUpperCase()} ${c.path} ${c.type === "modified" ? `(${JSON.stringify(c.left)} -> ${JSON.stringify(c.right)})` : JSON.stringify(c.left ?? c.right)}`);
    return lines.join("\n");
  }, [result]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Left JSON</h2>
                  <div className="flex gap-2">
                    <input id="left-json-upload" type="file" accept=".json,.txt" className="hidden" onChange={handleUpload("left")} />
                    <label htmlFor="left-json-upload" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setLeft("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={left} onChange={(e) => setLeft(e.target.value)} placeholder="Paste left JSON..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Right */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Right JSON</h2>
                  <div className="flex gap-2">
                    <input id="right-json-upload" type="file" accept=".json,.txt" className="hidden" onChange={handleUpload("right")} />
                    <label htmlFor="right-json-upload" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setRight("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={right} onChange={(e) => setRight(e.target.value)} placeholder="Paste right JSON..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>
              {compared && !error && (
                <div className="lg:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-white/80">Comparison (Left vs Right)</h3>
                    <div className="flex items-center gap-2">
                      <label className="text-sm">View:</label>
                      <select value={view} onChange={(e) => setView(e.target.value as any)} className="px-2 py-1 bg-black/90 border border-white/20 rounded text-white text-sm">
                        <option value="side">Side by side</option>
                        <option value="unified">Unified</option>
                      </select>
                    </div>
                  </div>
                  <div className="bg-black/20 border border-white/20 rounded-lg p-3">
                    {view === "unified" ? renderUnified(chunks) : renderSideBySide(chunks)}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <input id="ignoreCase" type="checkbox" className="accent-primary" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} />
                <label htmlFor="ignoreCase" className="text-sm">Ignore key case</label>
              </div>
              <div className="flex items-center gap-2">
                <input id="ignoreOrder" type="checkbox" className="accent-primary" checked={ignoreOrder} onChange={(e) => setIgnoreOrder(e.target.checked)} />
                <label htmlFor="ignoreOrder" className="text-sm">Ignore array order</label>
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
                Summary: <span className="text-primary/40 font-semibold">{result.summary.added} added</span>, <span className="text-red/40 font-semibold">{result.summary.removed} removed</span>, <span className="text-blue-400 font-semibold">{result.summary.modified} modified</span>
              </div>
            )}

            {/* Changes */}
            {compared && !error && (
              <div className="border-t border-white/10 pt-6 space-y-2">
                {result.changes.length === 0 ? (
                  <div className="text-sm text-gray-300">No differences found.</div>
                ) : (
                  result.changes.map((c, i) => (
                    <div key={i} className={`p-3 rounded-lg text-sm font-mono border ${c.type === "added" ? "bg-primary/20 border-primary/40" : c.type === "removed" ? "bg-red/20 border-red/40" : "bg-black/20 border-white/20"}`}>
                      <span className="font-semibold mr-2">{c.type.toUpperCase()}</span>
                      <span className="text-white/90">{c.path}</span>
                      {c.type === "modified" && (
                        <span className="ml-2 text-white/70">({JSON.stringify(c.left)} → {JSON.stringify(c.right)})</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-center gap-3">
                <button onClick={() => copy(reportText)} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Copy</button>
                <button onClick={() => download(reportText, "json-diff.txt")} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Download</button>
              </div>
            </div>

            {/* Visual Diff removed (now shown under each column) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONCompare