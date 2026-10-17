import React, { useEffect, useRef, useState } from 'react';
import { Download, ZoomIn, ZoomOut, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import { AppPreset, GlassSettings, WallpaperOption } from '../types';
import { renderLiquidGlassIcon, getCachedAppImage } from '../utils/canvasRenderer';
import { exportSingleIcon } from '../utils/exportUtils';
import { WALLPAPER_OPTIONS } from '../data/wallpapers';

interface IconPreviewProps {
  preset: AppPreset;
  settings: GlassSettings;
  onOpenGuide: () => void;
}

export const IconPreview: React.FC<IconPreviewProps> = ({
  preset,
  settings,
  onOpenGuide,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedWallpaper, setSelectedWallpaper] = useState<WallpaperOption>(WALLPAPER_OPTIONS[0]);
  const [showCheckerboard, setShowCheckerboard] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Render canvas whenever preset or settings change
  useEffect(() => {
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load image and render
    getCachedAppImage(preset).then((img) => {
      if (isCancelled) return;
      renderLiquidGlassIcon(ctx, preset, settings, img, { size: 512, clear: true });
    });

    return () => {
      isCancelled = true;
    };
  }, [preset, settings]);

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      await exportSingleIcon(preset, settings);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCustomWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setSelectedWallpaper({
          id: 'custom-user-wallpaper',
          name: 'Custom Wallpaper',
          type: 'custom',
          background: `url("${dataUrl}") center/cover no-repeat`,
          accentColor: '#38bdf8'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
            Live 512×512 Preview
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
          <button
            onClick={() => setShowCheckerboard(!showCheckerboard)}
            title="Toggle transparency checkerboard"
            className={`px-2 py-1 rounded text-[11px] font-mono transition border ${
              showCheckerboard
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-white/5 text-neutral-400 border-white/5 hover:text-white'
            }`}
          >
            Checkerboard
          </button>
          <button
            onClick={() => setZoomLevel((z) => (z >= 1.5 ? 1 : z + 0.25))}
            title="Toggle zoom"
            className="p-1 rounded bg-white/5 text-neutral-300 hover:text-white border border-white/5"
          >
            {zoomLevel > 1 ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div
        className="w-full h-72 sm:h-80 rounded-xl relative overflow-hidden flex items-center justify-center p-6 border border-white/10 transition-all duration-300 shadow-inner"
        style={{
          background: showCheckerboard
            ? `repeating-conic-gradient(#151821 0% 25%, #0d1017 0% 50%) 50% / 20px 20px`
            : selectedWallpaper.background,
        }}
      >
        {/* Glow ambient bloom */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${settings.tintColor} 0%, transparent 60%)`,
          }}
        />

        {/* 512x512 Canvas */}
        <div
          className="relative transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <canvas
            ref={canvasRef}
            width={512}
            height={512}
            className="w-48 h-48 sm:w-56 sm:h-56 select-none cursor-pointer drop-shadow-2xl"
            title={`${preset.name} - Liquid Glass`}
            onClick={handleDownload}
          />
        </div>

        {/* Resolution tag */}
        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
          512 × 512 PNG
        </div>

        {/* Selected app indicator */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-xs text-white">
          <Sparkles className="w-3 h-3 text-sky-400" />
          <span className="font-semibold">{preset.name}</span>
        </div>
      </div>

      {/* Wallpaper Switcher Strip */}
      <div className="w-full mt-4 flex items-center justify-between gap-2 border-t border-white/5 pt-3">
        <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
          Backdrop:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {WALLPAPER_OPTIONS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => {
                setShowCheckerboard(false);
                setSelectedWallpaper(wp);
              }}
              title={wp.name}
              className={`w-6 h-6 rounded-full border transition-all ${
                !showCheckerboard && selectedWallpaper.id === wp.id
                  ? 'border-sky-400 scale-110 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                  : 'border-white/20 opacity-70 hover:opacity-100'
              }`}
              style={{ background: wp.background }}
            />
          ))}

          {/* Custom user wallpaper button */}
          <label
            title="Upload custom wallpaper background"
            className="w-6 h-6 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center cursor-pointer text-neutral-300"
          >
            <ImageIcon className="w-3 h-3" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCustomWallpaperUpload}
            />
          </label>
        </div>
      </div>

      {/* Export Button & Quick Link */}
      <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
            downloadSuccess
              ? 'bg-emerald-600 text-white shadow-emerald-500/20'
              : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-sky-500/20 hover:shadow-sky-500/30'
          }`}
        >
          {downloadSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>Saved 512×512 PNG!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download {preset.name} PNG</span>
            </>
          )}
        </button>

        <button
          onClick={onOpenGuide}
          className="w-full py-2.5 px-4 rounded-xl font-medium text-xs bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 transition flex items-center justify-center gap-1.5"
        >
          <span>Apply with Shortcut Maker</span>
          <span className="text-sky-400">→</span>
        </button>
      </div>
    </div>
  );
};
