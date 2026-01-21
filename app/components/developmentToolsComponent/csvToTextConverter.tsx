"use client";
import React, { useMemo, useState, useRef } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const CsvToTextConverter = () => {
  const [csvText, setCsvText] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>(",");
  const [outputFormat, setOutputFormat] = useState<string>("formatted");
  const [fileName, setFileName] = useState<string>("converted");
  const [error, setError] = useState<string>("");
  const [hasHeaders, setHasHeaders] = useState<boolean>(true);
  const [urlInput, setUrlInput] = useState<string>("");
  const [isLoadingUrl, setIsLoadingUrl] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parsed = useMemo(() => {
    try {
      if (!csvText.trim()) return { headers: [], rows: [] };

      const lines = csvText
        .trim()
        .split(/\r?\n/)
        .filter((line) => line.trim());
      if (lines.length === 0) return { headers: [], rows: [] };

      let headers: string[] = [];
      let rows: string[][] = [];

      if (hasHeaders && lines.length > 0) {
        headers = lines[0]
          .split(delimiter)
          .map((h) => h.trim().replace(/^["']|["']$/g, ""));
        rows = lines
          .slice(1)
          .map((line) =>
            line
              .split(delimiter)
              .map((cell) => cell.trim().replace(/^["']|["']$/g, ""))
          );
      } else {
        // Auto-generate headers if none provided
        const firstRow = lines[0].split(delimiter);
        headers = firstRow.map((_, index) => `Column ${index + 1}`);
        rows = lines.map((line) =>
          line
            .split(delimiter)
            .map((cell) => cell.trim().replace(/^["']|["']$/g, ""))
        );
      }

      return { headers, rows };
    } catch (e) {
      setError("Error parsing CSV. Please check your input format.");
      return { headers: [], rows: [] };
    }
  }, [csvText, delimiter, hasHeaders]);

  const convertedText = useMemo(() => {
    if (parsed.headers.length === 0) return "";

    switch (outputFormat) {
      case "formatted":
        // Formatted table-like text
        const maxWidths = parsed.headers.map((_, colIndex) => {
          return Math.max(
            parsed.headers[colIndex].length,
            ...parsed.rows.map((row) => (row[colIndex] || "").length)
          );
        });

        const headerRow = parsed.headers
          .map((h, i) => h.padEnd(maxWidths[i]))
          .join(" | ");
        const separator = parsed.headers
          .map((_, i) => "-".repeat(maxWidths[i]))
          .join("-+-");

        const dataRows = parsed.rows
          .map((row) =>
            row
              .map((cell, i) => (cell || "").padEnd(maxWidths[i]))
              .join(" | ")
          )
          .join("\n");

        return `${headerRow}\n${separator}\n${dataRows}`;

      case "simple":
        // Simple space-separated
        return [
          parsed.headers.join(" "),
          ...parsed.rows.map((row) => row.join(" ")),
        ].join("\n");

      case "json":
        // JSON format
        const jsonData = parsed.rows.map((row) => {
          const obj: Record<string, string> = {};
          parsed.headers.forEach((header, index) => {
            obj[header] = row[index] || "";
          });
          return obj;
        });
        return JSON.stringify(jsonData, null, 2);

      case "xml":
        // XML format
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n';
        parsed.rows.forEach((row, rowIndex) => {
          xml += `  <row id="${rowIndex + 1}">\n`;
          parsed.headers.forEach((header, colIndex) => {
            const value = row[colIndex] || "";
            xml += `    <${header.replace(/[^a-zA-Z0-9]/g, "_")}>${value}</${header.replace(/[^a-zA-Z0-9]/g, "_")}>\n`;
          });
          xml += "  </row>\n";
        });
        xml += "</data>";
        return xml;

      case "yaml":
        // YAML format
        let yaml = "";
        parsed.rows.forEach((row, rowIndex) => {
          yaml += `row_${rowIndex + 1}:\n`;
          parsed.headers.forEach((header, colIndex) => {
            const value = row[colIndex] || "";
            yaml += `  ${header.replace(/[^a-zA-Z0-9]/g, "_")}: "${value}"\n`;
          });
        });
        return yaml;

      default:
        return "";
    }
  }, [parsed, outputFormat]);

  const download = () => {
    if (!convertedText) return;
    
    let mimeType = "text/plain";
    let extension = "txt";
    
    switch (outputFormat) {
      case "json":
        mimeType = "application/json";
        extension = "json";
        break;
      case "xml":
        mimeType = "application/xml";
        extension = "xml";
        break;
      case "yaml":
        mimeType = "text/yaml";
        extension = "yaml";
        break;
      default:
        mimeType = "text/plain";
        extension = "txt";
    }

    const blob = new Blob([convertedText], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "converted"}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    if (!convertedText) return;
    try {
      await navigator.clipboard.writeText(convertedText);
      setError("Text copied to clipboard successfully!");
      setTimeout(() => setError(""), 3000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  const clearAll = () => {
    setCsvText("");
    setError("");
    setFileName("converted");
    setUrlInput("");
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      file.type === "text/plain" ||
      file.type === "text/csv" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".csv")
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCsvText(content);
        setFileName(file.name.replace(/\.[^/.]+$/, ""));
        setError("");
      };
      reader.readAsText(file);
    } else {
      setError("Please select a valid text or CSV file");
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
      setCsvText(content);
      setError("CSV loaded from URL successfully!");
      setTimeout(() => setError(""), 3000);
    } catch (err) {
      setError(
        "Failed to load CSV from URL. Please check the URL and try again."
      );
    } finally {
      setIsLoadingUrl(false);
    }
  };

  const sampleCsv = `Name,Age,City,Occupation
John Doe,30,New York,Engineer
Jane Smith,25,Los Angeles,Designer
Bob Johnson,35,Chicago,Manager
Alice Brown,28,Boston,Developer
Mike Wilson,32,Seattle,Analyst`;

  const loadSample = () => {
    setCsvText(sampleCsv);
    setDelimiter(",");
    setHasHeaders(true);
    setError("");
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-2 text-white/80">
                      Paste your CSV data here
                    </label>
                    <textarea
                      value={csvText}
                      onChange={(e) => setCsvText(e.target.value)}
                      rows={12}
                      className="w-full bg-black border border-[#222222] rounded-lg p-4 text-white text-sm"
                      placeholder="Enter your CSV data here, with each row on a new line and columns separated by your chosen delimiter..."
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Delimiter
                      </label>
                      <select
                        value={delimiter}
                        onChange={(e) => setDelimiter(e.target.value)}
                        className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                      >
                        <option value=",">Comma (,)</option>
                        <option value=";">Semicolon (;)</option>
                        <option value="\t">Tab (\t)</option>
                        <option value="|">Pipe (|)</option>
                        <option value=" ">Space ( )</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/80">
                        Output Format
                      </label>
                      <select
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        className="w-full bg-black border border-[#222222] rounded-lg px-4 py-3 text-white"
                      >
                        <option value="formatted">Formatted Table</option>
                        <option value="simple">Simple Text</option>
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                        <option value="yaml">YAML</option>
                      </select>
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
                        placeholder="converted"
                      />
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-white/80">
                        <input
                          type="checkbox"
                          checked={hasHeaders}
                          onChange={(e) => setHasHeaders(e.target.checked)}
                          className="rounded border-[#222222] bg-black text-primary focus:ring-primary"
                        />
                        <span>First row contains headers</span>
                      </label>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={triggerFileUpload}
                        className="w-full px-4 py-2 bg-primary hover:bg-primary text-black rounded-lg transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        Upload File
                      </button>

                      <button
                        onClick={loadSample}
                        className="w-full px-4 py-2 bg-primary hover:bg-primary text-black rounded-lg transition-colors font-semibold text-sm flex items-center justify-center gap-2"
                      >
                        Load Sample
                      </button>
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
                          className="flex-1 bg-black border border-[#222222] rounded-lg px-3 py-2 text-white text-sm"
                          placeholder="https://example.com/data.csv"
                        />
                        <button
                          onClick={loadFromUrl}
                          disabled={isLoadingUrl || !urlInput.trim()}
                          className="px-3 py-2 bg-primary hover:bg-primary text-black rounded-lg transition-colors text-sm whitespace-nowrap font-bold text-sm"
                        >
                          {isLoadingUrl ? "Loading..." : "Load"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={download}
                    disabled={!convertedText}
                    className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-2`}
                  >
                    Download {outputFormat.toUpperCase()}
                  </button>
                  <button
                    type="button"
                    onClick={copy}
                    disabled={!convertedText}
                    className="px-4 py-3 bg-primary text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm flex items-center gap-2"
                  >
                    Copy Text
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg text-sm flex items-center gap-2`}
                  >
                    Clear All
                  </button>
                </div>

                {/* Hidden file input for upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.csv,text/plain,text/csv"
                  onChange={uploadFile}
                  className="hidden"
                />

                {parsed.headers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-white/90">
                      CSV Preview
                    </h3>
                    <div className="overflow-auto rounded-lg border border-[#222222]">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="bg-black/40">
                            {parsed.headers.map((h, index) => (
                              <th
                                key={index}
                                className="px-3 py-2 border-r border-[#222222] text-white/90 whitespace-pre"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {parsed.rows.slice(0, 20).map((r, i) => (
                            <tr key={i} className="odd:bg-black/30">
                              {r.map((c, j) => (
                                <td
                                  key={j}
                                  className="px-3 py-2 border-r border-[#222222] text-white/90 whitespace-pre"
                                >
                                  {c}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {parsed.rows.length > 20 && (
                        <div className="text-center py-2 text-white/70 text-sm">
                          Showing first 20 rows of {parsed.rows.length} total
                          rows
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {convertedText && (
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-white/90">
                      Converted Output ({outputFormat})
                    </h3>
                    <div className="bg-black border border-[#222222] rounded-lg p-4">
                      <pre className="text-white text-sm whitespace-pre-wrap overflow-auto max-h-96">
                        {convertedText}
                      </pre>
                    </div>
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

                {parsed.headers.length > 0 && (
                  <div className="text-center text-white/70 text-sm">
                    <p>
                      Total Rows: {parsed.rows.length} | Total Columns:{" "}
                      {parsed.headers.length}
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

export default CsvToTextConverter;
