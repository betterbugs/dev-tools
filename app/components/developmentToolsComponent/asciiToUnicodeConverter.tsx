"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

function decodeAsciiEscapesToUnicode(input: string): string {
  // Supports sequences like \u0041 and raw ASCII characters
  return input.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => {
    const code = parseInt(hex, 16);
    return String.fromCharCode(code);
  });
}

const AsciiToUnicodeConverter = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    setOutput(decodeAsciiEscapesToUnicode(input));
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const copyAll = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (_) {}
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[900px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2">
                    ASCII Input
                  </label>
                  <div className="relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        "Enter ASCII-safe text containing \\uXXXX escapes"
                      }
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[120px] bg-black !border !border-[#222222] p-5 rounded-xl`}
                    />
                  </div>
                  <p className="text-xs text-white/60 mt-2">
                    Example: \\u0048\\u0065\\u006C\\u006C\\u006F becomes Hello
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={convert}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                  >
                    Convert
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}
                  >
                    Clear
                  </button>
                </div>

                <div className="w-full">
                  <h3 className="text-lg font-medium mb-2">Unicode Output</h3>
                  <div className="relative">
                    <textarea
                      readOnly
                      value={output}
                      placeholder={"Unicode text will appear here..."}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[120px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                    />
                    {output && (
                      <button
                        type="button"
                        onClick={copyAll}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AsciiToUnicodeConverter;
