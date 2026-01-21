"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import { Editor } from "@monaco-editor/react";
import { marked } from "marked"; // Import marked.js for Markdown to HTML conversion
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const MarkDownToHtmlComponent = () => {
  const [markdownInput, setMarkdownInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [buttonText, setButtonText] = useState("Copy");

  const restoreHtmlClasses = (markdown: any) => {
    return markdown.replace(
      /(.*)<!-- classes: (.*?) -->/g,
      (content: any, classes: any) => {
        // Wrap the content in a div with the restored classes
        return `<div class="${classes}">${content}</div>`;
      }
    );
  };

  const handleConvert = () => {
    if (!markdownInput.trim()) {
      toast.error("Please enter some Markdown to convert!"); // Display error toast
      return;
    }

    // First restore the classes from Markdown
    const markdownWithClassesRestored = restoreHtmlClasses(markdownInput);

    // Now convert the modified Markdown with restored classes to HTML
    const html: any = marked(markdownWithClassesRestored);
    setHtmlOutput(html);
    toast.success("Conversion successful!"); // Display success toast
  };

  const handleClear = () => {
    setMarkdownInput("");
    setHtmlOutput("");
  };

  // Handle file upload
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file extension is .md
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "md") {
        const reader: any = new FileReader();
        reader.onload = () => {
          setMarkdownInput(reader.result); // Set the file content into the input
        };
        reader.readAsText(file);
      } else {
        toast.error("Only Markdown (.md) files are allowed!"); // Display error toast
      }
    }
  };

  // Copy to clipboard function
  const handleCopyToClipboard = () => {
    if (htmlOutput) {
      navigator.clipboard.writeText(htmlOutput);
      setButtonText("Copied");

      // Revert button text back to "Copy" after 1 second
      setTimeout(() => {
        setButtonText("Copy");
      }, 2000);
    }
  };

  // Download HTML function
  const handleDownloadHtml = () => {
    if (!htmlOutput.trim()) {
      toast.error("No HTML content to download!"); // Display error toast
      return;
    }

    // Create a Blob from the HTML content
    const blob = new Blob([htmlOutput], { type: "text/html" });

    // Create a link element
    const link = document.createElement("a");

    // Set the download attribute with a filename
    link.download = "converted.html";

    // Create an object URL for the Blob
    link.href = URL.createObjectURL(blob);

    // Programmatically click the link to trigger the download
    link.click();

  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg md:p-8 p-4">
            <div className="md:w-[770px] mx-auto">
              <h2 className="text-xl font-semibold my-4 items-start md:ml-[-55px]">
                Input Markdown here:
              </h2>

              {/* Input Section */}
              <div className="flex flex-col md:flex-row justify-center md:items-start items-center gap-4 md:my-5 mt-2">
                <Editor
                  height="180px"
                  defaultLanguage="json"
                  value={markdownInput}
                  onChange={(value) => setMarkdownInput(value || "")}
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
                    onClick={handleConvert}
                    disabled={!markdownInput}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } md:w-[135px] w-[130px] text-black py-3 md:px-8 px-4 rounded-lg items-center transition-transform transform hover:translate-y-1 font-bold ${
                      !markdownInput ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Convert
                  </button>

                  <button
                    onClick={handleClear}
                    disabled={!markdownInput}
                    className={`${
                      DevelopmentToolsStyles.clearButton
                    } md:w-[135px] w-[130px] text-black py-3 md:px-8 px-4 rounded-lg font-bold ${
                      !markdownInput ? "opacity-70 cursor-not-allowed" : ""
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
                HTML Output:
              </h3>
              <div className="md:flex justify-center items-center gap-4 md:my-5 mt-2">
                <Editor
                  height="180px"
                  defaultLanguage="json"
                  value={htmlOutput}
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
                    disabled={!htmlOutput}
                    className={`${
                      DevelopmentToolsStyles.copyButton
                    } md:w-[135px] w-[130px] text-white py-3 px-10 rounded-lg font-bold ${
                      !htmlOutput ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {buttonText}
                  </button>
                  <button
                    onClick={handleDownloadHtml}
                    disabled={!htmlOutput}
                    className={`${
                      DevelopmentToolsStyles.converterButton
                    } md:w-[135px] w-[130px] text-white py-3 px-8 rounded-lg font-bold ${
                      !htmlOutput ? "opacity-70 cursor-not-allowed" : ""
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

export default MarkDownToHtmlComponent;
