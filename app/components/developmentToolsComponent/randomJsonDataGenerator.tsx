"use client";
import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "uuid"
  | "email"
  | "url"
  | "color"
  | "lorem";

type FieldDef = {
  id: string;
  name: string;
  type: FieldType;
  min?: number;
  max?: number;
  length?: number;
  decimals?: number;
};

const randomInt = (min: number, max: number): number => {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  return Math.floor(Math.random() * (high - low + 1)) + low;
};

const randomFloat = (min: number, max: number, decimals = 2): number => {
  const value = Math.random() * (max - min) + min;
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

const randomBool = (): boolean => Math.random() < 0.5;

const randomWord = (length: number): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < length; i += 1)
    out += chars[randomInt(0, chars.length - 1)];
  return out;
};

const randomLorem = (numWords: number): string => {
  const common = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
  ];
  const words: string[] = [];
  for (let i = 0; i < numWords; i += 1) {
    const pickCommon = Math.random() < 0.6;
    if (pickCommon) {
      words.push(common[randomInt(0, common.length - 1)]);
    } else {
      words.push(randomWord(randomInt(3, 9)));
    }
  }
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
};

const randomDateISO = (): string => {
  const start = new Date(2010, 0, 1).getTime();
  const end = new Date().getTime();
  const ts = randomInt(start, end);
  return new Date(ts).toISOString();
};

const randomUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const randomEmail = (): string => {
  const user = randomWord(randomInt(5, 10));
  const domain = randomWord(randomInt(4, 8));
  const tld = ["com", "net", "org", "io", "dev"][randomInt(0, 4)];
  return `${user}@${domain}.${tld}`;
};

const randomUrl = (): string => {
  const host = `${randomWord(randomInt(4, 8))}.example`;
  const tld = ["com", "net", "org", "io"][randomInt(0, 3)];
  return `https://www.${host}.${tld}/${randomWord(randomInt(3, 8))}`;
};

const randomHexColor = (): string => {
  const n = randomInt(0, 0xffffff);
  return `#${n.toString(16).padStart(6, "0")}`;
};

const generateValue = (field: FieldDef) => {
  const { type, min, max, length, decimals } = field;
  switch (type) {
    case "string":
      return randomWord(length && length > 0 ? length : randomInt(5, 10));
    case "lorem":
      return randomLorem(length && length > 0 ? length : 8);
    case "number":
      if (decimals && decimals > 0)
        return randomFloat(min ?? 0, max ?? 100, decimals);
      return randomInt(min ?? 0, max ?? 100);
    case "boolean":
      return randomBool();
    case "date":
      return randomDateISO();
    case "uuid":
      return randomUUID();
    case "email":
      return randomEmail();
    case "url":
      return randomUrl();
    case "color":
      return randomHexColor();
    default:
      return null;
  }
};

const newField = (): FieldDef => ({
  id: (globalThis as any).crypto?.randomUUID
    ? (globalThis as any).crypto.randomUUID()
    : Math.random().toString(36).slice(2),
  name: "id",
  type: "uuid",
});

