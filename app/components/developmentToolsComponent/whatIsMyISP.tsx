"use client";
import React, { useEffect, useState } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">
    {children}
  </code>
);

interface ISPInfo {
  ip: string;
  isp: string;
  organization: string;
  country: string;
  region: string;
  city: string;
  timezone: string;
  loading: boolean;
  error: string | null;
}

const WhatIsMyISP = () => {
  const [ispInfo, setIspInfo] = useState<ISPInfo>({
    ip: "",
    isp: "",
    organization: "",
    country: "",
    region: "",
    city: "",
    timezone: "",
    loading: true,
    error: null,
  });

  const fetchISPInfo = async () => {
    try {
      setIspInfo(prev => ({ ...prev, loading: true, error: null }));
      
      // Using ipapi.co for ISP detection
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.reason || 'Failed to fetch ISP information');
      }
      
      setIspInfo({
        ip: data.ip || "Unknown",
        isp: data.org || "Unknown",
        organization: data.org || "Unknown",
        country: data.country_name || "Unknown",
        region: data.region || "Unknown",
        city: data.city || "Unknown",
        timezone: data.timezone || "Unknown",
        loading: false,
        error: null,
      });
    } catch (error) {
      setIspInfo(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to detect ISP information'
      }));
    }
  };

  useEffect(() => {
    fetchISPInfo();
  }, []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const copyAllInfo = () => {
    const info = `IP: ${ispInfo.ip}
ISP: ${ispInfo.isp}
Organization: ${ispInfo.organization}
Country: ${ispInfo.country}
Region: ${ispInfo.region}
City: ${ispInfo.city}
Timezone: ${ispInfo.timezone}`;
    copy(info);
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            
            {/* Main ISP Detection Result */}
            <div className="bg-primary/15 border border-primary/30 text-white/90 rounded-lg p-6">
              <div className="text-center w-full">
                {ispInfo.loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span>Detecting your ISP...</span>
                  </div>
                ) : ispInfo.error ? (
                  <div className="text-red-300">{ispInfo.error}</div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-lg font-semibold">{ispInfo.isp}</div>
                    <div className="text-sm text-white/70">Your Internet Service Provider</div>
                  </div>
                )}
              </div>
              {!ispInfo.loading && !ispInfo.error && (
                <button
                  onClick={copyAllInfo}
                  className="mt-4 w-full px-4 py-2 rounded bg-primary hover:bg-primary/80 border border-black/20 text-sm text-black font-bold"
                  title="Copy all ISP information"
                >
                  Copy All Info
                </button>
              )}
            </div>

            {/* Detailed Information */}
            {!ispInfo.loading && !ispInfo.error && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-primary">Network Information</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">IP Address:</span>
                      <span className="text-white">{ispInfo.ip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">ISP:</span>
                      <span className="text-white">{ispInfo.isp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Organization:</span>
                      <span className="text-white">{ispInfo.organization}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-primary">Location Information</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Country:</span>
                      <span className="text-white">{ispInfo.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Region:</span>
                      <span className="text-white">{ispInfo.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">City:</span>
                      <span className="text-white">{ispInfo.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Timezone:</span>
                      <span className="text-white">{ispInfo.timezone}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Manual Detection Methods */}
            <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-3 text-sm">
              <h2 className="font-semibold">Alternative Detection Methods</h2>
              <div className="text-white/80">
                If automatic detection fails, you can manually check your ISP:
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Command Line</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Cmd>nslookup myip.opendns.com</Cmd>
                      <button
                        onClick={() => copy("nslookup myip.opendns.com")}
                        className="px-2 py-1 bg-primary text-black rounded text-xs"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cmd>curl ifconfig.me</Cmd>
                      <button
                        onClick={() => copy("curl ifconfig.me")}
                        className="px-2 py-1 bg-primary text-black rounded text-xs"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Online Services</h3>
                  <ul className="list-disc pl-5 text-white/80 space-y-1">
                    <li>whatismyipaddress.com</li>
                    <li>ipinfo.io</li>
                    <li>ip-api.com</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Troubleshooting</h2>
              <ul className="list-disc pl-5 text-white/80 space-y-1">
                <li>
                  If detection fails, check your internet connection and try refreshing the page.
                </li>
                <li>
                  Some corporate networks or VPNs may mask your true ISP information.
                </li>
                <li>
                  For privacy reasons, some ISPs may not provide detailed organization information.
                </li>
                <li>
                  Location information is based on your IP address and may not be 100% accurate.
                </li>
              </ul>
            </div>

            {/* Refresh Button */}
            <div className="text-center">
              <button
                onClick={fetchISPInfo}
                disabled={ispInfo.loading}
                className="px-6 py-2 bg-primary hover:bg-primary/80 disabled:bg-primary/50 text-black font-bold rounded-lg"
              >
                {ispInfo.loading ? "Detecting..." : "Refresh Detection"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsMyISP;
