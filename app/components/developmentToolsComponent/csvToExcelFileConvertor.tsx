"use client";
import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type ParsedCSV = {
  rows: string[][];
};

const readFileText = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsText(file);
  });

const parseCsv = (text: string, delimiter: string): ParsedCSV => {
  const rows: string[][] = [];
  let current: string[] = [];
  let value = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') {
        value += '"';
        i += 1; // skip escaped quote
      } else if (c === '"') {
        inQuotes = false;
      } else {
        value += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === "\n") {
        current.push(value);
        rows.push(current);
        current = [];
        value = "";
      } else if (c === "\r") {
        // ignore CR
      } else if (delimiter === "\t" ? c === "\t" : c === delimiter) {
        current.push(value);
        value = "";
      } else {
        value += c;
      }
    }
  }
  current.push(value);
  rows.push(current);
  return { rows };
};

const toExcelHtml = (rows: string[][]): string => {
  const tableRows = rows
    .map(
      (r) =>
        `<tr>${r
          .map((c) => `<td>${String(c).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</td>`)
          .join("")}</tr>`
    )
    .join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8" /></head><body><table>${tableRows}</table></body></html>`;
};

const CsvToExcelFileConvertor = () => {
  const [delimiterPreset, setDelimiterPreset] = useState<string>(",");
  const [customDelimiter, setCustomDelimiter] = useState<string>(";");
  const [text, setText] = useState<string>("");
  const [fileName, setFileName] = useState<string>("data");
  const [error, setError] = useState<string>("");
  const [exportFormat, setExportFormat] = useState<"csv" | "xls">("csv");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const delimiter = useMemo(() => (delimiterPreset === "custom" ? (customDelimiter || ",") : delimiterPreset), [delimiterPreset, customDelimiter]);
  const parsed = useMemo(() => (text ? parseCsv(text, delimiter) : { rows: [] }), [text, delimiter]);

  const onFile = async (file?: File) => {
    if (!file) return;
    setError("");
    try {
      const content = await readFileText(file);
      setText(content);
      setFileName(file.name.replace(/\.[^.]+$/, ""));
    } catch (e) {
      setError("Failed to read file");
    }
  };

  const download = () => {
    if (!parsed.rows.length) return;
    if (exportFormat === "csv") {
      const csv = parsed.rows.map((r) => r.map((c) => {
        const needsQuotes = /[",\n\r\t;]/.test(c);
        const escaped = c.replace(/"/g, '""');
        return needsQuotes ? `"${escaped}"` : escaped;
      }).join(delimiter)).join("\r\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName || "data"}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Legacy Excel HTML table (may show warning in Excel). Keep as optional.
      const html = toExcelHtml(parsed.rows);
      const blob = new Blob([html], { type: "application/vnd.ms-excel" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName || "data"}.xls`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAll = () => {
    setText("");
    setError("");
    setFileName("data");
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl md:text-2xl font-semibold">CSV ➜ Excel Converter</h2>
                  <p className="text-white/70 text-sm">Upload a CSV, choose delimiter and export format. We’ll preview the first rows below.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-white/80">Upload CSV</label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragEnter={() => setIsDragging(true)}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setIsDragging(false); onFile(e.dataTransfer.files?.[0]); }}
                      className={`rounded-lg border border-dashed ${isDragging ? 'border-primary bg-black/60' : 'border-[#222222] bg-black/40'} p-4 flex items-center justify-between gap-4 transition-colors`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="text-white/70 text-sm truncate">
                          {text ? `${fileName}.csv` : "Drag & drop or choose a .csv file"}
                        </div>
                        {parsed.rows.length > 0 && (
                          <span className="shrink-0 text-xs text-white/60 bg-white/10 border border-white/10 rounded px-2 py-1">
                            {parsed.rows.length} rows · {parsed.rows[0]?.length || 0} cols
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {text && (
                          <button type="button" onClick={clearAll} className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded border border-white/10">Remove</button>
                        )}
                        <label className="px-4 py-2 bg-primary text-black rounded cursor-pointer">
                          Choose File
                          <input type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Delimiter</label>
                    <select
                      value={delimiterPreset}
                      onChange={(e) => setDelimiterPreset(e.target.value)}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    >
                      <option value=",">Comma (,)</option>
                      <option value=";">Semicolon (;)</option>
                      <option value="\t">Tab (\t)</option>
                      <option value="|">Pipe (|)</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Custom Delimiter</label>
                    <input
                      type="text"
                      value={customDelimiter}
                      onChange={(e) => setCustomDelimiter(e.target.value)}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                      placeholder=";"
                      disabled={delimiterPreset !== "custom"}
                    />
                    <p className="mt-1 text-xs text-white/50">Shown only if Delimiter is set to Custom.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-black/40 border border-[#222222] rounded-lg p-1">
                    <button type="button" onClick={()=>setExportFormat('csv')} className={`px-3 py-2 rounded ${exportFormat==='csv' ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}>CSV</button>
                    <button type="button" onClick={()=>setExportFormat('xls')} className={`px-3 py-2 rounded ${exportFormat==='xls' ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}>Excel (.xls)</button>
                  </div>
                  <button
                    type="button"
                    onClick={download}
                    disabled={!parsed.rows.length}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    {exportFormat === 'csv' ? 'Download CSV' : 'Download Excel (.xls)'}
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Clear
                  </button>
                </div>

                {parsed.rows.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Preview</h3>
                    <div className="overflow-auto rounded-lg border border-[#222222]">
                      <table className="w-full text-left text-sm">
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
                      {parsed.rows.length > 20 && (
                        <div className="px-3 py-2 text-xs text-white/50 border-t border-[#222222]">Showing first 20 rows of {parsed.rows.length}</div>
                      )}
                    </div>
                    {exportFormat === 'xls' && (
                      <div className="mt-2 text-xs text-amber-300/80">Excel may show a format warning for legacy .xls files. For best compatibility, prefer CSV.</div>
                    )}
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

export default CsvToExcelFileConvertor;
