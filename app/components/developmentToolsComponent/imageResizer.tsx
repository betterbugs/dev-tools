"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

type LoadedImage = {
  img: HTMLImageElement;
  width: number;
  height: number;
};

type OutputFormat = "png" | "jpg" | "webp";
type SizeUnit = "KB" | "MB";

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const ImageResizer = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [src, setSrc] = useState<string>("");
  const [image, setImage] = useState<LoadedImage | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);

  const [format, setFormat] = useState<OutputFormat>("png");
  const [quality, setQuality] = useState<number>(92); // for jpg/webp
  const [transparent, setTransparent] = useState<boolean>(true); // for jpg, affects bg fill
  const [bg, setBg] = useState<string>("#ffffff");

  const [output, setOutput] = useState<string>("");
  const [outputBytes, setOutputBytes] = useState<number>(0);
  const [targetSize, setTargetSize] = useState<number>(300);
  const [targetUnit, setTargetUnit] = useState<SizeUnit>("KB");
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  const aspect = useMemo(() => {
    if (!image) return 1;
    return image.width / Math.max(1, image.height);
  }, [image]);

  useEffect(() => {
    if (!src) return setImage(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setImage({ img, width: img.width, height: img.height });
    };
    img.onerror = () => setError("Failed to load image");
    img.src = src;
  }, [src]);

  useEffect(() => {
    if (!image) return;
    setTargetWidth(image.width);
    setTargetHeight(image.height);
  }, [image]);

  const mime = useMemo(() => {
    if (format === "jpg") return "image/jpeg";
    if (format === "webp") return "image/webp";
    return "image/png";
  }, [format]);

  const normalizedQuality = useMemo(() => {
    if (format === "png") return undefined;
    return clamp(quality / 100, 0.1, 1);
  }, [format, quality]);

  const renderToBlob = (qualityOverride?: number): Promise<Blob | null> => {
    if (!image) return Promise.resolve(null);
    const canvas = canvasRef.current;
    if (!canvas) return Promise.resolve(null);

    const w = clamp(Math.floor(targetWidth || 0), 1, 20000);
    const h = clamp(Math.floor(targetHeight || 0), 1, 20000);

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return Promise.resolve(null);

    ctx.clearRect(0, 0, w, h);
    if (format === "jpg" && !transparent) {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image.img, 0, 0, w, h);

    const q =
      format === "png"
        ? undefined
        : typeof qualityOverride === "number"
          ? clamp(qualityOverride, 0.1, 1)
          : normalizedQuality;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob),
        mime,
        q
      );
    });
  };

  const draw = async () => {
    if (!image) return;
    const blob = await renderToBlob();
    if (!blob) return;
    setOutput((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(blob);
    });
    setOutputBytes(blob.size);
  };

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, targetWidth, targetHeight, format, quality, transparent, bg]);

  useEffect(() => {
    return () => {
      if (output) URL.revokeObjectURL(output);
    };
  }, [output]);

  const onFile = async (file?: File) => {
    if (!file) return;
    setError("");
    try {
      const dataUrl = await readFileAsDataURL(file);
      setSrc(dataUrl);
      setFileName(file.name);
    } catch {
      setError("Failed to read file");
    }
  };

  const setWidthAndMaybeHeight = (w: number) => {
    const newW = clamp(Math.floor(w || 0), 1, 20000);
    setTargetWidth(newW);
    if (keepAspectRatio && image) {
      setTargetHeight(Math.max(1, Math.round(newW / aspect)));
    }
  };

  const setHeightAndMaybeWidth = (h: number) => {
    const newH = clamp(Math.floor(h || 0), 1, 20000);
    setTargetHeight(newH);
    if (keepAspectRatio && image) {
      setTargetWidth(Math.max(1, Math.round(newH * aspect)));
    }
  };

  const download = () => {
    if (!output) return;
    const a = document.createElement("a");
    a.href = output;
    const base = fileName ? fileName.replace(/\.[^.]+$/, "") : "image";
    a.download = `${base}-${targetWidth}x${targetHeight}.${format === "jpg" ? "jpg" : format}`;
    a.click();
  };

  const targetBytes = useMemo(() => {
    const n = Math.max(1, Number(targetSize) || 0);
    return targetUnit === "MB" ? Math.round(n * 1024 * 1024) : Math.round(n * 1024);
  }, [targetSize, targetUnit]);

  const compressToTargetSize = async () => {
    if (!image) return;
    if (format === "png") return;
    setError("");
    setIsOptimizing(true);
    try {
      const maxIters = 9;
      let lo = 0.1;
      let hi = 1;
      let bestBlob: Blob | null = null;
      let bestQ = hi;

      for (let i = 0; i < maxIters; i++) {
        const mid = (lo + hi) / 2;
        const blob = await renderToBlob(mid);
        if (!blob) break;

        if (blob.size <= targetBytes) {
          bestBlob = blob;
          bestQ = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }

      const finalBlob = bestBlob ?? (await renderToBlob(0.1));
      if (!finalBlob) return;

      setQuality(Math.round(clamp(bestQ, 0.1, 1) * 100));
      setOutput((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(finalBlob);
      });
      setOutputBytes(finalBlob.size);
    } catch {
      setError("Failed to optimize file size");
    } finally {
      setIsOptimizing(false);
    }
  };

  const clearAll = () => {
    if (output) URL.revokeObjectURL(output);
    setSrc("");
    setImage(null);
    setFileName("");
    setError("");
    setKeepAspectRatio(true);
    setTargetWidth(0);
    setTargetHeight(0);
    setFormat("png");
    setQuality(92);
    setTransparent(true);
    setBg("#ffffff");
    setOutput("");
    setOutputBytes(0);
    setTargetSize(300);
    setTargetUnit("KB");
    setIsOptimizing(false);
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="rounded-2xl border border-[#222222] bg-black/30 p-5">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="text-white font-medium">Upload</div>
                          <div className="text-xs text-white/50">Drag & drop or pick a file</div>
                        </div>
                        {image && (
                          <div className="text-xs text-white/60 bg-white/5 border border-white/10 rounded px-2 py-1">
                            {image.width}×{image.height}px
                          </div>
                        )}
                      </div>

                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragEnter={() => setIsDragging(true)}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          onFile(e.dataTransfer.files?.[0]);
                        }}
                        className={`rounded-xl border border-dashed ${isDragging ? "border-primary bg-black/60" : "border-[#222222] bg-black/40"
                          } p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors`}
                      >
                        <div className="min-w-0 w-full">
                          <div className="text-white/80 text-sm break-words">
                            {fileName || "Drop an image here…"}
                          </div>
                          <div className="text-xs text-white/50">We never upload your file.</div>
                        </div>
                        <div className="flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
                          {src && (
                            <button
                              type="button"
                              onClick={clearAll}
                              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10 whitespace-nowrap text-sm font-semibold"
                            >
                              Remove
                            </button>
                          )}
                          <label className="px-4 py-2 bg-primary text-black rounded-lg cursor-pointer whitespace-nowrap text-sm font-semibold">
                            Choose File
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => onFile(e.target.files?.[0])}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#222222] bg-black/30 p-5 space-y-4">
                      <div>
                        <div className="text-white font-medium">Resize</div>
                        <div className="text-xs text-white/50">Set output dimensions in pixels</div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/80">Width</label>
                          <input
                            type="number"
                            value={targetWidth || ""}
                            onChange={(e) => setWidthAndMaybeHeight(Number(e.target.value))}
                            min={1}
                            max={20000}
                            disabled={!image}
                            className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary disabled:opacity-60"
                            placeholder={image ? String(image.width) : "—"}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/80">Height</label>
                          <input
                            type="number"
                            value={targetHeight || ""}
                            onChange={(e) => setHeightAndMaybeWidth(Number(e.target.value))}
                            min={1}
                            max={20000}
                            disabled={!image}
                            className="w-full bg-black border border-[#222222] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary disabled:opacity-60"
                            placeholder={image ? String(image.height) : "—"}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 rounded-xl bg-black/40 border border-[#222222] px-4 py-3">
                        <div>
                          <label htmlFor="keep-aspect" className="text-sm text-white/80">
                            Keep aspect ratio
                          </label>
                          <div className="text-xs text-white/50">Locks width/height together.</div>
                        </div>
                        <input
                          id="keep-aspect"
                          type="checkbox"
                          checked={keepAspectRatio}
                          onChange={(e) => setKeepAspectRatio(e.target.checked)}
                          disabled={!image}
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#222222] bg-black/30 p-5 space-y-4">
                      <div>
                        <div className="text-white font-medium">Export</div>
                        <div className="text-xs text-white/50">Choose format and compression</div>
                      </div>

                      <div className="flex bg-black/40 border border-[#222222] rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => setFormat("png")}
                          className={`flex-1 px-2 py-2 rounded-lg text-sm ${format === "png" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                            }`}
                        >
                          PNG
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormat("jpg")}
                          className={`flex-1 px-2 py-2 rounded-lg text-sm ${format === "jpg" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                            }`}
                        >
                          JPG
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormat("webp")}
                          className={`flex-1 px-2 py-2 rounded-lg text-sm ${format === "webp" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                            }`}
                        >
                          WebP
                        </button>
                      </div>

                      {format !== "png" && (
                        <div className="rounded-xl bg-black/40 border border-[#222222] px-4 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm text-white/80">Quality</span>
                            <span className="text-sm text-white/60">{quality}</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={100}
                            value={quality}
                            onChange={(e) => setQuality(Number(e.target.value))}
                            style={{ accentColor: "#00DA92" }}
                            className="w-full mt-2"
                          />
                        </div>
                      )}

                      <div className="rounded-xl bg-black/40 border border-[#222222] px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-sm text-white/80">Target file size</div>
                            <div className="text-xs text-white/50">
                              Works for JPG/WebP (PNG is lossless).
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          <input
                            type="number"
                            min={1}
                            value={targetSize}
                            onChange={(e) => setTargetSize(Number(e.target.value))}
                            className="col-span-2 w-full bg-black border border-[#222222] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                            disabled={!image || format === "png"}
                          />
                          <select
                            value={targetUnit}
                            onChange={(e) => setTargetUnit(e.target.value as SizeUnit)}
                            className="w-full bg-black border border-[#222222] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                            disabled={!image || format === "png"}
                          >
                            <option value="KB">KB</option>
                            <option value="MB">MB</option>
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={compressToTargetSize}
                          disabled={!image || format === "png" || isOptimizing}
                          className="mt-3 w-full px-4 py-2 rounded-lg border border-white/10 bg-white/10 hover:bg-white/20 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isOptimizing ? "Optimizing…" : `Compress to ≤ ${(targetBytes / 1024).toFixed(0)} KB`}
                        </button>
                      </div>

                      {format === "jpg" && (
                        <div className="rounded-xl bg-black/40 border border-[#222222] px-4 py-3 space-y-2">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-sm text-white/80">Background</div>
                              <div className="text-xs text-white/50">JPG has no transparency.</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                id="fill-bg"
                                type="checkbox"
                                checked={!transparent}
                                onChange={(e) => setTransparent(!e.target.checked)}
                              />
                              <label htmlFor="fill-bg" className="text-sm text-white/70">
                                Fill
                              </label>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={bg}
                              onChange={(e) => setBg(e.target.value)}
                              className="w-9 h-9 rounded-md border border-[#222222]"
                              disabled={transparent}
                            />
                            <div className="flex gap-2">
                              {["#ffffff", "#000000", "#f43f5e", "#f59e0b", "#10b981", "#3b82f6"].map((c) => (
                                <button
                                  key={c}
                                  type="button"
                                  aria-label={c}
                                  className="w-7 h-7 rounded border border-[#222222]"
                                  style={{ background: c, opacity: transparent ? 0.5 : 1 }}
                                  onClick={() => {
                                    setBg(c);
                                    setTransparent(false);
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={download}
                          className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-2 px-6 rounded-xl w-full disabled:opacity-60 disabled:cursor-not-allowed text-sm`}
                          disabled={!output}
                        >
                          Download
                        </button>
                        <button
                          type="button"
                          onClick={clearAll}
                          className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-2 px-6 rounded-xl w-full text-sm`}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <div className="rounded-2xl border border-[#222222] bg-black/30 p-5">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="text-white font-medium">Preview</div>
                          <div className="text-xs text-white/50">Canvas render of your export</div>
                        </div>
                        {image && (
                          <div className="text-xs text-white/60 bg-white/5 border border-white/10 rounded px-2 py-1">
                            Output: {targetWidth}×{targetHeight}px
                          </div>
                        )}
                      </div>

                      <div
                        className="rounded-xl overflow-hidden border border-[#222222] bg-black/40 h-[360px] flex items-center justify-center"
                        style={{
                          backgroundImage:
                            "linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)",
                          backgroundSize: "20px 20px",
                          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0",
                        }}
                      >
                        {/* Keep canvas mounted so `draw()` can always produce output */}
                        <canvas ref={canvasRef} className="hidden" />
                        {output ? (
                          <img src={output} alt="Resized" className="max-h-full max-w-full" />
                        ) : (
                          <div className="text-white/60 text-sm">Upload an image to preview the result</div>
                        )}
                      </div>
                      {output ? (
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
                          <div>
                            Size: {(outputBytes / 1024).toFixed(1)} KB
                          </div>
                          {format !== "png" && (
                            <div>
                              Quality: {quality}
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="text-center">
                    <div className="text-sm text-red-400">{error}</div>
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

export default ImageResizer;

