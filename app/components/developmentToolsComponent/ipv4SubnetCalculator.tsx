"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

interface SubnetResults {
  networkAddress: string;
  broadcastAddress: string;
  usableHostRange: { start: string; end: string };
  totalHosts: number;
  usableHosts: number;
  wildcardMask: string;
  subnetMask: string;
  firstOctet: string;
  maskBits: number;
}

function ipToOctets(ip: string): number[] | null {
  const parts = ip.split(".").map((p) => p.trim());
  if (parts.length !== 4) return null;
  const octets = parts.map((p) => {
    const num = parseInt(p, 10);
    if (isNaN(num) || num < 0 || num > 255) return null;
    return num;
  });
  return octets.some((o) => o === null) ? null : (octets as number[]);
}

function octetsToIp(octets: number[]): string {
  return octets.join(".");
}

function ipToNumber(octets: number[]): number {
  return (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3];
}

function numberToIp(num: number): string {
  const octets = [
    (num >>> 24) & 0xff,
    (num >>> 16) & 0xff,
    (num >>> 8) & 0xff,
    num & 0xff,
  ];
  return octetsToIp(octets);
}

function createMaskFromCIDR(cidr: number): string {
  if (cidr < 0 || cidr > 32) return "";
  if (cidr === 0) return "0.0.0.0";
  if (cidr === 32) return "255.255.255.255";
  const maskNum = (-1 << (32 - cidr)) >>> 0;
  return numberToIp(maskNum);
}

function cidrFromMask(mask: string): number | null {
  const octets = ipToOctets(mask);
  if (!octets) return null;
  let maskNum = ipToNumber(octets);
  let bits = 0;
  for (let i = 0; i < 32; i++) {
    if ((maskNum & 0x80000000) !== 0) {
      bits++;
      maskNum = (maskNum << 1) >>> 0;
    } else {
      break;
    }
  }
  for (let i = 0; i < 32 - bits; i++) {
    if ((maskNum & 0x80000000) !== 0) return null;
    maskNum = (maskNum << 1) >>> 0;
  }
  return bits;
}

function calculateSubnet(ip: string, cidr: number): SubnetResults | null {
  const octets = ipToOctets(ip);
  if (!octets || cidr < 0 || cidr > 32) return null;

  const ipNum = ipToNumber(octets);
  
  // Special handling for CIDR 0 to avoid JavaScript bit-shift issues
  let maskNum: number;
  if (cidr === 0) {
    maskNum = 0;
  } else {
    maskNum = (-1 << (32 - cidr)) >>> 0;
  }
  
  const networkNum = ipNum & maskNum;
  const broadcastNum = networkNum | ((~maskNum) >>> 0);
  
  const hostBits = 32 - cidr;
  const totalHosts = cidr === 32 ? 1 : Math.pow(2, hostBits);
  
  // RFC 3021: /31 has 2 usable hosts (point-to-point), /32 has 1 (single host)
  let usableHosts: number;
  if (cidr === 32) {
    usableHosts = 1;
  } else if (cidr === 31) {
    usableHosts = 2;
  } else {
    usableHosts = Math.max(0, totalHosts - 2);
  }
  
  // Usable host range
  let firstUsableNum: number;
  let lastUsableNum: number;
  
  if (cidr === 32) {
    // /32: single host
    firstUsableNum = networkNum;
    lastUsableNum = networkNum;
  } else if (cidr === 31) {
    // /31: both IPs are usable (RFC 3021 point-to-point)
    firstUsableNum = networkNum;
    lastUsableNum = broadcastNum;
  } else {
    // Standard case: network + 1 to broadcast - 1
    firstUsableNum = networkNum + 1;
    lastUsableNum = broadcastNum - 1;
  }

  const wildcardNum = (~maskNum) >>> 0;

  return {
    networkAddress: numberToIp(networkNum),
    broadcastAddress: numberToIp(broadcastNum),
    usableHostRange: {
      start: numberToIp(
        firstUsableNum
      ),
      end: numberToIp(lastUsableNum),
    },
    totalHosts: totalHosts,
    usableHosts: usableHosts,
    wildcardMask: numberToIp(wildcardNum),
    subnetMask: createMaskFromCIDR(cidr),
    firstOctet: String(octets[0]),
    maskBits: cidr,
  };
}

const Ipv4SubnetCalculator: React.FC = () => {
  const [ip, setIp] = useState<string>("192.168.1.100");
  const [cidrInput, setCidrInput] =
    useState<string>("24");
  const [maskInput, setMaskInput] =
    useState<string>("");
  const [inputMode, setInputMode] =
    useState<"cidr" | "mask">("cidr");
  const [error, setError] = useState<string>(
    ""
  );
  const [result, setResult] =
    useState<SubnetResults | null>(null);
  const [hasSubmitted, setHasSubmitted] =
    useState<boolean>(false);

  const validate = useCallback(() => {
    // Don't validate empty inputs until user clicks Calculate
    if (!hasSubmitted) {
      setError("");
      setResult(null);
      return false;
    }

    const octet = ipToOctets(ip);
    if (!octet) {
      setError(
        "Invalid IP address. Use format: 0.0.0.0"
      );
      return false;
    }

    let cidr: number | null = null;

    if (inputMode === "cidr") {
      cidr = parseInt(cidrInput, 10);
      if (
        isNaN(cidr) ||
        cidr < 0 ||
        cidr > 32
      ) {
        setError(
          "CIDR must be between 0 and 32"
        );
        return false;
      }
    } else {
      const maskOctets = ipToOctets(maskInput);
      if (!maskOctets) {
        setError(
          "Invalid subnet mask format"
        );
        return false;
      }
      cidr = cidrFromMask(maskInput);
      if (cidr === null) {
        setError(
          "Invalid subnet mask (not contiguous)"
        );
        return false;
      }
    }

    setError("");
    const calcResult = calculateSubnet(
      ip,
      cidr
    );
    if (calcResult) {
      setResult(calcResult);
      if (inputMode === "cidr") {
        setMaskInput(
          createMaskFromCIDR(cidr)
        );
      } else {
        setCidrInput(String(cidr));
      }
    }

    return true;
  }, [ip, cidrInput, maskInput, inputMode, hasSubmitted]);

  const handleCalculate = useCallback(() => {
    setHasSubmitted(true);
    validate();
  }, [validate]);

  const ipBinary = useMemo(() => {
    const octets = ipToOctets(ip);
    if (!octets) return "";
    return octets
      .map((o) => o.toString(2).padStart(8, "0"))
      .join(".");
  }, [ip]);

  const maskBinary = useMemo(() => {
    if (inputMode === "cidr") {
      const mask =
        createMaskFromCIDR(
          parseInt(cidrInput, 10)
        ) || "";
      const octets = ipToOctets(mask);
      if (!octets) return "";
      return octets
        .map((o) =>
          o.toString(2).padStart(8, "0")
        )
        .join(".");
    }
    const octets = ipToOctets(maskInput);
    if (!octets) return "";
    return octets
      .map((o) =>
        o.toString(2).padStart(8, "0")
      )
      .join(".");
  }, [inputMode, cidrInput, maskInput]);

  const onClearAll = useCallback(() => {
    setIp("");
    setCidrInput("");
    setMaskInput("");
    setError("");
    setResult(null);
    setHasSubmitted(false);
  }, []);

  // Validate when hasSubmitted changes
  useEffect(() => {
    if (hasSubmitted) {
      validate();
    }
  }, [ip, cidrInput, maskInput, inputMode, hasSubmitted, validate]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              IPv4 Subnet Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* IP Address Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/90">
                  IP Address
                </label>
                <input
                  type="text"
                  value={ip}
                  onChange={(e) =>
                    setIp(e.target.value)
                  }
                  placeholder="e.g. 192.168.1.100"
                  className="w-full bg-black rounded p-3 font-mono text-sm border border-white/20 focus:border-primary/50 outline-none"
                />
                <div className="text-xs text-white/60 mt-2 font-mono">
                  {ipBinary}
                </div>
              </div>

              {/* CIDR or Subnet Mask Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-white/90">
                    {inputMode === "cidr"
                      ? "CIDR Prefix"
                      : "Subnet Mask"}
                  </label>
                  <button
                    onClick={() =>
                      setInputMode(
                        inputMode === "cidr"
                          ? "mask"
                          : "cidr"
                      )
                    }
                    className="text-xs bg-primary/20 hover:bg-primary/30 px-2 py-1 rounded text-primary"
                  >
                    Switch
                  </button>
                </div>
                <input
                  type="text"
                  value={
                    inputMode === "cidr"
                      ? cidrInput
                      : maskInput
                  }
                  onChange={(e) =>
                    inputMode === "cidr"
                      ? setCidrInput(
                          e.target.value
                        )
                      : setMaskInput(
                          e.target.value
                        )
                  }
                  placeholder={
                    inputMode === "cidr"
                      ? "e.g. 24"
                      : "e.g. 255.255.255.0"
                  }
                  className="w-full bg-black rounded p-3 font-mono text-sm border border-white/20 focus:border-primary/50 outline-none"
                />
                <div className="text-xs text-white/60 mt-2 font-mono">
                  {maskBinary}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red/10 border border-red/30 rounded p-3 mb-6 text-sm text-red/90">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-black/40 rounded p-4">
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-2">
                      Network Address
                    </p>
                    <p className="text-lg font-mono text-primary font-bold">
                      {result.networkAddress}
                    </p>
                  </div>
                  <div className="bg-black/40 rounded p-4">
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-2">
                      Broadcast Address
                    </p>
                    <p className="text-lg font-mono text-primary font-bold">
                      {result.broadcastAddress}
                    </p>
                  </div>
                  <div className="bg-black/40 rounded p-4">
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-2">
                      Subnet Mask
                    </p>
                    <p className="text-lg font-mono text-primary font-bold">
                      {result.subnetMask} /{" "}
                      {result.maskBits}
                    </p>
                  </div>
                  <div className="bg-black/40 rounded p-4">
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-2">
                      Wildcard Mask
                    </p>
                    <p className="text-lg font-mono text-primary font-bold">
                      {result.wildcardMask}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-black/40 rounded p-4">
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-2">
                      Usable Host Range
                    </p>
                    <div className="font-mono text-sm space-y-1">
                      <p className="text-primary font-bold">
                        Start:{" "}
                        {
                          result.usableHostRange
                            .start
                        }
                      </p>
                      <p className="text-primary font-bold">
                        End:{" "}
                        {result.usableHostRange.end}
                      </p>
                    </div>
                  </div>
                  <div className="bg-black/40 rounded p-4">
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-2">
                      Host Count
                    </p>
                    <div className="space-y-1">
                      <p className="font-mono text-primary font-bold">
                        Total: {result.totalHosts}
                      </p>
                      <p className="font-mono text-primary font-bold">
                        Usable:{" "}
                        {result.usableHosts}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCalculate}
                className="flex-1 border border-black/30 px-4 py-2 rounded text-sm bg-primary hover:bg-primary/90 text-black font-bold"
              >
                Calculate
              </button>
              <button
                onClick={onClearAll}
                className="border border-black/30 px-4 py-2 rounded text-sm bg-red hover:bg-red/90 text-black font-bold"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ipv4SubnetCalculator;
