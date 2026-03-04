"use client";
import React, { useMemo, useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const SvgConverter = () => {
  const [svgInput, setSvgInput] = useState("");
  const [outputFormat, setOutputFormat] = useState<"react" | "css-data-uri" | "css-mask">("react");
  const [defaultWidth, setDefaultWidth] = useState("24");
  const [defaultHeight, setDefaultHeight] = useState("24");
  const [useCurrentColor, setUseCurrentColor] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clean SVG by removing metadata and unnecessary attributes
  const cleanSvg = (svg: string): string => {
    try {
      let cleaned = svg.trim();
      // Remove XML declaration if present
      cleaned = cleaned.replace(/<\?xml[^?]*\?>/g, "");
      // Remove comments
      cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "");
      // Remove DOCTYPE
      cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/g, "");
      // Remove unnecessary whitespace between tags
      cleaned = cleaned.replace(/>\s+</g, "><");
      // Remove trailing whitespace
      cleaned = cleaned.trim();
      return cleaned;
    } catch {
      return svg;
    }
  };

  // Normalize SVG attributes to JSX equivalents
  const normalizeSvgAttributes = (svg: string): string => {
    let normalized = svg;
    // Convert SVG attribute names to JSX equivalents
    normalized = normalized.replace(/fill-rule="/g, 'fillRule="');
    normalized = normalized.replace(/clip-rule="/g, 'clipRule="');
    normalized = normalized.replace(/stroke-linecap="/g, 'strokeLinecap="');
    normalized = normalized.replace(/stroke-linejoin="/g, 'strokeLinejoin="');
    normalized = normalized.replace(/stroke-miterlimit="/g, 'strokeMiterlimit="');
    normalized = normalized.replace(/stroke-width="/g, 'strokeWidth="');
    normalized = normalized.replace(/stroke-dasharray="/g, 'strokeDasharray="');
    normalized = normalized.replace(/stroke-dashoffset="/g, 'strokeDashoffset="');
    normalized = normalized.replace(/text-anchor="/g, 'textAnchor="');
    normalized = normalized.replace(/class="/g, 'className="');
    return normalized;
  };

  // Convert SVG for React component output
  const generateReactComponent = (svg: string): string => {
    try {
      const cleaned = cleanSvg(svg);
      
      // Extract viewBox or use defaults
      const viewBoxMatch = cleaned.match(/viewBox="([^"]*)"/);
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";
      
      // Replace default fill/stroke with currentColor if enabled
      let reactSvg = cleaned;
      if (useCurrentColor) {
        // Replace fill colors (except fill="none") with currentColor
        reactSvg = reactSvg.replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"');
        // Replace stroke colors with currentColor if they exist
        reactSvg = reactSvg.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
      }
      
      // Remove width and height to make it responsive
      reactSvg = reactSvg.replace(/\s*width="[^"]*"\s*/g, " ");
      reactSvg = reactSvg.replace(/\s*height="[^"]*"\s*/g, " ");
      
      // Normalize SVG attributes to JSX equivalents
      reactSvg = normalizeSvgAttributes(reactSvg);
      
      // Clean up multiple spaces
      reactSvg = reactSvg.replace(/\s+/g, " ");
      
      const component = `import React from 'react';

interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({ 
  width = ${defaultWidth}, 
  height = ${defaultHeight}, 
  className = '' 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="${viewBox}"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    ${reactSvg.replace(/<svg[^>]*>/g, "").replace(/<\/svg>/g, "").trim()}
  </svg>
);

export default SvgIcon;`;
      
      return component;
    } catch (e) {
      throw new Error("Failed to convert to React component");
    }
  };

  // Convert SVG to CSS Data URI
  const generateCssDataUri = (svg: string): string => {
    try {
      const cleaned = cleanSvg(svg);
      
      // Encode SVG as data URI
      // Escape special characters but keep it relatively readable
      const encoded = cleaned
        .replace(/"/g, "'")
        .replace(/%/g, "%25")
        .replace(/#/g, "%23")
        .replace(/{/g, "%7B")
        .replace(/}/g, "%7D")
        .replace(/</g, "%3C")
        .replace(/>/g, "%3E");
      
      const dataUri = `url("data:image/svg+xml,${encoded}")`;
      
      const css = `.icon {
  width: ${defaultWidth}px;
  height: ${defaultHeight}px;
  background-image: ${dataUri};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}`;
      
      return css;
    } catch (e) {
      throw new Error("Failed to convert to CSS Data URI");
    }
  };

  // Convert SVG to CSS Mask
  const generateCssMask = (svg: string): string => {
    try {
      const cleaned = cleanSvg(svg);
      
      const encoded = cleaned
        .replace(/"/g, "'")
        .replace(/%/g, "%25")
        .replace(/#/g, "%23")
        .replace(/{/g, "%7B")
        .replace(/}/g, "%7D")
        .replace(/</g, "%3C")
        .replace(/>/g, "%3E");
      
      const dataUri = `url("data:image/svg+xml,${encoded}")`;
      
      const css = `.icon {
  width: ${defaultWidth}px;
  height: ${defaultHeight}px;
  background-color: currentColor;
  -webkit-mask-image: ${dataUri};
  mask-image: ${dataUri};
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}`;
      
      return css;
    } catch (e) {
      throw new Error("Failed to convert to CSS Mask");
    }
  };

  const output = useMemo(() => {
    try {
      setError(null);
      if (!svgInput.trim()) return "";
      
      // Validate SVG
      if (!svgInput.includes("<svg")) {
        setError("Invalid SVG: must contain <svg> tag");
        return "";
      }
      
      switch (outputFormat) {
        case "react":
          return generateReactComponent(svgInput);
        case "css-data-uri":
          return generateCssDataUri(svgInput);
        case "css-mask":
          return generateCssMask(svgInput);
        default:
          return "";
      }
    } catch (e: any) {
      setError(e.message || "Failed to convert SVG");
      return "";
    }
  }, [svgInput, outputFormat, defaultWidth, defaultHeight, useCurrentColor]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (_) {}
  };

  const handleClear = () => {
    setSvgInput("");
    setError(null);
  };

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setSvgInput(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[1000px] mx-auto">
              {/* Options Section */}
              <div className="mb-6 p-4 bg-black/40 rounded-lg border border-white/10">
                <h3 className="text-lg font-medium mb-4">Conversion Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Output Format</label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value as any)}
                      className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="react">React Component</option>
                      <option value="css-data-uri">CSS Data URI</option>
                      <option value="css-mask">CSS Mask</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Default Width</label>
                    <input
                      type="text"
                      value={defaultWidth}
                      onChange={(e) => setDefaultWidth(e.target.value)}
                      placeholder="24"
                      className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Default Height</label>
                    <input
                      type="text"
                      value={defaultHeight}
                      onChange={(e) => setDefaultHeight(e.target.value)}
                      placeholder="24"
                      className="w-full bg-black border border-[#222222] rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-2 mb-2 cursor-pointer w-full">
                      <input
                        type="checkbox"
                        checked={useCurrentColor}
                        onChange={(e) => setUseCurrentColor(e.target.checked)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm font-medium">Use currentColor</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Input/Output Section */}
              <div className="flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-4 md:my-5 mt-2">
                {/* Input */}
                <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                  <h3 className="text-lg font-medium mb-2">SVG Input</h3>
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".svg,image/svg+xml"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <textarea
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[300px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl`}
                      placeholder="Paste your SVG code here or upload an SVG file..."
                      value={svgInput}
                      onChange={(e) => setSvgInput(e.target.value)}
                    ></textarea>
                    {svgInput && (
                      <button
                        type="button"
                        onClick={handleClear}
                        title="Clear"
                        className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-white"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handlePickFile}
                      title="Choose file"
                      className="absolute right-12 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-white"
                      >
                        <path d="M4 12a6 6 0 016-6h5a3 3 0 110 6H9a1 1 0 100 2h6a5 5 0 100-10H10a8 8 0 100 16h7a1 1 0 100-2h-7a6 6 0 01-6-6z" />
                      </svg>
                    </button>
                  </div>
                  {error && (
                    <div className="w-full text-red-400 text-sm mt-2">{error}</div>
                  )}
                </div>

                {/* Output */}
                <div className="w-full lg:w-1/2 mt-2 lg:mt-0">
                  <h3 className="text-lg font-medium mb-2">Optimized Output</h3>
                  <div className="relative">
                    <textarea
                      className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[300px] bg-black !border !border-[#222222] p-5 pr-14 rounded-xl font-mono text-sm`}
                      value={output}
                      readOnly
                      placeholder="Your optimized SVG will appear here..."
                    ></textarea>
                    {output && (
                      <button
                        type="button"
                        onClick={handleCopy}
                        title="Copy"
                        className="absolute right-3 top-3 h-8 w-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5 text-white"
                        >
                          <path d="M16 1a3 3 0 013 3v9a3 3 0 01-3 3H8a3 3 0 01-3-3V4a3 3 0 013-3h8zm-8 2a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H8z" />
                          <path d="M6 18a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 112 0v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1a1 1 0 112 0v1z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SvgConverter;
