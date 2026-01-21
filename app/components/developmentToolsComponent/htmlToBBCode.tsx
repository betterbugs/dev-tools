"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

interface Options {
  indentSize: IndentSize;
  preserveNewlines: boolean;
  convertBoldItalic: boolean;
  convertLists: boolean;
  convertLinksImages: boolean;
  convertHeadings: boolean;
}

function htmlToBbcode(html: string, options: Options): string {
  if (!html.trim()) return "";

  // Normalize newlines if requested
  let src = options.preserveNewlines ? html.replace(/\r\n?/g, "\n") : html.replace(/\s+/g, " ");

  // Basic replacements (order matters)
  if (options.convertHeadings) {
    src = src.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "[size=24][b]$1[/b][/size]");
    src = src.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "[size=20][b]$1[/b][/size]");
    src = src.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "[size=18][b]$1[/b][/size]");
    src = src.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "[size=16][b]$1[/b][/size]");
    src = src.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "[size=14][b]$1[/b][/size]");
    src = src.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "[size=12][b]$1[/b][/size]");
  }

  if (options.convertBoldItalic) {
    src = src.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/(strong|b)>/gi, "[b]$2[/b]");
    src = src.replace(/<(em|i)[^>]*>([\s\S]*?)<\/(em|i)>/gi, "[i]$2[/i]");
    src = src.replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, "[u]$1[/u]");
    src = src.replace(/<s[^>]*>([\s\S]*?)<\/s>/gi, "[s]$1[/s]");
  }

  if (options.convertLinksImages) {
    // Images
    src = src.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, (_m, p1) => {
      return `[img]${p1}[/img]`;
    });
    // Links
    src = src.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_m, p1, p2) => {
      const text = p2.replace(/<[^>]+>/g, "");
      return `[url=${p1}]${text}[/url]`;
    });
  }

  if (options.convertLists) {
    // Unordered lists
    src = src.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_m, p1) => {
      const items = p1
        .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "[*]$1")
        .replace(/<[^>]+>/g, "");
      return `[list]\n${items}\n[/list]`;
    });
    // Ordered lists (BBCode often uses [list=1])
    src = src.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_m, p1) => {
      const items = p1
        .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "[*]$1")
        .replace(/<[^>]+>/g, "");
      return `[list=1]\n${items}\n[/list]`;
    });
  }

  // Paragraphs and breaks
  src = src.replace(/<br\s*\/?>(\s*)/gi, "\n");
  src = src.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_m, p1) => `${p1}\n\n`);

  // Strip remaining tags
  src = src.replace(/<[^>]+>/g, "");

  // Collapse excessive blank lines
  src = src.replace(/\n{3,}/g, "\n\n");

  return src.trim() + "\n";
}

const HtmlToBBCode: React.FC = () => {
  const [input, setInput] = useState<string>(
    `<h2>Heading</h2>\n<p><strong>Bold</strong> and <em>italic</em> text with <a href="https://example.com">a link</a> and an image: <img src="https://example.com/image.png" /></p>\n<ul><li>First</li><li>Second</li></ul>`
  );
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<Options>({
    indentSize: 2,
    preserveNewlines: true,
    convertBoldItalic: true,
    convertLists: true,
    convertLinksImages: true,
    convertHeadings: true,
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => setOutput(htmlToBbcode(input, options)), [input, options]);
  useEffect(() => { if (autoUpdate) convert(); }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "converted.bbcode.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  }, [output]);
  const onClear = useCallback(() => { setInput(""); setOutput(""); }, []);
  const onUploadClick = useCallback(() => fileRef.current?.click(), []);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  const indentUnitLabel = useMemo(() => `${options.indentSize} spaces`, [options.indentSize]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                  Auto-update
                </label>
                <button onClick={convert} className="bg-primary text-black font-semibold border border-black/30 px-3 py-1 rounded text-xs sm:text-sm">Convert</button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={onCopy} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Copy</button>
                <button onClick={onDownload} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Download</button>
                <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <span className="text-sm text-white/80">Input (HTML)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".html,.txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="<p><strong>Hello</strong> world</p>"
                  className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (BBCode)</span>
                </div>
                <textarea
                  value={output}
                  readOnly
                  className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20"
                />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 md:mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.preserveNewlines} onChange={(e) => setOptions(v => ({ ...v, preserveNewlines: e.target.checked }))} />
                  Preserve newlines
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.convertBoldItalic} onChange={(e) => setOptions(v => ({ ...v, convertBoldItalic: e.target.checked }))} />
                  Bold/Italic/Underline/Strike
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.convertLists} onChange={(e) => setOptions(v => ({ ...v, convertLists: e.target.checked }))} />
                  Lists (ul/ol)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.convertLinksImages} onChange={(e) => setOptions(v => ({ ...v, convertLinksImages: e.target.checked }))} />
                  Links & Images
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.convertHeadings} onChange={(e) => setOptions(v => ({ ...v, convertHeadings: e.target.checked }))} />
                  Headings (h1–h6)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlToBBCode;


