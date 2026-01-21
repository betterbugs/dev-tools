"use client";
import React, { useEffect, useState } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">{children}</code>
);

const detectFlash = (): string => {
  if (typeof window === "undefined") return "Flash cannot be detected in this environment";
  // Adobe Flash Player has been discontinued and removed from modern browsers (since 2021)
  // We still attempt a legacy plugin check to inform the user appropriately.
  const hasNavigatorPlugins = typeof navigator !== "undefined" && (navigator as any).plugins;
  const legacyDetected = hasNavigatorPlugins && Array.from((navigator as any).plugins).some((p: any) =>
    /shockwave\s+flash|flash/i.test(p?.name || "")
  );
  if (legacyDetected) return "Legacy Flash plugin detected (not supported by modern browsers)";
  return "Flash is discontinued and not supported in modern browsers";
};

const WhatVersionOfFlashDoIHave = () => {
  const [status, setStatus] = useState<string>("Flash is discontinued and not supported in modern browsers");
  useEffect(() => { setStatus(detectFlash()); }, []);

  const copy = async (text: string) => { try { await navigator.clipboard.writeText(text); } catch {} };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="bg-primary/15 border border-primary/30 text-white/90 rounded-lg p-6 flex items-center justify-between">
              <div className="text-center w-full">{status}</div>
              <button onClick={() => copy(status)} className="ml-4 shrink-0 px-2 py-1 rounded bg-primary hover:bg-primary/80 border border-black/20 text-xs text-black font-bold" title="Copy message">Copy</button>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-3 text-sm">
              <div className="text-white/80">Adobe Flash Player reached End of Life on December 31, 2020 and has been removed from all major browsers. Version detection via the web is no longer possible.</div>
              <div className="text-white/80">If you need to verify legacy environments:</div>
              <ul className="list-disc pl-5 text-white/80 space-y-1">
                <li>On Windows with old Internet Explorer, Flash was an ActiveX control. Check Control Panel → Programs for &#34;Adobe Flash Player&#34;.</li>
                <li>On legacy browsers that still expose plugins, look for a plugin named &#34;Shockwave Flash&#34; in the add-ons/extensions page.</li>
                <li>On managed enterprise systems, consult IT policy. Modern OS/browser versions block Flash entirely for security.</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-2">
                <h2 className="font-semibold">Windows (legacy)</h2>
                <ol className="list-decimal pl-5 text-white/80 space-y-1">
                  <li>Open Control Panel → Programs and Features</li>
                  <li>Search for &#34;Adobe Flash Player&#34;; if present, note version</li>
                  <li>Flash is insecure; uninstall is recommended</li>
                </ol>
              </div>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-2">
                <h2 className="font-semibold">macOS (legacy)</h2>
                <ol className="list-decimal pl-5 text-white/80 space-y-1">
                  <li>Open System Preferences → Flash Player (if available)</li>
                  <li>Check the Updates tab for version info</li>
                  <li>Remove Flash since it is no longer supported</li>
                </ol>
              </div>
            </div>

            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Security note</h2>
              <ul className="list-disc pl-5 text-white/80 space-y-1">
                <li>Do not install third-party Flash downloads. They are unsafe and often malware.</li>
                <li>Use modern, HTML5-based alternatives for video, animation, and interactive content.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatVersionOfFlashDoIHave;


