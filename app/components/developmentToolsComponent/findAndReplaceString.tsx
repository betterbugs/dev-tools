"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Flags = {
  global: boolean;
  caseInsensitive: boolean;
  multiline: boolean;
  dotAll: boolean;
};

function escapeRegexLiteral(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildRegex(pattern: string, useRegex: boolean, wholeWord: boolean, flags: Flags): RegExp | null {
  try {
    const src = useRegex ? pattern : escapeRegexLiteral(pattern);
    const wrapped = wholeWord ? `\\b${src}\\b` : src;
    let f = "";
    if (flags.global) f += "g";
    if (flags.caseInsensitive) f += "i";
    if (flags.multiline) f += "m";
    if (flags.dotAll) f += "s";
    return new RegExp(wrapped, f || undefined);
  } catch {
    return null;
  }
}

function replaceAll(
  input: string,
  findPattern: string,
  replacement: string,
  options: {
    useRegex: boolean;
    wholeWord: boolean;
    flags: Flags;
  }
): { output: string; count: number; error?: string } {
  if (!findPattern) return { output: input, count: 0 };
  const rx = buildRegex(findPattern, options.useRegex, options.wholeWord, options.flags);
  if (!rx) return { output: "", count: 0, error: "Invalid regular expression" };

  let count = 0;
  const out = input.replace(rx, (...args) => {
    // When using regex, support $1… in replacement; otherwise simple replacement
    count++;
    return replacement;
  });
  // If not global, only one replacement occurs; to count all, run additional matches
  if (!options.flags.global) {
    const m = input.match(rx);
    count = m ? 1 : 0;
  }
  return { output: out, count };
}

const FindAndReplaceString: React.FC = () => {
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [output, setOutput] = useState("");
  const [count, setCount] = useState(0);

  const [autoUpdate, setAutoUpdate] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [flags, setFlags] = useState<Flags>({ global: true, caseInsensitive: false, multiline: false, dotAll: false });
  const [error, setError] = useState<string | undefined>(undefined);

  const fileRef = useRef<HTMLInputElement>(null);

  const run = () => {
    const res = replaceAll(input, find, replace, { useRegex, wholeWord, flags });
    setOutput(res.output);
    setCount(res.count);
    setError(res.error);
  };

  useEffect(() => {
    if (!autoUpdate) return;
    run();
  }, [input, find, replace, autoUpdate, useRegex, wholeWord, flags]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {}
  };

  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "find-replace.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onClear = () => {
    setInput("");
    setFind("");
    setReplace("");
    setOutput("");
    setCount(0);
    setError(undefined);
  };

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
          <div className="md:w-[950px] mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={autoUpdate}
                  onChange={(e) => setAutoUpdate(e.target.checked)}
                />
                Auto Update
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={useRegex}
                  onChange={(e) => setUseRegex(e.target.checked)}
                />
                Use RegExp
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={wholeWord}
                  onChange={(e) => setWholeWord(e.target.checked)}
                />
                Whole word (\b)
              </label>

              <div className="flex items-center gap-2">
                <span>Flags:</span>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={flags.global}
                    onChange={(e) => setFlags({ ...flags, global: e.target.checked })}
                  />
                  g
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={flags.caseInsensitive}
                    onChange={(e) => setFlags({ ...flags, caseInsensitive: e.target.checked })}
                  />
                  i
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={flags.multiline}
                    onChange={(e) => setFlags({ ...flags, multiline: e.target.checked })}
                  />
                  m
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={flags.dotAll}
                    onChange={(e) => setFlags({ ...flags, dotAll: e.target.checked })}
                  />
                  s
                </label>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <input
                  type="file"
                  accept=".txt,text/plain"
                  ref={fileRef}
                  onChange={onFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="grid grid-cols-1 gap-2">
                  <div className="grid md:grid-cols-2 gap-2">
                    <input
                      value={find}
                      onChange={(e) => setFind(e.target.value)}
                      placeholder={useRegex ? "Find (RegExp pattern)" : "Find (text)"}
                      className="w-full p-2 bg-black/20 border border-white/20 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <input
                      value={replace}
                      onChange={(e) => setReplace(e.target.value)}
                      placeholder={useRegex ? "Replace (supports $1, $&)" : "Replace"}
                      className="w-full p-2 bg-black/20 border border-white/20 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input</label>
                  <button
                    onClick={run}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Replace
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={"Paste or type your text here"}
                  className="w-full h-48 sm:h-56 md:h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-y focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-start justify-between md:gap-0 gap-4">
                  <label className="font-medium">Output</label>
                  <div className="flex flex-wrap items-center gap-2 md:justify-end justify-start">
                    <span className="text-xs text-white/70">{error ? error : `${count} replacement${count === 1 ? "" : "s"}`}</span>
                    <button
                      onClick={onCopy}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Copy
                    </button>
                    <button
                      onClick={onUploadClick}
                      className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors"
                    >
                      Upload
                    </button>
                    <button
                      onClick={onDownload}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Download
                    </button>
                    <button
                      onClick={onClear}
                      className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-48 sm:h-56 md:h-64">
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAndReplaceString;


