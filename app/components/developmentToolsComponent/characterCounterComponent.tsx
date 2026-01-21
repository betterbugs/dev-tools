"use client";
import React, { useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const CharacterCounterComponent = () => {
  const [text, setText] = useState("");
  const [includeSpaces, setIncludeSpaces] = useState(true); // State to track space inclusion
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true); // State to track special character inclusion

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handleIncludeSpacesChange = (e: any) => {
    setIncludeSpaces(e.target.checked);
  };

  const handleIncludeSpecialCharsChange = (e: any) => {
    setIncludeSpecialChars(e.target.checked);
  };

  const countCharacters = () => {
    let count = text;
    if (!includeSpaces) {
      count = count.replace(/\s+/g, ""); // Remove spaces if not included
    }
    if (!includeSpecialChars) {
      count = count.replace(/[^a-zA-Z0-9\s]/g, ""); // Remove special characters if not included
    }
    return count.length;
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
                <div className="mb-4">
                  <textarea
                    className={`${DevelopmentToolsStyles.scrollbar} w-full md:min-w-[770px] min-h-[180px] bg-black !border !border-[#222222] p-5 rounded-xl`}
                    placeholder="Type or paste your text here..."
                    value={text}
                    onChange={handleTextChange}
                  ></textarea>
                </div>

                <div className="mb-4 md:flex justify-between gap-6">
                  <label className="inline-flex items-center mr-4 text-lg text-white/70">
                    <input
                      type="checkbox"
                      checked={includeSpaces}
                      onChange={handleIncludeSpacesChange}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-1">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Include Spaces</span>
                  </label>

                  <label className="inline-flex items-center text-lg text-white/70">
                    <input
                      type="checkbox"
                      checked={includeSpecialChars}
                      onChange={handleIncludeSpecialCharsChange}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded border-2 border-gray-300 peer-checked:bg-primary peer-checked:border-white relative">
                      <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold opacity-1">
                        ✔
                      </span>
                    </div>
                    <span className="ml-2">Include Special Characters</span>
                  </label>
                </div>

                <div className="p-5 bg-black/80 text-white rounded-lg shadow-lg border border-gray-300">
                  <div className="flex text-center flex-col md:w-[300px]">
                    <h3 className="text-xl font-semibold mb-2">
                      Character Count
                    </h3>
                    <p className="text-3xl font-bold !mt-5 !mb-3">
                      <span className="bg-primary px-5 py-3 rounded-full">
                        {countCharacters()}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center items-center">
                  <button
                    onClick={() => setText("")}
                    disabled={!text}
                    className={`${
                      DevelopmentToolsStyles.clearButton
                    } w-[280px] text-black font-bold py-3 px-8 rounded-lg items-center transition-transform transform hover:shadow-[2px_2px_1px_0px_rgba(0,0,0,0.5)] shadow-[3px_3px_2px_0px_rgba(0,0,0,0.5)]  ${
                      !text ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Clear Text
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterCounterComponent;
