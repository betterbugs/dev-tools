"use client";
import React, { useMemo, useState } from "react";

type CellState = "same" | "diff" | "added" | "removed";

interface ParsedSheet {
  rows: string[][];
}

const parseCSV = async (file: File): Promise<ParsedSheet> => {
  const text = await file.text();
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  // Auto-detect delimiter (comma, semicolon, or tab) from first non-empty line
  const sample = lines.find((l) => l.trim().length > 0) || "";
  const candidates = [",", ";", "\t"];
  let delimiter = ",";
  let bestCount = -1;
  for (const d of candidates) {
    const count = sample.split(d).length;
    if (count > bestCount) {
      bestCount = count;
      delimiter = d;
    }
  }
  const rows = lines
    .filter((l) => l.trim().length > 0)
    .map((line) => {
      // very simple CSV split; handles quoted fields minimally
      const result: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === delimiter && !inQuotes) {
          result.push(current);
          current = "";
        } else {
          current += ch;
        }
      }
      result.push(current);
      return result.map((c) => c.trim());
    });
  return { rows };
};

const DiffLegend = () => (
  <div className="flex flex-wrap gap-3 text-xs text-white/80">
    <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-black/30 border border-primary/10"></span> Same</span>
    <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-primary/30 border border-primary/40"></span> Changed</span>
    <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-primary/30 border border-primary/40"></span> Added (only in File 2)</span>
    <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-red-500/30 border border-red/40"></span> Removed (only in File 1)</span>
  </div>
);

const ExcelCompare = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [sheet1, setSheet1] = useState<ParsedSheet | null>(null);
  const [sheet2, setSheet2] = useState<ParsedSheet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readFiles = async (f1: File | null, f2: File | null) => {
    if (!f1 || !f2) return;
    try {
      setLoading(true);
      setError(null);
      const [s1, s2] = await Promise.all([parseCSV(f1), parseCSV(f2)]);
      setSheet1(s1);
      setSheet2(s2);
    } catch (e: any) {
      setError(e?.message || "Failed to parse files");
    } finally {
      setLoading(false);
    }
  };

  const onPick1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile1(f);
    readFiles(f, file2);
  };
  const onPick2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile2(f);
    readFiles(file1, f);
  };

  const maxRows = Math.max(sheet1?.rows.length || 0, sheet2?.rows.length || 0);
  const maxCols = useMemo(() => {
    const cols1 = sheet1?.rows.reduce((m, r) => Math.max(m, r.length), 0) || 0;
    const cols2 = sheet2?.rows.reduce((m, r) => Math.max(m, r.length), 0) || 0;
    return Math.max(cols1, cols2);
  }, [sheet1, sheet2]);

  const getCell = (rows: string[][] | undefined, r: number, c: number) => rows?.[r]?.[c] ?? "";
  const cellState = (r: number, c: number): CellState => {
    const a = getCell(sheet1?.rows, r, c);
    const b = getCell(sheet2?.rows, r, c);
    if (a === "" && b !== "") return "added";
    if (a !== "" && b === "") return "removed";
    if (a !== b) return "diff";
    return "same";
  };

  const bgFor = (state: CellState) => {
    switch (state) {
      case "diff":
        return "bg-yellow-500/30 border-yellow-400/40";
      case "added":
        return "bg-green-500/30 border-green-400/40";
      case "removed":
        return "bg-red-500/30 border-red-400/40";
      default:
        return "bg-black/30 border-white/10";
    }
  };

  const downloadDiffCSV = () => {
    if (!sheet1 || !sheet2) return;
    const lines: string[] = [];
    for (let r = 0; r < maxRows; r++) {
      const row: string[] = [];
      for (let c = 0; c < maxCols; c++) {
        const a = getCell(sheet1.rows, r, c);
        const b = getCell(sheet2.rows, r, c);
        row.push(a === b ? a : `<<${a} | ${b}>>`);
      }
      lines.push(row.map((v) => `"${v.replaceAll('"', '""')}"`).join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "excel-compare-diff.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[900px] mx-auto space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">File 1</h3>
                <input type="file" accept=".csv,text/csv" onChange={onPick1} className="block w-full text-sm" />
                {/* {file1 && <p className="text-xs text-white/60 mt-2">{file1.name}</p>} */}
              </div>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">File 2</h3>
                <input type="file" accept=".csv,text/csv" onChange={onPick2} className="block w-full text-sm" />
                {/* {file2 && <p className="text-xs text-white/60 mt-2">{file2.name}</p>} */}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <DiffLegend />
              <div className="flex items-center gap-2">
                <button onClick={downloadDiffCSV} disabled={!sheet1 || !sheet2} className="px-4 py-1 bg-primary text-black rounded disabled:opacity-50 text-sm font-bold">Download Diff CSV</button>
              </div>
            </div>

            {error && (
              <div className="bg-red/20 text-red border border-red/40 p-3 rounded">{error}</div>
            )}
            {loading && (
              <div className="text-center text-white/70">Parsing files...</div>
            )}

            {sheet1 && sheet2 && (
              <div className="overflow-auto border border-white/10 rounded-lg">
                <table className="min-w-full text-xs">
                  <thead className="bg-black/30">
                    <tr>
                      <th className="px-2 py-2 border border-white/10 text-left">#</th>
                      {Array.from({ length: maxCols }).map((_, c) => (
                        <th key={c} className="px-3 py-2 border border-white/10 text-left">{String.fromCharCode(65 + (c % 26))}{c >= 26 ? Math.floor(c / 26) : ""}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: maxRows }).map((_, r) => (
                      <tr key={r} className="odd:bg-black/10">
                        <td className="px-2 py-1 border border-white/10 text-white/70">{r + 1}</td>
                        {Array.from({ length: maxCols }).map((_, c) => {
                          const state = cellState(r, c);
                          const a = getCell(sheet1.rows, r, c);
                          const b = getCell(sheet2.rows, r, c);
                          const show = state === "same" ? a : `${a} → ${b}`;
                          return (
                            <td key={c} className={`px-3 py-1 border ${bgFor(state)} truncate max-w-[240px]`} title={`File1: ${a}\nFile2: ${b}`}>
                              {show}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!sheet1 && !sheet2 && (
              <div className="text-center text-white/60 text-sm">
                Select two CSV files to begin comparison. To compare native Excel files, export them as CSV first.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelCompare;


