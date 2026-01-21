"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface JwtParts {
  header: any;
  payload: any;
  signature: string;
  raw: string;
}

function parseJwt(token: string): JwtParts | null {
  try {
    const parts = token.trim().split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signature] = parts;
    
    // Decode header
    const headerJson = atob(headerB64.replace(/-/g, '+').replace(/_/g, '/'));
    const header = JSON.parse(headerJson);
    
    // Decode payload
    const payloadJson = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);

    return {
      header,
      payload,
      signature,
      raw: token
    };
  } catch (error) {
    return null;
  }
}

const JwtDecoder: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [jwtParts, setJwtParts] = useState<JwtParts | null>(null);
  const [showExpiry, setShowExpiry] = useState<boolean>(true);
  const [formatJson, setFormatJson] = useState<boolean>(true);

  const fileRef = useRef<HTMLInputElement>(null);

  const decode = useCallback(() => {
    if (!input.trim()) {
      setError("");
      setOutput("");
      setJwtParts(null);
      return;
    }

    const parsed = parseJwt(input);
    if (!parsed) {
      setError("Invalid JWT token format");
      setOutput("");
      setJwtParts(null);
      return;
    }

    setError("");
    setJwtParts(parsed);

    // Format output
    let result = "";
    
    if (formatJson) {
      result += "=== HEADER ===\n";
      result += JSON.stringify(parsed.header, null, 2);
      result += "\n\n=== PAYLOAD ===\n";
      result += JSON.stringify(parsed.payload, null, 2);
      result += "\n\n=== SIGNATURE ===\n";
      result += parsed.signature;
    } else {
      result += "Header: " + JSON.stringify(parsed.header);
      result += "\nPayload: " + JSON.stringify(parsed.payload);
      result += "\nSignature: " + parsed.signature;
    }

    // Add expiry info if requested
    if (showExpiry && parsed.payload.exp) {
      const expDate = new Date(parsed.payload.exp * 1000);
      const now = new Date();
      const isExpired = expDate < now;
      
      result += `\n\n=== EXPIRY INFO ===\n`;
      result += `Expires: ${expDate.toISOString()}\n`;
      result += `Status: ${isExpired ? 'EXPIRED' : 'VALID'}\n`;
      result += `Time until expiry: ${isExpired ? 'Already expired' : Math.floor((expDate.getTime() - now.getTime()) / 1000) + ' seconds'}`;
    }

    setOutput(result);
  }, [input, formatJson, showExpiry]);

  useEffect(() => { if (autoUpdate) decode(); }, [input, formatJson, showExpiry, autoUpdate, decode]);

  const onCopy = useCallback(async () => { try { await navigator.clipboard.writeText(output); } catch (_) {} }, [output]);
  const onDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "jwt-decoded.txt"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  }, [output]);
  const onClear = useCallback(() => { setInput(""); setOutput(""); setError(""); setJwtParts(null); }, []);
  const onUploadClick = useCallback(() => fileRef.current?.click(), []);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setInput(String(ev.target?.result ?? ""));
    reader.readAsText(f);
  };

  const hint = useMemo(() => {
    if (error) return error;
    if (jwtParts) {
      const alg = jwtParts.header.alg || 'Unknown';
      const iss = jwtParts.payload.iss || 'Unknown';
      return `Algorithm: ${alg} | Issuer: ${iss}`;
    }
    return "Paste a JWT token to decode";
  }, [error, jwtParts]);

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
          <div className="md:w-[900px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" checked={autoUpdate} onChange={(e) => setAutoUpdate(e.target.checked)} />
                  Auto-update
                </label>
                <button onClick={decode} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Decode</button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={onCopy} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Copy</button>
                <button onClick={onDownload} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Download</button>
                <button onClick={onClear} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-red hover:bg-red/90 text-black font-bold">Clear</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <span className="text-sm text-white/80">Input (JWT Token)</span>
                  <div className="flex gap-2">
                    <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={onFileChange} />
                    <button onClick={onUploadClick} className="border border-black/30 px-3 py-1 rounded text-xs sm:text-sm bg-primary hover:bg-primary/90 text-black font-bold">Upload</button>
                  </div>
                </div>
                <textarea 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                  className="w-full h-24 sm:h-32 bg-black rounded p-3 font-mono text-xs sm:text-sm border border-white/20 resize-none" 
                />
                <div className={`text-xs mt-2 ${error ? "text-red-400" : "text-white/60"}`}>{hint}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">Output (Decoded)</span>
                </div>
                <textarea 
                  value={output} 
                  readOnly 
                  className="w-full h-24 sm:h-32 bg-black rounded p-3 font-mono text-xs sm:text-sm border border-white/20 resize-none" 
                />
              </div>
            </div>

            <div className="mt-6 bg-[#FFFFFF1A] rounded-2xl p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 text-sm md:mt-2">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    className="accent-primary" 
                    checked={formatJson} 
                    onChange={(e) => setFormatJson(e.target.checked)} 
                  />
                  Format JSON
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    className="accent-primary" 
                    checked={showExpiry} 
                    onChange={(e) => setShowExpiry(e.target.checked)} 
                  />
                  Show expiry info
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default JwtDecoder;
