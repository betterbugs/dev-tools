"use client";
import React, { useEffect, useMemo, useState } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">
    {children}
  </code>
);

const detectMacOS = (): string | null => {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";
  const isMac = /Macintosh|Mac OS X|Mac OS/.test(ua);
  if (!isMac) return null;
  // Modern Safari exposes version like: Mac OS X 10_15_7 or macOS 12_6
  const m = ua.match(
    /(?:Mac OS X|Mac OS|macOS)[\s_]*(\d+)[_.](\d+)(?:[_.](\d+))?/i
  );
  if (!m) return "macOS (version unknown)";
  const major = Number(m[1]);
  const minor = Number(m[2] ?? 0);
  // Try mapping to marketing names for common versions
  const ver = `${major}.${minor}`;
  const map: Record<string, string> = {
    "10.12": "Sierra",
    "10.13": "High Sierra",
    "10.14": "Mojave",
    "10.15": "Catalina",
    "11.0": "Big Sur",
    "12.0": "Monterey",
    "13.0": "Ventura",
    "14.0": "Sonoma",
  };
  const name = map[`${major}.${minor}`] || "";
  return name ? `macOS ${name} (${major}.${minor})` : `macOS ${major}.${minor}`;
};

const WhatVersionOfMacOSDoIHave = () => {
  const [detected, setDetected] = useState<string | null>(null);
  useEffect(() => {
    setDetected(detectMacOS());
  }, []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="bg-primary/15 border border-primary/30 text-white/90 rounded-lg p-6 flex items-center justify-between">
              <div className="text-center w-full">
                {detected ?? "macOS not detected (you may not be on a Mac)"}
              </div>
              <button
                onClick={() => copy(detected ?? "macOS not detected")}
                className="ml-4 shrink-0 px-2 py-1 rounded bg-primary hover:bg-primary/80 border border-black/20 text-xs text-black font-bold"
                title="Copy"
              >
                Copy
              </button>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Manual method</h2>
              <ol className="list-decimal pl-5 text-white/80 space-y-1">
                <li>Click the Apple menu in the top-left corner</li>
                <li>
                  Select <span className="font-semibold">About This Mac</span>
                </li>
                <li>Your macOS name and version will be displayed</li>
              </ol>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Troubleshooting</h2>
              <ul className="list-disc pl-5 text-white/80 space-y-1">
                <li>
                  Some browsers mask the user agent, which can hide precise
                  versions.
                </li>
                <li>
                  If detection fails, use the manual steps above for the most
                  accurate info.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatVersionOfMacOSDoIHave;
