"use client";

import React, { useEffect, useRef, useState } from "react";

const toOneLine = (
  text: string,
  opts: {
    collapseWhitespace: boolean;
    keepSingleSpaces: boolean;
    trim: boolean;
    delimiter: string;
  }
): string => {
  let result = text.replace(/\r?\n/g, opts.delimiter);
  if (opts.trim) result = result.trim();
  if (opts.collapseWhitespace) {
    result = result.replace(/\s+/g, " ");
  }
  if (opts.keepSingleSpaces) {
    // Ensure multiple spaces are reduced to one
    result = result.replace(/ {2,}/g, " ");
  }
  return result;
};

const TextToOneLine: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [collapseWhitespace, setCollapseWhitespace] = useState(true);
  const [keepSingleSpaces, setKeepSingleSpaces] = useState(true);
  const [trim, setTrim] = useState(true);
  const [delimiter, setDelimiter] = useState(" ");
  const fileRef = useRef<HTMLInputElement>(null);

  const convert = () => {
    setOutput(
      toOneLine(input, {
        collapseWhitespace,
        keepSingleSpaces,
        trim,
        delimiter,
      })
    );
  };

  useEffect(() => {
    if (autoUpdate) convert();
  }, [
    input,
    autoUpdate,
    collapseWhitespace,
    keepSingleSpaces,
    trim,
    delimiter,
  ]);

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
    a.download = "text-to-one-line.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const onClear = () => {
    setInput("");
    setOutput("");
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
            {/* Options */}
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
                  checked={collapseWhitespace}
                  onChange={(e) => setCollapseWhitespace(e.target.checked)}
                />
                Collapse Whitespace
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={keepSingleSpaces}
                  onChange={(e) => setKeepSingleSpaces(e.target.checked)}
                />
                Keep Single Spaces
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={trim}
                  onChange={(e) => setTrim(e.target.checked)}
                />
                Trim Ends
              </label>
              <div className="flex items-center gap-2">
                <span>Join with:</span>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="bg-black/40 border border-white/20 rounded px-2 py-1"
                >
                  <option value=" ">Space</option>
                  <option value=", ">Comma</option>
                  <option value="; ">Semicolon</option>
                  <option value="">Nothing</option>
                </select>
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

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input</label>
                  <button
                    onClick={convert}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Convert
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste or type multi-line text here..."
                  className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Right: Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Output</label>
                  <div className="flex items-center gap-2">
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
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">
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

export default TextToOneLine;
