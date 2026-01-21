"use client";
import React, { useCallback, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type FormatOptions = {
  indentSize: number;
  uppercaseKeywords: boolean;
  collapseMultipleSpaces: boolean;
  breakBeforeKeywords: boolean;
};

const KEYWORDS = [
  "SELECT", "FROM", "WHERE", "GROUP", "BY", "ORDER", "HAVING", "LIMIT",
  "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "ON",
  "INSERT", "INTO", "VALUES",
  "UPDATE", "SET",
  "DELETE",
  "CREATE", "TABLE", "VIEW", "INDEX",
  "ALTER", "ADD", "DROP",
  "UNION", "ALL",
  "DISTINCT",
  "CASE", "WHEN", "THEN", "ELSE", "END",
  "BEGIN", "COMMIT", "ROLLBACK",
];

function repeat(n: number, ch = " ") { return n > 0 ? ch.repeat(n) : ""; }

function tokenizeSql(sql: string): string[] {
  const tokens: string[] = [];
  let cur = "";
  let i = 0;
  const push = () => { if (cur) { tokens.push(cur); cur = ""; } };
  while (i < sql.length) {
    const ch = sql[i];
    if (ch === "'" || ch === '"') {
      push();
      const quote = ch;
      let j = i + 1;
      let val = quote;
      while (j < sql.length) {
        const cj = sql[j];
        val += cj;
        if (cj === quote) {
          if (sql[j + 1] === quote) { val += sql[j + 1]; j += 2; continue; }
          j++;
          break;
        }
        j++;
      }
      tokens.push(val);
      i = j;
      continue;
    }
    if ((ch === '-' && sql[i + 1] === '-') || (ch === '/' && sql[i + 1] === '/')) {
      push();
      let j = i;
      let val = "";
      while (j < sql.length && sql[j] !== '\n') { val += sql[j++]; }
      tokens.push(val);
      i = j;
      continue;
    }
    if (ch === '/' && sql[i + 1] === '*') {
      push();
      let j = i;
      let val = "";
      while (j < sql.length) {
        val += sql[j];
        if (sql[j] === '*' && sql[j + 1] === '/') { val += '/'; j += 2; break; }
        j++;
      }
      tokens.push(val);
      i = j;
      continue;
    }
    if (",()=+-*/<>".includes(ch)) { push(); tokens.push(ch); i++; continue; }
    if (/\s/.test(ch)) {
      push();
      let j = i;
      while (j < sql.length && /\s/.test(sql[j])) j++;
      tokens.push(" ");
      i = j;
      continue;
    }
    cur += ch;
    i++;
  }
  push();
  return tokens.filter(Boolean);
}

function isKeyword(token: string): boolean {
  const upper = token.toUpperCase();
  return KEYWORDS.includes(upper);
}

function formatSqlHeuristic(sql: string, options: FormatOptions): string {
  if (!sql.trim()) return "";
  const tokens = tokenizeSql(sql);
  let indentLevel = 0;
  let out = "";
  let needSpace = false;

  const append = (s: string) => { out += s; };
  const newline = () => { out += "\n" + repeat(indentLevel * options.indentSize); needSpace = false; };

  for (let i = 0; i < tokens.length; i++) {
    let t = tokens[i];
    if (t === " ") {
      if (!options.collapseMultipleSpaces) append(" ");
      else if (!needSpace) { append(" "); needSpace = true; }
      continue;
    }
    needSpace = false;

    if (t.startsWith("--") || t.startsWith("//") || t.startsWith("/*")) { append(t); newline(); continue; }
    if ((t.startsWith("'") && t.endsWith("'")) || (t.startsWith('"') && t.endsWith('"'))) { append(t); continue; }

    if (t === ")") { indentLevel = Math.max(0, indentLevel - 1); newline(); append(t); append(" "); continue; }
    if (t === "(") { append(" (".trimStart()); indentLevel += 1; continue; }

    if (isKeyword(t)) {
      const upper = options.uppercaseKeywords ? t.toUpperCase() : t;
      if (options.breakBeforeKeywords) newline(); else append(" ");
      append(upper);
      continue;
    }

    append(t);
  }

  let result = out
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n");
  if (options.collapseMultipleSpaces) { result = result.replace(/ {2,}/g, " "); }
  result = result.replace(/^(\s*\n)+/, "").replace(/(\n\s*)+$/, "\n");
  return result;
}

const SqlFormatterAndBeautifier: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [options, setOptions] = useState<FormatOptions>({
    indentSize: 2,
    uppercaseKeywords: true,
    collapseMultipleSpaces: true,
    breakBeforeKeywords: true,
  });

  const handleFormat = useCallback(() => {
    try {
      setError("");
      const formatted = formatSqlHeuristic(input, options);
      setOutput(formatted);
    } catch (_e: unknown) {
      setError("Failed to format. Please check your input.");
    }
  }, [input, options]);

  const handleClear = useCallback(() => { setInput(""); setOutput(""); setError(""); }, []);

  const canCopy = useMemo(() => Boolean(output?.length), [output]);
  const handleCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-white/80">
                    <label className="mr-3">Indent size</label>
                    <select value={options.indentSize} onChange={(e) => setOptions((o) => ({ ...o, indentSize: Number(e.target.value) }))} className="bg-black border border-[#222222] rounded-md px-2 py-1">
                      <option value={2}>2 spaces</option>
                      <option value={4}>4 spaces</option>
                    </select>
                  </div>

                  <label className="inline-flex items-center text-white/80">
                    <input type="checkbox" checked={options.uppercaseKeywords} onChange={(e) => setOptions((o) => ({ ...o, uppercaseKeywords: e.target.checked }))} className="peer hidden" />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Uppercase keywords</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="inline-flex items-center text-white/80">
                    <input type="checkbox" checked={options.collapseMultipleSpaces} onChange={(e) => setOptions((o) => ({ ...o, collapseMultipleSpaces: e.target.checked }))} className="peer hidden" />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Collapse multiple spaces</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input type="checkbox" checked={options.breakBeforeKeywords} onChange={(e) => setOptions((o) => ({ ...o, breakBeforeKeywords: e.target.checked }))} className="peer hidden" />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Break line before keywords</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Input SQL</h3>
                    <div className="relative">
                      <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste SQL here..." className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}></textarea>
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Formatted SQL</h3>
                    {error && <div className="mb-2 text-sm text-red-400">{error}</div>}
                    <div className="relative">
                      <textarea readOnly value={output} placeholder="Output will appear here..." className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}></textarea>
                      {canCopy && (
                        <button type="button" onClick={handleCopy} title="Copy" className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                            <path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z" />
                            <path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button type="button" onClick={handleFormat} disabled={!input} className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg disabled:opacity-60`}>
                    Format
                  </button>

                  <button type="button" onClick={handleClear} className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}>
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SqlFormatterAndBeautifier;
