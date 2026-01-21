"use client";
import React, { useEffect, useState } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">
    {children}
  </code>
);

interface TorDetectionResult {
  isTor: boolean;
  confidence: string;
  details: string;
  loading: boolean;
  error: string | null;
}

const AmIUsingTor = () => {
  const [torResult, setTorResult] = useState<TorDetectionResult>({
    isTor: false,
    confidence: "",
    details: "",
    loading: true,
    error: null,
  });

  const detectTor = async () => {
    try {
      setTorResult(prev => ({ ...prev, loading: true, error: null }));
      
      // Multiple detection methods
      const detections = await Promise.allSettled([
        // Method 1: Check for Tor exit node IPs
        fetch('https://check.torproject.org/api/ip')
          .then(res => res.json())
          .then(data => ({ method: 'torproject', result: data })),
        
        // Method 2: Check user agent for Tor browser
        Promise.resolve({ 
          method: 'useragent', 
          result: { 
            isTor: /Tor/i.test(navigator.userAgent),
            userAgent: navigator.userAgent 
          } 
        }),
        
        // Method 3: Check for Tor-specific properties
        Promise.resolve({ 
          method: 'properties', 
          result: { 
            isTor: !!(window as any).tor || !!(window as any).onion,
            hasTorProperties: !!(window as any).tor || !!(window as any).onion
          } 
        })
      ]);

      let torDetected = false;
      let confidence = "Low";
      let details = "";

      // Analyze results
      detections.forEach((detection, index) => {
        if (detection.status === 'fulfilled') {
          const { method, result } = detection.value;
          
          if (method === 'torproject' && result.IsTor) {
            torDetected = true;
            confidence = "High";
            details = "Your IP address is identified as a Tor exit node.";
          } else if (method === 'useragent' && result.isTor) {
            torDetected = true;
            confidence = "High";
            details = "Tor browser user agent detected.";
          } else if (method === 'properties' && result.isTor) {
            torDetected = true;
            confidence = "Medium";
            details = "Tor-specific properties detected in browser.";
          }
        }
      });

      // Additional checks
      const additionalChecks = {
        hasTorUserAgent: /Tor/i.test(navigator.userAgent),
        hasOnionDomain: window.location.hostname.includes('.onion'),
        hasTorProperties: !!(window as any).tor || !!(window as any).onion,
        isLocalhost: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      };

      if (additionalChecks.hasOnionDomain) {
        torDetected = true;
        confidence = "Very High";
        details = "You are accessing an .onion domain, which requires Tor.";
      }

      if (additionalChecks.isLocalhost && !torDetected) {
        details = "Local development environment detected. Tor detection may not be accurate.";
        confidence = "Low";
      }

      setTorResult({
        isTor: torDetected,
        confidence,
        details: details || (torDetected ? "Tor usage detected through multiple methods." : "No Tor usage detected."),
        loading: false,
        error: null,
      });

    } catch (error) {
      setTorResult(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to detect Tor usage'
      }));
    }
  };

  useEffect(() => {
    detectTor();
  }, []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const copyResult = () => {
    const result = `Tor Detection Result: ${torResult.isTor ? 'YES' : 'NO'}
Confidence: ${torResult.confidence}
Details: ${torResult.details}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}`;
    copy(result);
  };

  const getStatusColor = () => {
    if (torResult.loading) return "text-yellow-300";
    if (torResult.error) return "text-red-300";
    return torResult.isTor ? "text-green-300" : "text-blue-300";
  };

  const getStatusIcon = () => {
    if (torResult.loading) return "🔄";
    if (torResult.error) return "❌";
    return torResult.isTor ? "🔒" : "🌐";
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            
            {/* Main Tor Detection Result */}
            <div className="bg-primary/15 border border-primary/30 text-white/90 rounded-lg p-6">
              <div className="text-center w-full">
                {torResult.loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    <span>Detecting Tor usage...</span>
                  </div>
                ) : torResult.error ? (
                  <div className="text-red-300">{torResult.error}</div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-2xl">{getStatusIcon()}</div>
                    <div className={`text-lg font-semibold ${getStatusColor()}`}>
                      {torResult.isTor ? "YES - You are using Tor" : "NO - You are not using Tor"}
                    </div>
                    <div className="text-sm text-white/70">
                      Confidence: {torResult.confidence}
                    </div>
                    <div className="text-sm text-white/70">
                      {torResult.details}
                    </div>
                  </div>
                )}
              </div>
              {!torResult.loading && !torResult.error && (
                <button
                  onClick={copyResult}
                  className="mt-4 w-full px-4 py-2 rounded bg-primary hover:bg-primary/80 border border-black/20 text-sm text-black font-bold"
                  title="Copy detection result"
                >
                  Copy Result
                </button>
              )}
            </div>

            {/* Detection Methods */}
            <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-3 text-sm">
              <h2 className="font-semibold">Detection Methods Used</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Automatic Detection</h3>
                  <ul className="list-disc pl-5 text-white/80 space-y-1">
                    <li>Tor exit node IP verification</li>
                    <li>Tor browser user agent detection</li>
                    <li>Tor-specific browser properties</li>
                    <li>.onion domain detection</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Manual Verification</h3>
                  <ul className="list-disc pl-5 text-white/80 space-y-1">
                    <li>Check Tor browser installation</li>
                    <li>Verify .onion domain access</li>
                    <li>Check network configuration</li>
                    <li>Review browser settings</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Manual Detection Steps */}
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-2">
                <h2 className="font-semibold">Check Tor Browser</h2>
                <ol className="list-decimal pl-5 text-white/80 space-y-1">
                  <li>Look for &#34;Tor Browser&#34; in your browser title</li>
                  <li>Check if you see onion icons</li>
                  <li>Verify the browser was downloaded from torproject.org</li>
                  <li>Check if you can access .onion websites</li>
                </ol>
              </div>
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-2">
                <h2 className="font-semibold">Command Line Check</h2>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Cmd>curl -s check.torproject.org</Cmd>
                    <button
                      onClick={() => copy("curl -s check.torproject.org")}
                      className="px-2 py-1 bg-primary text-black rounded text-xs"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cmd>wget -qO- check.torproject.org</Cmd>
                    <button
                      onClick={() => copy("wget -qO- check.torproject.org")}
                      className="px-2 py-1 bg-primary text-black rounded text-xs"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy and Security Notes */}
            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Privacy & Security Notes</h2>
              <ul className="list-disc pl-5 text-white/80 space-y-1">
                <li>
                  <strong>Tor provides anonymity:</strong> Your real IP address is hidden behind multiple relays.
                </li>
                <li>
                  <strong>Exit node monitoring:</strong> Your traffic may be visible to the exit node operator.
                </li>
                <li>
                  <strong>HTTPS is important:</strong> Always use HTTPS when browsing through Tor for additional security.
                </li>
                <li>
                  <strong>Don&#39;t mix identities:</strong> Avoid logging into personal accounts while using Tor.
                </li>
                <li>
                  <strong>Keep Tor updated:</strong> Regularly update Tor browser for security patches.
                </li>
              </ul>
            </div>

            {/* Troubleshooting */}
            <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-2">
              <h2 className="font-semibold">Troubleshooting</h2>
              <ul className="list-disc pl-5 text-white/80 space-y-1">
                <li>
                  If detection fails, try refreshing the page or restarting Tor browser.
                </li>
                <li>
                  Some corporate networks may block Tor traffic entirely.
                </li>
                <li>
                  VPN usage may interfere with Tor detection methods.
                </li>
                <li>
                  For maximum privacy, use Tor browser exclusively for anonymous browsing.
                </li>
              </ul>
            </div>

            {/* Refresh Button */}
            <div className="text-center">
              <button
                onClick={detectTor}
                disabled={torResult.loading}
                className="px-6 py-2 bg-primary hover:bg-primary/80 disabled:bg-primary/50 text-black font-bold rounded-lg"
              >
                {torResult.loading ? "Detecting..." : "Refresh Detection"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmIUsingTor;
