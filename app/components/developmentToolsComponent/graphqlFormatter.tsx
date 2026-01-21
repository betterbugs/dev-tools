"use client";

import React, { useEffect, useRef, useState } from "react";

type IndentSize = 2 | 4;

type Token =
  | { kind: "punct"; value: string }
  | { kind: "word"; value: string }
  | { kind: "string"; value: string }
  | { kind: "comment"; value: string } // includes leading '#', ends at newline (without newline)
  | { kind: "whitespace"; value: string };

function tokenizeGraphQL(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const push = (kind: Token["kind"], value: string) => {
    if (value.length === 0) return;
    tokens.push({ kind: kind as any, value } as any);
  };

  while (i < input.length) {
    const ch = input[i];

    // Whitespace
    if (/\s/.test(ch)) {
      let j = i + 1;
      while (j < input.length && /\s/.test(input[j])) j++;
      push("whitespace", input.slice(i, j));
      i = j;
      continue;
    }

    // Comment # ... to end of line
    if (ch === "#") {
      let j = i + 1;
      while (j < input.length && input[j] !== "\n") j++;
      push("comment", input.slice(i, j));
      i = j;
      continue;
    }

    // Block string """ ... """
    if (ch === '"' && input.slice(i, i + 3) === '"""') {
      let j = i + 3;
      while (j < input.length && input.slice(j, j + 3) !== '"""') {
        j++;
      }
      j = Math.min(input.length, j + 3);
      push("string", input.slice(i, j));
      i = j;
      continue;
    }

    // String "..." with escapes
    if (ch === '"') {
      let j = i + 1;
      let escaped = false;
      while (j < input.length) {
        const c = input[j];
        j++;
        if (escaped) {
          escaped = false;
          continue;
        }
        if (c === "\\") {
          escaped = true;
          continue;
        }
        if (c === '"') break;
      }
      push("string", input.slice(i, j));
      i = j;
      continue;
    }

    // Punctuators
    if ("{}()[],:!@$=|&".includes(ch)) {
      push("punct", ch);
      i++;
      continue;
    }

    // Name/number/etc
    let j = i + 1;
    while (
      j < input.length &&
      /[A-Za-z0-9_\.\-]/.test(input[j]) // include dot/minus for floats/negative numbers
    )
      j++;
    push("word", input.slice(i, j));
    i = j;
  }

  return tokens;
}

function formatGraphQL(
  input: string,
  opts: { indentSize: IndentSize }
): string {
  const tokens = tokenizeGraphQL(input);
  const indentUnit = " ".repeat(opts.indentSize);
  let indent = 0;
  let out: string[] = [];
  let needSpace = false; // request space before next word/string
  let lineStart = true;

  const writeIndent = () => {
    out.push(indentUnit.repeat(Math.max(0, indent)));
  };

  const writeNewline = () => {
    if (out.length === 0 || out[out.length - 1].endsWith("\n")) return;
    out.push("\n");
    lineStart = true;
    needSpace = false;
  };

  const maybeSpace = () => {
    if (needSpace && !lineStart) out.push(" ");
    needSpace = false;
  };

  for (let idx = 0; idx < tokens.length; idx++) {
    const t = tokens[idx];
    switch (t.kind) {
      case "whitespace": {
        // collapse whitespace to single space unless we're at a line start
        if (!lineStart) needSpace = true;
        break;
      }
      case "comment": {
        if (lineStart) writeIndent();
        out.push(t.value);
        writeNewline();
        break;
      }
      case "string": {
        if (lineStart) writeIndent();
        maybeSpace();
        out.push(t.value);
        needSpace = true;
        lineStart = false;
        break;
      }
      case "word": {
        if (lineStart) writeIndent();
        maybeSpace();
        out.push(t.value);
        needSpace = true;
        lineStart = false;
        break;
      }
      case "punct": {
        const v = t.value;
        if (v === "{") {
          if (lineStart) writeIndent();
          maybeSpace();
          out.push("{");
          writeNewline();
          indent++;
          break;
        }
        if (v === "(") {
          if (lineStart) writeIndent();
          maybeSpace();
          out.push("(");
          indent++;
          lineStart = false;
          break;
        }
        if (v === "[") {
          if (lineStart) writeIndent();
          maybeSpace();
          out.push("[");
          indent++;
          lineStart = false;
          break;
        }

        if (v === "}") {
          indent--;
          writeNewline();
          writeIndent();
          out.push("}");
          writeNewline();
          break;
        }
        if (v === ")") {
          indent--;
          out.push(")");
          needSpace = true;
          lineStart = false;
          break;
        }
        if (v === "]") {
          indent--;
          out.push("]");
          needSpace = true;
          lineStart = false;
          break;
        }

        if (v === ",") {
          out.push(",");
          writeNewline();
          break;
        }

        if (v === ":") {
          out.push(": ");
          lineStart = false;
          needSpace = false;
          break;
        }

        // Other punctuators, print inline
        if (lineStart) writeIndent();
        maybeSpace();
        out.push(v);
        needSpace = true;
        lineStart = false;
        break;
      }
    }
  }

  // Trim trailing whitespace lines
  let result = out.join("");
  result = result.replace(/[\s\n]+$/g, "").replace(/\n{3,}/g, "\n\n");
  return result;
}

const GraphQLFormatter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [autoFormat, setAutoFormat] = useState(false);
  const [indentSize, setIndentSize] = useState<IndentSize>(2);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFormat) return;
    try {
      const formatted = formatGraphQL(input, { indentSize });
      setOutput(formatted);
    } catch (e) {
      // If formatter throws, keep output empty to avoid confusion
      setOutput("");
    }
  }, [input, autoFormat, indentSize]);

  const onFormat = () => {
    try {
      const formatted = formatGraphQL(input, { indentSize });
      setOutput(formatted);
    } catch (e) {
      setOutput("");
    }
  };

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
    a.download = "graphql-formatted.graphql";
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
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={autoFormat}
                  onChange={(e) => setAutoFormat(e.target.checked)}
                />
                Auto Update
              </label>

              <div className="flex items-center gap-2">
                <span>Indent:</span>
                <select
                  className="bg-black/90 border border-white/20 rounded px-2 py-1"
                  value={indentSize}
                  onChange={(e) => setIndentSize(Number(e.target.value) as IndentSize)}
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                </select>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <input
                  type="file"
                  accept=".graphql,.gql,.txt,text/plain"
                  ref={fileRef}
                  onChange={onFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input</label>
                  <button
                    onClick={onFormat}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Format
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={"Paste GraphQL SDL or operation here"}
                  className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-start justify-between md:gap-0 gap-4">
                  <label className="font-medium">Output</label>
                  <div className="flex flex-wrap items-center gap-2 md:justify-end justify-start">
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

export default GraphQLFormatter;


