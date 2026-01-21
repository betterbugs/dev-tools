"use client";
import React, { useEffect, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const HexToAscii = () => {
  const [hexInput, setHexInput] = useState("");
  const [asciiOutput, setAsciiOutput] = useState("");
  const [autoUpdateHex, setAutoUpdateHex] = useState<boolean>(true);

  // Convert hex to ASCII
  const hexToAscii = (hex: string): string => {
    if (!hex.trim()) return "";
    
    try {
      // Remove spaces and convert to uppercase
      const cleanHex = hex.replace(/\s+/g, "").toUpperCase();
      
      // Check if hex string is valid
      if (!/^[0-9A-F]*$/.test(cleanHex)) {
        return "Invalid hex characters detected";
      }
      
      // Check if length is even
      if (cleanHex.length % 2 !== 0) {
        return "Hex string must have even number of characters";
      }
      
      let result = "";
      for (let i = 0; i < cleanHex.length; i += 2) {
        const hexByte = cleanHex.substr(i, 2);
        const charCode = parseInt(hexByte, 16);
        
        // Check for valid ASCII range (0-127)
        if (charCode >= 0 && charCode <= 127) {
          result += String.fromCharCode(charCode);
        } else {
          result += `[${charCode}]`; // Show non-printable characters
        }
      }
      
      return result;
    } catch (error) {
      return "Error converting hex to ASCII";
    }
  };

  const handleHexToAscii = () => {
    const result = hexToAscii(hexInput);
    setAsciiOutput(result);
  };

  useEffect(() => {
    if (autoUpdateHex) {
      handleHexToAscii();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hexInput, autoUpdateHex]);

  const handleClear = () => {
    setHexInput("");
    setAsciiOutput("");
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {}
  };

  const sampleHexValues = [
    "48656C6C6F20576F726C64", // "Hello World"
    "5465737420537472696E67", // "Test String"
    "313233343536", // "123456"
    "4A617661536372697074" // "JavaScript"
  ];

  // Only Hex samples needed for this tool

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[900px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                {/* Hex to ASCII Only */}
                <div className="bg-black/40 border border-[#222222] rounded-xl md:p-6 p-4">
                    <div className="flex  items-center justify-end mb-4">
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2 text-xs sm:text-sm">
                          <input type="checkbox" className="accent-primary" checked={autoUpdateHex} onChange={(e) => setAutoUpdateHex(e.target.checked)} />
                          Auto-update
                        </label>
                        <button onClick={handleHexToAscii} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold" disabled={!hexInput.trim()}>Convert</button>
                        <button onClick={() => handleCopy(asciiOutput)} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold" disabled={!asciiOutput}>Copy</button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white/80">Input (Hexadecimal)</span>
                        </div>
                        <textarea value={hexInput} onChange={(e) => setHexInput(e.target.value)} placeholder="e.g. 48656C6C6F or 48 65 6C 6C 6F" className={`${DevelopmentToolsStyles.scrollbar} w-full h-44 bg-black rounded p-3 font-mono text-sm border border-white/20`} />
                        <div className="text-xs mt-2 text-white/60">Only 0-9 and A-F characters. Spaces allowed.</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white/80">Output (ASCII)</span>
                        </div>
                        <textarea value={asciiOutput} readOnly className={`${DevelopmentToolsStyles.scrollbar} w-full h-44 bg-black rounded p-3 font-mono text-sm border border-white/20`} />
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleCopy(asciiOutput)} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold" disabled={!asciiOutput}>Copy</button>
                          <button onClick={() => {
                            const blob = new Blob([asciiOutput], { type: "text/plain;charset=utf-8" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url; a.download = "hex-to-ascii.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
                          }} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold" disabled={!asciiOutput}>Download</button>
                          <button onClick={() => { setHexInput(""); setAsciiOutput(""); }} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
                        </div>
                      </div>
                    </div>
                  </div>

                {/* Sample Hex Values */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-black/40 border border-[#222222] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-purple-400 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold">Sample Hex Values</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sampleHexValues.map((sample, index) => (
                        <button
                          key={index}
                          onClick={() => setHexInput(sample)}
                          className="px-3 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-sm font-medium transition-all duration-300 font-mono"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-white/60 mt-2">Click any hex value above to test conversion</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center">
                  <button
                    onClick={handleClear}
                    className="text-white font-bold py-2 px-8 rounded-lg transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] bg-red hover:bg-red/90 text-black"
                  >
                    <div className="flex items-center gap-2 text-black">
                      Clear All
                    </div>
                  </button>
                </div>

                {/* Information Panel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/40 border border-[#222222] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-cyan-400 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold">Features</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-white/80">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Convert hexadecimal values to ASCII text</span>
                      </li>
                      
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Handle invalid characters gracefully</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>One-click copy to clipboard functionality</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Sample values for quick testing</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/40 border border-[#222222] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-orange-400 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold">Usage Tips</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-white/80">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Hex values should be in pairs (e.g., 48 65 6C 6C 6F)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Spaces in hex input are automatically removed</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Non-printable ASCII characters are shown as [code]</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Case insensitive hex input (auto-converted to uppercase)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Perfect for debugging and data analysis</span>
                      </li>
                    </ul>
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

export default HexToAscii;
