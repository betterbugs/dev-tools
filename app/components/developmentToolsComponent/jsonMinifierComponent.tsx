"use client";
import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS

const JsonMinifierComponent = () => {
  const [inputJson, setInputJson] = useState("");
  const [minifiedJson, setMinifiedJson] = useState("");
  const [buttonText, setButtonText] = useState("Copy");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target?.result as string;
        try {
          JSON.parse(fileContent);
          setInputJson(fileContent);
          toast.success("File uploaded successfully!");
        } catch (error) {
          toast.error("The uploaded file contains invalid JSON.");
        }
      };

      reader.onerror = () => {
        toast.error("An error occurred while reading the file.");
      };

      reader.readAsText(file);
    }
  };

  const handleMinify = () => {
    try {
      const parsedJson = JSON.parse(inputJson);
      setMinifiedJson(JSON.stringify(parsedJson));
      toast.success("JSON minified successfully!");
    } catch (error) {
      toast.error("Invalid JSON input. Please fix it and try again.");
      toast.success("");
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(minifiedJson);
    setButtonText("Copied");

    // Revert button text back to "Copy" after 1 second
    setTimeout(() => {
      setButtonText("Copy");
    }, 2000);
  };

  const handleDownload = () => {
    if (!minifiedJson) {
      toast.error("Nothing to download! Please minify JSON first.");
      return;
    }
    const blob = new Blob([minifiedJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minified.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClean = () => {
    setInputJson("");
    setMinifiedJson("");
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
            <div className="md:w-[770px] mx-auto">
              <h2 className="text-xl font-semibold my-4 items-start md:ml-[-55px]">
                Input JSON here:
              </h2>

              {/* Input Section */}
              <div className="md:flex justify-center items-center gap-4 md:my-5 mt-2">
                <Editor
                  height="180px"
                  defaultLanguage="json"
                  value={inputJson}
                  onChange={(value) => setInputJson(value || "")}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                  }}
                  className="rounded-xl border border-[#222222] monaco-background  w-full md:min-w-[770px]"
                />

                <div className="flex md:flex-col md:justify-start justify-center gap-4 my-6">
                  <button
                    onClick={handleMinify}
                    disabled={!inputJson}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } text-black py-3 md:px-8 px-4 rounded-lg items-center transition-transform transform hover:translate-y-1 font-bold ${
                      !inputJson ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Minify
                  </button>

                  <label
                    htmlFor="file-upload"
                    className={`${DevelopmentToolsStyles.copyButton} md:w-[160px] w-[130px] text-black py-3 md:px-8 px-4 rounded-lg font-bold`}
                  >
                    Choose File
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="application/json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <button
                    onClick={handleClean}
                    disabled={!inputJson}
                    className={`${
                      DevelopmentToolsStyles.clearButton
                    } text-black py-3 md:px-8 px-4 rounded-lg font-bold ${
                      !inputJson ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Clear
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold my-6 items-start md:ml-[-55px]">
                Minified JSON:
              </h3>
              <div className="md:flex justify-center items-center gap-4 md:my-5 mt-2">
                <Editor
                  height="180px"
                  defaultLanguage="json"
                  value={(() => {
                    try {
                      // Attempt to parse and format the JSON
                      return JSON.stringify(JSON.parse(minifiedJson), null, 2);
                    } catch (error) {
                      // If parsing fails, return the raw string or an error message
                      return " ";
                    }
                  })()}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                  }}
                  className="rounded-xl border border-[#222222] monaco-background w-full md:min-w-[770px]"
                />

                <div className="flex md:flex-col md:justify-start justify-center gap-4 my-6">
                  <button
                    onClick={handleCopyToClipboard}
                    disabled={!minifiedJson}
                    className={`${
                      DevelopmentToolsStyles.copyButton
                    } md:w-[160px] w-[130px] text-white py-3 px-10 rounded-lg font-bold ${
                      !minifiedJson ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {buttonText}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!minifiedJson}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } md:w-[160px] w-[130px] text-white py-3 px-8 rounded-lg font-bold ${
                      !minifiedJson ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Download
                  </button>
                </div>
              </div>
              {/* Toast container to display the toaster message */}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeButton={false}
                theme="dark"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JsonMinifierComponent;
