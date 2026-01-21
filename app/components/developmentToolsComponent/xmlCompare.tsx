"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type IndentSize = 2 | 4;

interface XmlCompareOptions {
  indentSize: IndentSize;
  trimTrailingSpaces: boolean;
  collapseBlankLines: boolean;
  ignoreWhitespaceOnlyText: boolean;
  ignoreAttributeOrder: boolean;
}

function prettifyXmlForCompare(
  xml: string,
  options: XmlCompareOptions
): string {
  if (!xml) return "";
  let text = xml.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  // Normalize tag boundaries and indentation similar to XmlPrettify
  text = text.replace(/>\s+</g, ">\n<");
  const rawLines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const indentUnit = " ".repeat(options.indentSize);
  let pad = 0;
  const out: string[] = [];

  const isClosingTag = (l: string) =>
    /^<\//.test(l) || /^-->/i.test(l) || /^\]\]>/.test(l);
  const isOpeningTag = (l: string) => /^<[^!?/]/.test(l) && !/\/>$/.test(l);
  const isSelfClosing = (l: string) =>
    /\/>$/.test(l) || /^<[^>]+><\/[^>]+>$/.test(l);
  const opensComment = (l: string) => /^<!--/.test(l) && !/-->$/.test(l);
  const closesComment = (l: string) => /-->$/.test(l) && !/^<!--/.test(l);

  let inComment = false;
  for (const line of rawLines) {
    let l = line;
    if (options.trimTrailingSpaces) l = l.replace(/\s+$/g, "");

    if (inComment) {
      out.push(indentUnit.repeat(pad) + l);
      if (closesComment(l)) inComment = false;
      continue;
    }

    if (isClosingTag(l)) pad = Math.max(0, pad - 1);

    // Optionally ignore whitespace-only text nodes
    if (
      options.ignoreWhitespaceOnlyText &&
      /^[^<]*$/.test(l) &&
      l.trim() === ""
    ) {
      continue;
    }

    // Optionally normalize attribute order (simple heuristic)
    if (options.ignoreAttributeOrder && /<[^!/?][^>]*>/.test(l)) {
      l = l.replace(/<([^\s>]+)\s+([^>]+)>/g, (_m, tag, attrs) => {
        const cleaned = attrs
          .replace(/\s+\/>$/, "/>")
          .replace(/\s+>/, ">")
          .trim();
        const list = cleaned
          .replace(/\s*\/>$/, "")
          .replace(/>$/, "")
          .split(/\s+(?=[^=\s]+=)/)
          .filter(Boolean)
          .sort((a: any, b: any) => a.localeCompare(b));
        return `<${tag}${list.length ? " " + list.join(" ") : ""}>`;
      });
    }

    out.push(indentUnit.repeat(pad) + l);

    if (opensComment(l)) inComment = true;
    if (isOpeningTag(l) && !isSelfClosing(l)) pad += 1;
  }

  let result = out.join("\n");
  if (options.collapseBlankLines) result = result.replace(/\n{3,}/g, "\n\n");
  return result.trimEnd() + "\n";
}

function diffLines(a: string, b: string) {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const max = Math.max(aLines.length, bLines.length);
  const diffs: {
    type: "same" | "add" | "del" | "change";
    left?: string;
    right?: string;
  }[] = [];
  for (let i = 0; i < max; i++) {
    const L = aLines[i];
    const R = bLines[i];
    if (L === undefined) diffs.push({ type: "add", right: R });
    else if (R === undefined) diffs.push({ type: "del", left: L });
    else if (L === R) diffs.push({ type: "same", left: L, right: R });
    else diffs.push({ type: "change", left: L, right: R });
  }
  return diffs;
}

const XmlCompare: React.FC = () => {
  const [left, setLeft] = useState<string>(
    '<root>\n  <a x="1" y="2"/>\n</root>\n'
  );
  const [right, setRight] = useState<string>(
    '<root>\n  <a y="2" x="1"/>\n</root>\n'
  );
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<XmlCompareOptions>({
    indentSize: 2,
    trimTrailingSpaces: true,
    collapseBlankLines: true,
    ignoreWhitespaceOnlyText: true,
    ignoreAttributeOrder: true,
  });

  const [diff, setDiff] = useState<ReturnType<typeof diffLines>>([]);
  const [leftPretty, setLeftPretty] = useState<string>("");
  const [rightPretty, setRightPretty] = useState<string>("");

  const leftRef = useRef<HTMLInputElement>(null);
  const rightRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => {
    const L = prettifyXmlForCompare(left, options);
    const R = prettifyXmlForCompare(right, options);
    setLeftPretty(L);
    setRightPretty(R);
    setDiff(diffLines(L, R));
  }, [left, right, options]);

  useEffect(() => {
    if (autoUpdate) convert();
  }, [left, right, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        diff
          .map((d) => {
            if (d.type === "same") return `  ${d.left}`;
            if (d.type === "add") return `+ ${d.right}`;
            if (d.type === "del") return `- ${d.left}`;
            return `~ ${d.left}  =>  ${d.right}`;
          })
          .join("\n")
      );
    } catch (_) {}
  }, [diff]);

  const onDownload = useCallback(() => {
    const content = diff
      .map((d) => {
        if (d.type === "same") return `  ${d.left}`;
        if (d.type === "add") return `+ ${d.right}`;
        if (d.type === "del") return `- ${d.left}`;
        return `~ ${d.left}  =>  ${d.right}`;
      })
      .join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "xml-diff.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [diff]);

  const onClear = useCallback(() => {
    setLeft("");
    setRight("");
    setLeftPretty("");
    setRightPretty("");
    setDiff([]);
  }, []);

  const leftFileRef = useRef<HTMLInputElement>(null);
  const rightFileRef = useRef<HTMLInputElement>(null);
  const onUploadLeft = useCallback(() => leftFileRef.current?.click(), []);
  const onUploadRight = useCallback(() => rightFileRef.current?.click(), []);
  const onFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: (v: string) => void
  ) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => set(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  const indentUnitLabel = useMemo(
    () => `${options.indentSize} spaces`,
    [options.indentSize]
  );

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={autoUpdate}
                    onChange={(e) => setAutoUpdate(e.target.checked)}
                  />
                  Auto-update
                </label>
                <button
                  onClick={convert}
                  className="bg-primary text-black font-semibold border border-black/30 px-3 py-1 rounded text-xs sm:text-sm"
                >
                  Compare
                </button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={onCopy}
                  className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold"
                >
                  Copy Diff
                </button>
                <button
                  onClick={onDownload}
                  className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold"
                >
                  Download Diff
                </button>
                <button
                  onClick={onClear}
                  className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-red hover:bg-red/90 text-black font-bold"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <span className="text-sm text-white/80">Left XML</span>
                  <div className="flex gap-2">
                    <input
                      ref={leftFileRef}
                      type="file"
                      accept=".xml,.txt"
                      className="hidden"
                      onChange={(e) => onFileChange(e, setLeft)}
                    />
                    <button
                      onClick={onUploadLeft}
                      className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold"
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <textarea
                  value={left}
                  onChange={(e) => setLeft(e.target.value)}
                  className="w-full h-48 sm:h-72 bg-black rounded p-3 font-mono text-xs sm:text-sm border border-white/20 resize-none"
                  placeholder="Paste XML here..."
                />
              </div>
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <span className="text-sm text-white/80">Right XML</span>
                  <div className="flex gap-2">
                    <input
                      ref={rightFileRef}
                      type="file"
                      accept=".xml,.txt"
                      className="hidden"
                      onChange={(e) => onFileChange(e, setRight)}
                    />
                    <button
                      onClick={onUploadRight}
                      className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold"
                    >
                      Upload
                    </button>
                  </div>
                </div>
                <textarea
                  value={right}
                  onChange={(e) => setRight(e.target.value)}
                  className="w-full h-48 sm:h-72 bg-black rounded p-3 font-mono text-xs sm:text-sm border border-white/20 resize-none"
                  placeholder="Paste XML here..."
                />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 md:mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={options.trimTrailingSpaces}
                    onChange={(e) =>
                      setOptions((v) => ({
                        ...v,
                        trimTrailingSpaces: e.target.checked,
                      }))
                    }
                  />
                  Trim trailing spaces
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={options.collapseBlankLines}
                    onChange={(e) =>
                      setOptions((v) => ({
                        ...v,
                        collapseBlankLines: e.target.checked,
                      }))
                    }
                  />
                  Collapse multiple blank lines
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={options.ignoreWhitespaceOnlyText}
                    onChange={(e) =>
                      setOptions((v) => ({
                        ...v,
                        ignoreWhitespaceOnlyText: e.target.checked,
                      }))
                    }
                  />
                  Ignore whitespace-only text nodes
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={options.ignoreAttributeOrder}
                    onChange={(e) =>
                      setOptions((v) => ({
                        ...v,
                        ignoreAttributeOrder: e.target.checked,
                      }))
                    }
                  />
                  Ignore attribute order
                </label>
                <div className="flex items-center gap-3 text-sm">
                  <select
                    value={options.indentSize}
                    onChange={(e) =>
                      setOptions((v) => ({
                        ...v,
                        indentSize: Number(e.target.value) as IndentSize,
                      }))
                    }
                    className="bg-black border border-white/20 rounded px-2 py-1"
                  >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                  </select>
                  <span className="text-white/60">
                    Current: {indentUnitLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Diff</h3>
              <div className="max-h-80 overflow-y-auto border border-white/20 rounded">
                <pre className="p-3 text-sm whitespace-pre-wrap">
                  {diff.map((d, idx) => (
                    <div
                      key={idx}
                      className={
                        d.type === "same"
                          ? "text-white/80"
                          : d.type === "add"
                          ? "bg-primary/80 text-white"
                          : d.type === "del"
                          ? "bg-red/80 text-white"
                          : "bg-primary/80 text-white"
                      }
                    >
                      {d.type === "same" && `  ${d.left}`}
                      {d.type === "add" && `+ ${d.right}`}
                      {d.type === "del" && `- ${d.left}`}
                      {d.type === "change" && `~ ${d.left}  =>  ${d.right}`}
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XmlCompare;
