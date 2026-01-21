"use client";
import React, { useState, useEffect } from "react";
import { InputField } from "../theme/form/formFeildComponent";
import { useForm } from "react-hook-form";
import CopyIcon from "../theme/Icon/copyIcon";
import ReloadIcon from "../theme/Icon/reload";
import { CheckIcon } from "../theme/Icon/checkIcon";


const RandomGUIDGenerator = () => {
  const { register, formState, setValue, watch } = useForm<any>({});
  const [generatedGUIDs, setGeneratedGUIDs] = useState<string[]>([]);
  const [format, setFormat] = useState<"standard" | "uppercase" | "lowercase" | "no-hyphens">("standard");
  const [count, setCount] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);

  // Generate a single GUID
  const generateGUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // Format GUID based on selected format
  const formatGUID = (guid: string): string => {
    switch (format) {
      case "uppercase":
        return guid.toUpperCase();
      case "lowercase":
        return guid.toLowerCase();
      case "no-hyphens":
        return guid.replace(/-/g, '');
      default:
        return guid;
    }
  };

  // Generate GUIDs
  const generateGUIDs = () => {
    const newGUIDs: string[] = [];
    for (let i = 0; i < count; i++) {
      newGUIDs.push(formatGUID(generateGUID()));
    }
    setGeneratedGUIDs(newGUIDs);
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Copy all GUIDs
  const copyAllGUIDs = async () => {
    const allGUIDs = generatedGUIDs.join('\n');
    try {
      await navigator.clipboard.writeText(allGUIDs);
      setCopiedIndex(-1); // Special index for "all"
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Validate GUID
  const validateGUID = (guid: string): { isValid: boolean; message: string } => {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const noHyphensRegex = /^[0-9a-f]{32}$/i;
    
    if (guid.length === 0) {
      return { isValid: false, message: "Please enter a GUID to validate" };
    }
    
    if (guid.includes('-')) {
      if (guidRegex.test(guid)) {
        return { isValid: true, message: "Valid GUID format" };
      } else {
        return { isValid: false, message: "Invalid GUID format" };
      }
    } else {
      if (noHyphensRegex.test(guid)) {
        return { isValid: true, message: "Valid GUID format (no hyphens)" };
      } else {
        return { isValid: false, message: "Invalid GUID format" };
      }
    }
  };

  // Handle validation input change
  const handleValidationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.trim()) {
      setValidationResult(validateGUID(value));
    } else {
      setValidationResult(null);
    }
  };

  // Generate GUIDs on component mount and when format/count changes
  useEffect(() => {
    generateGUIDs();
  }, [format, count]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Configuration */}
      <div className="bg-white/5 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-white mb-4">Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              GUID Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              style={{
                colorScheme: 'dark'
              }}
            >
              <option value="standard" className="bg-black text-white">Standard (lowercase with hyphens)</option>
              <option value="uppercase" className="bg-black text-white">Uppercase with hyphens</option>
              <option value="lowercase" className="bg-black text-white">Lowercase with hyphens</option>
              <option value="no-hyphens" className="bg-black text-white">No hyphens (32 characters)</option>
            </select>
          </div>

          {/* Count Selection */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Number of GUIDs
            </label>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              style={{
                colorScheme: 'dark'
              }}
            >
              <option value={1} className="bg-black text-white">1 GUID</option>
              <option value={5} className="bg-black text-white">5 GUIDs</option>
              <option value={10} className="bg-black text-white">10 GUIDs</option>
              <option value={25} className="bg-black text-white">25 GUIDs</option>
              <option value={50} className="bg-black text-white">50 GUIDs</option>
              <option value={100} className="bg-black text-white">100 GUIDs</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            onClick={generateGUIDs}
            className="px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <ReloadIcon className="w-5 h-5" />
            Generate New GUIDs
          </button>
        </div>
      </div>

      {/* Generated GUIDs */}
      {generatedGUIDs.length > 0 && (
        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Generated GUIDs ({generatedGUIDs.length})
            </h2>
            <button
              onClick={copyAllGUIDs}
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
            {generatedGUIDs.map((guid, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <span className="text-sm text-white/60 font-mono w-8">{index + 1}.</span>
                <code className="flex-1 text-white font-mono text-sm break-all">{guid}</code>
                <button
                  onClick={() => copyToClipboard(guid, index)}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  title="Copy GUID"
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

export default RandomGUIDGenerator;
