"use client";

import React, { useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const minify = (html: string): string => {
  return html
    .replace(/\r\n|\r|\n/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+>/g, ">")
    .replace(/<\s+/g, "<")
    .trim();
};

const HtmlMinify = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const example = useMemo(
    () =>
      `<div>
  <h1>Hello World</h1>
  <p>This is a test paragraph with <strong>bold text</strong>.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>`,
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
                      HTML Input
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
                      placeholder="Minified HTML will appear here..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={run}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Minify HTML
                  </button>
                  {output && (
                    <button
                      type="button"
                      onClick={copy}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}
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

export default HtmlMinify;
