"use client";
import React, { useState } from "react";
import CopyIcon from "../theme/Icon/copyIcon";
import { CheckIcon } from "../theme/Icon/checkIcon";
import DownOutlinedIcon from "../theme/Icon/downOutlinedIcon";

const HtmlCodeGenerator: React.FC = () => {
  const [generated, setGenerated] = useState<string>("");
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [relevantCode, setRelevantCode] = useState<string>("");
  const [guidelines, setGuidelines] = useState<string>("");
  const [cssFrameworks, setCssFrameworks] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async () => {
    try {
      if (!generated) return;
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const downloadFile = () => {
    const blob = new Blob([generated || ""], {
      type: "text/html;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const base =
      aiPrompt.trim().slice(0, 40).replace(/\s+/g, "-").toLowerCase() ||
      "generated-html";
    a.download = `${base}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setGenerated("");
    setAiPrompt("");
    setRelevantCode("");
    setGuidelines("");
    setCssFrameworks("");
  };

  const aiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai-generate-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          relevantCode,
          guidelines,
          cssFrameworks,
        }),
      });
      const data = await res.json();
      if (data?.html) {
        setGenerated(data.html);
      } else if (data?.error) {
        setGenerated(`<!-- Error: ${data.error} -->`);
      }
    } catch (e: any) {
      setGenerated(`<!-- Error: ${e?.message || "Unknown error"} -->`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">HTML Code Generator</h2>
        <button
          onClick={clearAll}
          className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Prompt Canvas / Rendered Output */}
        <div className="lg:col-span-2 bg-white/5 rounded-xl p-6 flex flex-col">
          {/* Canvas content or rendered result */}
          {generated ? (
            <div className="relative flex-1 min-h-[420px]">
              <iframe
                title="Generated Preview"
                className="w-full h-full rounded-lg border border-white/10 bg-white"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                srcDoc={generated}
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-2 bg-black/50 rounded-lg hover:bg-black/70 flex items-center gap-2"
                >
                  {copied ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <CopyIcon className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={downloadFile}
                  className="px-3 py-2 bg-black/50 rounded-lg hover:bg-black/70"
                >
                  <DownOutlinedIcon />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white/60 select-none">
              <div className="space-y-4 text-center">
                <p>See what AI can do</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() =>
                      setAiPrompt(
                        "Build responsive portfolio website using HTML"
                      )
                    }
                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                  >
                    Build responsive portfolio website using HTML
                  </button>
                  <button
                    onClick={() =>
                      setAiPrompt("Generate HTML Email Template for marketing")
                    }
                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                  >
                    Generate HTML Email Template for marketing
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Prompt input */}
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe what to generate..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              />
              <button
                onClick={aiGenerate}
                disabled={isLoading}
                className="px-4 py-3 bg-primary text-black rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {isLoading ? "Generating..." : "Send"}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Side panels */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Relevant code</h4>
              <span className="text-white/40">⇪</span>
            </div>
            <textarea
              value={relevantCode}
              onChange={(e) => setRelevantCode(e.target.value)}
              placeholder="Enter code here"
              className="w-full h-28 px-3 py-2 bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="font-semibold mb-2">HTML Output Guidelines</h4>
            <textarea
              value={guidelines}
              onChange={(e) => setGuidelines(e.target.value)}
              placeholder="Enter html ouput guidelines here"
              className="w-full h-28 px-3 py-2 bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="font-semibold mb-2">CSS Frameworks</h4>
            <textarea
              value={cssFrameworks}
              onChange={(e) => setCssFrameworks(e.target.value)}
              placeholder="Enter comma seperated CSS framework list like tailwind CSS, ootstrap, etc."
              className="w-full h-24 px-3 py-2 bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Output textarea removed as preview is inline */}
    </div>
  );
};

export default HtmlCodeGenerator;
