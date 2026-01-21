"use client";
import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type FieldType = "string" | "number" | "boolean" | "date" | "uuid" | "email";

type FieldDef = {
  id: string;
  name: string;
  type: FieldType;
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomWord = (len: number) => {
  const c = "abcdefghijklmnopqrstuvwxyz";
  let s = "";
  for (let i = 0; i < len; i += 1) s += c[randomInt(0, c.length - 1)];
  return s;
};
const randomUUID = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ch) => {
  const r = (Math.random() * 16) | 0;
  const v = ch === "x" ? r : (r & 0x3) | 0x8;
  return v.toString(16);
});
const randomEmail = () => `${randomWord(randomInt(5, 9))}@${randomWord(randomInt(4, 7))}.com`;

const makeValue = (t: FieldType) => {
  switch (t) {
    case "string": return randomWord(randomInt(5, 10));
    case "number": return String(randomInt(0, 9999));
    case "boolean": return Math.random() < 0.5 ? "true" : "false";
    case "date": return new Date(Date.now() - randomInt(0, 1000 * 60 * 60 * 24 * 365)).toISOString();
    case "uuid": return randomUUID();
    case "email": return randomEmail();
    default: return "";
  }
};

const escapeXml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const RandomXMLGenerator = () => {
  const [count, setCount] = useState<number>(10);
  const [pretty, setPretty] = useState<boolean>(true);
  const [fields, setFields] = useState<FieldDef[]>([
    { id: "f1", name: "id", type: "uuid" },
    { id: "f2", name: "name", type: "string" },
    { id: "f3", name: "email", type: "email" },
  ]);
  const [output, setOutput] = useState<string>("");

  const addField = () => setFields((p) => [...p, { id: Math.random().toString(36).slice(2), name: "field", type: "string" }]);
  const removeField = (id: string) => setFields((p) => p.filter((f) => f.id !== id));
  const updateField = (id: string, patch: Partial<FieldDef>) => setFields((p) => p.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const samplePreview = useMemo(() => {
    const items = [] as string[];
    for (let i = 0; i < Math.min(2, Math.max(1, count)); i += 1) {
      const parts = fields.map((f) => `<${f.name}>${escapeXml(makeValue(f.type))}</${f.name}>`).join("\n");
      items.push(parts);
    }
    const xml = items.join("\n\n");
    return pretty ? formatXML(xml) : xml;
  }, [fields, count, pretty]);

  const generate = () => {
    const items: string[] = [];
    for (let i = 0; i < count; i += 1) {
      const block = fields
        .map((f) => `<${f.name}>${escapeXml(makeValue(f.type))}</${f.name}>`)
        .join("\n");
      items.push(block);
    }
    const xml = items.join("\n\n");
    setOutput(pretty ? formatXML(xml) : xml);
  };

  const copyOutput = async () => {
    const text = output || samplePreview;
    if (!text) return;
    await navigator.clipboard.writeText(text);
  };
  const download = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `random.xml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => setOutput("");

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl md:text-2xl font-semibold">Random XML Generator</h2>
                  <p className="text-white/70 text-sm">Define fields, choose format, and generate realistic XML blocks for testing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Count</label>
                    <input
                      type="number"
                      value={count}
                      min={1}
                      max={5000}
                      onChange={(e)=>setCount(Number(e.target.value))}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                      placeholder="How many records?"
                      aria-label="Count of records"
                    />
                    <p className="mt-1 text-xs text-white/50">1–5000 items</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Format</label>
                    <select
                      value={pretty?"pretty":"min"}
                      onChange={(e)=>setPretty(e.target.value==="pretty")}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                      aria-label="Output format"
                    >
                      <option value="pretty">Pretty</option>
                      <option value="min">Minified</option>
                    </select>
                    <p className="mt-1 text-xs text-white/50">Choose human‑readable or compact output</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Fields</h3>
                    <button type="button" onClick={addField} className="px-3 py-2 bg-primary text-black rounded font-semibold">+ Add field</button>
                  </div>
                  {fields.map((f)=> (
                    <div key={f.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 bg-black/40 border border-[#222222] rounded-lg p-3">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-white/70">Field name</label>
                        <input
                          type="text"
                          value={f.name}
                          onChange={(e)=>updateField(f.id,{name:e.target.value})}
                          className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white"
                          placeholder="e.g. id"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-white/70">Type</label>
                        <select
                          value={f.type}
                          onChange={(e)=>updateField(f.id,{type:e.target.value as FieldType})}
                          className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white"
                        >
                          <option value="string">String</option>
                          <option value="number">Number</option>
                          <option value="boolean">Boolean</option>
                          <option value="date">Date (ISO)</option>
                          <option value="uuid">UUID</option>
                          <option value="email">Email</option>
                        </select>
                      </div>
                      <div className="md:col-span-4 flex items-end justify-end">
                        <button
                          type="button"
                          onClick={()=>removeField(f.id)}
                          className="px-3 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded"
                          aria-label="Remove field"
                          title="Remove field"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button type="button" onClick={generate} className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg flex items-center gap-2`}>
                    <span>Generate XML</span>
                  </button>
                  <button type="button" onClick={clearAll} className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}>
                    Clear
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Preview</h3>
                    <button
                      type="button"
                      onClick={download}
                      disabled={!output}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-3 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed`}
                    >
                      Download .xml
                    </button>
                  </div>
                  <div className="relative">
                    <pre className={`bg-black border border-[#222222] rounded-lg p-4 text-white text-xs overflow-auto ${DevelopmentToolsStyles.scrollbar}`}>
                      {output || samplePreview || '<xml />'}
                    </pre>
                    <button
                      type="button"
                      onClick={copyOutput}
                      disabled={!output && !samplePreview}
                      aria-label="Copy to clipboard"
                      title="Copy to clipboard"
                      className="absolute top-2 right-2 h-9 w-9 flex items-center justify-center bg-primary text-black rounded shadow disabled:opacity-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z" />
                        <path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z" />
                      </svg>
                    </button>
                  </div>
                  {!output && (
                    <p className="text-xs text-white/50">Click Generate XML to produce {count} record{count>1?'s':''} using your field definitions.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function formatXML(xml: string): string {
  const P = "  ";
  let indent = 0;
  return xml
    .replace(/>\s*</g, "><")
    .split(/(?=<)/g)
    .map((n) => {
      if (/^<\//.test(n)) indent -= 1;
      const line = `${P.repeat(Math.max(indent, 0))}${n}`;
      if (/^<[^!?/][^>]*[^/]?>$/.test(n)) indent += 1;
      return line;
    })
    .join("\n");
}

export default RandomXMLGenerator;
