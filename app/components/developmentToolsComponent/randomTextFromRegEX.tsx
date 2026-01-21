"use client";
import React, { useState, useEffect } from "react";
import { InputField } from "../theme/form/formFeildComponent";
import { useForm } from "react-hook-form";
import CopyIcon from "../theme/Icon/copyIcon";
import ReloadIcon from "../theme/Icon/reload";
import { CheckIcon } from "../theme/Icon/checkIcon";

const RandomTextFromRegEX = () => {
  const { register, formState, setValue, watch } = useForm<any>({});
  const [customPattern, setCustomPattern] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("email");
  const [count, setCount] = useState(5);
  const [generatedTexts, setGeneratedTexts] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [patternError, setPatternError] = useState<string | null>(null);
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Predefined regex patterns
  const predefinedPatterns = {
    email: {
      name: "Email Address",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}",
      description: "Valid email address format",
    },
    phone: {
      name: "Phone Number",
      pattern: "\\+?[1-9]\\d{1,14}",
      description: "International phone number",
    },
    password: {
      name: "Strong Password",
      pattern:
        "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}",
      description: "8+ chars with uppercase, lowercase, number, special char",
    },
    username: {
      name: "Username",
      pattern: "[a-zA-Z0-9_]{3,20}",
      description: "3-20 characters, letters, numbers, underscores",
    },
    url: {
      name: "URL",
      pattern:
        "https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?",
      description: "Valid HTTP/HTTPS URL",
    },
    ipv4: {
      name: "IPv4 Address",
      pattern:
        "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",
      description: "Valid IPv4 address",
    },
    creditcard: {
      name: "Credit Card",
      pattern: "[0-9]{4}[\\s-]?[0-9]{4}[\\s-]?[0-9]{4}[\\s-]?[0-9]{4}",
      description: "16-digit credit card number",
    },
    date: {
      name: "Date (YYYY-MM-DD)",
      pattern: "\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])",
      description: "Date in YYYY-MM-DD format",
    },
    time: {
      name: "Time (HH:MM:SS)",
      pattern: "([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]",
      description: "Time in HH:MM:SS format",
    },
    hexcolor: {
      name: "Hex Color",
      pattern: "#[0-9a-fA-F]{6}",
      description: "6-digit hexadecimal color code",
    },
    uuid: {
      name: "UUID",
      pattern: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
      description: "Standard UUID format",
    },
  };

  // Generate random text from regex pattern
  const generateFromRegex = (pattern: string): string => {
    try {
      // Simple regex to text generation (this is a basic implementation)
      // For production, you might want to use a more sophisticated library
      let result = pattern;

      // Replace common regex patterns with random values
      result = result.replace(/\\d/g, () =>
        Math.floor(Math.random() * 10).toString()
      );
      result = result.replace(/\\w/g, () => {
        const chars =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return chars[Math.floor(Math.random() * chars.length)];
      });
      result = result.replace(/[a-z]/g, () => {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        return chars[Math.floor(Math.random() * chars.length)];
      });
      result = result.replace(/[A-Z]/g, () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return chars[Math.floor(Math.random() * chars.length)];
      });
      result = result.replace(/[0-9]/g, () =>
        Math.floor(Math.random() * 10).toString()
      );
      result = result.replace(/\\+/g, "");
      result = result.replace(/\\*/g, "");
      result = result.replace(/\\?/g, "");
      result = result.replace(/\\{([^}]+)\\}/g, (match, range) => {
        const [min, max] = range.split(",").map(Number);
        const length = max
          ? Math.floor(Math.random() * (max - min + 1)) + min
          : min;
        return "x".repeat(length);
      });
      result = result.replace(/\\[([^\\]]+\\]/g, (match, chars) => {
        const charSet = chars.replace(/\\-/g, "");
        return charSet[Math.floor(Math.random() * charSet.length)];
      });
      result = result.replace(/\\([^\\])/g, "$1");
      result = result.replace(/x+/g, (match) => {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        return match
          .split("")
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("");
      });

      return result;
    } catch (error) {
      throw new Error("Invalid regex pattern");
    }
  };

  // Generate texts based on pattern
  const generateTexts = () => {
    try {
      setPatternError(null);
      const pattern = isCustomMode
        ? customPattern
        : predefinedPatterns[selectedPattern as keyof typeof predefinedPatterns]
            .pattern;

      if (!pattern.trim()) {
        setPatternError("Please enter a regex pattern");
        return;
      }

      // Validate regex pattern
      try {
        new RegExp(pattern);
      } catch (error) {
        setPatternError("Invalid regex pattern");
        return;
      }

      const newTexts: string[] = [];
      for (let i = 0; i < count; i++) {
        try {
          const generated = generateFromRegex(pattern);
          newTexts.push(generated);
        } catch (error) {
          newTexts.push(`Error generating text: ${error}`);
        }
      }
      setGeneratedTexts(newTexts);
    } catch (error) {
      setPatternError("Error generating text from pattern");
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Copy all texts
  const copyAllTexts = async () => {
    const allTexts = generatedTexts.join("\n");
    try {
      await navigator.clipboard.writeText(allTexts);
      setCopiedIndex(-1);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Handle pattern mode change
  const handleModeChange = (mode: "predefined" | "custom") => {
    setIsCustomMode(mode === "custom");
    setPatternError(null);
    if (mode === "predefined") {
      setCustomPattern("");
    }
  };

  // Generate texts when pattern or count changes
  useEffect(() => {
    if (!isCustomMode || customPattern.trim()) {
      generateTexts();
    }
  }, [selectedPattern, count, isCustomMode]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Configuration */}
      <div className="bg-white/5 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white mb-4">Configuration</h2>

        {/* Pattern Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Pattern Mode
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => handleModeChange("predefined")}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                !isCustomMode
                  ? "bg-primary text-black border-primary"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              Predefined Patterns
            </button>
            <button
              onClick={() => handleModeChange("custom")}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                isCustomMode
                  ? "bg-primary text-black border-primary"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              Custom Pattern
            </button>
          </div>
        </div>

        {/* Pattern Selection */}
        {!isCustomMode ? (
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Select Pattern
            </label>
            <select
              value={selectedPattern}
              onChange={(e) => setSelectedPattern(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              style={{ colorScheme: "dark" }}
            >
              {Object.entries(predefinedPatterns).map(([key, pattern]) => (
                <option key={key} value={key} className="bg-black text-white">
                  {pattern.name} - {pattern.description}
                </option>
              ))}
            </select>
            <p className="text-sm text-white/60 mt-2">
              Pattern:{" "}
              <code className="bg-white/10 px-2 py-1 rounded text-xs">
                {
                  predefinedPatterns[
                    selectedPattern as keyof typeof predefinedPatterns
                  ].pattern
                }
              </code>
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Custom Regex Pattern
            </label>
            <div className="relative">
              <textarea
                value={customPattern}
                onChange={(e) => setCustomPattern(e.target.value)}
                placeholder="Enter your regex pattern (e.g., [a-z]{5,10})"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors resize-none font-mono text-sm"
                rows={3}
                style={{ colorScheme: "dark" }}
              />
              <div className="absolute top-2 right-2 text-xs text-white/40 font-mono">
                {customPattern.length} chars
              </div>
            </div>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-white/60">
                Enter a valid regular expression pattern
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCustomPattern("[a-z]{3,8}")}
                  className="px-3 py-1 bg-white/10 text-white text-xs rounded-full hover:bg-white/20 transition-colors"
                >
                  [a-z]
                </button>
                <button
                  onClick={() => setCustomPattern("\\d{4}-\\d{2}-\\d{2}")}
                  className="px-3 py-1 bg-white/10 text-white text-xs rounded-full hover:bg-white/20 transition-colors"
                >
                  \\d{4}-\\d{2}-\\d{2}
                </button>
                <button
                  onClick={() => setCustomPattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}")}
                  className="px-3 py-1 bg-white/10 text-white text-xs rounded-full hover:bg-white/20 transition-colors"
                >
                  Email
                </button>
                <button
                  onClick={() => setCustomPattern("")}
                  className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full hover:bg-red-500/30 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Count Selection */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Number of Results
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount(Math.max(1, count - 1))}
              className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors flex items-center justify-center"
              disabled={count <= 1}
            >
              −
            </button>
            <div className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-center font-mono">
              {count}
            </div>
            <button
              onClick={() => setCount(Math.min(100, count + 1))}
              className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors flex items-center justify-center"
              disabled={count >= 100}
            >
              +
            </button>
          </div>
          <p className="text-xs text-white/60 mt-2 text-center">
            Range: 1-100 results
          </p>
        </div>

        {/* Error Display */}
        {patternError && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-red-400">
              <div className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center">
                <span className="text-xs">✕</span>
              </div>
              <span className="font-medium">{patternError}</span>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={generateTexts}
            className="px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <ReloadIcon className="w-5 h-5" />
            Generate Text
          </button>
        </div>
      </div>

      {/* Generated Texts */}
      {generatedTexts.length > 0 && (
        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Generated Text ({generatedTexts.length})
            </h2>
            <button
              onClick={copyAllTexts}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              {copiedIndex === -1 ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <CopyIcon className="w-4 h-4" />
              )}
              {copiedIndex === -1 ? "Copied!" : "Copy All"}
            </button>
          </div>

          <div className="space-y-3">
            {generatedTexts.map((text, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <span className="text-sm text-white/60 font-mono w-8">
                  {index + 1}.
                </span>
                <code className="flex-1 text-white font-mono text-sm break-all">
                  {text}
                </code>
                <button
                  onClick={() => copyToClipboard(text, index)}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  title="Copy text"
                >
                  {copiedIndex === index ? (
                    <CheckIcon className="w-4 h-4 text-green-400" />
                  ) : (
                    <CopyIcon className="w-4 h-4 text-white/70" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomTextFromRegEX;
