"use client";
import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type ColumnType =
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "date"
  | "datetime"
  | "email"
  | "uuid"
  | "city"
  | "country"
  | "firstName"
  | "lastName";

type Column = { id: string; name: string; type: ColumnType };

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const sample = <T,>(arr: T[]) => arr[randomInt(0, arr.length - 1)];

const firstNames = [
  "Olivia",
  "Liam",
  "Emma",
  "Noah",
  "Ava",
  "Sophia",
  "Isabella",
  "Mason",
  "Mia",
  "Lucas",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];

const cities = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Berlin",
  "Sydney",
  "Toronto",
  "San Francisco",
  "Chicago",
  "Singapore",
];
const countries = [
  "USA",
  "UK",
  "France",
  "Japan",
  "Germany",
  "Australia",
  "Canada",
  "India",
  "Brazil",
  "Singapore",
];

const makeUuid = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const randEmail = (first: string, last: string) =>
  `${first.toLowerCase()}.${last.toLowerCase()}@example.com`;

const generateValue = (type: ColumnType): string => {
  switch (type) {
    case "string":
      return Math.random().toString(36).slice(2, 10);
    case "number":
      return (Math.random() * 1000).toFixed(2);
    case "integer":
      return String(randomInt(0, 10000));
    case "boolean":
      return Math.random() > 0.5 ? "true" : "false";
    case "date":
      return new Date(
        Date.now() - randomInt(0, 1000) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 10);
    case "datetime":
      return new Date(Date.now() - randomInt(0, 1_000_000_000))
        .toISOString()
        .replace(".000Z", "Z");
    case "firstName":
      return sample(firstNames);
    case "lastName":
      return sample(lastNames);
    case "city":
      return sample(cities);
    case "country":
      return sample(countries);
    case "email": {
      const f = sample(firstNames);
      const l = sample(lastNames);
      return randEmail(f, l);
    }
    case "uuid":
      return makeUuid();
    default:
      return "";
  }
};

const toCsv = (headers: string[], rows: string[][], delimiter: string) => {
  const esc = (v: string) => {
    const s = String(v);
    const need =
      s.includes("\n") || s.includes("\r") || s.includes("\"") || s.includes(delimiter);
    const out = s.replace(/\"/g, '""');
    return need ? `"${out}"` : out;
  };
  return [
    headers.map(esc).join(delimiter),
    ...rows.map((r) => r.map(esc).join(delimiter)),
  ].join("\r\n");
};

const makeId = () => Math.random().toString(36).slice(2, 9);

const RandomCSVGenerator = () => {
  const [rowsCount, setRowsCount] = useState<number>(100);
  const [delimiter, setDelimiter] = useState<string>(",");
  const [fileName, setFileName] = useState<string>("random-data");
  const [columns, setColumns] = useState<Column[]>([
    { id: makeId(), name: "first_name", type: "firstName" },
    { id: makeId(), name: "last_name", type: "lastName" },
    { id: makeId(), name: "email", type: "email" },
  ]);
  const [regen, setRegen] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const headers = useMemo(() => columns.map((c) => c.name.trim() || "col"), [columns]);

  const rows = useMemo(() => {
    try {
      const out: string[][] = [];
      for (let i = 0; i < Math.max(0, rowsCount); i++) {
        out.push(columns.map((c) => generateValue(c.type)));
      }
      return out;
    } catch (e) {
      setError("Failed generating rows");
      return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsCount, columns, regen]);

  const csv = useMemo(() => {
    if (!headers.length) return "";
    return toCsv(headers, rows, delimiter);
  }, [headers, rows, delimiter]);

  const download = () => {
    if (!csv) return;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "random-data"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => csv && (await navigator.clipboard.writeText(csv));

  const clearAll = () => {
    setRowsCount(100);
    setDelimiter(",");
    setFileName("random-data");
    setColumns([
      { id: makeId(), name: "first_name", type: "firstName" },
      { id: makeId(), name: "last_name", type: "lastName" },
      { id: makeId(), name: "email", type: "email" },
    ]);
    setError("");
    setRegen((n) => n + 1);
  };

  const addColumn = () =>
    setColumns((cols) => [
      ...cols,
      { id: makeId(), name: `column_${cols.length + 1}`, type: "string" },
    ]);

  const removeColumn = (id: string) =>
    setColumns((cols) => (cols.length > 1 ? cols.filter((c) => c.id !== id) : cols));

  const updateColumn = (id: string, patch: Partial<Column>) =>
    setColumns((cols) => cols.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[1050px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="flex flex-col gap-4">
                  <div className="md:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">Rows</label>
                        <input
                          type="number"
                          min={0}
                          value={rowsCount}
                          onChange={(e) => setRowsCount(parseInt(e.target.value || "0", 10))}
                          className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">Delimiter</label>
                        <select
                          value={delimiter}
                          onChange={(e) => setDelimiter(e.target.value)}
                          className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                        >
                          <option value=",">Comma (,)</option>
                          <option value=";">Semicolon (;)</option>
                          <option value="\t">Tab (\t)</option>
                          <option value="|">Pipe (|)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">Filename</label>
                        <input
                          type="text"
                          value={fileName}
                          onChange={(e) => setFileName(e.target.value)}
                          className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                          placeholder="random-data"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-medium text-white/90">Columns</h3>
                        <button
                          type="button"
                          onClick={addColumn}
                          className="px-3 py-2 bg-primary text-black rounded-lg text-sm font-bold"
                        >
                          Add Column
                        </button>
                      </div>
                      <div className="space-y-2">
                        {columns.map((col) => (
                          <div key={col.id} className="grid grid-cols-12 gap-2 items-center">
                            <input
                              value={col.name}
                              onChange={(e) => updateColumn(col.id, { name: e.target.value })}
                              placeholder="column name"
                              className="col-span-6 bg-black border border-[#222222] rounded-lg px-3 py-2 text-white text-sm"
                            />
                            <select
                              value={col.type}
                              onChange={(e) => updateColumn(col.id, { type: e.target.value as ColumnType })}
                              className="col-span-5 bg-black border border-[#222222] rounded-lg px-3 py-2 text-white text-sm"
                            >
                              <option value="string">String</option>
                              <option value="number">Number</option>
                              <option value="integer">Integer</option>
                              <option value="boolean">Boolean</option>
                              <option value="date">Date (YYYY-MM-DD)</option>
                              <option value="datetime">DateTime (ISO)</option>
                              <option value="email">Email</option>
                              <option value="uuid">UUID</option>
                              <option value="firstName">First name</option>
                              <option value="lastName">Last name</option>
                              <option value="city">City</option>
                              <option value="country">Country</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => removeColumn(col.id)}
                              className={`${DevelopmentToolsStyles.clearButton} col-span-1 text-black rounded-lg py-2 text-sm font-bold`}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setRegen((n) => n + 1)}
                        className="px-4 py-2 bg-primary hover:bg-primary text-black rounded-lg text-sm font-bold"
                      >
                        Regenerate
                      </button>
                      <button
                        type="button"
                        onClick={download}
                        disabled={!csv}
                        className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm`}
                      >
                        Download CSV
                      </button>
                      <button
                        type="button"
                        onClick={copy}
                        disabled={!csv}
                        className="px-4 py-2 bg-primary text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm font-bold"
                      >
                        Copy CSV
                      </button>
                      <button
                        type="button"
                        onClick={clearAll}
                        className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-white/80 mb-2">Preview</div>
                    <div className="overflow-auto max-h-[200px] rounded-lg border border-[#222222]">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="bg-black/40">
                            {headers.map((h, i) => (
                              <th key={i} className="px-3 py-2 border-r border-[#222222] text-white whitespace-pre">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((r, i) => (
                            <tr key={i} className="odd:bg-black/30">
                              {r.map((c, j) => (
                                <td key={j} className="px-3 py-2 border-r border-[#222222] text-white whitespace-pre">
                                  {c}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

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

export default RandomCSVGenerator;
