"use client";

import React, { useMemo, useState } from "react";

type Mode = "lex" | "numeric" | "length";

const SortingList = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("lex");
  const [ascending, setAscending] = useState(true);
  const [delimiter, setDelimiter] = useState<string>("\n");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trim, setTrim] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);

  const parsed = useMemo(() => {
    let text = input;
    if (trim) text = text.trim();
    let delim = delimiter;
    if (delim === "\\n") delim = "\n";
    if (delim === "\\t") delim = "\t";
    const items = text.length ? text.split(delim) : [];
    const normalized = items.map((s) => (trim ? s.trim() : s));
    const filtered = removeEmpty ? normalized.filter((s) => s.length > 0) : normalized;
    const unique = removeDuplicates ? Array.from(new Set(filtered)) : filtered;
    return unique;
  }, [input, delimiter, trim, removeEmpty, removeDuplicates]);

  const sorted = useMemo(() => {
    const arr = [...parsed];
    const collator = new Intl.Collator(undefined, { sensitivity: caseSensitive ? "variant" : "base", numeric: false });
    arr.sort((a, b) => {
      if (mode === "numeric") {
        const na = parseFloat(a);
        const nb = parseFloat(b);
        const ca = isNaN(na) ? Number.NEGATIVE_INFINITY : na;
        const cb = isNaN(nb) ? Number.NEGATIVE_INFINITY : nb;
        return ca - cb;
      }
      if (mode === "length") {
        if (a.length !== b.length) return a.length - b.length;
        return collator.compare(a, b);
      }
      return collator.compare(a, b);
    });
    if (!ascending) arr.reverse();
    return arr;
  }, [parsed, mode, ascending, caseSensitive]);

  const output = useMemo(() => {
    let delim = delimiter;
    if (delim === "\\n") delim = "\n";
    if (delim === "\\t") delim = "\t";
    return sorted.join(delim);
  }, [sorted, delimiter]);

  const stats = useMemo(() => ({ total: parsed.length, unique: new Set(parsed).size }), [parsed]);

  const copy = () => navigator.clipboard.writeText(output);
  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sorted.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result || ""));
    reader.readAsText(file);
  };

  const clearAll = () => {
    setInput("");
    setMode("lex");
    setAscending(true);
    setDelimiter("\n");
    setCaseSensitive(false);
    setTrim(true);
    setRemoveEmpty(true);
    setRemoveDuplicates(true);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">List</h2>
                  <div className="flex gap-2">
                    <input id="list-upload" type="file" accept=".txt,.md,.log,.csv" className="hidden" onChange={handleUpload} />
                    <label htmlFor="list-upload" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setInput("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="One item per line (or custom delimiter)" className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Options */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Options</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm">Mode</label>
                    <select value={mode} onChange={(e) => setMode(e.target.value as any)} className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm">
                      <option value="lex">Lexicographic</option>
                      <option value="numeric">Numeric</option>
                      <option value="length">By Length</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Order</label>
                    <select value={ascending ? "asc" : "desc"} onChange={(e) => setAscending(e.target.value === "asc")} className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm">
                      <option value="asc">Ascending (A → Z)</option>
                      <option value="desc">Descending (Z → A)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Delimiter</label>
                    <input value={delimiter} onChange={(e) => setDelimiter(e.target.value)} placeholder="\n, , |, \t" className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input id="case" type="checkbox" className="accent-primary" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
                    <label htmlFor="case" className="text-sm">Case sensitive</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="trim" type="checkbox" className="accent-primary" checked={trim} onChange={(e) => setTrim(e.target.checked)} />
                    <label htmlFor="trim" className="text-sm">Trim</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="rmempty" type="checkbox" className="accent-primary" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} />
                    <label htmlFor="rmempty" className="text-sm">Remove empty</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="rmdup" type="checkbox" className="accent-primary" checked={removeDuplicates} onChange={(e) => setRemoveDuplicates(e.target.checked)} />
                    <label htmlFor="rmdup" className="text-sm">Remove duplicates</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="border-t border-white/10 pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Preview</h2>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-black/20 px-3 py-1 rounded">
                    <span className="text-blue-400 font-semibold">{stats.total}</span>
                    <span className="ml-1 text-gray-300">total</span>
                  </div>
                  <div className="bg-black/20 px-3 py-1 rounded">
                    <span className="text-green-400 font-semibold">{stats.unique}</span>
                    <span className="ml-1 text-gray-300">unique</span>
                  </div>
                </div>
              </div>
              <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">{output}</pre>
            </div>

            {/* Actions */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-center gap-3">
                <button onClick={copy} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Copy</button>
                <button onClick={download} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Download</button>
                <button onClick={clearAll} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold">Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingList;