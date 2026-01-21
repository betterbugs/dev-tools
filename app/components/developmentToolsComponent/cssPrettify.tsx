"use client";
import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

// Very lightweight CSS formatter (not a full parser but practical)
const prettify = (css: string, indentSize: number): string => {
  const clean = css.replace(/\r\n|\r/g, "\n").replace(/\s*{\s*/g, " {\n").replace(/\s*}\s*/g, "\n}\n").replace(/;\s*/g, ";\n");
  const lines = clean.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  let level = 0;
  const pad = (n: number) => " ".repeat(n * indentSize);
  const out: string[] = [];
  for (const line of lines) {
    if (line === "}") level = Math.max(0, level - 1);
    out.push(pad(level) + line);
    if (line.endsWith("{")) level += 1;
  }
  return out.join("\n");
};

const CssPrettify = () => {
  const [indentSize, setIndentSize] = useState<number>(2);
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const example = useMemo(
    () => `.btn{background:#0ea5e9;color:#111;padding:8px 12px;border-radius:6px}.btn:hover{background:#0284c7}`,
    []
  );

  const run = () => {
    const src = input || example;
    const result = prettify(src, indentSize);
    setOutput(result);
  };

  const copy = async () => output && (await navigator.clipboard.writeText(output));
  const clearAll = () => { setInput(""); setOutput(""); };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-white/80">CSS</label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={10}
                      className="w-full bg-black border border-[#222222] rounded-lg p-4 text-white text-sm"
                      placeholder={example}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Indent size</label>
                    <input type="number" value={indentSize} min={1} max={8} onChange={(e)=>setIndentSize(Number(e.target.value))} className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button type="button" onClick={run} className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}>Prettify CSS</button>
                  <button type="button" onClick={clearAll} className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}>Clear</button>
                </div>

                {output && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Output</h3>
                    <pre className={`bg-black border border-[#222222] rounded-lg p-4 text-white text-xs overflow-auto ${DevelopmentToolsStyles.scrollbar}`}>{output}</pre>
                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={copy} className="px-4 py-2 bg-primary text-black rounded font-bold">Copy</button>
                    </div>
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

export default CssPrettify