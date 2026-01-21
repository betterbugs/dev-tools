"use client";
import React, { useEffect, useState } from "react";

const detectAndroid = (): string | null => {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent || "";
  const m = ua.match(/Android\s(\d+)(?:\.(\d+))?/i);
  if (!m) return null;
  const major = m[1];
  const minor = m[2] || "0";
  return `Android ${major}.${minor}`;
};

const WhatVersionOfAndroidDoIHave = () => {
  const [detected, setDetected] = useState<string | null>(null);
  useEffect(() => { setDetected(detectAndroid()); }, []);
  const copy = async (text: string) => { try { await navigator.clipboard.writeText(text) } catch {} };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">

            <div className="bg-primary/15 border border-primary/30 text-white/90 rounded-lg p-6 flex items-center justify-between">
              <div className="text-center w-full">{detected ?? "Android not detected"}</div>
              <button onClick={() => copy(detected ?? "Android not detected")} className="ml-4 shrink-0 px-2 py-1 rounded bg-primary hover:bg-primary/80 border border-black/20 text-xs text-black font-bold" title="Copy">Copy</button>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Manual method</h2>
              <ol className="list-decimal pl-5 text-white/80 space-y-1">
                <li>Open Settings</li>
                <li>Tap About phone (or About device)</li>
                <li>See the Android version field</li>
              </ol>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Troubleshooting</h2>
              <ul className="list-disc pl-5 text-white/80 space-y-1">
                <li>Some browsers mask the user agent; use the manual steps for exact version.</li>
                <li>Manufacturer UIs may move the About section—use Settings search if needed.</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatVersionOfAndroidDoIHave;


