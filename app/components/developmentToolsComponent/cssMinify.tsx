"use client";

import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const minify = (css: string): string =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\s*([{}:;,>])\s*/g, "$1") // Remove spaces around special characters
    .replace(/;}/g, "}") // Remove semicolon before closing brace
    .replace(/\s*{\s*/g, "{") // Remove spaces around opening brace
    .replace(/;\s*/g, ";") // Remove spaces after semicolons
    .replace(/,\s*/g, ",") // Remove spaces after commas
    .replace(/:\s*/g, ":") // Remove spaces after colons
    .trim();

const CssMinify = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const example = useMemo(
    () => `.btn {
  background: #0ea5e9;
  color: #111;
  padding: 8px 12px;
  border-radius: 6px;
}

.btn:hover {
  background: #0284c7;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}`,
    []
  );

  const run = () => {
    const src = input || example;
    const result = minify(src);
    setOutput(result);
  };

  const copy = async () =>
    output && (await navigator.clipboard.writeText(output));

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      CSS Input
                    </label>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={12}
                      className="w-full bg-black border border-[#222222] rounded-lg p-4 text-white text-sm"
                      placeholder={example}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Minified Output
                    </label>
                    <textarea
                      value={output}
                      readOnly
                      rows={12}
                      className="w-full bg-black border border-[#222222] rounded-lg p-4 text-white text-sm"
                      placeholder="Minified CSS will appear here..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={run}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Minify CSS
                  </button>
                  {output && (
                    <button
                      type="button"
                      onClick={copy}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg `}
                    >
                      Copy
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={clearAll}
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

export default CssMinify;
