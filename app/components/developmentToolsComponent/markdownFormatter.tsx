"use client";

import React, { useEffect, useRef, useState } from "react";

// Lightweight markdown formatter: trims trailing spaces, normalizes heading spaces,
// ensures single blank lines between blocks, normalizes list/blockquote/code fences.

type Options = {
  trimTrailingSpaces: boolean;
  normalizeHeadings: boolean;
  blankLineBetweenBlocks: boolean;
  normalizeLists: boolean;
  normalizeBlockquotes: boolean;
  normalizeCodeFences: boolean;
};

const formatMarkdown = (text: string, opts: Options): string => {
  let src = text.replace(/\r\n/g, "\n");

  if (opts.trimTrailingSpaces) {
    src = src.split("\n").map((l) => l.replace(/[ \t]+$/g, "")).join("\n");
  }

  if (opts.normalizeHeadings) {
    // Ensure a single space after # for headings, and collapse multiple # spaces
    src = src.replace(/^(#{1,6})\s*(.*)$/gm, (_, h, rest) => `${h} ${rest.trim()}`);
  }

  if (opts.normalizeLists) {
    // Convert tabs to 2 spaces, ensure a space after list markers
    src = src.replace(/^([ \t]*)([-*+]|\d+\.)\s*(.*)$/gm, (_, ind, marker, rest) => `${ind.replace(/\t/g, "  ")}${marker} ${rest.trim()}`);
  }

  if (opts.normalizeBlockquotes) {
    // Ensure space after >
    src = src.replace(/^(>+)\s*(.*)$/gm, (_, arrows, rest) => `${arrows} ${rest.trim()}`);
  }

  if (opts.normalizeCodeFences) {
    // Normalize fence markers to ``` and remove trailing spaces
    src = src.replace(/^\s*`{3,}\s*([a-zA-Z0-9\-_]*)\s*$/gm, (m, lang) => `\`\`\`${lang ? lang.trim() : ""}`);
  }

  if (opts.blankLineBetweenBlocks) {
    // Ensure a single blank line between block-level elements
    // Headings, lists, blockquotes, code fences, horizontal rules, paragraphs
    src = src
      .replace(/\n{3,}/g, "\n\n")
      .replace(/((?:^|\n)(?:#{1,6} .*|> .*|[-*+] .*|\d+\. .*|\`\`\`.*|---+|___+|\*\*\*+))\n(?!\n)/g, (m) => m)
      .replace(/(\S)\n(?=\S)/g, "$1\n\n");
  }

  return src;
};

const MarkdownFormatter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [trimTrailingSpaces, setTrimTrailingSpaces] = useState(true);
  const [normalizeHeadings, setNormalizeHeadings] = useState(true);
  const [blankLineBetweenBlocks, setBlankLineBetweenBlocks] = useState(true);
  const [normalizeLists, setNormalizeLists] = useState(true);
  const [normalizeBlockquotes, setNormalizeBlockquotes] = useState(true);
  const [normalizeCodeFences, setNormalizeCodeFences] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const convert = () => {
    setOutput(
      formatMarkdown(input, {
        trimTrailingSpaces,
        normalizeHeadings,
        blankLineBetweenBlocks,
        normalizeLists,
        normalizeBlockquotes,
        normalizeCodeFences,
      })
    );
  };

  useEffect(() => {
    if (autoUpdate) convert();
  }, [
    input,
    autoUpdate,
    trimTrailingSpaces,
    normalizeHeadings,
    blankLineBetweenBlocks,
    normalizeLists,
    normalizeBlockquotes,
    normalizeCodeFences,
  ]);

  const onCopy = async () => { try { await navigator.clipboard.writeText(output); } catch {} };
  const onDownload = () => {
    const blob = new Blob([output], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "formatted.md"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
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
                <input type="checkbox" className="accent-primary" checked={trimTrailingSpaces} onChange={(e) => setTrimTrailingSpaces(e.target.checked)} />
                Trim trailing spaces
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={normalizeHeadings} onChange={(e) => setNormalizeHeadings(e.target.checked)} />
                Normalize headings
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={blankLineBetweenBlocks} onChange={(e) => setBlankLineBetweenBlocks(e.target.checked)} />
                Single blank line between blocks
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={normalizeLists} onChange={(e) => setNormalizeLists(e.target.checked)} />
                Normalize lists
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={normalizeBlockquotes} onChange={(e) => setNormalizeBlockquotes(e.target.checked)} />
                Normalize blockquotes
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={normalizeCodeFences} onChange={(e) => setNormalizeCodeFences(e.target.checked)} />
                Normalize code fences
              </label>
              <div className="ml-auto flex items-center gap-2">
                <input type="file" accept=".md,.markdown,text/markdown,.txt,text/plain" ref={fileRef} onChange={onFileChange} className="hidden" />
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input (Markdown)</label>
                  <button onClick={convert} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Format</button>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="# heading\n\n- list item\n\n> quote" className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500" />
              </div>

              {/* Right: Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Output</label>
                  <div className="flex items-center gap-2">
                    <button onClick={onCopy} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Copy</button>
                    <button onClick={onUploadClick} className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors">Upload</button>
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

export default MarkdownFormatter;


