"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";
import CopyButton from "../ui/CopyButton";

const WordCounterComponent = () => {
  const [text, setText] = useState("");

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const countWords = () => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[770px] mx-auto">
              <h2 className="text-xl font-semibold my-4 items-start">
                Input Text here:
              </h2>

              {/* Input Section */}
              <div className="md:flex md:flex-col justify-center items-center gap-4 md:my-5 mt-2">
                <div className="mb-6">
                  <textarea
                    className={`${DevelopmentToolsStyles.scrollbar} w-full md:min-w-[770px] min-h-[180px] bg-black !border !border-[#222222] p-5 rounded-xl`}
                    placeholder="Type or paste your text here..."
                    value={text}
                    onChange={handleTextChange}
                  ></textarea>
                </div>

                <div className="p-5 bg-black/80 text-white rounded-lg shadow-lg border border-gray-300">
                  <div className="flex text-center flex-col md:w-[300px]">
                    <h3 className="text-xl font-semibold mb-2">Word Count</h3>
                    <p className="text-3xl font-bold !mt-5 !mb-3">
                      <span className="bg-primary px-5 py-3 rounded-full">
                        {countWords()}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center items-center">
                  <button
                    onClick={() => setText("")}
                    disabled={!text.trim()}
                    className={`${
                      DevelopmentToolsStyles.clearButton
                    } w-[280px] text-black font-bold py-3 px-8 rounded-lg items-center transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)]  ${
                      !text ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Clear Text
                  </button>

                  <CopyButton 
                    text={text} 
                    variant="text" 
                    className={`${DevelopmentToolsStyles.converterButton} w-[280px] text-black font-bold py-3 px-8 rounded-lg items-center transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)] ${!text ? "opacity-70 cursor-not-allowed" : ""}`}
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordCounterComponent;
