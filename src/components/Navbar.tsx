import React from 'react';
import { Layers, HelpCircle, Download, RotateCcw, Github } from 'lucide-react';

interface NavbarProps {
  onOpenGuide: () => void;
  onOpenBatchExport: () => void;
  onResetSettings: () => void;
  selectedCount: number;
  totalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGuide,
  onOpenBatchExport,
  onResetSettings,
  selectedCount,
  totalCount,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080a0f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-white/20 via-white/5 to-transparent p-[1.5px] shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <div className="w-full h-full rounded-full bg-[#0d121f] flex items-center justify-center border border-white/20 backdrop-blur-md">
              <Layers className="w-5 h-5 text-sky-400" />
            </div>
            {/* Liquid specular glint */}
            <div className="absolute top-1 left-2 w-2.5 h-1.5 rounded-full bg-white/60 blur-[0.5px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                Liquid Glass <span className="text-sky-400 font-medium">Studio</span>
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                iOS 26 Style
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block">
              Dark Translucent Glass Bubbles for Android
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onResetSettings}
            title="Reset Settings to Defaults"
            className="p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-neutral-300 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="p-2 sm:px-3 sm:py-1.5 text-xs font-medium text-neutral-300 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Shortcut Guide</span>
          </button>

          <button
            onClick={onOpenBatchExport}
            className="px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-[0_0_15px_rgba(56,189,248,0.3)] transition flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export ZIP</span>
            <span className="px-1.5 py-0.2 rounded bg-black/30 font-mono text-[11px]">
              {selectedCount || totalCount}
            </span>
          </button>

          <a
            href="https://github.com/VenZ9/Liquid-Glass-Icon-Studio"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="p-2 text-neutral-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
