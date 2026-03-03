"use client";
import React, { useCallback, useMemo, useState } from "react";
import zxcvbn from "zxcvbn";
import { toast } from "react-toastify";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Analyze password strength using zxcvbn
  const analysis = useMemo(() => {
    if (!password) return null;
    return zxcvbn(password);
  }, [password]);

  // Get strength level and color
  const getStrengthInfo = useCallback(
    (score: number) => {
      switch (score) {
        case 0:
          return { label: "Very Weak", color: "#ef4444", percentage: 20 }; // Red
        case 1:
          return { label: "Weak", color: "#f97316", percentage: 40 }; // Orange
        case 2:
          return { label: "Fair", color: "#eab308", percentage: 60 }; // Yellow
        case 3:
          return { label: "Good", color: "#84cc16", percentage: 80 }; // Light Green
        case 4:
          return { label: "Very Strong", color: "#22c55e", percentage: 100 }; // Green
        default:
          return { label: "Neutral", color: "#6b7280", percentage: 0 }; // Gray
      }
    },
    []
  );

  // Format crack time for display
  const formatCrackTime = useCallback((seconds: number): string => {
    if (seconds === Infinity || !isFinite(seconds)) {
      return "Centuries+";
    }

    if (seconds < 1) return "Less than a second";
    if (seconds < 60) return Math.round(seconds) + " seconds";
    if (seconds < 3600) return Math.round(seconds / 60) + " minutes";
    if (seconds < 86400) return Math.round(seconds / 3600) + " hours";
    if (seconds < 2592000) return Math.round(seconds / 86400) + " days";
    if (seconds < 31536000) return Math.round(seconds / 2592000) + " months";
    return Math.round(seconds / 31536000) + " years";
  }, []);

  // Get crack time estimates
  const getCrackTimes = useCallback((): CrackTime | null => {
    if (!analysis) return null;

    const crackTimesSeconds = analysis.crack_times_seconds;

    return {
      onlineThrottling100perHour: formatCrackTime(
        typeof crackTimesSeconds.online_throttling_100_per_hour === "number"
          ? crackTimesSeconds.online_throttling_100_per_hour
          : 0
      ),
      onlineNoThrottling10perSecond: formatCrackTime(
        typeof crackTimesSeconds.online_no_throttling_10_per_second === "number"
          ? crackTimesSeconds.online_no_throttling_10_per_second
          : 0
      ),
      offlineSlowHashing1e4perSecond: formatCrackTime(
        typeof crackTimesSeconds.offline_slow_hashing_1e4_per_second ===
          "number"
          ? crackTimesSeconds.offline_slow_hashing_1e4_per_second
          : 0
      ),
      offlineFastHashing1e10perSecond: formatCrackTime(
        typeof crackTimesSeconds.offline_fast_hashing_1e10_per_second ===
          "number"
          ? crackTimesSeconds.offline_fast_hashing_1e10_per_second
          : 0
      ),
    };
  }, [analysis, formatCrackTime]);

  interface CrackTime {
    onlineThrottling100perHour: string;
    onlineNoThrottling10perSecond: string;
    offlineSlowHashing1e4perSecond: string;
    offlineFastHashing1e10perSecond: string;
  }

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      toast.success("Password copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (_err) {
      toast.error("Failed to copy password");
    }
  };

  // Handle clear
  const handleClear = () => {
    setPassword("");
    setShowPassword(false);
    setCopied(false);
  };

  const strengthInfo =
    analysis && analysis.score !== undefined
      ? getStrengthInfo(analysis.score)
      : null;
  const crackTimes = getCrackTimes();

  return (
    <section className="md:py-[30px] py-[50px]">
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              {/* Password Input Section */}
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Enter Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Type your password to check strength..."
                      className={`${DevelopmentToolsStyles.scrollbar} w-full bg-black !border !border-[#222222] p-4 pr-12 rounded-xl focus:outline-none focus:border-[#444444] text-white`}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Strength Meter */}
                {password && strengthInfo && (
                  <>
                    {/* Strength Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium">
                          Strength
                        </label>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: strengthInfo.color }}
                        >
                          {strengthInfo.label}
                        </span>
                      </div>
                      <div className="w-full bg-[#1a1a1a] rounded-full h-3 overflow-hidden border border-[#333333]">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${strengthInfo.percentage}%`,
                            backgroundColor: strengthInfo.color,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Detailed Analytics */}
                    {crackTimes && (
                      <div className="bg-[#0a0a0a] rounded-lg border border-[#222222] p-4">
                        <h3 className="text-sm font-semibold mb-3">
                          Crack Time Estimates
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="bg-[#111111] rounded p-3 border border-[#2a2a2a]">
                            <p className="text-gray-400 mb-1">
                              Online Attack (Throttled)
                            </p>
                            <p className="text-white font-mono">
                              {crackTimes.onlineThrottling100perHour}
                            </p>
                          </div>
                          <div className="bg-[#111111] rounded p-3 border border-[#2a2a2a]">
                            <p className="text-gray-400 mb-1">
                              Online Attack (Unthrottled)
                            </p>
                            <p className="text-white font-mono">
                              {crackTimes.onlineNoThrottling10perSecond}
                            </p>
                          </div>
                          <div className="bg-[#111111] rounded p-3 border border-[#2a2a2a]">
                            <p className="text-gray-400 mb-1">
                              Offline Attack (Slow Hashing)
                            </p>
                            <p className="text-white font-mono">
                              {crackTimes.offlineSlowHashing1e4perSecond}
                            </p>
                          </div>
                          <div className="bg-[#111111] rounded p-3 border border-[#2a2a2a]">
                            <p className="text-gray-400 mb-1">
                              Offline Attack (Fast Hashing)
                            </p>
                            <p className="text-white font-mono">
                              {crackTimes.offlineFastHashing1e10perSecond}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Warnings */}
                    {analysis && analysis.feedback.warning && (
                      <div className="bg-yellow-900 border border-yellow-700 text-yellow-100 px-4 py-3 rounded-lg text-sm">
                        <p className="font-semibold">⚠️ Warning</p>
                        <p>{analysis.feedback.warning}</p>
                      </div>
                    )}

                    {/* Suggestions */}
                    {analysis && analysis.feedback.suggestions &&
                      analysis.feedback.suggestions.length > 0 && (
                        <div className="bg-blue-900 border border-blue-700 text-blue-100 px-4 py-3 rounded-lg text-sm">
                          <p className="font-semibold mb-2">💡 Suggestions</p>
                          <ul className="list-disc list-inside space-y-1">
                            {analysis.feedback.suggestions.map(
                              (suggestion: string, idx: number) => (
                                <li key={idx}>{suggestion}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Entropy Info */}
                    {analysis && (
                      <div className="bg-[#0a0a0a] rounded-lg border border-[#222222] p-4">
                        <h3 className="text-sm font-semibold mb-3">
                          Entropy Analysis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="text-gray-400 mb-1">
                              log₁₀(Estimated Guesses)
                            </p>
                            <p className="text-white font-mono text-lg">
                              {analysis.guesses_log10.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 mb-1">
                              Estimated Guesses
                            </p>
                            <p className="text-white font-mono text-lg">
                              {analysis.guesses
                                .toExponential(2)
                                .replace(/e\+/, "e")}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Sequence Analysis */}
                    {analysis && analysis.sequence.length > 0 && (
                      <div className="bg-[#0a0a0a] rounded-lg border border-[#222222] p-4">
                        <h3 className="text-sm font-semibold mb-3">
                          Pattern Breakdown
                        </h3>
                        <div className="space-y-2 text-xs">
                          {analysis.sequence.slice(0, 5).map((match: any, idx: number) => (
                            <div
                              key={idx}
                              className="bg-[#111111] rounded p-2 border border-[#2a2a2a]"
                            >
                              <p className="text-gray-400">
                                {match.pattern || "Pattern"}
                              </p>
                              <p className="text-white font-mono">
                                {match.token}
                              </p>
                            </div>
                          ))}
                          {analysis.sequence.length > 5 && (
                            <p className="text-gray-400 text-center py-2">
                              +{analysis.sequence.length - 5} more patterns
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Action Buttons */}
                {password && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200"
                    >
                      {copied ? "✓ Copied" : "Copy Password"}
                    </button>
                    <button
                      onClick={handleClear}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200"
                    >
                      Clear
                    </button>
                  </div>
                )}

                {/* Empty State */}
                {!password && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">
                      Enter a password to see strength analysis
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordStrengthMeter;
