"use client";
import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type ParseResult = { headers: string[]; rows: string[][] };

const cleanIdentifier = (s: string) => s.replace(/[`"\[\]]/g, "").trim();
const unquoteSqlString = (s: string) => {
  if (/^'.*'$/.test(s)) return s.slice(1, -1).replace(/''/g, "'");
  if (/^".*"$/.test(s)) return s.slice(1, -1).replace(/""/g, '"');
  return s;
};

// Very pragmatic parser for: INSERT INTO table (col1,col2,...) VALUES (...),(...);
const parseInsertStatements = (sql: string): ParseResult => {
  const headersSet = new Set<string>();
  const rows: string[][] = [];

  const insertRegex = /insert\s+into\s+[^()]+\(([^)]+)\)\s+values\s*\(([\s\S]*?)\)\s*;?/gi;
  let m: RegExpExecArray | null;
  while ((m = insertRegex.exec(sql)) !== null) {
    const columns = m[1]
      .split(/,(?=(?:[^']*'[^']*')*[^']*$)/)
      .map((c) => cleanIdentifier(c));
    columns.forEach((c) => headersSet.add(c));

    const valuesPart = m[2];
    // Split tuples if multiple were captured lazily (edge case)
    const tupleRegex = /\(([^)]*)\)/g;
    const tuples: string[] = [];
    if (valuesPart.includes("(")) {
      let tm: RegExpExecArray | null;
      while ((tm = tupleRegex.exec("(" + valuesPart + ")")) !== null) {
        if (tm[1]) tuples.push(tm[1]);
      }
    } else {
      tuples.push(valuesPart);
    }

    for (const t of tuples) {
      const vals = t
        .split(/,(?=(?:[^']*'[^']*')*[^']*$)/)
        .map((v) => v.trim())
        .map((v) => (v.toUpperCase() === "NULL" ? "" : unquoteSqlString(v)));
      // Map into final row in the same column order
      const row: Record<string, string> = {};
      columns.forEach((c, i) => (row[c] = vals[i] ?? ""));
      rows.push(Object.values(Array.from(headersSet)).map((h) => row[h] ?? ""));
    }
  }

  const headers = Array.from(headersSet);
  return { headers, rows };
};

const toCsv = (headers: string[], rows: string[][], delimiter: string): string => {
  const esc = (v: string) => {
    const s = String(v);
    const need = s.includes("\n") || s.includes("\r") || s.includes("\"") || s.includes(delimiter);
    const out = s.replace(/\"/g, '""');
    return need ? `"${out}"` : out;
  };
  const lines = [headers.map(esc).join(delimiter), ...rows.map((r) => r.map(esc).join(delimiter))];
  return lines.join("\r\n");
};

const SqlToCsvConverter = () => {
  const [sql, setSql] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>(",");
  const [fileName, setFileName] = useState<string>("data");
  const [error, setError] = useState<string>("");

  const parsed = useMemo<ParseResult>(() => {
    try {
      if (!sql.trim()) return { headers: [], rows: [] };
      return parseInsertStatements(sql);
    } catch (e) {
      return { headers: [], rows: [] };
    }
  }, [sql]);

  const csv = useMemo(() => (parsed.headers.length ? toCsv(parsed.headers, parsed.rows, delimiter) : ""), [parsed, delimiter]);

  const download = () => {
    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "data"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => csv && (await navigator.clipboard.writeText(csv));
  const clearAll = () => { setSql(""); setError(""); };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-2 text-white/80">Paste SQL (INSERT INTO ... VALUES ...)</label>
                    <textarea
                      value={sql}
                      onChange={(e) => setSql(e.target.value)}
                      rows={10}
                      className="w-full bg-black border border-[#222222] rounded-lg p-4 text-white text-sm"
                      placeholder="INSERT INTO users (id,name,email) VALUES (1,'Alice','a@example.com'), (2,'Bob','b@example.com');"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Delimiter</label>
                    <select value={delimiter} onChange={(e)=>setDelimiter(e.target.value)} className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white">
                      <option value=",">Comma (,)</option>
                      <option value=";">Semicolon (;)</option>
                      <option value="\t">Tab (\t)</option>
                      <option value="|">Pipe (|)</option>
                    </select>
                    <label className="block text-sm font-medium mt-4 mb-2 text-white/80">Filename</label>
                    <input type="text" value={fileName} onChange={(e)=>setFileName(e.target.value)} className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white" placeholder="data" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button type="button" onClick={download} disabled={!csv} className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}>Download CSV</button>
                  <button type="button" onClick={copy} disabled={!csv} className="px-4 py-3 bg-primary text-black rounded-lg">Copy</button>
                  <button type="button" onClick={clearAll} className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}>Clear</button>
                </div>

                {parsed.headers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Preview</h3>
                    <div className="overflow-auto rounded-lg border border-[#222222]">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="bg-black/40">
                            {parsed.headers.map((h) => (
                              <th key={h} className="px-3 py-2 border-r border-[#222222] text-white/90 whitespace-pre">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {parsed.rows.slice(0, 20).map((r, i) => (
                            <tr key={i} className="odd:bg-black/30">
                              {r.map((c, j) => (
                                <td key={j} className="px-3 py-2 border-r border-[#222222] text-white/90 whitespace-pre">{c}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="text-center">
                    <div className="text-sm text-red-400">{error}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SqlToCsvConverter;
