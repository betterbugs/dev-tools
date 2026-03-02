"use client";

import { useState } from "react";

type ViewMode = "side-by-side" | "slider" | "onion";

export default function ImageDiffViewer() {
  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);
  const [mode, setMode] = useState<ViewMode>("side-by-side");
  const [opacity, setOpacity] = useState<number>(0.5);
  const [sliderValue, setSliderValue] = useState<number>(50);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Image Comparison Tool</h2>

      {/* Controls will go here */}

      {/* Upload Controls */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block text-sm mb-1">Upload Image A</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => setImageA(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Upload Image B</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => setImageB(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setMode("side-by-side")}
          className={`px-3 py-1 rounded ${
            mode === "side-by-side" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Side by Side
        </button>

        <button
          onClick={() => setMode("slider")}
          className={`px-3 py-1 rounded ${
            mode === "slider" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Slider
        </button>

        <button
          onClick={() => setMode("onion")}
          className={`px-3 py-1 rounded ${
            mode === "onion" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Onion Skin
        </button>
      </div>

      {mode === "slider" && (
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Slide Position ({sliderValue}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}
      {mode === "onion" && (
        <div className="mb-4">
          <label className="block text-sm mb-1">
            Opacity ({Math.round(opacity * 100)}%)
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}
      {(!imageA || !imageB) && (
        <p className="text-gray-500 mt-4">
          Please upload both images to compare.
        </p>
      )}
      {/* Viewer */}
      {imageA && imageB && (
        <div className="mt-4">
          {mode === "side-by-side" && (
            <div className="flex gap-4">
              <div className="flex-1">
                <img
                  src={imageA}
                  alt="Image A"
                  className="w-full object-contain border rounded"
                />
              </div>

              <div className="flex-1">
                <img
                  src={imageB}
                  alt="Image B"
                  className="w-full object-contain border rounded"
                />
              </div>
            </div>
          )}

          {mode === "slider" && (
            <div className="relative w-full max-w-3xl mx-auto aspect-auto">
              <img
                src={imageA}
                alt="Image A"
                className="w-full object-contain border rounded"
              />
              <img
                src={imageB}
                alt="Image B"
                className="absolute top-0 left-0 w-full object-contain border rounded"
                style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
              />
            </div>
          )}

          {mode === "onion" && (
            <div className="relative w-full max-w-3xl mx-auto aspect-auto">
              <img
                src={imageA}
                alt="Image A"
                className="w-full h-auto object-contain border rounded"
              />
              <img
                src={imageB}
                alt="Image B"
                className="absolute top-0 left-0 w-full h-auto object-contain border rounded"
                style={{ opacity }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
