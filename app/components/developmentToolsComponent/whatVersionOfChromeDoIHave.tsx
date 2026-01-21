"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type ChromeInfo = {
  isChrome: boolean;
  chromeVersion?: string;
  chromiumVersion?: string;
  engine?: string;
  userAgent: string;
  brands?: Array<{ brand: string; version: string }>;
  fullVersion?: string;
  majorVersion?: number;
  isMobile?: boolean;
  isChromeOS?: boolean;
};

function parseChromeFromUA(ua: string): { chromeVersion?: string; chromiumVersion?: string; engine?: string; isMobile?: boolean; isChromeOS?: boolean } {
  const U = ua;
  // Chrome (desktop/mobile)
  const chrome = U.match(/Chrome\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/i);
  if (chrome) {
    return { chromeVersion: chrome[1], engine: "Blink" };
  }
  // Chrome iOS (CriOS)
  const crios = U.match(/CriOS\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/i);
  if (crios) {
    return { chromeVersion: crios[1], engine: "WebKit", isMobile: true };
  }
  // ChromeOS
  if (/CrOS/i.test(U)) {
    return { isChromeOS: true, engine: "Blink" };
  }
  return {};
}

async function detectChrome(): Promise<ChromeInfo> {
  const nav = typeof navigator !== "undefined" ? navigator : ({} as Navigator);
  const ua = nav.userAgent || "";
  const uaParsed = parseChromeFromUA(ua);
  const info: ChromeInfo = {
    isChrome: !!(uaParsed.chromeVersion || uaParsed.isChromeOS),
    chromeVersion: uaParsed.chromeVersion,
    engine: uaParsed.engine,
    userAgent: ua,
    isMobile: uaParsed.isMobile,
    isChromeOS: uaParsed.isChromeOS,
  };

  // Get brands from UA-CH
  const uaData = (navigator as any).userAgentData;
  if (uaData && uaData.brands) {
    info.brands = uaData.brands;
    // Find Chrome brand
    const chromeBrand = uaData.brands.find((b: any) => b.brand === "Google Chrome");
    if (chromeBrand) {
      info.chromeVersion = chromeBrand.version;
    }
  }

  // Parse version components
  if (info.chromeVersion) {
    const parts = info.chromeVersion.split(".");
    info.majorVersion = Number(parts[0]);
    info.fullVersion = info.chromeVersion;
  }

  return info;
}

const WhatVersionOfChromeDoIHave: React.FC = () => {
  const [info, setInfo] = useState<ChromeInfo | null>(null);
  const [error, setError] = useState<string>("");

  const refresh = useCallback(() => {
    setError("");
    detectChrome()
      .then(setInfo)
      .catch(() => setError("Failed to detect Chrome version."));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const json = useMemo(() => (info ? JSON.stringify(info, null, 2) : ""), [info]);

  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(json); } catch (_) {}
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
                    <h3 className="text-lg font-medium mb-2">Chrome Version</h3>
                    <div className="rounded-xl bg-black border border-[#222] p-4 text-white/90 text-sm leading-7">
                      <div><span className="text-white/60">Is Chrome:</span> {String(info?.isChrome)}</div>
                      <div><span className="text-white/60">Version:</span> {info?.chromeVersion || "-"}</div>
                      <div><span className="text-white/60">Major:</span> {info?.majorVersion || "-"}</div>
                      <div><span className="text-white/60">Engine:</span> {info?.engine || "-"}</div>
                      <div><span className="text-white/60">Mobile:</span> {info?.isMobile === undefined ? "-" : String(info.isMobile)}</div>
                      <div><span className="text-white/60">ChromeOS:</span> {String(info?.isChromeOS || false)}</div>
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

export default WhatVersionOfChromeDoIHave;
