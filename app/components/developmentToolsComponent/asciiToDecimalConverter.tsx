"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const AsciiToDecimalConverter = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");

  const convertAsciiToDecimal = (asciiInput: string): string => {
    try {
      const decimalValues = asciiInput.split("").map((char) => char.charCodeAt(0));
      return decimalValues.join(" ");
    } catch (error) {
      return "Error: Invalid input format.";
    }
  };

  const convert = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    setOutput(convertAsciiToDecimal(input));
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
                {/* Title */}
                <div className="flex items-center gap-4">
                  <h3 className="text-base font-medium">ASCII to Decimal</h3>
                </div>

                {/* Input Section */}
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2">ASCII Input</label>
                  <div className="relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={"Enter ASCII text to convert to decimal values. Example: Hello"}
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[120px] bg-black !border !border-[#222222] p-5 rounded-xl`}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
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

                {/* Output Section */}
                <div className="w-full">
                  <h3 className="text-lg font-medium mb-2">Decimal Output</h3>
                  <div className="relative">
                    <textarea
                      readOnly
                      value={output}
                      placeholder={"Decimal values will appear here..."}
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

                {/* ASCII Reference Table */}
                <div className="w-full">
                  <h3 className="text-lg font-medium mb-4">ASCII Reference (0-127)</h3>
                  <div className="bg-black/20 rounded-xl p-4 max-h-[200px] overflow-y-auto">
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-xs">
                      {Array.from({ length: 128 }, (_, i) => (
                        <div key={i} className="flex flex-col items-center p-1 bg-white/5 rounded">
                          <span className="text-white/60">{i}</span>
                          <span className="text-white font-mono">
                            {i < 32 ? '•' : String.fromCharCode(i)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-white/60 mt-2">
                    Common characters: 32=space, 48-57=0-9, 65-90=A-Z, 97-122=a-z
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AsciiToDecimalConverter;


