"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const UpperCaseConverterComponent = () => {
  const [inputText, setInputText] = useState<any>("");
  const [transformedText, setTransformedText] = useState("");
  const [buttonText, setButtonText] = useState("Copy");

  const handleTextChange = (event: any) => {
    setInputText(event.target.value);
  };

  const transformToUpperCase = () => {
    setTransformedText(inputText.toUpperCase());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transformedText);
    setButtonText("Copied");

    // Revert button text back to "Copy" after 1 second
    setTimeout(() => {
      setButtonText("Copy");
    }, 2000);
  };

  const clearText = () => {
    setInputText("");
    setTransformedText("");
  };

  return (
    <div>
      <section>
        <div className="md:mt-8 mt-4">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
              <div className="md:w-[770px] mx-auto">
                <h2 className="text-xl font-semibold my-4 items-start md:ml-[-55px]">
                  Input Text here:
                </h2>

                {/* Input Section */}
                <div className="md:flex justify-center items-center gap-4 md:my-5 mt-2">
                  <textarea
                    value={inputText}
                    onChange={handleTextChange}
                    placeholder="Type or paste your text here..."
                    className={`${DevelopmentToolsStyles.scrollbar} w-full md:min-w-[770px] min-h-[180px] bg-black !border !border-[#222222] p-5 rounded-xl`}
                  ></textarea>
                  {/* Action Buttons */}
                  <div className="flex md:flex-col md:justify-start justify-center gap-4 my-6">
                    <button
                      onClick={transformToUpperCase}
                      disabled={!inputText}
                      className={`${
                        DevelopmentToolsStyles.converterButton
                      } text-black py-3 px-8 rounded-lg items-center transition-transform transform hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] font-bold ${
                        !inputText ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      Convert
                    </button>

                    <button
                      onClick={clearText}
                      disabled={!inputText}
                      className={`${
                        DevelopmentToolsStyles.clearButton
                      } text-black font-bold py-3 px-8 rounded-lg items-center transition-transform transform hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] ${
                        !inputText ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Transformed Text Section */}
                <h3 className="text-xl font-semibold my-6 items-start md:ml-[-55px]">
                  Converted Text:
                </h3>
                <div className="md:flex justify-center items-center gap-4 md:mt-2">
                  <textarea
                    value={transformedText}
                    readOnly
                    className={`${DevelopmentToolsStyles.scrollbar} w-full md:min-w-[770px] min-h-[180px] bg-black !border !border-[#222222] p-5 rounded-xl`}
                  ></textarea>

                  {/* Copy Button */}
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={copyToClipboard}
                      disabled={!transformedText}
                      className={`${
                        DevelopmentToolsStyles.copyButton
                      } w-[130px] text-white font-bold py-3 px-10 rounded-lg items-center transition-transform transform hover:translate-y-1 hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] ${
                        !transformedText ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpperCaseConverterComponent;
