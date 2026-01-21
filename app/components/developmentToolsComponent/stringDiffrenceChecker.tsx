"use client";

import React, { useMemo, useState } from "react";

type DiffOp = "equal" | "insert" | "delete";

interface DiffChunk {
  op: DiffOp;
  text: string;
}

const computeDiff = (a: string, b: string): DiffChunk[] => {
  // Simple LCS-based diff for lines
  const aLines = a.split(/\r?\n/);
  const bLines = b.split(/\r?\n/);

  const n = aLines.length;
  const m = bLines.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (aLines[i] === bLines[j]) dp[i][j] = 1 + dp[i + 1][j + 1];
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const chunks: DiffChunk[] = [];
  let i = 0,
    j = 0;
  while (i < n && j < m) {
    if (aLines[i] === bLines[j]) {
      chunks.push({ op: "equal", text: aLines[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      chunks.push({ op: "delete", text: aLines[i] });
      i++;
    } else {
      chunks.push({ op: "insert", text: bLines[j] });
      j++;
    }
  }
  while (i < n) {
    chunks.push({ op: "delete", text: aLines[i++] });
  }
  while (j < m) {
    chunks.push({ op: "insert", text: bLines[j++] });
  }

  return chunks;
};

const renderUnified = (chunks: DiffChunk[]) => {
  return (
    <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-80">
      {chunks.map((c, idx) => {
        const prefix = c.op === "equal" ? "  " : c.op === "insert" ? "+ " : "- ";
        const color = c.op === "equal" ? "text-white" : c.op === "insert" ? "text-green-400" : "text-red-400";
        const bg = c.op === "equal" ? "" : c.op === "insert" ? "bg-green-900/20" : "bg-red-900/20";
        return (
          <div key={idx} className={`${bg} whitespace-pre-wrap`}>
            <span className={`${color}`}>{prefix}{c.text}</span>
          </div>
        );
      })}
    </pre>
  );
};

const renderSideBySide = (chunks: DiffChunk[]) => {
  const left: string[] = [];
  const right: string[] = [];
  chunks.forEach((c) => {
    if (c.op === "equal") {
      left.push(c.text);
      right.push(c.text);
    } else if (c.op === "delete") {
      left.push(c.text);
      right.push("");
    } else {
      left.push("");
      right.push(c.text);
    }
  });

  const maxLen = Math.max(left.length, right.length);
  while (left.length < maxLen) left.push("");
  while (right.length < maxLen) right.push("");

  return (
    <div className="grid grid-cols-2 gap-4 h-80">
      <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20">
        {left.map((line, idx) => (
          <div key={idx} className={`${line === "" ? "bg-red-900/20" : ""} whitespace-pre-wrap`}>
            {line || "\u00A0"}
          </div>
        ))}
      </pre>
      <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20">
        {right.map((line, idx) => (
          <div key={idx} className={`${line === "" ? "bg-green-900/20" : ""} whitespace-pre-wrap`}>
            {line || "\u00A0"}
          </div>
        ))}
      </pre>
    </div>
  );
};

const StringDiffrenceChecker = () => {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [view, setView] = useState<"side-by-side" | "unified">("side-by-side");
  const [compared, setCompared] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);

  const normalized = useMemo(() => {
    const normalize = (s: string) => {
      let out = s;
      if (ignoreWhitespace) out = out.replace(/[\t ]+/g, " ").replace(/\s*\n\s*/g, "\n");
      if (ignoreCase) out = out.toLowerCase();
      return out;
    };
    return { a: normalize(leftText), b: normalize(rightText) };
  }, [leftText, rightText, ignoreCase, ignoreWhitespace]);

  const chunks = useMemo(() => computeDiff(normalized.a, normalized.b), [normalized]);

  const stats = useMemo(() => {
    let added = 0, removed = 0, equal = 0;
    chunks.forEach((c) => {
      if (c.op === "insert") added++;
      else if (c.op === "delete") removed++;
      else equal++;
    });
    return { added, removed, equal, total: chunks.length };
  }, [chunks]);


  const handleUpload = (side: "left" | "right") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = String(ev.target?.result || "");
      if (side === "left") setLeftText(content);
      else setRightText(content);
    };
    reader.readAsText(file);
  };

  const swap = () => {
    setLeftText((l) => {
      const temp = rightText;
      setRightText(l);
      return temp;
    });
  };

  const copy = (text: string) => navigator.clipboard.writeText(text);

  const download = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onCompare = () => {
    if (!leftText.trim() || !rightText.trim()) {
      setCompareError("Please enter both strings to compare.");
      setCompared(false);
      return;
    }
    setCompareError(null);
    setCompared(true);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Left</h2>
                  </div>
                  <div className="flex gap-2">
                    <input id="left-upload" type="file" accept=".txt,.json,.md,.log" className="hidden" onChange={handleUpload("left")} />
                    <label htmlFor="left-upload" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setLeftText("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={leftText} onChange={(e) => setLeftText(e.target.value)} placeholder="Paste left text..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Right */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Right</h2>
                  </div>
                  <div className="flex gap-2">
                    <input id="right-upload" type="file" accept=".txt,.json,.md,.log" className="hidden" onChange={handleUpload("right")} />
                    <label htmlFor="right-upload" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setRightText("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={rightText} onChange={(e) => setRightText(e.target.value)} placeholder="Paste right text..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 mr-4">
                <input id="ignoreCase" type="checkbox" className="accent-primary" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} />
                <label htmlFor="ignoreCase" className="text-sm">Ignore case</label>
              </div>
              <div className="flex items-center gap-2 mr-4">
                <input id="ignoreWs" type="checkbox" className="accent-primary" checked={ignoreWhitespace} onChange={(e) => setIgnoreWhitespace(e.target.checked)} />
                <label htmlFor="ignoreWs" className="text-sm">Ignore whitespace</label>
              </div>
              <div className="flex items-center gap-2 mr-4">
                <label className="text-sm">View:</label>
                <select value={view} onChange={(e) => setView(e.target.value as any)} className="px-2 py-1 bg-black/90 border border-white/20 rounded text-white text-sm">
                  <option value="side-by-side">Side-by-side</option>
                  <option value="unified">Unified</option>
                </select>
              </div>
              <div className="ml-auto flex gap-2">
                <button onClick={() => { setLeftText(""); setRightText(""); }} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                <button onClick={swap} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Swap</button>
                <button onClick={onCompare} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Compare</button>
              </div>
            </div>

            {/* Validation / Status Banner */}
            <div>
              {compareError && (
                <div className="mt-3 p-3 rounded-lg bg-red/30 border border-red/50 text-red text-sm">{compareError}</div>
              )}
              {compared && !compareError && (
                leftText === rightText ? (
                  <div className="mt-3 p-3 rounded-lg bg-primary/30 border border-primary/50 text-primary text-sm">No differences found. The strings are identical.</div>
                ) : (
                  <div className="mt-3 p-3 rounded-lg bg-white/10 border border-white/20 text-white/90 text-sm">
                    Summary: <span className="text-green-400 font-semibold">{stats.added} added</span>, <span className="text-red-400 font-semibold">{stats.removed} removed</span>, <span className="text-blue-400 font-semibold">{stats.equal} unchanged</span>
                  </div>
                )
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-black/20 p-2 rounded">
                <div className="text-lg font-bold text-green-400">{stats.added}</div>
                <div className="text-xs text-gray-300">Added</div>
              </div>
              <div className="bg-black/20 p-2 rounded">
                <div className="text-lg font-bold text-red-400">{stats.removed}</div>
                <div className="text-xs text-gray-300">Removed</div>
              </div>
              <div className="bg-black/20 p-2 rounded">
                <div className="text-lg font-bold text-blue-400">{stats.equal}</div>
                <div className="text-xs text-gray-300">Equal</div>
              </div>
              <div className="bg-black/20 p-2 rounded">
                <div className="text-lg font-bold text-purple-400">{stats.total}</div>
                <div className="text-xs text-gray-300">Total</div>
              </div>
            </div>

            {/* Diff View */}
            <div className="border-t border-white/10 pt-6">
              {view === "unified" ? renderUnified(chunks) : renderSideBySide(chunks)}
            </div>

            {/* Actions */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => copy(`${leftText}\n\n---\n\n${rightText}`)}
                  className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold"
                >
                  Copy
                </button>
                <button
                  onClick={() => { download(leftText, "left.txt"); download(rightText, "right.txt"); }}
                  className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StringDiffrenceChecker;