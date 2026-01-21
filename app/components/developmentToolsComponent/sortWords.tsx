"use client";

import React, { useMemo, useRef, useState } from "react";

type Order = "asc" | "desc";
type Mode = "alphabetic" | "length" | "numeric";

const tokenizeWords = (text: string, keepPunctuation: boolean): string[] => {
  const arr = keepPunctuation
    ? (text.match(/\S+/g) ?? [])
    : (text.match(/[A-Za-z0-9_'\-]+/g) ?? []);
  return arr.map(String);
};

const SortWords: React.FC = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("alphabetic");
  const [order, setOrder] = useState<Order>("asc");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [uniqueOnly, setUniqueOnly] = useState(true);
  const [keepPunctuation, setKeepPunctuation] = useState(false);
  const [delimiter, setDelimiter] = useState("\n");
  const [output, setOutput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const stats = useMemo(() => ({
    words: (input.trim().match(/\S+/g) || []).length,
    characters: input.length,
  }), [input]);

  type WordRec = { raw: string; cmp: string };

  const sortNow = () => {
    let words: WordRec[] = tokenizeWords(input, keepPunctuation).map((w) => ({ raw: w, cmp: caseSensitive ? w : w.toLowerCase() }));

    if (uniqueOnly) {
      const seen = new Set<string>();
      words = words.filter((w) => (seen.has(w.cmp) ? false : (seen.add(w.cmp), true)));
    }

    words.sort((a: WordRec, b: WordRec) => {
      if (mode === "length") {
        const d = a.cmp.length - b.cmp.length;
        return order === "asc" ? d : -d;
      }
      if (mode === "numeric") {
        const an = parseFloat(a.cmp);
        const bn = parseFloat(b.cmp);
        const d = (isNaN(an) ? 0 : an) - (isNaN(bn) ? 0 : bn);
        return order === "asc" ? d : -d;
      }
      const d = a.cmp.localeCompare(b.cmp);
      return order === "asc" ? d : -d;
    });

    const result = words.map((w) => w.raw).join(delimiter === "\\n" ? "\n" : delimiter);
    setOutput(result);
  };

  const onCopy = async () => { try { await navigator.clipboard.writeText(output); } catch {} };
  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "sorted-words.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const onClear = () => { setInput(""); setOutput(""); };
  const onUploadClick = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            {/* Options */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span>Mode:</span>
                <select value={mode} onChange={(e) => setMode(e.target.value as Mode)} className="bg-black/40 border border-white/20 rounded px-2 py-1">
                  <option value="alphabetic">Alphabetic</option>
                  <option value="length">By Length</option>
                  <option value="numeric">Numeric</option>
                </select>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>Order:</span>
                <select value={order} onChange={(e) => setOrder(e.target.value as Order)} className="bg-black/40 border border-white/20 rounded px-2 py-1">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-primary" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
                Case sensitive
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-primary" checked={uniqueOnly} onChange={(e) => setUniqueOnly(e.target.checked)} />
                Unique only
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-primary" checked={keepPunctuation} onChange={(e) => setKeepPunctuation(e.target.checked)} />
                Keep punctuation
              </label>
              <div className="flex items-center gap-2 text-sm">
                <span>Join with:</span>
                <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)} className="bg-black/40 border border-white/20 rounded px-2 py-1">
                  <option value="\n">New line</option>
                  <option value=", ">Comma</option>
                  <option value=" ">Space</option>
                  <option value="; ">Semicolon</option>
                </select>
              </div>
            </div>

            {/* Input and Output Side by Side */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Text Input</label>
                  <div className="flex items-center gap-2">
                    <input type="file" accept=".txt,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
                    <button onClick={onUploadClick} className="px-4 py-2 bg-primary hover:bg-primary/70 text-black font-bold rounded-lg text-sm transition-colors">Upload</button>
                    <button onClick={() => setInput("")} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={"Paste or type words here..."} className="w-full h-48 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Output */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Sorted Words</label>
                  <div className="flex items-center gap-2">
                    <button onClick={onCopy} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold text-sm">Copy</button>
                    <button onClick={onDownload} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold text-sm">Download</button>
                    <button onClick={onClear} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold text-sm">Clear</button>
                  </div>
                </div>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-48">{output}</pre>
              </div>
            </div>

            {/* Sort */}
            <div className="flex justify-center">
              <button onClick={sortNow} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold text-sm">Sort</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortWords;


