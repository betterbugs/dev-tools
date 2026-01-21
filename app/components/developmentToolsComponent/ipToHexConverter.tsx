"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type GroupSeparator = "" | " " | ":" | "-";

function parseIPv4(ip: string): number[] | null {
  const m = ip.trim().match(/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/);
  if (!m) return null;
  const bytes = m.slice(1).map((s) => Number(s));
  for (const b of bytes) if (!Number.isInteger(b) || b < 0 || b > 255) return null;
  return bytes;
}

function parseIPv6(ip: string): number[] | null {
  const trimmed = ip.trim();
  if (!trimmed.includes(":")) return null;

  let head = trimmed;
  let v4bytes: number[] | null = null;
  const lastColon = trimmed.lastIndexOf(":");
  if (trimmed.includes(".")) {
    const possibleV4 = trimmed.slice(lastColon + 1);
    const parsedV4 = parseIPv4(possibleV4);
    if (parsedV4) {
      v4bytes = parsedV4;
      head = trimmed.slice(0, lastColon);
    }
  }

  const parts = head.split("::");
  if (parts.length > 2) return null;
  const left = parts[0] ? parts[0].split(":").filter(Boolean) : [];
  const right = parts.length === 2 && parts[1] ? parts[1].split(":").filter(Boolean) : [];

  const hextetsLeft = left.map((h) => parseInt(h, 16));
  const hextetsRight = right.map((h) => parseInt(h, 16));
  if ([...hextetsLeft, ...hextetsRight].some((n) => Number.isNaN(n) || n < 0 || n > 0xffff)) return null;

  const totalNeeded = v4bytes ? 6 : 8;
  const missing = totalNeeded - (hextetsLeft.length + hextetsRight.length);
  if (parts.length === 1) {
    if (missing !== 0) return null;
  } else {
    if (missing < 0) return null;
  }

  const hextets: number[] = [
    ...hextetsLeft,
    ...Array(Math.max(0, missing)).fill(0),
    ...hextetsRight,
  ];

  if (v4bytes) {
    hextets.push((v4bytes[0] << 8) | v4bytes[1]);
    hextets.push((v4bytes[2] << 8) | v4bytes[3]);
  }

  if (hextets.length !== 8) return null;

  const bytes: number[] = [];
  for (const h of hextets) {
    bytes.push((h >> 8) & 0xff, h & 0xff);
  }
  return bytes;
}

function toHex(bytes: number[], uppercase: boolean, sep: GroupSeparator): string {
  const hex = bytes.map((b) => b.toString(16).padStart(2, "0"));
  const s = hex.join(sep);
  return uppercase ? s.toUpperCase() : s;
}

const IpToHexConverter: React.FC = () => {
  const [input, setInput] = useState<string>("192.168.0.1");
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [uppercase, setUppercase] = useState<boolean>(true);
  const [separator, setSeparator] = useState<GroupSeparator>("");
  const [prefix0x, setPrefix0x] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fileRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(() => {
    const v4 = parseIPv4(input);
    const v6 = v4 ? null : parseIPv6(input);
    if (!v4 && !v6) {
      setError("Invalid IPv4/IPv6 address");
      setOutput("");
      return;
    }
    setError("");
    const bytes = v4 ?? v6!;
    let hex = toHex(bytes, uppercase, separator);
    if (prefix0x && separator === "") hex = "0x" + (uppercase ? hex.toUpperCase() : hex.toLowerCase());
    setOutput(hex);
  }, [input, uppercase, separator, prefix0x]);

  useEffect(() => { if (autoUpdate) convert(); }, [input, uppercase, separator, prefix0x, autoUpdate, convert]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "ip-to-hex.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  }, [output]);
  const onClear = useCallback(() => { setInput(""); setOutput(""); setError(""); }, []);
  const onUploadClick = useCallback(() => fileRef.current?.click(), []);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  const hint = useMemo(() => (error ? error : "Supports IPv4 and IPv6 (including IPv4-mapped)"), [error]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                  Auto-update
                </label>
                <button onClick={convert} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Convert</button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={onCopy} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Copy</button>
                <button onClick={onDownload} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Download</button>
                <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <span className="text-sm text-white/80">Input (IP Address)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. 192.168.0.1 or 2001:db8::1" className="w-full h-24 sm:h-32 bg-black rounded p-3 font-mono text-xs sm:text-sm border border-white/20 resize-none" />
                <div className={`text-xs mt-2 ${error ? "text-red-400" : "text-white/60"}`}>{hint}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (Hex)</span>
                </div>
                <textarea value={output} readOnly className="w-full h-24 sm:h-32 bg-black rounded p-3 font-mono text-xs sm:text-sm border border-white/20 resize-none" />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 text-sm md:mt-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-primary" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
                  Uppercase
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-primary" checked={prefix0x} onChange={(e) => setPrefix0x(e.target.checked)} />
                  Prefix 0x (no separators)
                </label>
                <div className="flex items-center gap-3">
                  <span>Separator:</span>
                  <select value={separator} onChange={(e) => setSeparator(e.target.value as GroupSeparator)} className="bg-black border border-white/20 rounded px-2 py-1">
                    <option value="">None</option>
                    <option value=" ">Space</option>
                    <option value=":">Colon</option>
                    <option value="-">Dash</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IpToHexConverter;


