"use client";

import React, { useCallback, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

function rot13Transform(text: string): string {
  return text.replace(/[A-Za-z]/g, (char) => {
    const base = char <= "Z" ? "A".charCodeAt(0) : "a".charCodeAt(0);
    const code = char.charCodeAt(0) - base;
    const rotated = (code + 13) % 26;
    return String.fromCharCode(base + rotated);
  });
}

const Rot13EncoderDecoderComponent: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const outputText = useMemo(() => rot13Transform(inputText), [inputText]);

  const handleClear = useCallback(() => {
    setInputText("");
  }, []);

  const copyInput = useCallback(async () => {
    try { await navigator.clipboard.writeText(inputText); } catch (_) {}
  }, [inputText]);

  const copyOutput = useCallback(async () => {
    try { await navigator.clipboard.writeText(outputText); } catch (_) {}
  }, [outputText]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              <div>
                {/* Input */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Input</span>
                    <button onClick={copyInput} className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or paste text here..."
                    className="w-full min-h-[160px] bg-black rounded-xl px-3 py-3 font-mono text-sm border border-white/20 text-white"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button type="button" onClick={handleClear} className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-4 rounded-lg text-sm`}>
                    Clear
                  </button>
                </div>
              </div>

              {/* Output */}
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">Output (ROT13)</span>
                    <button onClick={copyOutput} className="border border-white/20 px-2 py-1 rounded text-xs bg-primary text-black font-bold">Copy</button>
                  </div>
                  <textarea
                    value={outputText}
                    readOnly
                    className="w-full min-h-[160px] bg-black rounded-xl px-3 py-3 font-mono text-sm border border-white/20 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rot13EncoderDecoderComponent;


