"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import JavaScriptObfuscator from "javascript-obfuscator";
import { Editor } from "@monaco-editor/react";

const JsObfuscatorComponent = () => {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");

  const handleObfuscate = () => {
    if (!inputCode.trim()) {
      toast.error("Error: Cannot obfuscate an empty file!");
      return; // Don't proceed with obfuscation if the code is empty
    }

    try {
      const obfuscatedCode = JavaScriptObfuscator.obfuscate(inputCode, {
        compact: true,
        controlFlowFlattening: true,
      }).getObfuscatedCode();
      setOutputCode(obfuscatedCode);
    } catch (error) {
      setOutputCode(""); // Clear the output on error
      toast.error(`Error obfuscating code: ${(error as Error).message}`); // Set the obfuscation error message
    }
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "js") {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent: any = reader.result;
          if (!fileContent.trim()) {
            setInputCode("");
            toast.error("Error: The uploaded JavaScript file is empty!");
          } else {
            setInputCode(fileContent);
          }
        };
        reader.readAsText(file);
      } else {
        setOutputCode(""); // Clear the output on invalid file
        toast.error("Only JavaScript (.js) files are allowed!");
      }
    }
  };

  const handleClear = () => {
    setInputCode("");
    setOutputCode("");
  };

  const handleDownload = () => {
    const blob = new Blob([outputCode], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "obfuscated_code.js";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
            <div className="md:w-[770px] mx-auto">
              <h2 className="text-xl font-semibold my-4 items-start md:ml-[-55px]">
                JavaScript Input:
              </h2>

              {/* Input Section */}
              <div className="flex flex-col md:flex-row justify-center md:items-start items-center gap-4 md:my-5 mt-2">
                <Editor
                  height="180px"
                  defaultLanguage="json"
                  value={inputCode}
                  onChange={(value) => setInputCode(value || "")}
                  className="rounded-xl border border-[#222222] monaco-background w-full md:min-w-[770px]"
                  options={{
                    minimap: { enabled: false },
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                  }}
                />

                {/* Action buttons */}
                <div className="flex md:flex-col flex-wrap md:flex-nowrap md:justify-start justify-center gap-4 my-6">
                  <button
                    onClick={handleObfuscate}
                    disabled={!inputCode}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } md:w-[135px] w-[130px] text-black py-3 md:px-8 px-4 rounded-lg items-center transition-transform transform hover:translate-y-1 font-bold ${
                      !inputCode ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Obfuscate
                  </button>

                  <button
                    onClick={handleClear}
                    disabled={!inputCode}
                    className={`${
                      DevelopmentToolsStyles.clearButton
                    } md:w-[135px] w-[130px] text-black py-3 md:px-8 px-4 rounded-lg font-bold ${
                      !inputCode ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Clear
                  </button>

                  <div>
                    <button
                      className={`${DevelopmentToolsStyles.copyButton} md:w-[135px] w-[130px] text-black py-3 md:px-8 px-4 rounded-lg font-bold`}
                      onClick={() =>
                        document.getElementById("fileUpload")?.click()
                      }
                    >
                      Upload
                    </button>
                    <input
                      type="file"
                      id="fileUpload"
                      accept=".js"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold my-6 items-start md:ml-[-55px]">
                Obfuscated Output:
              </h3>
              <div className="md:flex justify-center items-center gap-4 md:my-5 mt-2">
                <Editor
                  height="180px"
                  defaultLanguage="json"
                  value={outputCode}
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
                    onClick={handleDownload}
                    disabled={!outputCode}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } md:w-[135px] w-[130px] text-white py-3 px-8 rounded-lg font-bold ${
                      !outputCode ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeButton={false}
        theme="dark"
      />
    </section>
  );
};

export default JsObfuscatorComponent;
