"use client";
import React, { useEffect, useMemo, useState } from "react";

type ParsedUA = {
  browser: string;
  version: string;
  os: string;
  device: string;
};

function parseUserAgent(ua: string): ParsedUA {
  const lower = ua.toLowerCase();

  // Browser + Version
  let browser = "Unknown";
  let version = "";
  const matchers: Array<[RegExp, string]> = [
    [/edg\/(\d+\.\d+)/, "Edge"],
    [/chrome\/(\d+\.\d+)/, "Chrome"],
    [/firefox\/(\d+\.\d+)/, "Firefox"],
    [/version\/(\d+\.\d+).*safari/, "Safari"],
    [/safari\/(\d+\.\d+)/, "Safari"],
    [/opr\/(\d+\.\d+)/, "Opera"],
  ];
  for (const [re, name] of matchers) {
    const m = lower.match(re);
    if (m) {
      browser = name;
      version = m[1];
      break;
    }
  }

  // OS
  let os = "Unknown";
  if (lower.includes("windows nt 10")) os = "Windows 10/11";
  else if (lower.includes("windows nt 6.3")) os = "Windows 8.1";
  else if (lower.includes("windows nt 6.1")) os = "Windows 7";
  else if (lower.includes("mac os x")) os = "macOS";
  else if (lower.includes("android")) os = "Android";
  else if (lower.includes("iphone") || lower.includes("ipad")) os = "iOS";
  else if (lower.includes("linux")) os = "Linux";

  // Device
  const device = /mobile|iphone|ipad|android/i.test(ua) ? "Mobile" : "Desktop";

  return { browser, version, os, device };
}

const WhatIsMyUserAgent: React.FC = () => {
  const [ua, setUa] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setUa(navigator.userAgent);
  }, []);

  const parsed = useMemo(() => parseUserAgent(ua), [ua]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ua);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  const download = () => {
    const blob = new Blob([ua], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user-agent.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="md:w-[950px] mx-auto p-8 text-white">
      <div className="bg-white/5 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold">What Is My User Agent?</h2>

        <div className="space-y-2">
          <label className="text-sm text-white/80">User Agent String</label>
          <textarea
            className="w-full h-28 px-3 py-2 bg-black/60 border border-white/20 rounded-lg font-mono text-sm text-white"
            value={ua}
            onChange={(e) => setUa(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={copy} className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20">
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={() => setUa(navigator.userAgent)} className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20">
              Reset to current UA
            </button>
            <button onClick={download} className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20">
              Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4 border border-white/10">
            <p className="text-white/60 text-xs mb-1">Browser</p>
            <p className="text-white font-medium">{parsed.browser} {parsed.version && `(${parsed.version})`}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/10">
            <p className="text-white/60 text-xs mb-1">Operating System</p>
            <p className="text-white font-medium">{parsed.os}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/10">
            <p className="text-white/60 text-xs mb-1">Device Type</p>
            <p className="text-white font-medium">{parsed.device}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/10">
            <p className="text-white/60 text-xs mb-1">Platform</p>
            <p className="text-white font-medium">{navigator.platform || "Unknown"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsMyUserAgent;