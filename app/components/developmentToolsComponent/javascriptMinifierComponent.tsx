"use client";
import React, { useState } from "react";
import MonacoEditor, { Editor } from "@monaco-editor/react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS

const JavascriptMinifierComponent = () => {
  const [inputJson, setInputJson] = useState("");
  const [minifiedJson, setMinifiedJson] = useState("");
  const [buttonText, setButtonText] = useState("Copy");

  const handleMinify = () => {
    if (!inputJson.trim()) {
      toast.error("Input JSON cannot be empty.");
      return;
    }
    try {
      const parsedJson = JSON.parse(inputJson);
      setMinifiedJson(JSON.stringify(parsedJson));
      toast.success("JSON successfully minified!");
    } catch (error) {
      toast.error("Invalid JSON input. Please fix it and try again.");
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

  const handleClean = () => {
    setInputJson("");
    setMinifiedJson("");
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[770px] mx-auto">
              <h2 className="text-xl font-semibold my-4 items-start md:ml-[-55px]">
                Input JS here:
              </h2>

              {/* Input Section */}
              <div className="md:flex justify-center items-center gap-4 md:my-5 mt-2">
                <div className="w-full md:min-w-[770px] min-h-[180px] bg-black border border-[#222222] rounded-xl">
                  <Editor
                    height="180px"
                    language="json"
                    value={inputJson}
                    onChange={(value) => setInputJson(value || "")}
                    options={{
                      minimap: { enabled: false },
                      scrollbar: { vertical: "auto" },
                      wordWrap: "on",
                    }}
                    theme="#000"
                    className="monaco-background"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex md:flex-col md:justify-start justify-center gap-4 my-6">
                  <button
                    onClick={handleMinify}
                    disabled={!inputJson}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } text-black py-3 px-8 rounded-lg items-center transition-transform transform hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] font-bold ${
                      !inputJson ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Minify
                  </button>

                  <button
                    onClick={handleClean}
                    disabled={!inputJson}
                    className={`${
                      DevelopmentToolsStyles.clearButton
                    } text-black font-bold py-3 px-8 rounded-lg items-center transition-transform transform  shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] ${
                      !inputJson
                        ? "opacity-70 cursor-not-allowed hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)]"
                        : ""
                    }`}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Transformed Text Section */}
              <h3 className="text-xl font-semibold my-6 items-start md:ml-[-55px]">
                Minified JS:
              </h3>
              <div className="md:flex justify-center items-center gap-4 md:my-5 mt-2">
                <div className="w-full md:min-w-[770px] min-h-[180px] bg-black border border-[#222222] rounded-xl">
                  <MonacoEditor
                    height="180px"
                    language="json"
                    value={minifiedJson}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      scrollbar: { vertical: "auto" },
                      wordWrap: "on",
                    }}
                    className="monaco-background"
                  />
                </div>

                {/* Copy Button */}
                <div className="flex justify-center mt-4">
                  <button
                    disabled={!minifiedJson}
                    onClick={handleCopyToClipboard}
                    className={`${
                      DevelopmentToolsStyles.copyButton
                    } text-white font-bold py-3 px-10 rounded-lg items-center transition-transform transform  shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] ${
                      !minifiedJson
                        ? "opacity-70 cursor-not-allowed hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)]"
                        : ""
                    }`}
                  >
                    {buttonText}
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

export default JavascriptMinifierComponent;
