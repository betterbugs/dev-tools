"use client";

import React, { useMemo, useState } from "react";

const TextRepeater = () => {
  const [input, setInput] = useState("");
  const [count, setCount] = useState<number>(5);
  const [delimiter, setDelimiter] = useState<string>("\n");
  const [prefix, setPrefix] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("");
  const [numbering, setNumbering] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(1);
  const [trim, setTrim] = useState<boolean>(true);
  const [removeBlankLines, setRemoveBlankLines] = useState<boolean>(true);
  const [caseTransform, setCaseTransform] = useState<"none" | "upper" | "lower" | "title">("none");

  const transformCase = (text: string) => {
    if (caseTransform === "upper") return text.toUpperCase();
    if (caseTransform === "lower") return text.toLowerCase();
    if (caseTransform === "title") return text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
    return text;
  };

  const output = useMemo(() => {
    let base = input;
    if (trim) base = base.trim();
    if (removeBlankLines) base = base.replace(/^(?:\s*\n)+|(?:\n\s*)+$/g, "");
    base = transformCase(base);

    const items: string[] = [];
    for (let i = 0; i < Math.max(0, count); i++) {
      const idx = numbering ? `${startIndex + i}. ` : "";
      items.push(`${prefix}${idx}${base}${suffix}`);
    }
    let delim = delimiter;
    if (delim === "\\n") delim = "\n";
    if (delim === "\\t") delim = "\t";
    return items.join(delim);
  }, [input, count, delimiter, prefix, suffix, numbering, startIndex, trim, removeBlankLines, caseTransform]);

  const stats = useMemo(() => {
    const lines = output ? output.split(/\r?\n/).length : 0;
    const chars = output.length;
    return { lines, chars };
  }, [output]);

  const copy = () => navigator.clipboard.writeText(output);
  const download = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "repeated.txt";
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
    setCount(5);
    setDelimiter("\n");
    setPrefix("");
    setSuffix("");
    setNumbering(false);
    setStartIndex(1);
    setTrim(true);
    setRemoveBlankLines(true);
    setCaseTransform("none");
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
                  <h2 className="text-xl font-semibold">Text</h2>
                  <div className="flex gap-2">
                    <input id="text-upload" type="file" accept=".txt,.md,.log" className="hidden" onChange={handleUpload} />
                    <label htmlFor="text-upload" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                    <button onClick={() => setInput("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Options */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Options</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm">Repeat Count</label>
                    <input type="number" min={0} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Delimiter</label>
                    <input value={delimiter} onChange={(e) => setDelimiter(e.target.value)} placeholder="\n, , |, \t" className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Prefix</label>
                    <input value={prefix} onChange={(e) => setPrefix(e.target.value)} className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Suffix</label>
                    <input value={suffix} onChange={(e) => setSuffix(e.target.value)} className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input id="numbering" type="checkbox" className="accent-primary" checked={numbering} onChange={(e) => setNumbering(e.target.checked)} />
                    <label htmlFor="numbering" className="text-sm">Number items</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Start</label>
                    <input type="number" value={startIndex} onChange={(e) => setStartIndex(Number(e.target.value))} className="w-20 px-2 py-1 bg-black/90 border border-white/20 rounded text-white text-sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="trim" type="checkbox" className="accent-primary" checked={trim} onChange={(e) => setTrim(e.target.checked)} />
                    <label htmlFor="trim" className="text-sm">Trim</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input id="rmblank" type="checkbox" className="accent-primary" checked={removeBlankLines} onChange={(e) => setRemoveBlankLines(e.target.checked)} />
                    <label htmlFor="rmblank" className="text-sm">Remove blank lines</label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm">Case</label>
                  <select value={caseTransform} onChange={(e) => setCaseTransform(e.target.value as any)} className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm">
                    <option value="none">None</option>
                    <option value="upper">UPPERCASE</option>
                    <option value="lower">lowercase</option>
                    <option value="title">Title Case</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="border-t border-white/10 pt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Preview</h2>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-black/20 px-3 py-1 rounded">
                    <span className="text-blue-400 font-semibold">{stats.lines}</span>
                    <span className="ml-1 text-gray-300">lines</span>
                  </div>
                  <div className="bg-black/20 px-3 py-1 rounded">
                    <span className="text-purple-400 font-semibold">{stats.chars}</span>
                    <span className="ml-1 text-gray-300">chars</span>
                  </div>
                  <div className="bg-black/20 px-3 py-1 rounded">
                    <span className="text-green-400 font-semibold">{Math.max(0, count)}</span>
                    <span className="ml-1 text-gray-300">repeats</span>
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

export default TextRepeater;