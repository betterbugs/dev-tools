"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { Editor } from "@monaco-editor/react";
import TurndownService from "turndown";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS

const HtmlToMarkDownComponent = () => {
  const [htmlInput, setHtmlInput] = useState("");
  const [markdownOutput, setMarkdownOutput] = useState("");
  const [includeCss, setIncludeCss] = useState(false); // Track whether to include CSS or not
  const [includeClasses, setIncludeClasses] = useState(false);
  const [buttonText, setButtonText] = useState("Copy");
  const [includeIds, setIncludeIds] = useState(false);
  const [includeJs, setIncludeJs] = useState(false); // New state for JavaScript retention

  const turndownService = new TurndownService();

  const handleConvert = () => {
    if (!htmlInput.trim()) {
      toast.error("Please enter some HTML to convert!");
      return;
    }

    let htmlContent = htmlInput;

    // Optionally remove internal CSS, JS, and classes
    if (!includeCss) {
      htmlContent = removeCss(htmlContent);
    }
    if (!includeJs) {
      htmlContent = removeJs(htmlContent); // Remove internal JavaScript
    }
    if (!includeClasses) {
      htmlContent = removeClasses(htmlContent);
    }

    // Retain classes or IDs in Markdown if required
    if (includeClasses || includeIds) {
      turndownService.addRule("retainIdsAndClasses", {
        filter: (node: any) =>
          node.hasAttribute &&
          (node.hasAttribute("class") || node.hasAttribute("id")),
        replacement: (content, node: any) => {
          const tagName = node.nodeName.toLowerCase();
          const id = node.getAttribute("id");
          const className = node.getAttribute("class");

          let attributes = "";
          if (id) attributes += ` id="${id}"`;
          if (className) attributes += ` class="${className}"`;

          return `<${tagName}${attributes}>${content}</${tagName}>`;
        },
      });
    }

    // Convert to Markdown
    const markdown = turndownService.turndown(htmlContent);

    // Update state with the Markdown output
    setMarkdownOutput(markdown);
    toast.success("Conversion successful!");
  };

  const removeCss = (html: any) => {
    return html.replace(/<style.*?>.*?<\/style>/g, "");
  };

  const removeJs = (html: any) => {
    return html.replace(/<script.*?>.*?<\/script>/g, ""); // Remove <script> and its content
  };

  const removeClasses = (html: any) => {
    return html.replace(/\s*class="[^"]*"/g, "");
  };

  const handleClear = () => {
    setHtmlInput("");
    setMarkdownOutput("");
    setIncludeCss(false);
    setIncludeClasses(false);
    setIncludeIds(false);
    setIncludeJs(false);
  };

  // Handle file upload
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file extension is .html
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "html") {
        const reader: any = new FileReader();
        reader.onload = () => {
          setHtmlInput(reader.result); // Set the file content into the input
        };
        reader.readAsText(file);
      } else {
        toast.error("Only HTML files are allowed!"); // Error message for invalid file type
      }
    }
  };

  // Copy to clipboard function
  const handleCopyToClipboard = () => {
    if (markdownOutput) {
      navigator.clipboard.writeText(markdownOutput);
      setButtonText("Copied");

      // Revert button text back to "Copy" after 1 second
      setTimeout(() => {
        setButtonText("Copy");
      }, 2000);
    }
  };

  // Function to download markdown as a .md file
  const handleDownload = () => {
    if (!markdownOutput.trim()) {
      toast.error("No Markdown to download!"); // Set error message
      return;
    }

    const blob = new Blob([markdownOutput], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.md"; // Set the name of the downloaded file
    link.click(); // Trigger the download
    toast.success("Markdown file downloaded!");
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
            <div className="md:w-[770px] mx-auto">
              <h2 className="text-xl font-semibold my-4 items-start md:ml-[-55px]">
                Input HTML here:
              </h2>

              {/* Input Section */}
              <div className="flex flex-col md:flex-row justify-center md:items-start items-center gap-4 md:my-5 mt-2">
                <div className="flex flex-col">
                  <Editor
                    height="180px"
                    defaultLanguage="json"
                    value={htmlInput}
                    onChange={(value) => setHtmlInput(value || "")}
                    className="rounded-xl border border-[#222222] monaco-background w-full md:min-w-[770px]"
                    options={{
                      minimap: { enabled: false },
                      wordWrap: "on",
                    }}
                  />

                  {/* Includes checkbox */}
                  <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto w-full">
                    <label className="flex items-center text-lg text-white/70 group">
                      <input
                        type="checkbox"
                        id="includeCss"
                        checked={includeCss}
                        onChange={(e) => setIncludeCss(e.target.checked)}
                        className="peer hidden"
                      />
                      <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          ✔
                        </span>
                      </div>
                      <span className="ml-2 group-hover:text-primary break-words">
                        Include Internal CSS as Text
                      </span>
                    </label>

                    <label className="flex items-center text-lg text-white/70 group">
                      <input
                        type="checkbox"
                        id="includeClasses"
                        checked={includeClasses}
                        onChange={(e) => setIncludeClasses(e.target.checked)}
                        className="peer hidden"
                      />
                      <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          ✔
                        </span>
                      </div>
                      <span className="ml-2 group-hover:text-primary">
                        Include HTML Classes in Markdown
                      </span>
                    </label>

                    <label className="flex items-center text-lg text-white/70 group">
                      <input
                        type="checkbox"
                        id="includeIds"
                        checked={includeIds}
                        onChange={(e) => setIncludeIds(e.target.checked)}
                        className="peer hidden"
                      />
                      <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          ✔
                        </span>
                      </div>
                      <span className="ml-2 group-hover:text-primary break-words">
                        Include HTML IDs in Markdown
                      </span>
                    </label>

                    <label className="flex items-center text-lg text-white/70 group">
                      <input
                        type="checkbox"
                        id="includeJs"
                        checked={includeJs}
                        onChange={(e) => setIncludeJs(e.target.checked)}
                        className="peer hidden"
                      />
                      <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          ✔
                        </span>
                      </div>
                      <span className="ml-2 group-hover:text-primary">
                        Retain Internal JavaScript
                      </span>
                    </label>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex md:flex-col flex-wrap md:flex-nowrap md:justify-start justify-center gap-4 my-6">
                  <button
                    onClick={handleConvert}
                    disabled={!htmlInput}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } md:w-[135px] w-[130px] text-black py-3 md:px-8 px-4 rounded-lg items-center transition-transform transform hover:translate-y-1 font-bold ${
                      !htmlInput ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Convert
                  </button>

                  <button
                    onClick={handleClear}
                    disabled={!htmlInput}
                    className={`${
                      DevelopmentToolsStyles.clearButton
                    } md:w-[135px] w-[130px] text-black py-3 md:px-8 px-4 rounded-lg font-bold ${
                      !htmlInput ? "opacity-70 cursor-not-allowed" : ""
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
                      accept=".html"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold my-6 items-start md:ml-[-55px]">
                Markdown Output:
              </h3>
              <div className="md:flex justify-center items-center gap-4 md:my-7 mt-2">
                <Editor
                  height="180px"
                  defaultLanguage="json"
                  value={markdownOutput}
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
                    disabled={!markdownOutput}
                    className={`${
                      DevelopmentToolsStyles.copyButton
                    } md:w-[135px] w-[130px] text-white py-3 px-10 rounded-lg font-bold ${
                      !markdownOutput ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {buttonText}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!markdownOutput}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } md:w-[135px] w-[130px] text-white py-3 px-8 rounded-lg font-bold ${
                      !markdownOutput ? "opacity-70 cursor-not-allowed" : ""
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

export default HtmlToMarkDownComponent;
