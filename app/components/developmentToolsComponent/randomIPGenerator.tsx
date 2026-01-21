"use client";

import React, { useMemo, useState } from "react";

const isPrivateIPv4 = (octets: number[]) => {
  const [a, b] = octets;
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
};

const isReservedIPv4 = (octets: number[]) => {
  const [a, b] = octets;
  if (a === 127) return true; // loopback
  if (a === 169 && b === 254) return true; // link-local
  if (a === 0) return true; // this network
  if (a >= 224 && a <= 239) return true; // multicast
  if (a >= 240) return true; // reserved/future
  return false;
};

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateIPv4 = (includePrivate: boolean, includeReserved: boolean) => {
  while (true) {
    const octets = [randInt(0, 255), randInt(0, 255), randInt(0, 255), randInt(0, 255)];
    const privateIp = isPrivateIPv4(octets);
    const reservedIp = isReservedIPv4(octets);
    if ((!includePrivate && privateIp) || (!includeReserved && reservedIp)) continue;
    return octets.join(".");
  }
};

const hex = (n: number) => n.toString(16);

const generateIPv6 = () => {
  const groups = Array.from({ length: 8 }, () => hex(randInt(0, 0xffff)).padStart(4, "0"));
  return groups.join(":");
};

const RandomIPGenerator = () => {
  const [version, setVersion] = useState<"ipv4" | "ipv6" | "both">("ipv4");
  const [count, setCount] = useState(1);
  const [uniqueOnly, setUniqueOnly] = useState(true);
  const [includePrivate, setIncludePrivate] = useState(false);
  const [includeReserved, setIncludeReserved] = useState(false);
  const [delimiter, setDelimiter] = useState("\n");

  const list = useMemo(() => {
    const out: string[] = [];
    const seen = new Set<string>();
    const genOne = () => {
      const v = version === "both" ? (Math.random() < 0.5 ? "ipv4" : "ipv6") : version;
      if (v === "ipv4") return generateIPv4(includePrivate, includeReserved);
      return generateIPv6();
    };
    while (out.length < Math.max(0, count)) {
      const ip = genOne();
      if (uniqueOnly) {
        if (seen.has(ip)) continue;
        seen.add(ip);
      }
      out.push(ip);
    }
    let delim = delimiter;
    if (delim === "\\n") delim = "\n";
    if (delim === "\\t") delim = "\t";
    return { out, text: out.join(delim) };
  }, [version, count, uniqueOnly, includePrivate, includeReserved, delimiter]);

  const copy = () => navigator.clipboard.writeText(list.text);
  const download = () => {
    const blob = new Blob([list.text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "ips.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };
  const clearAll = () => { setCount(10); setVersion("ipv4"); setUniqueOnly(true); setIncludePrivate(false); setIncludeReserved(false); setDelimiter("\n"); };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Options */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Options</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm">Version</label>
                    <select value={version} onChange={(e) => setVersion(e.target.value as any)} className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm">
                      <option value="ipv4">IPv4</option>
                      <option value="ipv6">IPv6</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Count</label>
                    <input type="number" min={1} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Delimiter</label>
                    <input value={delimiter} onChange={(e) => setDelimiter(e.target.value)} placeholder="\n, , |, \t" className="w-full px-3 py-2 bg-black/90 border border-white/20 rounded text-white text-sm" />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input id="unique" type="checkbox" className="accent-primary" checked={uniqueOnly} onChange={(e) => setUniqueOnly(e.target.checked)} />
                    <label htmlFor="unique" className="text-sm">Unique only</label>
                  </div>
                  {version !== "ipv6" && (
                    <>
                      <div className="flex items-center gap-2">
                        <input id="private" type="checkbox" className="accent-primary" checked={includePrivate} onChange={(e) => setIncludePrivate(e.target.checked)} />
                        <label htmlFor="private" className="text-sm">Include private</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input id="reserved" type="checkbox" className="accent-primary" checked={includeReserved} onChange={(e) => setIncludeReserved(e.target.checked)} />
                        <label htmlFor="reserved" className="text-sm">Include reserved</label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Preview</h2>
                <pre className="bg-black/20 p-4 rounded-lg overflow-auto text-sm font-mono border border-white/20 h-64">{list.text}</pre>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-black/20 px-3 py-1 rounded"><span className="text-blue-400 font-semibold">{list.out.length}</span><span className="ml-1 text-gray-300">total</span></div>
                  <div className="bg-black/20 px-3 py-1 rounded"><span className="text-purple-400 font-semibold">{new Set(list.out).size}</span><span className="ml-1 text-gray-300">unique</span></div>
                  <div className="bg-black/20 px-3 py-1 rounded"><span className="text-green-400 font-semibold">{version}</span><span className="ml-1 text-gray-300">version</span></div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-center gap-3">
                <button onClick={copy} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Copy</button>
                <button onClick={download} className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg transition-colors text-black font-bold">Download</button>
                <button onClick={clearAll} className="px-4 py-2 bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold">Clear</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomIPGenerator