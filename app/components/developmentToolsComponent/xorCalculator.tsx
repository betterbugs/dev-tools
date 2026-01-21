"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

type RadixMode = "hex" | "dec" | "bin";

interface Row {
  id: string;
  value: string;
}

interface Options {
  mode: RadixMode;
  bitWidth: 8 | 16 | 32;
  groupSize: 4 | 8; // for binary grouping
}

function parseValue(text: string, mode: RadixMode): number | null {
  const t = text.trim();
  if (!t) return 0;
  try {
    if (mode === "hex") return parseInt(t.replace(/^0x/i, ""), 16);
    if (mode === "dec") return parseInt(t, 10);
    if (mode === "bin") return parseInt(t.replace(/\s+/g, ""), 2);
  } catch (_) {}
  const n = mode === "bin" ? parseInt(t, 2) : mode === "hex" ? parseInt(t, 16) : parseInt(t, 10);
  return Number.isFinite(n) ? n : null;
}

function formatValue(n: number, mode: RadixMode, bitWidth: Options["bitWidth" ], groupSize: Options["groupSize"]): string {
  const mask = bitWidth === 8 ? 0xff : bitWidth === 16 ? 0xffff : 0xffffffff;
  const v = (n >>> 0) & mask;
  if (mode === "dec") return String(v >>> 0);
  if (mode === "hex") return (v >>> 0).toString(16).toUpperCase();
  // binary with grouping
  const bin = (v >>> 0).toString(2).padStart(bitWidth, "0");
  return bin.replace(new RegExp(`(.{${groupSize}})`, "g"), "$1 ").trim();
}

function xorAll(values: number[], bitWidth: Options["bitWidth"]): number {
  const mask = bitWidth === 8 ? 0xff : bitWidth === 16 ? 0xffff : 0xffffffff;
  let out = 0;
  for (const n of values) out ^= (n >>> 0) & mask;
  return out & mask;
}

const XorCalculator: React.FC = () => {
  // Simple two-number calculator (LambdaTest-like)
  const [aText, setAText] = useState<string>("FF");
  const [bText, setBText] = useState<string>("0F");
  // Common options shared across quick and advanced calculators
  const [mode, setMode] = useState<RadixMode>("hex");
  const [bitWidth, setBitWidth] = useState<8 | 16 | 32>(8);
  const [groupSize, setGroupSize] = useState<4 | 8>(4);
  const maskSimple = useMemo(() => (bitWidth === 8 ? 0xff : bitWidth === 16 ? 0xffff : 0xffffffff), [bitWidth]);
  const simpleResult = useMemo(() => {
    const av = parseValue(aText, mode) ?? 0;
    const bv = parseValue(bText, mode) ?? 0;
    return ((av ^ bv) >>> 0) & maskSimple;
  }, [aText, bText, mode, maskSimple]);
  const simpleBinary = useMemo(() => (simpleResult >>> 0).toString(2).padStart(bitWidth, "0").replace(new RegExp(`(.{${groupSize}})`, 'g'), "$1 ").trim(), [simpleResult, bitWidth, groupSize]);
  const simpleDecimal = useMemo(() => String(simpleResult >>> 0), [simpleResult]);
  const simpleOctal = useMemo(() => (simpleResult >>> 0).toString(8), [simpleResult]);
  const simpleHex = useMemo(() => (simpleResult >>> 0).toString(16).toUpperCase(), [simpleResult]);

  const [rows, setRows] = useState<Row[]>([
    { id: crypto.randomUUID(), value: "FF" },
    { id: crypto.randomUUID(), value: "0F" },
  ]);
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  // advanced uses common mode/bitWidth/groupSize
  const [options, setOptions] = useState<Options>({ mode: "hex", bitWidth: 8, groupSize: 4 });
  const [result, setResult] = useState<string>("");

  const compute = useCallback(() => {
    const nums = rows.map((r) => parseValue(r.value, mode) ?? 0);
    const out = xorAll(nums, bitWidth);
    setResult(formatValue(out, mode, bitWidth, groupSize));
  }, [rows, mode, bitWidth, groupSize]);

  useEffect(() => { if (autoUpdate) compute(); }, [rows, options, autoUpdate, compute]);

  const addRow = () => setRows((rs) => [...rs, { id: crypto.randomUUID(), value: "" }]);
  const removeRow = (id: string) => setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  const updateRow = (id: string, v: string) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, value: v } : r)));

  const onCopy = async () => { try { await navigator.clipboard.writeText(result); } catch (_) {} };
  const onDownload = () => {
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "xor-result.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const onClear = () => setRows([{ id: crypto.randomUUID(), value: "" }]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            {/* Simple two-number XOR (LambdaTest-like) */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Quick XOR</h3>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:mt-2">
                <div className="bg-black rounded border border-white/20 p-3">
                  <label className="text-sm text-white/80">First Number</label>
                  <div className="flex items-center gap-3 mt-2">
                    <input value={aText} onChange={(e) => setAText(e.target.value)} className="flex-1 bg-black border border-white/20 rounded px-3 py-2 font-mono text-sm" />
                    <select value={mode} onChange={(e) => { const m = e.target.value as RadixMode; setMode(m); setOptions(v=>({ ...v, mode: m })); }} className="bg-black border border-white/20 rounded px-2 py-2 text-sm">
                      <option value="bin">Binary</option>
                      <option value="hex">Hex</option>
                      <option value="dec">Decimal</option>
                    </select>
                  </div>
                </div>
                <div className="bg-black rounded border border-white/20 p-3">
                  <label className="text-sm text-white/80">Second Number</label>
                  <div className="flex items-center gap-3 mt-2">
                    <input value={bText} onChange={(e) => setBText(e.target.value)} className="flex-1 bg-black border border-white/20 rounded px-3 py-2 font-mono text-sm" />
                    <select value={mode} onChange={(e) => { const m = e.target.value as RadixMode; setMode(m); setOptions(v=>({ ...v, mode: m })); }} className="bg-black border border-white/20 rounded px-2 py-2 text-sm">
                      <option value="bin">Binary</option>
                      <option value="hex">Hex</option>
                      <option value="dec">Decimal</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-sm">Bits:</span>
                <select value={bitWidth} onChange={(e) => { const b = Number(e.target.value) as 8|16|32; setBitWidth(b); setOptions(v=>({ ...v, bitWidth: b })); }} className="bg-black border border-white/20 rounded px-2 py-1 text-sm">
                  <option value={8}>8</option>
                  <option value={16}>16</option>
                  <option value={32}>32</option>
                </select>
                {mode === 'bin' && (
                  <>
                    <span className="text-sm">Group:</span>
                    <select value={groupSize} onChange={(e) => { const g = Number(e.target.value) as 4|8; setGroupSize(g); setOptions(v=>({ ...v, groupSize: g })); }} className="bg-black border border-white/20 rounded px-2 py-1 text-sm">
                      <option value={4}>4</option>
                      <option value={8}>8</option>
                    </select>
                  </>
                )}
              </div>
              <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 mt-4">
                <div className="bg-black rounded border border-white/20 p-3">
                  <div className="text-xs text-white/60 mb-1">Binary Result</div>
                  <div className="font-mono text-sm break-all">{simpleBinary}</div>
                </div>
                <div className="bg-black rounded border border-white/20 p-3">
                  <div className="text-xs text-white/60 mb-1">Decimal Result</div>
                  <div className="font-mono text-sm">{simpleDecimal}</div>
                </div>
                <div className="bg-black rounded border border-white/20 p-3">
                  <div className="text-xs text-white/60 mb-1">Octal Result</div>
                  <div className="font-mono text-sm">{simpleOctal}</div>
                </div>
                <div className="bg-black rounded border border-white/20 p-3">
                  <div className="text-xs text-white/60 mb-1">Hex Result</div>
                  <div className="font-mono text-sm">{simpleHex}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                  Auto-update
                </label>
                <button onClick={compute} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Calculate</button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onCopy} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Copy</button>
                <button onClick={onDownload} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Download</button>
                <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
              </div>
            </div>

            <div className="space-y-2">
              {rows.map((r, idx) => (
                <div key={r.id} className="flex items-center gap-3">
                  <span className="text-white/70 text-sm w-12">#{idx + 1}</span>
                  <input
                    value={r.value}
                    onChange={(e) => updateRow(r.id, e.target.value)}
                    placeholder={mode === "hex" ? "FF" : mode === "dec" ? "255" : "11111111"}
                    className="flex-1 bg-black border border-white/20 rounded px-3 py-2 font-mono text-sm"
                  />
                  <button onClick={() => removeRow(r.id)} className="border border-black/30 px-2 py-1 rounded text-sm bg-red hover:bg-red/90 text-black font-bold">Remove</button>
                </div>
              ))}
              <button onClick={addRow} className="border border-white/30 px-3 py-1 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold">Add value</button>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <span>Mode:</span>
                  <select value={mode} onChange={(e) => { const m = e.target.value as RadixMode; setMode(m); setOptions(v=>({ ...v, mode: m })); }} className="bg-black border border-white/20 rounded px-2 py-1 text-sm">
                    <option value="hex">Hex</option>
                    <option value="dec">Decimal</option>
                    <option value="bin">Binary</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>Bits:</span>
                  <select value={bitWidth} onChange={(e) => { const b = Number(e.target.value) as 8|16|32; setBitWidth(b); setOptions(v=>({ ...v, bitWidth: b })); }} className="bg-black border border-white/20 rounded px-2 py-1 text-sm">
                    <option value={8}>8</option>
                    <option value={16}>16</option>
                    <option value={32}>32</option>
                  </select>
                </div>
                {mode === "bin" && (
                  <div className="flex items-center gap-2 text-sm">
                    <span>Group:</span>
                    <select value={groupSize} onChange={(e) => { const g = Number(e.target.value) as 4|8; setGroupSize(g); setOptions(v=>({ ...v, groupSize: g })); }} className="bg-black border border-white/20 rounded px-2 py-1">
                      <option value={4}>4</option>
                      <option value={8}>8</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Result</h3>
              <div className="bg-black rounded border border-white/20 p-3 font-mono text-sm break-all">
                {result || ""}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default XorCalculator;


