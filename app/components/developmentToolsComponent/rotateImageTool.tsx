"use client";
import React, { useEffect, useRef, useState } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};

type LoadedImage = {
  img: HTMLImageElement;
  width: number;
  height: number;
};

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const RotateImageTool = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [src, setSrc] = useState<string>("");
  const [image, setImage] = useState<LoadedImage | null>(null);
  const [angle, setAngle] = useState<number>(0); // degrees
  const [bg, setBg] = useState<string>("#ffffff");
  const [transparent, setTransparent] = useState<boolean>(true);
  const [output, setOutput] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [downloadFormat, setDownloadFormat] = useState<"png" | "jpg">("png");
  const [jpgQuality, setJpgQuality] = useState<number>(92);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const knobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!src) return setImage(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setImage({ img, width: img.width, height: img.height });
    img.onerror = () => setError("Failed to load image");
    img.src = src;
  }, [src]);

  const draw = () => {
    if (!image) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const radians = (angle * Math.PI) / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.abs(Math.cos(radians));
    const newWidth = Math.floor(image.width * cos + image.height * sin);
    const newHeight = Math.floor(image.width * sin + image.height * cos);

    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // background
    ctx.clearRect(0, 0, newWidth, newHeight);
    if (!transparent) {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, newWidth, newHeight);
    }

    ctx.translate(newWidth / 2, newHeight / 2);
    ctx.rotate(radians);
    ctx.drawImage(image.img, -image.width / 2, -image.height / 2);
    const mime = downloadFormat === "jpg" ? "image/jpeg" : "image/png";
    const quality = downloadFormat === "jpg" ? clamp(jpgQuality / 100, 0.1, 1) : undefined;
    setOutput(canvas.toDataURL(mime, quality));
  };

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, angle, bg, transparent, downloadFormat, jpgQuality]);

  const onFile = async (file?: File) => {
    if (!file) return;
    setError("");
    try {
      const dataUrl = await readFileAsDataURL(file);
      setSrc(dataUrl);
      setFileName(file.name);
    } catch (e) {
      setError("Failed to read file");
    }
  };

  const download = () => {
    if (!output) return;
    const a = document.createElement("a");
    a.href = output;
    const ext = downloadFormat === "jpg" ? "jpg" : "png";
    a.download = `${fileName ? fileName.replace(/\.[^.]+$/, '') + '-' : ''}rotated.${ext}`;
    a.click();
  };

  const clearAll = () => {
    setSrc("");
    setImage(null);
    setAngle(0);
    setTransparent(true);
    setBg("#ffffff");
    setDownloadFormat("png");
    setJpgQuality(92);
    setOutput("");
    setError("");
    setFileName("");
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[950px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl md:text-2xl font-semibold">Rotate Image Tool</h2>
                  <p className="text-white/70 text-sm">Upload an image, pick a background, set angle, and download PNG/JPG.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-white/80">Upload image</label>
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragEnter={() => setIsDragging(true)}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setIsDragging(false); onFile(e.dataTransfer.files?.[0]); }}
                      className={`rounded-lg border border-dashed ${isDragging ? 'border-primary bg-black/60' : 'border-[#222222] bg-black/40'} p-4 flex items-center justify-between gap-4 transition-colors`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="text-white/70 text-sm truncate">
                          {fileName || "Drag & drop or choose a file"}
                        </div>
                        {image && (
                          <span className="shrink-0 text-xs text-white/60 bg-white/10 border border-white/10 rounded px-2 py-1">
                            {image.width}×{image.height}px
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {src && (
                          <button type="button" onClick={clearAll} className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded border border-white/10">Remove</button>
                        )}
                        <label className="px-4 py-2 bg-primary text-black rounded cursor-pointer">
                          Choose File
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
                        </label>
                      </div>
                    </div>
                    {image && (
                      <div className="mt-2 text-xs text-white/50">
                        {image.width}×{image.height}px
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/80">Background</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input id="transparent" type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} />
                        <label htmlFor="transparent" className="text-sm text-white/80">Transparent</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-8 h-8 rounded-md border border-[#222222]" disabled={transparent} />
                        <div className="flex gap-2">
                          {["#ffffff", "#000000", "#f43f5e", "#f59e0b", "#10b981", "#3b82f6"].map((c) => (
                            <button key={c} type="button" aria-label={c} className="w-6 h-6 rounded border border-[#222222]" style={{ background: c, opacity: transparent ? 0.5 : 1 }} onClick={() => { setBg(c); setTransparent(false); }} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-white/50">Uncheck Transparent to enable solid background color.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-white/80">Angle</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={angle}
                          onChange={(e)=> setAngle(clamp(Number(e.target.value)||0, -180, 180))}
                          className="w-20 bg-black border border-[#222222] rounded px-2 py-1 text-white text-sm"
                        />
                        <span className="text-white/60 text-sm">°</span>
                      </div>
                    </div>
                    <div
                      ref={knobRef}
                      onMouseDown={(e)=>{
                        const move=(ev:MouseEvent)=>{
                          const el=knobRef.current; if(!el) return; const rect=el.getBoundingClientRect();
                          const cx=rect.left+rect.width/2; const cy=rect.top+rect.height/2;
                          const dx=ev.clientX-cx; const dy=ev.clientY-cy; const rad=Math.atan2(dy,dx); const deg=Math.round((rad*180/Math.PI));
                          setAngle(clamp(deg, -180, 180));
                        };
                        const up=()=>{ window.removeEventListener('mousemove',move); window.removeEventListener('mouseup',up); };
                        window.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
                      }}
                      onTouchStart={(e)=>{
                        const move=(ev:TouchEvent)=>{
                          const t=ev.touches[0]; if(!t) return; const el=knobRef.current; if(!el) return; const rect=el.getBoundingClientRect();
                          const cx=rect.left+rect.width/2; const cy=rect.top+rect.height/2;
                          const dx=t.clientX-cx; const dy=t.clientY-cy; const rad=Math.atan2(dy,dx); const deg=Math.round((rad*180/Math.PI));
                          setAngle(clamp(deg, -180, 180));
                        };
                        const end=()=>{ window.removeEventListener('touchmove',move); window.removeEventListener('touchend',end); };
                        window.addEventListener('touchmove',move); window.addEventListener('touchend',end);
                      }}
                      className="relative w-40 h-40 rounded-full border border-[#222222] bg-black/40 mx-auto select-none"
                    >
                      <div className="absolute inset-2 rounded-full border border-[#222222]" />
                      <div
                        className="absolute left-1/2 top-1/2 origin-left"
                        style={{ transform: `rotate(${angle}deg) translateX(0)` }}
                      >
                        <div className="h-[2px] bg-[#00DA92] w-16" />
                        <div className="w-3 h-3 bg-[#00DA92] rounded-full -translate-y-1.5 translate-x-[64px]" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-white/60 text-xs">Drag</div>
                    </div>
                    <div className="mt-3 flex gap-2 justify-center">
                      <button type="button" onClick={() => setAngle((v) => clamp(v - 15, -180, 180))} className="px-3 py-1 bg-black border border-[#222222] rounded text-white/90 hover:border-primary">-15°</button>
                      <button type="button" onClick={() => setAngle(0)} className="px-3 py-1 bg-black border border-[#222222] rounded text-white/90 hover:border-primary">Reset</button>
                      <button type="button" onClick={() => setAngle((v) => clamp(v + 15, -180, 180))} className="px-3 py-1 bg-black border border-[#222222] rounded text-white/90 hover:border-primary">+15°</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex bg-black/40 border border-[#222222] rounded p-1">
                        <button type="button" onClick={()=>setDownloadFormat('png')} className={`flex-1 px-2 py-1 rounded ${downloadFormat==='png' ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}>PNG</button>
                        <button type="button" onClick={()=>setDownloadFormat('jpg')} className={`flex-1 px-2 py-1 rounded ${downloadFormat==='jpg' ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'}`}>JPG</button>
                      </div>
                      {downloadFormat === 'jpg' && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/60">Quality</span>
                          <input type="range" min={10} max={100} value={jpgQuality} onChange={(e)=>setJpgQuality(Number(e.target.value))} style={{ accentColor: '#00DA92' }} />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={download}
                      className={`${DevelopmentToolsStyles.converterButton} text-black font-bold py-3 px-6 rounded-lg w-full disabled:opacity-60 disabled:cursor-not-allowed`}
                      disabled={!output}
                    >
                      {downloadFormat === 'jpg' ? 'Download JPG' : 'Download PNG'}
                    </button>
                    <button
                      type="button"
                      onClick={clearAll}
                      className={`${DevelopmentToolsStyles.clearButton} text-black font-bold py-3 px-6 rounded-lg w-full`}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-white/80 mb-2">Canvas Preview</div>
                    <div className="rounded-lg border border-[#222222] p-3 bg-black/40">
                      <div className="rounded-lg overflow-hidden h-[275px]" style={{ backgroundImage: `linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)`, backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0' }}>
                        <canvas ref={canvasRef} className="w-full h-full" style={{ objectFit: 'contain' }} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/80 mb-2">Result</div>
                    <div className="rounded-lg border border-[#222222] bg-black/40 h-[300px] flex items-center justify-center overflow-hidden">
                      {output ? (
                        <img src={output} alt="Rotated" className="max-h-full max-w-full" />
                      ) : (
                        <div className="text-white/60">No image yet</div>
                      )}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="text-center">
                    <div className="text-sm text-red-400">{error}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RotateImageTool;
