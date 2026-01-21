"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

type IpInfo = { ip: string; type: "IPv4" | "IPv6"; source: string };

const WhatIsMyLocalIPAddress = () => {
  const [ips, setIps] = useState<IpInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const addIp = (ip: string, source: string) => {
    const type = ip.includes(":") ? "IPv6" : "IPv4";
    setIps((prev) =>
      prev.some((i) => i.ip === ip) ? prev : [...prev, { ip, type, source }]
    );
  };

  const startDiscovery = async () => {
    try {
      setError(null);
      setIps([]);
      setRunning(true);
      const pc = new RTCPeerConnection({ iceServers: [] });
      pcRef.current = pc;

      pc.createDataChannel("bb-ip-test");
      pc.onicecandidate = (event) => {
        if (!event.candidate || !event.candidate.candidate) return;
        const candidate = event.candidate.candidate;
        const ipMatch = candidate.match(
          /(?:candidate:.*? )(\d+\.\d+\.\d+\.\d+)|([a-fA-F0-9:]+)(?=\s)/
        );
        if (ipMatch) {
          const ip = (ipMatch[1] || ipMatch[2])?.trim();
          if (ip) addIp(ip, "ICE candidate");
        }
      };

      const offer = await pc.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });
      await pc.setLocalDescription(offer);

      // Parse SDP for host IPs
      const sdp = offer.sdp || "";
      const lines = sdp.split("\n");
      for (const line of lines) {
        const host = line.match(/(\d+\.\d+\.\d+\.\d+)|([a-fA-F0-9:]{2,})/);
        if (host) {
          const ip = (host[1] || host[2])?.trim();
          if (ip) addIp(ip, "SDP");
        }
      }

      // Stop after a short interval
      setTimeout(() => {
        pc.close();
        setRunning(false);
      }, 1500);
    } catch (e: any) {
      setRunning(false);
      setError(e?.message || "Failed to query local IPs");
    }
  };

  useEffect(() => {
    startDiscovery();
    return () => {
      try {
        pcRef.current?.close();
      } catch {}
    };
  }, []);

  const copyAll = async () => {
    const text = ips.map((i) => `${i.ip} (${i.type})`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const ipv4 = useMemo(() => ips.filter((i) => i.type === "IPv4"), [ips]);
  const ipv6 = useMemo(() => ips.filter((i) => i.type === "IPv6"), [ips]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="flex items-center justify-end">
              <div className="flex gap-2">
                <button
                  onClick={startDiscovery}
                  disabled={running}
                  className="px-3 py-1 bg-primary hover:bg-primary/80 disabled:opacity-60 rounded text-sm transition-colors text-black font-bold"
                >
                  {running ? "Scanning…" : "Rescan"}
                </button>
                <button
                  onClick={copyAll}
                  className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                >
                  Copy All
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red/30 border border-red/50 text-red text-sm">
                {error}
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">IPv4</h2>
                {ipv4.length === 0 ? (
                  <div className="text-white/60 text-sm">
                    No IPv4 detected yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {ipv4.map((i) => (
                      <div
                        key={i.ip}
                        className="p-3 rounded border border-white/10 bg-white/5 flex items-center justify-between"
                      >
                        <code className="font-mono text-sm">{i.ip}</code>
                        <span className="text-xs text-white/60">
                          {i.source}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">IPv6</h2>
                {ipv6.length === 0 ? (
                  <div className="text-white/60 text-sm">
                    No IPv6 detected yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {ipv6.map((i) => (
                      <div
                        key={i.ip}
                        className="p-3 rounded border border-white/10 bg-white/5 flex items-center justify-between"
                      >
                        <code className="font-mono text-sm">{i.ip}</code>
                        <span className="text-xs text-white/60">
                          {i.source}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs text-white/50">
              Note: Browser privacy features or network policies may restrict
              local IP discovery.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsMyLocalIPAddress;
