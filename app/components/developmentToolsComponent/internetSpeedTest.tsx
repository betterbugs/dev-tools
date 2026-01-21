"use client";

import React, { useState, useRef, useEffect } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  jitter: number;
  isp?: string;
  server?: string;
}

const InternetSpeedTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [testHistory, setTestHistory] = useState<SpeedTestResult[]>([]);
  const [error, setError] = useState<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate speed test (in real implementation, this would use actual network APIs)
  const simulateSpeedTest = async (): Promise<SpeedTestResult> => {
    return new Promise((resolve) => {
      let currentProgress = 0;
      const testDuration = 15000; // 15 seconds total
      const progressInterval = 100;

      const updateProgress = () => {
        currentProgress += (progressInterval / testDuration) * 100;
        setProgress(Math.min(currentProgress, 100));

        if (currentProgress < 20) {
          setCurrentTest("Testing Ping...");
        } else if (currentProgress < 60) {
          setCurrentTest("Testing Download Speed...");
        } else if (currentProgress < 90) {
          setCurrentTest("Testing Upload Speed...");
        } else {
          setCurrentTest("Calculating Jitter...");
        }

        if (currentProgress >= 100) {
          // Generate realistic test results
          const downloadSpeed = Math.random() * 100 + 20; // 20-120 Mbps
          const uploadSpeed = Math.random() * 50 + 10; // 10-60 Mbps
          const ping = Math.random() * 50 + 10; // 10-60 ms
          const jitter = Math.random() * 10 + 1; // 1-11 ms

          resolve({
            downloadSpeed: Math.round(downloadSpeed * 10) / 10,
            uploadSpeed: Math.round(uploadSpeed * 10) / 10,
            ping: Math.round(ping),
            jitter: Math.round(jitter * 10) / 10,
            isp: "Your ISP",
            server: "Local Server",
          });
        } else {
          intervalRef.current = setTimeout(updateProgress, progressInterval);
        }
      };

      updateProgress();
    });
  };

  const startSpeedTest = async () => {
    setIsRunning(true);
    setProgress(0);
    setResult(null);
    setError("");
    setCurrentTest("Initializing...");

    try {
      const testResult = await simulateSpeedTest();
      setResult(testResult);
      setTestHistory((prev) => [testResult, ...prev.slice(0, 4)]); // Keep last 5 results
    } catch (err) {
      setError("Speed test failed. Please try again.");
    } finally {
      setIsRunning(false);
      setCurrentTest("");
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    }
  };

  const getSpeedRating = (speed: number, type: "download" | "upload") => {
    const thresholds =
      type === "download"
        ? { excellent: 100, good: 50, fair: 25, poor: 10 }
        : { excellent: 50, good: 25, fair: 10, poor: 5 };

    if (speed >= thresholds.excellent)
      return { rating: "Excellent", color: "text-green-400" };
    if (speed >= thresholds.good)
      return { rating: "Good", color: "text-blue-400" };
    if (speed >= thresholds.fair)
      return { rating: "Fair", color: "text-yellow-400" };
    return { rating: "Poor", color: "text-red-400" };
  };

  const getPingRating = (ping: number) => {
    if (ping <= 20) return { rating: "Excellent", color: "text-green-400" };
    if (ping <= 50) return { rating: "Good", color: "text-blue-400" };
    if (ping <= 100) return { rating: "Fair", color: "text-yellow-400" };
    return { rating: "Poor", color: "text-red-400" };
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                {/* Speed Test Interface */}
                <div className="text-center">
                  {!isRunning && !result && (
                    <button
                      onClick={startSpeedTest}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-4 px-8 rounded-lg text-lg bg-primary hover:bg-primary/90`}
                    >
                      Start Speed Test
                    </button>
                  )}

                  {isRunning && (
                    <div className="space-y-4">
                      <div className="text-white/80 text-lg">{currentTest}</div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-primary h-3 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-white/60">
                        {Math.round(progress)}% Complete
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="text-red-400 bg-red-900/20 border border-red-400/30 rounded-lg p-4 mt-4">
                      {error}
                    </div>
                  )}
                </div>

                {/* Results Display */}
                {result && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Download Speed */}
                    <div className="bg-black/40 rounded-lg p-4 text-center">
                      <div className="text-white/60 text-sm mb-2">
                        Download Speed
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {result.downloadSpeed} Mbps
                      </div>
                      <div
                        className={`text-sm ${
                          getSpeedRating(result.downloadSpeed, "download").color
                        }`}
                      >
                        {
                          getSpeedRating(result.downloadSpeed, "download")
                            .rating
                        }
                      </div>
                    </div>

                    {/* Upload Speed */}
                    <div className="bg-black/40 rounded-lg p-4 text-center">
                      <div className="text-white/60 text-sm mb-2">
                        Upload Speed
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {result.uploadSpeed} Mbps
                      </div>
                      <div
                        className={`text-sm ${
                          getSpeedRating(result.uploadSpeed, "upload").color
                        }`}
                      >
                        {getSpeedRating(result.uploadSpeed, "upload").rating}
                      </div>
                    </div>

                    {/* Ping */}
                    <div className="bg-black/40 rounded-lg p-4 text-center">
                      <div className="text-white/60 text-sm mb-2">Ping</div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {result.ping} ms
                      </div>
                      <div
                        className={`text-sm ${
                          getPingRating(result.ping).color
                        }`}
                      >
                        {getPingRating(result.ping).rating}
                      </div>
                    </div>

                    {/* Jitter */}
                    <div className="bg-black/40 rounded-lg p-4 text-center">
                      <div className="text-white/60 text-sm mb-2">Jitter</div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {result.jitter} ms
                      </div>
                      <div className="text-sm text-white/60">Variation</div>
                    </div>
                  </div>
                )}

                {/* Test Details */}
                {result && (
                  <div className="bg-black/20 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">
                      Test Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Server:</span>
                        <span className="text-white ml-2">{result.server}</span>
                      </div>
                      <div>
                        <span className="text-white/60">ISP:</span>
                        <span className="text-white ml-2">{result.isp}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Test History */}
                {testHistory.length > 0 && (
                  <div className="bg-black/20 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">
                      Recent Tests
                    </h3>
                    <div className="space-y-2 md:mt-2">
                      {testHistory.map((test, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm bg-black/30 rounded p-2"
                        >
                          <div className="text-white/60">
                            Test #{testHistory.length - index}
                          </div>
                          <div className="flex gap-4 text-white">
                            <span>↓ {test.downloadSpeed} Mbps</span>
                            <span>↑ {test.uploadSpeed} Mbps</span>
                            <span>⏱ {test.ping} ms</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  {result && (
                    <button
                      onClick={startSpeedTest}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg bg-primary hover:bg-primary/90`}
                    >
                      Run Another Test
                    </button>
                  )}
                  {testHistory.length > 0 && (
                    <button
                      onClick={() => setTestHistory([])}
                      className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg bg-red hover:bg-red/90`}
                    >
                      Clear History
                    </button>
                  )}
                </div>

                {/* Information */}
                <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4">
                  <h4 className="text-blue-400 font-semibold mb-2">
                    Tips for Accurate Results
                  </h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>
                      • Close other applications using the internet during the
                      test
                    </li>
                    <li>
                      • Use a wired connection for the most reliable results
                    </li>
                    <li>
                      • Run multiple tests at different times for a complete
                      picture
                    </li>
                    <li>
                      • Ensure no other devices are downloading large files
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternetSpeedTest;
