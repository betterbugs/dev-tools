"use client";

import React, { useEffect, useRef, useState } from "react";

const removeSpacesConvert = (
  text: string,
  opts: {
    removeAllWhitespace: boolean;
    removeSpacesOnly: boolean;
    collapseMultipleSpaces: boolean;
    trimLines: boolean;
    removeEmptyLines: boolean;
  }
): string => {
  let result = text;

  if (opts.trimLines) {
    result = result
      .split(/\r?\n/)
      .map((l) => l.trim())
      .join("\n");
  }

  if (opts.removeAllWhitespace) {
    result = result.replace(/\s+/g, "");
  } else if (opts.removeSpacesOnly) {
    result = result.replace(/ +/g, "");
  } else if (opts.collapseMultipleSpaces) {
    result = result.replace(/ {2,}/g, " ");
  }

  if (opts.removeEmptyLines) {
    result = result
      .split(/\r?\n/)
      .filter((l) => l.length > 0)
      .join("\n");
  }

  return result;
};

const RemoveSpaces: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [removeAllWhitespace, setRemoveAllWhitespace] = useState(false);
  const [removeSpacesOnly, setRemoveSpacesOnly] = useState(true);
  const [collapseMultipleSpaces, setCollapseMultipleSpaces] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const doConvert = () => {
    const converted = removeSpacesConvert(input, {
      removeAllWhitespace,
      removeSpacesOnly,
      collapseMultipleSpaces,
      trimLines,
      removeEmptyLines,
    });
    setOutput(converted);
  };

  useEffect(() => {
    if (autoUpdate) doConvert();
  }, [input, autoUpdate, removeAllWhitespace, removeSpacesOnly, collapseMultipleSpaces, trimLines, removeEmptyLines]);

  const onCopy = async () => { try { await navigator.clipboard.writeText(output); } catch {} };
  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "remove-spaces.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
          <div className="md:w-[950px] mx-auto space-y-6">
            {/* Options */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                Auto Update
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={removeAllWhitespace} onChange={(e) => { setRemoveAllWhitespace(e.target.checked); if (e.target.checked) { setRemoveSpacesOnly(false); setCollapseMultipleSpaces(false); } }} />
                Remove All Whitespace
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={removeSpacesOnly} onChange={(e) => { setRemoveSpacesOnly(e.target.checked); if (e.target.checked) { setRemoveAllWhitespace(false); setCollapseMultipleSpaces(false); } }} />
                Remove Spaces Only
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={collapseMultipleSpaces} onChange={(e) => { setCollapseMultipleSpaces(e.target.checked); if (e.target.checked) { setRemoveAllWhitespace(false); setRemoveSpacesOnly(false); } }} />
                Collapse Multiple Spaces
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} />
                Trim Lines
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={removeEmptyLines} onChange={(e) => setRemoveEmptyLines(e.target.checked)} />
                Remove Empty Lines
              </label>
              <div className="ml-auto flex items-center gap-2">
                <input type="file" accept=".txt,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
                <button onClick={onUploadClick} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Upload</button>
                <button onClick={() => setInput("")} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input</label>
                  <button onClick={doConvert} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Convert</button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste or type text here..." className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Right: Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Output</label>
                  <div className="flex items-center gap-2">
                    <button onClick={async () => { try { await navigator.clipboard.writeText(output); } catch {} }} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Copy</button>
                    <button onClick={onDownload} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Download</button>
                    <button onClick={onClear} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">{output}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveSpaces;


