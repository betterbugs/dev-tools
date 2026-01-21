"use client";
import React, { useEffect, useState } from "react";

const detectSafari = (): string | null => {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";
  // Safari typically: Version/16.6 Safari/605.1.15 (exclude Chrome/Edg etc.)
  const isSafari =
    /Safari\//.test(ua) &&
    !/Chrome\//.test(ua) &&
    !/Edg\//.test(ua) &&
    !/OPR\//.test(ua);
  if (!isSafari) return null;
  const m = ua.match(/Version\/(\d+\.\d+(?:\.\d+)?)/);
  if (m) return `Safari ${m[1]}`;
  return "Safari (version unknown)";
};

const WhatVersionOfSafariDoIHave = () => {
  const [detected, setDetected] = useState<string | null>(null);
  useEffect(() => {
    setDetected(detectSafari());
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
                {detected ?? "Safari not detected"}
              </div>
              <button
                onClick={() => copy(detected ?? "Safari not detected")}
                className="ml-4 shrink-0 px-2 py-1 rounded bg-primary hover:bg-primary/80 border border-black/20 text-xs text-black font-bold"
                title="Copy"
              >
                Copy
              </button>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Manual method</h2>
              <ol className="list-decimal pl-5 text-white/80 space-y-1">
                <li>Open Safari</li>
                <li>Click Safari menu → About Safari</li>
                <li>Version will be shown in the dialog</li>
              </ol>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Troubleshooting</h2>
              <ul className="list-disc pl-5 text-white/80 space-y-1">
                <li>
                  On macOS, some privacy settings can mask the user agent
                  string.
                </li>
                <li>
                  If detection fails or you’re not on Safari, use the manual
                  steps above.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatVersionOfSafariDoIHave;
