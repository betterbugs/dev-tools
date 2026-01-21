"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type WindowsInfo = {
  osName: string; // Windows 10 or Windows 11, etc.
  platformVersion?: string; // UA-CH platformVersion (Chromium)
  windowsNT?: string; // UA Windows NT x.y
  userAgent: string;
  architecture?: string; // x64, ARM64 if derivable
  language: string;
  isWindows: boolean;
};

function parseWindowsFromUA(ua: string): { windowsNT?: string; arch?: string } {
  const ntMatch = ua.match(/Windows NT ([0-9]+\.[0-9]+)/i);
  const archMatch = ua.match(/(Win64; x64|ARM64|WOW64)/i);
  const windowsNT = ntMatch ? ntMatch[1] : undefined;
  let arch: string | undefined;
  if (archMatch) {
    const s = archMatch[1].toUpperCase();
    if (s.includes("ARM64")) arch = "ARM64";
    else if (s.includes("X64") || s.includes("WIN64") || s.includes("WOW64")) arch = "x64";
  }
  return { windowsNT, arch };
}

function guessWindowsName(nt?: string): string | undefined {
  if (!nt) return undefined;
  const map: Record<string, string> = {
    "10.0": "Windows 10/11",
    "6.3": "Windows 8.1",
    "6.2": "Windows 8",
    "6.1": "Windows 7",
    "6.0": "Windows Vista",
    "5.1": "Windows XP",
  };
  return map[nt] || `Windows NT ${nt}`;
}

async function getWindowsInfo(): Promise<WindowsInfo> {
  const nav = typeof navigator !== "undefined" ? navigator : ({} as Navigator);
  const ua = nav.userAgent || "";
  const { windowsNT, arch } = parseWindowsFromUA(ua);
  let osName = guessWindowsName(windowsNT) || "Unknown";
  let platformVersion: string | undefined;

  const uaData = (navigator as any).userAgentData;
  if (uaData && uaData.getHighEntropyValues) {
    try {
      const hv = await uaData.getHighEntropyValues(["platform", "platformVersion", "architecture"]);
      if (hv.platform === "Windows" && hv.platformVersion) {
        platformVersion = String(hv.platformVersion);
        const major = Number(platformVersion.split(".")[0]);
        // Chromium mapping: 13+ => Windows 11, otherwise Windows 10
        osName = major >= 13 ? "Windows 11" : "Windows 10";
      }
    } catch {}
  }

  // If UA-CH not available, keep best guess based on NT number (10.0 => Windows 10/11)
  const language = nav.language || (nav as any).userLanguage || "";
  return {
    osName,
    platformVersion,
    windowsNT,
    userAgent: ua,
    architecture: arch,
    language,
    isWindows: /Windows/i.test(ua),
  };
}

const WhatVersionOfWindowsDoIHave: React.FC = () => {
  const [info, setInfo] = useState<WindowsInfo | null>(null);
  const [error, setError] = useState<string>("");

  const refresh = useCallback(() => {
    setError("");
    getWindowsInfo()
      .then(setInfo)
      .catch(() => setError("Failed to detect Windows version."));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const json = useMemo(() => (info ? JSON.stringify(info, null, 2) : ""), [info]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(json);
    } catch (_) {}
  }, [json]);

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">Windows Version</h3>
                    <div className="rounded-xl bg-black border border-[#222] p-4 text-white/90 text-sm leading-7">
                      <div><span className="text-white/60">Detected:</span> {info?.osName || "-"}</div>
                      <div><span className="text-white/60">UA-CH platformVersion:</span> {info?.platformVersion || "-"}</div>
                      <div><span className="text-white/60">Windows NT (UA):</span> {info?.windowsNT || "-"}</div>
                      <div><span className="text-white/60">Architecture:</span> {info?.architecture || "-"}</div>
                      <div><span className="text-white/60">Language:</span> {info?.language || "-"}</div>
                      <div><span className="text-white/60">Is Windows:</span> {info ? String(info.isWindows) : "-"}</div>
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">User Agent</h3>
                    <div className="rounded-xl bg-black border border-[#222] p-4 text-white/80 text-xs break-words">
                      {info?.userAgent || "-"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1">
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-2">All Details (JSON)</h3>
                    {error && <div className="mb-2 text-sm text-red-400">{error}</div>}
                    <div className="relative">
                      <textarea
                        readOnly
                        value={json}
                        placeholder="Details will appear here..."
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[220px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      ></textarea>
                      {json && (
                        <button
                          type="button"
                          onClick={handleCopy}
                          title="Copy"
                          className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                            <path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z" />
                            <path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={refresh}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatVersionOfWindowsDoIHave
