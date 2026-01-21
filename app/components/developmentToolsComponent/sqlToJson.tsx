"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type IndentSize = 2 | 4;

interface Options {
  indentSize: IndentSize;
  lowercaseKeys: boolean;
  trimStrings: boolean;
  parseNull: boolean;
  parseBooleans: boolean;
}

function safeSplitTuples(valuesSection: string): string[] {
  const tuples: string[] = [];
  let inString = false;
  let stringQuote: string | null = null;
  let depth = 0;
  let current = "";
  for (let i = 0; i < valuesSection.length; i++) {
    const ch = valuesSection[i];
    const next = valuesSection[i + 1];
    if (inString) {
      current += ch;
      // SQL single quotes escape with ''
      if (stringQuote === "'" && ch === "'" && next === "'") {
        current += next; i++; // skip escaped quote
        continue;
      }
      if (ch === stringQuote) {
        inString = false; stringQuote = null;
      }
      continue;
    }
    if (ch === "'" || ch === '"') { inString = true; stringQuote = ch; current += ch; continue; }
    if (ch === '(') { depth++; current += ch; continue; }
    if (ch === ')') { depth--; current += ch; continue; }
    if (ch === ',' && depth === 0) { // between tuples
      const segment = current.trim();
      if (segment) tuples.push(segment);
      current = "";
      continue;
    }
    current += ch;
  }
  const last = current.trim();
  if (last) tuples.push(last);
  return tuples;
}

function splitCsvRespectingStrings(s: string): string[] {
  const out: string[] = [];
  let inString = false; let quote: string | null = null; let token = "";
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const next = s[i + 1];
    if (inString) {
      token += ch;
      if (quote === "'" && ch === "'" && next === "'") { token += next; i++; continue; }
      if (ch === quote) { inString = false; quote = null; }
      continue;
    }
    if (ch === '"' || ch === "'") { inString = true; quote = ch; token += ch; continue; }
    if (ch === ',') { out.push(token.trim()); token = ""; continue; }
    token += ch;
  }
  out.push(token.trim());
  return out;
}

function stripWrappingQuotes(s: string): string {
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    const body = s.slice(1, -1);
    // unescape doubled single quotes
    return body.replace(/''/g, "'");
  }
  return s;
}

function parseSqlInsert(sql: string, options: Options): { table: string; columns: string[]; rows: any[] } | null {
  let normalized = sql.trim();
  // Keep only from the first INSERT ... onwards (ignore CREATE TABLE or other DDL above it)
  const insertIdx = normalized.toLowerCase().indexOf("insert into");
  if (insertIdx >= 0) normalized = normalized.slice(insertIdx);
  normalized = normalized.replace(/;\s*$/, "");
  // Support optional column list and multiline VALUES section
  const m = normalized.match(/insert\s+into\s+`?(\w+)`?\s*(?:\(([^)]+)\))?\s*values\s*([\s\S]*)$/i);
  if (!m) return null;
  const table = m[1];
  const colsRaw = m[2];
  const valuesRaw = m[3];
  let columns: string[];
  if (colsRaw && colsRaw.trim().length) {
    columns = colsRaw.split(/\s*,\s*/).map((c) => c.replace(/^`|`$/g, ""));
  } else {
    // No columns specified → infer from the first tuple length as col1, col2, ...
    const tuplesForInfer = safeSplitTuples(valuesRaw);
    if (!tuplesForInfer.length) return null;
    const first = tuplesForInfer[0].trim();
    if (!first.startsWith("(") || !first.endsWith(")")) return null;
    const innerFirst = first.slice(1, -1);
    const parts = splitCsvRespectingStrings(innerFirst);
    columns = Array.from({ length: parts.length }, (_v, i) => `col${i + 1}`);
  }
  const tuples = safeSplitTuples(valuesRaw);
  const rows: any[] = [];
  for (const tuple of tuples) {
    const t = tuple.trim();
    if (!t.startsWith('(') || !t.endsWith(')')) continue;
    const inner = t.slice(1, -1);
    const parts = splitCsvRespectingStrings(inner);
    const obj: Record<string, any> = {};
    for (let i = 0; i < columns.length; i++) {
      const key = options.lowercaseKeys ? columns[i].toLowerCase() : columns[i];
      const raw = (parts[i] ?? "").trim();
      let val: any = raw;
      if (/^null$/i.test(raw) && options.parseNull) {
        val = null;
      } else if (/^true$/i.test(raw) && options.parseBooleans) {
        val = true;
      } else if (/^false$/i.test(raw) && options.parseBooleans) {
        val = false;
      } else if ((raw.startsWith("'") && raw.endsWith("'")) || (raw.startsWith('"') && raw.endsWith('"'))) {
        val = stripWrappingQuotes(raw);
        if (options.trimStrings) val = val.trim();
      } else if (/^-?\d+(?:\.\d+)?$/.test(raw)) {
        val = Number(raw);
      } else {
        // leave as-is string if not matched
        val = raw;
      }
      obj[key] = val;
    }
    rows.push(obj);
  }
  return { table, columns, rows };
}

function convertSqlToJson(input: string, options: Options): string {
  const parsed = parseSqlInsert(input, options);
  if (!parsed) return "";
  return JSON.stringify(parsed.rows, null, options.indentSize) + "\n";
}

const SqlToJson: React.FC = () => {
  const [input, setInput] = useState<string>(
    `INSERT INTO users (id, name, active, note, score) VALUES\n  (1, 'Alice', true, 'hello', 12.5),\n  (2, 'Bob', false, NULL, 3);`
  );
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [options, setOptions] = useState<Options>({
    indentSize: 2,
    lowercaseKeys: false,
    trimStrings: false,
    parseNull: true,
    parseBooleans: true,
  });
  const [error, setError] = useState<string>("");

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => {
    const out = convertSqlToJson(input, options);
    if (!out) {
      setError("Unsupported SQL. Paste an INSERT INTO ... (cols) VALUES (...), (...); statement.");
      setOutput("");
    } else {
      setError("");
      setOutput(out);
    }
  }, [input, options]);

  useEffect(() => { if (autoUpdate) convert(); }, [input, options, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "converted.json"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  }, [output]);
  const onClear = useCallback(() => { setInput(""); setOutput(""); setError(""); }, []);
  const onUploadClick = useCallback(() => fileRef.current?.click(), []);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  const hint = useMemo(() => error || "Paste an INSERT statement with columns and multiple value tuples.", [error]);

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
                  <span className="text-sm text-white/80">Input (SQL)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".sql,.txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-white/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`INSERT INTO table_name (col1,col2) VALUES ('a',1), ('b',2);`}
                  className="w-full h-72 bg-black rounded p-3 font-mono text-sm border border-white/20"
                />
                <div className={`text-xs mt-2 ${error ? "text-red-400" : "text-white/60"}`}>{hint}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (JSON)</span>
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
                <div className="flex items-center gap-3 text-sm">
                  <span>Indent:</span>
                  <select value={options.indentSize} onChange={(e) => setOptions(v => ({ ...v, indentSize: Number(e.target.value) as IndentSize }))} className="bg-black border border-white/20 rounded px-2 py-1">
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.lowercaseKeys} onChange={(e) => setOptions(v => ({ ...v, lowercaseKeys: e.target.checked }))} />
                  Lowercase keys
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.trimStrings} onChange={(e) => setOptions(v => ({ ...v, trimStrings: e.target.checked }))} />
                  Trim string values
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.parseNull} onChange={(e) => setOptions(v => ({ ...v, parseNull: e.target.checked }))} />
                  Parse NULL as null
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={options.parseBooleans} onChange={(e) => setOptions(v => ({ ...v, parseBooleans: e.target.checked }))} />
                  Parse booleans
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlToJson;


