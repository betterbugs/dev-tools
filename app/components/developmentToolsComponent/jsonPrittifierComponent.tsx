"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS

const JsonPrettifierComponent = () => {
  const [inputJson, setInputJson] = useState("");
  const [prettifiedJson, setPrettifiedJson] = useState("");
  const [indentation, setIndentation] = useState(2); // State for selected indentation
  const [buttonText, setButtonText] = useState("Copy");

  const handleEditorChange = (value: any) => {
    setInputJson(value || "{}");
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        try {
          JSON.parse(fileContent);
          setInputJson(fileContent);
        } catch (error) {
          toast.error(
            "The uploaded file contains invalid JSON. Please check the file and try again."
          );
        }
      };

      reader.onerror = () => {
        toast.error(
          "An error occurred while reading the file. Please try again."
        );
      };

      reader.readAsText(file);
    }
  };

  const handlePrettify = () => {
    try {
      const parsedJson = JSON.parse(inputJson);
      setPrettifiedJson(JSON.stringify(parsedJson, null, indentation)); // Prettify JSON with selected indentation
      toast.success("JSON successfully prettified!");
    } catch (error) {
      toast.error("Invalid JSON input. Please fix it and try again.");
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(prettifiedJson);
    setButtonText("Copied");

    // Revert button text back to "Copy" after 1 second
    setTimeout(() => {
      setButtonText("Copy");
    }, 2000);
  };

  const handleDownload = () => {
    if (!prettifiedJson) {
      toast.error("Nothing to download! Please prettify JSON first.");
      return;
    }
    const blob = new Blob([prettifiedJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prettified.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClean = () => {
    setInputJson("");
    setPrettifiedJson("");
  };

  const handleIndentationChange = (value: number) => {
    setIndentation(value);
    // Only try to re-prettify if there's already prettified JSON
    if (prettifiedJson) {
      try {
        // Parse the existing prettified JSON and re-stringify with new indentation
        const parsedJson = JSON.parse(inputJson);
        setPrettifiedJson(JSON.stringify(parsedJson, null, value));
      } catch (error) {
        toast.error("Error updating indentation");
      }
    }
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

              {/* Monaco Editor for JSON Input */}
              <div className="md:flex justify-center items-center gap-4 md:my-5 mt-2">
                <Editor
                  height="200px"
                  defaultLanguage="json"
                  value={inputJson}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    scrollbar: { vertical: "auto" },
                    wordWrap: "on",
                  }}
                  className="monaco-background w-full md:min-w-[770px]"
                />

                <div className="flex flex-wrap md:flex-col md:justify-start justify-center md:gap-4 gap-1 my-6">
                  <button
                    onClick={handlePrettify}
                    disabled={!inputJson}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } text-black py-3 md:px-8 px-4 rounded-lg items-center transition-transform transform hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] font-bold ${
                      !inputJson ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Prettify
                  </button>

                  <label
                    htmlFor="file-upload"
                    className={`${DevelopmentToolsStyles.copyButton} md:w-[160px] w-[130px] text-black py-3 md:px-8 px-4 rounded-lg items-center transition-transform transform hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] font-bold cursor-pointer`}
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
                    } text-black font-bold py-3 md:px-8 px-4 rounded-lg items-center transition-transform transform hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] ${
                      !inputJson ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Prettified JSON Output */}
              <h3 className="text-xl font-semibold my-6 items-start md:ml-[-55px]">
                Prettified JSON
              </h3>
              <div className="md:flex justify-center items-center gap-4 md:mt-2 md:mb-5 mt-2">
                <Editor
                  height="200px"
                  defaultLanguage="json"
                  value={prettifiedJson}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollbar: { vertical: "auto" },
                  }}
                  className="monaco-background w-full md:min-w-[770px]"
                />

                <div className="flex flex-wrap md:flex-col md:justify-start justify-center md:gap-4 gap-1 my-6">
                  <button
                    onClick={handleCopyToClipboard}
                    disabled={!prettifiedJson}
                    className={`${
                      DevelopmentToolsStyles.copyButton
                    } md:w-[160px] w-[130px] text-white font-bold py-3 md:px-10 px-4 rounded-lg items-center transition-transform transform hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] ${
                      !prettifiedJson ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {buttonText}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!prettifiedJson}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } md:w-[160px] w-[130px] text-white py-3 px-8 rounded-lg items-center transition-transform transform hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] font-bold ${
                      !prettifiedJson ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Download
                  </button>
                  <div className="w-full md:mt-0 mt-3">
                    <div className="w-full flex flex-wrap justify-around md:gap-2 gap-[2px]">
                      {[1, 2, 3, 4].map((value) => (
                        <button
                          key={value}
                          onClick={() => handleIndentationChange(value)}
                          disabled={!prettifiedJson}
                          className={`p-2 text-[14px] border ${
                            indentation === value
                              ? "bg-primary text-white"
                              : "bg-black/70 text-primary"
                          } rounded-lg ${
                            !prettifiedJson
                              ? "opacity-70 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {value} Space
                        </button>
                      ))}
                    </div>
                  </div>
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

export default JsonPrettifierComponent;
