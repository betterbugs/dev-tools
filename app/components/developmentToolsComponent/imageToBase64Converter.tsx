"use client";

import React, { useCallback, useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const MAX_BYTES = 10 * 1024 * 1024;

const stripDataUrlPrefix = (dataUrl: string) => {
  const i = dataUrl.indexOf(",");
  return i >= 0 ? dataUrl.slice(i + 1) : dataUrl;
};

const ImageToBase64Converter: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dataUrl, setDataUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [outputMode, setOutputMode] = useState<"dataUri" | "raw">("dataUri");

  const outputText =
    outputMode === "dataUri" ? dataUrl : stripDataUrlPrefix(dataUrl);

  const resetInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const processFile = useCallback(async (file: File | undefined) => {
    if (!file) return;
    setError("");

    const isImageMime = file.type.startsWith("image/");
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const looksLikeImage =
      isImageMime ||
      ["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico"].includes(ext);

    if (!looksLikeImage) {
      setError("Please choose an image file (PNG, JPEG, GIF, WebP, SVG, etc.).");
      return;
    }

    if (file.size > MAX_BYTES) {
      setError(`File is too large. Maximum size is ${MAX_BYTES / (1024 * 1024)} MB.`);
      return;
    }

    try {
      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result ?? ""));
        reader.onerror = () => reject(new Error("read"));
        reader.readAsDataURL(file);
      });
      setDataUrl(text);
      setFileName(file.name);
    } catch {
      setError("Could not read the file. Try another image.");
    }
  }, []);

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    await processFile(file);
    resetInput();
  };

  const handlePickFile = () => fileInputRef.current?.click();

  const onDrop: React.DragEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    await processFile(file);
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const clearAll = () => {
    setDataUrl("");
    setFileName("");
    setError("");
    resetInput();
  };

  const copyOutput = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
    } catch {
      // ignore
    }
  };

  const showPreview =
    dataUrl &&
    (dataUrl.startsWith("data:image/") || dataUrl.startsWith("data:image/svg+xml"));

  return (
    <section className="w-full">
      <div className="md:mt-8 mt-4">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-5 md:p-8">
          <div className="md:w-[1000px] mx-auto">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#222222] bg-black/25 p-4">
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Image
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onFileChange}
                  />
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handlePickFile();
                      }
                    }}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    className={`rounded-lg border-2 border-dashed px-4 py-10 text-center transition-colors cursor-pointer select-none ${
                      isDragging
                        ? "border-primary bg-primary/10"
                        : "border-white/20 bg-black/30 hover:border-white/35"
                    }`}
                    onClick={handlePickFile}
                  >
                    <p className="text-white/90 text-sm font-medium">
                      Drop an image here or click to browse
                    </p>
                    <p className="text-white/50 text-xs mt-2">
                      PNG, JPEG, GIF, WebP, SVG, BMP — max{" "}
                      {MAX_BYTES / (1024 * 1024)} MB. Processing stays in your browser.
                    </p>
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 mt-3" role="alert">
                      {error}
                    </p>
                  )}

                  {showPreview && (
                    <div className="mt-4">
                      <p className="text-white/60 text-xs mb-2 truncate" title={fileName}>
                        {fileName || "Image preview"}
                      </p>
                      <div className="rounded-lg border border-[#222222] bg-black/40 p-3 flex items-center justify-center min-h-[200px] max-h-[360px] overflow-hidden">
                        <img
                          src={dataUrl}
                          alt="Uploaded preview"
                          className="max-w-full max-h-[320px] object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    <button
                      type="button"
                      onClick={handlePickFile}
                      className="!py-3 !px-4 rounded-xl w-full text-sm font-bold bg-primary hover:opacity-90 text-black focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Choose image
                    </button>
                    <button
                      type="button"
                      onClick={clearAll}
                      disabled={!dataUrl}
                      className="px-3 py-2 rounded-lg border border-white/10 bg-transparent hover:bg-white/10 text-white text-sm font-semibold disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-[#222222] bg-black/25 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <span className="text-white/80 text-sm font-medium">Output</span>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                        <input
                          type="radio"
                          name="img-b64-mode"
                          checked={outputMode === "dataUri"}
                          onChange={() => setOutputMode("dataUri")}
                        />
                        Data URI
                      </label>
                      <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                        <input
                          type="radio"
                          name="img-b64-mode"
                          checked={outputMode === "raw"}
                          onChange={() => setOutputMode("raw")}
                        />
                        Base64 only
                      </label>
                    </div>
                  </div>

                  <textarea
                    readOnly
                    value={outputText}
                    spellCheck={false}
                    rows={14}
                    placeholder="Base64 output will appear after you upload an image…"
                    className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[280px] bg-black/40 border border-[#222222] rounded-lg px-3 py-3 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/60`}
                    aria-label="Base64 output"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    <button
                      type="button"
                      onClick={copyOutput}
                      disabled={!outputText}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold !py-2.5 !px-4 rounded-xl w-full text-sm disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary/60`}
                    >
                      Copy output
                    </button>
                    <button
                      type="button"
                      onClick={clearAll}
                      disabled={!dataUrl}
                      className="px-3 py-2 rounded-lg border border-white/10 bg-transparent hover:bg-white/10 text-white text-sm font-semibold disabled:opacity-50 w-full focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Clear all
                    </button>
                  </div>

                  <p className="text-xs text-white/50 mt-3">
                    Data URI includes the MIME prefix (e.g.{" "}
                    <span className="text-white/70">data:image/png;base64,</span>
                    ). “Base64 only” is the payload without that prefix — useful for APIs
                    that expect raw Base64.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageToBase64Converter;
