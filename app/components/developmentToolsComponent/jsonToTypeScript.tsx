"use client";
import React, { useMemo, useState, useRef } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import ReloadIcon from "../theme/Icon/reload";
import CopyIcon from "../theme/Icon/copyIcon";

const JsonToTypeScript = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [interfaceName, setInterfaceName] =
    useState<string>("GeneratedInterface");
  const [fileName, setFileName] = useState<string>("types");
  const [error, setError] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [isLoadingUrl, setIsLoadingUrl] = useState<boolean>(false);
  const [generateArrayTypes, setGenerateArrayTypes] = useState<boolean>(true);
  const [useOptionalProperties, setUseOptionalProperties] =
    useState<boolean>(false);
  const [useStrictTypes, setUseStrictTypes] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateTypeScript = (jsonData: any, interfaceName: string): string => {
    const generateType = (value: any, key?: string): string => {
      if (value === null) return "null";
      if (value === undefined) return "undefined";

      if (Array.isArray(value)) {
        if (generateArrayTypes && value.length > 0) {
          const firstItem = value[0];
          if (typeof firstItem === "object" && firstItem !== null) {
            return `${generateType(firstItem)}[]`;
          }
          return `${generateType(firstItem)}[]`;
        }
        return "any[]";
      }

      if (typeof value === "object" && value !== null) {
        const properties = Object.entries(value)
          .map(([propKey, propValue]) => {
            const isOptional =
              useOptionalProperties &&
              (propValue === null || propValue === undefined);
            const optionalMarker = isOptional ? "?" : "";
            return `  ${propKey}${optionalMarker}: ${generateType(
              propValue,
              propKey
            )};`;
          })
          .join("\n");

        return `{\n${properties}\n}`;
      }

      if (useStrictTypes) {
        if (typeof value === "string") {
          // Check if it's a date string
          if (
            key &&
            (key.toLowerCase().includes("date") ||
              key.toLowerCase().includes("time"))
          ) {
            return "string"; // Could be "Date" but keeping as string for simplicity
          }
          return "string";
        }
        if (typeof value === "number") {
          return Number.isInteger(value) ? "number" : "number";
        }
        if (typeof value === "boolean") return "boolean";
      }

      return typeof value;
    };

    const mainType = generateType(jsonData);

    if (typeof jsonData === "object" && !Array.isArray(jsonData)) {
      return `export interface ${interfaceName} ${mainType}`;
    } else if (Array.isArray(jsonData)) {
      const itemType = generateType(jsonData[0] || {});
      return `export type ${interfaceName} = ${itemType}[];`;
    } else {
      return `export type ${interfaceName} = ${mainType};`;
    }
  };

  const parsedJson = useMemo(() => {
    try {
      if (!jsonInput.trim()) return null;
      return JSON.parse(jsonInput);
    } catch (e) {
      setError("Invalid JSON format. Please check your input.");
      return null;
    }
  }, [jsonInput]);

  const typeScriptCode = useMemo(() => {
    if (!parsedJson) return "";

    try {
      return generateTypeScript(parsedJson, interfaceName);
    } catch (e) {
      setError("Error generating TypeScript types.");
      return "";
    }
  }, [
    parsedJson,
    interfaceName,
    generateArrayTypes,
    useOptionalProperties,
    useStrictTypes,
  ]);

  const download = () => {
    if (!typeScriptCode) return;

    const blob = new Blob([typeScriptCode], {
      type: "text/typescript;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "types"}.ts`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    if (!typeScriptCode) return;
    try {
      await navigator.clipboard.writeText(typeScriptCode);
      setError("TypeScript code copied to clipboard successfully!");
      setTimeout(() => setError(""), 3000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  const clearAll = () => {
    setJsonInput("");
    setError("");
    setFileName("types");
    setUrlInput("");
    setInterfaceName("GeneratedInterface");
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      file.type === "application/json" ||
      file.type === "text/plain" ||
      file.name.endsWith(".json") ||
      file.name.endsWith(".txt")
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJsonInput(content);
        setFileName(file.name.replace(/\.[^/.]+$/, ""));
        setError("");
      };
      reader.readAsText(file);
    } else {
      setError("Please select a valid JSON file");
    }
  };

  const loadFromUrl = async () => {
    if (!urlInput.trim()) {
      setError("Please enter a URL");
      return;
    }

    setIsLoadingUrl(true);
    setError("");

    try {
      const response = await fetch(urlInput);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();
      setJsonInput(content);
      setError("JSON loaded from URL successfully!");
      setTimeout(() => setError(""), 3000);
    } catch (err) {
      setError(
        "Failed to load JSON from URL. Please check the URL and try again."
      );
    } finally {
      setIsLoadingUrl(false);
    }
  };

  const sampleJson = {
    user: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      isActive: true,
      profile: {
        age: 30,
        city: "New York",
        hobbies: ["reading", "coding", "gaming"],
      },
      orders: [
        {
          id: 101,
          product: "Laptop",
          price: 999.99,
          date: "2024-01-15",
        },
        {
          id: 102,
          product: "Mouse",
          price: 29.99,
          date: "2024-01-20",
        },
      ],
    },
  };

  const loadSample = () => {
    setJsonInput(JSON.stringify(sampleJson, null, 2));
    setInterfaceName("UserData");
    setError("");
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Formatting utilities removed per request

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-4 md:my-4 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Paste your JSON data here
                    </label>
                    <textarea
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      rows={15}
                      className="w-full bg-black border border-[#222222] rounded-lg p-4 text-white text-sm font-mono"
                      placeholder="Enter your JSON data here..."
                    />
                  </div>
                  <div className="space-y-4">
    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Interface Name
                      </label>
                      <input
                        type="text"
                        value={interfaceName}
                        onChange={(e) => setInterfaceName(e.target.value)}
                        className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                        placeholder="GeneratedInterface"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Filename
                      </label>
                      <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                        placeholder="types"
                      />
    </div>

                    <div className="space-y-3">
                      <label className="flex items-center space-x-2 text-sm font-medium text-white/80">
                        <input
                          type="checkbox"
                          checked={generateArrayTypes}
                          onChange={(e) =>
                            setGenerateArrayTypes(e.target.checked)
                          }
                          className="rounded border-[#222222] bg-black text-primary focus:ring-primary"
                        />
                        <span>Generate array types</span>
                      </label>

                      <label className="flex items-center space-x-2 text-sm font-medium text-white/80">
                        <input
                          type="checkbox"
                          checked={useOptionalProperties}
                          onChange={(e) =>
                            setUseOptionalProperties(e.target.checked)
                          }
                          className="rounded border-[#222222] bg-black text-primary focus:ring-primary"
                        />
                        <span>Use optional properties</span>
                      </label>

                      <label className="flex items-center space-x-2 text-sm font-medium text-white/80">
                        <input
                          type="checkbox"
                          checked={useStrictTypes}
                          onChange={(e) => setUseStrictTypes(e.target.checked)}
                          className="rounded border-[#222222] bg-black text-primary focus:ring-primary"
                        />
                        <span>Use strict types</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Load from URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          className="flex-1 bg-black border border-[#222222] rounded-lg px-3 py-2 text-white text-sm max-w-32"
                          placeholder="https://api.example.com/data.json"
                        />
                        <button
                          onClick={loadFromUrl}
                          disabled={isLoadingUrl || !urlInput.trim()}
                          title="Load from URL"
                          aria-label="Load from URL"
                          className="w-full bg-primary hover:bg-primary text-black rounded-lg transition-colors flex items-center justify-center"
                        >
                          {isLoadingUrl ? (
                            <p className="text-sm font-bold">Loading...</p>
                          ) : (
                            <p className="text-sm font-bold">Load</p>
                          )}
                          <span className="sr-only text-sm">Load from URL</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2 md:flex-nowrapflex-wrap">
                      <button
                        onClick={triggerFileUpload}
                        title="Upload File"
                        aria-label="Upload File"
                        className="h-10 w-10 bg-primary hover:bg-primary text-black rounded-lg transition-colors flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                          />
                        </svg>
                        <span className="sr-only">Upload File</span>
                      </button>

                      <button
                        onClick={loadSample}
                        title="Load Sample"
                        aria-label="Load Sample"
                        className="h-10 w-10 bg-primary hover:bg-primary text-black rounded-lg transition-colors flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v2.586l.293-.293a1 1 0 011.414 1.414l-2.707 2.707a1 1 0 01-1.414 0L5.879 9.707A1 1 0 017.293 8.293L7.586 8.586V6a1 1 0 011-1h1.414z"
                            clipRule="evenodd"
                          />
                          <path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0z" />
                        </svg>
                        <span className="sr-only">Load Sample</span>
                      </button>

                      <button
                        type="button"
                        onClick={download}
                        disabled={!typeScriptCode}
                        title="Download TypeScript"
                        aria-label="Download TypeScript"
                        className={`${DevelopmentToolsStyles.converterButton} text-black font-bold h-10 w-10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                          />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={copy}
                        disabled={!typeScriptCode}
                        title="Copy TypeScript"
                        aria-label="Copy TypeScript"
                        className="h-10 w-10 bg-primary text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center justify-center"
                      >
                        <CopyIcon />
                      </button>

                      <button
                        type="button"
                        onClick={clearAll}
                        title="Clear All"
                        aria-label="Clear All"
                        className={`${DevelopmentToolsStyles.clearButton} text-black font-bold h-10 w-10 rounded-lg flex items-center justify-center`}
                      >
                        <ReloadIcon />
                      </button>
                    </div>

                    {/* Formatting buttons removed per request */}
                  </div>
                </div>

                {/* Hidden file input for upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json,text/plain"
                  onChange={uploadFile}
                  className="hidden"
                />

                {(parsedJson || typeScriptCode) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {parsedJson && (
                      <div>
                        <h3 className="text-base font-medium mb-2 text-white/90">
                          JSON Preview
                        </h3>
                        <div className="bg-black border border-[#222222] rounded-lg p-3">
                          <pre className="text-white text-sm whitespace-pre-wrap overflow-auto md:max-h-[200px] max-h-32">
                            {JSON.stringify(parsedJson, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {typeScriptCode && (
                      <div>
                        <h3 className="text-base font-medium mb-2 text-white/90">
                          Generated TypeScript
                        </h3>
                        <div className="bg-black border border-[#222222] rounded-lg p-3">
                          <pre className="text-white text-sm whitespace-pre-wrap overflow-auto md:max-h-[200px] max-h-32">
                            {typeScriptCode}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="text-center">
                    <div
                      className={`text-sm ${
                        error.includes("successfully")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {error}
                    </div>
                  </div>
                )}

                {parsedJson && (
                  <div className="text-center text-white/70 text-sm">
                    <p>
                      JSON Structure:{" "}
                      {Array.isArray(parsedJson) ? "Array" : "Object"} |
                      {Array.isArray(parsedJson)
                        ? ` Items: ${parsedJson.length}`
                        : ` Properties: ${Object.keys(parsedJson).length}`}
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

export default JsonToTypeScript;
