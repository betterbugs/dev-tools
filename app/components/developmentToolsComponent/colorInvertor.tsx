"use client";
import React, { useMemo, useState } from "react";

const normalizeHex = (v: string) => {
  let s = v.trim().replace(/[^0-9a-fA-F]/g, "");
  if (s.length === 3) s = s.split("").map((c) => c + c).join("");
  if (s.length > 6) s = s.slice(0, 6);
  return s.toLowerCase();
};

const hexToRgb = (hex: string) => {
  const s = normalizeHex(hex);
  const r = parseInt(s.slice(0, 2), 16) || 0;
  const g = parseInt(s.slice(2, 4), 16) || 0;
  const b = parseInt(s.slice(4, 6), 16) || 0;
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) =>
  [r, g, b]
    .map((n) => Math.max(0, Math.min(255, n)))
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");

const invertHex = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(255 - r, 255 - g, 255 - b);
};

const getContrastColor = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "000000" : "ffffff";
};

const ColorInvertor: React.FC = () => {
  const [hex, setHex] = useState<string>("4f46e5");
  const inv = useMemo(() => invertHex(hex), [hex]);
  const contrast = useMemo(() => getContrastColor(hex), [hex]);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [invertedImageUrl, setInvertedImageUrl] = useState<string>("");

  const copy = async (v: string) => {
    try {
      await navigator.clipboard.writeText(`#${v}`);
    } catch {}
  };

  return (
    <section>
      <div className="md:w-[950px] mx-auto p-8">
        <div className="bg-white/5 rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold text-white">Color Invertor</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-white/80">Hex Color</label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-3 bg-black border border-[#222222] rounded-l-lg text-white/70">#</span>
                <input
                  value={hex}
                  onChange={(e) => setHex(normalizeHex(e.target.value))}
                  className="w-full bg-black border border-[#222222] rounded-r-lg px-4 py-3 text-white font-mono"
                  placeholder="e.g. 1a2b3c"
                />
                <input
                  type="color"
                  value={`#${normalizeHex(hex).padEnd(6, "0")}`}
                  onChange={(e) => setHex(normalizeHex(e.target.value))}
                  className="w-12 h-12 rounded-lg border border-white/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">Quick Actions</label>
              <div className="flex gap-2">
                <button onClick={() => copy(hex)} className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-white">Copy # {hex}</button>
                <button onClick={() => copy(inv)} className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-white">Copy Invert</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden border border-white/10">
              <div className="px-4 py-2 text-xs text-white/80 bg-black/30">Input Color</div>
              <div className="h-40 flex items-center justify-center" style={{ backgroundColor: `#${hex}` }}>
                <div className="text-center">
                  <div className="text-white/80 text-sm">#{hex}</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10">
              <div className="px-4 py-2 text-xs text-white/80 bg-black/30">Inverted Color</div>
              <div className="h-40 flex items-center justify-center" style={{ backgroundColor: `#${inv}` }}>
                <div className="text-center" style={{ color: `#${getContrastColor(inv)}` }}>
                  <div className="text-sm">#{inv}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image upload and invert */}
          <div className="space-y-3">
            <label className="block text-sm font-medium mb-2 text-white/80">Image Inversion</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const url = String(reader.result || "");
                    setImageUrl(url);
                    // Draw and invert
                    const img = new Image();
                    img.onload = () => {
                      const canvas = document.createElement("canvas");
                      canvas.width = img.width;
                      canvas.height = img.height;
                      const ctx = canvas.getContext("2d");
                      if (!ctx) return;
                      ctx.drawImage(img, 0, 0);
                      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                      const d = imageData.data;
                      for (let i = 0; i < d.length; i += 4) {
                        d[i] = 255 - d[i];
                        d[i + 1] = 255 - d[i + 1];
                        d[i + 2] = 255 - d[i + 2];
                      }
                      ctx.putImageData(imageData, 0, 0);
                      setInvertedImageUrl(canvas.toDataURL("image/png"));
                    };
                    img.src = url;
                  };
                  reader.readAsDataURL(file);
                  e.currentTarget.value = "";
                }}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer text-white">Upload Image</label>
              {invertedImageUrl && (
                <a
                  href={invertedImageUrl}
                  download="inverted-image.png"
                  className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-white"
                >
                  Download Inverted
                </a>
              )}
            </div>

            {(imageUrl || invertedImageUrl) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <div className="px-4 py-2 text-xs text-white/80 bg-black/30">Original</div>
                  <div className="h-60 bg-black/20 flex items-center justify-center">
                    {imageUrl ? (
                      <img src={imageUrl} alt="Original" className="max-h-60 object-contain" />
                    ) : (
                      <div className="text-white/60 text-sm">No image</div>
                    )}
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <div className="px-4 py-2 text-xs text-white/80 bg-black/30">Inverted</div>
                  <div className="h-60 bg-black/20 flex items-center justify-center">
                    {invertedImageUrl ? (
                      <img src={invertedImageUrl} alt="Inverted" className="max-h-60 object-contain" />
                    ) : (
                      <div className="text-white/60 text-sm">Upload to generate</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4 border border-white/10">
              <p className="text-white/60 text-xs mb-1">Text Color Hint (on input color)</p>
              <p className="text-white font-medium">#{contrast}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 border border-white/10">
              <p className="text-white/60 text-xs mb-1">CSS Example</p>
              <pre className="text-white text-xs whitespace-pre-wrap">{`background: #${hex};\ncolor: #${contrast};`}</pre>
            </div>
            <div className="bg-white/10 rounded-lg p-4 border border-white/10">
              <p className="text-white/60 text-xs mb-1">Inverted CSS</p>
              <pre className="text-white text-xs whitespace-pre-wrap">{`background: #${inv};`}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorInvertor;