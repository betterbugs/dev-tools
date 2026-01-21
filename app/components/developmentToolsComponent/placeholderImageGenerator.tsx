"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

type ImageFormat = "jpg" | "png" | "webp" | "gif";

const PlaceholderImageGenerator = () => {
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [imageFormat, setImageFormat] = useState<ImageFormat>("jpg");
  const [backgroundColor, setBackgroundColor] = useState<string>("cccccc");
  const [textColor, setTextColor] = useState<string>("969696");
  const [customText, setCustomText] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const generateDataUrl = (
    w: number,
    h: number,
    bg: string,
    fg: string,
    textContent: string
  ): string => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    // Background
    ctx.fillStyle = `#${bg}`;
    ctx.fillRect(0, 0, w, h);

    // Text
    const fontSize = Math.max(10, Math.floor(Math.min(w, h) * 0.22));
    ctx.fillStyle = `#${fg}`;
    ctx.font = `bold ${fontSize}px Arial, Helvetica, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(textContent, w / 2, h / 2);

    const mime =
      imageFormat === "jpg"
        ? "image/jpeg"
        : imageFormat === "webp"
        ? "image/webp"
        : "image/png";
    return canvas.toDataURL(mime);
  };

  const generatePlaceholderUrl = (): string => {
    const w = Math.max(1, Math.min(9999, width));
    const h = Math.max(1, Math.min(9999, height));
    const bg = backgroundColor.replace("#", "");
    const text = textColor.replace("#", "");
    const textContent = customText || `${w}x${h}`;

    return generateDataUrl(w, h, bg, text, textContent);
  };

  const generateMarkdown = (url: string): string => {
    return `![${width}x${height} placeholder](${url})`;
  };

  const generateHTML = (url: string): string => {
    return `<img src="${url}" alt="${width}x${height} placeholder" width="${width}" height="${height}" />`;
  };

  const generateCSS = (url: string): string => {
    return `background-image: url('${url}');`;
  };

  const generate = () => {
    setError("");

    if (width <= 0 || width > 9999) {
      setError("Width must be between 1 and 9,999");
      return;
    }

    if (height <= 0 || height > 9999) {
      setError("Height must be between 1 and 9,999");
      return;
    }

    if (!/^[0-9A-Fa-f]{6}$/.test(backgroundColor.replace("#", ""))) {
      setError("Background color must be a valid 6-digit hex color");
      return;
    }

    if (!/^[0-9A-Fa-f]{6}$/.test(textColor.replace("#", ""))) {
      setError("Text color must be a valid 6-digit hex color");
      return;
    }

    const url = generatePlaceholderUrl();
    setOutput(url);
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  const copyMarkdown = async () => {
    try {
      const markdown = generateMarkdown(output);
      await navigator.clipboard.writeText(markdown);
    } catch (err) {
      console.error("Failed to copy markdown: ", err);
    }
  };

  const copyHTML = async () => {
    try {
      const html = generateHTML(output);
      await navigator.clipboard.writeText(html);
    } catch (err) {
      console.error("Failed to copy HTML: ", err);
    }
  };

  const copyCSS = async () => {
    try {
      const css = generateCSS(output);
      await navigator.clipboard.writeText(css);
    } catch (err) {
      console.error("Failed to copy CSS: ", err);
    }
  };

  const clearAll = () => {
    setOutput("");
    setError("");
    setCustomText("");
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[850px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Width
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      min="1"
                      max="9999"
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Height
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      min="1"
                      max="9999"
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="600"
                    />
                  </div>

    <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Format
                    </label>
                    <select
                      value={imageFormat}
                      onChange={(e) =>
                        setImageFormat(e.target.value as ImageFormat)
                      }
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    >
                      <option value="jpg">JPG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WebP</option>
                      <option value="gif">GIF</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Background Color
                    </label>
                    <div className="flex">
                      <input
                        type="color"
                        value={`#${backgroundColor}`}
                        onChange={(e) =>
                          setBackgroundColor(e.target.value.replace("#", ""))
                        }
                        className="w-12 h-12 rounded-l-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) =>
                          setBackgroundColor(e.target.value.replace("#", ""))
                        }
                        className="flex-1 bg-black rounded-r-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                        placeholder="cccccc"
                      />
                    </div>
    </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Text Color
                    </label>
                    <div className="flex">
                      <input
                        type="color"
                        value={`#${textColor}`}
                        onChange={(e) =>
                          setTextColor(e.target.value.replace("#", ""))
                        }
                        className="w-12 h-12 rounded-l-lg border border-[#222222] cursor-pointer"
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) =>
                          setTextColor(e.target.value.replace("#", ""))
                        }
                        className="flex-1 bg-black border border-[#222222] border-l-0 rounded-r-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                        placeholder="969696"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Custom Text (optional)
                    </label>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      placeholder="Custom text or leave empty for size"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={generate}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Generate Placeholder
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg`}
                  >
                    Clear
                  </button>
                </div>

                {output && (
                  <div className="w-full">
                    <h3 className="text-lg font-medium mb-4">
                      Generated Placeholder
                    </h3>

                    <div className="mb-4">
                      <div className="flex justify-center">
                        <div className="relative">
                          <img
                            src={output}
                            alt={`${width}x${height} placeholder`}
                            className="max-w-full h-auto border border-[#222222] rounded-lg"
                            style={{ maxHeight: "300px", maxWidth: "400px" }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const errorDiv =
                                target.nextElementSibling as HTMLElement;
                              if (errorDiv) errorDiv.style.display = "block";
                            }}
                          />
                          <div
                            className="hidden w-full h-32 bg-gray-800 border border-[#222222] rounded-lg flex items-center justify-center text-white/60"
                            style={{ maxWidth: "400px" }}
                          >
                            <div className="text-center">
                              <div className="text-sm mb-2">
                                Image preview not available
                              </div>
                              <div className="text-xs">
                                Use the &#34;Test&#34; button below to view the image
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white/80">
                          Image URL
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={output}
                            readOnly
                            className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 pr-32 text-white"
                          />
                          <div className="absolute right-2 top-2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => window.open(output, "_blank")}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                              Test
                            </button>
                            <button
                              type="button"
                              onClick={copyUrl}
                              className="px-3 py-1 bg-primary text-black text-sm rounded hover:bg-opacity-80"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/80">
                            Markdown
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={generateMarkdown(output)}
                              readOnly
                              className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 pr-20 text-white text-sm"
                            />
                            <button
                              type="button"
                              onClick={copyMarkdown}
                              className="absolute right-2 top-2 px-2 py-1 bg-primary text-black text-xs rounded hover:bg-opacity-80"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/80">
                            HTML
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={generateHTML(output)}
                              readOnly
                              className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 pr-20 text-white text-sm"
                            />
                            <button
                              type="button"
                              onClick={copyHTML}
                              className="absolute right-2 top-2 px-2 py-1 bg-primary text-black text-xs rounded hover:bg-opacity-80"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-white/80">
                            CSS
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={generateCSS(output)}
                              readOnly
                              className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 pr-20 text-white text-sm"
                            />
                            <button
                              type="button"
                              onClick={copyCSS}
                              className="absolute right-2 top-2 px-2 py-1 bg-primary text-black text-xs rounded hover:bg-opacity-80"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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

export default PlaceholderImageGenerator;
