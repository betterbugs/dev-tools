"use client";
import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import CopyIcon from "../theme/Icon/copyIcon";
import { CheckIcon } from "../theme/Icon/checkIcon";

const QRCodeGenerator = () => {
  const [inputText, setInputText] = useState("Hello, World!");
  const [qrSize, setQrSize] = useState(256);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [transparentBg, setTransparentBg] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Copy text
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Download QR
  const downloadQRCode = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const canvas = document.querySelector("canvas");
      if (!canvas) {
        setIsGenerating(false);
        return;
      }
      const link = document.createElement("a");
      link.download = `qrcode-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setIsGenerating(false);
    }, 500);
  };

  // Save to history
  const saveToHistory = () => {
    if (inputText.trim() && !history.includes(inputText)) {
      setHistory([inputText, ...history.slice(0, 4)]); // Keep last 5
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      {/* Main Container - Single Box */}
      <div className="bg-white/5 rounded-xl p-6 space-y-8">
        {/* Content Input Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Content</h2>
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Enter your text, URL, or any content</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-white/50 focus:outline-none focus:border-primary transition-colors resize-none font-mono text-sm"
              rows={4}
              placeholder="Enter your text, URL, or any content..."
            />
            <div className="mt-2 text-xs text-white/60">
              {inputText.length} characters
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Customization Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white mb-4">Customization</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colors */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Foreground Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
                  />
                  <div className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-mono">
                    {foregroundColor}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Background Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={backgroundColor}
                    disabled={transparentBg}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <div className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm font-mono">
                    {transparentBg ? "Transparent" : backgroundColor}
                  </div>
                </div>
                <div className="mt-3">
                  <label className="flex items-center gap-3 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={transparentBg}
                      onChange={(e) => setTransparentBg(e.target.checked)}
                      className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-white/90">Transparent Background</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Logo URL (Optional)</label>
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                placeholder="https://example.com/logo.png"
              />
              {logoUrl && (
                <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                  <span>✓</span> Logo will be embedded in QR code
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* QR Code Preview Section */}
        {inputText.trim() && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">QR Code Preview</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <QRCodeCanvas
                  value={inputText}
                  size={qrSize}
                  fgColor={foregroundColor}
                  bgColor={transparentBg ? "transparent" : backgroundColor}
                  level="H"
                  includeMargin={true}
                  imageSettings={
                    logoUrl
                      ? {
                        src: logoUrl,
                        height: 40,
                        width: 40,
                        excavate: true,
                      }
                      : undefined
                  }
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-white/70 mb-2">Encoded Content:</p>
                <p className="text-sm text-white bg-white/10 px-3 py-2 rounded-lg font-mono break-all">
                  {inputText.length > 50 ? inputText.slice(0, 50) + "..." : inputText}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Action Buttons Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 flex items-center gap-2 transition-colors"
            >
              {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Text"}
            </button>
            <button
              onClick={downloadQRCode}
              disabled={isGenerating}
              className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? "Generating..." : "Download QR"}
            </button>
            <button
              onClick={saveToHistory}
              className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary flex items-center gap-2 transition-colors"
            >
              Save to History
            </button>
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <>
            <div className="border-t border-white/10"></div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Recent QR Codes</h3>
              <ul className="space-y-2">
                {history.map((item, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 text-sm transition-colors"
                    onClick={() => setInputText(item)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-black font-semibold">
                        {idx + 1}
                      </div>
                      <span className="text-white/90">
                        {item.length > 40 ? item.slice(0, 40) + "..." : item}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
