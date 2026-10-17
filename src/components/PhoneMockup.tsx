import React, { useState } from 'react';
import { Wifi, Battery, Sparkles, Search } from 'lucide-react';
import { AppPreset, GlassSettings, WallpaperOption } from '../types';
import { WALLPAPER_OPTIONS } from '../data/wallpapers';

interface PhoneMockupProps {
  presets: AppPreset[];
  activePreset: AppPreset;
  onSelectPreset: (preset: AppPreset) => void;
  settings: GlassSettings;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  presets,
  activePreset,
  onSelectPreset,
  settings,
}) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState<WallpaperOption>(WALLPAPER_OPTIONS[0]);

  // Selected showcase apps for the home screen grid
  const homeScreenAppIds = [
    'claude',
    'chatgpt',
    'gemini',
    'termux',
    'spck-editor',
    'spotify',
    'youtube',
    'netflix',
    'telegram',
    'discord',
    'instagram',
    'reddit',
    'flipkart',
    'blinkit',
    'files',
    'settings',
  ];

  const dockAppIds = ['phone', 'messages', 'chrome', 'camera'];

  const getPreset = (id: string): AppPreset => {
    return presets.find((p) => p.id === id) || presets[0];
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <h2 className="text-sm font-semibold text-white">Android Homescreen Mockup</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-neutral-400">Wallpaper:</span>
          {WALLPAPER_OPTIONS.slice(0, 4).map((wp) => (
            <button
              key={wp.id}
              onClick={() => setSelectedWallpaper(wp)}
              title={wp.name}
              className={`w-4 h-4 rounded-full border transition ${
                selectedWallpaper.id === wp.id
                  ? 'border-sky-400 scale-110 shadow-[0_0_6px_rgba(56,189,248,0.5)]'
                  : 'border-white/20 opacity-70'
              }`}
              style={{ background: wp.background }}
            />
          ))}
        </div>
      </div>

      {/* Realistic Smartphone Shell */}
      <div className="relative w-[300px] sm:w-[320px] h-[640px] rounded-[44px] p-3 bg-neutral-900 border-[3px] border-neutral-700 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Device screen area */}
        <div
          className="relative w-full h-full rounded-[34px] overflow-hidden flex flex-col justify-between p-3 select-none transition-all duration-300"
          style={{ background: selectedWallpaper.background }}
        >
          {/* Status Bar */}
          <div className="w-full flex items-center justify-between text-[11px] font-semibold text-white/90 pt-1 px-3">
            <span>12:45</span>
            {/* Center Punch Hole Camera */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-white/20 shadow-inner" />
            <div className="flex items-center gap-1.5 text-white/80">
              <span className="text-[10px] font-mono">5G</span>
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Clock Widget */}
          <div className="mt-4 px-3">
            <div className="text-4xl font-light tracking-tight text-white/95">
              12:45
            </div>
            <div className="text-xs text-white/70 font-medium">
              Saturday, October 17 • 24°C Sunny
            </div>

            {/* Google Search Pill Widget */}
            <div className="mt-3 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white/60 shadow-sm">
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[11px]">Search apps & web...</span>
              </div>
              <span className="text-[10px] font-mono opacity-60">Google</span>
            </div>
          </div>

          {/* 4x4 App Grid */}
          <div className="grid grid-cols-4 gap-y-3 gap-x-2 my-auto px-1">
            {homeScreenAppIds.map((id) => {
              const app = getPreset(id);
              const isActive = activePreset.id === app.id;

              return (
                <div
                  key={id}
                  onClick={() => onSelectPreset(app)}
                  className="flex flex-col items-center gap-1 cursor-pointer group"
                >
                  {/* Glass Icon Bubble */}
                  <div
                    className={`relative w-11 h-11 flex items-center justify-center transition-transform group-hover:scale-105 ${
                      settings.shape === 'squircle'
                        ? 'rounded-2xl'
                        : settings.shape === 'rounded-square'
                        ? 'rounded-xl'
                        : 'rounded-full'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.14) 0%, ${settings.tintColor} 55%, rgba(0,0,0,0.95) 100%)`,
                      border: `${Math.max(1, settings.borderWidth * 0.7)}px solid rgba(255,255,255,${settings.borderOpacity / 100})`,
                      boxShadow: `0 6px 14px rgba(0,0,0,${settings.shadowOpacity / 100})`,
                    }}
                  >
                    {/* Top specular highlight curve */}
                    <div className="absolute top-0.5 left-1.5 w-4 h-1.5 rounded-full bg-white/40 blur-[0.3px]" />

                    {/* Logo SVG */}
                    <div className="relative z-10 w-5 h-5 flex items-center justify-center">
                      <svg
                        viewBox={app.viewBox || '0 0 24 24'}
                        className="w-full h-full fill-white drop-shadow-sm"
                      >
                        {app.paths.map((p, i) => (
                          <path
                            key={i}
                            d={p}
                            fillRule={app.fillRule || 'nonzero'}
                          />
                        ))}
                      </svg>
                    </div>

                    {/* Active highlight glow */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full ring-2 ring-sky-400 ring-offset-1 ring-offset-black" />
                    )}
                  </div>
                  <span className="text-[10px] font-medium text-white/90 truncate max-w-[56px] text-center drop-shadow-md">
                    {app.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Dock Glass Shelf */}
          <div className="mb-2 p-2 rounded-3xl bg-black/45 backdrop-blur-xl border border-white/10 grid grid-cols-4 gap-2 shadow-2xl">
            {dockAppIds.map((id) => {
              const app = getPreset(id);
              const isActive = activePreset.id === app.id;

              return (
                <div
                  key={id}
                  onClick={() => onSelectPreset(app)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div
                    className={`relative w-11 h-11 flex items-center justify-center transition-transform group-hover:scale-105 ${
                      settings.shape === 'squircle'
                        ? 'rounded-2xl'
                        : settings.shape === 'rounded-square'
                        ? 'rounded-xl'
                        : 'rounded-full'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.18) 0%, ${settings.tintColor} 55%, rgba(0,0,0,0.95) 100%)`,
                      border: `${Math.max(1, settings.borderWidth * 0.7)}px solid rgba(255,255,255,${settings.borderOpacity / 100})`,
                      boxShadow: `0 6px 14px rgba(0,0,0,${settings.shadowOpacity / 100})`,
                    }}
                  >
                    <div className="absolute top-0.5 left-1.5 w-4 h-1.5 rounded-full bg-white/40 blur-[0.3px]" />
                    <div className="relative z-10 w-5 h-5 flex items-center justify-center">
                      <svg
                        viewBox={app.viewBox || '0 0 24 24'}
                        className="w-full h-full fill-white drop-shadow-sm"
                      >
                        {app.paths.map((p, i) => (
                          <path
                            key={i}
                            d={p}
                            fillRule={app.fillRule || 'nonzero'}
                          />
                        ))}
                      </svg>
                    </div>

                    {isActive && (
                      <div className="absolute inset-0 rounded-full ring-2 ring-sky-400 ring-offset-1 ring-offset-black" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Home Indicator Bar */}
          <div className="w-24 h-1 bg-white/50 rounded-full mx-auto" />
        </div>
      </div>

      <p className="mt-3 text-xs text-neutral-400 text-center">
        Tap any icon on the homescreen to customize it in the studio
      </p>
    </div>
  );
};