const RandomJsonDataGenerator = () => {
  const [count, setCount] = useState<number>(10);
  const [fields, setFields] = useState<FieldDef[]>([
    { id: "f1", name: "id", type: "uuid" },
    { id: "f2", name: "name", type: "string", length: 8 },
    { id: "f3", name: "email", type: "email" },
  ]);
  const [pretty, setPretty]: any = useState<boolean>(true);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addField = () => setFields((prev) => [...prev, newField()]);
  const removeField = (id: string) =>
    setFields((prev) => prev.filter((f) => f.id !== id));
  const updateField = (id: string, patch: Partial<FieldDef>) =>
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...patch } : f))
    );

  const generatedPreview = useMemo(() => {
    try {
      const result: Array<Record<string, unknown>> = [];
      for (let i = 0; i < Math.min(3, Math.max(1, count)); i += 1) {
        const obj: Record<string, unknown> = {};
        const previewFields: FieldDef[] =
          fields.length > 0
            ? fields
            : [
                { id: "d1", name: "id", type: "uuid" },
                { id: "d2", name: "name", type: "string", length: 8 },
                { id: "d3", name: "email", type: "email" },
                { id: "d4", name: "age", type: "number", min: 18, max: 65 },
                { id: "d5", name: "createdAt", type: "date" },
              ];
        previewFields.forEach((f) => {
          const key = f.name || "field";
          obj[key] = generateValue(f);
        });
        result.push(obj);
      }
      return JSON.stringify(result, null, 2);
    } catch {
      return "";
    }
  }, [fields, count]);

  const generate = () => {
    setError("");
    if (count <= 0 || count > 5000) {
      setError("Count must be between 1 and 5,000");
      return;
    }
    // Allow generating even when there are no fields; we'll produce empty objects

    const result: Array<Record<string, unknown>> = [];
    for (let i = 0; i < count; i += 1) {
      const obj: Record<string, unknown> = {};
      const effectiveFields: FieldDef[] =
        fields.length > 0
          ? fields
          : [
              { id: "d1", name: "id", type: "uuid" },
              { id: "d2", name: "name", type: "string", length: 8 },
              { id: "d3", name: "email", type: "email" },
              { id: "d4", name: "age", type: "number", min: 18, max: 65 },
              { id: "d5", name: "createdAt", type: "date" },
            ];
      effectiveFields.forEach((f) => {
        const key = f.name || "field";
        obj[key] = generateValue(f);
      });
      result.push(obj);
    }
    setOutput(JSON.stringify(result, null, pretty ? 2 : 0));
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  const downloadOutput = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "random-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setOutput("");
    setError("");
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Count
                    </label>
                    <input
                      type="number"
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                      min={1}
                      max={5000}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Format
                    </label>
                    <select
                      value={pretty ? "pretty" : "minified"}
                      onChange={(e) => setPretty(e.target.value === "pretty")}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    >
                      <option value="pretty">Pretty (2-space indent)</option>
                      <option value="minified">Minified</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={addField}
                      className="w-full bg-primary text-black font-bold py-3 px-6 rounded-lg hover:bg-opacity-90"
                    >
                      + Add Field
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {fields.map((f) => (
                    <div
                      key={f.id}
                      className="relative grid grid-cols-1 md:grid-cols-6 gap-3 bg-black/40 border border-[#222222] rounded-lg p-3"
                    >
                      <div>
                        <label className="block text-xs font-medium mb-1 text-white/70">
                          Field name
                        </label>
                        <input
                          type="text"
                          value={f.name}
                          onChange={(e) =>
                            updateField(f.id, { name: e.target.value })
                          }
                          className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
                          placeholder="name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-white/70">
                          Type
                        </label>
                        <select
                          value={f.type}
                          onChange={(e) =>
                            updateField(f.id, {
                              type: e.target.value as FieldType,
                            })
                          }
                          className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white"
                        >
                          <option value="string">String</option>
                          <option value="lorem">Lorem (sentence)</option>
                          <option value="number">Number</option>
                          <option value="boolean">Boolean</option>
                          <option value="date">Date (ISO)</option>
                          <option value="uuid">UUID</option>
                          <option value="email">Email</option>
                          <option value="url">URL</option>
                          <option value="color">Color (hex)</option>
                        </select>
                      </div>

                      {f.type === "string" || f.type === "lorem" ? (
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium mb-1 text-white/70">
                            Length / words
                          </label>
                          <input
                            type="number"
                            value={f.length ?? 8}
                            onChange={(e) =>
                              updateField(f.id, {
                                length: Number(e.target.value),
                              })
                            }
                            min={1}
                            max={100}
                            className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white"
                          />
                        </div>
                      ) : f.type === "number" ? (
                        <>
                          <div>
                            <label className="block text-xs font-medium mb-1 text-white/70">
                              Min
                            </label>
                            <input
                              type="number"
                              value={f.min ?? 0}
                              onChange={(e) =>
                                updateField(f.id, {
                                  min: Number(e.target.value),
                                })
                              }
                              className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1 text-white/70">
                              Max
                            </label>
                            <input
                              type="number"
                              value={f.max ?? 100}
                              onChange={(e) =>
                                updateField(f.id, {
                                  max: Number(e.target.value),
                                })
                              }
                              className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1 text-white/70">
                              Decimals
                            </label>
                            <input
                              type="number"
                              value={f.decimals ?? 0}
                              onChange={(e) =>
                                updateField(f.id, {
                                  decimals: Number(e.target.value),
                                })
                              }
                              min={0}
                              max={6}
                              className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white"
                            />
                          </div>
                        </>
                      ) : (
                        <div className="md:col-span-2" />
                      )}

                      <button
                        type="button"
                        onClick={() => removeField(f.id)}
                        className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded"
                        aria-label="Remove field"
                        title="Remove field"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={generate}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Generate JSON
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Clear
                  </button>
                </div>

                {output && (
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-3">Output</h3>
                    <div className="relative">
                      <textarea
                        value={output}
                        readOnly
                        className={`w-full bg-black border border-[#222222] rounded-lg p-4 text-white text-sm ${DevelopmentToolsStyles.scrollbar}`}
                        rows={12}
                      />
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={copyOutput}
                          className="px-4 py-2 bg-primary text-black text-sm rounded hover:bg-opacity-80"
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={downloadOutput}
                          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          Download .json
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {!output && (
                  <div>
                    <h4 className="text-sm text-white/70 mb-2">
                      Preview (first 3 rows)
                    </h4>
                    <pre
                      className={`bg-black border border-[#222222] rounded-lg p-4 text-white text-xs overflow-auto ${DevelopmentToolsStyles.scrollbar}`}
                    >
                      {generatedPreview}
                    </pre>
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

export default RandomJsonDataGenerator;
