"use client";

import React, { useEffect, useRef, useState } from "react";

type Base = "bin" | "dec" | "hex";
type Op = "AND" | "OR" | "XOR" | "NOT" | "SHL" | "SHR" | "USHR";

function clampToWidthUnsigned(value: number, width: number): number {
  const mask = width >= 32 ? 0xffffffff : (1 << width) - 1;
  // Force to 32-bit unsigned, then mask width
  return (value >>> 0) & mask;
}

function toSigned(value: number, width: number): number {
  const signBit = 1 << (Math.min(width, 32) - 1);
  const masked = clampToWidthUnsigned(value, width);
  return (masked & signBit) ? masked - (signBit << 1) : masked;
}

function parseInputToUnsigned(text: string, base: Base): number | null {
  const s = text.trim();
  if (s.length === 0) return null;
  try {
    let n: number;
    if (base === "bin") {
      if (!/^[01_\s]+$/.test(s)) return null;
      n = parseInt(s.replace(/[_\s]/g, ""), 2);
    } else if (base === "hex") {
      if (!/^[0-9a-fA-F_\s]+$/.test(s)) return null;
      n = parseInt(s.replace(/[_\s]/g, ""), 16);
    } else {
      if (!/^-?\d+$/.test(s)) return null;
      n = parseInt(s, 10);
    }
    return n >>> 0; // normalize to unsigned 32-bit
  } catch {
    return null;
  }
}

function formatUnsigned(value: number, base: Base, width: number, group: boolean, thousands: boolean, signedView: boolean): string {
  const unsignedVal = clampToWidthUnsigned(value, width);
  const displayVal = signedView ? toSigned(unsignedVal, width) : unsignedVal;
  if (base === "dec") {
    const s = String(displayVal);
    if (!thousands) return s;
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (base === "hex") {
    const hex = unsignedVal.toString(16).toUpperCase();
    if (!group) return hex;
    // group every 4 chars from the right using chunking (no fragile regex)
    const groups: string[] = [];
    for (let i = hex.length; i > 0; i -= 4) {
      const start = Math.max(0, i - 4);
      groups.push(hex.slice(start, i));
    }
    return groups.reverse().join(" ").trim();
  }
  // bin
  let bin = unsignedVal.toString(2);
  // left pad to width (cap at 32)
  const padWidth = Math.min(width, 32);
  if (bin.length < padWidth) bin = bin.padStart(padWidth, "0");
  if (!group) return bin;
  return bin.replace(/(.{4})/g, "$1 ").trim();
}

const BitwiseCalculator: React.FC = () => {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [output, setOutput] = useState("");
  const [autoConvert, setAutoConvert] = useState(false);

  const [baseIn, setBaseIn] = useState<Base>("bin");
  const [baseOut, setBaseOut] = useState<Base>("bin");
  const [width, setWidth] = useState<8 | 16 | 32>(32);
  const [signedView, setSignedView] = useState(false);
  const [grouping, setGrouping] = useState(true);
  const [thousands, setThousands] = useState(false);
  const [operation, setOperation] = useState<Op>("AND");

  const fileRef = useRef<HTMLInputElement>(null);

  const compute = () => {
    const a = parseInputToUnsigned(inputA, baseIn);
    const b = parseInputToUnsigned(inputB, baseIn);

    // For unary op NOT, allow A only
    if (operation === "NOT") {
      if (a === null) {
        setOutput("");
        return;
      }
      const res = clampToWidthUnsigned(~a, width);
      setOutput(
        formatUnsigned(res, baseOut, width, grouping, thousands, signedView)
      );
      return;
    }

    if (a === null) {
      setOutput("");
      return;
    }

    const bb = b ?? 0;
    let res: number;
    switch (operation) {
      case "AND":
        res = clampToWidthUnsigned(a & bb, width);
        break;
      case "OR":
        res = clampToWidthUnsigned(a | bb, width);
        break;
      case "XOR":
        res = clampToWidthUnsigned(a ^ bb, width);
        break;
      case "SHL": {
        const sh = Math.max(0, Math.min(31, bb & 31));
        res = clampToWidthUnsigned(a << sh, width);
        break;
      }
      case "SHR": {
        const sh = Math.max(0, Math.min(31, bb & 31));
        // arithmetic shift right: preserve sign at 32-bit then clamp
        const signedA = (a << 0) | 0; // force to signed 32
        res = clampToWidthUnsigned(signedA >> sh, width);
        break;
      }
      case "USHR": {
        const sh = Math.max(0, Math.min(31, bb & 31));
        res = clampToWidthUnsigned(a >>> sh, width);
        break;
      }
      default:
        res = a;
    }

    setOutput(
      formatUnsigned(res, baseOut, width, grouping, thousands, signedView)
    );
  };

  useEffect(() => {
    if (!autoConvert) return;
    compute();
  }, [inputA, inputB, baseIn, baseOut, width, signedView, grouping, thousands, operation, autoConvert]);

  const onConvert = () => compute();

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {}
  };

  const onDownload = () => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bitwise-output.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onClear = () => {
    setInputA("");
    setInputB("");
    setOutput("");
  };

  const onUploadClick = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = String(ev.target?.result ?? "");
      // Try to split two lines into A and B
      const lines = content.split(/\r?\n/);
      setInputA(lines[0] ?? "");
      setInputB(lines[1] ?? "");
    };
    reader.readAsText(f);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[950px] mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={autoConvert}
                  onChange={(e) => setAutoConvert(e.target.checked)}
                />
                Auto Update
              </label>

              <div className="flex items-center gap-2">
                <span>Input Base:</span>
                <select
                  className="bg-black/90 border border-white/20 rounded px-2 py-1"
                  value={baseIn}
                  onChange={(e) => setBaseIn(e.target.value as Base)}
                >
                  <option value="bin">Binary</option>
                  <option value="dec">Decimal</option>
                  <option value="hex">Hex</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span>Output Base:</span>
                <select
                  className="bg-black/90 border border-white/20 rounded px-2 py-1"
                  value={baseOut}
                  onChange={(e) => setBaseOut(e.target.value as Base)}
                >
                  <option value="bin">Binary</option>
                  <option value="dec">Decimal</option>
                  <option value="hex">Hex</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span>Width:</span>
                <select
                  className="bg-black/90 border border-white/20 rounded px-2 py-1"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value) as 8 | 16 | 32)}
                >
                  <option value={8}>8-bit</option>
                  <option value={16}>16-bit</option>
                  <option value={32}>32-bit</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span>Op:</span>
                <select
                  className="bg-black/90 border border-white/20 rounded px-2 py-1"
                  value={operation}
                  onChange={(e) => setOperation(e.target.value as Op)}
                >
                  <option value="AND">AND</option>
                  <option value="OR">OR</option>
                  <option value="XOR">XOR</option>
                  <option value="NOT">NOT (A)</option>
                  <option value="SHL">SHL (A &lt;&lt; B)</option>
                  <option value="SHR">SHR (A &gt;&gt; B)</option>
                  <option value="USHR">USHR (A &gt;&gt;&gt; B)</option>
                </select>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-primary"
                  checked={signedView}
                  onChange={(e) => setSignedView(e.target.checked)}
                />
                Signed View
              </label>

              {baseOut !== "dec" && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={grouping}
                    onChange={(e) => setGrouping(e.target.checked)}
                  />
                  Group Digits
                </label>
              )}

              {baseOut === "dec" && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={thousands}
                    onChange={(e) => setThousands(e.target.checked)}
                  />
                  Thousands Separator
                </label>
              )}

              <div className="ml-auto flex items-center gap-2">
                <input
                  type="file"
                  accept=".txt,text/plain"
                  ref={fileRef}
                  onChange={onFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Input A</label>
                  <button
                    onClick={onConvert}
                    className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                  >
                    Compute
                  </button>
                </div>
                <textarea
                  value={inputA}
                  onChange={(e) => setInputA(e.target.value)}
                  placeholder={
                    baseIn === "bin"
                      ? "Binary (e.g., 1010_1100)"
                      : baseIn === "hex"
                      ? "Hex (e.g., FF00_12AB)"
                      : "Decimal (e.g., 255)"
                  }
                  className="w-full h-28 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />

                {operation !== "NOT" && (
                  <>
                    <label className="font-medium">Input B</label>
                    <textarea
                      value={inputB}
                      onChange={(e) => setInputB(e.target.value)}
                      placeholder={
                        operation === "SHL" || operation === "SHR" || operation === "USHR"
                          ? "Shift amount (e.g., 3)"
                          : baseIn === "bin"
                          ? "Binary (e.g., 0000_00FF)"
                          : baseIn === "hex"
                          ? "Hex (e.g., 00FF)"
                          : "Decimal (e.g., 15)"
                      }
                      className="w-full h-28 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                    />
                  </>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start justify-between md:gap-0 gap-4">
                  <label className="font-medium">Output</label>
                  <div className="flex flex-wrap items-center gap-2 md:justify-end justify-start">
                    <button
                      onClick={onCopy}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Copy
                    </button>
                    <button
                      onClick={onUploadClick}
                      className="px-3 py-1 bg-primary hover:bg-primary/70 text-black font-bold rounded text-sm transition-colors"
                    >
                      Upload
                    </button>
                    <button
                      onClick={onDownload}
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Download
                    </button>
                    <button
                      onClick={onClear}
                      className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitwiseCalculator;


