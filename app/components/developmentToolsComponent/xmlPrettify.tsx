"use client";
import React, { useCallback, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type IndentSize = 2 | 4;

const XmlPrettify = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [indentSize, setIndentSize] = useState<IndentSize>(2);
  const [useTabs, setUseTabs] = useState<boolean>(false);
  const [keepDeclaration, setKeepDeclaration] = useState<boolean>(true);

  const indentUnit = useMemo(
    () => (useTabs ? "\t" : " ".repeat(indentSize)),
    [useTabs, indentSize]
  );

  const prettifyXml = useCallback(
    (xml: string): string => {
      if (!xml) return "";

      let text = xml.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");

      // Extract declaration (<?xml ...?>)
      let declaration = "";
      const declMatch = text.match(/^<\?xml[\s\S]*?\?>/i);
      if (declMatch) {
        declaration = declMatch[0];
        text = text.slice(declaration.length);
      }

      // Normalize tag boundaries
      text = text.replace(/>\s+</g, ">\n<");

      // Split into lines
      const rawLines = text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      let pad = 0;
      const out: string[] = [];

      const isClosingTag = (l: string) => /^<\//.test(l) || /^-->/i.test(l) || /^\]\]>/i.test(l);
      const isOpeningTag = (l: string) =>
        /^<[^!?/]/.test(l) && !/\/?>\s*<\//.test(l) && !/\/>$/.test(l);
      const isSelfClosing = (l: string) => /\/>$/.test(l) || /^<[^>]+><\/[^>]+>$/.test(l);
      const opensComment = (l: string) => /^<!--/.test(l) && !/-->$/.test(l);
      const closesComment = (l: string) => /-->$/.test(l) && !/^<!--/.test(l);
      const opensCdata = (l: string) => /^<!\[CDATA\[/.test(l) && !/\]\]>$/.test(l);
      const closesCdata = (l: string) => /\]\]>$/.test(l) && !/^<!\[CDATA\[/.test(l);

      for (const line of rawLines) {
        let l = line;

        // If this line starts with a closing segment, outdent first
        if (isClosingTag(l) && pad > 0) {
          pad -= 1;
        }

        out.push(indentUnit.repeat(Math.max(0, pad)) + l);

        // Adjust indentation after writing the line
        if (isOpeningTag(l)) pad += 1;
        if (opensComment(l)) pad += 1;
        if (closesComment(l) && pad > 0) pad -= 1;
        if (opensCdata(l)) pad += 1;
        if (closesCdata(l) && pad > 0) pad -= 1;
        if (isSelfClosing(l) && pad > 0 && !isOpeningTag(l)) {
          // no-op; self-closing keeps pad
        }
      }

      const pretty = out.join("\n");
      return (keepDeclaration && declaration ? declaration + "\n" : "") + pretty;
    },
    [indentUnit, keepDeclaration]
  );

  const handlePrettify = useCallback(() => {
    try {
      setError("");
      const res = prettifyXml(input);
      setOutput(res);
    } catch (e: any) {
      setOutput("");
      setError(e?.message || "Failed to prettify XML");
    }
  }, [input, prettifyXml]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (_) {}
  }, [output]);

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Indent size</label>
                    <select
                      value={indentSize}
                      onChange={(e) => setIndentSize(Number(e.target.value) as IndentSize)}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 rounded-xl`}
                    >
                      <option value={2}>2 spaces</option>
                      <option value={4}>4 spaces</option>
                    </select>
                  </div>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={useTabs}
                      onChange={(e) => setUseTabs(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Use tabs</span>
                  </label>

                  <label className="inline-flex items-center text-white/80">
                    <input
                      type="checkbox"
                      checked={keepDeclaration}
                      onChange={(e) => setKeepDeclaration(e.target.checked)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">✔</span>
                    </div>
                    <span className="ml-2">Keep XML declaration</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Input XML</h3>
                    <div className="relative">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste your XML here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Prettified XML</h3>
                    {error && (
                      <div className="mb-2 text-sm text-red-400">{error}</div>
                    )}
                    <div className="relative">
                      <textarea
                        readOnly
                        value={output}
                        placeholder="Prettified XML will appear here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                      {output && (
                        <button
                          type="button"
                          onClick={handleCopy}
                          title="Copy"
                          className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5 text-white"
                          >
                            <path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z" />
                            <path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrettify}
                    disabled={!input}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg disabled:opacity-60`}
                  >
                    Prettify
                  </button>

                  <button
                    type="button"
                    onClick={handleClear}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
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

export default XmlPrettify;