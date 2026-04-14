"use client";

import React, { useState } from "react";

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  formattedJson?: string;
  statistics: {
    totalKeys: number;
    maxDepth: number;
    dataTypes: Record<string, number>;
  };
}

interface SchemaValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

const JsonValidator = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [validationResults, setValidationResults] =
    useState<ValidationResult | null>(null);
  const [schemaInput, setSchemaInput] = useState("");
  const [schemaValidation, setSchemaValidation] =
    useState<SchemaValidationResult | null>(null);
  const [indentSize, setIndentSize] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  const validateJson = (jsonString: string): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];
    let parsedJson: any = null;
    let formattedJson = "";

    // Basic syntax validation
    try {
      parsedJson = JSON.parse(jsonString);
      formattedJson = JSON.stringify(parsedJson, null, indentSize);
    } catch (error: any) {
      errors.push(`Syntax Error: ${error.message}`);
      return {
        isValid: false,
        errors,
        warnings,
        statistics: { totalKeys: 0, maxDepth: 0, dataTypes: {} },
      };
    }

    // Advanced validations
    const statistics = analyzeJson(parsedJson);

    // Check for common issues
    if (typeof parsedJson === "string") {
      warnings.push(
        "Root element is a string. Consider if this should be an object or array."
      );
    }

    if (Array.isArray(parsedJson) && parsedJson.length === 0) {
      warnings.push("Array is empty.");
    }

    if (
      typeof parsedJson === "object" &&
      !Array.isArray(parsedJson) &&
      Object.keys(parsedJson).length === 0
    ) {
      warnings.push("Object is empty.");
    }

    // Check for potential issues
    checkForIssues(parsedJson, "", errors, warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      formattedJson,
      statistics,
    };
  };

  const analyzeJson = (
    obj: any,
    path = "",
    depth = 0
  ): {
    totalKeys: number;
    maxDepth: number;
    dataTypes: Record<string, number>;
  } => {
    let totalKeys = 0;
    let maxDepth = depth;
    const dataTypes: Record<string, number> = {};

    const analyze = (item: any, currentPath: string, currentDepth: number) => {
      const type = Array.isArray(item) ? "array" : typeof item;
      dataTypes[type] = (dataTypes[type] || 0) + 1;

      if (type === "object" && item !== null) {
        if (Array.isArray(item)) {
          totalKeys += item.length;
          item.forEach((value, index) => {
            analyze(value, `${currentPath}[${index}]`, currentDepth + 1);
          });
        } else {
          const keys = Object.keys(item);
          totalKeys += keys.length;
          keys.forEach((key) => {
            analyze(
              item[key],
              currentPath ? `${currentPath}.${key}` : key,
              currentDepth + 1
            );
          });
        }
        maxDepth = Math.max(maxDepth, currentDepth + 1);
      }
    };

    analyze(obj, path, depth);
    return { totalKeys, maxDepth, dataTypes };
  };

  const checkForIssues = (
    obj: any,
    path: string,
    errors: string[],
    warnings: string[]
  ) => {
    if (typeof obj === "object" && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          checkForIssues(item, `${path}[${index}]`, errors, warnings);
        });
      } else {
        Object.entries(obj).forEach(([key, value]) => {
          const currentPath = path ? `${path}.${key}` : key;

          // Check for empty strings
          if (value === "") {
            warnings.push(`Empty string at ${currentPath}`);
          }

          // Check for null values
          if (value === null) {
            warnings.push(`Null value at ${currentPath}`);
          }

          // Check for undefined (shouldn't exist in JSON)
          if (value === undefined) {
            errors.push(
              `Undefined value at ${currentPath} (undefined is not valid JSON)`
            );
          }

          // Check for duplicate keys (this is handled by JSON.parse, but we can warn about potential issues)
          if (typeof value === "object" && value !== null) {
            checkForIssues(value, currentPath, errors, warnings);
          }
        });
      }
    }
  };

  const validateAgainstSchema = (
    jsonString: string,
    schemaString: string
  ): SchemaValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const json = JSON.parse(jsonString);
      const schema = JSON.parse(schemaString);

      // Basic schema validation (simplified version)
      if (schema.type) {
        const actualType = Array.isArray(json) ? "array" : typeof json;
        if (actualType !== schema.type) {
          errors.push(
            `Type mismatch: expected ${schema.type}, got ${actualType}`
          );
        }
      }

      if (schema.required && Array.isArray(schema.required)) {
        schema.required.forEach((field: string) => {
          if (!(field in json)) {
            errors.push(`Required field missing: ${field}`);
          }
        });
      }

      if (
        schema.properties &&
        typeof json === "object" &&
        !Array.isArray(json)
      ) {
        Object.entries(schema.properties).forEach(
          ([key, prop]: [string, any]) => {
            if (key in json) {
              const value = json[key];
              if (prop.type) {
                const actualType = Array.isArray(value)
                  ? "array"
                  : typeof value;
                if (actualType !== prop.type) {
                  errors.push(
                    `Property '${key}' type mismatch: expected ${prop.type}, got ${actualType}`
                  );
                }
              }
            }
          }
        );
      }
    } catch (error: any) {
      errors.push(`Schema validation error: ${error.message}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  };

  const handleValidate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const results = validateJson(jsonInput);
      setValidationResults(results);
      setIsLoading(false);
    }, 100);
  };

  const handleSchemaValidate = () => {
    if (!schemaInput.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const results = validateAgainstSchema(jsonInput, schemaInput);
      setSchemaValidation(results);
      setIsLoading(false);
    }, 100);
  };

  const handleSmartRepair = () => {
    let fixed = jsonInput;

    // 1. Standardize Unicode non-breaking spaces
    fixed = fixed.replace(/\u00A0/g, " ");

    // 2. Remove trailing commas
    fixed = fixed.replace(/,\s*([}\]])/g, "$1");

    // 3. Convert single quotes to double quotes (keys and values) & Add quotes to unquoted keys
    // We use a comprehensive regex to identify tokens and fix them
    fixed = fixed.replace(
      /("(?:[^\\"]|\\.)*")|('(?:[^\\']|\\.)*')|([a-zA-Z0-9_]+)\s*:/g,
      (match, doubleQuoted, singleQuoted, unquotedKey) => {
        if (doubleQuoted) {
          return doubleQuoted;
        }
        if (singleQuoted) {
          // Convert single quotes to double quotes, escaping internal double quotes
          const content = singleQuoted.slice(1, -1).replace(/"/g, '\\"');
          return `"${content}"`;
        }
        if (unquotedKey) {
          return `"${unquotedKey}":`;
        }
        return match;
      }
    );

    setJsonInput(fixed);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJsonInput(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSchemaFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setSchemaInput(content);
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadJson = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setJsonInput("");
    setSchemaInput("");
    setValidationResults(null);
    setSchemaValidation(null);
  };

  const sampleSchemas = {
    user: JSON.stringify(
      {
        type: "object",
        required: ["id", "name", "email"],
        properties: {
          id: { type: "number" },
          name: { type: "string" },
          email: { type: "string" },
          age: { type: "number" },
          isActive: { type: "boolean" },
        },
      },
      null,
      2
    ),
    product: JSON.stringify(
      {
        type: "object",
        required: ["id", "title", "price"],
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          price: { type: "number" },
          category: { type: "string" },
          inStock: { type: "boolean" },
        },
      },
      null,
      2
    ),
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Enter Value</h2>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="json-upload"
                />
                <label
                  htmlFor="json-upload"
                  className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold"
                >
                  Upload
                </label>
                <button
                  onClick={() => setJsonInput("")}
                  className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full h-80 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
            />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm">Format:</label>
                <select
                  value={indentSize}
                  onChange={(e:any) => setIndentSize(Number(e.target.value))}
                  className="px-2 py-1 bg-black/90 border border-white/20 rounded text-white text-sm"
                >
                  <option value={2}>Pretty (2 spaces)</option>
                  <option value={4}>Pretty (4 spaces)</option>
                  <option value={0}>Minified</option>
                </select>
              </div>
              <button
                onClick={handleSmartRepair}
                disabled={!jsonInput.trim() || isLoading}
                className="px-4 py-2 text-sm bg-light-blue hover:bg-light-blue/80 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors text-black font-bold"
              >
                {isLoading ? "Repairing..." : "Fix Common Errors"}
              </button>
              <button
                onClick={handleValidate}
                disabled={!jsonInput.trim() || isLoading}
                className="px-4 py-2 text-sm bg-primary hover:bg-primary/80 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors text-black font-bold"
              >
                {isLoading ? "Validating..." : "Validate JSON"}
              </button>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Result:</h2>

            {validationResults ? (
              <div className="space-y-4">
                {/* Status */}
                <div
                  className={`p-3 rounded-lg ${
                    validationResults.isValid
                      ? "bg-primary/30 border border-primary/50"
                      : "bg-red/30 border border-red/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        validationResults.isValid
                          ? "bg-primary"
                          : "bg-red"
                      }`}
                    ></div>
                    <span className="font-medium">
                      {validationResults.isValid
                        ? "Valid JSON"
                        : "Invalid JSON"}
                    </span>
                  </div>
                </div>

                {/* Errors */}
                {validationResults.errors.length > 0 && (
                  <div className="bg-red border border-red/50 p-3 rounded-lg">
                    <h3 className="text-black font-medium mb-2">Errors:</h3>
                    <div className="space-y-1">
                      {validationResults.errors.map((error, index) => (
                        <div
                          key={index}
                          className="text-black text-sm font-mono"
                        >
                          {error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warnings */}
                {validationResults.warnings.length > 0 && (
                  <div className="bg-white/20 border border-white/50 p-3 rounded-lg">
                    <h3 className="text-white/90 font-medium mb-2">
                      Warnings:
                    </h3>
                    <div className="space-y-1">
                      {validationResults.warnings.map((warning, index) => (
                        <div
                          key={index}
                          className="text-white/70 text-sm font-mono"
                        >
                          {warning}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formatted JSON */}
                {validationResults.formattedJson && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Formatted JSON:</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            copyToClipboard(
                              validationResults.formattedJson || ""
                            )
                          }
                          className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() =>
                            downloadJson(
                              validationResults.formattedJson || "",
                              "formatted.json"
                            )
                          }
                          className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                    <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-white/20 h-64">
                      {validationResults.formattedJson}
                    </pre>
                  </div>
                )}

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-black/20 p-2 rounded">
                    <div className="text-lg font-bold text-blue-400">
                      {validationResults.statistics.totalKeys}
                    </div>
                    <div className="text-xs text-gray-300">Keys</div>
                  </div>
                  <div className="bg-black/20 p-2 rounded">
                    <div className="text-lg font-bold text-purple-400">
                      {validationResults.statistics.maxDepth}
                    </div>
                    <div className="text-xs text-gray-300">Depth</div>
                  </div>
                  <div className="bg-black/20 p-2 rounded">
                    <div className="text-lg font-bold text-green-400">
                      {
                        Object.keys(validationResults.statistics.dataTypes)
                          .length
                      }
                    </div>
                    <div className="text-xs text-gray-300">Types</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-black/20 border border-white/20 rounded-lg p-8 text-center">
                <div className="text-gray-400 text-sm">
                  Enter JSON data and click &#34;Validate JSON&#34; to see results
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="border-t border-white/10 pt-6">
          <details className="group">
            <summary className="cursor-pointer text-lg font-medium mb-4 hover:text-blue-400 transition-colors">
              Advanced Options (Schema Validation)
            </summary>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-4">
                    Schema Definition
                  </h3>
                  <div className="flex gap-2 mb-2 mt-3">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleSchemaFileUpload}
                      className="hidden"
                      id="schema-upload"
                    />
                    <label
                      htmlFor="schema-upload"
                      className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold"
                    >
                      Upload Schema
                    </label>
                    <button
                      onClick={() => setSchemaInput("")}
                      className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold"
                    >
                      Clear
                    </button>
                  </div>
                  <select
                    onChange={(e) =>
                      setSchemaInput(
                        sampleSchemas[
                          e.target.value as keyof typeof sampleSchemas
                        ] || ""
                      )
                    }
                    className="w-full px-3 py-1 bg-black/90 border border-white/20 rounded text-white text-sm mb-2"
                  >
                    <option value="">Select Sample Schema</option>
                    <option value="user">User Schema</option>
                    <option value="product">Product Schema</option>
                  </select>
                  <textarea
                    value={schemaInput}
                    onChange={(e) => setSchemaInput(e.target.value)}
                    placeholder="Enter your JSON schema..."
                    className="w-full h-24 p-3 bg-black/20 border border-white/20 rounded text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Schema Validation
                  </h3>
                  <button
                    onClick={handleSchemaValidate}
                    disabled={
                      !jsonInput.trim() || !schemaInput.trim() || isLoading
                    }
                    className="w-full px-4 py-1 text-sm bg-primary hover:bg-primary/80 disabled:bg-gray-600 disabled:cursor-not-allowed rounded transition-colors text-black font-bold mt-3"
                  >
                    Validate Against Schema
                  </button>

                  {schemaValidation && (
                    <div className="mt-4 space-y-2">
                      <div
                        className={`p-3 rounded-lg ${
                          schemaValidation.isValid
                            ? "bg-primary/30 border border-primary/50"
                            : "bg-red/30 border border-red/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              schemaValidation.isValid
                                ? "bg-primary"
                                : "bg-red"
                            }`}
                          ></div>
                          <span className="font-medium text-sm">
                            {schemaValidation.isValid
                              ? "Schema Valid"
                              : "Schema Invalid"}
                          </span>
                        </div>
                      </div>

                      {schemaValidation.errors.length > 0 && (
                        <div className="bg-red border border-red/50 p-3 rounded-lg">
                          <div className="text-black text-sm font-mono">
                            {schemaValidation.errors.map((error, index) => (
                              <div key={index}>{error}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Actions */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex justify-center">
            <button
              onClick={clearAll}
              className="px-6 py-2 text-sm bg-red hover:bg-red/80 rounded-lg transition-colors text-black font-bold"
            >
              Clear All
            </button>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonValidator;
