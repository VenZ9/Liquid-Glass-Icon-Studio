import React, { useState, useRef } from 'react';
import { Upload, X, Check, Wand2, Image as ImageIcon } from 'lucide-react';
import { AppPreset, IconCategory } from '../types';

interface CustomLogoUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomPreset: (preset: AppPreset) => void;
}

export const CustomLogoUploader: React.FC<CustomLogoUploaderProps> = ({
  isOpen,
  onClose,
  onAddCustomPreset,
}) => {
  const [appName, setAppName] = useState('');
  const [category, setCategory] = useState<IconCategory>('tools');
  const [rawImageDataUrl, setRawImageDataUrl] = useState<string | null>(null);
  const [processedDataUrl, setProcessedDataUrl] = useState<string | null>(null);
  const [convertToWhite, setConvertToWhite] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Process image to pure monochrome white while preserving alpha channel
  const processImageToWhite = (dataUrl: string, makeWhite: boolean) => {
    if (!makeWhite) {
      setProcessedDataUrl(dataUrl);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width || 512;
      canvas.height = img.height || 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw original
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get pixel data
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Turn all non-transparent pixels to crisp white #FFFFFF
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > 10) {
          data[i] = 255;     // R
          data[i + 1] = 255; // G
          data[i + 2] = 255; // B
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedDataUrl(canvas.toDataURL('image/png'));
    };
    img.src = dataUrl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!appName) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setAppName(nameWithoutExt);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setRawImageDataUrl(dataUrl);
      processImageToWhite(dataUrl, convertToWhite);
    };
    reader.readAsDataURL(file);
  };

  const handleToggleWhite = (val: boolean) => {
    setConvertToWhite(val);
    if (rawImageDataUrl) {
      processImageToWhite(rawImageDataUrl, val);
    }
  };

  const handleSave = () => {
    if (!processedDataUrl && !rawImageDataUrl) return;
    const finalUrl = processedDataUrl || rawImageDataUrl!;
    const id = `custom-${Date.now()}`;

    const newPreset: AppPreset = {
      id,
      name: appName.trim() || 'Custom App',
      category,
      viewBox: '0 0 24 24',
      paths: [],
      isCustom: true,
      customImageDataUrl: finalUrl,
      keywords: ['custom', appName.toLowerCase()],
    };

    onAddCustomPreset(newPreset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-white/15 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-sky-400" />
          <h3 className="text-base font-bold text-white">Upload Custom App Logo</h3>
        </div>

        <p className="text-xs text-neutral-300 mb-4">
          Upload any PNG or SVG logo. We'll automatically convert it into a crisp white Liquid Glass emblem.
        </p>

        {/* Drop / Pick Zone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/20 hover:border-sky-400 rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/svg+xml,image/webp,image/jpeg"
            className="hidden"
            onChange={handleFileChange}
          />

          {processedDataUrl ? (
            <div className="w-20 h-20 rounded-full bg-[#0a0d14] border border-white/30 flex items-center justify-center p-3 shadow-lg relative">
              <img
                src={processedDataUrl}
                alt="Logo Preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-1 left-2 w-4 h-1.5 rounded-full bg-white/40 blur-[0.3px]" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-sky-300 group-hover:bg-sky-500/10 transition">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}

          <div className="text-center">
            <span className="text-xs font-semibold text-white group-hover:text-sky-300">
              {processedDataUrl ? 'Click to change file' : 'Click or drop PNG / SVG'}
            </span>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Transparent backgrounds work best
            </p>
          </div>
        </div>

        {/* Options */}
        {rawImageDataUrl && (
          <div className="mt-4 space-y-3 border-t border-white/5 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-neutral-200 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Monochrome White Fill (iOS 26 Style)</span>
              </label>
              <input
                type="checkbox"
                checked={convertToWhite}
                onChange={(e) => handleToggleWhite(e.target.checked)}
                className="w-4 h-4 rounded text-sky-500 focus:ring-sky-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Name & Category Inputs */}
        <div className="mt-4 space-y-3">
          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1">
              App Name:
            </label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="e.g. My App, Slack, Obsidian..."
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-300 block mb-1">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as IconCategory)}
              className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none focus:border-sky-400"
            >
              <option value="tools">Tools & Developer</option>
              <option value="ai">AI & Assistant</option>
              <option value="social">Social & Messaging</option>
              <option value="media">Media & Video</option>
              <option value="shopping">Shopping & Finance</option>
              <option value="system">System & Utility</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!rawImageDataUrl}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-40 transition flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Add & Customize</span>
          </button>
        </div>
      </div>
    </div>
  );
};
